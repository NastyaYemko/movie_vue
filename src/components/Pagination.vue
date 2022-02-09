<template>
  <div class="page__wrapper">
    <div
        class="page"
        :class="{
          'current-page': page === pageNum
        }"
        v-for="pageNum in totalPages"
        :key="pageNum"
        @click="changePage(pageNum)"
    >{{ pageNum }}</div>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: {
    totalPages: {
      type: Number
    },
    page: {
      type: Number
    }
  },
  methods: {
    changePage(pageNum){
      this.$emit('change', pageNum)
    }
  }
}
</script>

<style scoped>
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}
.current-page {
  border: 2px solid teal;
}
</style>
