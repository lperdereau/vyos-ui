import { useGraphQL } from "~/composables/useGraphQL";
import type { VyOsAdapter } from "#shared/types/VyOsAdapter";
import { InMemoryVyOs } from "#shared/types/inMemoryVyOs";
import { GraphQLVyOs } from "#shared/types/graphQLVyOs";

export const useDependencies = (): { vyOsAdapter: VyOsAdapter } => {
  //TODO Changer la var d'env
  if (process.env.NODE_ENV === "development") {
    return { vyOsAdapter: new InMemoryVyOs() };
  }
  const { client } = useGraphQL();
  return { vyOsAdapter: new GraphQLVyOs(client) };
};
