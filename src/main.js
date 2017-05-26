import './style/main.less';

$('.title .he-login-title').on('mouseover', function(){
	$('.item-title-border-bottom').css({left:'20px'}); //保证每次都从一段滑到另一端
	if ($(this).attr('data-state') === '0') { // 判断选中的状态
		$('.item-title-border-bottom').show()
		.animate({left:'197px',backgroundColor:'#aaa'}, 'normal');
	}
}).on('mouseout', function(){
	$('.item-title-border-bottom').hide().css({'backgroundColor':'#0084cf'}); //离开时 隐藏 颜色回归
});

$('.title .protal-login-title').on('mouseover', function(){
	$('.item-title-border-bottom').css({left:'197px'})
	if ($(this).attr('data-state') === '0') {
		$('.item-title-border-bottom').show()
		.animate({left:'20px',backgroundColor:'#aaa'}, 'normal');
	}
}).on('mouseout', function(){
	$('.item-title-border-bottom').hide().css({'backgroundColor':'#0084cf'});
});

$('.title .item').on('click', function(){	
	$(this).attr('data-state', '1').css({'color':'#0084cf', 'borderBottomColor':'#0084cf'})
	.siblings().attr('data-state', '0').css({'color':'#aaa', 'borderBottomColor':'#fff'});
	$('.item-title-border-bottom').hide(); // 选中后 隐藏
	$('form .part').hide().eq($(this).index()).show();
});

$('.he-login .forget-password a').on('click', function(){
	$('form .part').hide().eq(2).show();
});

$('.part .code-button button').on('click', function(){

	$(this).attr('disabled', true);
	var _this = this;
	var num = 60;
	timer();

	function timer() {
		if (num) {
			$(_this).text(--num+'s后重试').css('backgroundColor','#ccc');
			setTimeout(timer, 1000);
		}else{
			$(_this).attr('disabled', false).text('发送验证码');

		}
	}
})



