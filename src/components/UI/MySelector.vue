<template>
  <div class="app__btns">
  <select class="select" v-model="modelValue" @change="changeOption">
    <option disabled value="">Select</option>
    <option v-for="option in options" :value="option.value" :key="option.value">{{option.name}}</option>
  </select>
  </div>
</template>

<script>
export default {
  name: "my-select",
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.select {
  width: 50%;
  border: 1px solid teal;
  padding: 10px;
  border-radius: 10px;
}
</style>
