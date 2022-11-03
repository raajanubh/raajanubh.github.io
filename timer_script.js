function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}
$(document).ready(function(){
	$("#ps").addClass("hide_btn");
	$("#stp").addClass("hide_btn");
	function display (iter_sec,iter_min,iter_hr,dis_type){
		pre_s = ""; pre_m = ""; pre_h = "";
		if (iter_sec < 10){ pre_s = "0";}
		if (iter_min < 10){ pre_m = "0";}
		if (iter_hr < 10){ pre_h = "0";}
		$("#sec").val(pre_s + iter_sec);
		$("#min").val(pre_m + iter_min);
		$("#hr").val(pre_h + iter_hr);
		$("#min").prop('disabled',dis_type);
		$("#sec").prop('disabled',dis_type);
		$("#hr").prop('disabled',dis_type);
	}
	var iter_sec = 0;
	var iter_min = 0;
	var iter_hr = 0;
	display (iter_sec,iter_min,iter_hr,false);
	$("#strt").click(async function(){
		var flag = 0;
		var second = $("#sec").val();
		var minute = $("#min").val();
		var hour = $("#hr").val();
		if (iter_sec == 0 && iter_min == 0 && iter_hr == 0) {
			iter_min = +minute; iter_sec = +second; iter_hr = +hour;
		}
		while (iter_min > 0 || iter_sec > 0 || iter_hr > 0){
			$("#strt").addClass("hide_btn");
			$("#ps").removeClass("hide_btn");
			$("#stp").removeClass("hide_btn");
			if (iter_sec > 0){
				for(let i=iter_sec-1;i>=0;i--){
					iter_sec = i;
					display (iter_sec,iter_min,iter_hr,true);
					await sleep(1000);
					$("#ps").click(function(){
						flag = 1;
						$("#strt").removeClass("hide_btn");
						$("#ps").addClass("hide_btn");
					});
					$("#stp").click(function(){
						flag = 1;
						iter_min = 0; iter_sec = 0; iter_hr = 0;
						display (iter_sec,iter_min,iter_hr,false);
						$("#strt").removeClass("hide_btn");
						$("#ps").addClass("hide_btn");
						$("#stp").addClass("hide_btn");
					});
					if (flag == 1){break;}
				}
				if (flag == 1){break;}
			}
			else if (iter_min > 0){
				iter_min = iter_min - 1; iter_sec = 60;
			}
			else if (iter_hr > 0){
				iter_hr = iter_hr - 1; iter_min = 59; iter_sec = 60;
			}
		}
		if (flag == 0){
			display (iter_sec,iter_min,iter_hr,false);
			$("#strt").removeClass("hide_btn");
			$("#ps").addClass("hide_btn");
			$("#stp").addClass("hide_btn");
		}
	});
});