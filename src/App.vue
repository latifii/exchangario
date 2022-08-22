<template>
  <div>
    <navbar-base />
    <exchange-hero />
    <exchangle-list />
    <pagination-base />

    <!-- PAGINATION START -->

    <!-- PAGINATION END -->
  </div>
</template>

<script>
import NavbarBase from '@/components/NavbarBase.vue';
import ExchangeHero from '@/components/ExchangeHero.vue';
import ExchangleList from '@/components/ExchangleList.vue';
import PaginationBase from '@/components/PaginationBase.vue';

export default {
  name: 'App',
  components: { NavbarBase, ExchangeHero, ExchangleList, PaginationBase },
};
</script>

<style lang="scss">
@import 'assets/styles/variables.scss';
@import '~bulma/bulma.sass';
@import 'assets/styles/main.scss';
</style>
