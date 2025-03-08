<template>
    <div class="view">
        <div class="nav">
            <Nav :name="name" :version="version" />
        </div>

        <div class="page">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGraphQL } from "~/composables/useGraphQL";
import { layout } from "#shared/graphql/layout";

const { client } = useGraphQL();

const { data } = await useAsyncData("result", async () => {
    return await client.request(layout, { key: "foo" });
});

const name = ref(data.value.SystemStatus.data.result.host_name);
const version = ref(data.value.SystemStatus.data.result.version.version);
</script>

<style>
@import url("~/assets/css/main.css");

.nav {
    min-height: 100vh;
    width: 20%;
    display: flex;
}
.page {
    width: 100%;
    min-height: 100vh;
    display: flex;
    padding: 33px 50px 0 50px;
}
.view {
    display: flex;
    flex-direction: row;
}
</style>
