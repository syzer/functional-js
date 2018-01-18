function check_responsive_font_sizes() {
  jQuery('.cp_responsive[data-font-size-init]').each(function (a, b) {
    jQuery(b).find('.cp_font').length ? jQuery(b).hasClass('.cp_font, .cp_line_height') || jQuery(b).addClass('cp-no-responsive') : jQuery(b).removeClass('cp-no-responsive')
  })
}

function CPResponsiveTypoInit() {
  jQuery('.cp_responsive').each(function (a, b) {
    var c = jQuery(b);
    if (!c.hasClass('cp_line_height')) {
      var d = c.css('font-size'), e = c.attr('data-font-size');
      e || c.attr('data-font-size-init', d)
    }
    if (!c.hasClass('cp_font')) {
      var f = c.css('line-height'), e = c.attr('data-line-height');
      e || c.attr('data-line-height-init', f)
    }
  }), check_responsive_font_sizes(), CP_slide_in_height()
}

function CP_slide_in_height() {
  setTimeout(function () {
    jQuery('.cp-slidein-popup-container').each(function (a, b) {
      if (jQuery(this).find('.slidein-overlay').hasClass('si-open')) {
        var c = jQuery(b), d = c.find('.cp-slidein'), e = (c.find('.cp-slidein'), c.find('.slidein-overlay')),
          f = (c.find('.cp-slidein').outerHeight(), c.find('.cp-slidein-body').outerHeight());
        jQuery(window).width(), f > jQuery(window).height() ? (d.addClass('cp-slidein-exceed'), e.each(function (a, b) {
          jQuery(b).hasClass('si-open') && jQuery('html').addClass('cp-exceed-vieport')
        }), d.css('height', f)) : (d.removeClass('cp-slidein-exceed'), jQuery('html').removeClass('cp-exceed-vieport'), d.css('height', ''))
      }
    })
  }, 1200)
}

function cp_color_for_list_tag() {
  jQuery('.slidein-overlay').each(function () {
    var a = jQuery(this).find('.cp-slidein-body').attr('class').split(' ')[1];
    jQuery(this).find('li').each(function () {
      if (0 == jQuery(this).parents('.cp_social_networks').length || 0 == jQuery(this).parents('.custom-html-form').length) {
        if (jQuery(this).parents('.cp_responsive').length) {
          var b = jQuery(this).parents('.cp_responsive').attr('class').split(' ')[0], c = jQuery(this).index() + 1,
            d = jQuery(this).find('.cp_font').css('font-size'), e = jQuery(this).find('span').css('color'),
            f = jQuery(this).parent();
          f = f[0].nodeName.toLowerCase(), style_type = '', style_css = '', 'ul' == f ? (style_type = jQuery(this).closest('ul').css('list-style-type'), 'none' == style_type && jQuery(this).closest('ul').css('list-style-type', 'disc')) : (style_type = jQuery(this).closest('ol').css('list-style-type'), 'none' == style_type && jQuery(this).closest('ol').css('list-style-type', 'decimal')), jQuery(this).find('span').each(function () {
            var a = jQuery(this).css('color');
            a.length > 0 && (e = a)
          });
          var g = '';
          jQuery('.cp-li-color-css-' + c).remove(), jQuery('.cp-li-font-css-' + c).remove(), d && (g = 'font-size:' + d, jQuery('head').append('<style class="cp-li-font-css' + c + '">.' + a + ' .' + b + ' li:nth-child(' + c + '){ ' + g + '}</style>')), e && jQuery('head').append('<style class="cp-li-color-css' + c + '">.' + a + ' .' + b + ' li:nth-child(' + c + '){ color: ' + e + ';}</style>')
        }
      }
    })
  })
}

