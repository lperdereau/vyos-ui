import { GraphQLClient } from "graphql-request";
import type { Hardware } from "#shared/types/hardware";
import { computeHardware } from "#shared/types/hardware";
import { dashboard } from "#shared/graphql/dashboard";
import type { Layout } from "#shared/types/layout";
import { layout } from "#shared/graphql/layout";
import type { VyOsAdapter } from "#shared/types/VyOsAdapter";

export class GraphQLVyOs implements VyOsAdapter {
  constructor(private readonly client: GraphQLClient) {
    this.client = client;
  }

  async getDashboard(): Promise<Hardware> {
    const data = await this.client.request(dashboard, { key: "foo" });
    return computeHardware(data);
  }

  async getLayout(): Promise<Layout> {
    const data: any = await this.client.request(layout, { key: "foo" });
    return {
      host_name: data.SystemStatus.data.result.host_name,
      version: { version: data.SystemStatus.data.result.version.version },
    };
  }
}
