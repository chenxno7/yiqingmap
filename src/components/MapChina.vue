<template>
    <div class="map">
        <div id="main" style="width:100%;height:100%;"></div>
    </div>
</template>
<style scoped>
.map{
    width: 50vw;
    height: 50vh;
    margin: 0 auto;
}
a{
    text-decoration: none;
    color: #000;
}
@media screen and (max-width: 991px){
    .map{
        width:100%;
    }
}
</style>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china'
import jsonp from 'jsonp'
import {mapState} from 'vuex'

export default {
    data(){
        return {
            dataAll:{},
            dataTotal:[],
            dataNow:[]
        }
    },
    props:["showNow"],
    mounted(){
        this.getData();
        console.log('拿到了vuex的数据哈哈',this.data)
    },
    watch:{
        showNow(){
            this.init();
        },
        data(){
            console.log(this.data)
        }
    },
    computed:{
        ...mapState(['data'])
    },
    methods:{
        init(){
            var myChart=echarts.init(document.getElementById('main'));
            var data;
            var title='';
            this.showNow?data=this.dataNow:data=this.dataTotal;
            this.showNow?title='现存确诊':title='累计确诊';
            data.push({
                name:'南海诸岛',value:0
            })
            // console.log(dataTotal)
            var option={
                title:{},
                tooltip:{
                    trigger:"item",
                    enterable:true,
                    triggerOn:'click',
                    formatter:`地区：{b}<br>${title}：{c}`
                },
                series:[
                    {
                        type:'map',
                        name:'地图',
                        map:'china',
                        data:data,
                        zoom:1.1,
                        label:{
                            show:true,
                            color:'#000'
                        }
                    }
                ],
                visualMap:[{
                    type:'piecewise',
                    pieces:[
                        {min:10000},
                        {min:1000,max:9999},
                        {min:100,max:999},
                        {min:10,max:99},
                        {min:1,max:9},
                        {value:0}
                    ],
                    inRange:{
                        color:['#fff','#ffc','#f90','#f60','#c00','#600'],
                        symbolSize:[60,200]
                    },
                    itemWidth:10,
                    itemHeight:8,
                    itemGap:6
                }]
            }
            myChart.setOption(option)
        },
        getData(){
            jsonp('http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',(err,res)=>{
                this.dataAll=res.data;
                this.dataTotal=this.dataAll.list.map(item=>{
                    return {name:item.name,value:item.value}
                });
                this.dataNow=this.dataAll.list.map(item=>{
                    return {name:item.name,value:item.econNum}
                })
                // console.log(this.dataAll)
                this.init();
            })
        }
    }
}
</script>