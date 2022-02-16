<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}">
		<!-- 使用view组件模拟input的输入框的样式 -->
		  <view class="my-search-box" :style="{'border-radius':radius+'px'}" @click="searchBoxHandler">
			  <!-- 下了一个插件 -->
		      <uni-icons type="search" size="17" class="my-search-box-icon"></uni-icons>
		      <text class="placeholder">搜索</text>
		    </view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props: {
		  // 背景颜色
		  bgcolor: {
		    type: String,
		    default: '#C00000'
		  },
		  // 圆角尺寸
		  radius: {
		    type: Number,
		    // 单位是 px
		    default: 18
		  }
		},
		data() {
			return {
				
			};
		},
		methods: {
		// 点击了模拟的 input 输入框
		searchBoxHandler() {
		// 触发外界通过 @click 绑定的 click 事件处理函数
		this.$emit('click')

  }
}
	}
</script>

<style lang="scss">
	.my-search-container{
		
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
		.my-search-box{
			height: 36px;
			width: 100%;
			background-color: #FFFFFF;
			
			line-height: 36px;
			text-align: center;
		}
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>
