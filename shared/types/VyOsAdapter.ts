import type { Hardware } from "#shared/types/hardware";
import type { Layout } from "#shared/types/layout";

export interface VyOsAdapter {
  getDashboard(): Promise<Hardware>;
  getLayout(): Promise<Layout>;
}
