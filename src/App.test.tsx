import { expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { TestProvider } from '../tests/test-provider.js'
import App from './App.js'

test('renders header', async () => {
    const {getByText} = render(<App toggleTheme={vi.fn()}/>, {
        wrapper: TestProvider,
    })
    const headerElement = getByText(/UI-Schema Examples/i)
    await expect.element(headerElement).toBeInTheDocument()
})

test('toggles theme when button is clicked', async () => {
    const toggleTheme = vi.fn()
    const {getByRole} = render(<App toggleTheme={toggleTheme}/>, {
        wrapper: TestProvider,
    })

    const themeButton = getByRole('button', {name: /toggle theme/i})
    await expect.element(themeButton).toBeInTheDocument()
    await themeButton.click()

    expect(toggleTheme).toHaveBeenCalledTimes(1)
})
