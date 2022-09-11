<template>
  <q-layout>
    <q-page
      class="bg-primary window-height window-width row justify-center items-center"
    >
      <div class="column">
        <div class="row">
          <h5 class="text-h5 text-white q-my-md">Identified</h5>
        </div>
        <div class="row">
          <q-card rounded bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md" @submit="onSubmit">
                <q-input
                  rounded
                  outlined
                  clearable
                  v-model="email"
                  type="email"
                  name="email"
                  label="Email"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Input Required',
                  ]"
                />

                <q-input
                  rounded
                  outlined
                  clearable
                  v-model="password"
                  name="password"
                  type="password"
                  label="Password"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Input Required',
                  ]"
                />
                <q-card-actions class="q-px-md">
                  <q-btn
                    unelevated
                    rounded
                    color="primary"
                    size="lg"
                    class="full-width"
                    label="Login"
                    type="submit"
                  />
                </q-card-actions>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import login from "../composables/login";

export default {
  setup() {
    const { email, password, onSubmit } = login();

    return { email, password, onSubmit };
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
