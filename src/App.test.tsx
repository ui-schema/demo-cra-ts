import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './App'

test('renders headline', () => {
    render(<App/>)
    const headline = screen.getByText(/UI-Schema TS Example/i)
    expect(headline).toBeInTheDocument()
})
