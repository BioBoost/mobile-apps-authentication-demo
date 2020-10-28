# Demo of Frontend Authentication

Using VueJS (2), Vuetify, Axios, Vuex and Vue-router.

Usable backend for demonstrational purposes: [My Devices](https://github.com/BioBoost/my-devices-backend).

## Setting Up Vue Project

Create a new Vue App

```bash
vue create authentication-demo
```

Select features manually and make sure to select the `Router`. We'll add `Vuex` later. Leave defaults for the rest.

Next add `vuetify` using (keep defaults):

```bash
vue add vuetify
```

Start the app:

```bash
yarn serve
```

## Create Navigation and Main Layout

Add some navigation buttons to the App layout in `App.vue`:

```vue
<template>
  <v-app id="authdemo">
    <v-app-bar
      app color="red"
    >
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="white" text>Register</v-btn>
        <v-btn color="white" text>Login</v-btn>
        <v-btn color="white" text>Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main id="main">
      <v-container class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
```