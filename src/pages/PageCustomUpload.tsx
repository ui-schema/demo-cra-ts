import React from 'react'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { Nav } from '../components/Layout'
import {
    createOrderedMap, createStore, JsonSchema,
    onChangeHandler, StoreSchemaType, storeUpdater,
    UIStoreProvider, StoreKeys, ObjectGroup,
    extractValue, applyPluginStack, WidgetProps, WithValue,
    PROGRESS_START, PROGRESS_DONE, PROGRESS_ERROR, PROGRESS_NONE,
    PROGRESS,
} from '@ui-schema/ui-schema'
import { List, OrderedMap } from 'immutable'
import { DataDebug } from '../components/DataDebug'

const schema = createOrderedMap({
    type: 'object',
    properties: {
        file: {
            type: 'object',
            properties: {
                link: {
                    type: 'string',
                },
                expiry: {
                    type: 'string',
                },
                name: {
                    type: 'string',
                },
            },
        },
    },
} as JsonSchema)

const FileUpload: React.ComponentType<WidgetProps & WithValue> = ({storeKeys, onChange, schema, required, value}) => {
    const [loading, setLoading] = React.useState<PROGRESS>(PROGRESS_NONE)
    return <Box style={{display: 'flex', flexDirection: 'column'}}>
        <input
            type={'file'}
            onChange={e => {
                setLoading(PROGRESS_START)
                const formData = new FormData()
                // @ts-ignore
                formData.append('file', e.target.files[0])
                // todo: handle `is uploading`
                fetch('https://file.io', {method: 'POST', body: formData})
                    .then(r => r.json())
                    .then(data => {
                        if(data.status === 200) {
                            setLoading(PROGRESS_DONE)
                            console.log('file uploaded!', data)
                            onChange({
                                type: 'set',
                                scopes: ['value'],
                                storeKeys: storeKeys,
                                data: {
                                    value: OrderedMap({
                                        link: data.link,
                                        expires: data.expires,
                                        name: data.name,
                                    }),
                                },
                                schema,
                                required,
                            })
                        } else {
                            // todo: implement validity handling on error
                            console.error('File upload error!', data)
                            setLoading(PROGRESS_ERROR)
                        }
                    })
                    .catch((e) => {
                        console.error('File upload fetch error!', e)
                        setLoading(PROGRESS_ERROR)
                    })
            }}
        />

        {loading === PROGRESS_START || loading === PROGRESS_ERROR ?
            <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} my={1}>
                <CircularProgress/>
                <Typography variant={'caption'} color={loading === PROGRESS_ERROR ? 'error' : 'textSecondary'}>
                    {loading === PROGRESS_ERROR ? 'upload failed' : 'uploading...'}
                </Typography>
            </Box> : null}
        {value?.get('link') ?
            <Box p={2}>
                <Typography variant={'subtitle2'} gutterBottom>Uploaded File:</Typography>
                <Box px={2}>
                    <pre style={{margin: 0}}><code>{JSON.stringify(value?.toJS(), undefined, 4)}</code></pre>
                    <Link href={value?.get('link')} target={'_blank'} rel={'noreferrer noopener'}>open download page</Link>
                </Box>
            </Box> :
            <Typography variant={'caption'} color={'textSecondary'}>no file uploaded</Typography>}
    </Box>
}

const WidgetFileUpload = applyPluginStack(extractValue(FileUpload))

const CustomFormContent: React.FC<{
    storeKeys?: StoreKeys
    schema: StoreSchemaType
    showValidity?: boolean
}> = ({storeKeys = List(), schema}) => {
    const [objectSchema, setObjectSchema] = React.useState<StoreSchemaType>(() => schema)
    return <ObjectGroup
        storeKeys={storeKeys}
        schema={schema} parentSchema={undefined}
        onSchema={setObjectSchema}
    >
        <Grid container dir={'columns'} spacing={4}>
            <WidgetFileUpload
                level={1}
                storeKeys={storeKeys.push('file') as StoreKeys}
                schema={objectSchema.getIn(['properties', 'file']) as unknown as StoreSchemaType}
                parentSchema={objectSchema}
            />
        </Grid>
    </ObjectGroup>
}

const DemoComponent = () => {
    const showValidity = true
    const [store, setStore] = React.useState(() => createStore(OrderedMap({})))

    const onChange: onChangeHandler = React.useCallback(
        (actions) => setStore(storeUpdater(actions)),
        [setStore],
    )

    return <React.Fragment>
        <UIStoreProvider
            store={store}
            onChange={onChange}
            showValidity={showValidity}
        >
            <CustomFormContent
                schema={schema}
                showValidity={showValidity}
            />

            <DataDebug/>
        </UIStoreProvider>
    </React.Fragment>
}

export const PageCustomUpload: React.ComponentType = () => {
    return <>
        <Container maxWidth={'md'} fixed style={{display: 'flex'}}>
            <Nav/>
            <Box mx={2} py={1} style={{flexGrow: 1}}>
                <Box mb={2}>
                    <Typography variant={'h1'} gutterBottom>UI-Schema Custom Upload</Typography>
                    <Typography variant={'body2'} gutterBottom>Custom rendering with a native file upload field.</Typography>
                </Box>
                <DemoComponent/>
            </Box>
        </Container>
    </>
}
