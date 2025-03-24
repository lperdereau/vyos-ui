<template>
  <div style="width: 100%">
    <h1 class="page-title">
      Firewall groups
    </h1>
    <div class="filter-container">
      <div class="search-filter">
        <p class="filter-label">
          Search
        </p>
        <InputText
          v-model="search"
          type="text"
          placeholder="Type something here..."
          class="w-full inputtext"
        />
      </div>
      <div class="select-filter">
        <p class="filter-label">
          Groups:
        </p>
        <SelectPills v-model:pills="pills" />
      </div>
    </div>
    <div class="datatable-container">
      <DataTable
        :value="filteredGroups"
        sort-mode="multiple"
        striped-rows
        table-style="witdh: 100%"
        :resizable-columns="true"
        table-class="datatable"
      >
        <Column
          field="name"
          header="Name"
          style="width: 15%"
        />
        <Column
          field="content"
          header="Content"
          sortable
          style="width: 40%"
        >
          <template #body="slotProps">
            {{ Array.isArray(slotProps.data.content) ? slotProps.data.content.join(', ') : slotProps.data.content }}
          </template>
        </Column>
        <Column
          field="type"
          header="Type"
          sortable
          style="width: 20%"
        />
        <Column
          field="description"
          header="Description"
          style="width: 25%"
        >
          <template #body="slotProps">
            {{ slotProps.data.description.replaceAll('\"', '') || '' }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDependencies } from '~/composables/useDependencies'
import { GroupEnum, type Group } from '~/shared/types/firewall'

const config = ref(await useDependencies().vyOsAdapter.getFirewall())

const search = ref(null)

const pills = ref([
  {
    name: 'IPv4',
    value: GroupEnum.AddressGroup,
    selected: false,
  },
  {
    name: 'IPv6',
    value: GroupEnum.IPv6AddressGroup,
    selected: false,
  },
  {
    name: 'NetworkV4',
    value: GroupEnum.NetworkGroup,
    selected: false,
  },
  {
    name: 'NetworkV6',
    value: GroupEnum.IPv6NetworkGroup,
    selected: false,
  },
  {
    name: 'Interface',
    value: GroupEnum.InterfaceGroup,
    selected: false,
  },
  {
    name: 'Port',
    value: GroupEnum.PortGroup,
    selected: false,
  },
  {
    name: 'MAC',
    value: GroupEnum.MacGroup,
    selected: false,
  },
  {
    name: 'Domain',
    value: GroupEnum.DomainGroup,
    selected: false,
  },
])

const selectedGroups = computed<Group[]>(() => {
  if (pills.value.every((pill: any[]) => !pill.selected)) return config.value?.group
  return config.value?.group.filter((group: Group) => {
    return pills.value.some((pill: any[]) => {
      return group.type === pill.value && pill.selected
    })
  })
})

const filteredGroups = computed<Group[]>(() => {
  return selectedGroups.value.filter((group: Group) => {
    if (!search.value) return true
    const searchLower = search.value.toLowerCase()
    return (
      group.name.toLowerCase().includes(searchLower)
      || group.content.toString().toLowerCase().includes(searchLower)
      || group.type.toLowerCase().includes(searchLower)
      || group.description.toLowerCase().includes(searchLower)
    )
  })
})
</script>

<style>
.filter-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
  align-items: flex-end;
}

.select-filter {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-label {
  font-size: 14px;
  color: #676D7C;
}

.filter-label {
  color: #676D7C;
  font-weight: 500;
  font-size: 14px;
  padding-bottom: 4px;
}

.inputtext {
  --p-inputtext-border-color: #D5E0E7;
  --p-inputtext-padding-x: 15px;
  --p-inputtext-padding-y: 5px;
  --p-inputtext-color: #A3AEB3;
  --p-inputtext-border-radius: 4px;
  width: 300px;
}

.datatable-container {
  margin-top: 20px;
}

.datatable {
  --p-datatable-header-cell-padding: 10px 0;
  --p-datatable-header-cell-color: #676D7C;
  --p-datatable-header-cell-hover-color: #676D7C;
  --p-datatable-header-cell-selected-color: #676D7C;
  --p-datatable-column-title-font-weight: 500;
  --p-datatable-header-cell-gap: 0.5rem;
  --p-datatable-header-cell-border-color: #FFF;

  --p-datatable-row-striped-background: #F6F8FA;
  --p-datatable-body-cell-border-color: #FFF;
  --p-datatable-body-cell-padding: 10px 0;
}

.page-title {
  font-family: "Archivo";
  font-size: 32px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}
</style>
