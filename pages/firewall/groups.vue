<template>
  <div style="width: 100%">
    <h1 class="page-title">
      Firewall groups
    </h1>
    <DataTable
      :value="data"
      sort-mode="multiple"
      striped-rows
      size="large"
      table-style="witdh: 100%"
      :resizable-columns="true"
      table-class="datatable"
    >
      <Column
        field="name"
        header="Name"
        style="width: 25%"
      />
      <Column
        field="group"
        header="Group"
        sortable
        style="width: 25%"
      />
      <Column
        field="type"
        header="Type"
        sortable
        style="width: 25%"
      />
      <Column
        field="description"
        header="Description"
        style="width: 25%"
      />
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { useDependencies } from '~/composables/useDependencies'
import type {
  GroupConfig,
  FirewallGroup,
  AddressGroup,
  IPv6AddressGroup,
  NetworkGroup,
  IPv6NetworkGroup,
  InterfaceGroup,
  MacGroup,
  PortGroup,
  DomainGroup,
} from '~/shared/types/firewall'

const config = ref(await useDependencies().vyOsAdapter.getFirewall())

interface Data {
  name: string
  description: string
  type: string
  group: string[]
}

const GroupEnum = {
  AddressGroup: 'address',
  IPv6AddressGroup: 'address-v6',
  NetworkGroup: 'network',
  IPv6NetworkGroup: 'network-v6',
  InterfaceGroup: 'interface',
  MacGroup: 'mac-address',
  PortGroup: 'port',
  DomainGroup: 'domain',
}

function groupListing(group: FirewallGroup, type: string): string[] {
  switch (type) {
    case GroupEnum.AddressGroup:
      return (group as AddressGroup).addresses
    case GroupEnum.IPv6AddressGroup:
      return (group as IPv6AddressGroup).addresses
    case GroupEnum.NetworkGroup:
      return (group as NetworkGroup).networks
    case GroupEnum.IPv6NetworkGroup:
      return (group as IPv6NetworkGroup).networks
    case GroupEnum.InterfaceGroup:
      return (group as InterfaceGroup).interfaces
    case GroupEnum.MacGroup:
      return (group as MacGroup).macAddresses
    case GroupEnum.PortGroup:
      return (group as PortGroup).ports
    case GroupEnum.DomainGroup:
      return (group as DomainGroup).domains
  }
  return []
}

function groupToData(type: string, group: FirewallGroup): Data {
  return {
    name: group.name,
    description: group.description,
    type: type,
    group: groupListing(group, type),
  }
}

function groupConfigToData(config: GroupConfig): Data[] {
  return config.addressGroup?.map(group => groupToData(GroupEnum.AddressGroup, group))
    .concat(config.ipv6AddressGroup?.map(group => groupToData(GroupEnum.IPv6AddressGroup, group)) ?? [])
    .concat(config.networkGroup?.map(group => groupToData(GroupEnum.NetworkGroup, group)) ?? [])
    .concat(config.ipv6NetworkGroup?.map(group => groupToData(GroupEnum.IPv6NetworkGroup, group)) ?? [])
    .concat(config.interfaceGroup?.map(group => groupToData(GroupEnum.InterfaceGroup, group)) ?? [])
    .concat(config.macGroup?.map(group => groupToData(GroupEnum.MacGroup, group)) ?? [])
    .concat(config.portGroup?.map(group => groupToData(GroupEnum.PortGroup, group)) ?? [])
    .concat(config.domainGroup?.map(group => groupToData(GroupEnum.DomainGroup, group)) ?? []) ?? []
}

const data = ref([] as Data[])

if (config.value?.group) {
  data.value = groupConfigToData(config.value.group)
}
</script>

<style>
.datatable {
  --p-datatable-row-striped-background: #F6F8FA;
}

.page-title {
  font-family: "Archivo";
  font-size: 32px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}
</style>
