/*--------------------------------------------------------------
	## Init - 초기실행
--------------------------------------------------------------*/
var pub = {
	init : function(){
		dv.init();   // Device
		cm.init();   // Common
		ui.init();   // UI
		cn.init();   // Content
	}
}

$(document).ready(function(){
	pub.init();  // 개발에서 하나만 호출하도록
});