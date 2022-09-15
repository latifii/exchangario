<template>
  <div>
    <navbar-base :menuItems="menuItems" />
    <router-view />
  </div>
</template>

<script>
import NavbarBase from '@/components/NavbarBase.vue';

export default {
  name: 'App',
  components: { NavbarBase },
  data() {
    return {
      menuItems: [
        {
          text: 'Home',
          link: '/',
        },
        {
          text: 'About',
          link: '/about',
        },
        {
          text: 'FAQ',
          link: '/faq',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import 'assets/styles/variables.scss';
@import '~bulma/bulma.sass';
@import 'assets/styles/main.scss';
</style>
