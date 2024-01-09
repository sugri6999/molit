/*--------------------------------------------------------------
	## UI - 모듈공통
--------------------------------------------------------------*/
$(document).ready(function() {


	/* 상단으로 이동 */
	$(window).scroll(function() {
		if ($(this).scrollTop() > 200 ) {
			$('#goTop').fadeIn();
		} else {
			$('#goTop').fadeOut();
		}
	});
	$('#goTop').click(function() {
		$('html, body').animate({scrollTop : 0}, 400);
		return false;
	});

	/* 첨부파일 */
	var fileTarget = $('.form-file .upload-hidden');
	fileTarget.on('change', function(){
		if(window.FileReader){
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}

		$(this).siblings('.upload-name').val(filename);
	});
	var fileTarget = $('.form-file .upload-hidden');	
	//preview image
	var imgTarget = $('.preview-image .upload-hidden');
	imgTarget.on('change', function(){
		var parent = $(this).parent();
		parent.children('.upload-display').remove();
		if(window.FileReader){
			//image 파일만
			if (!$(this)[0].files[0].type.match(/image\//)) return;
			
			var reader = new FileReader();
			reader.onload = function(e){
				var src = e.target.result;
				parent.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img src="'+src+'" class="upload-thumb"></div></div>');
			}
			reader.readAsDataURL($(this)[0].files[0]);
		}
		else {
			$(this)[0].select();
			$(this)[0].blur();
			var imgSrc = document.selection.createRange().text;
			parent.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img class="upload-thumb"></div></div>');

			var img = $(this).siblings('.upload-display').find('img');
			img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";
		}
	});

	/* 텍스트바이트수 글자수 카운팅 */
	$(function() {
		$('#txtArea').keyup(function(e) {
			var content = $(this).val();
			$('.txt-limit').html('<strong>' + content.length + '</strong>' + '/2000');
		});
		$('#txtArea').keyup;
	});

	var $ipt = $("input[type='text']"),
		$clearIpt = $('#searchClear');
	$ipt.keyup(function(){
		$("#searchClear").toggle(Boolean($(this).val()));
	});
	$clearIpt.toggle(Boolean($ipt.val()));
	$clearIpt.click(function(){
		$(".form-text").val('').focus();
		$(this).hide();
	});

	/* 스와이프 */
	$('.single-item').slick();

	$('.multiple-items').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3
	});


	$('.fade').slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear'
	});
	$('.responsive').slick({
		dots: true,
		infinite: false,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	});




	$(".vertical-center-4").slick({
		dots: true,
		vertical: true,
		centerMode: true,
		slidesToShow: 4,
		slidesToScroll: 2
	});
	$(".vertical-center-3").slick({
		dots: true,
		vertical: true,
		centerMode: true,
		slidesToShow: 3,
		slidesToScroll: 3
	});
	$(".vertical-center-2").slick({
		dots: true,
		vertical: true,
		centerMode: true,
		slidesToShow: 2,
		slidesToScroll: 2
	});
	$(".vertical-center").slick({
		dots: true,
		vertical: true,
		centerMode: true,
	});
	$(".vertical").slick({
		dots: true,
		vertical: true,
		slidesToShow: 3,
		slidesToScroll: 3
	});
	$(".regular").slick({
		dots: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3
	});
	$(".center").slick({
		dots: true,
		infinite: true,
		centerMode: true,
		slidesToShow: 5,
		slidesToScroll: 3
	});
	$(".variable").slick({
		dots: true,
		infinite: true,
		variableWidth: true
	});
	$(".lazy").slick({
		lazyLoad: 'ondemand', // ondemand progressive anticipated
		infinite: true
	});


});