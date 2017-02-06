'use strict';

module.exports = {

	webpack: {

		filepathToName: function(filepath) {
			var basename = filepath.match(/[a-z0-9\-\_]+\.[a-z0-9]{2,}$/gmi)[0];
			var noextname = basename.replace(/\.[a-z0-9]{2,}$/gmi, '');
			var words = noextname.split('-').map(function(word) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			});
			return words.join('');
		},

		loadall: function(r) {
			var that = this;
			var all = {};
			r.keys().forEach(function(key) {
				all[ that.filepathToName(key)] = r(key);
			});
			return all;
		}
	
	}

};
