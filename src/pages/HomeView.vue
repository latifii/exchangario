<template>
  <exchange-hero />
  <exchangle-list :exchanges="exchanges" />
  <pagination-base />
</template>

<script>
import ExchangeHero from '@/components/ExchangeHero.vue';
import ExchangleList from '@/components/ExchangleList.vue';
import PaginationBase from '@/components/PaginationBase.vue';
export default {
  name: 'HomeView',
  components: {
    ExchangeHero,
    ExchangleList,
    PaginationBase,
  },
  computed: {
    exchanges() {
      return this.$store.state.exchange.data;
    },
  },
  mounted() {
    this.$store.dispatch('getExchanges');
  },
};
</script>
