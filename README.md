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

## Create Register View

Create `Register.vue` view which takes in a `firstname`, `lastname`, `email` and `password` of the user. Also add a `Register` button which can later trigger the `register` method we'll add.

```vue
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
            <v-btn block color="primary" >Register</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
  
</template>

<script>
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
}
</script>
```

## Navigating to the Register view

Add a route to the `router` to the `Register` view:

```js
import Register from '@/views/Register.vue'

//....

{
  path: '/register',
  name: 'Register',
  component: Register
},
```

Now you can link to the route from the `Register` button in `App.vue`:

```html
<v-btn color="white" to="/register" text>Register</v-btn>
```

## Create Login View

Next create the `Login` view which is basically a shrunk down version of the `Register` view.

```vue
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
            <v-btn block color="primary">Login</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
  
</template>

<script>
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
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 12 || 'Password must be more than 12 characters',
      ],
    }
  },
}
</script>
```

Also allow the user to navigate to the `Login` view by adding the correct route:

```js
import Login from '@/views/Login.vue'

// ...

{
  path: '/login',
  name: 'Login',
  component: Login
},
```

and configuring the login button in `App.vue`:

```html
<v-btn color="white" to="/login" text>Login</v-btn>
```

## Setting up the Authentication Service

Next we'll setup the `AuthenticationService` which will provide us with the axios calls required for authentication.

Before we do this, we will have to add `axios` as a dependency to our project:

```bash
yarn add axios
```

Next setup an axios instance in the file `services/Api.js`:

```js
import axios from "axios";

export default () => {
  let api = axios.create({
    baseURL: `http://localhost:8081`
  });
  return api
};
```

In a real application the backend url should be made available using environment variables.

Next create the `services/AuthenticationService.js` file which will provide the authentication service to the backend api:

```js
import Api from "@/services/Api";

export default {
  register(accountInfo) {
    return Api().post("register", accountInfo);
  },
  login(credentials) {
    return Api().post("login", credentials);
  },
  logout() {
    return Api().delete("logout");
  },
};
```

## Registering a User

Time to allow a user to register him/herself.

Start by adding an event handler to the `register` button in the `Register` view. Add a `console.log` or something.

```html
<v-btn block color="primary" @click="register">Register</v-btn>
```

```js
methods: {
  register() {
    console.log("Trying to register user ...");
  }
}
```

If this works, its time to call the real logic. For this we'll need to import the `AuthenticationService`. We'll also be hashing the password before sending it to the backend, so we will also need the `crypto` package.

```js
import AuthenticationService from "@/services/AuthenticationService";
import Crypto from "crypto";
```

Call the `register` method of the `AuthenticationService` inside a `try-catch` and make sure to pass the user credentials:

```js
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
    } catch (error) {
      console.log("Register failed");
      console.log(error);
    }
  }
}
```

Note that the `register` function needs to be made `async` because the `axios` call is async and we're awaiting it.

This should result in a working registration setup:

![Register](./img/register.png)

## Storing the User

Now that the register process is up and running we'll need a way to store our `user` object throughout the application. We could emit the user and save it in the app and pass it down each component that needs it but thats not such a good idea. It's also not very clean.

The user will be required in many places, for showing information, checking credentials, ...

A much cleaner solution is the `vuex` store which allows our app to keep global state. It serves as a centralized data store for our whole application.

More information can be found here: [Vuex](https://vuex.vuejs.org/).

### Installing Vuex

Let's start by installing the `vuex` package.

```bash
yarn add vuex
```

### Setup the store

Next we'll need to setup the store and pass it to `Vue` so it will become available globally. Do this by creating a file `store/store.js` with the following content:

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true
});
```

and import the file inside `main.js` and pass the `Vuex` instance to `Vue`:

```js
// ...
import store from "./store/store";

// ...

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
```