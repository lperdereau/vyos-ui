import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  MdDashboardOutlined,
  PrBell,
  OiShieldLock,
  OiShieldCheck,
  RiRouteLine,
  FaNetworkWired,
  BiEthernet,
  BiFileEarmarkText,
  BiGearFill,
  HiSolidChevronDown,
  HiSolidChevronUp,
} from 'oh-vue-icons/icons'

export default defineNuxtPlugin((app) => {
  addIcons(
    MdDashboardOutlined,
    PrBell,
    OiShieldLock,
    OiShieldCheck,
    RiRouteLine,
    FaNetworkWired,
    BiEthernet,
    BiFileEarmarkText,
    BiGearFill,
    HiSolidChevronDown,
    HiSolidChevronUp,
  )

  app.vueApp.component('v-icon', OhVueIcon)
})
