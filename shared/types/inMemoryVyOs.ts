import type { VyOsAdapter } from "#shared/types/VyOsAdapter";
import type { Hardware } from "#shared/types/hardware";
import { computeHardware } from "#shared/types/hardware";
import dashboardJson from "#shared/graphql/dashboard.sample.json";
import logsJson from "#shared/graphql/logs.sample.json";
import type { Layout } from "#shared/types/layout";
import { type Log, computeLogs } from "#shared/types/logs";

export class InMemoryVyOs implements VyOsAdapter {
  async getDashboard(): Promise<Hardware> {
    return computeHardware(dashboardJson);
  }

  async getLayout(): Promise<Layout> {
    return {
      host_name: "vyos-lperdereau-1",
      version: { version: "1.5-rolling-202501200007" },
    };
  }

  async getLogs(): Promise<Log[]> {
    console.log(computeLogs(logsJson.data.logs.data.result));
    return computeLogs(logsJson.data.logs.data.result);
  }
}
