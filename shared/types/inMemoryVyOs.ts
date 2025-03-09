import type {VyOsAdapter} from "#shared/types/VyOsAdapter";
import type {Hardware} from "#shared/types/hardware";
import {computeHardware} from "#shared/types/hardware";
import dashboardJson from "#shared/graphql/dashboard.sample.json";
import type {Layout} from "#shared/types/layout";

export class InMemoryVyOs implements VyOsAdapter {
    async getDashboard(): Promise<Hardware> {
        return computeHardware(dashboardJson)
    }

    async getLayout(): Promise<Layout> {
        return {host_name: 'vyos-lperdereau-1', version: {version: '1.5-rolling-202501200007'}};
    }
}