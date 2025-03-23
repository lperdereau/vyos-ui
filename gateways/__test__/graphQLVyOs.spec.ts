import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { GraphQLClient } from 'graphql-request'
import { GraphQLVyOs } from '~/gateways/graphQLVyOs'
import { server } from '~/gateways/__test__/mocks'
import type { CPU, RAM, Storage } from '#shared/types/hardware'

const fakeCpu = (): CPU => ({
  load: 0,
  loadAvg15Minutes: 0,
  loadAvg1Minute: 0,
  loadAvg5Minutes: 0,
  type: 'QEMU Virtual CPU version 2.5+',
})

const fakeStorage = (): Storage => {
  return {
    total: {
      size: 9.50,
      unit: 'GiB',
    },
    used: {
      size: 597.00,
      unit: 'MiB',
    },
  }
}
const fakeRam = (): RAM => {
  return {
    total: {
      size: 1.94,
      unit: 'GiB',
    },
    used: {
      size: 503.97,
      unit: 'MiB',
    },
  }
}
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

  describe('Layout', () => {
    it('should return the layout', async () => {
      const graphQLVyOs = new GraphQLVyOs(new GraphQLClient('http://localhost:3000'))
      expect(await graphQLVyOs.getLayout()).toStrictEqual({
        host_name: 'vyos-lperdereau-1',
        version: { version: '1.5-rolling-202501200007' },
      })
    })

    describe('Dashboard', () => {
      it('should return the dashboard', async () => {
        const graphQLVyOs = new GraphQLVyOs(new GraphQLClient('http://localhost:3000'))
        const dashboad = await graphQLVyOs.getDashboard()

        expect(dashboad.cpu).toStrictEqual(fakeCpu())
        expect(dashboad.storage).toStrictEqual(fakeStorage())
        expect(dashboad.ram).toStrictEqual(fakeRam())
      })
    })
    describe('Logs', () => {
      it('should return the logs', async () => {
        const graphQLVyOs = new GraphQLVyOs(new GraphQLClient('http://localhost:3000'))
        const logs = await graphQLVyOs.getLogs()

        expect(logs[0]).toStrictEqual({
          component: 'vyos-http-api-s[3885]',
          message: 'INFO:      - "POST /graphql HTTP/1.0" 200 OK',
          time: '09 Mar 2025 11:53',
        })
      })
    })
  })
})
