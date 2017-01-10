'use strict';

var jQuery = require('./vendors/jquery.js');
var _ = require('./vendors/underscore.js');
var Vue = require('./vendors/vue.js');
var VueRouter = require('./vendors/vue-router.js');
var VueResource = require('./vendors/vue-resource.js');

Vue.use(VueRouter);
Vue.use(VueResource);

const Foo = require('./components/Foo.js');
const Bar = require('./components/Bar.js');
const Login = require('./components/Login.js');
const User = require('./components/User.js');
const UserAccount = require('./components/UserAccount.js');
const UserPosts = require('./components/UserPosts.js');
const UserProfile = require('./components/UserProfile.js');

const routes = [
	{ path: '/foo', name: 'foo', component: Foo },
	{ path: '/bar', name: 'bar', component: Bar },
	{ path: '/login', name: 'login', component: Login },
	{ path: '/user/:id', name: 'user', component: User,
		children: [
			{
				path: 'profile',
				component: UserProfile
			},
			{
				path: 'account',
				component: UserAccount,
				name: 'userAccount',
				meta: { requiresAuth: true }
			},
			{
				path: 'posts',
				component: UserPosts
			}
		] 
	}
]

const router = new VueRouter({
	// mode: 'history',
	routes,
	scrollBehavior: function(to, from, savedPosition) {
		return savedPosition ? savedPosition : { x:0, y:0 }
	}
})

router.beforeEach(function(to, from, next) {
	console.log({ to, from, next });
	if (to.meta.requiresAuth === true) {
		next({
			name: 'login'
		})
	}
	next()
});

const app = new Vue({
	router
}).$mount('#app');
