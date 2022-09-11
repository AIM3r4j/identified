<template>
  <div class="row">
    <div class="info-note">
      To change the email credential of any employee, click the
      <b>Change Email</b> button and fill up the form with appropriate
      information and then click the <b>Confirm</b> button given there. The
      system will notify you after it's done processing the request.
    </div>
    <div class="info-note">
      To change the password credential of any employee, click the
      <b>Change Password</b> button and fill up the form with appropriate
      information and then click the <b>Confirm</b> button given there. The
      system will notify you after it's done processing the request.
    </div>
    <div class="q-pa-md">
      <q-btn-dropdown color="primary" label="Change Email">
        <div class="row">
          <q-card rounded bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md" @submit="onEmailSubmit">
                <q-input
                  rounded
                  outlined
                  clearable
                  v-model="current_email"
                  type="email"
                  name="current_email"
                  label="User's Current Email"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Input Required',
                  ]"
                />

                <q-input
                  rounded
                  outlined
                  clearable
                  v-model="new_email"
                  type="email"
                  name="new_email"
                  label="New Email"
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
                    label="Confirm"
                    type="submit"
                  />
                </q-card-actions>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-btn-dropdown>
    </div>
    <div class="q-pa-md">
      <q-btn-dropdown color="primary" label="Change Password">
        <div class="row">
          <q-card rounded bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md" @submit="onPasswordSubmit">
                <q-input
                  rounded
                  outlined
                  clearable
                  v-model="email"
                  type="email"
                  name="email"
                  label="User's email"
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
                    label="Confirm"
                    type="submit"
                  />
                </q-card-actions>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-btn-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import change from "../composables/change";

export default defineComponent({
  name: "Credential Management",
  setup() {
    const { current_email, new_email, email, onEmailSubmit, onPasswordSubmit } =
      change();

    return {
      current_email,
      new_email,
      email,
      onEmailSubmit,
      onPasswordSubmit,
    };
  },
});
</script>

<style>
.info-note {
  font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,
    Arial, sans-serif;
  background-color: #fcf2d7;
  border-radius: 4px;
  margin: 16px 10px;
  padding: 16px 24px;
  font-size: 1em;
  line-height: 1.35em;
  border-width: 0 5px;
  border-style: solid;
  border-color: #f4cf6a;
  letter-spacing: 0.5px;
}
</style>
