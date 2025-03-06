import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  MdDashboardOutlined,
  PrBell,
  BiShieldLock,
  RiRouteLine,
  FaNetworkWired,
  BiEthernet,
  BiFileEarmarkText,
  BiGearFill,
} from "oh-vue-icons/icons";

export default defineNuxtPlugin((app) => {
  addIcons(
    MdDashboardOutlined,
    PrBell,
    BiShieldLock,
    RiRouteLine,
    FaNetworkWired,
    BiEthernet,
    BiFileEarmarkText,
    BiGearFill,
  );

  app.vueApp.component("v-icon", OhVueIcon);
});
