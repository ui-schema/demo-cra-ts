import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useSchemaResource } from '@ui-schema/react'
import { useUIStore } from '@ui-schema/react/UIStore'
import { BranchType, SchemaBranchType } from '@ui-schema/ui-schema'
import { memo, useMemo, useState } from 'react'
import { CustomCodeMirror } from './CustomCodeMirror.js'

export const DataDebugViewer = () => {
    const {store} = useUIStore()

    return <DataViewer
        label={'Values Debug'}
        data={store?.valuesToJS()}
        mt={4}
    />
}

const SchemaDebugViewerBase = () => {
    const {resource} = useSchemaResource()
    const [canonicalRef, setCanonicalRef] = useState<string | null>(null)

    const foundSchema = useMemo(() => {
        if (!canonicalRef) return null
        return resource?.findRef(canonicalRef)
    }, [canonicalRef])

    if (!resource) return null

    return <>

        <DataViewer
            label={'Resource Schema'}
            data={resource.branch.value()}
        />

        <DataViewer
            label={'Resource Schema Instances'}
            data={Object.keys(resource.schemas)}
        />

        <DataViewer
            label={'Resource Refs'}
            data={Object.keys(resource.refs)}
        />

        <Box mx={1} mt={2}>
            <Paper variant={'outlined'} sx={{borderRadius: 1}}>
                <Box px={1} py={0.25} mb={0.25}>
                    <Typography variant={'caption'} color={'textSecondary'}>Find Canonical Ref</Typography>
                </Box>
                <Box px={1} pb={1} display={'flex'} alignItems={'center'}>
                    <TextField
                        value={canonicalRef || ''}
                        onChange={(e) => setCanonicalRef(e.target.value)}
                        placeholder={'#/$defs/person'}
                        size={'small'}
                        variant={'standard'}
                        sx={{flexGrow: 1}}
                    />
                    <Button
                        onClick={() => setCanonicalRef(null)}
                        size={'small'}
                        sx={{ml: 1}}
                    >Clear</Button>
                </Box>

                <CustomCodeMirror
                    value={JSON.stringify(foundSchema ? serializeBranch(foundSchema) : null, undefined, 4)}
                    lang={'json'}
                    variant={'standard'}
                    styleOverride={styleOverride}
                />
            </Paper>
        </Box>
    </>
}

export const SchemaDebugViewer = memo(SchemaDebugViewerBase)

const serializeBranch = (foundSchema: BranchType | SchemaBranchType) => {
    const children: Record<string | number, any> = {}
    if (foundSchema.children) {
        for (const [k, b] of foundSchema.children) {
            children[k] = serializeBranch(b)
        }
    }
    return {
        ...foundSchema,
        schema: foundSchema.value?.(),
        children: foundSchema.children ? children : undefined,
        hasReference: foundSchema.reference ? true : undefined,
    }
}

const DataViewer = ({label, data, mt = 2}: { label: string, data: unknown, mt?: number }) => {
    return <Box mx={1} mt={mt}>
        <Paper variant={'outlined'} sx={{borderRadius: 1}}>
            <Box px={1} py={0.25} mb={0.25}>
                <Typography variant={'caption'} color={'textSecondary'}>{label}</Typography>
            </Box>
            <CustomCodeMirror
                value={JSON.stringify(data || null, undefined, 4)}
                lang={'json'}
                variant={'standard'}
                styleOverride={styleOverride}
            />
        </Paper>
    </Box>
}

const styleOverride = {
    cmEditor: {outline: 0},
}
