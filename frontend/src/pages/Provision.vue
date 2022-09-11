<template>
  <div>
    <div>
      <div class="info-note">
        To provision employees, click the
        <b>Go to provisioning sheet</b> button and update the sheet with their
        information and then click the <b>Initiate Provisioning</b> button given
        below. The system will notify you after it's done processing the
        request.
        <q-btn
          class="q-ma-sm"
          size="sm"
          color="primary"
          @click="showImage = !showImage"
        >
          Watch Data Input Demo
        </q-btn>
      </div>
      <div v-if="showImage">
        <img src="/images/provisioning.png" alt="" width="1000" />
      </div>
    </div>

    <div class="q-pa-md">
      <q-btn
        color="primary"
        href="https://docs.google.com/spreadsheets/d/1YoOTk8NIbYvJ-mQcvLmrThI2WFhrNtTUOVgu31mteeQ/edit#gid=0"
        target="”_blank”"
        >Go to Provisioning Sheet</q-btn
      >
    </div>
    <div class="q-pa-md">
      <q-btn color="primary" @click="initiateProvision"
        >Initiate Provisioning</q-btn
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import { useQuasar } from "quasar";
import axios from "axios";

export default defineComponent({
  name: "Provision",
  setup() {
    const showImage = ref(false);
    const $q = useQuasar();

    const initiateProvision = async () => {
      try {
        $q.loading.show({
          message: "Processing your request. Please wait...",
        });
        const response = await axios.get("/api/provision");

        if (response.data.success == true) {
          $q.loading.hide();
          $q.notify({
            message: response.data.message,
            type: "positive",
          });
        } else {
          $q.loading.hide();
          $q.notify({
            message: response.data.error.message,
            type: "negative",
          });
        }
      } catch (error) {
        return error;
      }
    };

    return { showImage, initiateProvision };
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
