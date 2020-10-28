<template>
  <v-app id="authdemo">
    <v-app-bar
      app color="red"
    >
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="white" to="/register" text>Register</v-btn>
        <v-btn color="white" to="/login" text>Login</v-btn>
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
