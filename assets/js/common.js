$(document).ready(function () {
  // 네비게이션
  var _gnb = $('#gnb');
  var _first = _gnb.find('[data-link="first"]'); //$('#nav_box button')
  var _last = _gnb.find('[data-link="last"]');
  var _dim;

  $('#nav_box button').on('click', function () {
    if ($(this).parent().hasClass('on')) { //열려진 경우라면
      console.log(_dim.attr('id'));
      _dim.stop().fadeOut('fast', function () {
        $(this).remove();
      });
      $('#nav_box').stop().animate({right: '-750px'}, 700, function () {
        $(this).children('#gnb').css({visibility: 'hidden'});
      });
      $(this).text('MENU').parent().removeClass('on').parent().css('z-index', '10000');

    } else {
      $('#nav_box').before('<div id="dim"></div>');
      _dim = $('#dim');
      _dim.stop().fadeIn('fast');
      _gnb.css({visibility: 'visible'});
      $(this).parent().stop().animate({right: 0}, 700, function () {
        _first.focus();
      });
      $(this).text('EXIT').parent().addClass('on').parent().css('z-index', '1000');
    }

    $('#nav_box button').on('keydown', function (e) {
      if (e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        _last.focus();
      }
    });
    _last.on('keydown', function (e) {
      if (!e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        $('#nav_box button').focus();
      }
    });

    //바깥을 클릭하는 경우도 닫겨진다
    _dim.on('click', function () {
      $('#nav_box button').trigger('click');
    });

    //esc 키보드를 누른 경우도 닫겨진다
    $(window).on('keydown', function (e) {
      //console.log(e.keyCode); //esc 27
      if (e.keyCode === 27) $('#nav_box button').click();
    });
  });


  //fade 
  var timer = 0;
  $(window).on('scroll', function () {
    clearTimeout(timer);

    timer = setTimeout(function () {
      var scrollY = $(this).scrollTop();
      $('.fade').each(function () {
        if (scrollY > $(this).offset().top - 900) $(this).addClass('on');
      });
    }, 50); //시간 간격을 적어주지 않아서 계속 오류를 발생시키고 느려 지네요
  });
});
