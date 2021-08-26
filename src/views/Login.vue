<template>
  <div class="container">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <h1>Login</h1>
        <ul
          v-if="errors && errors.length"
          class="list-unstyled alert alert-danger"
        >
          <li v-for="error of errors" :key="error" class="">{{ error }}</li>
        </ul>
        <form
          class="justify-content-start"
          method="post"
          id="formLogin"
          @submit.prevent="login"
        >
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="username"
              type="text"
              class="form-control"
              name="username"
              placeholder="Enter username"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              name="password"
              placeholder="Enter password"
            />
          </div>
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store/index";

export default class Login extends Vue {
  username = "";
  password = "";
  errors: string[] = [];
  async login(): Promise<void> {
    this.errors = [];
    if (this.username === "") {
      this.errors.push("Username required");
    }
    if (this.password === "") {
      this.errors.push("Password required");
    }
    if (this.errors.length === 0) {
      const user = JSON.stringify({
        login_id: this.username,
        password: this.password,
      });
      try {
        await store.dispatch("login", user);
        const redirectPath = this.$route.query.redirect || "/";
        this.$router.push(redirectPath.toString());
      } catch (err) {
        this.errors.push("Wrong username or password");
      }
    }
  }
}
</script>
