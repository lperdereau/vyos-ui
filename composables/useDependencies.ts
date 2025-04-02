import { useGraphQL } from '~/composables/useGraphQL'
import type { VyOsAdapter } from '#shared/types/VyOsAdapter'
import { InMemoryVyOs } from '~/gateways/inMemoryVyOs'
import { GraphQLVyOs } from '~/gateways/graphQLVyOs'

export const useDependencies = (): { vyOsAdapter: VyOsAdapter } => {
  // TODO Changer la var d'env
  if (process.env.NODE_ENV === 'development' || process.env.ENDPOINT === 'inMemory') {
    return { vyOsAdapter: new InMemoryVyOs() }
  }
  const { client } = useGraphQL()
  return { vyOsAdapter: new GraphQLVyOs(client) }
}
