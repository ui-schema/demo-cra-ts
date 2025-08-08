import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { MuiLink } from '../components/MuiLink/MuiLink.js'
import { routes } from '../routes.js'

export const PageHome = () => {
    return <>
        <Container maxWidth={'lg'} fixed>
            <Paper variant={'outlined'} sx={{px: 2, pt: 1, pb: 4}}>
                <Typography variant={'h1'} gutterBottom>UI-Schema Examples</Typography>

                <Typography variant={'body1'} gutterBottom>This is an example project for <MuiLink href={'https://github.com/ui-schema/ui-schema'} target={'_blank'} rel={'noreferrer noopener'}>UI-Schema</MuiLink> with React and Material-UI v7.</Typography>

                <Typography variant={'h2'} gutterBottom sx={{mt: 2}}>Pages</Typography>
                <ul>
                    {routes.map((route) => (
                        route.path === '' || route.path === '/' ? null :
                            <li key={route.path}>
                                <MuiLink href={route.path}>{route.name}</MuiLink>
                            </li>
                    ))}
                </ul>
            </Paper>
        </Container>
    </>
}
