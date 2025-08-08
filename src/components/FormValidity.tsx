import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { UIStoreType } from '@ui-schema/react/UIStore'
import { isInvalid } from '@ui-schema/react/isInvalid'

export const FormValidity = (
    {
        store,
    }: {
        store?: UIStoreType<unknown>
    },
) => {
    const invalid = isInvalid(store?.getValidity())
    return <Box mt={2} mb={1} sx={{display: 'flex'}}>
        <Typography
            variant={'body2'}
            sx={{
                backgroundColor: invalid ? 'error.main' : 'success.main',
                color: invalid ? 'error.contrastText' : 'success.contrastText',
                p: 1,
                borderRadius: 3,
            }}
        >{invalid ? 'Form is invalid.' : 'Form is valid.'}</Typography>
    </Box>
}
