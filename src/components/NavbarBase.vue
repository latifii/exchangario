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
            <div class="navbar-item" v-if="isAuthenticated">
              {{ user.email }}
            </div>
            <router-link
              v-for="item in menuItems"
              :key="item"
              class="navbar-item nav-style-guide"
              :to="item.link"
              >{{ item.text }}</router-link
            >
            <template v-if="isAuthenticated">
             <router-link
                class="navbar-item nav-style-guide"
                :to="{ name: 'ExchangeCreate' }"
                >ExchangeCreate</router-link
              >
             <router-link
                class="navbar-item nav-style-guide"
                :to="{ name: 'profile' }"
                >Profile</router-link
              >
              <div
                class="navbar-item cursor-pointer"
                @click="logoutHandle"
              >
                Logout
              </div>
            </template>
            <template v-else>
              <router-link
                class="navbar-item nav-style-guide"
                :to="{ name: 'register' }"
                >Register</router-link
              >
              <router-link
                class="navbar-item nav-style-guide"
                :to="{ name: 'login' }"
                >Login</router-link
              >
            </template>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import useAuth from '@/composition/useAuth';
export default {
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
  methods: {
    logoutHandle() {
       this.$store.dispatch('user/logout');
    },
  },
  setup() {
    return useAuth();
  },
};
</script>
