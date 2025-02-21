$(function(){
	var alertContainer = $("#transaction-alert");
	var alertWidth = alertContainer.width;
	const app = "tranc.php";

	function alert(){
		return setTimeout(() => {
			alertContainer.css('display', "flex");
			$.post(app, {req:"tranc"}, function(data) {
				var res = JSON.parse(data);
				var flag = res.flag;
				var bank = res.bank;
				var name = res.name;
				var amount = res.amount;
				var time = res.time;
				var type = res.type;

				alertContainer.html('<div><b>@'+name+'</b><p>We just paid $'+amount+' to their '+bank+' <br> '+time+' <i class="fa fa-check-circle text-white float-right mt-1"></p></div>');
				alertContainer.animate({left: '20px'}, "slow");
			})
			setTimeout(() => {
				alertContainer.animate({left: "-280px"}, "slow");
			}, 5000);
		}, 100)
	}
	
	setInterval(() => {
		alert();
	}, 15000)

})