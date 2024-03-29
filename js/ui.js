/*--------------------------------------------------------------
	## UI - 모듈공통
--------------------------------------------------------------*/
var ui = {
	init : function(){
		console.log('ui.init()');

		if ($('.tab-nav').length)			{this.tab.init();}				// #Tab
		if ($('.accordion').length)			{this.accordion.init();}		// #Accordion
		if ($('[data-role=fold]').length)	{this.folder.init();}			// #Folder (접기)
		if ($('[data-role=more]').length)	{this.folderMore.init();}		// #FolderMore (더보기)
		if ($('.tooltip-basic').length)		{this.tooltip.init();}			// #Tooltip
		if ($('.dropdown').length)			{this.dropdown.init();}			// #Dropdown
		if ($('.popup-open').length)		{this.popup.init();}			// #Popup
		if ($('.js-popup').length)			{this.fullpopup.init();}		// Full Popup
		if ($('.js-sticky').length)			{this.sticky.init();}			// Sticky
		if ($('.js-spyScroll').length)		{this.spyScroll.init();}		// Spy Scroll
		if ($('.js-infinitScroll').length)	{this.infiniteScroll.init();}	// Infinit Scroll
		if ($('.js-floating').length)		{this.floating.init();}			// Floating
		if ($('.js-dimmer').length)			{this.dimmer.init();}			// Dimmer
		if ($('.js-progress').length)		{this.progress.init();}			// Progress
		if ($('.js-waypoint').length)		{this.waypoint.init();}			// Waypoint
	},

	/*
		기능정의 : #Tab
		연결방식 : href="" / id=""
		참고경로 : modules/modules_tab.html
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
	*/
	tab : {
		eleButton : '.tab-nav a',
		eleContent : '.tab-content',
		clsActive : 'is-active',
		init : function(){
			var _this = this;
			$(this.eleContent+'.'+this.clsActive).each(function(){_this.action('#'+$(this).attr('id'))});
			this.event($(this.eleButton));
		},
		event : function($this){
			var _this = this;
			$this.not('.is-evented').on('click', function(){
				_this.action($(this).attr('href')); return false;
			}).attr('.is-evented');
		},
		action : function(id){
			$(this.eleButton+'[href="'+id+'"]').attr({'aria-selected':'true'}).removeAttr('aria-expanded').parent().addClass(this.clsActive).siblings().removeClass(this.clsActive).children().attr({'aria-selected':'false', 'aria-expanded':'false'});
			$(id).addClass(this.clsActive).attr('aria-hidden', 'false').siblings().removeClass(this.clsActive).attr('aria-hidden', 'true');
		},
	},

	/*
		기능정의 : #Accordion
		연결방식 : href="" / id=""
		참고경로 : modules/modules_accordion.html
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
	*/
	accordion : {
		eleModule : '.accordion',
		eleButton : '.accordion-toggle',
		eleTitle : '.accordion-title',
		eleContent : '.accordion-content',
		clsActive : 'is-active',
		duration : 300,
		init : function(){
			this.reset();
			this.disable();
			this.event($(this.eleButton));
		},
		reset : function(){
			var _this = this;
			$('.accordion-basic' ).each(function(){$(this).attr({'data-sync':'true', 'data-toggle':'true' })});
			$('.accordion-basic2').each(function(){$(this).attr({'data-sync':'true', 'data-toggle':'false'})});
			$('.accordion-basic3').each(function(){$(this).attr({'data-sync':'false', 'data-toggle':'true'})});
		},
		event : function($this){
			var _this = this;
			$this.not('.is-evented, [disabled]').on('click', function(){
				_this.action($(this).attr('href')); return false;
			}).addClass('is-evented');
		},
		action : function(id){
			var $toggle = $(this.eleButton+'[href="'+id+'"]'),
				$title = $toggle.closest(this.eleTitle),
				$module = $toggle.closest(this.eleModule),
				$content = $(id),
				clsActive = this.clsActive;

			// Toggle 접기
			if ($module.attr('data-toggle') == 'true' && $content.hasClass(clsActive)){
				$title.removeClass(clsActive);
				$toggle.attr('aria-expanded','false');
				$content.stop().slideUp(this.duration, function(){$(this).removeClass(clsActive).attr('aria-hidden', 'true')});
			}
			// Syncroize 펼치기
			else if ($module.attr('data-sync') == 'true' && !$content.hasClass(clsActive)){
				$title.addClass(clsActive).find(this.eleButton).attr('aria-expanded','true');
				$title.siblings(this.eleTitle).removeClass(clsActive).find(this.eleButton).attr('aria-expanded','false');
				$content.stop().slideDown(this.duration, function(){$(this).addClass(clsActive).attr('aria-hidden', 'false')});
				$content.siblings(this.eleContent).stop().slideUp(this.duration, function(){$(this).removeClass(clsActive).attr('aria-hidden', 'true')});
			}
			// Default 펼치기
			else if ($module.attr('data-sync') == 'false' && !$content.hasClass(clsActive)){
				$title.addClass(clsActive).find(this.eleButton).attr('aria-expanded','true');
				$content.stop().slideDown(this.duration, function(){$(this).addClass(clsActive).attr('aria-hidden', 'false')});
			}
			// 토글이 아니면 생성된 aria-expanded 속성삭제
			if ($module.attr('data-toggle') == 'false' && $toggle.attr('aria-expanded') == 'true'){
				$toggle.removeAttr('aria-expanded');
			}
			this.disable();
		},
		disable : function(){
			$(this.eleButton+'[disabled]').each(function(){
				 $(this).removeAttr('aria-expanded');
				 $(this).attr('aria-disabled', 'true');
				 $(this).off('click');
			})
		}
	},

	/*
		기능정의 : #Folder
		연결방식 : data-target="" / data-name=""
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로 : /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	folder : {
		eleButton : '.folder-toggle',
		eleModule : '.folder-content',
		eleFocus : '.folder-focus',
		clsActive : 'is-active',
		init : function(){
			this.reset();
			this.event($(this.eleButton));
		},
		reset : function(){
			var _this = this;
			$(this.eleButton+'[data-role=fold]').each(function(){
				var name = $(this).attr('data-target');
				$('[data-target='+name+']').attr({'data-state':'closed', 'aria-expanded':'false'});
				$('[data-name='+name+']').attr({'hidden':'hidden'});
			})
		},
		event : function($this){
			var _this = this;
			$this.filter('[data-role=fold]').not('.is-evented').on('click', function(){
				var target = $(this).attr('data-target');
				var state = $(this).attr('data-state');
				if (state == 'closed'){_this.open(target)}
				else if (state == 'opened'){_this.close(target)}
				return false;
			}).addClass('is-evented');
		},
		open : function(name){
			var _this = this;
			$('[data-target='+name+']').attr({'data-state':'null', 'aria-expanded':'true'}).addClass(_this.clsActive);
			$('[data-name='+name+']').addClass(_this.clsActive).slideDown(300, function(){
				$('[data-name='+name+']').removeAttr('hidden');
				$('[data-target='+name+']').attr('data-state', 'opened');
			});
		},
		close : function(name){
			var _this = this;
			$('[data-target='+name+']').attr({'data-state':'null', 'aria-expanded':'false'}).removeClass(_this.clsActive);
			$('[data-name='+name+']').removeClass(_this.clsActive).slideUp(300, function(){
				$('[data-name='+name+']').attr('hidden', 'hidden');
				$('[data-target='+name+']').attr('data-state', 'closed');
			});
		}
	},

	/*
		기능정의 : #FolderMore
		연결방식 : data-target="" / data-name=""
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로 : /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	folderMore : {
		eleButton : '.folder-toggle',
		eleModule : '.folder-content',
		eleInner : '.folder-inner',
		eleFocus : '.folder-focus',
		clsActive : 'is-active',
		init : function(){
			this.reset();
			this.event($(this.eleButton));
		},
		reset : function(){
			var _this = this;
			$(this.eleButton).each(function(){
				var name = $(this).attr('data-target');
				$('[data-target='+name+']').attr({'data-state':'closed', 'aria-expanded':'false'});
				$('[data-name='+name+']').attr({'hidden':'hidden'});
			})
		},
		event : function($this){
			var _this = this;
			$this.filter('[data-role=more]').not('.is-evented').on('click', function(){
				var target = $(this).attr('data-target');
				var state = $(this).attr('data-state');
				if (state == 'closed'){_this.open(target)}
				else if (state == 'opened'){_this.close(target)}
				return false;
			}).addClass('is-evented');
		},
		open : function(name){
			var _this = this;
			var $module = $('[data-name='+name+']').closest(_this.eleModule);
			var $inner = $('[data-name='+name+']').closest(_this.eleInner);
			$module.css({height:$inner.height(), overflow:'hidden'}).attr('data-height', $inner.height()).addClass(_this.clsActive);
			$('[data-target='+name+']').addClass(_this.clsActive).attr({'data-state':'null'});
			$('[data-name='+name+']').removeAttr('hidden');
			TweenMax.to($module, 0.3, {height:$inner.height(), ease:Power2.easeOut, onComplete:function(){
				$('[data-name='+name+']').eq(0).find(_this.eleFocus).attr('tabindex','0').focus();
				$('[data-target='+name+']').attr({'data-state':'opened', 'aria-expanded':'true'});
			}});
		},
		close : function(name){
			var _this = this;
			var $module = $('[data-name='+name+']').closest(_this.eleModule);
			var $inner = $('[data-name='+name+']').closest(_this.eleInner);
			$module.css({height:$module.height(), overflow:'hidden'}).removeClass(_this.clsActive);
			$('[data-target='+name+']').attr({'data-state':'null'}).removeClass(_this.clsActive);
			TweenMax.to($module, 0.3, {height:parseInt($module.attr('data-height')), ease:Power2.easeOut, onComplete:function(){
				$('[data-name='+name+']').attr('hidden', 'hidden');
				$('[data-target='+name+']').attr({'data-state':'closed', 'aria-expanded':'false'});
			}});
		}
	},

	/*
		기능정의 : #Tooltip
		참고사항 : 설명
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로 : /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	tooltip : {
		eleWrapper : '.tooltip-wrap',
		eleOpener : '.tooltip-open',
		eleCloser : '.tooltip-close',
		eleModule : '.tooltip',
		eleFocus  : '.tooltip-focus',
		setTime : null,
		init : function(){
			this.event();
		},
		event : function(){
			var _this = this;
			$(this.eleOpener).not('.is-evented').on('click', function(){_this.open($(this).attr('href')); return false});
			$(this.eleCloser).not('.is-evented').on('click', function(){_this.close($(this).attr('href')); return false});
			$(this.eleWrapper).not('.is-evented').on('mouseover', function(){_this.open('#'+$(this).find(_this.eleModule).attr('id'))});
			$(this.eleWrapper).not('.is-evented').on('mouseleave', function(){_this.close('#'+$(this).find(_this.eleModule).attr('id'))});
		},
		open : function(id){
			var _this = this;
			$(id).attr({'data-state':'null', 'aria-hidden':'false'});
			$(id).stop().fadeIn(200, function(){$(this).attr({'data-state':'opened'})});
			$(_this.eleOpener+'[href="'+id+'"]').attr({'aria-expanded':'true'});
		},
		close : function(id){
			var _this = this;
			$(id).attr({'data-state':'null', 'aria-hidden':'true'});
			$(id).stop().fadeOut(200, function(){$(this).attr({'data-state':'closed'})});
			$(_this.eleOpener+'[href="'+id+'"]').attr({'aria-expanded':'false'});
			//	$(this.eleOpener+'[href="'+id+'"]').attr('tabindex','0').focus();
		},
	},

	/*
		기능정의 : #Dropdown
		참고사항 : href="" / id="" 연결
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로 : /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	dropdown : {
		eleWrapper : '.dropdown-wrap',
		eleButton : '.dropdown-toggle',
		eleModule : '.dropdown',
		clsActive : 'is-active',
		init : function(){
			this.reset();
			this.event();
		},
		reset : function(){
			$(this.eleModule).attr({'data-state':'closed'});
		},
		event : function(){
			var _this = this;
			$(_this.eleButton).on('click', function(){
				var id = $(this).attr('href');
				if ($(id).attr('data-state') == 'closed'){ _this.open(id); }
				else if ($(id).attr('data-state') == 'opened'){ _this.close(id); }
				return false;
			}).addClass('is-evented');
		},
		open : function(id){
			var _this = this;
			var $button = $(this.eleButton+'[href="'+id+'"]');
			$(id).attr({'data-state':'null'});
			$button.attr({'aria-expanded':'true'}).addClass(this.clsActive);
			if ($(id).hasClass('dropdown-top')){
				TweenMax.set($(id), {display:'block', scaleY:0, opacity:0, y:'50%', bottom:'calc(100% - 1px)'});
				TweenMax.to($(id), 0.25,  {scaleY:1, opacity:1, y:'0%', ease:Power2.easeInOut, onComplate:function(){
					$(id).attr({'aria-hidden':'false', 'data-state':'opened'}).addClass(_this.clsActive);
				}});
			} else {
				TweenMax.set($(id), {display:'block', scaleY:0, opacity:0, y:'-50%', top:'calc(100% - 1px)'});
				TweenMax.to($(id), 0.25,  {scaleY:1, opacity:1, y:'0%', ease:Power2.easeInOut, onComplate:function(){
					$(id).attr({'aria-hidden':'false', 'data-state':'opened'}).addClass(_this.clsActive);
				}});
			}
		},
		close : function(id){
			var _this = this;
			var $button = $(this.eleButton+'[href="'+id+'"]');
			$(id).attr({'data-state':'null'});
			if ($(id).hasClass('dropdown-top')){
				TweenMax.set($(id), {scaleY:1, opacity:1, y:0});
				TweenMax.to($(id), 0.25,  {scaleY:0, opacity:0, y:'50%', ease:Power2.easeInOut, onComplate:function(){
					$button.attr({'aria-expanded':'false'}).removeClass(_this.clsActive);
					$(id).attr({'aria-hidden':'true', 'data-state':'closed'}).removeClass(_this.clsActive);
				}});
			} else {
				TweenMax.set($(id), {scaleY:1, opacity:1, y:0});
				TweenMax.to($(id), 0.25,  {scaleY:0, opacity:0, y:'-50%', ease:Power2.easeInOut, onComplate:function(){
					$button.attr({'aria-expanded':'false'}).removeClass(_this.clsActive);
					$(id).attr({'aria-hidden':'true', 'data-state':'closed'}).removeClass(_this.clsActive);
				}});
			}
		},
	},

	/*
		기능정의 : #Popup
		참고사항 : 설명
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로 : /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	popup: {
		eleModule: '.popup-wrap',
		eleOpener: '.popup-open',
		eleCloser: '.popup-close',
		eleFocus: '.popup-focus',
		zindex: 1000,
		open: function (id, obj) {
			var _this = this;
			var $id = $('#' + id);
			$(obj).attr({ 'data-popup': id });
			$id.removeAttr('hidden');
			setTimeout(function () { $id.addClass('is-active') }, 0);
			$id.one(transitionend, function () {
				if ($(this).hasClass('is-active')) {
					$(this).find(_this.eleFocus).attr('tabindex', '0').focus();
				}
			});
			dimmer.open($id, 'dimmer-popup');
			return 'Popup Opened';
		},
		close: function (id, callback) {
			var _this = this;
			var $id = $('#' + id);
			var $opner = $('[data-popup=' + id + ']');
			$id.removeClass('is-active');
			$id.one(transitionend, function () {
				if (!$(this).hasClass('is-active')) {
					$id.attr('hidden', 'hidden');
					$opner.focus().removeAttr('data-popup');
					if (callback) { callback }
				}
			});
			dimmer.close($id, 'dimmer-popup');
			return 'Popup Closed';
		},
	},

	/*
		## Full Popup
		기능정의 : 설명
		참고사항 : 설명
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로 : /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	fullpopup : {
		init : function(){
			this.event();
		},
		reset : function($this){
			ut.setAnchorAttr($this);
		},
			event : function(){
			this.action();
		},
		action : function(){
			console.log('Fullpopup Action');
		},
	},

	/*
		## Sticky
		기능정의 : 설명
		참고사항 : 설명
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로 : /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	sticky : {
		init : function(){
			this.event();
		},
		event : function(){
			this.action();
		},
		action : function(){
			console.log('Sticky Action');
		},
	},

	/*
		## Spy Scroll
		기능정의 : 설명
		참고사항 : 설명
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로 : /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	spyScroll : {
		init : function(){
			this.event();
		},
		event : function(){
			this.action();
		},
		action : function(){
			console.log('Spy Scroll Action');
		},
	},

	/*
		## Infinit Scroll
		기능정의 : 설명
		참고사항 : 설명
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로 : /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	infiniteScroll : {
		init : function(){
			this.event();
		},
		event : function(){
			this.action();
		},
		action : function(){
			console.log('Infinit Scroll Action');
		},
	},

	/*
		## Floating
		기능정의 : 설명
		참고사항 : 설명
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로 : /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	floating : {
		init : function(){
			this.event();
		},
		event : function(){
			this.action();
		},
		action : function(){
			console.log('Floating Action');
		},
	},

	/*
		## Dimmer
		기능정의 : 설명
		참고사항 : 설명
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로 : /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	dimmer : {
		init : function(){
			this.event();
		},
		event : function(){
			this.action();
		},
		action : function(){
			console.log('Dimmer Action');
		},
	},

	/*
		## Progress
		기능정의 : 설명
		참고사항 : 설명
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로 : /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	progress : {
		init : function(){
			this.event();
		},
		event : function(){
			this.action();
		},
		action : function(){
			console.log('Progress Action');
		},
	},

	/*
		## Waypoint
		기능정의 : 설명
		참고사항 : 설명
		참고메뉴 : 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로 : /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	waypoint : {
		init : function(){
			this.event();
		},
		event : function(){
			this.action();
		},
		action : function(){
			console.log('Waypoint Action');
		},
	},
}


$(document).ready(function(){

	// GNB 마우스 이벤트
	$(".node1-wrap > li").bind('mouseenter mouseleave click', function (e) {
		var winWidth = $(window).width();
		if (e.type === 'mouseenter') {
			if (winWidth > 940) {
				$(".node1-wrap > li").removeClass('on');
				$(this).addClass('on');
				$(".node1-wrap > li > div.node2-wrap").fadeOut(1);
				if ($(this).find('div.node2-wrap').length > 0) {
					$(this).find('div.node2-wrap').stop(true, false).fadeIn(1);
				}
			}
		}
		if (e.type === 'mouseleave') {
			if (winWidth > 940) {
				$(".node1-wrap > li").removeClass('on');
				$(".node1-wrap > li > div.node2-wrap").stop(true, false).fadeOut(1);
			}
		}
	});

	// 롤링배너_로그인
	$('.autoplay').slick({
		slide: 'div',
		infinite : true,   
		slidesToShow : 6,
		slidesToScroll : 1,
		// dots: true,
		speed : 600,
		autoplay : true,
		autoplaySpeed: 2000,
		arrows : true,
		pauseOnHover : true,
		prevArrow : "<button type='button' class='slick-prev'>이전</button>",
		nextArrow : "<button type='button' class='slick-next'>Next</button>",
	});

	


	$(".drop button").hover(function () {
		$(this).children(".drop-content").stop().slideToggle(500);
	});

	
});


function myFunction1() {
	document.getElementById("dropdownMenu1").classList.toggle("is-active");
}
function myFunction2() {
	document.getElementById("dropdownMenu2").classList.toggle("is-active");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
	if (!event.target.matches('.dropdown-toggle')) {
		var dropdowns = document.getElementsByClassName("dropdown");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('is-active')) {
				openDropdown.classList.remove('is-active');
			}
		}
	}
}




