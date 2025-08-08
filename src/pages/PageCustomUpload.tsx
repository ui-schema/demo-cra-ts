import {
    createStore,
    onChangeHandler,
    SchemaLayer,
    storeUpdater,
    UIStoreProvider,
    WidgetEngine,
} from '@ui-schema/react'
import { WidgetProps } from '@ui-schema/react/Widget'
import { createOrderedMap, SomeSchema, StoreKeys } from '@ui-schema/ui-schema'
import React from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { List, Map, OrderedMap } from 'immutable'
import { DataDebugViewer } from '../components/DebugViewer.js'

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
})

enum PROGRESS {
    PROGRESS_NONE,
    PROGRESS_START,
    PROGRESS_DONE,
    PROGRESS_ERROR,
}

const {
    PROGRESS_NONE,
    PROGRESS_START,
    PROGRESS_DONE,
    PROGRESS_ERROR,
} = PROGRESS

const WidgetFileUpload: React.ComponentType<WidgetProps> = ({storeKeys, onChange, schema, required, value}) => {
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
                // fetch('https://file.io', {method: 'POST', body: formData})
                //     .then(r => r.json())
                //     .then(data => {
                //         if (data.status === 200) {
                //             setLoading(PROGRESS_DONE)
                //             console.log('file uploaded!', data)
                //             onChange({
                //                 type: 'set',
                //                 scopes: ['value'],
                //                 storeKeys: storeKeys,
                //                 data: {
                //                     value: OrderedMap({
                //                         link: data.link,
                //                         expires: data.expires,
                //                         name: data.name,
                //                     }),
                //                 },
                //                 schema,
                //                 required,
                //             })
                //         } else {
                //             console.error('File upload error!', data)
                //             setLoading(PROGRESS_ERROR)
                //         }
                //     })
                //     .catch((e) => {
                //         console.error('File upload fetch error!', e)
                //         setLoading(PROGRESS_ERROR)
                //     })

                // a different provider, as file.io now needs auth
                fetch('https://upload.gofile.io/uploadfile', {method: 'POST', body: formData})
                    .then(r => r.json())
                    .then(data => {
                        if (data.status) {
                            setLoading(PROGRESS_DONE)
                            console.log('file uploaded!', data)
                            onChange({
                                type: 'set',
                                scopes: ['value'],
                                storeKeys: storeKeys,
                                data: {
                                    value: OrderedMap({
                                        link: data.data.downloadPage,
                                        name: data.data.name,
                                    }),
                                },
                                schema,
                                required,
                            })
                        } else {
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
        {Map.isMap(value) && value?.get('link') ?
            <Box p={2}>
                <Typography variant={'subtitle2'} gutterBottom>Uploaded File:</Typography>
                <Box px={2}>
                    <pre style={{margin: 0}}><code>{JSON.stringify(value?.toJS(), undefined, 4)}</code></pre>
                    <Link href={value?.get('link') as string} target={'_blank'} rel={'noreferrer noopener'}>open download page</Link>
                </Box>
            </Box> :
            <Typography variant={'caption'} color={'textSecondary'}>no file uploaded</Typography>}
    </Box>
}

const CustomFormContent: React.FC<{
    storeKeys?: StoreKeys
    schema: SomeSchema
    showValidity?: boolean
}> = ({storeKeys = List(), schema}) => {
    const [objectSchema, setObjectSchema] = React.useState<SomeSchema>(() => schema)
    return <SchemaLayer
        storeKeys={storeKeys}
        schema={schema} parentSchema={undefined}
        onSchema={setObjectSchema}
    >
        <Grid container dir={'columns'} spacing={4}>
            <WidgetEngine<object, typeof WidgetFileUpload>
                storeKeys={storeKeys.push('file') as StoreKeys}
                schema={objectSchema.getIn(['properties', 'file']) as SomeSchema}
                parentSchema={objectSchema}
                WidgetOverride={WidgetFileUpload}
            />
        </Grid>
    </SchemaLayer>
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
            />

            <DataDebugViewer/>
        </UIStoreProvider>
    </React.Fragment>
}

export const PageCustomUpload = () => {
    return <>
        <Container maxWidth={'lg'} fixed>
            <Paper variant={'outlined'} sx={{px: 2, pt: 1, pb: 4}}>
                <Box mb={2}>
                    <Typography variant={'h1'} gutterBottom>UI-Schema File Upload</Typography>
                    <Typography variant={'body1'} gutterBottom>Custom rendering with a native file upload field.</Typography>
                </Box>
                <DemoComponent/>
            </Paper>
        </Container>
    </>
}
