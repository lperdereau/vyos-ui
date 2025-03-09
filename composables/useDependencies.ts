import {GraphQLClient} from "graphql-request";
import {useGraphQL} from "~/composables/useGraphQL";
import type {VyOsAdapter} from "#shared/types/VyOsAdapter";
import type {Hardware} from "#shared/types/hardware";
import {computeHardware} from "#shared/types/hardware";
import {dashboard} from "#shared/graphql/dashboard";
import {InMemoryVyOs} from "#shared/types/inMemoryVyOs";
import type {Layout} from "#shared/types/layout";
import {layout} from "#shared/graphql/layout";

class GraphQLVyOs implements VyOsAdapter {
    constructor(private readonly client: GraphQLClient) {
        this.client = client;
    }

    async getDashboard(): Promise<Hardware> {
        const data = await this.client.request(dashboard, { key: "foo" });
        return computeHardware(data);

    }

    async getLayout(): Promise<Layout> {
        const data = await this.client.request(layout, { key: "foo" });
        return {host_name: data.result.host_name, version: {version: data.result.version}};
    }
}

export const useDependencies = (): {vyOsAdapter: VyOsAdapter } => {
    //TODO Changer la var d'env
    if (process.env.NODE_ENV === "development") {
        return {vyOsAdapter: new InMemoryVyOs()};
    }
    const {client} = useGraphQL();
    return {vyOsAdapter: new GraphQLVyOs(client)};
};