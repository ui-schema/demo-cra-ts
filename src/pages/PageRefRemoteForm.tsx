import CircularProgress from '@mui/material/CircularProgress'
import { createStore, onChangeHandler, SchemaResourceProvider, storeUpdater, UIStoreProvider, WidgetEngine } from '@ui-schema/react'
import { createOrdered, createOrderedMap, getBaseUrl, resourceFromSchema, SchemaResource } from '@ui-schema/ui-schema'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { OrderedMap } from 'immutable'
import { GridContainer } from '@ui-schema/ds-material/GridContainer'
import { DataDebugViewer, SchemaDebugViewer } from '../components/DebugViewer.js'
import { ReadMore } from '../components/ReadMore.js'

const loadSchema = (url: string, versions?: string[]) => {
    console.log('Demo loadSchema (url, optional versions)', url, versions)
    return fetch(url).then(r => r.json())
}

const DemoComponent = () => {
    const [ref, setRef] = useState('https://raw.githubusercontent.com/ui-schema/ui-schema/main/packages/demo-web/public/api/user-schema.json')
    const schema = useMemo(() => createOrderedMap({
        $ref: ref,
    }), [ref])
    const [loading, setLoading] = useState<boolean>(false)
    const [resources, setResources] = useState<Record<string, SchemaResource>>({})
    const resource = useMemo(() => (schema ? resourceFromSchema(schema, {resources}) : undefined), [schema, resources])

    useEffect(() => {
        if (!resource?.unresolved) {
            setLoading(false)
            return
        }
        const abort = new AbortController()
        setLoading(true)
        // todo: improve handling async loading of remote resources
        const schemaUris = Object.keys(resource?.unresolved)
            .map(uri => getBaseUrl(uri))
            // remove empty string uris, as those where no absolute uris
            .filter(uri => uri)

        Promise.all(
            schemaUris.map(schemaUri => loadSchema(schemaUri)),
        )
            .then((loaded) => {
                if (abort.signal.aborted) return
                setLoading(false)
                const resolvedResources = schemaUris.reduce<Record<string, SchemaResource>>((resolvedResources, schemaUri, i) => {
                    const resolvedSchema = loaded[i]
                    resolvedResources[schemaUri] = resourceFromSchema(createOrdered(resolvedSchema))
                    return resolvedResources
                }, {})
                setResources(r => ({
                    ...r,
                    ...resolvedResources,
                }))
            })
            .catch((e) => {
                if (abort.signal.aborted) return
                setLoading(false)
                console.error('Failure while loading unresolved schema', e)
            })
        return () => abort.abort()
    }, [resource?.unresolved])

    const showValidity = true
    const [store, setStore] = useState(() => createStore(OrderedMap({})))

    const onChange: onChangeHandler = useCallback(
        (actions) => setStore(storeUpdater(actions)),
        [setStore],
    )

    return (
        <SchemaResourceProvider
            resource={resource}
        >
            <Box sx={{mb: 3}}>
                <TextField
                    label={'Remote Schema URL'}
                    value={ref || ''}
                    onChange={(e) => setRef(e.target.value)}
                    size={'small'}
                    fullWidth
                />
            </Box>

            <UIStoreProvider
                store={store}
                onChange={onChange}
                showValidity={showValidity}
            >
                {loading ? <Box sx={{display: 'flex'}}><CircularProgress sx={{mx: 'auto'}}/></Box> : null}
                {!loading && resource?.unresolved ?
                    <Alert severity={'error'} variant={'outlined'}>
                        <AlertTitle>{'Unresolved Schemas'}</AlertTitle>
                        {Object.entries(resource?.unresolved).map(([refCanonical, dependingBranches]) =>
                            <Box key={refCanonical}>
                                <Typography>{refCanonical}</Typography>
                                <Typography color={'textSecondary'} fontStyle={'italic'}>{'is referenced by:'}</Typography>
                                <Box component={'ul'} mt={0}>
                                    {dependingBranches.map((branch, i) =>
                                        <li key={i}>
                                            <Typography>{branch.canonical.canonicalLocation}</Typography>
                                        </li>)}
                                </Box>
                            </Box>)}
                    </Alert> : null}
                {!loading ?
                    <GridContainer>
                        <WidgetEngine
                            isRoot
                            schema={resource?.branch.value()}
                        />
                    </GridContainer> : null}

                <DataDebugViewer/>

                <SchemaDebugViewer/>
            </UIStoreProvider>
        </SchemaResourceProvider>
    )
}

export const PageRefRemoteForm = () => {
    return <>
        <Container maxWidth={'lg'} fixed>
            <Paper variant={'outlined'} sx={{px: 2, pt: 1, pb: 4}}>
                <Box mb={2}>
                    <Typography variant={'h1'} gutterBottom>UI-Schema Ref Remote Form</Typography>
                    <ReadMore>
                        <Typography variant={'body1'} gutterBottom>This page demonstrates how to use JSON Schema `$ref` keywords to load remote schema resources, enabling dynamic form generation based on external schema definitions. This is crucial for applications that need to consume schemas from various sources or maintain schema definitions separately from the application code.</Typography>
                        <Typography variant={'body1'} gutterBottom>The form dynamically loads a schema from a specified URL. You can change the URL in the input field to load different remote schemas. The `SchemaDebugViewer` below will show the loaded schema and any unresolved references, which can help in debugging schema loading issues.</Typography>
                        <Typography variant={'body1'} gutterBottom>The `SchemaResourceProvider` is used to manage and resolve these external schema references, ensuring that the `WidgetEngine` can correctly interpret and render the form based on the complete, resolved schema.</Typography>
                    </ReadMore>
                </Box>
                <DemoComponent/>
            </Paper>
        </Container>
    </>
}
