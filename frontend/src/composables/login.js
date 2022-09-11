import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";

const login = () => {
  const $q = useQuasar();
  const router = useRouter();

  const email = ref(null);
  const password = ref(null);

  const onSubmit = async () => {
    try {
      const response = await axios.post("/api/login", {
        uname_email: email._value,
        password: password._value,
      });
      if (response.data.success == true) {
        $q.dialog({
          title: "OTP Validation",
          message: response.data.message,
          prompt: {
            model: "",
            isValid: (val) => val.length === 6, // << here is the magic
            type: "text", // optional
          },
          persistent: true,
        }).onOk(async (data) => {
          const validation_response = await axios.post("/api/login/validate", {
            email: email._value,
            code: data,
          });
          if (validation_response.data.success == true) {
            localStorage.setItem(
              "username",
              validation_response.data.user.username
            );
            localStorage.setItem("token", validation_response.data.token);
            router.push("/");
            $q.notify({
              message: validation_response.data.message,
              type: "positive",
            });
          } else {
            $q.notify({
              message: validation_response.data.error.message,
              type: "negative",
            });
          }
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
    email,
    password,
    onSubmit,
  };
};

export default login;
