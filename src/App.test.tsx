import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders home page', () => {
  const { baseElement } = render(<App />)
  expect(baseElement).toMatchSnapshot()
})
