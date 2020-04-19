<template>
    <div class="total" :style="{color:total.color}">
        <h4>{{total.title}}</h4>
        <p>{{total.num}}</p>
        <p class="small">较昨日{{total.add}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:["total"]
}
</script>
<style scoped>
.total{
    width:20vw;
    margin-bottom: 20px;
}
@media screen and (max-width: 992px){
.total{
    width: 30vw;
}
}
.small{
    font-size: 12px;
}
</style>