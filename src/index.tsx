import React, { useState } from 'react'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { customBinding } from './components/UISchema.js'
import { customTheme } from './theme.js'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UIMetaProvider } from '@ui-schema/react/UIMeta'
import { browserT } from './t.js'
import {
    requiredValidatorLegacy,
    standardValidators,
    Validator,
} from '@ui-schema/json-schema'
import App from './App.js'

const rootElement = document.getElementById('root')!
const root = createRoot(rootElement)

const themes = customTheme('#05aeca')

const validator = Validator([
    ...standardValidators,
    requiredValidatorLegacy,
])

const Main = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>(
        () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    )

    const toggleTheme = () => {
        setTheme(t => t === 'dark' ? 'light' : 'dark')
    }

    return <ThemeProvider theme={themes[theme]}>
        <CssBaseline/>

        <UIMetaProvider
            binding={customBinding}
            t={browserT}
            validate={validator.validate}
        >
            <BrowserRouter>
                <App toggleTheme={toggleTheme}/>
            </BrowserRouter>
        </UIMetaProvider>
    </ThemeProvider>
}

root.render(
    <React.StrictMode>
        <React.Profiler id="App" onRender={() => null}>
            <StyledEngineProvider injectFirst>
                <Main/>
            </StyledEngineProvider>
        </React.Profiler>
    </React.StrictMode>,
)
