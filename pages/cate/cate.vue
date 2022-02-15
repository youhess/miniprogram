<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style = "{height:wh +'px'}" >
				<block v-for="(item , index) in  cateList" :key="index">
					<view :class="[index === active ? 'active':'']" class="left-scroll-view-item" @click="activeChanged(index)">{{item.cat_name}}</view>
				</block>
			
			</scroll-view>	
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y="true" :style = "{height:wh +'px'}" :scroll-top="scrollTop"  >
				  <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
				    <view class="cate-lv2-title">
						    <view class="cate-lv3-list">
						      <!-- 三级分类 Item 项 -->
						      <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
						        <!-- 图片 -->
						        <image :src="item3.cat_icon"></image>
						        <!-- 文本 -->
						        <text>{{item3.cat_name}}</text>
						      </view>
						    </view>
					</view>
				  </view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 动态绑定窗口可用高度
				wh:0,
				// 分类数据列表
				cateList:[],
				// 渲染二级分类列表
				cateLevel2: [],
				// 当前选中的索引项，默认让第一项被选中
				active:0,
				// 滚动条距离顶部的距离
				scrollTop: 0
			}
		},
		methods: {
			async getCateList(){
				// 发起请求
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				 // 判断是否获取失败
				 if (res.meta.status !== 200) return uni.$showMsg()
				 console.log(res)
				 // 转存数据
				 this.cateList = res.message
				 this.cateLevel2 = res.message[this.active].children
			},
			activeChanged(index){
				// 选中后的index传到data 就可以实现数据监听啦
				this.active = index
				// 为二级分类赋值
				this.cateLevel2 = this.cateList[index].children
				
				 // 让 scrollTop 的值在 0 与 1 之间切换 前后数值一致不会改变
				  this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			gotoGoodsList(item3){
				uni.navigateTo({
					url:'../../subpkg/goods_list/goods_list?cid='+item3.cat_id
				})
			}
			
		},
		onLoad(){
			// 获取当前系统的信息
			const sysInfo = uni.getSystemInfoSync()
			// 为wh窗口高度动态复制
			// screenHeight是手机屏幕的高度（状态栏+导航栏+webview+tabBar），windowHeight是可使用窗口高度webview（不包含状态栏、导航栏和tabBar）的高度；本质是上移
			this.wh = sysInfo.windowHeight
			
			this.getCateList()
			
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
	  display: flex;
	
	  .left-scroll-view {
	    width: 120px;
	
	    .left-scroll-view-item {
	      line-height: 60px;
	      background-color: #f7f7f7;
	      text-align: center;
	      font-size: 12px;
	
	      // 激活项的样式
	      &.active {
	        background-color: #ffffff;
	        position: relative;
	
	        // 渲染激活项左侧的红色指示边线
	        &::before {
	          content: ' ';
	          display: block;
	          width: 3px;
	          height: 30px;
	          background-color: #c00000;
	          position: absolute;
	          left: 0;
	          top: 50%;
	          transform: translateY(-50%);
	        }
	      }
	    }
	  }
	}
	.cate-lv2-title {
	  font-size: 12px;
	  font-weight: bold;
	  text-align: center;
	  padding: 15px 0;
	}
	.cate-lv3-list {
	  display: flex;
	  flex-wrap: wrap;
	
	  .cate-lv3-item {
	    width: 33.33%;
	    margin-bottom: 10px;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	
	    image {
	      width: 60px;
	      height: 60px;
	    }
	
	    text {
	      font-size: 12px;
	    }
	  }
	}
</style>
