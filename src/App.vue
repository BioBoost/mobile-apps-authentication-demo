<template>
  <v-app id="authdemo">
    <v-app-bar
      app color="red"
    >
    
      <v-toolbar-items class="d-none d-sm-flex" v-if="isUserLoggedIn">
        <v-btn to="/" text class="white--text px-12 no-background-hover">
          {{ username }}
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="white" to="/protected" text>Protected</v-btn>
        <v-btn color="white" to="/register" text>Register</v-btn>
        <v-btn color="white" to="/login" text>Login</v-btn>
        <v-btn color="white" @click="logout" text>Logout</v-btn>
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
import AuthenticationService from "@/services/AuthenticationService";
export default {
  name: "App",
  methods: {
    async logout() {
      console.log("Logging out user ...");

      try {
        await AuthenticationService.logout();
        console.log("User succesfully logged out");

        // Clear user in store
        this.$store.dispatch("logout");
      } catch (error) {
        console.log("Logout failed");
        console.log(error);
      }
    }
  },
  computed: {
    username() {
      let user = this.$store.getters.getUser;
      return `${user.firstname} ${user.lastname}`
    },
    isUserLoggedIn() {
      return !!this.$store.getters.getUser.id
    }
  }
};
</script>
