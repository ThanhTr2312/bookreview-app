<template>
    <div class="row">
        <div class="col-md-12">
            <div class="mb-3 input-group">
                <input 
                    type="text"
                    class="form-control"
                    placeholder="Tìm theo tựa đề"
                    v-model="nameToSearch"/>
                <div class="input-group-append">
                    <button 
                        class="btn btn-outline-secondary"
                        type="button"
                        @click="searchName"
                    >
                        Tìm kiếm
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div v-if="currentBookreview">
                <BookreviewFullDetails 
                    :bookreview="currentBookreview"
                />
            </div>
            <div v-else class="jumbotron p-4 p-md-5 text-dark rounded bg-light">
                <div class="col-md-12">
                    <div class="row overflow-hidden flex-md-row">
                        <div class="col d-flex flex-column position-static">
                            <p 
                                class="d-inline-block mb-2" 
                                style="color: #789c73">
                                
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 px-0 py-3 border-bottom">
                    <h1 class="display-4 font-italic text-center" id="title">Ứng dụng đánh giá sách</h1>
                </div>
                <div class="border-top p-1">
                    <h4 class="px-1 py-3 text-center" id="title"><q>Đọc sách rất quan trọng. Nếu bạn đọc sách đúng cách, cả thế giới sẽ mở ra cho bạn</q></h4>
                    <p class="text-justify font-italic text-right" style="font-size: 20px; color: #789c73">
                        Barack Obama</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <h4 style="color: #756262">Bài đánh giá</h4>
            <div class="list-group">
                <div 
                    class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(bookreview, index) in bookreviews"
                    :key="bookreview.id"
                    @click="setActiveBookreview(bookreview, index)"
                >
                    <div class="d-flex w-100 justify-content-between">
                        <strong class="mb-1" style="color: #756262">{{ bookreview.title }}</strong>
                    </div>
                    <p class="mb-1 font-italic text-secondary">{{ bookreview.bookname }}</p>
                    
                </div>
            </div>

            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary" @click="goToAddBookreview">
                Thêm mới
            </button>

            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary" @click="removeAllBookreviews">
                Xóa tất cả
            </button>
        </div>
        
    </div>
</template>


<script>
import BookreviewService from "../services/bookreview.service";
import BookreviewFullDetails from "../components/BookreviewFullDetails";

export default {
    name: "BookreviewHome",
    components: {
        BookreviewFullDetails,
    },
    data() {
        return {
            bookreviews: [],
            currentBookreview: null,
            currentIndex: -1,
            nameToSearch: "",
        };
    },
    methods: {
        setActiveBookreview(bookreview, index) {
            this.currentBookreview = bookreview;
            this.currentIndex = bookreview ? index : -1;
        },

        async retrieveBookreviews() {
            const [error, response] = await this.handle(
                BookreviewService.getAll()
            );
            if (error) {
                console.log(error);
            } else {
                this.bookreviews = response.data;
                console.log(response.data);
            }
        },
        
        refreshList() {
            this.retriveBookreviews();
            this.currentBookreview = null;
            this.currentIndex = -1;
        },

        async removeAllBookreviews() {
            const [error, response] = await this.handle(
                BookreviewService.deleteAll()
            );
            if (error){
                console.log(error);
            } else {
                console.log(response.data);
                this.refreshList();
            }
        },
        goToAddBookreview() {
            this.$router.push("/addbookreview");
        },
        async searchName() {
            const [error, response] = await this.handle(
                BookreviewService.findByName(this.nameToSearch)
            );
            if(error){
                console.log(error);
            } else {
                this.bookreviews = response.data;
                this.setActiveBookreview(null);
                console.log(response.data);
            }
        },
        
    }, 
    mounted() {
        this.retrieveBookreviews();
    },   
};
</script>

<style>
#title {
    font-family: "Playfair Display";
    color: #756262;
}
.list-group-item.active {
  z-index: 2;
  color: #fff;
  background-color: #76575727;
  border-color: #968080ab;
}
.list-group-item:hover {
  color: #fff;
  background-color: #76575727;
}
.btn:hover {
    color: #756262;
    background-color: #76575727;
    border-color: #968080ab;
}
.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #968080ab;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(94, 74, 44, 0.315);
}
</style>