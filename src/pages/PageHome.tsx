import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Nav } from '../components/Layout'

export const PageHome: React.ComponentType = () => {
    return <>
        <Container maxWidth={'md'} fixed>
            <Typography variant={'h1'} gutterBottom>UI-Schema TS Example</Typography>
            <Nav/>
        </Container>
    </>
}
