<template>
  <div>
    <div class="container">
      <div class="left">
        <el-tree :data="list" :props="defaultProps" :draggable="true" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="right">
        <AM v-if="tab == 1.1"></AM>
        <WD v-if="tab == 1.2"></WD>
        <WM v-if="tab == 1.3"></WM>
        <AR v-if="tab == 1.4"></AR>
        <WDR v-if="tab == 1.5"></WDR>
        <MR v-if="tab == 1.6"></MR>
      </div>
    </div>
  </div>
</template>

<script>
// import tools from '@/js/tools'
import AM from '../messageManage/AllMessage.vue'
import WD from '../messageManage/WatchDay.vue'
import WM from '../messageManage/WitchMounth.vue'
import AR from '../messageManage/AllReg.vue'
import WDR from '../messageManage/WitchDay.vue'
import MR from '../messageManage/MounthReg.vue'
import menu from '@/js/menu'
// let app
export default {
  name: 'MV',
  data() {
    return {
      title: '留言板后台管理',
      menu: menu,
      list: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      tab: 1.1,
    }
  },
  components: {
    AM,
    WD,
    WM,
    AR,
    MR,
    WDR,
  },
  methods: {
    menu_list() {
      let obj = {}
      this.list = []
      menu.forEach((element) => {
        obj[element.id] = element
      })
      menu.forEach((element) => {
        const parent = obj[element.pid]
        if (parent) {
          if (!parent.children) {
            parent.children = []
          }
          parent.children.push(element)
        } else {
          this.list.push(element)
        }
      })
    },
    handleNodeClick(e) {
      this.tab = e.id
    },
  },
  watch: {
    tab() {
      const isDecimal = /^\d+\.\d+$/.test(this.tab)
      if (!isDecimal) {
        this.tab = this.tab + '.1'
      }
    },
  },
  created() {
    this.menu_list()
  },
}
</script>
<style scoped>
@import '@/css/manage/manage.css';
</style>
