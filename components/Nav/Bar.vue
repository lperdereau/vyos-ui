<template>
  <div class="nav-content">
    <NavHeader
      :name="name"
      :version="version"
    />
    <div class="nav-items">
      <NavItem
        title="Dashboard"
        to="/"
        icon="md-dashboard-outlined"
        selected
      />
      <NavItem
        to="/alerts"
        title="Alerts"
        icon="pr-bell"
      />
      <NavFolder
        title="Firewall"
        to="/firewall"
        icon="oi-shield-check"
        :items="[
          { to: '/groups', title: 'Group' },
          { to: '/zones', title: 'Zones' },
          { to: '/rules', title: 'Rules' },
        ]"
      />
      <NavFolder
        title="VPN"
        to="/vpn"
        icon="oi-shield-lock"
        :items="[]"
      />
      <NavFolder
        title="Routing"
        to="/routing"
        icon="ri-route-line"
        :items="[]"
      />
      <NavFolder
        title="Services"
        to="/services"
        icon="fa-network-wired"
        :items="[]"
      />
      <NavItem
        to="/nic"
        title="Network Interfaces"
        icon="bi-ethernet"
      />
      <NavItem
        to="/logs"
        title="Logs"
        icon="bi-file-earmark-text"
      />
      <LineSeparator color="#676d7c" />
      <NavItem
        to="/system"
        title="System"
        icon="bi-gear-fill"
      />
      <NavItem
        to="/404"
        title="404"
        icon="hi-search"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
  },
  version: {
    type: String,
  },
})
</script>

<style scoped>
.nav-content {
  display: flex;
  flex-direction: column;

  background-color: #f3f6f9;
  width: 100%;
  height: 100%;
  padding: 33px 25px 0 25px;
}

.nav-items {
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  gap: 8px;
}
</style>
