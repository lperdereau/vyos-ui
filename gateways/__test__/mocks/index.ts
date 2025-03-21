import { setupServer } from 'msw/node'
import { handlers } from '~/gateways/__test__/mocks/handlers'

export const server = setupServer(...handlers)
