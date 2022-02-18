// 导入vue和Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 2将Vuex安装为Vue的插件
import moduleCart from './cart.js'
import moduleUser from './user.js'

Vue.use(Vuex)

// 创建Store的实例对象

const store = new Vuex.Store({
	// todo 挂载store模块
	modules:{
		m_cart:moduleCart,
		   // 挂载用户的 vuex 模块，访问路径为 m_user
		    m_user: moduleUser
	}
})

export default store