function apply_boxshaddow(a) {
  jQuery('.slidein-overlay').each(function () {
    var b = jQuery(this).find('.cp-form-container').find('.cp-email').css('border-color'),
      c = jQuery(this).find('.cp-slidein-body').attr('class').split(' ')[1], d = jQuery(this).data('class'),
      e = jQuery(this).data('class');
    jQuery(this).hasClass('ps-container') && (e = jQuery(this).data('ps-id'), b = a, d = 'slidein-overlay'), jQuery('.cp-box-shaddow-' + e).remove(), jQuery('head').append('<style class="cp-box-shaddow-' + e + '">.' + d + ' .cp-slidein .' + c + ' input.cp-email:focus,  .' + d + ' .cp-slidein .' + c + ' input.cp-name:focus {  box-shadow: 0 0 4px ' + b + ';}</style>')
  })
}

function cp_slidein_social_responsive() {
  var a = jQuery(window).width();
  jQuery('.cp-slidein-body').find('.cp_social_networks').each(function () {
    if (!jQuery(this).parents('.cp-slidein-body').hasClass('cp-floating-social-bar')) {
      var b = jQuery(this).data('column-no'), c = '';
      a < 768 ? (jQuery(this).removeClass('cp_social_networks'), jQuery(this).removeClass(b), c = jQuery(this).attr('class'), jQuery(this).attr('class', 'cp_social_networks cp_social_autowidth  ' + c)) : (jQuery(this).removeClass('cp_social_networks'), jQuery(this).removeClass('cp_social_autowidth'), jQuery(this).removeClass(b), c = jQuery(this).attr('class'), jQuery(this).attr('class', 'cp_social_networks  ' + b + ' ' + c))
    }
  })
}

function toggle_widget_call(a, b) {
  a.preventDefault(), b.toggleClass('cp-widget-open'), toggle_widget(b, 600), a.stopPropagation()
}

function toggle_widget(a, b) {
  var c = a.parents('.si-open'), d = c.find('.cp-slidein'),
    e = d.find('.cp-slidein-content').css('border-bottom-width');
  if (a.hasClass('cp-widget-open')) d.animate({ bottom: 0 }, b); else {
    if (d.hasClass('cp-slidein-exceed')) var f = d.height(); else var f = c.find('.cp-slidein-body').outerHeight();
    var g = c.find('.cp-slidein-head').outerHeight(), h = f - g + 2;
    void 0 !== e && '' !== e && (e = e.replace('-', 'px'), e = parseInt(e), d.hasClass('cp-slidein-exceed') ? h -= e : h = e + h), d.animate({ bottom: '-' + h + 'px' }, b), setTimeout(function () {
      d.parents('.slidein-overlay').removeClass('cp-hide-slide-widget')
    }, b)
  }
}

function set_optin_widget_bottom() {
  setTimeout(function () {
    jQuery('.cp-slidein-popup-container').each(function () {
      if (jQuery(this).find('.cp-slidein-toggle').length > 0) {
        var a = jQuery(this).find('.cp-slidein');
        if (jQuery(this).find('.cp-slidein-toggle').hasClass('cp-widget-open')) a.animate({ bottom: 0 }, 600); else {
          if (a.hasClass('cp-slidein-exceed')) var b = a.height(); else var b = jQuery(this).find('.cp-slidein-body').outerHeight();
          var c = jQuery(this).find('.cp-slidein-head').outerHeight(), d = b - c + 2,
            e = a.find('.cp-slidein-content').css('border-bottom-width');
          void 0 !== e && '' !== e && (e = e.replace('-', 'px'), e = parseInt(e), a.hasClass('cp-slidein-exceed') ? d -= e : d = e + d), a.animate({ bottom: '-' + d + 'px' }, 600)
        }
      }
    })
  }, 600)
}

function apply_resize_on_textarea() {
  jQuery('.slidein-overlay').each(function () {
    jQuery(this).find('.cp-textarea').each(function () {
      jQuery(this).mouseup(function () {
        CP_slide_in_height()
      })
    })
  })
}

function hide_sidebar() {
  jQuery('.slidein-overlay').each(function () {
    var a = jQuery(this).find('.cp-slidein');
    jQuery(this).find('.cp_social_networks').hasClass('cp-icon-style-top') && a.append('<span class="cp_social_hide_sidebar cp_social_icon">+</span>')
  })
}

