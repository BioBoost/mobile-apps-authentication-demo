<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="8">

      <v-form v-model="valid">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-text-field
              v-model="firstname" label="First name" :rules="nameRules" required
            ></v-text-field>
          </v-col>
        </v-row>
              
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-text-field
              v-model="lastname" label="Last name" :rules="nameRules" required
            ></v-text-field>
          </v-col>
        </v-row>
              
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
            <v-btn block color="primary" @click="register">Register</v-btn>
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
  name: 'Register',
  components: {
  },
  data: function() {
    return {
      valid: false,

      firstname: '',
      lastname: '',
      email: '',
      password: '',

      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 12 || 'Password must be more than 12 characters',
      ],
    }
  },

  methods: {
    async register() {
      console.log("Trying to register user ...");

      try {
        const response = await AuthenticationService.register({
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: Crypto.createHash("sha256").update(this.password).digest("hex"),
        });

        console.log("User succesfully registered");
        console.log(response);

        // Save user in store
        this.$store.dispatch("login", response.data);

      } catch (error) {
        console.log("Register failed");
        console.log(error);
      }
    }
  }
}
</script>
