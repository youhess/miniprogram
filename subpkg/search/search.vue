<template>
	<view class="search-box" >
		<!-- 使用uni-ui提供的搜索组件 -->
	<uni-search-bar @input="input" :radius="100" cancelButton="none" focus=true  ></uni-search-bar>
		<!-- 建议搜索列表 -->
	
		<view class="sugg-list" v-if="searchResults.length !== 0 ">
			<view class="sugg-item" v-for="(item,i) in searchResults" :key = "i" @click="gotoDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
		  <!-- 标题区域 -->
		  <view class="history-title">
		    <text>搜索历史</text>
		    <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
		  </view>
		  <!-- 列表区域 -->
		  <view class="history-list">
		    <uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
		  </view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器id
				timer:null,
				// 搜索关键词
				keyword:'',
				 // 搜索结果列表
				    searchResults: [],
					// 搜索关键词的历史记录
					    historyList: []
				
			};
		},
		methods:{
			input(e){
				// value是undifine
				// console.log(e.valueOf())
				clearTimeout(this.timer)
				// 重新启动一个延时器
				this.timer = setTimeout(()=>{
					this.keyword = e.valueOf()
					 this.getSearchList()
				},500)
			},
			async getSearchList(){
				if(this.keyword === ''){
					this.searchResults = []
					return
				}
				const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.keyword})
				if(res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				this.saveSearchHistory()
				
			},
			gotoDetail(goods_id){
				uni.navigateTo({
					url:"/subpkg/goods_list/goods_list?goods_id=" + goods_id
				})
			},
			  saveSearchHistory() {
			    // 2.1 直接把搜索关键词 push 到 historyList 数组中
			    // 1. 将 Array 数组转化为 Set 对象
			     const set = new Set(this.historyList)
			     // 2. 调用 Set 对象的 delete 方法，移除对应的元素
			     set.delete(this.keyword)
			     // 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
			     set.add(this.keyword)
			     // 4. 将 Set 对象转化为 Array 数组
			     this.historyList = Array.from(set)
				 uni.setStorageSync('keyword',JSON.stringify(this.historyList));
			  },
			  onload(){
				  this.historyList = JSON.parse(uni.getStorageSync('keyword')||'[]')
			  },
			  cleanHistory(){
				  this.historyList = [];
				  uni.setStorageSync('keyword','[]')
			  },
			  gotoGoodsList(keyword){
				  uni.navigateTo({
				      url: '/subpkg/goods_list/goods_list?query=' + keyword
				    })
			  }
		
		},
		computed:{
			historys(){
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.sugg-list {
	  padding: 0 5px;
	
	  .sugg-item {
	    font-size: 12px;
	    padding: 13px 0;
	    border-bottom: 1px solid #efefef;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	
	    .goods-name {
	      // 文字不允许换行（单行文本）
	      white-space: nowrap;
	      // 溢出部分隐藏
	      overflow: hidden;
	      // 文本溢出后，使用 ... 代替
	      text-overflow: ellipsis;
	      margin-right: 3px;
	    }
	  }
	}
	.history-box {
	  padding: 0 5px;
	
	  .history-title {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    height: 40px;
	    font-size: 13px;
	    border-bottom: 1px solid #efefef;
	  }
	
	  .history-list {
	    display: flex;
	    flex-wrap: wrap;
	
	    .uni-tag {
	      margin-top: 5px;
	      margin-right: 5px;
	    }
	  }
	}
</style>
