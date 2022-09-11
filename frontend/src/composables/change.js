import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";

const change = () => {
  const $q = useQuasar();

  const current_email = ref(null);
  const new_email = ref(null);
  const email = ref(null);

  const onEmailSubmit = async () => {
    try {
      $q.loading.show({
        message: "Processing your request. Please wait...",
      });
      const response = await axios.post("/api/manage/credential/email", {
        current_email: current_email._value,
        new_email: new_email._value,
      });
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

  const onPasswordSubmit = async () => {
    try {
      const response = await axios.post("/api/manage/credential/password", {
        email: email._value,
      });
      if (response.data.success == true) {
        $q.notify({
          message: response.data.message,
          type: "positive",
        });
      } else {
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
    current_email,
    new_email,
    email,
    onEmailSubmit,
    onPasswordSubmit,
  };
};

export default change;
