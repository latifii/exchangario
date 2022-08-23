<template>
  <header class="header">
    <nav class="navbar" :class="$route.path === '/' ? '' : 'with-background'">
      <div class="container">
        <div class="navbar-brand">
          <router-link
            :to="{ name: 'home' }"
            class="navbar-item has-text-white is-size-2 has-text-weight-bold"
            href="#"
          >
            exchangario
          </router-link>
          <span
            role="button"
            tabindex="0"
            class="navbar-burger burger has-text-white"
            data-target="navbar-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbar-menu" class="navbar-menu">
          <div class="navbar-end">
            <!-- Loop through the navigation items -->

            <router-link
              v-for="item in menuItems"
              :key="item"
              class="navbar-item nav-style-guide"
              :to="item.link"
              >{{ item.text }}</router-link
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
};
</script>
