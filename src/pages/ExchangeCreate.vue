<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="form-container">
        <form @submit.prevent="sendForm">
          <div class="field">
            <label class="label">Type</label>
            <div class="control">
              <div class="select">
                <select>
                  <option value="service">Service</option>
                  <option value="product">Product</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input
                class="input"
                v-model="form.title"
                type="text"
                placeholder="Some Nice Product"
              />
              <form-errors :errors="v$.form.title.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <textarea
                class="textarea"
                v-model="form.desc"
                placeholder="Some catchy description about product"
              >
              </textarea>
              <form-errors :errors="v$.form.desc.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">Image Link</label>
            <div class="control">
              <input
                class="input"
                v-model="form.url"
                type="text"
                placeholder="https://unsplash...."
              />
              <form-errors :errors="v$.form.url.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">Price</label>
            <div class="control">
              <input
                class="input"
                v-model="form.price"
                type="number"
                placeholder="249"
              />
              <form-errors :errors="v$.form.price.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">Country</label>
            <div class="control">
              <input
                class="input"
                v-model="form.country"
                type="text"
                placeholder="Slovakia"
              />
              <form-errors :errors="v$.form.country.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">City</label>
            <div class="control">
              <input
                class="input"
                v-model="form.city"
                type="text"
                placeholder="Bratislava"
              />
              <form-errors :errors="v$.form.city.$errors" />
            </div>
          </div>

          <!-- TODO: provide tags inputs -->
          <div class="field">
            <label class="label">Tags</label>
            <div class="control">
              <input
                class="input"
                v-model="form.tags"
                type="text"
                placeholder="programming"
              />
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
            <div class="control">
              <button type="submit" class="button is-text">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import {
  required,
  url,
  minLength,
  minValue,
  helpers,
} from '@vuelidate/validators';
import FormErrors from '@/components/FormErrors.vue';
export default {
  components: { FormErrors },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      form: {
        title: '',
        desc: '',
        url: '',
        price: null,
        country: '',
        city: '',
        tags: [],
      },
    };
  },
  methods: {
    async sendForm() {
      const valid = await this.v$.$validate();
      if (valid) {
        alert(JSON.stringify(this.form));
      }
    },
  },
  validations() {
    return {
      form: {
        title: {
          required: helpers.withMessage('title cannot be empty', required),
        },
        desc: {
          required,
          minLength: helpers.withMessage(
            'Title length should be at least 10!',
            minLength(10)
          ),
        },
        url: { required, url },
        price: { required, minValue: minValue(1) },
        country: { required },
        city: { required },
      },
    };
  },
};
</script>

<style scoped>
.form-container {
  max-width: 960px;
  margin: 0 auto;
  margin-top: 40px;
}
.tag {
  margin: 3px;
}
</style>
