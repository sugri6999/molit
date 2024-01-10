/*--------------------------------------------------------------
	## Device - 기기설정
--------------------------------------------------------------*/
var
    // 디바이스 정의
    clsDevPC          = 'dv-pc',          // Device PC
    clsDevMob         = 'dv-mobile',      // Device Mobile
    clsDevIOS         = 'dv-ios',         // OS IOS
    clsDevAnd         = 'dv-android',     // OS 안드로이드
    clsDevPT          = 'dv-portrait',    // Screen 세로모드
    clsDevLS          = 'dv-landscape',   // Screen 가로모드
    clsDevCR          = 'dv-chrome',       // Browser 크롬
    clsDevSF          = 'dv-safari',      // Browser 사파리
    clsDevIE          = 'dv-ie',          // Browser 익스플로러
    clsDevOP          = 'dv-opera',       // Browser 오페라
    clsDevFF          = 'dv-firefox',     // Browser 파이어폭스
    clsDevSM          = 'dv-samsung',     // Browser 삼성인터넷

    // 디바이스 체크
    curDev            = '',               // Device 종류
    curOS             = '',               // OS 종류
    curOSV            = '',               // OS Version
    curScr            = '',               // Screen 종류
    oldScr            = '',               // Screen 종류
    curBrw            = '',               // Browser 종류
    curBrwV           = '',               // Browser 버전
_; // Varialble End

var dv = {
	_ua : navigator.userAgent.toLowerCase(),
	init : function(){
		console.log('dv.init()');
		this.setDevice();
		this.setBrowser();
		this.logs();
	},
	getAndroid : function(){
		var match = this._ua.match(/android\s([0-9\.]*)/);
		return match ? match[1]:false;
	},
	getIOS : function(){
		if (/iP(hone|od|ad)/.test(navigator.platform)) {
			var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
			return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
		}
	},
	setDevice : function(){
		var that = this;
		var mobile = (/iphone|ipad|ipod|android/i.test(this._ua));
		if (mobile) {
			curDev = clsDevMob;
			this.setMobile();
			this.setScreen();
			$(window).on('resize', function(){ that.setScreen() });
		} else {
			curDev = clsDevPC;
		}
		$('body').addClass(curDev);
	},
	setMobile : function(){
		// Android
		if (this._ua.search("android") > -1) {
			curOS  = clsDevAnd;
			curOSV = this.getAndroid();
		}
		// IOS
		if ((this._ua.search("iphone") > -1) || (this._ua.search("ipod") > -1) || (this._ua.search("ipad") > -1)) {
			curOS = clsDevIOS;
			if (this.getIOS() == undefined){curOSV = '-mac';}
			else {curOSV = parseInt(this.getIOS())}
		}
		$('body').addClass(curOS).addClass(curOS+curOSV);
	},
	setScreen : function(){
		var orientation = window.orientation;
		if (orientation == 90 || orientation == -90){curScr = clsDevLS; oldScr = clsDevPT}
		else {curScr = clsDevPT; oldScr = clsDevLS}
		$('body').removeClass(oldScr).addClass(curScr);
	},
	setBrowser : function(){
		// 표준
		if (this._ua.indexOf('firefox') > -1){curBrw = clsDevFF;}
		if (this._ua.indexOf('chrome') > -1 && this._ua.indexOf('safari') > -1){curBrw = clsDevCR;}
		if (this._ua.indexOf('chrome') == -1 && this._ua.indexOf('safari') > -1){curBrw = clsDevSF;}

		// 익스플로러
		if (this._ua.indexOf('msie 7') != -1) {curBrw = clsDevIE; curBrwV = '7';}
		if (this._ua.indexOf('msie 8') != -1) {curBrw = clsDevIE; curBrwV = '8';}
		if (this._ua.indexOf('msie 9') != -1) {curBrw = clsDevIE; curBrwV = '9';}
		if (this._ua.indexOf('msie 10') != -1) {curBrw = clsDevIE; curBrwV = '10';}
		if (this._ua.indexOf('msie') == -1 && this._ua.indexOf('trident/7.0') != -1 && this._ua.indexOf('rv:11.0') != -1) {curBrw = clsDevIE; curBrwV = '11';}

		// 삼성인터넷
		if (this._ua.indexOf('samsungbrowser') > -1){curBrw = clsDevSM}
		if (this._ua.indexOf('samsungbrowser/2') > -1){curBrwV = '2'}
		if (this._ua.indexOf('samsungbrowser/3') > -1){curBrwV = '3'}
		if (this._ua.indexOf('samsungbrowser/4') > -1){curBrwV = '4'}
		if (this._ua.indexOf('samsungbrowser/5') > -1){curBrwV = '5'}

		$('body').addClass(curBrw).addClass(curBrw+curBrwV);
	},
	logs : function(){
		console.log(this._ua);
		console.log('var curDev : ' + curDev);
		console.log('var curOS : '  + curOS);
		console.log('var curOSV : ' + curOSV);
		console.log('var curScr : ' + curScr);
		console.log('var curBrw : ' + curBrw);
		console.log('var curBrwV : '+ curBrwV);
	},
}
