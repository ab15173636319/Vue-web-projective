<template>
  <div></div>
</template>

<script>
export default {
  name: 'RouterPage',
  data() {
    return {
      title: '跳转中转页',
      username: this.$route.query.username,
      what: this.$route.query.what,
    }
  },

  mounted() {
    this.$router.push({
      path: '/UserDetail',
      query: {
        what: this.what,
        username: this.username,
      },
    })
  },
}
</script>
<style scoped></style>
