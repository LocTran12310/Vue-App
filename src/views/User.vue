<template>
  <div class="container">
    <div class="row">
      <div class="col-auto">
        <h1>Welcome {{ user.user.login_id }}</h1>
        <button @click="logout" type="button" class="btn btn-primary pd-5">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store/index";

export default class User extends Vue {
  user = {};
  async logout(): Promise<void> {
    await store.dispatch("logout");
    this.$router.push("/login");
  }
  created() {
    this.user = store.state.user;
  }
}
</script>
