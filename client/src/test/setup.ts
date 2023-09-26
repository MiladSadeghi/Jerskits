import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'
import handler from './mocks'

export const server = setupServer(...handler)
const noop = () => {}
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
