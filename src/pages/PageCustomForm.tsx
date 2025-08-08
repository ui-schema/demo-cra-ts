import Paper from '@mui/material/Paper'
import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import {
    createStore,
    onChangeHandler,
    SchemaLayer,
    storeUpdater,
    UIStoreProvider,
    WidgetEngine,
} from '@ui-schema/react'
import { createOrderedMap, SomeSchema, StoreKeys } from '@ui-schema/ui-schema'
import { List, OrderedMap } from 'immutable'
import { StringRenderer } from '@ui-schema/ds-material/Widgets/TextField'
import { ReadMore } from '../components/ReadMore.js'
import { WidgetCountrySelect } from '../components/Widgets/WidgetCountrySelect.js'
import { DataDebugViewer } from '../components/DebugViewer.js'

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
})

const CustomFormContent: React.FC<{
    storeKeys?: StoreKeys
    schema: SomeSchema
}> = ({storeKeys = List(), schema}) => {
    const [objectSchema, setObjectSchema] = React.useState<SomeSchema>(() => schema)
    return <SchemaLayer
        storeKeys={storeKeys}
        schema={schema} parentSchema={undefined}
        onSchema={setObjectSchema}
    >
        <Grid container dir={'columns'} spacing={4}>
            <WidgetEngine<object, typeof StringRenderer>
                storeKeys={storeKeys.push('name') as StoreKeys}
                schema={objectSchema.getIn(['properties', 'name']) as SomeSchema}
                parentSchema={objectSchema}

                // todo: applyPluginStack is atm. deprecated, use `WidgetOverride` instead
                // using `applyPluginStack`, this free-form widget is fully typed
                // with the actual props of the widget component
                multiline={false}
                WidgetOverride={StringRenderer}
            />

            <WidgetEngine<{ readOnly: boolean }>
                storeKeys={storeKeys.push('favorites') as StoreKeys}
                schema={objectSchema.getIn(['properties', 'favorites']) as SomeSchema}
                parentSchema={objectSchema}
                readOnly={false}
                // noGrid={false} (as grid-item is included in `PluginStack`)
            />

            <WidgetEngine<object, typeof WidgetCountrySelect>
                storeKeys={storeKeys.push('country') as StoreKeys}
                schema={objectSchema.getIn(['properties', 'country']) as SomeSchema}
                parentSchema={objectSchema}
                WidgetOverride={WidgetCountrySelect}
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

export const PageCustomForm = () => {
    return <>
        <Container maxWidth={'lg'} fixed>
            <Paper variant={'outlined'} sx={{px: 2, pt: 1, pb: 4}}>
                <Box mb={2}>
                    <Typography variant={'h1'} gutterBottom>UI-Schema Custom Rendering</Typography>
                    <ReadMore>
                        <Typography variant={'body1'} gutterBottom>The form on this page is the same as `SimpleForm`, but rendered at custom positions, allowing for fine-grained control over layout and component rendering, which is useful for complex designs or integrating with existing UI components.</Typography>
                        <Typography variant={'body1'} gutterBottom>This strategy can be used to create compound widgets, which have static properties, or to split up large schemas into multiple pages/tabs.</Typography>
                        <Typography variant={'body1'} gutterBottom>It is also possible to pass down a static `schema`, instead of relying on the `getIn` lookups, which makes complex cases (like ref support, global validation) more complex to implement, but can provide alternative usage patterns if no full JSON Schema compatibility is needed and separate field rendering is desired.</Typography>
                    </ReadMore>
                </Box>
                <DemoComponent/>
            </Paper>
        </Container>
    </>
}
