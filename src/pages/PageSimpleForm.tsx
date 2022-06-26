import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Nav } from '../components/Layout'
import {
    createOrderedMap, createStore, injectPluginStack, JsonSchema,
    onChangeHandler, storeUpdater,
    UIStoreProvider,
} from '@ui-schema/ui-schema'
import { OrderedMap } from 'immutable'
import { GridContainer } from '@ui-schema/ds-material/GridContainer'
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

const GridStack = injectPluginStack(GridContainer)
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
            <GridStack
                schema={schema}
                showValidity={showValidity}
                isRoot
            />

            <DataDebug/>
        </UIStoreProvider>
    </React.Fragment>
}

export const PageSimpleForm: React.ComponentType = () => {
    return <>
        <Container maxWidth={'md'} fixed style={{display: 'flex'}}>
            <Nav/>
            <Box mx={2} py={1} style={{flexGrow: 1}}>
                <Box mb={2}>
                    <Typography variant={'h1'} gutterBottom>UI-Schema Simple Form</Typography>
                    <Typography variant={'body2'} gutterBottom>The form on this page is the same as `Custom Rendering`, but rendered automatically using <code>injectPluginStack(GridContainer)</code>.</Typography>
                </Box>
                <DemoComponent/>
            </Box>
        </Container>
    </>
}
