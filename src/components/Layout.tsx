import React from 'react'
import { useNavigate, useLocation, Route, Routes } from 'react-router-dom'
import Box from '@mui/material/Box'
import MuiList from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { PageHome } from '../pages/PageHome'
import { PageSimpleForm } from '../pages/PageSimpleForm'
import { PageCustomForm } from '../pages/PageCustomForm'

export const Nav: React.FC<{}> = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return <Box style={{display: 'flex', flexDirection: 'column', flexShrink: 0}}>
        <MuiList>
            <ListItemButton onClick={() => navigate('/simple')} selected={'/simple' === location.pathname}>
                <ListItemText primary={'Simple Form'}/>
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/custom')} selected={'/custom' === location.pathname}>
                <ListItemText primary={'Custom Rendering'}/>
            </ListItemButton>
        </MuiList>
    </Box>
}

export const Layout: React.ComponentType<{}> = () => {
    const scrollWrapper = React.useRef<HTMLDivElement | null>(null)

    return <div
        ref={scrollWrapper}
        style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '100%',
            position: 'relative',
            color: '#ffffff',
            overflow: 'auto',
            padding: '0 12px',
        }}
    >
        <Routes>
            <Route path={'/'} element={<PageHome/>}/>
            <Route path={'/simple'} element={<PageSimpleForm/>}/>
            <Route path={'/custom'} element={<PageCustomForm/>}/>
        </Routes>
    </div>
}
