<template>
  <div>
    <video id="video" :class="{ active: vedioVisible }" class="video" ref="myVideo" poster="poster" autoplay="autoplay" :src="vedio" oncontextmenu="return false" controlslist="nodownload"></video>
    <div class="lotteryIcon">
      <img src="https://uploadstatic.mihoyo.com/ys-obc/2020/11/23/159956859/9db8cb5448f3546241fcbba2217e8cc2_924422113712533039.png" alt="" />
      <input type="text" v-model="yuanshinumber" />
      <!-- <div class="iconfont icon-add addyuanshi"></div> -->
    </div>
    <div class="lotteryImg">
      <img src="https://media.9game.cn/gamebase/2021/8/30/228513060.jpg" alt="" />
    </div>
    <div class="lotteryBtn">
      <button @click="One()">抽一次</button>
      <button @click="Ten()">抽十次</button>
    </div>
    <div class="lotteryPrisent" v-show="PrisentVisible && !isTen" @click="PrisentVisible = false">
      <img :src="ROLE.image" alt="" />
      <div>{{ ROLE.name }}</div>
    </div>
    <!-- <div class="lotteryPrisent" v-show="PrisentVisible && isTen" @click="PrisentVisible = false">
      <img :src="ROLE.image" alt="" />
      <div>{{ ROLE.name }}</div>
    </div> -->
  </div>
</template>

