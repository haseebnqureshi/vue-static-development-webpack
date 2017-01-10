module.exports = {
	name: 'user',
	template: `
		<div>
			<p>user {{ $route.params.id }}</p>
			<router-view></router-view>
		</div>
	`,
	watch: {
		'$route': function(to, from) {
			console.log('changing routes');
		}
	}
}