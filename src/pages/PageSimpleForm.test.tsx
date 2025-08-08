import { afterEach, expect, test } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { TestProvider } from '../../tests/test-provider.js'
import { PageSimpleForm } from './PageSimpleForm.js'

afterEach(() => {
    cleanup()
})

test('renders the simple form page with title and fields', () => {
    render(<PageSimpleForm/>, {
        wrapper: TestProvider,
    })

    // Check for the main heading
    const headerElement = screen.getByRole('heading', {name: /UI-Schema Simple Form/i, level: 1})
    expect(headerElement).toBeInTheDocument()

    // Check for form labels which are associated with inputs
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByText(/favorites/i)).toBeInTheDocument()
    //expect(screen.getByLabelText(/country/i)).toBeInTheDocument()
})

test('form interaction updates the data view and validity', async () => {
    const user = userEvent.setup()
    render(<PageSimpleForm/>, {
        wrapper: TestProvider,
    })

    // Initially, the form should be valid (as all fields are optional)
    expect(screen.getByText(/Form is valid./i)).toBeInTheDocument()

    // Find the name input and type in it
    const nameInput = screen.getByLabelText(/name/i)
    await user.type(nameInput, 'John Doe')

    // The debug viewer should update to show the new name
    const dataViewerContent = await screen.findByText(/"name":/)
    expect(dataViewerContent).toBeInTheDocument()
    expect(dataViewerContent.innerText).toBe('    "name": "John Doe"')
})
