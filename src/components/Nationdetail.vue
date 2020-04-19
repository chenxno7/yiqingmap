<template>
    <div class="detail">

    </div>
</template>

<script>
import jsonp from 'jsonp'
export default {
    data(){
        return {
            dataAll:{}
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            jsonp('http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',(err,res)=>{
                console.log(res)
            })
        }
    }
}
</script>

<style scoped>

</style>