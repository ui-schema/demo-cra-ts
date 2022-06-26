import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Nav } from '../components/Layout'
import {
    createOrderedMap, createStore, JsonSchema,
    onChangeHandler, StoreSchemaType, storeUpdater,
    UIStoreProvider, StoreKeys, ObjectGroup,
    PluginStack, applyPluginStack,
} from '@ui-schema/ui-schema'
import { List, OrderedMap } from 'immutable'
import { StringRenderer } from '@ui-schema/ds-material/Widgets/TextField'
import { WidgetCountrySelect } from '../components/Widgets/WidgetCountrySelect'
import { DataDebug } from '../components/DataDebug'

const schema = createOrderedMap({
    type: 'object',
    properties: {
        name: {
            type: 'string',
        },
        favorites: {
            type: 'array',
            widget: 'SelectChips',
            items: {
                oneOf: [
                    {
                        const: 'Chips',
                    }, {
                        const: 'Crisps',
                    }, {
                        const: 'Tacos',
                    }, {
                        const: 'Nachos',
                    }, {
                        const: 'Cheese',
                    },
                ],
            },
        },
        country: {
            type: 'string',
            widget: 'CountrySelect',
        },
    },
} as JsonSchema)

const WidgetTextField = applyPluginStack(StringRenderer)
const CountrySelect = applyPluginStack(WidgetCountrySelect)

const CustomFormContent: React.FC<{
    storeKeys?: StoreKeys
    schema: StoreSchemaType
    showValidity?: boolean
}> = ({storeKeys = List(), schema, showValidity}) => {
    const [objectSchema, setObjectSchema] = React.useState<StoreSchemaType>(() => schema)
    return <ObjectGroup
        storeKeys={storeKeys}
        schema={schema} parentSchema={undefined}
        onSchema={setObjectSchema}
    >
        <Grid container dir={'columns'} spacing={4}>
            <WidgetTextField
                level={1}
                storeKeys={storeKeys.push('name') as StoreKeys}
                schema={objectSchema.getIn(['properties', 'name']) as unknown as StoreSchemaType}
                parentSchema={objectSchema}

                // using `applyPluginStack`, this free-form widget is fully typed
                // with the actual props of the widget component
                multiline={false}
            />

            <PluginStack<{ readOnly: boolean }>
                showValidity={showValidity}
                storeKeys={storeKeys.push('favorites') as StoreKeys}
                schema={objectSchema.getIn(['properties', 'favorites']) as unknown as StoreSchemaType}
                parentSchema={objectSchema}
                level={1}
                readOnly={false}
                // noGrid={false} (as grid-item is included in `PluginStack`)
            />

            <CountrySelect
                level={1}
                storeKeys={storeKeys.push('country') as StoreKeys}
                schema={objectSchema.getIn(['properties', 'country']) as unknown as StoreSchemaType}
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

export const PageCustomForm: React.ComponentType = () => {
    return <>
        <Container maxWidth={'md'} fixed style={{display: 'flex'}}>
            <Nav/>
            <Box mx={2} py={1} style={{flexGrow: 1}}>
                <Box mb={2}>
                    <Typography variant={'h1'} gutterBottom>UI-Schema Custom Form</Typography>
                    <Typography variant={'body2'} gutterBottom>The form on this page is the same as `SimpleForm`, but rendered at custom positions per-code.</Typography>
                </Box>
                <DemoComponent/>
            </Box>
        </Container>
    </>
}