<script>
import role from './role'
export default {
  name: 'LotteryView',
  data() {
    return {
      title: 'lottery',
      vediolist: [
        { src: 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=546', key: 1 },
        { src: 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=547', key: 2 },
        { src: 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=548', key: 3 },
        { src: 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=550', key: 4 },
        { src: 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=549', key: 5 },
      ],
      PrisentVisible: false,
      Five: role.Fivelist,
      Five2: role.Five2list,
      Fore: role.forelist,
      Three: role.threelist,
      vedio: '',
      yuanshinumber: 10000, //原石数量
      ChouqvNumber: 0, //随机数
      probability: 0.0006, //出金概率
      probability2: 500, //出紫的概率
      Numberofdraws: 0, //抽数
      stop: false, //出金时中断出紫视频
      vedioVisible: false, //抽卡视频是否出现
      Gold: false, //出金？
      purple: false, //出紫？
      // random: 0,
      ROLE: [],
      isTen: false,
    }
  },
  mounted() {
    document.getElementById('video').addEventListener('ended', () => {
      console.log('yes')
      this.vedioVisible = false
      this.vedio = ''
      this.Gold == false
      this.purple == false
      this.PrisentVisible = true
    })
  },
  methods: {
    One() {
      this.yuanshinumber - 160
      this.vedioVisible = true
      this.Numberofdraws = this.Numberofdraws + 1 //每抽一次就增加抽数
      let random = Math.floor(Math.random() * 100000000) //获取随机数

      if (random < this.probability * 10000) {
        this.Gold = true
        let random2 = Math.floor(Math.random() * 1)
        this.vedio = this.vediolist[0].src
        this.Numberofdraws = 0 //抽数
        this.probability = 0.0006 //出金概率
        if (random2 == 0) {
          this.ROLE = this.Five[0]
        } else {
          let random3 = Math.floor(Math.random() * this.Five2.length)
          for (let i = 0; i < this.Five2.length; i++) {
            if (random3 == this.Five2[i].key) {
              this.ROLE = this.Five2[i]
            }
          }
        }
      } else if (random < this.probability2 * 10000) {
        this.purple = true
        if (this.Gold == false) {
          console.log(this.vediolist[1].src)
        }
        this.probability2 = 0.005
        let random2 = Math.floor(Math.random() * this.Fore.length)
        this.vedio = this.vediolist[1].src
        for (let i = 0; i < this.Fore.length; i++) {
          if (this.Fore[i] == random2) {
            this.ROLE = this.Fore[i]
          }
        }
      } else if (this.purple == false && this.Gold == false) {
        this.vedio = this.vediolist[2].src
        let random3 = Math.floor(Math.random() * this.Three.length)
        for (let i = 0; i < this.Three.length; i++) {
          if (random3 == this.Three[i].key) {
            this.ROLE = this.Three[i]
          }
        }
      }
      this.probability = this.probability * 1.0000001 //出金概率
      this.probability2 = this.probability2 * 2 //出紫的概率
      this.Numberofdraws = this.Numberofdraws + 1 //抽数
    },
    Ten() {
      this.ROLE = new Array(10)
      if (GoldCount != 0 || purpple != 0) {
        this.ROLE = new Array(10)
      }
      console.log('————————————————————————————————————————————————————————————————————————————')
      let purpple = 1
      let GoldCount = 0
      let Blue = 10
      this.yuanshinumber = this.yuanshinumber - 1600
      // this.vedioVisible = true
      let randomlist = [10]
      this.Numberofdraws = this.Numberofdraws + 10
      for (let i = 0; i < 10; i++) {
        let random = Math.floor(Math.random() * 100000000)
        randomlist[i] = random
      }
      // 出金
      for (let j = 0; j < randomlist.length; j++) {
        if (randomlist[j] <= this.probability * 10000) {
          this.Gold = true
          GoldCount++
        } else if (this.Gold == false && randomlist[j] < this.probability2 * 10000) {
          //出紫
          purpple++
          console.log('purpple:', purpple)
        }
      }

      if (GoldCount != 0) {
        this.probability = 0.0006
        this.Numberofdraws = 0
        for (let k = 0; k < GoldCount; k++) {
          let random = Math.floor(Math.random() * 1)
          if (random == 0) {
            for (let j = 0; j < this.ROLE.length; j++) {
              if (this.ROLE[j] == null) {
                //判断数组该位置是否为空
                this.ROLE[j] = this.Five[0]
              }
            }
          } else {
            for (let j = 0; j < this.Five2.length; j++) {
              let random = Math.floor(Math.random() * this.Five2.length)
              if (random == this.Five2[j].key) {
                for (let h = 0; h < this.ROLE.length; h++) {
                  if (this.ROLE[h] == null) {
                    //判断数组该位置是否为空
                    this.ROLE[h] = this.Five[j]
                  }
                }
              }
            }
          }
        }
      }

      if (purpple != 0) {
        for (let i = 0; i < purpple; i++) {
          let random = Math.floor(Math.random() * this.Fore.length)
          console.log('random：', random)
          for (let j = 0; j < this.ROLE.length; j++) {
            if (this.ROLE == null) {
              this.ROLE[j] = this.Fore[random]
            }
          }
        }
      }

      Blue = Blue - GoldCount - purpple
      console.log(Blue)
      this.probability = this.probability * 10.0001
      console.log(this.Numberofdraws)
      console.log(randomlist)
      console.log('紫：', purpple)
      console.log('金：', GoldCount)
      console.log(this.probability2, '---', this.probability)
    },
  },
  watch: {
    ROLE() {
      console.log(this.ROLE)
    },
  },
  created() {
    console.log(this.ROLE)
  },
}
</script>
<style scoped>
.lotteryPrisent {
  color: #fff;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 99999;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.lotteryPrisent img {
  width: 400px;
}

.lotteryPrisent div {
  margin-top: 10px;
  font-size: 1.5rem;
}

.video {
  width: 100vw;
  height: 100vh;
  object-fit: fill;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 9999;
  display: none;
}

.video.active {
  display: flex;
}

.lotteryIcon {
  display: flex;
  justify-content: center;
  align-content: center;
}

.addyuanshi {
  padding: 7px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.lotteryIcon img {
  width: 30px;
  height: 30px;
}
.lotteryIcon input {
  width: 200px;
  height: 26px;
  border: none;
  outline: none;
  font-weight: bold;
  padding: 2px 5px;
}

.lotteryIcon input:hover {
  background-color: #eee;
}
.lotteryIcon input:focus {
  background-color: rgb(117, 116, 116);
  color: #fff;
}

.lotteryImg {
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 10%;
}

.lotteryImg img {
  width: 75%;
}

.lotteryBtn {
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 50px;
}

.lotteryBtn button {
  padding: 5px 10px;
  margin: 10px;
  cursor: pointer;
}

/* // 隐藏video 音量按钮 */
video::-webkit-media-controls-mute-button {
  display: none !important;
}

/* // 隐藏video 当前按钮 */
video::-webkit-media-controls-current-time-display {
  display: none !important;
}

/* // 隐藏video 总时间 */
video::-webkit-media-controls-time-remaining-display {
  display: none !important;
}

/* // 隐藏video 全屏按钮 */
video::-webkit-media-controls-fullscreen-button {
  display: none !important;
}
</style>
