jQuery(function($) {

	var FormHelpers = {
		ajax: function($form, overrides, success) {
			var that = this;
			var $submit = $form.find('input[type="submit"]');
			var options = {
				url: $form.attr('action'),
				type: $form.attr('method'),
				data: that.getData($form),
				dataType: 'json',
				beforeSend: function(jqXhr) {
					that.disableSubmit($submit);
				},
				success: function(data, status, jqXhr) {
					console.log(data);
					that.enableSubmit($submit);
					if (success) { 
						success(data, status, jqXhr);
					}
				},	
				error: function(jqXhr) {
					console.error(jqXhr);
					that.enableSubmit($submit);
				}
			};
			$.ajax(_.extend(options, overrides));
		},
		disableSubmit: function($submit) {
			$submit.data('value', $submit.val());
			$submit.attr('disabled', 'disabled');
			$submit.val('Sending...');
		},
		enableSubmit: function($submit) {
			$submit.removeAttr('disabled');
			$submit.val($submit.data('value'));
		},
		ensure: function($form) {
			if (!$form.attr('action')) { throw 'Error: Please make sure your form has an action...'; }
			if (!$form.attr('method')) { throw 'Error: Please make sure your form has method specified...'; }
			if ($form.find('input[type="submit"]').length === 0) { throw 'Error: Please make sure your form has an input[type="submit"] button...'; }
		},
		getData: function($form) {
			var serializeArray = $form.serializeArray();
			var data = {};
			_.each(serializeArray, function(item) {
				data[item.name] = item.value;
			});
			return data;
		}
	};

	//generic ajax form handler
	$('form').each(function() {
		var $form = $(this);
		FormHelpers.ensure($form);

		$form.on('submit', function(event) {
			event.preventDefault();
			FormHelpers.ajax($form, null, function() {

				//keeping things very simple by doing hard page refreshes
				// window.location.reload(true);
			});
		});

	});

});