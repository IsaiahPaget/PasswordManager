<template>
  <main>
    <div class="side-bar container">
      <slot name="sidebar"></slot>
    </div>
    <div class="main">
      <slot name="navigation"></slot>
      <div class="content">
        <div class="item-list container">
          <slot name="items"></slot>
        </div>
        <div class="item-detail container">
          <slot name="detail"></slot>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  height: 100%;
}

.side-bar {
  flex: calc(1/6);
  background-color: var(--color-bg-light);
  background: linear-gradient(25deg, var(--color-bg-light) 20%, var(--color-bg-lighter) 100%);
}

.main {
  flex: calc(5/6);
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  flex-grow: 1;
}
.item-list {
  flex: calc(3/12);
}

.item-detail {
  flex: calc(9/12);
}
</style>
