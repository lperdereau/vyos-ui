<template>
    <div class="view">
        <div class="nav">
            <Nav />
        </div>

        <div class="page">
            <slot />
        </div>
    </div>
</template>

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
