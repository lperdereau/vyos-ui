<template>
    <div class="nav-content">
        <NavHeader :name="name" :version="version" />
        <div class="nav-items">
            <NavItem
                title="Dashboard"
                to="/"
                icon="md-dashboard-outlined"
                selected
            />
            <NavItem to="/alerts" title="Alerts" icon="pr-bell" />
            <NavItem title="VPN" icon="bi-shield-lock" />
            <NavItem title="Routing" icon="ri-route-line" />
            <NavItem title="Service" icon="fa-network-wired" />
            <NavItem to="/nic" title="Network Interfaces" icon="bi-ethernet" />
            <NavItem to="/logs" title="Logs" icon="bi-file-earmark-text" />
            <LineSeparator color="#676d7c" />
            <NavItem to="/system" title="System" icon="bi-gear-fill" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
    },
    version: {
        type: String,
    },
});
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
