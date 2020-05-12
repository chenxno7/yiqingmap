<template>
    <div class="polyline">
        <div id="line"></div>
        <div class="nav">
            <ul>
                <li :class="{active:line1}" @click="changeData('line1')">全国累计<br>确诊治愈</li>
                <li :class="{active:line2}" @click="changeData('line2')">全国单日<br>确诊变化</li>
                <li :class="{active:line3}" @click="changeData('line3')">全国累计<br>治愈死亡</li>
                <li :class="{active:line4}" @click="changeData('line4')">治愈率<br>死亡率</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.polyline{
    margin-top: 20px;
    margin-bottom: 50px;
}
#line{
    width: 100%;
    height: 500px;
}
.polyline>.nav{
    width: 80%;
    height: 50px;
    margin: 0 auto;
    padding: 5px 10px;
}
.polyline>.nav>ul{
    display: flex;
    justify-content: space-around;
    list-style: none;
    padding: 0;
    margin: 0;
}
.polyline>.nav>ul>li{
    text-align: center;
    padding: 4px 0;
    font-size: 15px;
    margin: 0;
    width: 22%;
    height: 50px;
    line-height: 25px;
    background-color: #f5f6f7;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    transition: all .3s;
}
.polyline>.nav>ul>li.active{
    background-color: #10aeb5;
    color: #fff;
}
.polyline>.nav>ul>li:hover{
    background-color: #10aeb5;
    color: #fff;
}
@media screen and (max-width: 992px) {
    .polyline>#line{
        height: 30vh;
    }
}
</style>

<script>
import echarts from 'echarts'
import jsonp from 'jsonp'
export default {
    data(){
        return {
            dataAll:{},
            historylist:[],
            line1:true,
            line2:false,
            line3:false,
            line4:false,
            repaint:true
        }
    },
    mounted(){
        this.getData();
        window.addEventListener('resize',()=>{
            this.init();
            // console.log('giao')
        })
    },
    watch:{
        repaint(){
            this.init()
        }
    },
    methods:{
        init(){
            var lineChart=echarts.init(document.getElementById('line'));
            var data_history=this.historylist;
            // 定义一个data数组用于存储各个系列的内容
            var data={};
            // 横坐标日期
            var dates=[];
            // 累计确诊
            var data_conNums=[];
            // 累计治愈
            var data_cureNums=[];
            // 累计死亡
            var data_deathNum=[];
            // 每日增加
            var data_conadd=[];
            // 单日增加境外输入
            var data_addjwsrNum=[];
            // 治愈率与死亡率
            var data_deathRate=[];
            var data_cureRate=[];
            for(let i=data_history.length-1;i>=0;i--){
                dates.push(data_history[i].date);
                data_conNums.push(data_history[i].cn_conNum);
                data_cureNums.push(data_history[i].cn_cureNum);
                data_conadd.push(data_history[i].cn_conadd);
                data_deathRate.push(data_history[i].cn_deathRate);
                data_cureRate.push(data_history[i].cn_cureRate);
                data_addjwsrNum.push(data_history[i].cn_addjwsrNum);
                data_deathNum.push(data_history[i].cn_deathNum);
            }
            // console.log(data_history)
            // 根据this.showLine的不同选择展示什么数据
            if(this.line1){
                data.dataShow1=data_conNums;
                data.dataShow2=data_cureNums;
                data.name1='累计确诊';
                data.name2='累计治愈';
            }else if(this.line2){
                data.dataShow1=data_conadd;
                data.dataShow2=data_addjwsrNum;
            }else if(this.line3){
                data.dataShow1=data_cureNums;
                data.dataShow2=data_deathNum;
            }else if(this.line4){
                data.dataShow1=data_cureRate;
                data.dataShow2=data_deathRate;
            }
            var option={
                title:{text:'全国 总新增确诊/新增境外输入确诊 趋势',fontSize:14,left:10},
                legend:{right:25,top:20,icon:'circle'},
                xAxis:{type:'category',data:dates,axisTick:{show:false},axisLine:{show:false}},
                yAxis:{type:'value',axisTick:{show:false},axisLabel:{inside:true},axisLine:{show:false}},
                series:[
                    {type:'line',data:data.dataShow1,smooth:true,name:data.name1},
                    {type:'line',data:data.dataShow2,smooth:true,name:data.name2},
                ]
            };
            lineChart.setOption(option)
        },
        getData(){
            jsonp("http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427",(error,res)=>{
                this.dataAll=res.data;
                this.historylist=res.data.historylist;
                this.init();
            })
        },
        changeData(line){
            this.repaint=!this.repaint
            if(line=='line1'){
                this.line1=true;
                this.line2=this.line3=this.line4=false;
                // this.showLine='line1';
            }else if(line=='line2'){
                this.line2=true;
                this.line1=this.line3=this.line4=false;
                // this.showLine='line2';
            }else if(line=='line3'){
                this.line3=true;
                this.line2=this.line1=this.line4=false;
                // this.showLine='line3';
            }else if(line=='line4'){
                this.line4=true;
                this.line2=this.line3=this.line1=false;
                // this.showLine='line4';
            }
        }
    }
}
</script>