<template>
  <div class="row">
    <div class="info-note">
      To create an assignable permission for the system, click the
      <b>Create Permission</b> button and fill up the form with appropriate
      information and then click the <b>Confirm</b> button given there. The
      system will notify you after it's done processing the request.
    </div>
    <div class="info-note">
      To create an assignable role to any employee in the system, click the
      <b>Create Role</b> button and fill up the form with appropriate
      information and then click the <b>Confirm</b> button given there. The
      system will notify you after it's done processing the request.
    </div>
    <div class="info-note">
      To delete an existing role in the system, click the
      <b>Delete Role</b> button and fill up the form with appropriate
      information and then click the <b>Confirm</b> button given there. The
      system will notify you after it's done processing the request.
    </div>
    <div class="q-pa-md">
      <q-btn-dropdown color="primary" label="Create Permission">
        <div class="row">
          <q-card rounded bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md" @submit="onPermissionSubmit">
                <q-input
                  rounded
                  outlined
                  clearable
                  v-model="permission_name"
                  type="text"
                  name="permission_name"
                  label="Permission's Name"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Input Required',
                  ]"
                />

                <q-input
                  rounded
                  outlined
                  clearable
                  v-model="canDo"
                  type="text"
                  name="canDo"
                  label="Permission Can Do"
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
                    v-close-popup
                  />
                </q-card-actions>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-btn-dropdown>
    </div>
    <div class="q-pa-md">
      <q-btn-dropdown color="primary" label="Create Role">
        <div class="row">
          <q-card rounded bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md" @submit="onRoleSubmit">
                <q-input
                  rounded
                  outlined
                  clearable
                  v-model="role_name"
                  type="text"
                  name="role_name"
                  label="Role's Name"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Input Required',
                  ]"
                />
                <div class="q-pa-none">
                  <div class="q-gutter-sm">
                    <q-list>
                      <!--
        Rendering a <label> tag (notice tag="label")
        so QCheckboxes will respond to clicks on QItems to
        change Toggle state.
      -->
                      <q-item
                        tag="label"
                        v-ripple
                        v-for="permission in current_permissions"
                      >
                        <q-item-section avatar>
                          <q-checkbox
                            v-model="permissions"
                            :name="permission[0]"
                            :val="permission[0]"
                          />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ permission[1].name }}</q-item-label>
                          <q-item-label caption>{{
                            permission[1].can
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </div>

                <q-card-actions class="q-px-md">
                  <q-btn
                    unelevated
                    rounded
                    color="primary"
                    size="lg"
                    class="full-width"
                    label="Confirm"
                    type="submit"
                    v-close-popup
                  />
                </q-card-actions>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-btn-dropdown>
    </div>
    <div class="q-pa-md">
      <q-btn-dropdown color="primary" label="Delete Role">
        <div class="row">
          <q-card rounded bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md" @submit="onRoleDelete">
                <div class="q-pa-none">
                  <div class="q-gutter-sm">
                    <q-select
                      name="deleted_role"
                      v-model="deleted_role"
                      :options="current_roles"
                      color="primary"
                      filled
                      clearable
                      label="Role to delete"
                    />
                  </div>
                </div>
                <q-card-actions class="q-px-md">
                  <q-btn
                    unelevated
                    rounded
                    color="primary"
                    size="lg"
                    class="full-width"
                    label="Confirm"
                    type="submit"
                    v-close-popup
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
import axios from "axios";
import { defineComponent, ref, watch } from "vue";
import role from "../composables/role";

export default defineComponent({
  name: "Role Management",
  setup() {
    const {
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
    } = role();

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
  },
  async mounted() {
    try {
      const response = await axios.get("/api/manage/role/permissions");
      this.current_permissions = Object.entries(response.data.permissions);

      const response2 = await axios.get("/api/manage/role/roles");
      this.current_roles = Object.keys(response2.data.roles);
    } catch (error) {
      return error;
    }
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
