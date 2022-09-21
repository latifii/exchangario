<template>
  <div class="form-error" v-for="error of errors" :key="error.$uid">
    <div class="help is-danger">
      {{ error.$message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Object,
      required: true,
    },
  },
};
</script>
