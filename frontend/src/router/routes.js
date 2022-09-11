const routes = [
  {
    path: "",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      needsAuth: true,
    },
    children: [
      {
        path: "",
        component: () => import("pages/Home.vue"),
        meta: {
          needsAuth: true,
        },
      },

      {
        path: "manage/role",
        component: () => import("src/pages/RoleManagement.vue"),
        meta: {
          needsAuth: true,
        },
      },
      {
        path: "manage/credential",
        component: () => import("src/pages/CredentialManagement.vue"),
        meta: {
          needsAuth: true,
        },
      },
      {
        path: "provision",
        component: () => import("pages/Provision.vue"),
        meta: {
          needsAuth: true,
        },
      },
      {
        path: "deprovision",
        component: () => import("pages/Deprovision.vue"),
        meta: {
          needsAuth: true,
        },
      },
      {
        path: "reviewaccess",
        component: () => import("pages/AccessReview.vue"),
        meta: {
          needsAuth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
    meta: {
      userLoggedIn: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
