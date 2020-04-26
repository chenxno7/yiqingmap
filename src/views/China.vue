<template>
  <div class="china">
    <div class="header">
      <h3>国内疫情</h3>
      <p>{{times}}</p>
    </div>
    <div id="total">
      <total v-for="(total,i) of totals" :key="i" :total="total"></total>
    </div>
    <div class="nav">
      <a href="javascript:;" :class="{active:showNow}" @click="showNow=true">现存确诊</a>
      <a href="javascript:;" :class="{active:!showNow}" @click="showNow=(false)">累计确诊</a>
    </div>
    <p class="title">疫情地图</p>
    <map-china :showNow="showNow"></map-china>
    <p class="title">趋势图</p>
    <my-line></my-line>
    <p class="lists_title">国内各地区疫情</p>
    <div class="lists_content">
      <div class="content">
        <my-list :data_lists="data_lists"></my-list>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MapChina from '@/components/MapChina.vue'
import jsonp from 'jsonp'
import Total from '@/components/Total.vue'
import Polyline from '@/components/Polyline.vue'
import List from '@/components/List.vue'

export default {
  components: {
    MapChina,
    Total,
    'myLine':Polyline,
    'myList':List
  },
  data(){
    return {
      showNow:true,
      dataAll:{},
      add_daily:{},
      totals:[],//总体数据，现存确诊等等。。
      data_lists:[],
      times:""
    }
  },
  methods:{
    totalPush(title,num,add,color){
      this.totals.push({
        title:title,
        num:num,
        add:add,
        color:color
      })
    }
  },
  mounted(){
    jsonp('http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',(error,res)=>{
      this.dataAll=res.data;
      this.add_daily=res.data.add_daily;
      // 现存确诊数据添加入totals
      this.totalPush("现有确诊",this.dataAll.econNum,this.add_daily.addecon_new,'#ff6a57');
      // 现有疑似数据添加
      this.totalPush("现有疑似",this.dataAll.sustotal,this.add_daily.wjw_addsus_new,"#ec9217");
      // 境外输入数据添加
      this.totalPush("境外输入",this.dataAll.jwsrNum,this.add_daily.addjwsr,'#476da0');
      // 累计确诊数据添加
      this.totalPush("累计确诊",this.dataAll.gntotal,this.add_daily.addcon_new,'#e83132');
      // 累计死亡数据添加
      this.totalPush("累计死亡",this.dataAll.deathtotal,this.add_daily.adddeath_new,'#10aeb5');
      // 累计治愈数据添加
      this.totalPush("累计治愈",this.dataAll.curetotal,this.add_daily.addcure_new,'#4d5054');
      this.times=this.dataAll.times;
      // console.log(this.times)
      // console.log(this.dataAll);
      // console.log(this.add_daily);
      this.data_lists=res.data.list;
      this.data_lists.forEach(item=>{
        item.show=false
      })
      // console.log(this.data_lists)
    })
  }
}
</script>
<style scoped>
.china{
  position: relative;
}
.china>.header{
  text-align: left;
  padding: 0 20px;
}
.china>.header>p{
  font-weight: lighter;
  font-size: 14px;
}
.china>.nav{
  width: 98%;
  margin: 10px auto;
  margin-bottom: 0;
  background: #ddd;
  padding: 2px;
  border-radius: 5px;
  display: flex;
}
.china a{
  display: block;
  width: 50%;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  text-align: center;
  font-size: 15px;
  text-decoration: none;
  color: #000;
}
.china a.active{
  font-weight: bold;
  background: #fff;
}
.china>.title{
  font-size: 15px;
  font-weight: lighter;
}
.china>.lists_title{
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  padding: 0 25px;
}
.china>.lists_content{
  width: 100%;
  /* padding: 10px 25px; */
}
.china>.lists_content>.nav{
  width: 100%;
}
.china>.lists_content>.nav>ul{
  list-style: none;
  display: flex;
  padding: 0 25px;
}
.china>.lists_content>.nav>ul>li{
  font-size: 15px;
  font-weight: bolder;
  width: 15%;
}
.china>.lists_content>.nav>ul>li:first-child{
  width: 16%;
  padding-left: 10px;
}
</style>
