<template>
  <div id="app">
    <div id="nav" :class="{fixed}">
      <router-link to="/">国内疫情</router-link> |
      <router-link to="/world">国际疫情</router-link>|
      <router-link to="/map">实时资讯</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  data(){
    return {
      fixed:false,
    }
  },
  mounted(){
    var offset=document.getElementById('nav').offsetTop;
    window.addEventListener('scroll',()=>{
      var scrollTop=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
      this.fixed=scrollTop>offset
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fff;
  width: 60vw;
  margin: 0 auto;
  margin-top: 150px;
  /* height: 100%; */
  border-radius: 10px;
  overflow: hidden;
}

#nav {
  width: 100%;height: 50px;
  /* padding: 10px; */
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

#nav.fixed{
  width: 60vw;
  position: fixed;
  top: 0;left: 50%;
  margin-left: -30vw;
  background: #fff;
  z-index: 999;
}

#nav a:hover{
  color: #10aeb5;
  border-bottom: 5px solid #10aeb5;
}

#nav a {
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
  padding: 10px;
  display: inline-block;
  transition: all .3s;

}

#nav a.router-link-exact-active {
  color: #10aeb5;
  border-bottom:5px solid #10aeb5;
}
#total{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

@media screen and (max-width: 991px){
  #app{
    width: 100%;
  }

  #nav.fixed{
  width: 100%;
  position: fixed;
  top: 0;left: 0;
  margin-left: 0;
  background: #fff;
  z-index: 999;
  }
}
</style>
