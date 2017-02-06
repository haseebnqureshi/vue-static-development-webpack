'use strict';


/*===================
Loading Deps			
====================*/

var Helpers = require('./vendors/hq.helpers.js');

var Components = Helpers.webpack.loadall( 
	require.context('./components', false, /\.js$/)
);

var Vendors = Helpers.webpack.loadall(
	require.context(`./vendors/${process.env.NODE_ENV}`, false, /\.js$/)
);


/*===================
Configuring Vue			
====================*/

Vendors.Vue.use( Vendors.VueRouter);
Vendors.Vue.use( Vendors.VueResource);


/*===================
Configuring Routes			
====================*/

const router = new Vendors.VueRouter({
	routes: [
		{ path: '/foo', name: 'foo', component: Components.Foo },
		{ path: '/bar', name: 'bar', component: Components.Bar },
		{ path: '/login', name: 'login', component: Components.Login },
		{ path: '/user/:id', name: 'user', component: Components.User,
			children: [
				{
					path: 'profile',
					component: Components.UserProfile
				},
				{
					path: 'account',
					component: Components.UserAccount,
					name: 'userAccount',
					meta: { requiresAuth: true }
				},
				{
					path: 'posts',
					component: Components.UserPosts
				}
			] 
		}
	],
	// mode: 'history',
	scrollBehavior: function(to, from, savedPosition) {
		return savedPosition ? savedPosition : { x:0, y:0 }
	}
});


/*===================
Configuring Middleware			
====================*/

router.beforeEach(function(to, from, next) {
	console.log({ to, from, next });
	if (to.meta.requiresAuth === true) {
		next({
			name: 'login'
		})
	}
	next()
});


/*===================
Instantiating Application			
====================*/

const app = new Vendors.Vue({ router }).$mount('#app');



