import './style/main.less';
import './style/bootstrap.min.css';

let images = [
				require('./images/login_banner_1.jpg'),
				require('./images/login_banner_2.jpg'),
				require('./images/login_banner_3.jpg'),
				require('./images/login_banner_4.jpg')
			];

$(function(){
	$('.bg-circle').css({'marginLeft':'-'+($('.bg-circle').width()/2+174) + 'px'});
	$('.bg-circle p').eq(0).css({'background':'#fff'});
	var num = 1;
	setInterval(function(){
		if (num>=$('.bg-circle p').length) {
			num = 0;
		}
		// console.log(num)
		$('.bg-circle p').css({'background':'#bbb'});
		$('.bg-circle p').eq(num).css({'background':'#fff'});
		$('.bodyer').css({'backgroundImage':`url(${images[num]})`});
		num++;
	},5000);
})

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
})



