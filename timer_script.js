function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}
function exclude_keys(){
	dash = (event.keyCode!=190);
	point = (event.keyCode!=189);
	deci = (event.keyCode!=110);
	sub = (event.keyCode!=109);
	add = (event.keyCode!=107);
	return (dash&&point&&deci&&sub&&add);
}
$('.popover-dismiss').popover({
  trigger: 'manual'
});
$(document).ready(function(){
	function range_check(){
		var sec = $("#sec").val();
		var min = $("#min").val();
		var hr = $("#hr").val();
		if (sec<60){$('#sec').css('background','AliceBlue');$('#sec').popover('hide');}
		else{$('#sec').css('background','orange');$('#sec').popover('show');}
		
		if (min<60){$('#min').css('background','AliceBlue');$('#min').popover('hide');}
		else{$('#min').css('background','orange');$('#min').popover('show');}
		
		if (hr<24){$('#hr').css('background','AliceBlue');$('#hr').popover('hide');}
		else{$('#hr').css('background','orange');$('#hr').popover('show');}
	}
	$('input').change(function(){range_check();});
	$('input').keyup(function(){range_check();});
	function validity_check(sec,min,hr){
		if (sec>59||min>59||hr>23){
			return false;
		}
		else{
			return true;
		}
	}
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
		$('input').css('background','AliceBlue');
		$('#hr').popover('hide');
		$('#min').popover('hide');
		$('#sec').popover('hide');
	}
	$("#ps").addClass("hide_btn");
	$("#stp").addClass("hide_btn");
	var iter_sec = 0;
	var iter_min = 0;
	var iter_hr = 0;
	display (iter_sec,iter_min,iter_hr,false);
	$("#strt").click(async function(){
		var flag = 0;
		var second = $("#sec").val();
		var minute = $("#min").val();
		var hour = $("#hr").val();
		var is_valid = validity_check(second,minute,hour);
		if (iter_sec == 0 && iter_min == 0 && iter_hr == 0 && is_valid) {
			iter_min = +minute; iter_sec = +second; iter_hr = +hour;
		}
		while ((iter_min > 0 || iter_sec > 0 || iter_hr > 0) && is_valid){
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