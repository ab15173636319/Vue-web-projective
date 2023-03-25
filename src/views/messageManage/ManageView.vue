<template>
  <div>
    <el-button @click="getInfoOfWeb">测试</el-button>
  </div>
</template>

<script>
import tools from '@/js/tools'

export default {
  name: 'MV',
  data() {
    return {}
  },
  methods: {
    getInfoOfWeb() {
      console.log('------')
      tools.ajax('/statistics/queryMessageCount', {}, (data) => {
        console.log(data)
      })
    },
  },
  create() {
    this.getInfoOfWeb()
  },
}
</script>
<style scoped></style>
