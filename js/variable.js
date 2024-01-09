/*--------------------------------------------------------------
	## Global Varialble
--------------------------------------------------------------*/
var
    // 상태 적용 (현재형)
    clsIsCurrent      = 'is-current',     // 현  재
    clsIsActive       = 'is-active',      // 활성화 (사용자에 의한 동작상태)
    clsIsShow         = 'is-show',        // 보이기 (프로세스에 의한 노출상태)
    clsIsHide         = 'is-hide',        // 숨기기 (프로세스에 의한 노출상태)
    clsIsOn           = 'is-on',          // 켜  기 (모듈 설정상태)
    clsIsOff          = 'is-off',         // 끄  기 (모듈 설정상태)

    // 상태 체크 (과거형)
    clsIsCompleted    = 'is-completed',   // 완  료
    clsIsErrored      = 'is-errored',     // 에  러
    clsIsDisabled     = 'is-disabled',    // 비활성
    clsIsOpened       = 'is-opened',      // 펼쳐진
    clsIsFolded       = 'is-folded',      // 접혀진
    clsIsSelected     = 'is-selected',    // 선택된
    clsIsFocused      = 'is-focused',     // 포커스
    clsIsValued       = 'is-valued',      // 값있는
    clsIsHovered      = 'is-hovered',     // 호버된
    clsIsChecked      = 'is-checked',     // 체크된

    // 상태 체크 (스크롤링)
    clsIsScrTop       = 'is-scrTop',      // Scroll 상단
    clsIsScrBtm       = 'is-scrBtm',      // Scroll 하단
    clsIsScrStart     = 'is-scrStart',    // Scroll 시작
    clsIsScrEnd       = 'is-scrEnd',      // Scroll 종료
    clsIsScrDown      = 'is-scrDown',     // Scroll 아래로
    clsIsScrUp        = 'is-scrUp',       // Scroll 위로

    // 디바이스 정의
    clsDevPC          = 'dv-pc',          // Device PC
    clsDevMob         = 'dv-mobile',      // Device Mobile
    clsDevIOS         = 'dv-ios',         // Device IOS
    clsDevAnd         = 'dv-android',     // Device 안드로이드
    clsDevPT          = 'dv-portrait',    // Screen 세로모드
    clsDevLS          = 'dv-landscape',   // Screen 가로모드
    clsDevCR          = 'dv-crome',       // Browser 크롬
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

    // Window & Document Area
    win_iH            = null,             // Window Inner Height
    win_H             = null,             // Window Height
    win_W             = null,             // Window Width
    scr_H             = null,             // Scroll Height
    scr_W             = null,             // Scroll Width

_; // Varialble End