<template>
  <div>{{ title }} </div>
</template>

<script>
import tools from '../../js/tools'
let app
export default {
  name: 'MessageFans',
  data() {
    return {
      title: '粉丝管理',
    }
  },
  methods: {
    queryFans() {
      tools.ajax('/message/queryFollowMeUserList', {}, (data) => {
        console.log(data)
      })
    },
  },
  created() {
    app = this
    console.log(app.title)
  },
}
</script>
