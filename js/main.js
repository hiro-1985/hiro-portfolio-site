


// ローディング画面（動くWebデザインアイディア帳より参考）⬇️
var bar = new ProgressBar.Line(splash_text, {//id名を指定
	easing: 'easeInOut',//アニメーション効果linear、easeIn、easeOut、easeInOutが指定可能
	duration: 1000,//時間指定(1000＝1秒)
	strokeWidth: 0.2,//進捗ゲージの太さ
	color: '#555',//進捗ゲージのカラー
	trailWidth: 0.2,//ゲージベースの線の太さ
	trailColor: '#bbb',//ゲージベースの線のカラー
	text: {//テキストの形状を直接指定				
		style: {//天地中央に配置
			position: 'absolute',
			left: '50%',
			top: '50%',
			padding: '0',
			margin: '-30px 0 0 0',//バーより上に配置
			transform:'translate(-50%,-50%)',
			'font-size':'1rem',
			color: '#626262',
		},
		autoStyleContainer: false //自動付与のスタイルを切る
	},
	step: function(state, bar) {
		bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値
	}
});

//アニメーションスタート
bar.animate(1.0, function () {//バーを描画する割合を指定します 1.0 なら100%まで描画します
	$("#splash").delay(500).fadeOut(800);//アニメーションが終わったら#splashエリアをフェードアウト
});  


// スクロール途中でヘッダーが消え、上にスクロールすると復活⬇️
var startPos = 0,winScrollTop = 0;
$(window).on('scroll',function(){
    winScrollTop = $(this).scrollTop();
    if (winScrollTop >= startPos) {
      if(winScrollTop >= 600) {
        $('#header').addClass('header-hide');
      }
    } else {
        $('#header').removeClass('header-hide');
    }
    startPos = winScrollTop;
});


// スライダー実装（動くWebデザインアイディア帳より参考⬇️）
var windowwidth = window.innerWidth || document.documentElement.clientWidth || 0;
if (windowwidth > 768){
  var responsiveImage = [//PC用の画像
    { src: './images/firstview-lake-01.jpg',
     text: "<p>「この人を採用して良かった」</p>"},
    { src: './images/firstview-tool-02.jpg',
     text: "<p>そう思って頂けるよう、</p>"},
    { src: './images/firstview-bass-03.jpg',
     text: "<p>日々、自己研鑽に励み</p>"},
    { src: './images/firstview-angler-04.jpg',
     text: "<p>人間性、スキル共に高みを目指します。</p>"}
  ];
} else {
  var responsiveImage = [//タブレットサイズ（768px）以下用の画像
    { src: './images/firstview-lake-sp-05.jpg', align: "90%",
      text: "<p>「この人を採用して良かった」</p>"},
    { src: './images/firstview-tool-06.jpg',
      text: "<p>そう思って頂けるよう、</p>"},
    { src: './images/firstview-bass-sp-07.jpg',
      text: "<p>日々、自己研鑽に励み</p>"},
    { src: './images/firstview-angler-sp-08.jpg',
      text: "<p>人間性、スキル共に<br>高みを目指します。</p>"}
  ];
}

$('#slider').vegas({
  overlay: false,//画像の上に網線やドットのオーバーレイパターン画像を指定。
  transition: 'blur',//切り替わりのアニメーション。http://vegas.jaysalvat.com/documentation/transitions/参照。fade、fade2、slideLeft、slideLeft2、slideRight、slideRight2、slideUp、slideUp2、slideDown、slideDown2、zoomIn、zoomIn2、zoomOut、zoomOut2、swirlLeft、swirlLeft2、swirlRight、swirlRight2、burnburn2、blurblur2、flash、flash2が設定可能。
  transitionDuration: 1500,//切り替わりのアニメーション時間をミリ秒単位で設定
  delay: 7000,//スライド間の遅延をミリ秒単位で。
  animationDuration: 7000,//スライドアニメーション時間をミリ秒単位で設定
  animation: 'kenburnsUp',//スライドアニメーションの種類。http://vegas.jaysalvat.com/documentation/transitions/参照。kenburns、kenburnsUp、kenburnsDown、kenburnsRight、kenburnsLeft、kenburnsUpLeft、kenburnsUpRight、kenburnsDownLeft、kenburnsDownRight、randomが設定可能。
  slides: responsiveImage,//画像設定を読む
  //timer:false,// プログレスバーを非表示したい場合はこのコメントアウトを外してください
  cover: true,
  walk: function (index, slideSettings) {
    $('.slider-slide-content').html(slideSettings.text);
}
});


// ハンバーガーメニューの表示⬇️
$(function () {
  $(".header__menu__button").click(function() {
    $(".modal, .modal__overlay").fadeIn(300);
    $(".header__menu__button").fadeOut(300);
  });

  $(".header__delete__button, .modal__overlay").click(function() {
    $(".modal, .modal__overlay").fadeOut(300);
    $(".header__menu__button").fadeIn(300);
  });

  $('a[href^="#"]').click(function () {
    var adjust = 0;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - adjust;
    var speed = 500;
    $("html, body").animate({
      scrollTop: position
    }, speed, "swing");
    $(".modal, .modal__overlay").fadeOut(300);
    $(".header__menu__button").fadeIn(300);
    return false;
  });
}); 

// スクロールすると要素をふわっと表示⬇️
$(function () {
  $(".js-fade").on("inview", function () {
    $(this).addClass("fade-active");
  });
});


// topへ戻るボタン⬇️
$("#page-top").on("click", function() {
  $("body, html").animate({
    scrollTop: 0
  }, 1000);

  return false;
});


// フォームのバリデーション（jQuery標準デザイン講座より参考⬇️）
$(function() {
  $(".form__alert").hide();

  $("#js-submit").click(function() {

    var sendFlag = true;

    if(!$("#name").val()) {
      $("#form__name__area .form__alert").show();
      sendFlag = false;
    } else {
      $(".form__alert").hide();
    };

    if(!$("#address").val()) {
      $("#form__address__area .form__alert").show();
      sendFlag = false;
    } else {
      $(".form__alert").hide();
    };

    if(!$("#textarea").val()) {
      $("#form__textarea__area .form__alert").show();
      sendFlag = false;
    } else {
      $(".form__alert").hide();
    };

    if(sendFlag == false) {
      return false;
    }
  });
});
