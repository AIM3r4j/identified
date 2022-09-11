<template>
  <div>
    <div class="info-note">
      To review access of all the employees, click the
      <b>Initiate Access Review</b> button given below. The system will notify
      you after it's done processing the request.
    </div>
    <div class="q-pa-md">
      <q-btn color="primary" @click="initiateAccessReview"
        >Initiate Access Review</q-btn
      >
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

export default defineComponent({
  setup() {
    const $q = useQuasar();

    const initiateAccessReview = async () => {
      try {
        $q.loading.show({
          message: "Processing your request. Please wait...",
        });
        const response = await axios.get("/api/reviewaccess");

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

    return {
      initiateAccessReview,
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
