'use strict';

var jQuery = require('./vendors/jquery.min.js');
var _ = require('./vendors/underscore.min.js');
var Vue = require('./vendors/vue.min.js');
var VueRouter = require('./vendors/vue-router.min.js');
var VueResource = require('./vendors/vue-resource.min.js');

Vue.use(VueRouter);
Vue.use(VueResource);

require('./css/app.css');

const Foo = require('./components/foo.js');
const Bar = require('./components/bar.js');
const Login = require('./components/login.js');
const User = require('./components/user.js');
const UserAccount = require('./components/user-account.js');
const UserPosts = require('./components/user-posts.js');
const UserProfile = require('./components/user-profile.js');

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
