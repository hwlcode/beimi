<template>
    <div id="app">
        <!-- <header-component></header-component> -->
        <router-view></router-view>
        <!-- <footer-component></footer-component> -->
		<!-- <user-login :show="showLogin" :type="type"></user-login> -->
    </div>
</template>
<script>
// import headerComponent from 'components/header'
// import footerComponent from 'components/footer'
import './assets/js/mount_method.js';
// import userLogin from './pages/user';
import { mapState } from 'vuex'
export default {
	name: 'app',
	components: {
        // headerComponent,
        // footerComponent
        // userLogin
    },
	watch:{
		$route( newVal,oldVal ){
			// this.setXAUTH();

			//数据统计
			// TDAPP.onEvent(newVal.path);
		},
		loginNum(val){
			// if(val > 0){
			// 	this.showLogin = new Date().getTime()
			// }
		}
	},
	created(){
// 		this.$http.post(`${baseUrl}/user/about`).then(({
// 			data: {
// 				data,
// 				code,
// 				msg
// 			}
// 		}) => {
// 			if(code == 1) {
// 				// console.info(data,32122121)
// 				document.title = data.about.title
// 				this.$store.state.logoUrl = data.about.custom_logo
// 			};
// 		}, response => {
//
// 		})
	},
	mounted(){
		// this.setXAUTH();
	},
	data (){
		return {
			showLogin: false,
			type : 'login'
		}
	},
	computed: {
		...mapState(['loginNum'])
	},
	methods:{
		//本地存储一下请求头的信息
// 		setXAUTH(){
// 			let { $method,$route } = this;
// 			let { tools } = $method;
//
// 			let urlParams = $route.query;
// 			for( let key in urlParams ){
// 				if( key.indexOf('X-AUTH') > -1 ){
// 					tools.localItem(key,urlParams[key]);
// 				};
// 			};
// 		}
	}
}
</script>
<style lang="less">
    #app{
        height: 100%;
    }
    .dialog-user{
        .weui-dialog{
            width:90% !important;
        }
    }

    .menu-night{
        .s-line{
            li{
                border-left-color: #4E4E52 !important;
            }
	    }
	    .range-bar{
            background: #4E4E52 !important;
	    }
	    .weui-switch:checked:after{
            background-color: #4E4E52;
	    }
    }

    .swiperPagination{
        span{
            width:10px;
            height:10px;
            background: #fff;
            opacity: .5;
            border:1px solid rgba(0,0,0,.2);
        }
        span.swiper-pagination-bullet-active{
            background: #000;
            border-color:rgba(255,255,255,.5);
            opacity: .5;
        }
    }
</style>
