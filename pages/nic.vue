<template>
  <div class="page-content">
    <h1 class="page-title">
      Network Interface
    </h1>
    <div class="schema-content">
      <InterfaceSchema />
    </div>
  </div>
</template>

<style>
.page-content {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.page-title {
    font-family: "Archivo";
    font-size: 32px;
    font-weight: 600;
    margin: 0;
    padding: 0;
}

.schema-content {
  padding: 50px 0;
  width: 100%;
  height: -webkit-fill-available;
}
</style>
