import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useUIStore } from '@ui-schema/ui-schema/UIStore'

export const DataDebug = () => {
    const {store} = useUIStore()

    return <Box mx={1} my={2}>
        <Typography variant={'caption'} gutterBottom>Data</Typography>
        <pre><code>{JSON.stringify(store?.valuesToJS() || null, undefined, 4)}</code></pre>
    </Box>
}
