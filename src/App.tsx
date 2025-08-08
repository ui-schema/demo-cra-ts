import IconButton from '@mui/material/IconButton'
import { Route, Routes } from 'react-router'
import IcGitHub from '@mui/icons-material/GitHub'
import IcInvert from '@mui/icons-material/InvertColors'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { RouterLink } from './components/MuiLink/MuiLink.js'
import { MuiNavLink } from './components/MuiLink/MuiNavLink.js'
import { routes } from './routes.js'

export default function App({toggleTheme}: { toggleTheme: () => void }) {
    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
                maxHeight: '100%',
            }}
        >
            <Box
                px={1}
                style={{display: 'flex', alignItems: 'center', textAlign: 'left'}}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        overflow: 'auto',
                        py: 1,
                        px: 1,
                    }}
                >
                    {routes.map((route, i, arr) => [
                        <MuiNavLink
                            key={'r:' + route.path}
                            href={route.path}
                            exact={route.path === '/'}
                            sx={{whiteSpace: 'nowrap'}}
                        >
                            {route.name}
                        </MuiNavLink>,
                        i < arr.length - 1 ?
                            <Divider key={'d:' + route.path} orientation={'vertical'} sx={{
                                mx: 0.5,
                                height: '0.75rem',
                            }}/> :
                            null,
                    ]).flat()}
                </Box>

                <IconButton
                    size={'small'}
                    onClick={() => toggleTheme()}
                    sx={{ml: 'auto'}}
                    aria-label={'toggle theme'}
                >
                    <IcInvert fontSize={'small'}/>
                </IconButton>
                <IconButton
                    component={RouterLink}
                    size={'small'}
                    href={'https://github.com/ui-schema/ui-schema'}
                    aria-label={'core project on github'}
                    target={'_blank'}
                    rel="noreferrer noopener"
                    sx={{ml: 0.5}}
                >
                    <IcGitHub fontSize={'small'}/>
                </IconButton>
            </Box>
            <Box
                style={{display: 'flex', flexDirection: 'column', overflow: 'auto'}}
            >
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            Component={route.Component}
                        />
                    ))}
                </Routes>
            </Box>
        </Box>
    )
}
