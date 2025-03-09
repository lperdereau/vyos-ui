<template>
    <div class="summary">
        <div class="routing-summary">
            <DashboardRoutingChart /> 
        </div>
        <ColumnSeparator color="#eaebed" margin="0 20px" />
        <div class="bgp">
            <DashboardRoutingDoughnut />
        </div>
        <ColumnSeparator color="#eaebed" margin="0 20px" />
    </div>
</template>

<style scoped>
.summary {
    display: flex;
    flex-direction: row;
    gap: 10px;
}
</style>
