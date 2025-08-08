import { createStore, onChangeHandler, storeUpdater, UIStoreProvider, WidgetEngine } from '@ui-schema/react'
import { createOrderedMap } from '@ui-schema/ui-schema'
import React from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { OrderedMap } from 'immutable'
import { GridContainer } from '@ui-schema/ds-material/GridContainer'
import { DataDebugViewer } from '../components/DebugViewer.js'
import { FormValidity } from '../components/FormValidity.js'
import { ReadMore } from '../components/ReadMore.js'

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
                    },
                    {
                        const: 'Crisps',
                    },
                    {
                        const: 'Tacos',
                    },
                    {
                        const: 'Nachos',
                    },
                    {
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
            <GridContainer>
                <WidgetEngine
                    schema={schema}
                    isRoot
                />
            </GridContainer>

            <FormValidity store={store}/>

            <DataDebugViewer/>
        </UIStoreProvider>
    </React.Fragment>
}

export const PageSimpleForm = () => {
    return <>
        <Container maxWidth={'lg'} fixed>
            <Paper variant={'outlined'} sx={{px: 2, pt: 1, pb: 4}}>
                <Box mb={2}>
                    <Typography variant={'h1'} gutterBottom>UI-Schema Simple Form</Typography>
                    <ReadMore>
                        <Typography variant={'body1'} gutterBottom>The form on this page is automatically generated using a single `WidgetEngine` component. It showcases how UI-Schema can interpret a JSON Schema and render the corresponding form fields without explicit component mapping for each field.</Typography>
                        <Typography variant={'body1'} gutterBottom>The form includes various input types, such as text fields, and a custom `CountrySelect` widget that fetches data from an external API to populate its options.</Typography>
                        <Typography variant={'body1'} gutterBottom>The `DataDebugViewer` below the form displays the current state of the form data, updating in real-time as you interact with the fields. This is useful for understanding how UI-Schema manages and stores the form's state.</Typography>
                    </ReadMore>
                </Box>
                <DemoComponent/>
            </Paper>
        </Container>
    </>
}
