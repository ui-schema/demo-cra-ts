import { createStore, onChangeHandler, SchemaResourceProvider, storeUpdater, UIStoreProvider, WidgetEngine } from '@ui-schema/react'
import { createOrderedMap, resourceFromSchema } from '@ui-schema/ui-schema'
import React, { useMemo } from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { OrderedMap } from 'immutable'
import { GridContainer } from '@ui-schema/ds-material/GridContainer'
import { DataDebugViewer, SchemaDebugViewer } from '../components/DebugViewer.js'
import { ReadMore } from '../components/ReadMore.js'

const schema = createOrderedMap({
    type: 'object',
    $defs: { // also the legacy `definitions` keyword is supported
        person: {
            type: 'object',
            properties: {
                name: {type: 'string'},
                children: {
                    type: 'array',
                    widget: 'GenericList',
                    items: {$ref: '#/$defs/person'},
                },
            },
        },
    },
    properties: {
        person: {$ref: '#/$defs/person'},
    },
})

const DemoComponent = () => {
    // as all referenced resources are embedded in this schema, it needs no dynamic schema loading
    const resource = useMemo(() => (schema ? resourceFromSchema(schema, {}) : undefined), [schema])

    const showValidity = true
    const [store, setStore] = React.useState(() => createStore(OrderedMap({})))

    const onChange: onChangeHandler = React.useCallback(
        (actions) => setStore(storeUpdater(actions)),
        [setStore],
    )

    return (
        <SchemaResourceProvider
            resource={resource}
        >
            <UIStoreProvider
                store={store}
                onChange={onChange}
                showValidity={showValidity}
            >
                <GridContainer>
                    <WidgetEngine
                        // instead of the initial schema, pass down the prepared schema,
                        // which is safe for the dynamic schema reduction in UI-Schema
                        schema={resource?.branch.value()}
                        isRoot
                    />
                </GridContainer>

                <DataDebugViewer/>

                <SchemaDebugViewer/>
            </UIStoreProvider>
        </SchemaResourceProvider>
    )
}

export const PageRefForm = () => {
    return <>
        <Container maxWidth={'lg'} fixed>
            <Paper variant={'outlined'} sx={{px: 2, pt: 1, pb: 4}}>
                <Box mb={2}>
                    <Typography variant={'h1'} gutterBottom>UI-Schema Ref Form</Typography>
                    <ReadMore>
                        <Typography variant={'body1'} gutterBottom>This page demonstrates how to use JSON Schema `$ref` keywords to define reusable schema parts, enabling complex and nested data structures to be built from smaller, self-referencing components, which is particularly useful for recursive data models like tree structures or organizational charts.</Typography>
                        <Typography variant={'body1'} gutterBottom>This approach promotes schema reusability and maintainability, allowing for more organized and scalable form definitions while ensuring data consistency across the application.
                        </Typography>
                        <Typography variant={'body1'} gutterBottom>The schema for this form uses a self-referencing `$ref` to define a `person` object that can contain an array of `children`, where each child is also a `person`. This creates a recursive structure that can represent a hierarchy of people.</Typography>
                        <Typography variant={'body1'} gutterBottom>The `SchemaDebugViewer` below shows the resolved schema and the found references, and an option to lookup an canonical pointer, e.g. `#` for root, or `#/properties/person` for the `person` object.</Typography>
                    </ReadMore>
                </Box>
                <DemoComponent/>
            </Paper>
        </Container>
    </>
}
