import Vue from 'vue'
import Vuex from 'vuex'
import jsonp from 'jsonp'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data:{}
  },
  mutations: {
    setData(state,data){
      state.data=data
      // console.log(state,data)
    }
  },
  actions: {
    getData(context){
      jsonp('http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',(err,res)=>{
        context.commit('setData',res.data)
        // console.log('我是vuex的数据',res)
      })
    }
  },
  modules: {
  }
})
