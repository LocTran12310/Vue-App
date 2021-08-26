<template>
  <div class="container">
    <div class="row">
      <div v-if="error != ''" class="alert alert-danger">
        {{ error }}
      </div>
      <div v-else-if="success != ''" class="alert alert-success">
        {{ success }}
      </div>
    </div>
    <div class="row">
      <div class="flex">
        <button @click="getProfile" class="btn btn-primary m-3">
          Get Profile
        </button>
      </div>
    </div>
    <div class="row">
      <form
        class="alert alert-secondary col-md-6"
        @submit.prevent="createProfile || updateProfile"
      >
        <div class="form">
          <div class="form-group">
            <label for="inputId">ID</label>
            <input
              v-model="id"
              type="text"
              class="form-control"
              id="inputId"
              placeholder="ID"
            />
          </div>
          <div class="form-group">
            <label for="inputEmployeeID">Employee ID</label>
            <input
              v-model="employeeID"
              type="text"
              class="form-control"
              id="inputEmployeeID"
              placeholder="EmployeeID"
            />
          </div>
          <div class="form-group">
            <label for="inputName">Name</label>
            <input
              v-model="name"
              type="text"
              class="form-control"
              id="inputName"
              placeholder="Name"
            />
          </div>
          <div class="form-group">
            <label for="inputEmail4">Email</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
          <div class="form-group">
            <label for="inputPositionID">Position ID</label>
            <input
              v-model="positionID"
              type="text"
              class="form-control"
              id="inputPositionID"
              placeholder="PositionID"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputTelephone">Telephone</label>
          <input
            v-model="telephone"
            type="text"
            class="form-control"
            id="inputTelephone"
            placeholder="Telephone"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input
            v-model="address"
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>

        <button @click="createProfile" class="btn btn-primary m-3">
          CREATE
        </button>
        <button @click="updateProfile" class="btn btn-primary m-3">
          UPDATE
        </button>
      </form>
      <div class="col-md-6">
        <ul class="list-unstyled" v-if="Object.keys(profile).length !== 0">
          <li>ID: {{ profile.id }}</li>
          <li>Name: {{ profile.name }}</li>
          <li>Email: {{ profile.email }}</li>
          <li>Position ID: {{ profile.position_id }}</li>
          <li>Telephone: {{ profile.telephone }}</li>
          <li>Address: {{ profile.address }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { API } from "@/utils/api";

@Options({
  components: {},
})
export default class Home extends Vue {
  profile = {};
  id = "";
  employeeID = "";
  name = "";
  email = "";
  positionID = "";
  telephone = "";
  address = "";
  error = "";
  success = "";
  getProfile() {
    if (this.id === "") {
      this.error = "ID required";
      return;
    }
    API.get("/profiles/" + this.id)
      .then((res) => {
        this.profile = res.data.data;
        this.success = "Successful";
        this.error = "";
      })
      .catch((err) => {
        this.error = "Unauthorized";
      });
  }
  createProfile() {
    const profiles = JSON.stringify({
      employee_id: this.employeeID,
      name: this.name,
      email: this.email,
      birthday: "",
      position_id: parseInt(this.positionID),
      department_id: 1,
      status: 1,
      address: this.address,
      telephone: this.telephone,
      mobile: this.telephone,
      official_date: "",
      probation_date: "",
      gender: 1,
      image: "",
      del_flag: 0,
    });
    API.post("/profiles/create", profiles)
      .then((res) => {
        this.profile = res.data.data;
        this.success = "Successful";
        this.error = "";
      })
      .catch((err) => {
        console.log(profiles);
        this.error = "Unauthorized";
        throw err;
      });
  }
  updateProfile() {
    const profiles = JSON.stringify({
      employee_id: this.employeeID,
      name: this.name,
      email: this.email,
      birthday: "",
      position_id: parseInt(this.positionID),
      department_id: 1,
      status: 1,
      address: this.address,
      telephone: this.telephone,
      mobile: this.telephone,
      official_date: "",
      probation_date: "",
      gender: 1,
      image: "",
      del_flag: 0,
    });
    API.patch("/profiles/update/" + this.id, profiles)
      .then((res) => {
        this.profile = res.data.data;
        this.success = "Successful";
        this.error = "";
      })
      .catch((err) => {
        console.log(profiles);
        this.error = "Unauthorized";
        throw err;
      });
  }
}
</script>
