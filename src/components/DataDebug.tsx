import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { useUIStore } from '@ui-schema/ui-schema/UIStore'

export const DataDebug = () => {
    const {store} = useUIStore()

    return <Box mx={1} mt={4} mb={1}>
        <Paper variant={'outlined'} style={{borderRadius: 5}}>
            <Box px={1} pb={1}>
                <Typography variant={'caption'} color={'textSecondary'}>Values Debug</Typography>
                <pre style={{margin: 0}}><code>{JSON.stringify(store?.valuesToJS() || null, undefined, 4)}</code></pre>
            </Box>
        </Paper>
    </Box>
}