function cp_slide_in_column_equilize() {
  setTimeout(function () {
    jQuery('.cp-columns-equalized').each(function () {
      if (jQuery(this).closest('.slidein-overlay').hasClass('si-open') || jQuery(this).closest('.slidein-overlay').hasClass('cp-slidein-inline')) {
        var a = jQuery(window).width(), b = Array();
        jQuery(this).children('.cp-column-equalized-center').each(function () {
          var a = jQuery(this).outerHeight();
          b.push(a)
        });
        var c = 0;
        jQuery(this).find('.cp-image-container').length > 0 && jQuery(this).find('.cp-highlight').each(function (a, b) {
          c++
        });
        var d = parseInt(jQuery(this).css('padding-top')), e = parseInt(jQuery(this).css('padding-top')), f = d + e,
          g = Math.max.apply(Math, b) + f;
        g -= c, a > 768 ? jQuery(this).css('height', g) : jQuery(this).css('height', 'auto')
      }
    })
  }, 200)
}

!function (a) {
  function b(a, b) {
    a.hasClass('cp-description') || a.hasClass('cp-short-description') || a.hasClass('cp-info-container') ? a.fitText(1.7, {
      minFontSize: '12px',
      maxFontSize: b
    }) : a.fitText(1.2, { minFontSize: '16px', maxFontSize: b })
  }

  function c() {
    jQuery('.cp_responsive').each(function (a, c) {
      var d = '', e = jQuery(window).width(), f = jQuery(c), g = f.css('font-size'), h = f.attr('data-font-size'),
        i = f.attr('data-font-size-init'), j = f.attr('data-line-height'), k = f.attr('data-line-height-init');
      h ? g = h : i && (g = i), j ? d = j : k && (d = k), e <= 800 ? (f.css({
        display: 'block',
        'line-height': '1.15em'
      }), b(f, g)) : (f.css({
        display: '',
        'line-height': d
      }), check_responsive_font_sizes(), f.fitText(1.2, { minFontSize: g, maxFontSize: g }))
    })
  }

  function d() {
    jQuery('.slidein-overlay').each(function () {
      var a = jQuery(window).innerWidth(),
        b = (jQuery(this).data('image-position'), jQuery(this).data('hide-img-on-mobile'));
      b && (a <= b ? jQuery(this).find('.cp-image-container').addClass('cp-hide-image') : jQuery(this).find('.cp-image-container').removeClass('cp-hide-image'))
    })
  }

  !function (a) {
    a.fn.fitText = function (b, c) {
      var d = b || 1, e = a.extend({ minFontSize: Number.NEGATIVE_INFINITY, maxFontSize: Number.POSITIVE_INFINITY }, c);
      return this.each(function () {
        var b = a(this), c = function () {
          b.css('font-size', Math.max(Math.min(b.width() / (10 * d), parseFloat(e.maxFontSize)), parseFloat(e.minFontSize)))
        };
        c(), a(window).on('resize.fittext orientationchange.fittext', c)
      })
    }
  }(jQuery), jQuery(document).ready(function () {
    if (setTimeout(function () {
        CPResponsiveTypoInit(), cp_color_for_list_tag()
      }, 1500), d(), apply_boxshaddow(), apply_resize_on_textarea(), jQuery('.slidein-overlay').length > 0) {
      var a = 0;
      jQuery('.slidein-overlay').each(function (b, c) {
        if (!jQuery(this).find('.cp-slidein-content').hasClass('ps-container')) {
          if (!jQuery(this).find('.cp-slidein-content').hasClass('si-open')) {
            a++;
            var d = jQuery(this).find('.cp-slidein-content').attr('id');
            jQuery(this).find('.cp-slidein-content').attr('id', d + '-' + a)
          }
          var e = jQuery(this).find('.cp-slidein-content').attr('id');
          'undefined' != typeof Ps && Ps.initialize(document.getElementById(e))
        }
      })
    }
    setTimeout(function () {
      hide_sidebar()
    }, 500), cp_slidein_social_responsive(), cp_slide_in_column_equilize()
  }), jQuery(window).resize(function () {
    c(), d(), CP_slide_in_height(), cp_slidein_social_responsive(), cp_slide_in_column_equilize()
  })
}(jQuery), check_responsive_font_sizes(), jQuery('body').on('click', '.cp-slidein-head .cp-slidein-toggle', function (a) {
  toggle_widget_call(a, jQuery(this))
}), jQuery('body').on('click', '.cp-minimize-onhead', function (a) {
  toggle_widget_call(a, jQuery(this).find('.cp-slidein-toggle'))
}), jQuery(this).on('smile_data_received', function (a, b) {
  1 == (b.minimize_widget || null) && (jQuery('.cp-slidein-head .cp-slidein-toggle'), jQuery('.cp-slidein-toggle').removeClass('cp-widget-open'));
  set_optin_widget_bottom(), cp_slide_in_column_equilize()
}), jQuery('body').on('click', '.cp_social_hide_sidebar', function (a) {
  a.preventDefault();
  var b = jQuery(this), c = jQuery(this).closest('.cp-slidein'), d = c.find('.cp-animate-container'),
    e = (c.find('.cp_social_icons_container'), d.data('overlay-animation')), f = d.data('exit-animation');
  slidein_position = c.attr('class').split(' ')[1];
  var g = c.css('max-width');
  switch (jQuery(this).toggleClass('cp_hidden_sidebar'), slidein_position) {
    case'slidein-center-right':
      e = 'smile-slideInRight', f = 'smile-slideOutRight';
      break;
    case'slidein-center-left':
      e = 'smile-slideInLeft', f = 'smile-slideOutLeft'
  }
  d.attr('class', 'cp-animate-container'), jQuery(this).hasClass('cp_hidden_sidebar') ? d.attr('class', 'cp-animate-container smile-animated ' + f) : d.attr('class', 'cp-animate-container smile-animated ' + e), c.css('left', ''), b.css('left', ''), c.css('right', ''), b.css('right', ''), setTimeout(function () {
    b.hasClass('cp_hidden_sidebar') && ('slidein-center-left' == slidein_position ? (c.css('left', '-' + g), b.css('left', '+' + g)) : 'slidein-center-right' == slidein_position && (c.css('right', '-' + g), b.css('right', '+' + g)))
  }, 600)
}), function (a) {
  'use strict';

  function b() {
    jQuery('.cp-toggle-container').click(function () {
      var b = jQuery(this).closest('.slidein-overlay'),
        c = (b.data('slidein-id'), b.closest('.cp-slidein-popup-container').siblings('.overlay-show').data('toggle-visible'));
      if (!b.hasClass('cp-slide-without-toggle')) {
        b.removeClass('cp-hide-contianer'), jQuery(this).toggleClass('cp-slide-hide-btn');
        var d = b.find('.cp-animate-container'), e = d.data('overlay-animation'),
          f = (d.data('exit-animation'), jQuery('.cp-toggle-container')), g = d.data('disable-animationwidth'),
          h = jQuery(window).width(), i = '', j = b.find('.cp-tooltip-icon').data('classes'),
          k = b.data('impression-added');
        if (1 == c && void 0 === k && !b.hasClass('cp-disabled-impression')) {
          b.data('impression-added', 'true')
        }
        (h >= g || void 0 === g) && (i = 'smile-animated ');
        void 0 !== b.find('.has-tip').attr('class') && jQuery('head').append('<style class="cp-tooltip-hide">.tip.' + j + '{display:block }</style>'), d.attr('class', 'cp-animate-container cp-hide-slide'), setTimeout(function () {
          d.attr('class', 'cp-animate-container ' + i + ' ' + e), f.addClass('cp-slide-hide-btn')
        }, 10), cp_slide_in_column_equilize(), a(window).trigger('resize')
      }
    }), jQuery('.slidein-overlay-close').click(function () {
      if (!jQuery(this).hasClass('do_not_close')) {
        var a = (jQuery(this).parents('.cp-slidein-popup-container'), jQuery(this).parents('.slidein-overlay')),
          b = a.find('.cp-tooltip-icon').data('classes');
        jQuery(document).trigger('closeSlideIn', [a]), jQuery('head').append('<style class="cp-tooltip-hide">.tip.' + b + '{ display:none; }</style>')
      }
      var c = jQuery(this).closest('.slidein-overlay');
      if (!c.hasClass('cp-slide-without-toggle')) {
        var c = jQuery(this).parents('.slidein-overlay'), d = c.find('.cp-animate-container'),
          e = d.data('exit-animation'), f = jQuery('.cp-toggle-container'), g = d.data('disable-animationwidth'),
          h = jQuery(window).width(), i = '', j = c.find('.cp-form').attr('class');
        (h >= g || void 0 === g) && (i = 'smile-animated '), c.addClass('cp-hide-contianer'), d.attr('class', 'cp-animate-container'), d.attr('class', 'cp-animate-container ' + i + ' ' + e), void 0 !== j && (c.find('#smile-optin-form')[0].reset(), c.find('.cp-form-processing-wrap').css('display', 'none'), c.find('.cp-form-processing').removeAttr('style'), c.find('.cp-msg-on-submit').removeAttr('style'), c.find('.cp-msg-on-submit').html(), c.find('.cp-m-success').remove()), setTimeout(function () {
          d.addClass('cp-hide-slide'), f.removeClass('cp-slide-hide-btn'), d.removeClass(e)
        }, 500)
      }
    })
  }

  function c() {
    jQuery('.slidein-overlay').each(function () {
      var a = jQuery(this), b = a.data('placeholder-color'), c = a.data('placeholder-font'), d = a.data('class'), e = b,
        f = '.' + d + ' input { font-family: ' + c + ' } .' + d + ' ::-webkit-input-placeholder {color: ' + e + '!important; font-family: ' + c + '; } .' + d + ' :-moz-placeholder {color: ' + e + '!important; font-family: ' + c + ';} .' + d + ' ::-moz-placeholder {color: ' + e + '!important; font-family: ' + c + '; }';
      jQuery('<style id=' + d + ' type=\'text/css\'>' + f + '</style>').appendTo('head')
    }), jQuery('.cp-slidein-inline').each(function () {
      var a = jQuery(this).data('placeholder-color'), b = jQuery(this).data('placeholder-font'),
        c = jQuery(this).data('slidein-id'), d = a,
        e = '.' + c + ' input { font-family: ' + b + ' } .' + c + ' ::-webkit-input-placeholder {color: ' + d + '!important; font-family: ' + b + '; } .' + c + ' :-moz-placeholder {color: ' + d + '!important; font-family: ' + b + ';} .' + c + ' ::-moz-placeholder {color: ' + d + '!important; font-family: ' + b + '; }';
      jQuery('<style id=' + c + ' type=\'text/css\'>' + e + '</style>').appendTo('head')
    })
  }

  jQuery(document).on('smile_data_received', function (a, b) {
    CPResponsiveTypoInit()
  }), a('.slidein-overlay').each(function () {
    var b = a(this).data('slidein-style');
    if (void 0 !== b && '' !== b) {
      var c = a(this).parents('.cp-slidein-popup-container.' + b);
      a(this).hasClass('cp-slidein-inline') || c.appendTo(document.body)
    }
  });
  var d = 0;
  jQuery(window).on('slideinOpen', function (b, c) {
    d++, jQuery('html').addClass('cp-si-open');
    var e = c.data('close-btnonload-delay'), e = Math.round(1e3 * e);
    e && setTimeout(function () {
      c.find('.slidein-overlay-close').removeClass('cp-hide-close')
    }, e), CP_slide_in_height();
    var f = c.find('.cp-animate-container'), g = f.data('overlay-animation'), h = f.data('disable-animationwidth');
    c.find('.cp-slidein-content');
    (jQuery(window).width() >= h || void 0 === h) && jQuery(f).addClass('smile-animated ' + g), c.find('.cp-slidein-toggle').length > 0 && setTimeout(function () {
      c.find('.cp-animate-container').css('height', 'auto'), c.find('.cp-animate-container').animate({ opacity: '1' }, '1000')
    }, '400');
    var i = c.data('close-after');
    jQuery.idleTimer('destroy'), void 0 !== i && (i *= 1e3, setTimeout(function () {
      c.addClass('cp-close-after-x')
    }, i), jQuery(document).idleTimer({
      timeout: i,
      idle: !1
    })), jQuery('.kleo-carousel-features-pager').length > 0 && setTimeout(function () {
      a(window).trigger('resize')
    }, 1500);
    c.find('.cp-slidein-toggle').data('visible');
    c.hasClass('cp-minimize-widget') ? (c.addClass('cp-hide-slide-widget'), setTimeout(function () {
      toggle_widget(jQuery('.cp-slidein-head .cp-slidein-toggle'), 500)
    }, 0)) : c.find('.cp-slidein-toggle').addClass('cp-widget-open')
  }), jQuery(document).on('click', '.cp-close', function (a) {
    if (!jQuery(this).parents('.slidein-overlay').hasClass('do_not_close')) {
      var b = jQuery(this).parents('.slidein-overlay');
      jQuery(document).trigger('closeSlideIn', [b])
    }
  }), jQuery(document).on('click', '.cp-inner-close', function (a) {
    var b = jQuery(this).parents('.slidein-overlay');
    jQuery(document).trigger('closeSlideIn', [b])
  }), jQuery(document).on('click', '.slidein-overlay', function (a) {
    if (!jQuery(this).hasClass('do_not_close') && jQuery(this).hasClass('close_btn_nd_overlay')) {
      var b = jQuery(this);
      jQuery(document).trigger('closeSlideIn', [b])
    }
  }), jQuery(document).on('idle.idleTimer', function (a, b, c) {
    if (jQuery(this).find('.slidein-overlay').hasClass('cp-close-after-x')) {
      var d = jQuery(this).find('.slidein-overlay');
      jQuery(document).trigger('closeSlideIn', [d])
    }
  }), jQuery(document).on('click', '.slidein-overlay .cp-slidein', function (a) {
    a.stopPropagation()
  }), jQuery(document).on('si_conversion_done', function (a, b) {
    if (!jQuery(b).parents('.cp-form-container').find('.cp-email').length > 0) {
      jQuery(b).parents('.cp-form-container').find('[name="only_conversion"]').length > 0 && jQuery(b).addClass('cp-disabled')
    }
  }), jQuery(document).ready(function () {
    jQuery(document).bind('keydown', function (a) {
      if (27 == a.which) {
        var b = jQuery('.si-open'), c = b;
        b.hasClass('close_btn_nd_overlay') && !b.hasClass('do_not_close') && jQuery(document).trigger('closeSlideIn', [c])
      }
    }), CPResponsiveTypoInit(), b(), c()
  })
}(jQuery), function (a) {
  'use strict';

  function b(a) {
    return new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i).test(a)
  }

  function c(a, c) {
    return !c.trim() || (a.hasClass('cp-email') ? !b(c) : !!a.hasClass('cp-textfeild') && 0 == /^[a-zA-Z0-9- ]*$/.test(c))
  }

  function d(d) {
    var g = jQuery(d), h = g.serialize(), i = jQuery(d).parents('.cp-animate-container').find('.cp-msg-on-submit'),
      j = (jQuery(d).parents('.cp-slidein-body').find('.cp-form-container'), jQuery(d).parents('.cp-animate-container').find('.cp-form-processing')),
      k = jQuery(d).parents('.global_slidein_container'),
      l = jQuery(d).parents('.cp-animate-container').find('.cp-form-processing-wrap'),
      m = jQuery(d).parents('.cp-animate-container'), n = k.find('.cp-tooltip-icon').data('classes'),
      o = k.data('conversion-cookie-time'), p = jQuery(d).parents('.global_slidein_container').hasClass('do_not_close'),
      q = jQuery(d).parents('.global_slidein_container').data('redirect-lead-data'),
      r = jQuery(d).parents('.global_slidein_container').data('redirect-to'),
      s = jQuery(d).parents('.global_slidein_container').data('form-action'),
      t = jQuery(d).parents('.global_slidein_container').data('form-action-time'), t = parseInt(1e3 * t),
      u = jQuery(d).parents('.global_slidein_container').find('.cp-slidein-body').hasClass('cp-optin-widget'),
      v = jQuery(d).find('.btn-subscribe').attr('data-redirect-link') || '',
      w = jQuery(d).find('.btn-subscribe').attr('data-redirect-link-target') || '_blank', x = k.data('parent-style');
    if (void 0 !== x) var y = x; else var y = k.data('slidein-id');
    var z = '', A = !0, B = '';
    g.find('.cp-input').each(function (a) {
      var b = jQuery(this);
      if (!b.hasClass('cp-submit-button')) {
        var d = b.attr('name'), e = b.val(), f = d.replace(/param/gi, function (a) {
          return ''
        });
        f = f.replace('[', ''), f = f.replace(']', ''), z += 0 != a ? '&' : '', z += f + '=' + e;
        !!b.attr('required') && (c(b, e) ? (A = !1, b.addClass('cp-input-error')) : b.removeClass('cp-input-error'))
      }
    });
    var C = 0, D = '';
    g.find('select, textarea, input').each(function (c, d) {
      if (jQuery(d).prop('required')) {
        if ('checkbox' == jQuery(d).attr('type') && 0 == a(this).prop('checked')) C++, setTimeout(function () {
          jQuery(d).addClass('cp-error')
        }, 100), f = jQuery(d).attr('name'), D += f + ' is required \n'; else if (jQuery(d).val()) if (jQuery(d).hasClass('cp-email')) {
          var e = jQuery(d).val();
          if (b(e)) jQuery(d).removeClass('cp-error'); else {
            setTimeout(function () {
              jQuery(d).addClass('cp-error')
            }, 100), C++;
            var f = jQuery(d).attr('name') || '';
            console.log(f + ' is required \n')
          }
        } else jQuery(d).removeClass('cp-error'); else C++, setTimeout(function () {
          jQuery(d).addClass('cp-error')
        }, 100), f = jQuery(d).attr('name'), D += f + ' is required \n'
      }
    }), C > 0 ? console.log(D) : (l.show(), i.fadeOut(120, function () {
      jQuery(this).show().css({ visibility: 'hidden' })
    }), j.hide().css({ visibility: 'visible' }).fadeIn(100), jQuery.ajax({
      url: smile_ajax.url,
      data: h,
      type: 'POST',
      dataType: 'HTML',
      success: function (a) {
        o && (k.find('.cp-slidein-toggle').length > 0 ? f(y + '-conversion', !0, o) : f(y, !0, o));
        var b = jQuery.parseJSON(a), c = '', d = '';
        void 0 !== b.status && null != b.status && (c = b.status), b.email_status ? g.find('.cp-email').removeClass('cp-error') : (setTimeout(function () {
          g.find('.cp-email').addClass('cp-error')
        }, 100), g.find('.cp-email').focus());
        var h = void 0 !== b.detailed_msg && null !== b.detailed_msg ? b.detailed_msg : '';
        if (console.log(h), '' !== h && null !== h && (h = '<h5>Here is More Information:</h5><div class=\'cp-detailed-message\'>' + h + '</div>', h += '<div class=\'cp-admin-error-notice\'>Read How to Fix This, click <a rel=\'noopener\' target=\'_blank\' href=\'https://www.convertplug.com/plus/docs/something-went-wrong/\'>here</a></div>', h += '<div class=\'cp-go-back\'>Go Back</div>', d += '<div class="cp-only-admin-msg">[Only you can see this message]</div>'), b.message = b.message.replace(/\\/g, ''), void 0 !== b.message && null != b.message && (i.hide().css({ visibility: 'visible' }).fadeIn(120), d += '<div class="cp-m-' + c + '"><div class="cp-error-msg">' + b.message + '</div>' + h + '</div>', i.html(d), m.addClass('cp-form-submit-' + c)), void 0 !== b.action && null != b.action && (j.fadeOut(100, function () {
            jQuery(this).show().css({ visibility: 'hidden' })
          }), i.hide().css({ visibility: 'visible' }).fadeIn(120), 'success' === c)) {
          if (jQuery('head').append('<style class="cp-tooltip-css">.tip.' + n + '{display:none }</style>'), 'redirect' === b.action) {
            l.hide(), k.hide();
            var x = b.url, A = '';
            A = x.indexOf('?') > -1 ? '&' : '?';
            var C = x + A + decodeURI(z);
            if (C = 1 == q ? C : b.url, 'download' !== r) {
              B = r;
              '' == window.open(C, '_' + B) && (document.location.href = C)
            } else e(C)
          } else l.show(), 'disappear' == s ? (k.removeClass('cp-hide-inline-style'), k.removeClass('cp-close-slidein'), setTimeout(function () {
            k.hasClass('cp-slidein-inline') && k.addClass('cp-hide-inline-style'), (k.find('.cp-toggle-container').length >= 1 || 1 == u) && k.addClass('cp-close-slidein'), jQuery(document).trigger('closeSlideIn', [k])
          }, t)) : 'reappear' == s && setTimeout(function () {
            i.empty(), l.css({ display: 'none' }), i.removeAttr('style'), j.removeAttr('style'), g.trigger('reset')
          }, t);
          p && !k.hasClass('cp-do-not-close-inline') && setTimeout(function () {
            k.addClass('cp-hide-inline-style'), jQuery(document).trigger('closeSlideIn', [k])
          }, 3e3)
        }
        'undefined' != v && '' != v && (navigator.userAgent.toLowerCase().match(/(ipad|iphone)/) ? document.location = v : window.open(v, w))
      },
      error: function (a) {
        l.hide(), j.fadeOut(100, function () {
          jQuery(this).show().css({ visibility: 'hidden' })
        })
      }
    }))
  }

  function e(a, b) {
    if (window.ActiveXObject) {
      if (window.ActiveXObject && document.execCommand) {
        var c = window.open(a, '_blank');
        c.document.close(), c.document.execCommand('SaveAs', !0, b || a), c.close()
      }
    } else {
      var d = document.createElement('a');
      d.href = a, d.target = '_blank';
      var e = a.substring(a.lastIndexOf('/') + 1);
      if (d.download = b || e, navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search('Chrome') < 0) document.location = d.href; else {
        var f = new MouseEvent('click', { view: window, bubbles: !0, cancelable: !1 });
        d.dispatchEvent(f), (window.URL || window.webkitURL).revokeObjectURL(d.href)
      }
    }
  }

  var f = function (a, b, c) {
    if (c) {
      var d = new Date;
      d.setTime(d.getTime() + 24 * c * 60 * 60 * 1e3);
      var e = '; expires=' + d.toGMTString()
    } else var e = '';
    document.cookie = a + '=' + b + e + '; path=/'
  };
  jQuery(document).ready(function () {
    jQuery('.cp-slidein-popup-container').find('#smile-optin-form').each(function (a, b) {
      jQuery(b).find('input').keypress(function (a) {
        if (13 == a.which) {
          a.preventDefault();
          var c = jQuery(this).parents('.cp-animate-container').hasClass('cp-form-submit-success');
          jQuery(this).parents('.cp-animate-container').hasClass('cp-form-submit-error');
          c || d(b)
        }
      }), jQuery(b).find('.btn-subscribe').click(function (a) {
        a.preventDefault, jQuery(b).find('.cp-input').removeClass('cp-error'), jQuery(this).hasClass('cp-disabled') || (d(b), jQuery(document).trigger('si_conversion_done', [this])), a.preventDefault()
      }), jQuery(b).find('.btn-subscribe').keypress(function (a) {
        if (13 == a.which) {
          a.preventDefault();
          var c = jQuery(this).parents('.cp-animate-container').hasClass('cp-form-submit-success');
          jQuery(this).parents('.cp-animate-container').hasClass('cp-form-submit-error');
          c || d(b)
        }
      })
    })
  })
}(jQuery);
