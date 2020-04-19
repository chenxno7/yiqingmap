<template>
    <div class="list">
        <ul>
          <li>地区</li>
          <li>新增</li>
          <li>现有</li>
          <li>累计</li>
          <li>治愈</li>
          <li>死亡</li>
        </ul>
        <div v-for="(list,idx) of data_lists" :key="idx" @click="showCity(idx)">
            <ul>
                <li>{{list.name}}</li>
                <li>{{list.conadd}}</li>
                <li>{{list.econNum}}</li>
                <li>{{list.value}}</li>
                <li>{{list.cureNum}}</li>
                <li>{{list.deathNum}}</li>
            </ul>
            <div class="city" :class="{active:list.show}">
                <div v-for="(city,idx) of list.city" :key="idx">
                    <ul>
                        <li>{{city.name}}</li>
                        <li>{{city.conadd}}</li>
                        <li>{{city.econNum}}</li>
                        <li>{{city.conNum}}</li>
                        <li>{{city.cureNum}}</li>
                        <li>{{city.deathNum}}</li>
                    </ul>
                    <div></div>
                </div>
                
            </div>
        </div>
        
    </div>
</template>

<script>
import jsonp from 'jsonp'
export default {
    data(){
        return {
        }
    },
    props:["data_lists"],
    methods:{
        showCity(index){
            this.data_lists.forEach((item,idx)=>{
                var arr=item;
                if(item.show){
                    arr.show=false
                }else{
                    arr.show=index==idx
                }
                this.$set(this.data_lists,idx,arr);
                this.data_lists.splice(idx,1,arr);
            });
            // console.log(this.data_lists[index].show)
        }
    }
}
</script>

<style scoped>
.list{
    width: 100%;
}
.list ul{
    list-style: none;
    display: flex;
    padding: 0 25px;
    width: 100%;
}
.list ul>li{
    height: 30px;
    line-height: 30px;
    color: #fff;
}
.list ul>li:first-child{
    width: 16%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background-color: #10aeb5;
    font-weight: bolder;
    text-align: left;
    padding-left: 10px;
    cursor: pointer;
}
.list ul>li:last-child{
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}
.list ul>li:not(:first-child){
    width: 15%;
    background-color: #f5f6f7;
    border-left: 2px solid #fff;
    color: #000;
}
.list>ul>li{
background-color: #fff !important;
color: #000;
font-size: 14px;
font-weight: bolder;
}
.list>ul{
    margin-bottom: 0;
}
.list>div>ul:first-child{
    margin-top: 0;
}
.list .city{
    overflow: hidden;
    height: 0;
}
.list .city.active{
    height: 100%;
    margin-bottom: 20px;
}
.list .city>div>ul>li:first-child{
    color: #10aeb5;
}
.list .city>div>ul>li{
    background-color: #fff;
}
.list .city>div>div{
    width: 92%;
    margin: -10px auto;
    box-sizing: border-box;
    border-bottom: 1px solid #f5f6f7;
}
@media screen and (max-width: 992px) {
.list{
    font-size: 14px;
}
.list ul{
        padding-left: 2px;
    }
}
</style>