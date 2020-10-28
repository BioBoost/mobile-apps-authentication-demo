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
