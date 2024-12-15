import {
	createRouter,
	createWebHashHistory,
} from 'vue-router';
import layOut from "../layout/index.vue";
import store from "../store/index.js";
import localStorageObject from "../store/localStorageObject.js";
import phoneCalendar from "../views/calendar/mobile/index.vue"
import pcCalendar from "../views/calendar/pc/index.vue"

const routes = [{
	path: '/',
	redirect: '/main',
	name: 'index',
	component: layOut,
	children: [
		{
			path: 'main',
			name: 'main',
			component: () => import( /* webpackChunkName: "quotation" */ "../views/main.vue"),
			meta: {
				title: '时空坐标 Shandobako'
			}
		},
		{
			path: 'register',
			name: 'register',
			component: () => import( /* webpackChunkName: "quotation" */ "../views/register.vue"),
			meta: {
				title: '时空坐标 Shandobako'
			}
		},
		{
			path: 'restpwd',
			name: 'restpwd',
			component: () => import( /* webpackChunkName: "quotation" */ "../views/restpwd.vue"),
			meta: {
				title: '重置密码'
			}
		},
		{
			path: 'restphone',
			name: 'restphone',
			component: () => import( /* webpackChunkName: "quotation" */ "../views/restphone.vue"),
			meta: {
				title: '重置手机号'
			}
		},
		{
			path: 'login',
			name: 'login',
			component: () => import( /* webpackChunkName: "quotation" */ "../views/login.vue"),
			meta: {
				title: '登录 Login'
			}
		},
		{
			path: 'main',
			name: 'main',
			component: () => import( /* webpackChunkName: "quotation" */ "../views/main.vue"),
			meta: {
				title: '主页 Shandobako '
			}
		},
		{
			path: '/origin',
			name: 'origin',
			component: () => import( /* webpackChunkName: "quotation" */ "../views/origin.vue"),
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					next()
				} else {
					store.state.token = ''; // 设置token为空字符串 （每次都加这个设置token为空字符串，为了让“退出”按钮切换为“登录”按钮）
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}

		},
		{
			path: '/dayun',
			name: 'dayun',
			component: () => import( /* webpackChunkName: "quotation" */ "../views/dayun.vue"),
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					next()
				} else {
					store.state.token = ''; // 设置token为空字符串
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}
		},
		{
			path: '/liunian',
			name: 'liunian',
			component: () => import( /* webpackChunkName: "quotation" */ "../views/liunian.vue"),
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					next()
				} else {
					store.state.token = ''; // 设置token为空字符串
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}
		},
		{
			path: '/result',
			name: 'result',
			component: () => import( /* webpackChunkName: "quotation" */ "../views/originResult.vue"),
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					window.scrollTo(0, 0);
					next()
				} else {
					store.state.token = ''; // 设置token为空字符串
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}
		},
		{
			path: '/dayunResult',
			name: 'dayunResult',
			component: () => import("../views/dayunResult.vue"),
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					window.scrollTo(0, 0);
					next();
				} else {
					store.state.token = ''; // 设置token为空字符串
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}
		},
		{
			path: '/liunianResult',
			name: 'liunianResult',
			component: () => import("../views/liunianResult.vue"),
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					window.scrollTo(0, 0);
					next();
				} else {
					store.state.token = ''; // 设置token为空字符串
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}
		},
		{
			path: '/juecheye',
			name: 'juecheye',
			component: () => import("../views/juecheye.vue"),
			// beforeEnter: (to, from, next) => {
			// 	window.scrollTo(0, 0);
			// 	next();
			// }
		},
		{
			path: '/connectus',
			name: 'connectus',
			component: () => import("../views/connectus.vue"),
			// beforeEnter: (to, from, next) => {
			// 	window.scrollTo(0, 0);
			// 	next();
			// }
		},
		// 个人页面
		{
			path: 'personalIndex',
			name: 'personalIndex',
			component: () => import("../views/personalPage/index.vue"),
			redirect: '/accountMessage',
			children: [
				{
					path: '/accountMessage',
					name: 'accountMessage',
					component: () => import("../views/personalPage/sonpage/accountMessage.vue"),
					redirect: '/index',
					children: [
						{
							path: '/repswd',
							name: 'repswd',
							component: () => import("../views/personalPage/sonpage/accountMessagePage/repswd.vue"),
							meta: {
								title: '重置密码'
							}
						},
						{
							path: '/updateAddress/:id/:exist',
							name: 'updateAddress',
							component: () => import("../views/personalPage/sonpage/accountMessagePage/updateAddress.vue"),
							meta: {
								title: '编辑地址信息'
							}
						},
						{
							path: '/rephone',
							name: 'rephone',
							component: () => import("../views/personalPage/sonpage/accountMessagePage/restphone.vue"),
							meta: {
								title: '重置手机号'
							}
						},
						{
							path: '/index',
							name: 'index',
							component: () => import("../views/personalPage/sonpage/accountMessagePage/index.vue"),
							meta: {
								title: '个人信息界面首页'
							},
							beforeEnter: (to, from, next) => {
								if (localStorageObject.getToken()) {
									next();
								} else {
									store.state.token = ''; // 设置token为空字符串
									alert("您还未登录，请先登录！")
									next("/login")
								}

							}
						},
					]
				},
				{
					path: '/account_logout/:id',
					name: 'account_logout',
					component: () => import("../views/personalPage/sonpage/accountMessagePage/logout.vue"),
				},
				{
					path: '/account_logout2',
					name: 'account_logout2',
					component: () => import("../views/personalPage/sonpage/accountMessagePage/logout2.vue"),
				},
				{
					path: '/bills',
					name: 'bills',
					component: () => import("../views/personalPage/sonpage/bills.vue"),
				},
				{
					path: '/help',
					name: 'help',
					component: () => import("../views/personalPage/sonpage/help.vue"),
				},
				{
					path: '/identify',
					name: 'identify',
					component: () => import("../views/personalPage/sonpage/identify.vue"),
				},
				{
					path: '/identifyQuery',
					name: 'identifyQuery',
					component: () => import("../views/personalPage/sonpage/identifyQuery.vue")
				},
				{
					path: '/myEmail',
					name: 'myEmail',
					component: () => import("../views/personalPage/sonpage/myEmail.vue"),
				},
				{
					path: '/VIP',
					name: 'VIP',
					component: () => import("../views/personalPage/sonpage/VIP.vue"),
				},
			]
		},
		
		// 数测人生
		{ 
			path: '/luckAnalysis', 
			component: () => import('@/views/luckAnalysis/luck-analysis-1.vue').then(module => {
				module.default.name = 'LuckAnalysis1';  // 确保异步加载的组件有正确的 name
				return module;
			  }),
			meta: { keepAlive: false },  // 指示该组件不应该被缓存
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					console.log('token: ',store.state.token)
					next();
				} else {
					console.log('token: ',store.state.token)
					store.state.token = ''; // 设置token为空字符串
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}
		},
		{ 
			path: '/luckAnalysis2',
			component: () => import('@/views/luckAnalysis/luck-analysis-2.vue').then(module => {
				module.default.name = 'LuckAnalysis2';  // 确保异步加载的组件有正确的 name
				return module;
			  }),
			meta: { keepAlive: false },  // 指示该组件不应该被缓存
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					next();
				} else {
					store.state.token = ''; // 设置token为空字符串
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}
		},
		{
			path: '/luckAnalysis3', 
			component: () => import('@/views/luckAnalysis/luck-analysis-3.vue').then(module => {
				module.default.name = 'LuckAnalysis3';  // 确保异步加载的组件有正确的 name
				return module;
			  }), 
			meta: { keepAlive: false },  // 指示该组件不应该被缓存
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					next();
				} else {
					store.state.token = ''; // 设置token为空字符串
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}
		},
		{ 
			path: '/luckAnalysis4', 
			component: () => import('@/views/luckAnalysis/luck-analysis-4.vue').then(module => {
				module.default.name = 'LuckAnalysis4';  // 确保异步加载的组件有正确的 name
				return module;
			  }), 
			meta: { keepAlive: false },  // 指示该组件不应该被缓存
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					next();
				} else {
					store.state.token = ''; // 设置token为空字符串
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}
		},
		{ 
			path: '/yearly-luck-5', 
			component: () => import('@/views/luckAnalysis/yearly-luck/luck-analysis-5.vue').then(module => {
				module.default.name = 'LuckAnalysisYearlyLuck5';  // 确保异步加载的组件有正确的 name
				return module;
			  }),
			meta: { keepAlive: false },  // 指示该组件不应该被缓存
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					next();
				} else {
					store.state.token = ''; // 设置token为空字符串
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}
		},
		{ 
			path: '/yearly-luck-6', 
			component: () => import('@/views/luckAnalysis/yearly-luck/luck-analysis-6.vue').then(module => {
				module.default.name = 'LuckAnalysisYearlyLuck6';  // 确保异步加载的组件有正确的 name
				return module;
			  }), 
			meta: { keepAlive: false },  // 指示该组件不应该被缓存
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					next();
				} else {
					store.state.token = ''; // 设置token为空字符串
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}
		},
	  
		{ 
			path: '/recent-luck-5', 
			component: () => import('@/views/luckAnalysis/recent-luck/luck-analysis-5.vue').then(module => {
				module.default.name = 'LuckAnalysisRecentLuck5';  // 确保异步加载的组件有正确的 name
				return module;
			  }), 
			meta: { keepAlive: false },  // 指示该组件不应该被缓存
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					next();
				} else {
					store.state.token = ''; // 设置token为空字符串
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}
		},
		{ 
			path: '/recent-luck-6', 
			component: () => import('@/views/luckAnalysis/recent-luck/luck-analysis-6.vue').then(module => {
				module.default.name = 'LuckAnalysisRecentLuck6';  // 确保异步加载的组件有正确的 name
				return module;
			  }), 
			meta: { keepAlive: false },  // 指示该组件不应该被缓存
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					next();
				} else {
					store.state.token = ''; // 设置token为空字符串
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}
		},
	  
		{ 
			path: '/luckAnalysis7', 
			component: () => import('@/views/luckAnalysis/luck-analysis-7.vue').then(module => {
				module.default.name = 'LuckAnalysis7';  // 确保异步加载的组件有正确的 name
				return module;
			  }), 
			meta: { keepAlive: false },  // 指示该组件不应该被缓存
			beforeEnter: (to, from, next) => {
				if (localStorageObject.getToken()) {
					next();
				} else {
					store.state.token = ''; // 设置token为空字符串
					alert("您还未登录，请先登录！")
					next("/login")
				}
			}
		},

	]
},
// {
//     path: '/calendar',
//     name: 'calendar',
//     component: () => import( /* webpackChunkName: "quotation" */ "../views/calendar.vue"),
//     meta: {
//         title: 'calendar'
//     }
// },
{
	path: '/calendar',
	name: 'calendar',
	component: pcCalendar,
	meta: {
		title: 'calendar'
	},
	beforeEnter: (to, from, next) => {
		if (localStorageObject.getToken()) {
			window.scrollTo(0, 0);
			if (window.innerWidth < 1024) {
				next('/mcalendar')
			} else {
				next();
			}
		} else {
			store.state.token = ''; // 设置token为空字符串
			alert("您还未登录，请先登录！")
			next("/login")
		}

	}
},
{
	path: '/mcalendar',
	name: 'mcalendar',
	component: phoneCalendar,
	meta: {
		title: 'mcalendar'
	},
	beforeEnter: (to, from, next) => {
		if (localStorageObject.getToken()) {
			if (window.innerWidth > 1024) {
				next('/calendar')
			}
			next();
		} else {
			store.state.token = ''; // 设置token为空字符串
			alert("您还未登录，请先登录！")
			next("/login")
		}

	}
},
]


let router = createRouter({
	history: createWebHashHistory(), //process.env.BASE_URL
	routes
})


export default router