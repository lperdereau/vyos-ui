import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { GraphQLClient } from 'graphql-request'
import { GraphQLVyOs } from '~/gateways/graphQLVyOs'
import { server } from '~/gateways/__test__/mocks'

describe('graphQLVyOS Adapter', () => {
  beforeAll(() => {
    server.listen()
  })
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })
  it('should return the layout', async () => {
    const graphQLVyOs = new GraphQLVyOs(new GraphQLClient('http://localhost:3000'))
    expect(await graphQLVyOs.getLayout()).toStrictEqual({
      host_name: 'vyos-lperdereau-1',
      version: { version: '1.5-rolling-202501200007' },
    })
  })
})
