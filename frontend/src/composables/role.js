import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

import { ref } from "vue";
import axios from "axios";

const role = () => {
  const $q = useQuasar();
  const router = useRouter();

  const permission_name = ref("");
  const canDo = ref("");
  const role_name = ref("");
  const permissions = ref(["a"]);
  const deleted_role = ref("");

  let current_permissions = ref([]);
  let current_roles = ref([]);

  const onPermissionSubmit = async () => {
    try {
      $q.loading.show({
        message: "Processing your request. Please wait...",
      });
      const response = await axios.post("/api/manage/role/permissions", {
        permission_name: permission_name._value,
        can: canDo._value,
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

  const onRoleSubmit = async () => {
    try {
      const response = await axios.post("/api/manage/role/create", {
        role_name: role_name._value,
        permissions: permissions._value,
      });
      if (response.data.success == true) {
        $q.notify({
          message: response.data.message,
          type: "positive",
        });
        router.go();
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

  const onRoleDelete = async () => {
    try {
      const response = await axios.post("/api/manage/role/delete", {
        role_name: deleted_role._value,
      });
      if (response.data.success == true) {
        // const response2 = await axios.get("/api/manage/role/roles");
        // current_roles = Object.keys(response2.data.roles);
        $q.notify({
          message: response.data.message,
          type: "positive",
        });
        router.go();
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
    permission_name,
    canDo,
    role_name,
    permissions,
    current_permissions,
    deleted_role,
    current_roles,
    onPermissionSubmit,
    onRoleSubmit,
    onRoleDelete,
  };
};

export default role;
