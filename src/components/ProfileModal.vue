<template>
  <div>
    <button
      @click="isOpen = true"
      class="button is-block is-success is-light is-fullwidth"
    >
      Update Info
    </button>
    <div :class="['modal', { 'is-active': isOpen }]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">User Profile</p>
          <button
            @click="isOpen = false"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="title">Username</label>
              <input class="input" v-model="userProfile.username" />
            </div>
            <div class="field">
              <label class="title">Avatar</label>
              <input class="input" v-model="userProfile.avatar" />
            </div>
            <div class="field">
              <label class="title">Info about user</label>
              <input class="input" v-model="userProfile.info" />
            </div>
            <div class="field">
              <label class="title">Address</label>
              <input class="input" v-model="userProfile.address" />
            </div>
            <div class="field">
              <label class="title">Countery</label>
              <input class="input" v-model="userProfile.countery" />
            </div>
            <div class="field">
              <label class="title">Phone</label>
              <input class="input" v-model="userProfile.phone" />
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button
            @click="profileHandle"
            class="button is-success"
            :disabled="isLoading"
          >
            Save changes
          </button>
          <button @click="isOpen = false" class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import useAuth from '@/composition/useAuth';
export default {
  data() {
    return {
      isOpen: false,
      userProfile: { ...this.user },
    };
  },
  setup() {
    return useAuth();
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    profileHandle() {
      this.$store.dispatch('user/updateProfile', {
        data: this.userProfile,
        onSuccess: () => (this.isOpen = false),
      });
    },
  },
};
</script>
