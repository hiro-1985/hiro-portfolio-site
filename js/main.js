
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

// テキストアニメーション⬇️
const textAnimation = document.querySelectorAll(".slider-slide-content")
for (let i = 0; i < textAnimation.length; i++) {
  const targetElement = textAnimation[i],
        texts = targetElement.textContent,
        textsArray = [];

  targetElement.textContent = "";
  
  for (let j = 0; j < texts.split(" ").length; j++) {
    textsArray.push('<span style= "animation-delay: ' + (j * .1) + 's;">' + texts.split(" ")[j] + '</span>')
  }
  for (let k = 0; k < textsArray.length; k++) {
    targetElement.innerHTML+= textsArray[k];
  }
}


// スライダー実装（動くWebデザインアイディア帳より参考⬇️）
var windowwidth = window.innerWidth || document.documentElement.clientWidth || 0;
if (windowwidth > 768){
  var responsiveImage = [//PC用の画像
    { src: './images/firstview-lake-01.jpg'},
    { src: './images/firstview-tool-02.jpg'},
    { src: './images/firstview-bass-03.jpg'},
    { src: './images/firstview-angler-04.jpg'}
  ];
} else {
  var responsiveImage = [//タブレットサイズ（768px）以下用の画像
    { src: './images/firstview-lake-sp-05.jpg', align: "90%" },
    { src: './images/firstview-tool-06.jpg' },
    { src: './images/firstview-bass-sp-07.jpg' },
    { src: './images/firstview-angler-sp-08.jpg' }
  ];
}

$('#slider').vegas({
  overlay: false,//画像の上に網線やドットのオーバーレイパターン画像を指定。
  transition: 'blur',//切り替わりのアニメーション。http://vegas.jaysalvat.com/documentation/transitions/参照。fade、fade2、slideLeft、slideLeft2、slideRight、slideRight2、slideUp、slideUp2、slideDown、slideDown2、zoomIn、zoomIn2、zoomOut、zoomOut2、swirlLeft、swirlLeft2、swirlRight、swirlRight2、burnburn2、blurblur2、flash、flash2が設定可能。
  transitionDuration: 1500,//切り替わりのアニメーション時間をミリ秒単位で設定
  delay: 10000,//スライド間の遅延をミリ秒単位で。
  animationDuration: 20000,//スライドアニメーション時間をミリ秒単位で設定
  animation: 'kenburnsUp',//スライドアニメーションの種類。http://vegas.jaysalvat.com/documentation/transitions/参照。kenburns、kenburnsUp、kenburnsDown、kenburnsRight、kenburnsLeft、kenburnsUpLeft、kenburnsUpRight、kenburnsDownLeft、kenburnsDownRight、randomが設定可能。
  slides: responsiveImage,//画像設定を読む
  //timer:false,// プログレスバーを非表示したい場合はこのコメントアウトを外してください
  cover: true,
});


// ハンバーガーメニューの表示⬇️
$(function () {
  $(".header__menu__button").click(function() {
    $(".modal, .modal__overlay").fadeIn(200);
  });

  $(".header__delete__button, .modal__overlay").click(function() {
    $(".modal, .modal__overlay").fadeOut(200);
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
    $(".modal, .modal__overlay").fadeOut(200);
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

// フォームの送信ボタンを押した後の挙動（しょーごさんブログを参考⬇️）
// $(document).ready(function () {

//   $('#form').submit(function (event) {
//     var formData = $('#form').serialize();
//     $.ajax({
//       url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe33fiFiL_yw4IP0zh-D4v_LUIi5aMGg66WKfjnb80qb4_FLg/formResponse",
//       data: formData,
//       type: "POST",
//       dataType: "xml",
//       statusCode: {
//         0: function () {
//           $(".end-message").slideDown();
//           $(".form__submit__outer").fadeOut();
//           //window.location.href = "thanks.html";
//         },
//         200: function () {
//           $(".false-message").slideDown();
//         }
//       }
//     });
//     event.preventDefault();
//   });

// });