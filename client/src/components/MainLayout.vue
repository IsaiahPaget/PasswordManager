<template>
  <main>
    <div class="side-bar container">
      <slot name="sidebar"></slot>
    </div>
    <div class="item-list container">
      <slot name="items"></slot>
    </div>
    <div class="item-detail container">
      <slot name="detail"></slot>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  height: 100%;
}

.side-bar {
  flex: calc(2/12);
  background-color: var(--color-bg-light);
  background: linear-gradient(25deg, var(--color-bg-light) 20%, var(--color-bg-lighter) 100%);
}

.item-list {
  flex: calc(3/12);
}

.item-detail {
  flex: calc(7/12);
}
</style>
