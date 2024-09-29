<template>
    <div class="row">
        <div class="col-1">
            <slot name="one"></slot>
        </div>
        <div class="col-2">
            <slot name="two"></slot>
        </div>
    </div>
</template>

<style scoped>
   .row {
    display: flex;
    gap: var(--space-base);
   } 
   .col-1 {
    flex: 25%;
   }
   .col-2 {
    flex: 75%;
   }
</style>