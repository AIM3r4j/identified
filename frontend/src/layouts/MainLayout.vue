<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-toolbar-title shrink class="text-weight-bold">
            Identified
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account Settings</q-tooltip>
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column items-center">
                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    <p class="text-bold">{{ username }}</p>
                  </div>

                  <q-btn
                    color="primary"
                    label="Logout"
                    push
                    size="sm"
                    @click="logout"
                    v-close-popup
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            v-for="link in links1"
            :key="link.text"
            :to="link.to"
            v-ripple
            clickable
            exact
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted } from "vue";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import { useRouter } from "vue-router";

export default {
  name: "MyLayout",

  setup() {
    const router = useRouter();

    const username = ref("");
    const leftDrawerOpen = ref(false);
    const search = ref("");

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    onMounted(() => {
      try {
        if (localStorage.token === undefined) {
          router.push("/login");
        } else {
          username.value = localStorage.username;
        }
      } catch (error) {
        return error;
      }
    });

    const logout = () => {
      localStorage.clear();
      router.push("/login");
    };

    return {
      fabYoutube,

      username,
      leftDrawerOpen,
      search,

      toggleLeftDrawer,
      logout,

      links1: [
        { icon: "home", text: "Home", to: "/" },

        { icon: "group_add", text: "Provision", to: "/provision" },
        { icon: "group_remove", text: "Deprovision", to: "/deprovision" },
        {
          icon: "assignment_ind",
          text: "Role Management",
          to: "/manage/role",
        },
        {
          icon: "badge",
          text: "Credential Management",
          to: "/manage/credential",
        },
        {
          icon: "construction",
          text: "Access Review",
          to: "/reviewaccess",
        },
      ],
    };
  },
};
</script>

<style lang="sass">
.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>
