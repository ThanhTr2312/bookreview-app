<template>
    <div id="app">
        <div class="container">
            <header class="border-bottom py-3" >
                <div class="row flex-nowrap justify-content-between align-items-center" >
                    <div class="col-4 pt-1">
                    </div>
                    <div class="col-4 text-center">
                        <a href="/" style="font-family:'Playfair Display';font-size: 30px; text-decoration: none; color: #756262">
                        Ứng dụng đánh giá sách</a>
                    </div>

                    <div v-if="currentUser" class="col-4 d-flex justify-content-end align-items-center">
                        <router-link to="/profile" class="nav-link" style="color: #756262">
                        {{ currentUser.username }}
                        </router-link>
                        <a class="btn btn-sm btn-outline-secondary" @click.prevent="logout">Đăng xuất</a>
                    </div>

                    <div v-if="!currentUser" class="col-4 d-flex justify-content-end align-items-center">
                        <router-link to="/register" class="btn btn-sm btn-outline-secondary mx-1"> 
                            Đăng ký
                        </router-link>
                        <router-link to="/login" class="btn btn-sm btn-outline-secondary mx-1">
                            Đăng nhập
                        </router-link>
                    </div>
                </div>
            </header>

            <div v-if="currentUser" class="border-bottom py-1 mb-2 ">
                <nav class="nav d-flex justify-content-md-center">
                    <li class="p-1">
                        <router-link to="/bookreview" class="nav-link">
                            Bài đánh giá
                        </router-link>
                    </li>
                    <li class="p-1">
                        <router-link to="/author" class="nav-link">
                            Tác giả
                        </router-link>
                    </li>
                    <li class="p-1">
                        <router-link to="/reviewer" class="nav-link" style="">
                            Người đánh giá
                        </router-link>
                    </li>
                </nav>
            </div>
        </div>

        <div class="container mt-3 mb-5">
            <router-view />
        </div>

        <footer class="mt-5 text-center border-top">
            <p class="p-0 mt-2 font-weight-bold" style="color: #756262">CT449 Phát triển ứng dụng web</p>
            <a href="#" style="color: #756262">Trở lại đầu trang</a>
        </footer>
    </div>
</template>


<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      currentUser: "loggedInUser",
    }),
  },
  methods: {
    ...mapMutations([
        "initAuthState"
    ]),

    logout() {
      this.$store.commit("logout");
      this.$router.push("login");
    },
  },
  mounted() {
    this.initAuthState();
  }
};
</script>

<style>
.nav-link {
    color: #789c73;
}
.nav-link:hover, .nav-link:focus {
    color: #246d1b;
}
</style>
