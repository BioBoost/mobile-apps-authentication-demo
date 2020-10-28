<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="8">

      <v-form v-model="valid">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-text-field
              v-model="email" label="Email" :rules="emailRules" required
            ></v-text-field>
          </v-col>
        </v-row>
              
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-text-field
              v-model="password" label="Password" :rules="passwordRules" type="password" required
            ></v-text-field>
          </v-col>
        </v-row>
              
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-btn block color="primary" @click="login">Login</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
  
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import Crypto from "crypto";

export default {
  name: 'Login',
  components: {
  },
  data: function() {
    return {
      valid: false,

      email: '',
      password: '',

      emailRules: [
        v => !!v || 'E-mail is required',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
    }
  },

  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: Crypto.createHash("sha256").update(this.password).digest("hex"),
        });

        console.log(response);
        this.$store.dispatch("login", response.data);

      } catch (error) {
        console.log("Login failed");
        console.log(error);
      }
    },
  }
}
</script>
