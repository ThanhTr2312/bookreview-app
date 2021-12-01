<template>
    <div v-if="currentUser" class="jumbotron p-4 p-md-5 text-dark rounded bg-light">
        <div class="border-bottom p-1">
            <h3 class="px-1 py-3 text-center" style="color: #756262">Thông tin người dùng <strong>{{ currentUser.username }}</strong></h3>
        </div>
        <div class="col-md-8 p-3">
          <h5 class="font-weight-bold"  style="color: #756262">Token</h5>
          <p class="text-break">{{ currentUser.accessToken }}</p>
          <h5 class="font-weight-bold"  style="color: #756262">Id</h5>
          <p class="text-justify">{{ currentUser.id }}</p>
          <h5 class="font-weight-bold"  style="color: #756262">E-mail</h5>
          <p class="text-justify">{{ currentUser.email }}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Profile",
	computed: {
        ...mapGetters({
            currentUser: "loggedInUser",
        })
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push("/login");
        }
    },
};
</script>

<style>
.btn:hover {
    color: #756262;
    background-color: #76575727;
    border-color: #968080ab;
}
</style>