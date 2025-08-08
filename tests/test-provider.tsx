import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { requiredValidatorLegacy, standardValidators, Validator } from '@ui-schema/json-schema'
import { UIMetaProvider } from '@ui-schema/react/UIMeta'
import { PropsWithChildren } from 'react'
import { MemoryRouter } from 'react-router'
import { customBinding } from '../src/components/UISchema.js'
import { browserT } from '../src/t.js'
import { customTheme } from '../src/theme.js'

const themes = customTheme('#05aeca')

const validator = Validator([
    ...standardValidators,
    requiredValidatorLegacy,
])

export const TestProvider = ({children}: PropsWithChildren) => {
    return <MemoryRouter>
        <ThemeProvider theme={themes.dark}>
            <CssBaseline/>

            <UIMetaProvider
                binding={customBinding}
                t={browserT}
                validate={validator.validate}
            >
                {children}
            </UIMetaProvider>
        </ThemeProvider>
    </MemoryRouter>
}
