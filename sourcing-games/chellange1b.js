!function (n, r) {
  function e(n) {
    return !!('' === n || n && n.charCodeAt && n.substr)
  }

  function t(n) {
    return p ? p(n) : '[object Array]' === l.call(n)
  }

  function o(n) {
    return n && '[object Object]' === l.call(n)
  }

  function a(n, r) {
    var e;
    n = n || {}, r = r || {};
    for (e in r) r.hasOwnProperty(e) && null == n[e] && (n[e] = r[e]);
    return n
  }

  function i(n, r, e) {
    var t, o, a = [];
    if (!n) return a;
    if (f && n.map === f) return n.map(r, e);
    for (t = 0, o = n.length; t < o; t++) a[t] = r.call(e, n[t], t, n);
    return a
  }

  function u(n, r) {
    return n = Math.round(Math.abs(n)), isNaN(n) ? r : n
  }

  function c(n) {
    var r = s.settings.currency.format;
    return 'function' == typeof n && (n = n()), e(n) && n.match('%v') ? {
      pos: n,
      neg: n.replace('-', '').replace('%v', '-%v'),
      zero: n
    } : n && n.pos && n.pos.match('%v') ? n : e(r) ? s.settings.currency.format = {
      pos: r,
      neg: r.replace('%v', '-%v'),
      zero: r
    } : r
  }

  var s = {};
  s.version = '0.4.1', s.settings = {
    currency: {
      symbol: '$',
      format: '%s%v',
      decimal: '.',
      thousand: ',',
      precision: 2,
      grouping: 3
    }, number: { precision: 0, grouping: 3, thousand: ',', decimal: '.' }
  };
  var f = Array.prototype.map, p = Array.isArray, l = Object.prototype.toString,
    m = s.unformat = s.parse = function (n, r) {
      if (t(n)) return i(n, function (n) {
        return m(n, r)
      });
      if (n = n || 0, 'number' == typeof n) return n;
      r = r || s.settings.number.decimal;
      var e = new RegExp('[^0-9-' + r + ']', ['g']),
        o = parseFloat(('' + n).replace(/\((.*)\)/, '-$1').replace(e, '').replace(r, '.'));
      return isNaN(o) ? 0 : o
    }, d = s.toFixed = function (n, r) {
      r = u(r, s.settings.number.precision);
      var e = Math.pow(10, r);
      return (Math.round(s.unformat(n) * e) / e).toFixed(r)
    }, g = s.formatNumber = s.format = function (n, r, e, c) {
      if (t(n)) return i(n, function (n) {
        return g(n, r, e, c)
      });
      n = m(n);
      var f = a(o(r) ? r : { precision: r, thousand: e, decimal: c }, s.settings.number), p = u(f.precision),
        l = n < 0 ? '-' : '', h = parseInt(d(Math.abs(n || 0), p), 10) + '', y = h.length > 3 ? h.length % 3 : 0;
      return l + (y ? h.substr(0, y) + f.thousand : '') + h.substr(y).replace(/(\d{3})(?=\d)/g, '$1' + f.thousand) + (p ? f.decimal + d(Math.abs(n), p).split('.')[1] : '')
    }, h = s.formatMoney = function (n, r, e, f, p, l) {
      if (t(n)) return i(n, function (n) {
        return h(n, r, e, f, p, l)
      });
      n = m(n);
      var d = a(o(r) ? r : { symbol: r, precision: e, thousand: f, decimal: p, format: l }, s.settings.currency),
        y = c(d.format), b = n > 0 ? y.pos : n < 0 ? y.neg : y.zero;
      return b.replace('%s', d.symbol).replace('%v', g(Math.abs(n), u(d.precision), d.thousand, d.decimal))
    };
  s.formatColumn = function (n, r, f, p, l, d) {
    if (!n) return [];
    var h = a(o(r) ? r : { symbol: r, precision: f, thousand: p, decimal: l, format: d }, s.settings.currency),
      y = c(h.format), b = y.pos.indexOf('%s') < y.pos.indexOf('%v'), v = 0, x = i(n, function (n, r) {
        if (t(n)) return s.formatColumn(n, h);
        n = m(n);
        var e = n > 0 ? y.pos : n < 0 ? y.neg : y.zero,
          o = e.replace('%s', h.symbol).replace('%v', g(Math.abs(n), u(h.precision), h.thousand, h.decimal));
        return o.length > v && (v = o.length), o
      });
    return i(x, function (n, r) {
      return e(n) && n.length < v ? b ? n.replace(h.symbol, h.symbol + new Array(v - n.length + 1).join(' ')) : new Array(v - n.length + 1).join(' ') + n : n
    })
  }, 'undefined' != typeof exports ? ('undefined' != typeof module && module.exports && (exports = module.exports = s), exports.accounting = s) : 'function' == typeof define && define.amd ? define([], function () {
    return s
  }) : (s.noConflict = function (e) {
    return function () {
      return n.accounting = e, s.noConflict = r, s
    }
  }(n.accounting), n.accounting = s)
}(this);
!function (t, e, i) {
  'use strict';
  var s = function (t, i) {
    this.el = this.isString(t) ? e.querySelectorAll(t) : t, NodeList.prototype.isPrototypeOf(this.el) && (this.config = [], this.options = i, this.selectors = [], this.init(), this.destroy = function () {
      this.loop(function (t) {
        t.removeEventListener('reset', this.events.reset), this.removeClasses(t)
      }, function (t) {
        this.reset(t)
      })
    }, this.rebuild = function () {
      this.loop(null, function (t) {
        this.floatLabel(t, !0)
      })
    })
  };
  s.prototype = {
    defaults: {
      customEvent: null,
      customLabel: null,
      customPlaceholder: null,
      exclude: '.no-label',
      inputRegex: /email|number|password|search|tel|text|url/,
      prefix: 'fl-',
      prioritize: 'label',
      requiredClass: 'required',
      style: 0,
      transform: 'input,select,textarea'
    }, init: function () {
      this.initEvents(), this.loop(function (t, e) {
        var i = this.config[e].style;
        t.addEventListener('reset', this.events.reset), t.classList.add(this.prefixed('form')), i && t.classList.add(this.prefixed('style-' + i))
      }, function (t) {
        this.floatLabel(t)
      })
    }, initEvents: function () {
      this.events = {
        blur: this.onBlur.bind(this),
        change: this.onInput.bind(this),
        focus: this.onFocus.bind(this),
        input: this.onInput.bind(this),
        reset: this.onReset.bind(this)
      }
    }, build: function (t) {
      var e = this.getLabel(t);
      e && (t.classList.add(this.prefixed(t.tagName.toLowerCase())), this.setLabel(e, t), this.setPlaceholder(e, t), this.wrapLabel(e, t), this.handleEvents(t, 'add'), 'function' == typeof this.config[this.current].customEvent && this.config[this.current].customEvent.call(this, t))
    }, createEl: function (t, i) {
      var s = 'string' == typeof t ? e.createElement(t) : t;
      i = i || {};
      for (var r in i) i.hasOwnProperty(r) && s.setAttribute(r, i[r]);
      return s
    }, extend: function () {
      var t = [].slice.call(arguments), e = t[0], i = t.slice(1);
      return Object.keys(i).forEach(function (t) {
        for (var s in i[t]) i[t].hasOwnProperty(s) && (e[s] = i[t][s])
      }), e
    }, floatLabel: function (t, e) {
      if (t.getAttribute('id') && ('INPUT' !== t.tagName || this.config[this.current].inputRegex.test(t.getAttribute('type')))) {
        if (this.hasParent(t)) {
          if (e !== !0) return;
          this.reset(t)
        }
        this.build(t)
      }
    }, getLabel: function (t) {
      var e = 'label[for="' + t.getAttribute('id') + '"]', i = this.el[this.current].querySelectorAll(e);
      return i.length > 1 && (i = t.parentNode.querySelectorAll(e)), 1 === i.length && i[0]
    }, getLabelText: function (t, e) {
      var i = t.textContent.replace(/[*:]/g, '').trim(), s = e.getAttribute('placeholder');
      return (!i || i && s && 'placeholder' === this.config[this.current].prioritize) && (i = s), i
    }, handleEvents: function (t, e) {
      var i = this.events;
      ['blur', 'input', 'focus'].forEach(function (s) {
        'file' === t.type && 'input' === s && (s = 'change'), t[e + 'EventListener'](s, i[s])
      })
    }, hasParent: function (t) {
      return t.parentNode.classList.contains(this.prefixed('wrap'))
    }, isString: function (t) {
      return '[object String]' === Object.prototype.toString.call(t)
    }, loop: function (t, e) {
      for (var i = 0; i < this.el.length; ++i) {
        if ('undefined' == typeof this.selectors[i]) {
          var s = this.extend({}, this.defaults, this.options, this.el[i].getAttribute('data-options')),
            r = ':not(' + s.exclude.split(/[\s,]+/).join('):not(') + ')';
          this.selectors[i] = s.transform.replace(/,/g, r + ',') + r, this.config[i] = s
        }
        var n = this.el[i].querySelectorAll(this.selectors[i]);
        this.current = i, 'function' == typeof t && t.call(this, this.el[i], i);
        for (var o = 0; o < n.length; ++o) 'function' == typeof e && e.call(this, n[o], i)
      }
    }, onBlur: function (t) {
      t.target.parentNode.classList.remove(this.prefixed('has-focus'))
    }, onInput: function (t) {
      var e = t.target.value.length ? 'add' : 'remove';
      t.target.parentNode.classList[e](this.prefixed('is-active'))
    }, onFocus: function (t) {
      t.target.parentNode.classList.add(this.prefixed('has-focus'))
    }, onReset: function () {
      for (var t = this.el[this.current].querySelectorAll(this.selectors[this.current]), e = 0; e < t.length; ++e) t[e].parentNode.classList.remove(this.prefixed('is-active'))
    }, prefixed: function (t) {
      return this.config[this.current].prefix + t
    }, removeClasses: function (t) {
      var e = this.config[this.current].prefix, i = t.className.split(' ').filter(function (t) {
        return 0 !== t.lastIndexOf(e, 0)
      });
      t.className = i.join(' ').trim()
    }, reset: function (t) {
      var i = t.parentNode;
      if (this.hasParent(t)) {
        for (var s = e.createDocumentFragment(); i.firstElementChild;) {
          var r = i.firstElementChild;
          this.removeClasses(r), s.appendChild(r)
        }
        i.parentNode.replaceChild(s, i), this.resetPlaceholder(t), this.handleEvents(t, 'remove')
      }
    }, resetPlaceholder: function (t) {
      var e = 'data-placeholder', i = t.getAttribute(e);
      null !== i && (t.removeAttribute(e), t.setAttribute('placeholder', i))
    }, setLabel: function (t, e) {
      t.classList.add(this.prefixed('label')), t.textContent = this.getLabelText(t, e), 'function' == typeof this.config[this.current].customLabel && (t.textContent = this.config[this.current].customLabel.call(this, t, e))
    }, setPlaceholder: function (t, e) {
      var i = e.getAttribute('placeholder');
      'label' !== this.config[this.current].prioritize && i || (i && e.setAttribute('data-placeholder', i), i = this.getLabelText(t, e)), 'function' == typeof this.config[this.current].customPlaceholder && (i = this.config[this.current].customPlaceholder.call(this, i, e, t)), 'SELECT' === e.tagName ? this.setSelectPlaceholder(e, i) : e.setAttribute('placeholder', i)
    }, setSelectPlaceholder: function (t, e) {
      var i = t.firstElementChild;
      i.hasAttribute('value') && i.value ? t.insertBefore(new Option(e, '', (!0), (!0)), i) : i.setAttribute('value', ''), '' === i.textContent && (i.textContent = e)
    }, wrapLabel: function (t, e) {
      var i = this.createEl('div', { 'class': this.prefixed('wrap') + ' ' + this.prefixed('wrap-' + e.tagName.toLowerCase()) });
      e.hasAttribute('value') && e.value.length && i.classList.add(this.prefixed('is-active')), (null !== e.getAttribute('required') || e.classList.contains(this.config[this.current].requiredClass)) && i.classList.add(this.prefixed('is-required')), e.parentNode.insertBefore(i, e), i.appendChild(t), i.appendChild(e)
    }
  }, t.FloatLabels = s
}(window, document);
!function () {
  'use strict';

  function e(e) {
    function t(t, n) {
      var s, h, k = t == window, y = n && void 0 !== n.message ? n.message : void 0;
      if (n = e.extend({}, e.blockUI.defaults, n || {}), !n.ignoreIfBlocked || !e(t).data('blockUI.isBlocked')) {
        if (n.overlayCSS = e.extend({}, e.blockUI.defaults.overlayCSS, n.overlayCSS || {}), s = e.extend({}, e.blockUI.defaults.css, n.css || {}), n.onOverlayClick && (n.overlayCSS.cursor = 'pointer'), h = e.extend({}, e.blockUI.defaults.themedCSS, n.themedCSS || {}), y = void 0 === y ? n.message : y, k && p && o(window, { fadeOut: 0 }), y && 'string' != typeof y && (y.parentNode || y.jquery)) {
          var m = y.jquery ? y[0] : y, v = {};
          e(t).data('blockUI.history', v), v.el = m, v.parent = m.parentNode, v.display = m.style.display, v.position = m.style.position, v.parent && v.parent.removeChild(m)
        }
        e(t).data('blockUI.onUnblock', n.onUnblock);
        var g, I, w, U, x = n.baseZ;
        g = e(r || n.forceIframe ? '<iframe class="blockUI" style="z-index:' + x++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + n.iframeSrc + '"></iframe>' : '<div class="blockUI" style="display:none"></div>'), I = e(n.theme ? '<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + x++ + ';display:none"></div>' : '<div class="blockUI blockOverlay" style="z-index:' + x++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'), n.theme && k ? (U = '<div class="blockUI ' + n.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (x + 10) + ';display:none;position:fixed">', n.title && (U += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (n.title || '&nbsp;') + '</div>'), U += '<div class="ui-widget-content ui-dialog-content"></div>', U += '</div>') : n.theme ? (U = '<div class="blockUI ' + n.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (x + 10) + ';display:none;position:absolute">', n.title && (U += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (n.title || '&nbsp;') + '</div>'), U += '<div class="ui-widget-content ui-dialog-content"></div>', U += '</div>') : U = k ? '<div class="blockUI ' + n.blockMsgClass + ' blockPage" style="z-index:' + (x + 10) + ';display:none;position:fixed"></div>' : '<div class="blockUI ' + n.blockMsgClass + ' blockElement" style="z-index:' + (x + 10) + ';display:none;position:absolute"></div>', w = e(U), y && (n.theme ? (w.css(h), w.addClass('ui-widget-content')) : w.css(s)), n.theme || I.css(n.overlayCSS), I.css('position', k ? 'fixed' : 'absolute'), (r || n.forceIframe) && g.css('opacity', 0);
        var C = [g, I, w], S = e(k ? 'body' : t);
        e.each(C, function () {
          this.appendTo(S)
        }), n.theme && n.draggable && e.fn.draggable && w.draggable({ handle: '.ui-dialog-titlebar', cancel: 'li' });
        var O = f && (!e.support.boxModel || e('object,embed', k ? null : t).length > 0);
        if (u || O) {
          if (k && n.allowBodyStretch && e.support.boxModel && e('html,body').css('height', '100%'), (u || !e.support.boxModel) && !k) var E = d(t, 'borderTopWidth'),
            T = d(t, 'borderLeftWidth'), M = E ? '(0 - ' + E + ')' : 0, B = T ? '(0 - ' + T + ')' : 0;
          e.each(C, function (e, t) {
            var o = t[0].style;
            if (o.position = 'absolute', e < 2) k ? o.setExpression('height', 'Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:' + n.quirksmodeOffsetHack + ') + "px"') : o.setExpression('height', 'this.parentNode.offsetHeight + "px"'), k ? o.setExpression('width', 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : o.setExpression('width', 'this.parentNode.offsetWidth + "px"'), B && o.setExpression('left', B), M && o.setExpression('top', M); else if (n.centerY) k && o.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'), o.marginTop = 0; else if (!n.centerY && k) {
              var i = n.css && n.css.top ? parseInt(n.css.top, 10) : 0,
                s = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + ' + i + ') + "px"';
              o.setExpression('top', s)
            }
          })
        }
        if (y && (n.theme ? w.find('.ui-widget-content').append(y) : w.append(y), (y.jquery || y.nodeType) && e(y).show()), (r || n.forceIframe) && n.showOverlay && g.show(), n.fadeIn) {
          var j = n.onBlock ? n.onBlock : c, H = n.showOverlay && !y ? j : c, z = y ? j : c;
          n.showOverlay && I._fadeIn(n.fadeIn, H), y && w._fadeIn(n.fadeIn, z)
        } else n.showOverlay && I.show(), y && w.show(), n.onBlock && n.onBlock.bind(w)();
        if (i(1, t, n), k ? (p = w[0], b = e(n.focusableElements, p), n.focusInput && setTimeout(l, 20)) : a(w[0], n.centerX, n.centerY), n.timeout) {
          var W = setTimeout(function () {
            k ? e.unblockUI(n) : e(t).unblock(n)
          }, n.timeout);
          e(t).data('blockUI.timeout', W)
        }
      }
    }

    function o(t, o) {
      var s, l = t == window, a = e(t), d = a.data('blockUI.history'), c = a.data('blockUI.timeout');
      c && (clearTimeout(c), a.removeData('blockUI.timeout')), o = e.extend({}, e.blockUI.defaults, o || {}), i(0, t, o), null === o.onUnblock && (o.onUnblock = a.data('blockUI.onUnblock'), a.removeData('blockUI.onUnblock'));
      var r;
      r = l ? e('body').children().filter('.blockUI').add('body > .blockUI') : a.find('>.blockUI'), o.cursorReset && (r.length > 1 && (r[1].style.cursor = o.cursorReset), r.length > 2 && (r[2].style.cursor = o.cursorReset)), l && (p = b = null), o.fadeOut ? (s = r.length, r.stop().fadeOut(o.fadeOut, function () {
        0 === --s && n(r, d, o, t)
      })) : n(r, d, o, t)
    }

    function n(t, o, n, i) {
      var s = e(i);
      if (!s.data('blockUI.isBlocked')) {
        t.each(function (e, t) {
          this.parentNode && this.parentNode.removeChild(this)
        }), o && o.el && (o.el.style.display = o.display, o.el.style.position = o.position, o.el.style.cursor = 'default', o.parent && o.parent.appendChild(o.el), s.removeData('blockUI.history')), s.data('blockUI.static') && s.css('position', 'static'), 'function' == typeof n.onUnblock && n.onUnblock(i, n);
        var l = e(document.body), a = l.width(), d = l[0].style.width;
        l.width(a - 1).width(a), l[0].style.width = d
      }
    }

    function i(t, o, n) {
      var i = o == window, l = e(o);
      if ((t || (!i || p) && (i || l.data('blockUI.isBlocked'))) && (l.data('blockUI.isBlocked', t), i && n.bindEvents && (!t || n.showOverlay))) {
        var a = 'mousedown mouseup keydown keypress keyup touchstart touchend touchmove';
        t ? e(document).bind(a, n, s) : e(document).unbind(a, s)
      }
    }

    function s(t) {
      if ('keydown' === t.type && t.keyCode && 9 == t.keyCode && p && t.data.constrainTabKey) {
        var o = b, n = !t.shiftKey && t.target === o[o.length - 1], i = t.shiftKey && t.target === o[0];
        if (n || i) return setTimeout(function () {
          l(i)
        }, 10), !1
      }
      var s = t.data, a = e(t.target);
      return a.hasClass('blockOverlay') && s.onOverlayClick && s.onOverlayClick(t), a.parents('div.' + s.blockMsgClass).length > 0 || 0 === a.parents().children().filter('div.blockUI').length
    }

    function l(e) {
      if (b) {
        var t = b[e === !0 ? b.length - 1 : 0];
        t && t.focus()
      }
    }

    function a(e, t, o) {
      var n = e.parentNode, i = e.style, s = (n.offsetWidth - e.offsetWidth) / 2 - d(n, 'borderLeftWidth'),
        l = (n.offsetHeight - e.offsetHeight) / 2 - d(n, 'borderTopWidth');
      t && (i.left = s > 0 ? s + 'px' : '0'), o && (i.top = l > 0 ? l + 'px' : '0')
    }

    function d(t, o) {
      return parseInt(e.css(t, o), 10) || 0
    }

    e.fn._fadeIn = e.fn.fadeIn;
    var c = e.noop || function () {
      }, r = /MSIE/.test(navigator.userAgent),
      u = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent),
      f = (document.documentMode || 0, e.isFunction(document.createElement('div').style.setExpression));
    e.blockUI = function (e) {
      t(window, e)
    }, e.unblockUI = function (e) {
      o(window, e)
    }, e.growlUI = function (t, o, n, i) {
      var s = e('<div class="growlUI"></div>');
      t && s.append('<h1>' + t + '</h1>'), o && s.append('<h2>' + o + '</h2>'), void 0 === n && (n = 3e3);
      var l = function (t) {
        t = t || {}, e.blockUI({
          message: s,
          fadeIn: 'undefined' != typeof t.fadeIn ? t.fadeIn : 700,
          fadeOut: 'undefined' != typeof t.fadeOut ? t.fadeOut : 1e3,
          timeout: 'undefined' != typeof t.timeout ? t.timeout : n,
          centerY: !1,
          showOverlay: !1,
          onUnblock: i,
          css: e.blockUI.defaults.growlCSS
        })
      };
      l();
      s.css('opacity');
      s.mouseover(function () {
        l({ fadeIn: 0, timeout: 3e4 });
        var t = e('.blockMsg');
        t.stop(), t.fadeTo(300, 1)
      }).mouseout(function () {
        e('.blockMsg').fadeOut(1e3)
      })
    }, e.fn.block = function (o) {
      if (this[0] === window) return e.blockUI(o), this;
      var n = e.extend({}, e.blockUI.defaults, o || {});
      return this.each(function () {
        var t = e(this);
        n.ignoreIfBlocked && t.data('blockUI.isBlocked') || t.unblock({ fadeOut: 0 })
      }), this.each(function () {
        'static' == e.css(this, 'position') && (this.style.position = 'relative', e(this).data('blockUI.static', !0)), this.style.zoom = 1, t(this, o)
      })
    }, e.fn.unblock = function (t) {
      return this[0] === window ? (e.unblockUI(t), this) : this.each(function () {
        o(this, t)
      })
    }, e.blockUI.version = 2.7, e.blockUI.defaults = {
      message: '<h1>Please wait...</h1>',
      title: null,
      draggable: !0,
      theme: !1,
      css: {
        padding: 0,
        margin: 0,
        width: '30%',
        top: '40%',
        left: '35%',
        textAlign: 'center',
        color: '#000',
        border: '3px solid #aaa',
        backgroundColor: '#fff',
        cursor: 'wait'
      },
      themedCSS: { width: '30%', top: '40%', left: '35%' },
      overlayCSS: { backgroundColor: '#000', opacity: .6, cursor: 'wait' },
      cursorReset: 'default',
      growlCSS: {
        width: '350px',
        top: '10px',
        left: '',
        right: '10px',
        border: 'none',
        padding: '5px',
        opacity: .6,
        cursor: 'default',
        color: '#fff',
        backgroundColor: '#000',
        '-webkit-border-radius': '10px',
        '-moz-border-radius': '10px',
        'border-radius': '10px'
      },
      iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',
      forceIframe: !1,
      baseZ: 1e3,
      centerX: !0,
      centerY: !0,
      allowBodyStretch: !0,
      bindEvents: !0,
      constrainTabKey: !0,
      fadeIn: 200,
      fadeOut: 400,
      timeout: 0,
      showOverlay: !0,
      focusInput: !0,
      focusableElements: ':input:enabled:visible',
      onBlock: null,
      onUnblock: null,
      onOverlayClick: null,
      quirksmodeOffsetHack: 4,
      blockMsgClass: 'blockMsg',
      ignoreIfBlocked: !1
    };
    var p = null, b = []
  }

  'function' == typeof define && define.amd && define.amd.jQuery ? define(['jquery'], e) : e(jQuery)
}();
!function (e) {
  'function' == typeof define && define.amd ? define(['jquery'], e) : e('object' == typeof exports ? require('jquery') : window.jQuery || window.Zepto)
}(function (e) {
  var t, n, i, o, r, a, s = 'Close', l = 'BeforeClose', c = 'AfterClose', d = 'BeforeAppend', u = 'MarkupParse',
    p = 'Open', f = 'Change', m = 'mfp', g = '.' + m, v = 'mfp-ready', h = 'mfp-removing', y = 'mfp-prevent-close',
    C = function () {
    }, w = !!window.jQuery, b = e(window), I = function (e, n) {
      t.ev.on(m + e + g, n)
    }, x = function (t, n, i, o) {
      var r = document.createElement('div');
      return r.className = 'mfp-' + t, i && (r.innerHTML = i), o ? n && n.appendChild(r) : (r = e(r), n && r.appendTo(n)), r
    }, k = function (n, i) {
      t.ev.triggerHandler(m + n, i), t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]))
    }, T = function (n) {
      return n === a && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace('%title%', t.st.tClose)), a = n), t.currTemplate.closeBtn
    }, _ = function () {
      e.magnificPopup.instance || (t = new C, t.init(), e.magnificPopup.instance = t)
    }, P = function () {
      var e = document.createElement('p').style, t = ['ms', 'O', 'Moz', 'Webkit'];
      if (void 0 !== e.transition) return !0;
      for (; t.length;) if (t.pop() + 'Transition' in e) return !0;
      return !1
    };
  C.prototype = {
    constructor: C, init: function () {
      var n = navigator.appVersion;
      t.isLowIE = t.isIE8 = document.all && !document.addEventListener, t.isAndroid = /android/gi.test(n), t.isIOS = /iphone|ipad|ipod/gi.test(n), t.supportsTransition = P(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), i = e(document), t.popupsCache = {}
    }, open: function (n) {
      var o;
      if (n.isObj === !1) {
        t.items = n.items.toArray(), t.index = 0;
        var a, s = n.items;
        for (o = 0; o < s.length; o++) if (a = s[o], a.parsed && (a = a.el[0]), a === n.el[0]) {
          t.index = o;
          break
        }
      } else t.items = e.isArray(n.items) ? n.items : [n.items], t.index = n.index || 0;
      if (t.isOpen) return void t.updateItemHTML();
      t.types = [], r = '', n.mainEl && n.mainEl.length ? t.ev = n.mainEl.eq(0) : t.ev = i, n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos = 'auto' === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = x('bg').on('click' + g, function () {
        t.close()
      }), t.wrap = x('wrap').attr('tabindex', -1).on('click' + g, function (e) {
        t._checkIfClose(e.target) && t.close()
      }), t.container = x('container', t.wrap)), t.contentContainer = x('content'), t.st.preloader && (t.preloader = x('preloader', t.container, t.st.tLoading));
      var l = e.magnificPopup.modules;
      for (o = 0; o < l.length; o++) {
        var c = l[o];
        c = c.charAt(0).toUpperCase() + c.slice(1), t['init' + c].call(t)
      }
      k('BeforeOpen'), t.st.showCloseBtn && (t.st.closeBtnInside ? (I(u, function (e, t, n, i) {
        n.close_replaceWith = T(i.type)
      }), r += ' mfp-close-btn-in') : t.wrap.append(T())), t.st.alignTop && (r += ' mfp-align-top'), t.fixedContentPos ? t.wrap.css({
        overflow: t.st.overflowY,
        overflowX: 'hidden',
        overflowY: t.st.overflowY
      }) : t.wrap.css({
        top: b.scrollTop(),
        position: 'absolute'
      }), (t.st.fixedBgPos === !1 || 'auto' === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
        height: i.height(),
        position: 'absolute'
      }), t.st.enableEscapeKey && i.on('keyup' + g, function (e) {
        27 === e.keyCode && t.close()
      }), b.on('resize' + g, function () {
        t.updateSize()
      }), t.st.closeOnContentClick || (r += ' mfp-auto-cursor'), r && t.wrap.addClass(r);
      var d = t.wH = b.height(), f = {};
      if (t.fixedContentPos && t._hasScrollBar(d)) {
        var m = t._getScrollbarSize();
        m && (f.marginRight = m)
      }
      t.fixedContentPos && (t.isIE7 ? e('body, html').css('overflow', 'hidden') : f.overflow = 'hidden');
      var h = t.st.mainClass;
      return t.isIE7 && (h += ' mfp-ie7'), h && t._addClassToMFP(h), t.updateItemHTML(), k('BuildControls'), e('html').css(f), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)), t._lastFocusedEl = document.activeElement, setTimeout(function () {
        t.content ? (t._addClassToMFP(v), t._setFocus()) : t.bgOverlay.addClass(v), i.on('focusin' + g, t._onFocusIn)
      }, 16), t.isOpen = !0, t.updateSize(d), k(p), n
    }, close: function () {
      t.isOpen && (k(l), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(h), setTimeout(function () {
        t._close()
      }, t.st.removalDelay)) : t._close())
    }, _close: function () {
      k(s);
      var n = h + ' ' + v + ' ';
      if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + ' '), t._removeClassFromMFP(n), t.fixedContentPos) {
        var o = { marginRight: '' };
        t.isIE7 ? e('body, html').css('overflow', '') : o.overflow = '', e('html').css(o)
      }
      i.off('keyup' + g + ' focusin' + g), t.ev.off(g), t.wrap.attr('class', 'mfp-wrap').removeAttr('style'), t.bgOverlay.attr('class', 'mfp-bg'), t.container.attr('class', 'mfp-container'), !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, k(c)
    }, updateSize: function (e) {
      if (t.isIOS) {
        var n = document.documentElement.clientWidth / window.innerWidth, i = window.innerHeight * n;
        t.wrap.css('height', i), t.wH = i
      } else t.wH = e || b.height();
      t.fixedContentPos || t.wrap.css('height', t.wH), k('Resize')
    }, updateItemHTML: function () {
      var n = t.items[t.index];
      t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
      var i = n.type;
      if (k('BeforeChange', [t.currItem ? t.currItem.type : '', i]), t.currItem = n, !t.currTemplate[i]) {
        var r = !!t.st[i] && t.st[i].markup;
        k('FirstMarkupParse', r), r ? t.currTemplate[i] = e(r) : t.currTemplate[i] = !0
      }
      o && o !== n.type && t.container.removeClass('mfp-' + o + '-holder');
      var a = t['get' + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
      t.appendContent(a, i), n.preloaded = !0, k(f, n), o = n.type, t.container.prepend(t.contentContainer), k('AfterChange')
    }, appendContent: function (e, n) {
      t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0 ? t.content.find('.mfp-close').length || t.content.append(T()) : t.content = e : t.content = '', k(d), t.container.addClass('mfp-' + n + '-holder'), t.contentContainer.append(t.content)
    }, parseEl: function (n) {
      var i, o = t.items[n];
      if (o.tagName ? o = { el: e(o) } : (i = o.type, o = { data: o, src: o.src }), o.el) {
        for (var r = t.types, a = 0; a < r.length; a++) if (o.el.hasClass('mfp-' + r[a])) {
          i = r[a];
          break
        }
        o.src = o.el.attr('data-mfp-src'), o.src || (o.src = o.el.attr('href'))
      }
      return o.type = i || t.st.type || 'inline', o.index = n, o.parsed = !0, t.items[n] = o, k('ElementParse', o), t.items[n]
    }, addGroup: function (e, n) {
      var i = function (i) {
        i.mfpEl = this, t._openClick(i, e, n)
      };
      n || (n = {});
      var o = 'click.magnificPopup';
      n.mainEl = e, n.items ? (n.isObj = !0, e.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? e.off(o).on(o, n.delegate, i) : (n.items = e, e.off(o).on(o, i)))
    }, _openClick: function (n, i, o) {
      var r = void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick;
      if (r || !(2 === n.which || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey)) {
        var a = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
        if (a) if (e.isFunction(a)) {
          if (!a.call(t)) return !0
        } else if (b.width() < a) return !0;
        n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), o.el = e(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), t.open(o)
      }
    }, updateStatus: function (e, i) {
      if (t.preloader) {
        n !== e && t.container.removeClass('mfp-s-' + n), i || 'loading' !== e || (i = t.st.tLoading);
        var o = { status: e, text: i };
        k('UpdateStatus', o), e = o.status, i = o.text, t.preloader.html(i), t.preloader.find('a').on('click', function (e) {
          e.stopImmediatePropagation()
        }), t.container.addClass('mfp-s-' + e), n = e
      }
    }, _checkIfClose: function (n) {
      if (!e(n).hasClass(y)) {
        var i = t.st.closeOnContentClick, o = t.st.closeOnBgClick;
        if (i && o) return !0;
        if (!t.content || e(n).hasClass('mfp-close') || t.preloader && n === t.preloader[0]) return !0;
        if (n === t.content[0] || e.contains(t.content[0], n)) {
          if (i) return !0
        } else if (o && e.contains(document, n)) return !0;
        return !1
      }
    }, _addClassToMFP: function (e) {
      t.bgOverlay.addClass(e), t.wrap.addClass(e)
    }, _removeClassFromMFP: function (e) {
      this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
    }, _hasScrollBar: function (e) {
      return (t.isIE7 ? i.height() : document.body.scrollHeight) > (e || b.height())
    }, _setFocus: function () {
      (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
    }, _onFocusIn: function (n) {
      if (n.target !== t.wrap[0] && !e.contains(t.wrap[0], n.target)) return t._setFocus(), !1
    }, _parseMarkup: function (t, n, i) {
      var o;
      i.data && (n = e.extend(i.data, n)), k(u, [t, n, i]), e.each(n, function (n, i) {
        if (void 0 === i || i === !1) return !0;
        if (o = n.split('_'), o.length > 1) {
          var r = t.find(g + '-' + o[0]);
          if (r.length > 0) {
            var a = o[1];
            'replaceWith' === a ? r[0] !== i[0] && r.replaceWith(i) : 'img' === a ? r.is('img') ? r.attr('src', i) : r.replaceWith(e('<img>').attr('src', i).attr('class', r.attr('class'))) : r.attr(o[1], i)
          }
        } else t.find(g + '-' + n).html(i)
      })
    }, _getScrollbarSize: function () {
      if (void 0 === t.scrollbarSize) {
        var e = document.createElement('div');
        e.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;', document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
      }
      return t.scrollbarSize
    }
  }, e.magnificPopup = {
    instance: null,
    proto: C.prototype,
    modules: [],
    open: function (t, n) {
      return _(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = n || 0, this.instance.open(t)
    },
    close: function () {
      return e.magnificPopup.instance && e.magnificPopup.instance.close()
    },
    registerModule: function (t, n) {
      n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t)
    },
    defaults: {
      disableOn: 0,
      key: null,
      midClick: !1,
      mainClass: '',
      preloader: !0,
      focus: '',
      closeOnContentClick: !1,
      closeOnBgClick: !0,
      closeBtnInside: !0,
      showCloseBtn: !0,
      enableEscapeKey: !0,
      modal: !1,
      alignTop: !1,
      removalDelay: 0,
      prependTo: null,
      fixedContentPos: 'auto',
      fixedBgPos: 'auto',
      overflowY: 'auto',
      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
      tClose: 'Close (Esc)',
      tLoading: 'Loading...',
      autoFocusLast: !0
    }
  }, e.fn.magnificPopup = function (n) {
    _();
    var i = e(this);
    if ('string' == typeof n) if ('open' === n) {
      var o, r = w ? i.data('magnificPopup') : i[0].magnificPopup, a = parseInt(arguments[1], 10) || 0;
      r.items ? o = r.items[a] : (o = i, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), t._openClick({ mfpEl: o }, i, r)
    } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1)); else n = e.extend(!0, {}, n), w ? i.data('magnificPopup', n) : i[0].magnificPopup = n, t.addGroup(i, n);
    return i
  };
  var S, E, z, O = 'inline', M = function () {
    z && (E.after(z.addClass(S)).detach(), z = null)
  };
  e.magnificPopup.registerModule(O, {
    options: { hiddenClass: 'hide', markup: '', tNotFound: 'Content not found' },
    proto: {
      initInline: function () {
        t.types.push(O), I(s + '.' + O, function () {
          M()
        })
      }, getInline: function (n, i) {
        if (M(), n.src) {
          var o = t.st.inline, r = e(n.src);
          if (r.length) {
            var a = r[0].parentNode;
            a && a.tagName && (E || (S = o.hiddenClass, E = x(S), S = 'mfp-' + S), z = r.after(E).detach().removeClass(S)), t.updateStatus('ready')
          } else t.updateStatus('error', o.tNotFound), r = e('<div>');
          return n.inlineElement = r, r
        }
        return t.updateStatus('ready'), t._parseMarkup(i, {}, n), i
      }
    }
  });
  var B, L = 'ajax', H = function () {
    B && e(document.body).removeClass(B)
  }, A = function () {
    H(), t.req && t.req.abort()
  };
  e.magnificPopup.registerModule(L, {
    options: {
      settings: null,
      cursor: 'mfp-ajax-cur',
      tError: '<a href="%url%">The content</a> could not be loaded.'
    }, proto: {
      initAjax: function () {
        t.types.push(L), B = t.st.ajax.cursor, I(s + '.' + L, A), I('BeforeChange.' + L, A)
      }, getAjax: function (n) {
        B && e(document.body).addClass(B), t.updateStatus('loading');
        var i = e.extend({
          url: n.src, success: function (i, o, r) {
            var a = { data: i, xhr: r };
            k('ParseAjax', a), t.appendContent(e(a.data), L), n.finished = !0, H(), t._setFocus(), setTimeout(function () {
              t.wrap.addClass(v)
            }, 16), t.updateStatus('ready'), k('AjaxContentAdded')
          }, error: function () {
            H(), n.finished = n.loadError = !0, t.updateStatus('error', t.st.ajax.tError.replace('%url%', n.src))
          }
        }, t.st.ajax.settings);
        return t.req = e.ajax(i), ''
      }
    }
  });
  var F, j = function (n) {
    if (n.data && void 0 !== n.data.title) return n.data.title;
    var i = t.st.image.titleSrc;
    if (i) {
      if (e.isFunction(i)) return i.call(t, n);
      if (n.el) return n.el.attr(i) || ''
    }
    return ''
  };
  e.magnificPopup.registerModule('image', {
    options: {
      markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: 'mfp-zoom-out-cur',
      titleSrc: 'title',
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    }, proto: {
      initImage: function () {
        var n = t.st.image, i = '.image';
        t.types.push('image'), I(p + i, function () {
          'image' === t.currItem.type && n.cursor && e(document.body).addClass(n.cursor)
        }), I(s + i, function () {
          n.cursor && e(document.body).removeClass(n.cursor), b.off('resize' + g)
        }), I('Resize' + i, t.resizeImage), t.isLowIE && I('AfterChange', t.resizeImage)
      }, resizeImage: function () {
        var e = t.currItem;
        if (e && e.img && t.st.image.verticalFit) {
          var n = 0;
          t.isLowIE && (n = parseInt(e.img.css('padding-top'), 10) + parseInt(e.img.css('padding-bottom'), 10)), e.img.css('max-height', t.wH - n)
        }
      }, _onImageHasSize: function (e) {
        e.img && (e.hasSize = !0, F && clearInterval(F), e.isCheckingImgSize = !1, k('ImageHasSize', e), e.imgHidden && (t.content && t.content.removeClass('mfp-loading'), e.imgHidden = !1))
      }, findImageSize: function (e) {
        var n = 0, i = e.img[0], o = function (r) {
          F && clearInterval(F), F = setInterval(function () {
            return i.naturalWidth > 0 ? void t._onImageHasSize(e) : (n > 200 && clearInterval(F), n++, void(3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500)))
          }, r)
        };
        o(1)
      }, getImage: function (n, i) {
        var o = 0, r = function () {
          n && (n.img[0].complete ? (n.img.off('.mfploader'), n === t.currItem && (t._onImageHasSize(n), t.updateStatus('ready')), n.hasSize = !0, n.loaded = !0, k('ImageLoadComplete')) : (o++, o < 200 ? setTimeout(r, 100) : a()))
        }, a = function () {
          n && (n.img.off('.mfploader'), n === t.currItem && (t._onImageHasSize(n), t.updateStatus('error', s.tError.replace('%url%', n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
        }, s = t.st.image, l = i.find('.mfp-img');
        if (l.length) {
          var c = document.createElement('img');
          c.className = 'mfp-img', n.el && n.el.find('img').length && (c.alt = n.el.find('img').attr('alt')), n.img = e(c).on('load.mfploader', r).on('error.mfploader', a), c.src = n.src, l.is('img') && (n.img = n.img.clone()), c = n.img[0], c.naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
        }
        return t._parseMarkup(i, {
          title: j(n),
          img_replaceWith: n.img
        }, n), t.resizeImage(), n.hasSize ? (F && clearInterval(F), n.loadError ? (i.addClass('mfp-loading'), t.updateStatus('error', s.tError.replace('%url%', n.src))) : (i.removeClass('mfp-loading'), t.updateStatus('ready')), i) : (t.updateStatus('loading'), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass('mfp-loading'), t.findImageSize(n)), i)
      }
    }
  });
  var N, W = function () {
    return void 0 === N && (N = void 0 !== document.createElement('p').style.MozTransform), N
  };
  e.magnificPopup.registerModule('zoom', {
    options: {
      enabled: !1,
      easing: 'ease-in-out',
      duration: 300,
      opener: function (e) {
        return e.is('img') ? e : e.find('img')
      }
    }, proto: {
      initZoom: function () {
        var e, n = t.st.zoom, i = '.zoom';
        if (n.enabled && t.supportsTransition) {
          var o, r, a = n.duration, c = function (e) {
            var t = e.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
              i = 'all ' + n.duration / 1e3 + 's ' + n.easing,
              o = { position: 'fixed', zIndex: 9999, left: 0, top: 0, '-webkit-backface-visibility': 'hidden' },
              r = 'transition';
            return o['-webkit-' + r] = o['-moz-' + r] = o['-o-' + r] = o[r] = i, t.css(o), t
          }, d = function () {
            t.content.css('visibility', 'visible')
          };
          I('BuildControls' + i, function () {
            if (t._allowZoom()) {
              if (clearTimeout(o), t.content.css('visibility', 'hidden'), e = t._getItemToZoom(), !e) return void d();
              r = c(e), r.css(t._getOffset()), t.wrap.append(r), o = setTimeout(function () {
                r.css(t._getOffset(!0)), o = setTimeout(function () {
                  d(), setTimeout(function () {
                    r.remove(), e = r = null, k('ZoomAnimationEnded')
                  }, 16)
                }, a)
              }, 16)
            }
          }), I(l + i, function () {
            if (t._allowZoom()) {
              if (clearTimeout(o), t.st.removalDelay = a, !e) {
                if (e = t._getItemToZoom(), !e) return;
                r = c(e)
              }
              r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css('visibility', 'hidden'), setTimeout(function () {
                r.css(t._getOffset())
              }, 16)
            }
          }), I(s + i, function () {
            t._allowZoom() && (d(), r && r.remove(), e = null)
          })
        }
      }, _allowZoom: function () {
        return 'image' === t.currItem.type
      }, _getItemToZoom: function () {
        return !!t.currItem.hasSize && t.currItem.img
      }, _getOffset: function (n) {
        var i;
        i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
        var o = i.offset(), r = parseInt(i.css('padding-top'), 10), a = parseInt(i.css('padding-bottom'), 10);
        o.top -= e(window).scrollTop() - r;
        var s = { width: i.width(), height: (w ? i.innerHeight() : i[0].offsetHeight) - a - r };
        return W() ? s['-moz-transform'] = s.transform = 'translate(' + o.left + 'px,' + o.top + 'px)' : (s.left = o.left, s.top = o.top), s
      }
    }
  });
  var Z = 'iframe', q = '//about:blank', R = function (e) {
    if (t.currTemplate[Z]) {
      var n = t.currTemplate[Z].find('iframe');
      n.length && (e || (n[0].src = q), t.isIE8 && n.css('display', e ? 'block' : 'none'))
    }
  };
  e.magnificPopup.registerModule(Z, {
    options: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: 'iframe_src',
      patterns: {
        youtube: { index: 'youtube.com', id: 'v=', src: '//www.youtube.com/embed/%id%?autoplay=1' },
        vimeo: { index: 'vimeo.com/', id: '/', src: '//player.vimeo.com/video/%id%?autoplay=1' },
        gmaps: { index: '//maps.google.', src: '%id%&output=embed' }
      }
    }, proto: {
      initIframe: function () {
        t.types.push(Z), I('BeforeChange', function (e, t, n) {
          t !== n && (t === Z ? R() : n === Z && R(!0))
        }), I(s + '.' + Z, function () {
          R()
        })
      }, getIframe: function (n, i) {
        var o = n.src, r = t.st.iframe;
        e.each(r.patterns, function () {
          if (o.indexOf(this.index) > -1) return this.id && (o = 'string' == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace('%id%', o), !1
        });
        var a = {};
        return r.srcAction && (a[r.srcAction] = o), t._parseMarkup(i, a, n), t.updateStatus('ready'), i
      }
    }
  });
  var K = function (e) {
    var n = t.items.length;
    return e > n - 1 ? e - n : e < 0 ? n + e : e
  }, D = function (e, t, n) {
    return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
  };
  e.magnificPopup.registerModule('gallery', {
    options: {
      enabled: !1,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: 'Previous (Left arrow key)',
      tNext: 'Next (Right arrow key)',
      tCounter: '%curr% of %total%'
    }, proto: {
      initGallery: function () {
        var n = t.st.gallery, o = '.mfp-gallery';
        return t.direction = !0, !(!n || !n.enabled) && (r += ' mfp-gallery', I(p + o, function () {
          n.navigateByImgClick && t.wrap.on('click' + o, '.mfp-img', function () {
            if (t.items.length > 1) return t.next(), !1
          }), i.on('keydown' + o, function (e) {
            37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
          })
        }), I('UpdateStatus' + o, function (e, n) {
          n.text && (n.text = D(n.text, t.currItem.index, t.items.length))
        }), I(u + o, function (e, i, o, r) {
          var a = t.items.length;
          o.counter = a > 1 ? D(n.tCounter, r.index, a) : ''
        }), I('BuildControls' + o, function () {
          if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
            var i = n.arrowMarkup,
              o = t.arrowLeft = e(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, 'left')).addClass(y),
              r = t.arrowRight = e(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, 'right')).addClass(y);
            o.click(function () {
              t.prev()
            }), r.click(function () {
              t.next()
            }), t.container.append(o.add(r))
          }
        }), I(f + o, function () {
          t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function () {
            t.preloadNearbyImages(), t._preloadTimeout = null
          }, 16)
        }), void I(s + o, function () {
          i.off(o), t.wrap.off('click' + o), t.arrowRight = t.arrowLeft = null
        }))
      }, next: function () {
        t.direction = !0, t.index = K(t.index + 1), t.updateItemHTML()
      }, prev: function () {
        t.direction = !1, t.index = K(t.index - 1), t.updateItemHTML()
      }, goTo: function (e) {
        t.direction = e >= t.index, t.index = e, t.updateItemHTML()
      }, preloadNearbyImages: function () {
        var e, n = t.st.gallery.preload, i = Math.min(n[0], t.items.length), o = Math.min(n[1], t.items.length);
        for (e = 1; e <= (t.direction ? o : i); e++) t._preloadItem(t.index + e);
        for (e = 1; e <= (t.direction ? i : o); e++) t._preloadItem(t.index - e)
      }, _preloadItem: function (n) {
        if (n = K(n), !t.items[n].preloaded) {
          var i = t.items[n];
          i.parsed || (i = t.parseEl(n)), k('LazyLoad', i), 'image' === i.type && (i.img = e('<img class="mfp-img" />').on('load.mfploader', function () {
            i.hasSize = !0
          }).on('error.mfploader', function () {
            i.hasSize = !0, i.loadError = !0, k('LazyLoadError', i)
          }).attr('src', i.src)), i.preloaded = !0
        }
      }
    }
  });
  var U = 'retina';
  e.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (e) {
        return e.src.replace(/\.\w+$/, function (e) {
          return '@2x' + e
        })
      }, ratio: 1
    }, proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var e = t.st.retina, n = e.ratio;
          n = isNaN(n) ? n() : n, n > 1 && (I('ImageHasSize.' + U, function (e, t) {
            t.img.css({ 'max-width': t.img[0].naturalWidth / n, width: '100%' })
          }), I('ElementParse.' + U, function (t, i) {
            i.src = e.replaceSrc(i, n)
          }))
        }
      }
    }
  }), _()
});
(function () {
  var t, e, n, r, a, i, o, l, u, s, c, h, p, f, g, v, d, m, y, C, T, w, $, D, S = [].slice,
    k = [].indexOf || function (t) {
      for (var e = 0, n = this.length; e < n; e++) if (e in this && this[e] === t) return e;
      return -1
    };
  t = window.jQuery || window.Zepto || window.$, t.payment = {}, t.payment.fn = {}, t.fn.payment = function () {
    var e, n;
    return n = arguments[0], e = 2 <= arguments.length ? S.call(arguments, 1) : [], t.payment.fn[n].apply(this, e)
  }, a = /(\d{1,4})/g, t.payment.cards = r = [{
    type: 'maestro',
    patterns: [5018, 502, 503, 506, 56, 58, 639, 6220, 67],
    format: a,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: !0
  }, {
    type: 'forbrugsforeningen',
    patterns: [600],
    format: a,
    length: [16],
    cvcLength: [3],
    luhn: !0
  }, { type: 'dankort', patterns: [5019], format: a, length: [16], cvcLength: [3], luhn: !0 }, {
    type: 'visa',
    patterns: [4],
    format: a,
    length: [13, 16],
    cvcLength: [3],
    luhn: !0
  }, {
    type: 'mastercard',
    patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
    format: a,
    length: [16],
    cvcLength: [3],
    luhn: !0
  }, {
    type: 'amex',
    patterns: [34, 37],
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [3, 4],
    luhn: !0
  }, {
    type: 'dinersclub',
    patterns: [30, 36, 38, 39],
    format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
    length: [14],
    cvcLength: [3],
    luhn: !0
  }, {
    type: 'discover',
    patterns: [60, 64, 65, 622],
    format: a,
    length: [16],
    cvcLength: [3],
    luhn: !0
  }, {
    type: 'unionpay',
    patterns: [62, 88],
    format: a,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: !1
  }, { type: 'jcb', patterns: [35], format: a, length: [16], cvcLength: [3], luhn: !0 }], e = function (t) {
    var e, n, a, i, o, l, u, s;
    for (t = (t + '').replace(/\D/g, ''), i = 0, l = r.length; i < l; i++) for (e = r[i], s = e.patterns, o = 0, u = s.length; o < u; o++) if (a = s[o], n = a + '', t.substr(0, n.length) === n) return e
  }, n = function (t) {
    var e, n, a;
    for (n = 0, a = r.length; n < a; n++) if (e = r[n], e.type === t) return e
  }, p = function (t) {
    var e, n, r, a, i, o;
    for (r = !0, a = 0, n = (t + '').split('').reverse(), i = 0, o = n.length; i < o; i++) e = n[i], e = parseInt(e, 10), (r = !r) && (e *= 2), e > 9 && (e -= 9), a += e;
    return a % 10 === 0
  }, h = function (t) {
    var e;
    return null != t.prop('selectionStart') && t.prop('selectionStart') !== t.prop('selectionEnd') || !(null == ('undefined' != typeof document && null !== document && null != (e = document.selection) ? e.createRange : void 0) || !document.selection.createRange().text)
  }, $ = function (t, e) {
    var n, r, a, i, o, l;
    try {
      r = e.prop('selectionStart')
    } catch (u) {
      i = u, r = null
    }
    if (o = e.val(), e.val(t), null !== r && e.is(':focus')) return r === o.length && (r = t.length), o !== t && (l = o.slice(r - 1, +r + 1 || 9e9), n = t.slice(r - 1, +r + 1 || 9e9), a = t[r], /\d/.test(a) && l === '' + a + ' ' && n === ' ' + a && (r += 1)), e.prop('selectionStart', r), e.prop('selectionEnd', r)
  }, m = function (t) {
    var e, n, r, a, i, o, l, u;
    for (null == t && (t = ''), r = '０１２３４５６７８９', a = '0123456789', o = '', e = t.split(''), l = 0, u = e.length; l < u; l++) n = e[l], i = r.indexOf(n), i > -1 && (n = a[i]), o += n;
    return o
  }, d = function (e) {
    var n;
    return n = t(e.currentTarget), setTimeout(function () {
      var t;
      return t = n.val(), t = m(t), t = t.replace(/\D/g, ''), $(t, n)
    })
  }, g = function (e) {
    var n;
    return n = t(e.currentTarget), setTimeout(function () {
      var e;
      return e = n.val(), e = m(e), e = t.payment.formatCardNumber(e), $(e, n)
    })
  }, l = function (n) {
    var r, a, i, o, l, u, s;
    if (i = String.fromCharCode(n.which), /^\d+$/.test(i) && (r = t(n.currentTarget), s = r.val(), a = e(s + i), o = (s.replace(/\D/g, '') + i).length, u = 16, a && (u = a.length[a.length.length - 1]), !(o >= u || null != r.prop('selectionStart') && r.prop('selectionStart') !== s.length))) return l = a && 'amex' === a.type ? /^(\d{4}|\d{4}\s\d{6})$/ : /(?:^|\s)(\d{4})$/, l.test(s) ? (n.preventDefault(), setTimeout(function () {
      return r.val(s + ' ' + i)
    })) : l.test(s + i) ? (n.preventDefault(), setTimeout(function () {
      return r.val(s + i + ' ')
    })) : void 0
  }, i = function (e) {
    var n, r;
    if (n = t(e.currentTarget), r = n.val(), 8 === e.which && (null == n.prop('selectionStart') || n.prop('selectionStart') === r.length)) return /\d\s$/.test(r) ? (e.preventDefault(), setTimeout(function () {
      return n.val(r.replace(/\d\s$/, ''))
    })) : /\s\d?$/.test(r) ? (e.preventDefault(), setTimeout(function () {
      return n.val(r.replace(/\d$/, ''))
    })) : void 0
  }, v = function (e) {
    var n;
    return n = t(e.currentTarget), setTimeout(function () {
      var e;
      return e = n.val(), e = m(e), e = t.payment.formatExpiry(e), $(e, n)
    })
  }, u = function (e) {
    var n, r, a;
    if (r = String.fromCharCode(e.which), /^\d+$/.test(r)) return n = t(e.currentTarget), a = n.val() + r, /^\d$/.test(a) && '0' !== a && '1' !== a ? (e.preventDefault(), setTimeout(function () {
      return n.val('0' + a + ' / ')
    })) : /^\d\d$/.test(a) ? (e.preventDefault(), setTimeout(function () {
      var t, e;
      return t = parseInt(a[0], 10), e = parseInt(a[1], 10), e > 2 && 0 !== t ? n.val('0' + t + ' / ' + e) : n.val('' + a + ' / ')
    })) : void 0
  }, s = function (e) {
    var n, r, a;
    if (r = String.fromCharCode(e.which), /^\d+$/.test(r)) return n = t(e.currentTarget), a = n.val(), /^\d\d$/.test(a) ? n.val('' + a + ' / ') : void 0
  }, c = function (e) {
    var n, r, a;
    if (a = String.fromCharCode(e.which), '/' === a || ' ' === a) return n = t(e.currentTarget), r = n.val(), /^\d$/.test(r) && '0' !== r ? n.val('0' + r + ' / ') : void 0
  }, o = function (e) {
    var n, r;
    if (n = t(e.currentTarget), r = n.val(), 8 === e.which && (null == n.prop('selectionStart') || n.prop('selectionStart') === r.length)) return /\d\s\/\s$/.test(r) ? (e.preventDefault(), setTimeout(function () {
      return n.val(r.replace(/\d\s\/\s$/, ''))
    })) : void 0
  }, f = function (e) {
    var n;
    return n = t(e.currentTarget), setTimeout(function () {
      var t;
      return t = n.val(), t = m(t), t = t.replace(/\D/g, '').slice(0, 4), $(t, n)
    })
  }, w = function (t) {
    var e;
    return !(!t.metaKey && !t.ctrlKey) || 32 !== t.which && (0 === t.which || (t.which < 33 || (e = String.fromCharCode(t.which), !!/[\d\s]/.test(e))))
  }, C = function (n) {
    var r, a, i, o;
    if (r = t(n.currentTarget), i = String.fromCharCode(n.which), /^\d+$/.test(i) && !h(r)) return o = (r.val() + i).replace(/\D/g, ''), a = e(o), a ? o.length <= a.length[a.length.length - 1] : o.length <= 16
  }, T = function (e) {
    var n, r, a;
    if (n = t(e.currentTarget), r = String.fromCharCode(e.which), /^\d+$/.test(r) && !h(n)) return a = n.val() + r, a = a.replace(/\D/g, ''), !(a.length > 6) && void 0
  }, y = function (e) {
    var n, r, a;
    if (n = t(e.currentTarget), r = String.fromCharCode(e.which), /^\d+$/.test(r) && !h(n)) return a = n.val() + r, a.length <= 4
  }, D = function (e) {
    var n, a, i, o, l;
    if (n = t(e.currentTarget), l = n.val(), o = t.payment.cardType(l) || 'unknown', !n.hasClass(o)) return a = function () {
      var t, e, n;
      for (n = [], t = 0, e = r.length; t < e; t++) i = r[t], n.push(i.type);
      return n
    }(), n.removeClass('unknown'), n.removeClass(a.join(' ')), n.addClass(o), n.toggleClass('identified', 'unknown' !== o), n.trigger('payment.cardType', o)
  }, t.payment.fn.formatCardCVC = function () {
    return this.on('keypress', w), this.on('keypress', y), this.on('paste', f), this.on('change', f), this.on('input', f), this
  }, t.payment.fn.formatCardExpiry = function () {
    return this.on('keypress', w), this.on('keypress', T), this.on('keypress', u), this.on('keypress', c), this.on('keypress', s), this.on('keydown', o), this.on('change', v), this.on('input', v), this
  }, t.payment.fn.formatCardNumber = function () {
    return this.on('keypress', w), this.on('keypress', C), this.on('keypress', l), this.on('keydown', i), this.on('keyup', D), this.on('paste', g), this.on('change', g), this.on('input', g), this.on('input', D), this
  }, t.payment.fn.restrictNumeric = function () {
    return this.on('keypress', w), this.on('paste', d), this.on('change', d), this.on('input', d), this
  }, t.payment.fn.cardExpiryVal = function () {
    return t.payment.cardExpiryVal(t(this).val())
  }, t.payment.cardExpiryVal = function (t) {
    var e, n, r, a;
    return a = t.split(/[\s\/]+/, 2), e = a[0], r = a[1], 2 === (null != r ? r.length : void 0) && /^\d+$/.test(r) && (n = (new Date).getFullYear(), n = n.toString().slice(0, 2), r = n + r), e = parseInt(e, 10), r = parseInt(r, 10), {
      month: e,
      year: r
    }
  }, t.payment.validateCardNumber = function (t) {
    var n, r;
    return t = (t + '').replace(/\s+|-/g, ''), !!/^\d+$/.test(t) && (n = e(t), !!n && (r = t.length, k.call(n.length, r) >= 0 && (n.luhn === !1 || p(t))))
  }, t.payment.validateCardExpiry = function (e, n) {
    var r, a, i;
    return 'object' == typeof e && 'month' in e && (i = e, e = i.month, n = i.year), !(!e || !n) && (e = t.trim(e), n = t.trim(n), !!/^\d+$/.test(e) && (!!/^\d+$/.test(n) && (1 <= e && e <= 12 && (2 === n.length && (n = n < 70 ? '20' + n : '19' + n), 4 === n.length && (a = new Date(n, e), r = new Date, a.setMonth(a.getMonth() - 1), a.setMonth(a.getMonth() + 1, 1), a > r)))))
  }, t.payment.validateCardCVC = function (e, r) {
    var a, i;
    return e = t.trim(e), !!/^\d+$/.test(e) && (a = n(r), null != a ? (i = e.length, k.call(a.cvcLength, i) >= 0) : e.length >= 3 && e.length <= 4)
  }, t.payment.cardType = function (t) {
    var n;
    return t ? (null != (n = e(t)) ? n.type : void 0) || null : null
  }, t.payment.formatCardNumber = function (n) {
    var r, a, i, o;
    return n = n.replace(/\D/g, ''), (r = e(n)) ? (i = r.length[r.length.length - 1], n = n.slice(0, i), r.format.global ? null != (o = n.match(r.format)) ? o.join(' ') : void 0 : (a = r.format.exec(n), null != a ? (a.shift(), a = t.grep(a, function (t) {
      return t
    }), a.join(' ')) : void 0)) : n
  }, t.payment.formatExpiry = function (t) {
    var e, n, r, a;
    return (n = t.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/)) ? (e = n[1] || '', r = n[2] || '', a = n[3] || '', a.length > 0 ? r = ' / ' : ' /' === r ? (e = e.substring(0, 1), r = '') : 2 === e.length || r.length > 0 ? r = ' / ' : 1 === e.length && '0' !== e && '1' !== e && (e = '0' + e, r = ' / '), e + r + a) : ''
  }
}).call(this);
!function (t, e, i) {
  !function (t) {
    'use strict';
    'function' == typeof define && define.amd ? define(['jquery'], t) : jQuery && !jQuery.fn.qtip && t(jQuery)
  }(function (s) {
    'use strict';

    function o(t, e, i, o) {
      this.id = i, this.target = t, this.tooltip = k, this.elements = { target: t }, this._id = R + '-' + i, this.timers = { img: {} }, this.options = e, this.plugins = {}, this.cache = {
        event: {},
        target: s(),
        disabled: I,
        attr: o,
        onTooltip: I,
        lastClass: ''
      }, this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = I
    }

    function n(t) {
      return t === k || 'object' !== s.type(t)
    }

    function r(t) {
      return !(s.isFunction(t) || t && t.attr || t.length || 'object' === s.type(t) && (t.jquery || t.then))
    }

    function a(t) {
      var e, i, o, a;
      return n(t) ? I : (n(t.metadata) && (t.metadata = { type: t.metadata }), 'content' in t && (e = t.content, n(e) || e.jquery || e.done ? e = t.content = { text: i = r(e) ? I : e } : i = e.text, 'ajax' in e && (o = e.ajax, a = o && o.once !== I, delete e.ajax, e.text = function (t, e) {
        var n = i || s(this).attr(e.options.content.attr) || 'Loading...',
          r = s.ajax(s.extend({}, o, { context: e })).then(o.success, k, o.error).then(function (t) {
            return t && a && e.set('content.text', t), t
          }, function (t, i, s) {
            e.destroyed || 0 === t.status || e.set('content.text', i + ': ' + s)
          });
        return a ? n : (e.set('content.text', n), r)
      }), 'title' in e && (s.isPlainObject(e.title) && (e.button = e.title.button, e.title = e.title.text), r(e.title || I) && (e.title = I))), 'position' in t && n(t.position) && (t.position = {
        my: t.position,
        at: t.position
      }), 'show' in t && n(t.show) && (t.show = t.show.jquery ? { target: t.show } : t.show === W ? { ready: W } : { event: t.show }), 'hide' in t && n(t.hide) && (t.hide = t.hide.jquery ? { target: t.hide } : { event: t.hide }), 'style' in t && n(t.style) && (t.style = { classes: t.style }), s.each(V, function () {
        this.sanitize && this.sanitize(t)
      }), t)
    }

    function h(t, e) {
      for (var i, s = 0, o = t, n = e.split('.'); o = o[n[s++]];) s < n.length && (i = o);
      return [i || t, n.pop()]
    }

    function l(t, e) {
      var i, s, o;
      for (i in this.checks) for (s in this.checks[i]) (o = new RegExp(s, 'i').exec(t)) && (e.push(o), ('builtin' === i || this.plugins[i]) && this.checks[i][s].apply(this.plugins[i] || this, e))
    }

    function c(t) {
      return Y.concat('').join(t ? '-' + t + ' ' : ' ')
    }

    function d(t, e) {
      return e > 0 ? setTimeout(s.proxy(t, this), e) : void t.call(this)
    }

    function p(t) {
      this.tooltip.hasClass(tt) || (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this.timers.show = d.call(this, function () {
        this.toggle(W, t)
      }, this.options.show.delay))
    }

    function u(t) {
      if (!this.tooltip.hasClass(tt) && !this.destroyed) {
        var e = s(t.relatedTarget), i = e.closest(G)[0] === this.tooltip[0], o = e[0] === this.options.show.target[0];
        if (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this !== e[0] && 'mouse' === this.options.position.target && i || this.options.hide.fixed && /mouse(out|leave|move)/.test(t.type) && (i || o)) try {
          t.preventDefault(), t.stopImmediatePropagation()
        } catch (n) {
        } else this.timers.hide = d.call(this, function () {
          this.toggle(I, t)
        }, this.options.hide.delay, this)
      }
    }

    function f(t) {
      !this.tooltip.hasClass(tt) && this.options.hide.inactive && (clearTimeout(this.timers.inactive), this.timers.inactive = d.call(this, function () {
        this.hide(t)
      }, this.options.hide.inactive))
    }

    function g(t) {
      this.rendered && this.tooltip[0].offsetWidth > 0 && this.reposition(t)
    }

    function m(t, i, o) {
      s(e.body).delegate(t, (i.split ? i : i.join('.' + R + ' ')) + '.' + R, function () {
        var t = q.api[s.attr(this, X)];
        t && !t.disabled && o.apply(t, arguments)
      })
    }

    function v(t, i, n) {
      var r, h, l, c, d, p = s(e.body), u = t[0] === e ? p : t, f = t.metadata ? t.metadata(n.metadata) : k,
        g = 'html5' === n.metadata.type && f ? f[n.metadata.name] : k, m = t.data(n.metadata.name || 'qtipopts');
      try {
        m = 'string' == typeof m ? s.parseJSON(m) : m
      } catch (v) {
      }
      if (c = s.extend(W, {}, q.defaults, n, 'object' == typeof m ? a(m) : k, a(g || f)), h = c.position, c.id = i, 'boolean' == typeof c.content.text) {
        if (l = t.attr(c.content.attr), c.content.attr === I || !l) return I;
        c.content.text = l
      }
      if (h.container.length || (h.container = p), h.target === I && (h.target = u), c.show.target === I && (c.show.target = u), c.show.solo === W && (c.show.solo = h.container.closest('body')), c.hide.target === I && (c.hide.target = u), c.position.viewport === W && (c.position.viewport = h.container), h.container = h.container.eq(0), h.at = new j(h.at, W), h.my = new j(h.my), t.data(R)) if (c.overwrite) t.qtip('destroy', !0); else if (c.overwrite === I) return I;
      return t.attr(H, i), c.suppress && (d = t.attr('title')) && t.removeAttr('title').attr(it, d).attr('title', ''), r = new o(t, c, i, (!!l)), t.data(R, r), r
    }

    function y(t) {
      return t.charAt(0).toUpperCase() + t.slice(1)
    }

    function b(t, e) {
      var s, o, n = e.charAt(0).toUpperCase() + e.slice(1), r = (e + ' ' + vt.join(n + ' ') + n).split(' '), a = 0;
      if (mt[e]) return t.css(mt[e]);
      for (; s = r[a++];) if ((o = t.css(s)) !== i) return mt[e] = s, o
    }

    function w(t, e) {
      return Math.ceil(parseFloat(b(t, e)))
    }

    function _(t, e) {
      this._ns = 'tip', this.options = e, this.offset = e.offset, this.size = [e.width, e.height], this.init(this.qtip = t)
    }

    function x(t, e) {
      this.options = e, this._ns = '-modal', this.init(this.qtip = t)
    }

    function C(t, e) {
      this._ns = 'ie6', this.init(this.qtip = t)
    }

    var q, T, j, z, M, W = !0, I = !1, k = null, E = 'x', S = 'y', A = 'width', L = 'height', P = 'top', D = 'left',
      B = 'bottom', F = 'right', N = 'center', O = 'flipinvert', $ = 'shift', V = {}, R = 'qtip', H = 'data-hasqtip',
      X = 'data-qtip-id', Y = ['ui-widget', 'ui-tooltip'], G = '.' + R,
      U = 'click dblclick mousedown mouseup mousemove mouseleave mouseenter'.split(' '), Q = R + '-fixed',
      J = R + '-default', K = R + '-focus', Z = R + '-hover', tt = R + '-disabled', et = '_replacedByqTip',
      it = 'oldtitle', st = {
        ie: function () {
          for (var t = 4, i = e.createElement('div'); (i.innerHTML = "<!--[if gt IE " + t + "]><i></i><![endif]-->") && i.getElementsByTagName("i")[0]; t += 1) ;
          return t > 4 ? t : NaN
        }(),
        iOS: parseFloat(('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', '')) || I
      };
    T = o.prototype, T._when = function (t) {
      return s.when.apply(s, t)
    }, T.render = function (t) {
      if (this.rendered || this.destroyed) return this;
      var e, i = this, o = this.options, n = this.cache, r = this.elements, a = o.content.text, h = o.content.title,
        l = o.content.button, c = o.position, d = ('.' + this._id + ' ', []);
      return s.attr(this.target[0], 'aria-describedby', this._id), n.posClass = this._createPosClass((this.position = {
        my: c.my,
        at: c.at
      }).my), this.tooltip = r.tooltip = e = s('<div/>', {
        id: this._id,
        'class': [R, J, o.style.classes, n.posClass].join(' '),
        width: o.style.width || '',
        height: o.style.height || '',
        tracking: 'mouse' === c.target && c.adjust.mouse,
        role: 'alert',
        'aria-live': 'polite',
        'aria-atomic': I,
        'aria-describedby': this._id + '-content',
        'aria-hidden': W
      }).toggleClass(tt, this.disabled).attr(X, this.id).data(R, this).appendTo(c.container).append(r.content = s('<div />', {
        'class': R + '-content',
        id: this._id + '-content',
        'aria-atomic': W
      })), this.rendered = -1, this.positioning = W, h && (this._createTitle(), s.isFunction(h) || d.push(this._updateTitle(h, I))), l && this._createButton(), s.isFunction(a) || d.push(this._updateContent(a, I)), this.rendered = W, this._setWidget(), s.each(V, function (t) {
        var e;
        'render' === this.initialize && (e = this(i)) && (i.plugins[t] = e)
      }), this._unassignEvents(), this._assignEvents(), this._when(d).then(function () {
        i._trigger('render'), i.positioning = I, i.hiddenDuringWait || !o.show.ready && !t || i.toggle(W, n.event, I), i.hiddenDuringWait = I
      }), q.api[this.id] = this, this
    }, T.destroy = function (t) {
      function e() {
        if (!this.destroyed) {
          this.destroyed = W;
          var t, e = this.target, i = e.attr(it);
          this.rendered && this.tooltip.stop(1, 0).find('*').remove().end().remove(), s.each(this.plugins, function (t) {
            this.destroy && this.destroy()
          });
          for (t in this.timers) clearTimeout(this.timers[t]);
          e.removeData(R).removeAttr(X).removeAttr(H).removeAttr('aria-describedby'), this.options.suppress && i && e.attr('title', i).removeAttr(it), this._unassignEvents(), this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = k, delete q.api[this.id]
        }
      }

      return this.destroyed ? this.target : (t === W && 'hide' !== this.triggering || !this.rendered ? e.call(this) : (this.tooltip.one('tooltiphidden', s.proxy(e, this)), !this.triggering && this.hide()), this.target)
    }, z = T.checks = {
      builtin: {
        '^id$': function (t, e, i, o) {
          var n = i === W ? q.nextid : i, r = R + '-' + n;
          n !== I && n.length > 0 && !s('#' + r).length ? (this._id = r, this.rendered && (this.tooltip[0].id = this._id, this.elements.content[0].id = this._id + '-content', this.elements.title[0].id = this._id + '-title')) : t[e] = o
        }, '^prerender': function (t, e, i) {
          i && !this.rendered && this.render(this.options.show.ready)
        }, '^content.text$': function (t, e, i) {
          this._updateContent(i)
        }, '^content.attr$': function (t, e, i, s) {
          this.options.content.text === this.target.attr(s) && this._updateContent(this.target.attr(i))
        }, '^content.title$': function (t, e, i) {
          return i ? (i && !this.elements.title && this._createTitle(), void this._updateTitle(i)) : this._removeTitle()
        }, '^content.button$': function (t, e, i) {
          this._updateButton(i)
        }, '^content.title.(text|button)$': function (t, e, i) {
          this.set('content.' + e, i)
        }, '^position.(my|at)$': function (t, e, i) {
          'string' == typeof i && (this.position[e] = t[e] = new j(i, 'at' === e))
        }, '^position.container$': function (t, e, i) {
          this.rendered && this.tooltip.appendTo(i)
        }, '^show.ready$': function (t, e, i) {
          i && (!this.rendered && this.render(W) || this.toggle(W))
        }, '^style.classes$': function (t, e, i, s) {
          this.rendered && this.tooltip.removeClass(s).addClass(i)
        }, '^style.(width|height)': function (t, e, i) {
          this.rendered && this.tooltip.css(e, i)
        }, '^style.widget|content.title': function () {
          this.rendered && this._setWidget()
        }, '^style.def': function (t, e, i) {
          this.rendered && this.tooltip.toggleClass(J, !!i)
        }, '^events.(render|show|move|hide|focus|blur)$': function (t, e, i) {
          this.rendered && this.tooltip[(s.isFunction(i) ? '' : 'un') + 'bind']('tooltip' + e, i)
        }, '^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)': function () {
          if (this.rendered) {
            var t = this.options.position;
            this.tooltip.attr('tracking', 'mouse' === t.target && t.adjust.mouse), this._unassignEvents(), this._assignEvents()
          }
        }
      }
    }, T.get = function (t) {
      if (this.destroyed) return this;
      var e = h(this.options, t.toLowerCase()), i = e[0][e[1]];
      return i.precedance ? i.string() : i
    };
    var ot = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
      nt = /^prerender|show\.ready/i;
    T.set = function (t, e) {
      if (this.destroyed) return this;
      var i, o = this.rendered, n = I, r = this.options;
      this.checks;
      return 'string' == typeof t ? (i = t, t = {}, t[i] = e) : t = s.extend({}, t), s.each(t, function (e, i) {
        if (o && nt.test(e)) return void delete t[e];
        var a, l = h(r, e.toLowerCase());
        a = l[0][l[1]], l[0][l[1]] = i && i.nodeType ? s(i) : i, n = ot.test(e) || n, t[e] = [l[0], l[1], i, a]
      }), a(r), this.positioning = W, s.each(t, s.proxy(l, this)), this.positioning = I, this.rendered && this.tooltip[0].offsetWidth > 0 && n && this.reposition('mouse' === r.position.target ? k : this.cache.event), this
    }, T._update = function (t, e, i) {
      var o = this, n = this.cache;
      return this.rendered && t ? (s.isFunction(t) && (t = t.call(this.elements.target, n.event, this) || ''), s.isFunction(t.then) ? (n.waiting = W, t.then(function (t) {
        return n.waiting = I, o._update(t, e)
      }, k, function (t) {
        return o._update(t, e)
      })) : t === I || !t && '' !== t ? I : (t.jquery && t.length > 0 ? e.empty().append(t.css({
        display: 'block',
        visibility: 'visible'
      })) : e.html(t), this._waitForContent(e).then(function (t) {
        o.rendered && o.tooltip[0].offsetWidth > 0 && o.reposition(n.event, !t.length)
      }))) : I
    }, T._waitForContent = function (t) {
      var e = this.cache;
      return e.waiting = W, (s.fn.imagesLoaded ? t.imagesLoaded() : s.Deferred().resolve([])).done(function () {
        e.waiting = I
      }).promise()
    }, T._updateContent = function (t, e) {
      this._update(t, this.elements.content, e)
    }, T._updateTitle = function (t, e) {
      this._update(t, this.elements.title, e) === I && this._removeTitle(I)
    }, T._createTitle = function () {
      var t = this.elements, e = this._id + '-title';
      t.titlebar && this._removeTitle(), t.titlebar = s('<div />', { 'class': R + '-titlebar ' + (this.options.style.widget ? c('header') : '') }).append(t.title = s('<div />', {
        id: e,
        'class': R + '-title',
        'aria-atomic': W
      })).insertBefore(t.content).delegate('.qtip-close', 'mousedown keydown mouseup keyup mouseout', function (t) {
        s(this).toggleClass('ui-state-active ui-state-focus', 'down' === t.type.substr(-4))
      }).delegate('.qtip-close', 'mouseover mouseout', function (t) {
        s(this).toggleClass('ui-state-hover', 'mouseover' === t.type)
      }), this.options.content.button && this._createButton()
    }, T._removeTitle = function (t) {
      var e = this.elements;
      e.title && (e.titlebar.remove(), e.titlebar = e.title = e.button = k, t !== I && this.reposition())
    }, T._createPosClass = function (t) {
      return R + '-pos-' + (t || this.options.position.my).abbrev()
    }, T.reposition = function (i, o) {
      if (!this.rendered || this.positioning || this.destroyed) return this;
      this.positioning = W;
      var n, r, a, h, l = this.cache, c = this.tooltip, d = this.options.position, p = d.target, u = d.my, f = d.at,
        g = d.viewport, m = d.container, v = d.adjust, y = v.method.split(' '), b = c.outerWidth(I),
        w = c.outerHeight(I), _ = 0, x = 0, C = c.css('position'), q = { left: 0, top: 0 }, T = c[0].offsetWidth > 0,
        j = i && 'scroll' === i.type, z = s(t), M = m[0].ownerDocument, k = this.mouse;
      if (s.isArray(p) && 2 === p.length) f = { x: D, y: P }, q = {
        left: p[0],
        top: p[1]
      }; else if ('mouse' === p) f = {
        x: D,
        y: P
      }, (!v.mouse || this.options.hide.distance) && l.origin && l.origin.pageX ? i = l.origin : !i || i && ('resize' === i.type || 'scroll' === i.type) ? i = l.event : k && k.pageX && (i = k), 'static' !== C && (q = m.offset()), M.body.offsetWidth !== (t.innerWidth || M.documentElement.clientWidth) && (r = s(e.body).offset()), q = {
        left: i.pageX - q.left + (r && r.left || 0),
        top: i.pageY - q.top + (r && r.top || 0)
      }, v.mouse && j && k && (q.left -= (k.scrollX || 0) - z.scrollLeft(), q.top -= (k.scrollY || 0) - z.scrollTop()); else {
        if ('event' === p ? i && i.target && 'scroll' !== i.type && 'resize' !== i.type ? l.target = s(i.target) : i.target || (l.target = this.elements.target) : 'event' !== p && (l.target = s(p.jquery ? p : this.elements.target)), p = l.target, p = s(p).eq(0), 0 === p.length) return this;
        p[0] === e || p[0] === t ? (_ = st.iOS ? t.innerWidth : p.width(), x = st.iOS ? t.innerHeight : p.height(), p[0] === t && (q = {
          top: (g || p).scrollTop(),
          left: (g || p).scrollLeft()
        })) : V.imagemap && p.is('area') ? n = V.imagemap(this, p, f, V.viewport ? y : I) : V.svg && p && p[0].ownerSVGElement ? n = V.svg(this, p, f, V.viewport ? y : I) : (_ = p.outerWidth(I), x = p.outerHeight(I), q = p.offset()), n && (_ = n.width, x = n.height, r = n.offset, q = n.position), q = this.reposition.offset(p, q, m), (st.iOS > 3.1 && st.iOS < 4.1 || st.iOS >= 4.3 && st.iOS < 4.33 || !st.iOS && 'fixed' === C) && (q.left -= z.scrollLeft(), q.top -= z.scrollTop()), (!n || n && n.adjustable !== I) && (q.left += f.x === F ? _ : f.x === N ? _ / 2 : 0, q.top += f.y === B ? x : f.y === N ? x / 2 : 0)
      }
      return q.left += v.x + (u.x === F ? -b : u.x === N ? -b / 2 : 0), q.top += v.y + (u.y === B ? -w : u.y === N ? -w / 2 : 0), V.viewport ? (a = q.adjusted = V.viewport(this, q, d, _, x, b, w), r && a.left && (q.left += r.left), r && a.top && (q.top += r.top), a.my && (this.position.my = a.my)) : q.adjusted = {
        left: 0,
        top: 0
      }, l.posClass !== (h = this._createPosClass(this.position.my)) && c.removeClass(l.posClass).addClass(l.posClass = h), this._trigger('move', [q, g.elem || g], i) ? (delete q.adjusted, o === I || !T || isNaN(q.left) || isNaN(q.top) || 'mouse' === p || !s.isFunction(d.effect) ? c.css(q) : s.isFunction(d.effect) && (d.effect.call(c, this, s.extend({}, q)), c.queue(function (t) {
        s(this).css({ opacity: '', height: '' }), st.ie && this.style.removeAttribute('filter'), t()
      })), this.positioning = I, this) : this
    }, T.reposition.offset = function (t, i, o) {
      function n(t, e) {
        i.left += e * t.scrollLeft(), i.top += e * t.scrollTop()
      }

      if (!o[0]) return i;
      var r, a, h, l, c = s(t[0].ownerDocument), d = !!st.ie && 'CSS1Compat' !== e.compatMode, p = o[0];
      do 'static' !== (a = s.css(p, 'position')) && ('fixed' === a ? (h = p.getBoundingClientRect(), n(c, -1)) : (h = s(p).position(), h.left += parseFloat(s.css(p, 'borderLeftWidth')) || 0, h.top += parseFloat(s.css(p, 'borderTopWidth')) || 0), i.left -= h.left + (parseFloat(s.css(p, 'marginLeft')) || 0), i.top -= h.top + (parseFloat(s.css(p, 'marginTop')) || 0), r || 'hidden' === (l = s.css(p, 'overflow')) || 'visible' === l || (r = s(p))); while (p = p.offsetParent);
      return r && (r[0] !== c[0] || d) && n(r, 1), i
    };
    var rt = (j = T.reposition.Corner = function (t, e) {
      t = ('' + t).replace(/([A-Z])/, ' $1').replace(/middle/gi, N).toLowerCase(), this.x = (t.match(/left|right/i) || t.match(/center/) || ['inherit'])[0].toLowerCase(), this.y = (t.match(/top|bottom|center/i) || ['inherit'])[0].toLowerCase(), this.forceY = !!e;
      var i = t.charAt(0);
      this.precedance = 't' === i || 'b' === i ? S : E
    }).prototype;
    rt.invert = function (t, e) {
      this[t] = this[t] === D ? F : this[t] === F ? D : e || this[t]
    }, rt.string = function (t) {
      var e = this.x, i = this.y,
        s = e !== i ? 'center' === e || 'center' !== i && (this.precedance === S || this.forceY) ? [i, e] : [e, i] : [e];
      return t !== !1 ? s.join(' ') : s
    }, rt.abbrev = function () {
      var t = this.string(!1);
      return t[0].charAt(0) + (t[1] && t[1].charAt(0) || '')
    }, rt.clone = function () {
      return new j(this.string(), this.forceY)
    }, T.toggle = function (t, i) {
      var o = this.cache, n = this.options, r = this.tooltip;
      if (i) {
        if (/over|enter/.test(i.type) && o.event && /out|leave/.test(o.event.type) && n.show.target.add(i.target).length === n.show.target.length && r.has(i.relatedTarget).length) return this;
        o.event = s.event.fix(i)
      }
      if (this.waiting && !t && (this.hiddenDuringWait = W), !this.rendered) return t ? this.render(1) : this;
      if (this.destroyed || this.disabled) return this;
      var a, h, l, c = t ? 'show' : 'hide', d = this.options[c],
        p = (this.options[t ? 'hide' : 'show'], this.options.position), u = this.options.content,
        f = this.tooltip.css('width'), g = this.tooltip.is(':visible'), m = t || 1 === d.target.length,
        v = !i || d.target.length < 2 || o.target[0] === i.target;
      return (typeof t).search('boolean|number') && (t = !g), a = !r.is(':animated') && g === t && v, h = a ? k : !!this._trigger(c, [90]), this.destroyed ? this : (h !== I && t && this.focus(i), !h || a ? this : (s.attr(r[0], 'aria-hidden', !t), t ? (this.mouse && (o.origin = s.event.fix(this.mouse)), s.isFunction(u.text) && this._updateContent(u.text, I), s.isFunction(u.title) && this._updateTitle(u.title, I), !M && 'mouse' === p.target && p.adjust.mouse && (s(e).bind('mousemove.' + R, this._storeMouse), M = W), f || r.css('width', r.outerWidth(I)), this.reposition(i, arguments[2]), f || r.css('width', ''), d.solo && ('string' == typeof d.solo ? s(d.solo) : s(G, d.solo)).not(r).not(d.target).qtip('hide', s.Event('tooltipsolo'))) : (clearTimeout(this.timers.show), delete o.origin, M && !s(G + '[tracking="true"]:visible', d.solo).not(r).length && (s(e).unbind('mousemove.' + R), M = I), this.blur(i)), l = s.proxy(function () {
        t ? (st.ie && r[0].style.removeAttribute('filter'), r.css('overflow', ''), 'string' == typeof d.autofocus && s(this.options.show.autofocus, r).focus(), this.options.show.target.trigger('qtip-' + this.id + '-inactive')) : r.css({
          display: '',
          visibility: '',
          opacity: '',
          left: '',
          top: ''
        }), this._trigger(t ? 'visible' : 'hidden')
      }, this), d.effect === I || m === I ? (r[c](), l()) : s.isFunction(d.effect) ? (r.stop(1, 1), d.effect.call(r, this), r.queue('fx', function (t) {
        l(), t()
      })) : r.fadeTo(90, t ? 1 : 0, l), t && d.target.trigger('qtip-' + this.id + '-inactive'), this))
    }, T.show = function (t) {
      return this.toggle(W, t)
    }, T.hide = function (t) {
      return this.toggle(I, t)
    }, T.focus = function (t) {
      if (!this.rendered || this.destroyed) return this;
      var e = s(G), i = this.tooltip, o = parseInt(i[0].style.zIndex, 10), n = q.zindex + e.length;
      return i.hasClass(K) || this._trigger('focus', [n], t) && (o !== n && (e.each(function () {
        this.style.zIndex > o && (this.style.zIndex = this.style.zIndex - 1)
      }), e.filter('.' + K).qtip('blur', t)), i.addClass(K)[0].style.zIndex = n), this
    }, T.blur = function (t) {
      return !this.rendered || this.destroyed ? this : (this.tooltip.removeClass(K), this._trigger('blur', [this.tooltip.css('zIndex')], t), this)
    }, T.disable = function (t) {
      return this.destroyed ? this : ('toggle' === t ? t = !(this.rendered ? this.tooltip.hasClass(tt) : this.disabled) : 'boolean' != typeof t && (t = W), this.rendered && this.tooltip.toggleClass(tt, t).attr('aria-disabled', t), this.disabled = !!t, this)
    }, T.enable = function () {
      return this.disable(I)
    }, T._createButton = function () {
      var t = this, e = this.elements, i = e.tooltip, o = this.options.content.button, n = 'string' == typeof o,
        r = n ? o : 'Close tooltip';
      e.button && e.button.remove(), o.jquery ? e.button = o : e.button = s('<a />', {
        'class': 'qtip-close ' + (this.options.style.widget ? '' : R + '-icon'),
        title: r,
        'aria-label': r
      }).prepend(s('<span />', {
        'class': 'ui-icon ui-icon-close',
        html: '&times;'
      })), e.button.appendTo(e.titlebar || i).attr('role', 'button').click(function (e) {
        return i.hasClass(tt) || t.hide(e), I
      })
    }, T._updateButton = function (t) {
      if (!this.rendered) return I;
      var e = this.elements.button;
      t ? this._createButton() : e.remove()
    }, T._setWidget = function () {
      var t = this.options.style.widget, e = this.elements, i = e.tooltip, s = i.hasClass(tt);
      i.removeClass(tt), tt = t ? 'ui-state-disabled' : 'qtip-disabled', i.toggleClass(tt, s), i.toggleClass('ui-helper-reset ' + c(), t).toggleClass(J, this.options.style.def && !t), e.content && e.content.toggleClass(c('content'), t), e.titlebar && e.titlebar.toggleClass(c('header'), t), e.button && e.button.toggleClass(R + '-icon', !t)
    }, T._storeMouse = function (t) {
      return (this.mouse = s.event.fix(t)).type = 'mousemove', this
    }, T._bind = function (t, e, i, o, n) {
      if (t && i && e.length) {
        var r = '.' + this._id + (o ? '-' + o : '');
        return s(t).bind((e.split ? e : e.join(r + ' ')) + r, s.proxy(i, n || this)), this
      }
    }, T._unbind = function (t, e) {
      return t && s(t).unbind('.' + this._id + (e ? '-' + e : '')), this
    }, T._trigger = function (t, e, i) {
      var o = s.Event('tooltip' + t);
      return o.originalEvent = i && s.extend({}, i) || this.cache.event || k, this.triggering = t, this.tooltip.trigger(o, [this].concat(e || [])), this.triggering = I, !o.isDefaultPrevented()
    }, T._bindEvents = function (t, e, i, o, n, r) {
      var a = i.filter(o).add(o.filter(i)), h = [];
      a.length && (s.each(e, function (e, i) {
        var o = s.inArray(i, t);
        o > -1 && h.push(t.splice(o, 1)[0])
      }), h.length && (this._bind(a, h, function (t) {
        var e = !!this.rendered && this.tooltip[0].offsetWidth > 0;
        (e ? r : n).call(this, t)
      }), i = i.not(a), o = o.not(a))), this._bind(i, t, n), this._bind(o, e, r)
    }, T._assignInitialEvents = function (t) {
      function e(t) {
        return this.disabled || this.destroyed ? I : (this.cache.event = t && s.event.fix(t), this.cache.target = t && s(t.target), clearTimeout(this.timers.show), void(this.timers.show = d.call(this, function () {
          this.render('object' == typeof t || i.show.ready)
        }, i.prerender ? 0 : i.show.delay)))
      }

      var i = this.options, o = i.show.target, n = i.hide.target,
        r = i.show.event ? s.trim('' + i.show.event).split(' ') : [],
        a = i.hide.event ? s.trim('' + i.hide.event).split(' ') : [];
      this._bind(this.elements.target, ['remove', 'removeqtip'], function (t) {
        this.destroy(!0)
      }, 'destroy'), /mouse(over|enter)/i.test(i.show.event) && !/mouse(out|leave)/i.test(i.hide.event) && a.push('mouseleave'), this._bind(o, 'mousemove', function (t) {
        this._storeMouse(t), this.cache.onTarget = W
      }), this._bindEvents(r, a, o, n, e, function () {
        return this.timers ? void clearTimeout(this.timers.show) : I
      }), (i.show.ready || i.prerender) && e.call(this, t)
    }, T._assignEvents = function () {
      var i = this, o = this.options, n = o.position, r = this.tooltip, a = o.show.target, h = o.hide.target,
        l = n.container, c = n.viewport, d = s(e), m = (s(e.body), s(t)),
        v = o.show.event ? s.trim('' + o.show.event).split(' ') : [],
        y = o.hide.event ? s.trim('' + o.hide.event).split(' ') : [];
      s.each(o.events, function (t, e) {
        i._bind(r, 'toggle' === t ? ['tooltipshow', 'tooltiphide'] : ['tooltip' + t], e, null, r)
      }), /mouse(out|leave)/i.test(o.hide.event) && 'window' === o.hide.leave && this._bind(d, ['mouseout', 'blur'], function (t) {
        /select|option/.test(t.target.nodeName) || t.relatedTarget || this.hide(t)
      }), o.hide.fixed ? h = h.add(r.addClass(Q)) : /mouse(over|enter)/i.test(o.show.event) && this._bind(h, 'mouseleave', function () {
        clearTimeout(this.timers.show)
      }), ('' + o.hide.event).indexOf('unfocus') > -1 && this._bind(l.closest('html'), ['mousedown', 'touchstart'], function (t) {
        var e = s(t.target), i = this.rendered && !this.tooltip.hasClass(tt) && this.tooltip[0].offsetWidth > 0,
          o = e.parents(G).filter(this.tooltip[0]).length > 0;
        e[0] === this.target[0] || e[0] === this.tooltip[0] || o || this.target.has(e[0]).length || !i || this.hide(t)
      }), 'number' == typeof o.hide.inactive && (this._bind(a, 'qtip-' + this.id + '-inactive', f, 'inactive'), this._bind(h.add(r), q.inactiveEvents, f)), this._bindEvents(v, y, a, h, p, u), this._bind(a.add(r), 'mousemove', function (t) {
        if ('number' == typeof o.hide.distance) {
          var e = this.cache.origin || {}, i = this.options.hide.distance, s = Math.abs;
          (s(t.pageX - e.pageX) >= i || s(t.pageY - e.pageY) >= i) && this.hide(t)
        }
        this._storeMouse(t)
      }), 'mouse' === n.target && n.adjust.mouse && (o.hide.event && this._bind(a, ['mouseenter', 'mouseleave'], function (t) {
        return this.cache ? void(this.cache.onTarget = 'mouseenter' === t.type) : I
      }), this._bind(d, 'mousemove', function (t) {
        this.rendered && this.cache.onTarget && !this.tooltip.hasClass(tt) && this.tooltip[0].offsetWidth > 0 && this.reposition(t)
      })), (n.adjust.resize || c.length) && this._bind(s.event.special.resize ? c : m, 'resize', g), n.adjust.scroll && this._bind(m.add(n.container), 'scroll', g)
    }, T._unassignEvents = function () {
      var i = this.options, o = i.show.target, n = i.hide.target,
        r = s.grep([this.elements.target[0], this.rendered && this.tooltip[0], i.position.container[0], i.position.viewport[0], i.position.container.closest('html')[0], t, e], function (t) {
          return 'object' == typeof t
        });
      o && o.toArray && (r = r.concat(o.toArray())), n && n.toArray && (r = r.concat(n.toArray())), this._unbind(r)._unbind(r, 'destroy')._unbind(r, 'inactive')
    }, s(function () {
      m(G, ['mouseenter', 'mouseleave'], function (t) {
        var e = 'mouseenter' === t.type, i = s(t.currentTarget), o = s(t.relatedTarget || t.target), n = this.options;
        e ? (this.focus(t), i.hasClass(Q) && !i.hasClass(tt) && clearTimeout(this.timers.hide)) : 'mouse' === n.position.target && n.position.adjust.mouse && n.hide.event && n.show.target && !o.closest(n.show.target[0]).length && this.hide(t), i.toggleClass(Z, e)
      }), m('[' + X + ']', U, f)
    }), q = s.fn.qtip = function (t, e, o) {
      var n = ('' + t).toLowerCase(), r = k, h = s.makeArray(arguments).slice(1), l = h[h.length - 1],
        c = this[0] ? s.data(this[0], R) : k;
      return !arguments.length && c || 'api' === n ? c : 'string' == typeof t ? (this.each(function () {
        var t = s.data(this, R);
        if (!t) return W;
        if (l && l.timeStamp && (t.cache.event = l), !e || 'option' !== n && 'options' !== n) t[n] && t[n].apply(t, h); else {
          if (o === i && !s.isPlainObject(e)) return r = t.get(e), I;
          t.set(e, o)
        }
      }), r !== k ? r : this) : 'object' != typeof t && arguments.length ? void 0 : (c = a(s.extend(W, {}, t)), this.each(function (t) {
        var e, i;
        return i = s.isArray(c.id) ? c.id[t] : c.id, i = !i || i === I || i.length < 1 || q.api[i] ? q.nextid++ : i, e = v(s(this), i, c), e === I ? W : (q.api[i] = e, s.each(V, function () {
          'initialize' === this.initialize && this(e)
        }), void e._assignInitialEvents(l))
      }))
    }, s.qtip = o, q.api = {}, s.each({
      attr: function (t, e) {
        if (this.length) {
          var i = this[0], o = 'title', n = s.data(i, 'qtip');
          if (t === o && n && 'object' == typeof n && n.options.suppress) return arguments.length < 2 ? s.attr(i, it) : (n && n.options.content.attr === o && n.cache.attr && n.set('content.text', e), this.attr(it, e))
        }
        return s.fn['attr' + et].apply(this, arguments)
      }, clone: function (t) {
        var e = (s([]), s.fn['clone' + et].apply(this, arguments));
        return t || e.filter('[' + it + ']').attr('title', function () {
          return s.attr(this, it)
        }).removeAttr(it), e
      }
    }, function (t, e) {
      if (!e || s.fn[t + et]) return W;
      var i = s.fn[t + et] = s.fn[t];
      s.fn[t] = function () {
        return e.apply(this, arguments) || i.apply(this, arguments)
      }
    }), s.ui || (s['cleanData' + et] = s.cleanData, s.cleanData = function (t) {
      for (var e, i = 0; (e = s(t[i])).length; i++) if (e.attr(H)) try {
        e.triggerHandler('removeqtip')
      } catch (o) {
      }
      s['cleanData' + et].apply(this, arguments)
    }), q.version = '2.2.1', q.nextid = 0, q.inactiveEvents = U, q.zindex = 15e3, q.defaults = {
      prerender: I,
      id: I,
      overwrite: W,
      suppress: W,
      content: { text: W, attr: 'title', title: I, button: I },
      position: {
        my: 'top left',
        at: 'bottom right',
        target: I,
        container: I,
        viewport: I,
        adjust: { x: 0, y: 0, mouse: W, scroll: W, resize: W, method: 'flipinvert flipinvert' },
        effect: function (t, e, i) {
          s(this).animate(e, { duration: 200, queue: I })
        }
      },
      show: { target: I, event: 'mouseenter', effect: W, delay: 90, solo: I, ready: I, autofocus: I },
      hide: {
        target: I,
        event: 'mouseleave',
        effect: W,
        delay: 0,
        fixed: I,
        inactive: I,
        leave: 'window',
        distance: I
      },
      style: { classes: '', widget: I, width: I, height: I, def: W },
      events: { render: k, move: k, show: k, hide: k, toggle: k, visible: k, hidden: k, focus: k, blur: k }
    };
    var at, ht = 'margin', lt = 'border', ct = 'color', dt = 'background-color', pt = 'transparent', ut = ' !important',
      ft = !!e.createElement('canvas').getContext, gt = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i, mt = {},
      vt = ['Webkit', 'O', 'Moz', 'ms'];
    if (ft) var yt = t.devicePixelRatio || 1, bt = function () {
      var t = e.createElement('canvas').getContext('2d');
      return t.backingStorePixelRatio || t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || 1
    }(), wt = yt / bt; else var _t = function (t, e, i) {
      return '<qtipvml:' + t + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (e || '') + ' style="behavior: url(#default#VML); ' + (i || '') + '" />'
    };
    s.extend(_.prototype, {
      init: function (t) {
        var e, i;
        i = this.element = t.elements.tip = s('<div />', { 'class': R + '-tip' }).prependTo(t.tooltip), ft ? (e = s('<canvas />').appendTo(this.element)[0].getContext('2d'), e.lineJoin = 'miter', e.miterLimit = 1e5, e.save()) : (e = _t('shape', 'coordorigin="0,0"', 'position:absolute;'), this.element.html(e + e), t._bind(s('*', i).add(i), ['click', 'mousedown'], function (t) {
          t.stopPropagation()
        }, this._ns)), t._bind(t.tooltip, 'tooltipmove', this.reposition, this._ns, this), this.create()
      }, _swapDimensions: function () {
        this.size[0] = this.options.height, this.size[1] = this.options.width
      }, _resetDimensions: function () {
        this.size[0] = this.options.width, this.size[1] = this.options.height
      }, _useTitle: function (t) {
        var e = this.qtip.elements.titlebar;
        return e && (t.y === P || t.y === N && this.element.position().top + this.size[1] / 2 + this.options.offset < e.outerHeight(W))
      }, _parseCorner: function (t) {
        var e = this.qtip.options.position.my;
        return t === I || e === I ? t = I : t === W ? t = new j(e.string()) : t.string || (t = new j(t), t.fixed = W), t
      }, _parseWidth: function (t, e, i) {
        var s = this.qtip.elements, o = lt + y(e) + 'Width';
        return (i ? w(i, o) : w(s.content, o) || w(this._useTitle(t) && s.titlebar || s.content, o) || w(s.tooltip, o)) || 0
      }, _parseRadius: function (t) {
        var e = this.qtip.elements, i = lt + y(t.y) + y(t.x) + 'Radius';
        return st.ie < 9 ? 0 : w(this._useTitle(t) && e.titlebar || e.content, i) || w(e.tooltip, i) || 0
      }, _invalidColour: function (t, e, i) {
        var s = t.css(e);
        return !s || i && s === t.css(i) || gt.test(s) ? I : s
      }, _parseColours: function (t) {
        var e = this.qtip.elements, i = this.element.css('cssText', ''), o = lt + y(t[t.precedance]) + y(ct),
          n = this._useTitle(t) && e.titlebar || e.content, r = this._invalidColour, a = [];
        return a[0] = r(i, dt) || r(n, dt) || r(e.content, dt) || r(e.tooltip, dt) || i.css(dt), a[1] = r(i, o, ct) || r(n, o, ct) || r(e.content, o, ct) || r(e.tooltip, o, ct) || e.tooltip.css(o), s('*', i).add(i).css('cssText', dt + ':' + pt + ut + ';' + lt + ':0' + ut + ';'), a
      }, _calculateSize: function (t) {
        var e, i, s, o = t.precedance === S, n = this.options.width, r = this.options.height, a = 'c' === t.abbrev(),
          h = (o ? n : r) * (a ? .5 : 1), l = Math.pow, c = Math.round, d = Math.sqrt(l(h, 2) + l(r, 2)),
          p = [this.border / h * d, this.border / r * d];
        return p[2] = Math.sqrt(l(p[0], 2) - l(this.border, 2)), p[3] = Math.sqrt(l(p[1], 2) - l(this.border, 2)), e = d + p[2] + p[3] + (a ? 0 : p[0]), i = e / d, s = [c(i * n), c(i * r)], o ? s : s.reverse()
      }, _calculateTip: function (t, e, i) {
        i = i || 1, e = e || this.size;
        var s = e[0] * i, o = e[1] * i, n = Math.ceil(s / 2), r = Math.ceil(o / 2), a = {
          br: [0, 0, s, o, s, 0],
          bl: [0, 0, s, 0, 0, o],
          tr: [0, o, s, 0, s, o],
          tl: [0, 0, 0, o, s, o],
          tc: [0, o, n, 0, s, o],
          bc: [0, 0, s, 0, n, o],
          rc: [0, 0, s, r, 0, o],
          lc: [s, 0, s, o, 0, r]
        };
        return a.lt = a.br, a.rt = a.bl, a.lb = a.tr, a.rb = a.tl, a[t.abbrev()]
      }, _drawCoords: function (t, e) {
        t.beginPath(), t.moveTo(e[0], e[1]), t.lineTo(e[2], e[3]), t.lineTo(e[4], e[5]), t.closePath()
      }, create: function () {
        var t = this.corner = (ft || st.ie) && this._parseCorner(this.options.corner);
        return (this.enabled = !!this.corner && 'c' !== this.corner.abbrev()) && (this.qtip.cache.corner = t.clone(), this.update()), this.element.toggle(this.enabled), this.corner
      }, update: function (e, i) {
        if (!this.enabled) return this;
        var o, n, r, a, h, l, c, d, p = this.qtip.elements, u = this.element, f = u.children(), g = this.options,
          m = this.size, v = g.mimic, y = Math.round;
        e || (e = this.qtip.cache.corner || this.corner), v === I ? v = e : (v = new j(v), v.precedance = e.precedance, 'inherit' === v.x ? v.x = e.x : 'inherit' === v.y ? v.y = e.y : v.x === v.y && (v[e.precedance] = e[e.precedance])), n = v.precedance, e.precedance === E ? this._swapDimensions() : this._resetDimensions(), o = this.color = this._parseColours(e), o[1] !== pt ? (d = this.border = this._parseWidth(e, e[e.precedance]), g.border && d < 1 && !gt.test(o[1]) && (o[0] = o[1]), this.border = d = g.border !== W ? g.border : d) : this.border = d = 0, c = this.size = this._calculateSize(e), u.css({
          width: c[0],
          height: c[1],
          lineHeight: c[1] + 'px'
        }), l = e.precedance === S ? [y(v.x === D ? d : v.x === F ? c[0] - m[0] - d : (c[0] - m[0]) / 2), y(v.y === P ? c[1] - m[1] : 0)] : [y(v.x === D ? c[0] - m[0] : 0), y(v.y === P ? d : v.y === B ? c[1] - m[1] - d : (c[1] - m[1]) / 2)], ft ? (r = f[0].getContext('2d'), r.restore(), r.save(), r.clearRect(0, 0, 6e3, 6e3), a = this._calculateTip(v, m, wt), h = this._calculateTip(v, this.size, wt), f.attr(A, c[0] * wt).attr(L, c[1] * wt), f.css(A, c[0]).css(L, c[1]), this._drawCoords(r, h), r.fillStyle = o[1], r.fill(), r.translate(l[0] * wt, l[1] * wt), this._drawCoords(r, a), r.fillStyle = o[0], r.fill()) : (a = this._calculateTip(v), a = 'm' + a[0] + ',' + a[1] + ' l' + a[2] + ',' + a[3] + ' ' + a[4] + ',' + a[5] + ' xe', l[2] = d && /^(r|b)/i.test(e.string()) ? 8 === st.ie ? 2 : 1 : 0, f.css({
          coordsize: c[0] + d + ' ' + (c[1] + d),
          antialias: '' + (v.string().indexOf(N) > -1),
          left: l[0] - l[2] * Number(n === E),
          top: l[1] - l[2] * Number(n === S),
          width: c[0] + d,
          height: c[1] + d
        }).each(function (t) {
          var e = s(this);
          e[e.prop ? 'prop' : 'attr']({
            coordsize: c[0] + d + ' ' + (c[1] + d),
            path: a,
            fillcolor: o[0],
            filled: !!t,
            stroked: !t
          }).toggle(!(!d && !t)), !t && e.html(_t('stroke', 'weight="' + 2 * d + 'px" color="' + o[1] + '" miterlimit="1000" joinstyle="miter"'))
        })), t.opera && setTimeout(function () {
          p.tip.css({ display: 'inline-block', visibility: 'visible' })
        }, 1), i !== I && this.calculate(e, c)
      }, calculate: function (t, e) {
        if (!this.enabled) return I;
        var i, o, n = this, r = this.qtip.elements, a = this.element, h = this.options.offset,
          l = (r.tooltip.hasClass('ui-widget'),
            {});
        return t = t || this.corner, i = t.precedance, e = e || this._calculateSize(t), o = [t.x, t.y], i === E && o.reverse(), s.each(o, function (s, o) {
          var a, c, d;
          o === N ? (a = i === S ? D : P, l[a] = '50%', l[ht + '-' + a] = -Math.round(e[i === S ? 0 : 1] / 2) + h) : (a = n._parseWidth(t, o, r.tooltip), c = n._parseWidth(t, o, r.content), d = n._parseRadius(t), l[o] = Math.max(-n.border, s ? c : h + (d > a ? d : -a)))
        }), l[t[i]] -= e[i === E ? 0 : 1], a.css({ margin: '', top: '', bottom: '', left: '', right: '' }).css(l), l
      }, reposition: function (t, e, s, o) {
        function n(t, e, i, s, o) {
          t === $ && c.precedance === e && d[s] && c[i] !== N ? c.precedance = c.precedance === E ? S : E : t !== $ && d[s] && (c[e] = c[e] === N ? d[s] > 0 ? s : o : c[e] === s ? o : s)
        }

        function r(t, e, o) {
          c[t] === N ? m[ht + '-' + e] = g[t] = a[ht + '-' + e] - d[e] : (h = a[o] !== i ? [d[e], -a[e]] : [-d[e], a[e]], (g[t] = Math.max(h[0], h[1])) > h[0] && (s[e] -= d[e], g[e] = I), m[a[o] !== i ? o : e] = g[t])
        }

        if (this.enabled) {
          var a, h, l = e.cache, c = this.corner.clone(), d = s.adjusted,
            p = e.options.position.adjust.method.split(' '), u = p[0], f = p[1] || p[0],
            g = { left: I, top: I, x: 0, y: 0 }, m = {};
          this.corner.fixed !== W && (n(u, E, S, D, F), n(f, S, E, P, B), c.string() === l.corner.string() && l.cornerTop === d.top && l.cornerLeft === d.left || this.update(c, I)), a = this.calculate(c), a.right !== i && (a.left = -a.right), a.bottom !== i && (a.top = -a.bottom), a.user = this.offset, (g.left = u === $ && !!d.left) && r(E, D, F), (g.top = f === $ && !!d.top) && r(S, P, B), this.element.css(m).toggle(!(g.x && g.y || c.x === N && g.y || c.y === N && g.x)), s.left -= a.left.charAt ? a.user : u !== $ || g.top || !g.left && !g.top ? a.left + this.border : 0, s.top -= a.top.charAt ? a.user : f !== $ || g.left || !g.left && !g.top ? a.top + this.border : 0, l.cornerLeft = d.left, l.cornerTop = d.top, l.corner = c.clone()
        }
      }, destroy: function () {
        this.qtip._unbind(this.qtip.tooltip, this._ns), this.qtip.elements.tip && this.qtip.elements.tip.find('*').remove().end().remove()
      }
    }), at = V.tip = function (t) {
      return new _(t, t.options.style.tip)
    }, at.initialize = 'render', at.sanitize = function (t) {
      if (t.style && 'tip' in t.style) {
        var e = t.style.tip;
        'object' != typeof e && (e = t.style.tip = { corner: e }), /string|boolean/i.test(typeof e.corner) || (e.corner = W)
      }
    }, z.tip = {
      '^position.my|style.tip.(corner|mimic|border)$': function () {
        this.create(), this.qtip.reposition()
      }, '^style.tip.(height|width)$': function (t) {
        this.size = [t.width, t.height], this.update(), this.qtip.reposition()
      }, '^content.title|style.(classes|widget)$': function () {
        this.update()
      }
    }, s.extend(W, q.defaults, { style: { tip: { corner: W, mimic: I, width: 6, height: 6, border: W, offset: 0 } } });
    var xt, Ct, qt = 'qtip-modal', Tt = '.' + qt;
    Ct = function () {
      function t(t) {
        if (s.expr[':'].focusable) return s.expr[':'].focusable;
        var e, i, o, n = !isNaN(s.attr(t, 'tabindex')), r = t.nodeName && t.nodeName.toLowerCase();
        return 'area' === r ? (e = t.parentNode, i = e.name, !(!t.href || !i || 'map' !== e.nodeName.toLowerCase()) && (o = s('img[usemap=#' + i + ']')[0], !!o && o.is(':visible'))) : /input|select|textarea|button|object/.test(r) ? !t.disabled : 'a' === r ? t.href || n : n
      }

      function i(t) {
        c.length < 1 && t.length ? t.not('body').blur() : c.first().focus()
      }

      function o(t) {
        if (h.is(':visible')) {
          var e, o = s(t.target), a = n.tooltip, l = o.closest(G);
          e = l.length < 1 ? I : parseInt(l[0].style.zIndex, 10) > parseInt(a[0].style.zIndex, 10), e || o.closest(G)[0] === a[0] || i(o), r = t.target === c[c.length - 1]
        }
      }

      var n, r, a, h, l = this, c = {};
      s.extend(l, {
        init: function () {
          return h = l.elem = s('<div />', {
            id: 'qtip-overlay', html: '<div></div>', mousedown: function () {
              return I
            }
          }).hide(), s(e.body).bind('focusin' + Tt, o), s(e).bind('keydown' + Tt, function (t) {
            n && n.options.show.modal.escape && 27 === t.keyCode && n.hide(t)
          }), h.bind('click' + Tt, function (t) {
            n && n.options.show.modal.blur && n.hide(t)
          }), l
        }, update: function (e) {
          n = e, c = e.options.show.modal.stealfocus !== I ? e.tooltip.find('*').filter(function () {
            return t(this)
          }) : []
        }, toggle: function (t, o, r) {
          var c = (s(e.body), t.tooltip), d = t.options.show.modal, p = d.effect, u = o ? 'show' : 'hide',
            f = h.is(':visible'), g = s(Tt).filter(':visible:not(:animated)').not(c);
          return l.update(t), o && d.stealfocus !== I && i(s(':focus')), h.toggleClass('blurs', d.blur), o && h.appendTo(e.body), h.is(':animated') && f === o && a !== I || !o && g.length ? l : (h.stop(W, I), s.isFunction(p) ? p.call(h, o) : p === I ? h[u]() : h.fadeTo(parseInt(r, 10) || 90, o ? 1 : 0, function () {
            o || h.hide()
          }), o || h.queue(function (t) {
            h.css({ left: '', top: '' }), s(Tt).length || h.detach(), t()
          }), a = o, n.destroyed && (n = k), l)
        }
      }), l.init()
    }, Ct = new Ct, s.extend(x.prototype, {
      init: function (t) {
        var e = t.tooltip;
        return this.options.on ? (t.elements.overlay = Ct.elem, e.addClass(qt).css('z-index', q.modal_zindex + s(Tt).length), t._bind(e, ['tooltipshow', 'tooltiphide'], function (t, i, o) {
          var n = t.originalEvent;
          if (t.target === e[0]) if (n && 'tooltiphide' === t.type && /mouse(leave|enter)/.test(n.type) && s(n.relatedTarget).closest(Ct.elem[0]).length) try {
            t.preventDefault()
          } catch (r) {
          } else (!n || n && 'tooltipsolo' !== n.type) && this.toggle(t, 'tooltipshow' === t.type, o)
        }, this._ns, this), t._bind(e, 'tooltipfocus', function (t, i) {
          if (!t.isDefaultPrevented() && t.target === e[0]) {
            var o = s(Tt), n = q.modal_zindex + o.length, r = parseInt(e[0].style.zIndex, 10);
            Ct.elem[0].style.zIndex = n - 1, o.each(function () {
              this.style.zIndex > r && (this.style.zIndex -= 1)
            }), o.filter('.' + K).qtip('blur', t.originalEvent), e.addClass(K)[0].style.zIndex = n, Ct.update(i);
            try {
              t.preventDefault()
            } catch (a) {
            }
          }
        }, this._ns, this), void t._bind(e, 'tooltiphide', function (t) {
          t.target === e[0] && s(Tt).filter(':visible').not(e).last().qtip('focus', t)
        }, this._ns, this)) : this
      }, toggle: function (t, e, i) {
        return t && t.isDefaultPrevented() ? this : void Ct.toggle(this.qtip, !!e, i)
      }, destroy: function () {
        this.qtip.tooltip.removeClass(qt), this.qtip._unbind(this.qtip.tooltip, this._ns), Ct.toggle(this.qtip, I), delete this.qtip.elements.overlay
      }
    }), xt = V.modal = function (t) {
      return new x(t, t.options.show.modal)
    }, xt.sanitize = function (t) {
      t.show && ('object' != typeof t.show.modal ? t.show.modal = { on: !!t.show.modal } : 'undefined' == typeof t.show.modal.on && (t.show.modal.on = W))
    }, q.modal_zindex = q.zindex - 200, xt.initialize = 'render', z.modal = {
      '^show.modal.(on|blur)$': function () {
        this.destroy(), this.init(), this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth > 0)
      }
    }, s.extend(W, q.defaults, {
      show: {
        modal: {
          on: I,
          effect: W,
          blur: W,
          stealfocus: W,
          escape: W
        }
      }
    }), V.viewport = function (i, s, o, n, r, a, h) {
      function l(t, e, i, o, n, r, a, h, l) {
        var c = s[n], y = w[t], b = _[t], x = i === $, C = y === n ? l : y === r ? -l : -l / 2,
          q = b === n ? h : b === r ? -h : -h / 2, T = m[n] + v[n] - (u ? 0 : p[n]), j = T - c,
          z = c + l - (a === A ? f : g) - T, M = C - (w.precedance === t || y === w[e] ? q : 0) - (b === N ? h / 2 : 0);
        return x ? (M = (y === n ? 1 : -1) * C, s[n] += j > 0 ? j : z > 0 ? -z : 0, s[n] = Math.max(-p[n] + v[n], c - M, Math.min(Math.max(-p[n] + v[n] + (a === A ? f : g), c + M), s[n], 'center' === y ? c - C : 1e9))) : (o *= i === O ? 2 : 0, j > 0 && (y !== n || z > 0) ? (s[n] -= M + o, d.invert(t, n)) : z > 0 && (y !== r || j > 0) && (s[n] -= (y === N ? -M : M) + o, d.invert(t, r)), s[n] < m && -s[n] > z && (s[n] = c, d = w.clone())), s[n] - c
      }

      var c, d, p, u, f, g, m, v, y = o.target, b = i.elements.tooltip, w = o.my, _ = o.at, x = o.adjust,
        C = x.method.split(' '), q = C[0], T = C[1] || C[0], j = o.viewport, z = o.container,
        M = (i.cache, { left: 0, top: 0 });
      return j.jquery && y[0] !== t && y[0] !== e.body && 'none' !== x.method ? (p = z.offset() || M, u = 'static' === z.css('position'), c = 'fixed' === b.css('position'), f = j[0] === t ? j.width() : j.outerWidth(I), g = j[0] === t ? j.height() : j.outerHeight(I), m = {
        left: c ? 0 : j.scrollLeft(),
        top: c ? 0 : j.scrollTop()
      }, v = j.offset() || M, 'shift' === q && 'shift' === T || (d = w.clone()), M = {
        left: 'none' !== q ? l(E, S, q, x.x, D, F, A, n, a) : 0,
        top: 'none' !== T ? l(S, E, T, x.y, P, B, L, r, h) : 0,
        my: d
      }) : M
    }, V.polys = {
      polygon: function (t, e) {
        var i, s, o,
          n = { width: 0, height: 0, position: { top: 1e10, right: 0, bottom: 0, left: 1e10 }, adjustable: I }, r = 0,
          a = [], h = 1, l = 1, c = 0, d = 0;
        for (r = t.length; r--;) i = [parseInt(t[--r], 10), parseInt(t[r + 1], 10)], i[0] > n.position.right && (n.position.right = i[0]), i[0] < n.position.left && (n.position.left = i[0]), i[1] > n.position.bottom && (n.position.bottom = i[1]), i[1] < n.position.top && (n.position.top = i[1]), a.push(i);
        if (s = n.width = Math.abs(n.position.right - n.position.left), o = n.height = Math.abs(n.position.bottom - n.position.top), 'c' === e.abbrev()) n.position = {
          left: n.position.left + n.width / 2,
          top: n.position.top + n.height / 2
        }; else {
          for (; s > 0 && o > 0 && h > 0 && l > 0;) for (s = Math.floor(s / 2), o = Math.floor(o / 2), e.x === D ? h = s : e.x === F ? h = n.width - s : h += Math.floor(s / 2), e.y === P ? l = o : e.y === B ? l = n.height - o : l += Math.floor(o / 2), r = a.length; r-- && !(a.length < 2);) c = a[r][0] - n.position.left, d = a[r][1] - n.position.top, (e.x === D && c >= h || e.x === F && c <= h || e.x === N && (c < h || c > n.width - h) || e.y === P && d >= l || e.y === B && d <= l || e.y === N && (d < l || d > n.height - l)) && a.splice(r, 1);
          n.position = { left: a[0][0], top: a[0][1] }
        }
        return n
      },
      rect: function (t, e, i, s) {
        return {
          width: Math.abs(i - t),
          height: Math.abs(s - e),
          position: { left: Math.min(t, i), top: Math.min(e, s) }
        }
      },
      _angles: { tc: 1.5, tr: 7 / 4, tl: 5 / 4, bc: .5, br: .25, bl: .75, rc: 2, lc: 1, c: 0 },
      ellipse: function (t, e, i, s, o) {
        var n = V.polys._angles[o.abbrev()], r = 0 === n ? 0 : i * Math.cos(n * Math.PI), a = s * Math.sin(n * Math.PI);
        return {
          width: 2 * i - Math.abs(r),
          height: 2 * s - Math.abs(a),
          position: { left: t + r, top: e + a },
          adjustable: I
        }
      },
      circle: function (t, e, i, s) {
        return V.polys.ellipse(t, e, i, i, s)
      }
    }, V.svg = function (t, i, o) {
      for (var n, r, a, h, l, c, d, p, u, f = (s(e), i[0]), g = s(f.ownerSVGElement), m = f.ownerDocument, v = (parseInt(i.css('stroke-width'), 10) || 0) / 2; !f.getBBox;) f = f.parentNode;
      if (!f.getBBox || !f.parentNode) return I;
      switch (f.nodeName) {
        case'ellipse':
        case'circle':
          p = V.polys.ellipse(f.cx.baseVal.value, f.cy.baseVal.value, (f.rx || f.r).baseVal.value + v, (f.ry || f.r).baseVal.value + v, o);
          break;
        case'line':
        case'polygon':
        case'polyline':
          for (d = f.points || [{ x: f.x1.baseVal.value, y: f.y1.baseVal.value }, {
            x: f.x2.baseVal.value,
            y: f.y2.baseVal.value
          }], p = [], c = -1, h = d.numberOfItems || d.length; ++c < h;) l = d.getItem ? d.getItem(c) : d[c], p.push.apply(p, [l.x, l.y]);
          p = V.polys.polygon(p, o);
          break;
        default:
          p = f.getBBox(), p = { width: p.width, height: p.height, position: { left: p.x, top: p.y } }
      }
      return u = p.position, g = g[0], g.createSVGPoint && (r = f.getScreenCTM(), d = g.createSVGPoint(), d.x = u.left, d.y = u.top, a = d.matrixTransform(r), u.left = a.x, u.top = a.y), m !== e && 'mouse' !== t.position.target && (n = s((m.defaultView || m.parentWindow).frameElement).offset(), n && (u.left += n.left, u.top += n.top)), m = s(m), u.left += m.scrollLeft(), u.top += m.scrollTop(), p
    }, V.imagemap = function (t, e, i, o) {
      e.jquery || (e = s(e));
      var n, r, a, h, l, c = (e.attr('shape') || 'rect').toLowerCase().replace('poly', 'polygon'),
        d = s('img[usemap="#' + e.parent('map').attr('name') + '"]'), p = s.trim(e.attr('coords')),
        u = p.replace(/,$/, '').split(',');
      if (!d.length) return I;
      if ('polygon' === c) h = V.polys.polygon(u, i); else {
        if (!V.polys[c]) return I;
        for (a = -1, l = u.length, r = []; ++a < l;) r.push(parseInt(u[a], 10));
        h = V.polys[c].apply(this, r.concat(i))
      }
      return n = d.offset(), n.left += Math.ceil((d.outerWidth(I) - d.width()) / 2), n.top += Math.ceil((d.outerHeight(I) - d.height()) / 2), h.position.left += n.left, h.position.top += n.top, h
    };
    var jt,
      zt = '<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';
    s.extend(C.prototype, {
      _scroll: function () {
        var e = this.qtip.elements.overlay;
        e && (e[0].style.top = s(t).scrollTop() + 'px')
      }, init: function (i) {
        var o = i.tooltip;
        s('select, object').length < 1 && (this.bgiframe = i.elements.bgiframe = s(zt).appendTo(o), i._bind(o, 'tooltipmove', this.adjustBGIFrame, this._ns, this)), this.redrawContainer = s('<div/>', { id: R + '-rcontainer' }).appendTo(e.body), i.elements.overlay && i.elements.overlay.addClass('qtipmodal-ie6fix') && (i._bind(t, ['scroll', 'resize'], this._scroll, this._ns, this), i._bind(o, ['tooltipshow'], this._scroll, this._ns, this)), this.redraw()
      }, adjustBGIFrame: function () {
        var t, e, i = this.qtip.tooltip, s = { height: i.outerHeight(I), width: i.outerWidth(I) },
          o = this.qtip.plugins.tip, n = this.qtip.elements.tip;
        e = parseInt(i.css('borderLeftWidth'), 10) || 0, e = {
          left: -e,
          top: -e
        }, o && n && (t = 'x' === o.corner.precedance ? [A, D] : [L, P], e[t[1]] -= n[t[0]]()), this.bgiframe.css(e).css(s)
      }, redraw: function () {
        if (this.qtip.rendered < 1 || this.drawing) return this;
        var t, e, i, s, o = this.qtip.tooltip, n = this.qtip.options.style, r = this.qtip.options.position.container;
        return this.qtip.drawing = 1, n.height && o.css(L, n.height), n.width ? o.css(A, n.width) : (o.css(A, '').appendTo(this.redrawContainer), e = o.width(), e % 2 < 1 && (e += 1), i = o.css('maxWidth') || '', s = o.css('minWidth') || '', t = (i + s).indexOf('%') > -1 ? r.width() / 100 : 0, i = (i.indexOf('%') > -1 ? t : 1) * parseInt(i, 10) || e, s = (s.indexOf('%') > -1 ? t : 1) * parseInt(s, 10) || 0, e = i + s ? Math.min(Math.max(e, s), i) : e, o.css(A, Math.round(e)).appendTo(r)), this.drawing = 0, this
      }, destroy: function () {
        this.bgiframe && this.bgiframe.remove(), this.qtip._unbind([t, this.qtip.tooltip], this._ns)
      }
    }), jt = V.ie6 = function (t) {
      return 6 === st.ie ? new C(t) : I
    }, jt.initialize = 'render', z.ie6 = {
      '^content|style$': function () {
        this.redraw()
      }
    }
  })
}(window, document);

function give_load_gateway(e, i) {
  var t = jQuery(e).find('#give-payment-mode-select .give-loading-text'), a = jQuery(e).find('#give-amount').val(),
    o = jQuery(e).find('input[name="give-form-id"]').val();
  t.fadeIn();
  var n = jQuery(e).data();
  1 != n['blockUI.isBlocked'] && jQuery(e).find('#give_purchase_form_wrap').block({
    message: null,
    overlayCSS: { background: '#fff', opacity: .6 }
  }), jQuery.post(give_scripts.ajaxurl + '?payment-mode=' + i, {
    action: 'give_load_gateway',
    give_total: a,
    give_form_id: o,
    give_payment_mode: i
  }, function (i) {
    jQuery(e).unblock(), jQuery(e).find('#give_purchase_form_wrap').html(i), jQuery('.give-no-js').hide(), jQuery(e).find('#give-payment-mode-select .give-loading-text').fadeOut(), setup_give_tooltips(), jQuery(document).trigger('give_gateway_loaded', [i, jQuery(e).attr('id')])
  })
}

function setup_give_tooltips() {
  jQuery('[data-tooltip!=""]').qtip({
    content: { attr: 'data-tooltip' },
    style: { classes: 'qtip-rounded qtip-tipsy' },
    position: { my: 'bottom center', at: 'top center' }
  }), jQuery.fn.qtip.zindex = 2147483641
}

var give_scripts, give_global_vars;
jQuery(document).ready(function (e) {
  setup_give_tooltips(), e('.give-loading-text').hide(), e(document).on('click', '.give-checkout-login', function (i) {
    var t = e(this), a = e(this).parents('form'),
      o = e(a).find('[id^="give-checkout-login-register"] .give-loading-text'),
      n = { action: t.data('action'), form_id: e(a).find('[name="give-form-id"]').val() };
    return o.show(), e.post(give_scripts.ajaxurl, n, function (i) {
      e(a).find('[id^=give-checkout-login-register]').html(i), e(a).find('.give-submit-button-wrap').hide()
    }).done(function () {
      o.hide(), give_fl_trigger(), setup_give_tooltips()
    }), !1
  }), e(document).on('click', '.give-checkout-register-cancel', function (i) {
    i.preventDefault();
    var t = e(this), a = e(this).parents('form'),
      o = { action: t.data('action'), form_id: e(a).find('[name="give-form-id"]').val() };
    e.post(give_scripts.ajaxurl, o, function (i) {
      e(a).find('[id^=give-checkout-login-register]').html(e.parseJSON(i.fields)), e(a).find('.give-submit-button-wrap').show()
    }).done(function () {
      give_fl_trigger(), setup_give_tooltips()
    })
  }), e(document).on('click', '[id^=give-login-fields] input[type=submit]', function (i) {
    i.preventDefault();
    var t = e(this).val(), a = e(this).parents('form');
    e(this).val(give_global_vars.purchase_loading), a.find('[id^=give-login-fields] .give-loading-animation').fadeIn();
    var o = {
      action: 'give_process_donation_login',
      give_ajax: 1,
      give_user_login: a.find('[name=give_user_login]').val(),
      give_user_pass: a.find('[name=give_user_pass]').val()
    };
    e.post(give_global_vars.ajaxurl, o, function (i) {
      void 0 != e.trim(typeof i.success) && 1 == i.success && void 0 != typeof i.data ? (a.find('.give_errors').remove(), a.find('#give-payment-mode-select').after(i.data), a.find('.give_notices.give_errors').delay(5e3).slideUp(), give_load_gateway(a, a.find('.give-gateway-option-selected input').val())) : (a.find('[id^=give-login-fields] input[type=submit]').val(t), a.find('.give-loading-animation').fadeOut(), a.find('.give_errors').remove(), a.find('[id^=give-user-login-submit]').before(i.data))
    })
  }), e('select#give-gateway, input.give-gateway').on('change', function (i) {
    i.preventDefault();
    var t = e(this).val();
    return '0' == t ? (console.log('There was a problem loading the selected gateway'), !1) : (give_load_gateway(e(this).parents('form'), t), !1)
  }), e('body').on('click', '#give-confirm-email-btn', function (i) {
    var t = e(this),
      a = { action: 'give_confirm_email_for_donations_access', email: t.data('email'), nonce: give_scripts.ajaxNonce };
    return t.text(give_global_vars.loading), t.attr('disabled', 'disabled'), e.post(give_global_vars.ajaxurl, a, function (e) {
      e = JSON.parse(e), 'error' === e.status ? (t.closest('#give_user_history tfoot').hide(), t.closest('.give_user_history_main').find('.give_user_history_notice').html(e.message)) : 'success' === e.status && (t.closest('.give_user_history_main').find('.give_user_history_notice').html(e.message), t.hide(), t.closest('.give-security-button-wrap').find('span').show())
    }), !1
  }), e('body').on('click touchend', 'form.give-form input[name="give-purchase"].give-submit', function (i) {
    var t = e(this).parents('form.give-form'), a = t.find('input[type="submit"].give-submit + .give-loading-animation');
    a.fadeIn();
    var o = t.get(0);
    if ('function' != typeof o.checkValidity || o.checkValidity() !== !1 || (a.fadeOut(), (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) != !1)) {
      i.preventDefault();
      var n = e(this).val();
      e(this).val(give_global_vars.purchase_loading), Give.form.fn.disable(t, !0), e.post(give_global_vars.ajaxurl, t.serialize() + '&action=give_process_donation&give_ajax=true', function (i) {
        'success' == e.trim(i) ? (t.find('.give_errors').remove(), e(o).submit(), t.trigger('give_form_validation_passed')) : (t.find('input[type="submit"].give-submit').val(n), a.fadeOut(), t.find('.give_errors').remove(), t.find('input[type="submit"].give-submit').before(i), Give.form.fn.disable(t, !1))
      })
    }
  })
});
var give_scripts, give_global_vars, Give = 'undefined' != typeof Give ? Give : {};
Give = {
  init: function () {
    var e = ['form'], t = 0;
    for (jQuery(document).trigger('give:preInit'), this.fn.__initialize_cache(); t < e.length;) Give[e[t]].init && Give[e[t]].init(), t++;
    jQuery(document).trigger('give:postInit')
  }, fn: {
    formatCurrency: function (e, t, i) {
      var n = {
        symbol: '',
        decimal: parseInt(give_global_vars.decimal_separator),
        thousand: give_global_vars.thousands_separator,
        precision: give_global_vars.number_decimals,
        currency: give_global_vars.currency
      };
      if (e = e.toString().trim(), i = 'undefined' == typeof i ? {} : i, i.length && (n = {
          symbol: '',
          decimal: Give.form.fn.getInfo('decimal_separator', i),
          thousand: Give.form.fn.getInfo('thousands_separator', i),
          precision: Give.form.fn.getInfo('number_decimals', i),
          currency: Give.form.fn.getInfo('currency_code', i)
        }), t = jQuery.extend(n, t), t.precision = parseInt(t.precision), 'INR' === t.currency) {
        var a, r, o = accounting.unformat(e, '.').toString(), d = '', l = o.indexOf('.');
        for (-1 !== l && t.precision ? (d = Number(o.substr(parseInt(l))).toFixed(t.precision).toString().substr(1), o = o.substr(0, parseInt(l)), d.length ? t.precision + 1 > d.length && (d = (d + '000000000').substr(0, t.precision + 1)) : d = '.0000000000'.substr(0, parseInt(l) + 1)) : d = '.000000000'.substr(0, t.precision + 1), a = o.substr(-3), r = o.substr(0, parseInt(o.length) - 3); r.length > 0;) a = r.substr(-2) + t.thousand + a, r = r.substr(0, parseInt(r.length) - 2);
        d.length && (a += d), e = a, void 0 !== t.symbol && t.symbol.length && ('after' === t.position ? e += t.symbol : e = t.symbol + e)
      } else 'after' === t.position && (t.format = '%v%s'), e = accounting.formatMoney(e, t);
      return e
    }, unFormatCurrency: function (e, t) {
      return Math.abs(parseFloat(accounting.unformat(e, t)))
    }, getParameterByName: function (e, t) {
      t || (t = window.location.href), e = e.replace(/[\[\]]/g, '\\$&');
      var i = new RegExp('[?&]' + e + '(=([^&#]*)|&|#|$)'), n = i.exec(t);
      return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, ' ')) : '' : null
    }, getGlobalVar: function (e) {
      return 'undefined' == typeof give_global_vars[e] ? '' : give_global_vars[e]
    }, setCache: function (e, t, i) {
      i.length ? Give.cache['form_' + Give.form.fn.getInfo('form-id', i)][e] = t : Give.cache[e] = t
    }, getCache: function (e, t) {
      var i;
      return i = t.length ? Give.cache['form_' + Give.form.fn.getInfo('form-id', t)][e] : Give.cache[e], i = 'undefined' == typeof i ? '' : i
    }, __initialize_cache: function () {
      jQuery.each(jQuery('.give-form'), function (e, t) {
        t = t instanceof jQuery ? t : jQuery(t), Give.cache['form_' + Give.form.fn.getInfo('form-id', t)] = []
      })
    }
  }, cache: {}
}, Give.form = {
  init: function () {
    this.fn.field.formatCreditCard(jQuery('form.give-form')), window.onload = function () {
      Give.form.fn.__sendBackToForm()
    }
  }, fn: {
    disable: function (e, t) {
      return !!e.length && void e.find('.give-submit').prop('disabled', t)
    }, formatAmount: function (e, t, i) {
      return t.length ? Give.fn.formatCurrency(e, i, t) : e
    }, getInfo: function (e, t) {
      var i = '';
      if (t = 'undefined' != typeof t ? t : {}, !e.length || !t.length) return i;
      switch (e) {
        case'gateways':
          i = [], jQuery.each(t.find('input[name="payment-mode"]'), function (e, t) {
            t = t instanceof jQuery ? t : jQuery(t), i.push(t.val().trim())
          });
          break;
        case'form-type':
          t.hasClass('give-form-type-set') ? i = 'set' : t.hasClass('give-form-type-multi') && (i = 'multi');
          break;
        case'form-id':
          i = t.find('input[name="give-form-id"]').val();
          break;
        default:
          i = t.get(0).hasAttribute('data-' + e) ? t.attr('data-' + e) : t.attr(e), 'undefined' != typeof i ? i.trim() : i
      }
      return i
    }, setInfo: function (e, t, i, n) {
      if (!e.length || !i.length) return !1;
      switch (n = 'undefined' == typeof n ? 'data' : n) {
        case'attr':
          i.attr(e, t);
          break;
        default:
          i.data(e, t)
      }
      return !0
    }, getGateway: function (e) {
      var t = '';
      return e.length ? (t = e.find('input[name="payment-mode"]:checked').val().trim(), 'undefined' != typeof t ? t : '') : t
    }, getVariablePrices: function (e) {
      var t, i = [];
      return e.length && e.hasClass('give-form-type-multi') && (t = e.find('.give-donation-levels-wrap [data-price-id] ')) ? (jQuery.each(t, function (t, n) {
        n = n instanceof jQuery ? n : jQuery(n);
        var a = Give.form.fn.getInfo('decimal_separator', e);
        i.push({ price_id: n.data('price-id'), amount: Give.fn.unFormatCurrency(n.val(), a) })
      }), i) : i
    }, getPriceID: function (e, t) {
      var i = this.getVariablePrices(e),
        n = Give.fn.unFormatCurrency(e.find('input[name="give-amount"]').val(), this.getInfo('decimal_separator', e)),
        a = Give.fn.getCache('amount_' + n, e) ? Give.fn.getCache('amount_' + n, e) : -1;
      return t = 'undefined' == typeof t || t, i.length && -1 === a && (t ? (jQuery.each(i, function (e, t) {
        if (t.amount === n) return a = t.price_id, !1
      }), -1 === a && this.getMinimumAmount(e) <= n && (a = 'custom')) : a = jQuery('input[name="give-price-id"]', e).val()), a
    }, getMinimumAmount: function (e) {
      return Give.fn.unFormatCurrency(e.find('input[name="give-form-minimum"]').val())
    }, getAmount: function (e) {
      if (!e.length) return null;
      var t = e.find('input[name="give-amount"]').val();
      return 'undefined' != typeof t && t || (t = 0), Give.fn.unFormatCurrency(t, this.getInfo('decimal_separator', e))
    }, autoSelectDonationLevel: function (e, t) {
      if (!e.length || 'multi' !== this.getInfo('form-type', e)) return !1;
      switch (t = 'undefined' == typeof t ? this.getPriceID(e, !1) : t, !0) {
        case!!e.find('.give-radio-input').length:
          e.find('.give-radio-input').prop('checked', !1), e.find('.give-radio-input[data-price-id="' + t + '"]').prop('checked', !0).addClass('give-default-level');
          break;
        case!!e.find('button.give-donation-level-btn').length:
          e.find('button.give-donation-level-btn').blur(), e.find('button.give-donation-level-btn[data-price-id="' + t + '"]').focus().addClass('give-default-level');
          break;
        case!!e.find('select.give-select-level').length:
          e.find('select.give-select-level option').prop('selected', !1), e.find('select.give-select-level option[data-price-id="' + t + '"]').prop('selected', !0).addClass('give-default-level')
      }
    }, autoSetMultiLevel: function (e) {
      var t = e.parents('form'), i = e.val(), n = e.data('price-id');
      if ('undefined' == typeof n && (n = e.find('option:selected').data('price-id')), 'custom' === i) return t.find('.give-amount-top').val('').focus(), !1;
      t.find('.give-amount-top').val(i), t.find('span.give-amount-top').text(i);
      var a = Give.form.fn.getInfo('decimal_separator', t);
      jQuery('.give-donation-amount .give-text-input', t).data('amount', Give.fn.unFormatCurrency(t.find('.give-final-total-amount').data('total'), a)), t.find('.give-donation-amount .give-text-input').trigger('blur', [t, i, n]), jQuery(document).trigger('give_donation_value_updated', [t, i, n])
    }, __sendBackToForm: function () {
      var e = Give.fn.getParameterByName('form-id'), t = Give.fn.getParameterByName('payment-mode');
      if (!e || !t) return !1;
      var i = jQuery('body').find('#give-form-' + e + '-wrap'), n = i.find('form.give-form'),
        a = i.hasClass('give-display-modal'), r = i.hasClass('give-display-reveal');
      n.find('#give-gateway-radio-list label').removeClass('give-gateway-option-selected'), n.find('input[name=payment-mode][value=' + t + ']').prop('checked', !0).parent().addClass('give-gateway-option-selected');
      var o = Give.fn.getParameterByName('level-id'), d = n.find('*[data-price-id="' + o + '"]');
      d.length > 0 && this.autoSetMultiLevel(d), a ? give_open_form_modal(i, n) : r && (n.find('.give-btn-reveal').hide(), n.find('#give-payment-mode-select, #give_purchase_form_wrap').slideDown())
    }, isValidDonationAmount: function (e) {
      var t = this.getMinimumAmount(e), i = this.getAmount(e), n = this.getPriceID(e, !0);
      return -1 < i && i >= t || -1 !== n
    }, field: {
      formatCreditCard: function (e) {
        e.each(function (e, t) {
          t = jQuery(t);
          var i = t.find('.card-number'), n = t.find('.card-cvc'), a = t.find('.card-expiry');
          i.length && (i.payment('formatCardNumber'), n.payment('formatCardCVC'), a.payment('formatCardExpiry'))
        })
      }
    }
  }
}, Give.notice = {
  fn: {
    renderNotice: function (e, t) {
      var i, n = '';
      switch (t = 'undefined' != typeof t ? t : {}, e) {
        case'bad_minimum':
          i = jQuery('<div class="give_error give-invalid-minimum give-hidden">' + this.getNotice(e, t) + '</div>')
      }
      return t.length ? void i.insertBefore(t.find('.give-total-wrap')).show() : n
    }, getNotice: function (e, t) {
      if (!e.length) return null;
      var i = '';
      switch (e) {
        case'bad_minimum':
          t.length && (i = Give.fn.getGlobalVar('bad_minimum') + ' ' + Give.fn.formatCurrency(Give.form.fn.getMinimumAmount(t), { symbol: Give.form.fn.getInfo('currency_symbol', t) }, t))
      }
      return i
    }
  }
}, jQuery(function (e) {
  function t() {
    var t = e(this), i = t.parents('form');
    if ('card_state' != t.attr('id')) {
      i.find('#card_state').empty().append('<option value="1">' + give_global_vars.general_loading + '</option>').prop('disabled', !0);
      var a = { action: 'give_get_states', country: t.val(), field_name: 'card_state' };
      e.ajax({
        type: 'POST',
        data: a,
        url: give_global_vars.ajaxurl,
        xhrFields: { withCredentials: !0 },
        success: function (e) {
          var t = '', a = e.states_label;
          t = void 0 != typeof e.states_found && 1 == e.states_found ? e.data : '<input type="text" id="card_state"  name="card_state" class="cart-state give-input required" placeholder="' + a + '" value="' + e.default_state + '"/>', !1 === i.hasClass('float-labels-enabled') ? 'undefined' != typeof e.states_require && 1 == e.states_require ? i.find('input[name="card_state"], select[name="card_state"]').closest('p').find('label .give-required-indicator').removeClass('give-hidden') : i.find('input[name="card_state"], select[name="card_state"]').closest('p').find('label .give-required-indicator').addClass('give-hidden') : i.find('input[name="card_state"], select[name="card_state"]').closest('p').find('label').text(a), i.find('input[name="card_state"], select[name="card_state"]').closest('p').find('label .state-label-text').text(a), i.find('input[name="card_state"], select[name="card_state"]').replaceWith(t), void 0 != typeof e.show_field && 1 == e.show_field ? (i.find('p#give-card-state-wrap').removeClass('give-hidden'), i.find('p#give-card-zip-wrap').addClass('form-row-last'), i.find('p#give-card-zip-wrap').removeClass('form-row-wide')) : (i.find('p#give-card-state-wrap').addClass('give-hidden'), i.find('p#give-card-zip-wrap').addClass('form-row-wide'), i.find('p#give-card-zip-wrap').removeClass('form-row-last')), n.trigger('give_checkout_billing_address_updated', [e, i.attr('id')])
        }
      }).fail(function (e) {
        window.console && window.console.log && console.log(e)
      })
    }
    return !1
  }

  var i = jQuery('form.give-form'), n = e(document);
  e.fn.toggleError = function (e) {
    return this.toggleClass('error', e), this.toggleClass('valid', !e), this
  }, Give.init(), n.on('change', '#give_cc_address input.card_state, #give_cc_address select', t), n.on('give_gateway_loaded', function () {
    Give.form.fn.field.formatCreditCard(i)
  }), n.on('submit', '#give_payment_mode', function () {
    var t = Give.form.fn.getGateway(e(this).closest('form'));
    if (!t.length) return alert(Give.fn.getGlobalVar('no_gateway')), !1
  }), n.on('click', '#give-payment-mode-select input', function () {
    var t, i = e(this).parents('form'), n = i.find('#give-payment-mode-select li'),
      a = i.find('li.give-gateway-option-selected input[name="payment-mode"]').val().trim();
    n.removeClass('give-gateway-option-selected'), n.prop('checked', !1), e(this).prop('checked', !0), e(this).parent().addClass('give-gateway-option-selected'), t = Give.form.fn.getGateway(i), i.attr('action', i.attr('action').replace('payment-mode=' + a, 'payment-mode=' + t))
  }), n.on('focus', '.give-donation-amount .give-text-input', function (t) {
    var i = e(this).parents('form');
    e(this).removeClass('invalid-amount');
    var n = i.find('.give-final-total-amount').data('total'), a = Give.form.fn.getInfo('decimal_separator', i);
    e(this).data('amount', Give.fn.unFormatCurrency(n, a)), e(this).parent('.give-donation-amount').addClass('give-custom-amount-focus-in'), i.find('.give-default-level, .give-radio-input').removeClass('give-default-level'), i.find('.give-btn-level-custom').addClass('give-default-level'), i.find('.give-radio-input').prop('checked', !1), i.find('.give-radio-input.give-radio-level-custom').prop('checked', !0), i.find('.give-select-level').prop('selected', !1), i.find('.give-select-level .give-donation-level-custom').prop('selected', !0)
  }), n.on('blur', '.give-donation-amount .give-text-input', function (t, i, n, a) {
    var r = 'undefined' != typeof i ? i : e(this).closest('form'), o = e(this).data('amount'),
      d = 'undefined' != typeof n ? n : e(this).val(), l = Give.form.fn.getInfo('decimal_separator', r),
      s = Give.form.fn.getMinimumAmount(r), f = 0 === d ? s : Give.fn.unFormatCurrency(d, l),
      u = Give.form.fn.formatAmount(f, r, {});
    if (a = 'undefined' == typeof a ? Give.form.fn.getPriceID(r, !0) : a, Give.fn.setCache('amount_' + f, a, r), e(this).val(u), Give.form.fn.isValidDonationAmount(r)) e(this).removeClass('give-invalid-amount'), r.find('.give-invalid-minimum').slideUp(300, function () {
      e(this).remove()
    }), Give.form.fn.disable(r, !1); else {
      e(this).addClass('give-invalid-amount'), Give.form.fn.disable(r, !0);
      var c = r.find('.give-invalid-minimum');
      0 === c.length && Give.notice.fn.renderNotice('bad_minimum', r)
    }
    o !== f && r.find('.give-final-total-amount').data('total', f).text(Give.fn.formatCurrency(f, {
      symbol: Give.form.fn.getInfo('currency_symbol', r),
      position: Give.form.fn.getInfo('currency_position', r)
    }, r)), -1 !== a && (e('input[name="give-price-id"]', r).val(a), r.find('.give-amount-hidden').val(Give.form.fn.formatAmount(f, r, {})), r.find('.give-default-level').removeClass('give-default-level'), Give.form.fn.autoSelectDonationLevel(r, a)), e(this).parent('.give-donation-amount').removeClass('give-custom-amount-focus-in')
  }), n.on('click touchend', '.give-donation-level-btn', function (t) {
    t.preventDefault(), Give.form.fn.autoSetMultiLevel(e(this))
  }), n.on('click touchend', '.give-radio-input-level', function (t) {
    Give.form.fn.autoSetMultiLevel(e(this))
  }), n.on('change', '.give-select-level', function (t) {
    Give.form.fn.autoSetMultiLevel(e(this))
  }), n.on('click', '.give_terms_links', function (t) {
    t.preventDefault();
    var i = e(this).closest('fieldset');
    return e('[class^=give_terms-]', i).slideToggle(), e('a.give_terms_links', i).toggle(), !1
  }), e('label[for^="give-radio-level"]').on('click', function (t) {
    var i = e(this).closest('form'), n = i.find('#' + e(this).attr('for'));
    n.length && (n.trigger('click'), t.preventDefault())
  })
}), jQuery(window).load(function () {
  jQuery('body').on('keyup change focusout', '.give-form .card-number, .give-form .card-cvc, .give-form .card-expiry', function (e) {
    var t = jQuery(this), i = t.parents('form.give-form'), n = t.attr('id'), a = i.find('.card-number'),
      r = i.find('.card-cvc'), o = i.find('.card-expiry'), d = jQuery.payment.cardType(a.val()), l = !1;
    switch (e.type) {
      case'focusout':
        n.indexOf('card_number') > -1 ? (l = !jQuery.payment.validateCardNumber(a.val()), a.toggleError(l)) : n.indexOf('card_cvc') > -1 ? (l = !jQuery.payment.validateCardCVC(r.val(), d), r.toggleError(l)) : n.indexOf('card_expiry') > -1 && (l = !jQuery.payment.validateCardExpiry(o.payment('cardExpiryVal')), o.toggleError(l)), Give.form.fn.disable(t.parents('form'), l);
        break;
      default:
        if (t.hasClass('error') && t.removeClass('error'), n.indexOf('card_number') > -1) {
          var s = i.find('.card-type');
          null === d ? (s.removeClass().addClass('off card-type'), t.removeClass('valid').addClass('error')) : s.removeClass().addClass('card-type ' + d)
        } else if (n.indexOf('card_expiry') > -1) {
          var f = o.payment('cardExpiryVal');
          i.find('.card-expiry-month').val(f.month), i.find('.card-expiry-year').val(f.year)
        }
    }
  })
});

function give_open_form_modal(e, i) {
  var a = '#give_purchase_form_wrap, #give-payment-mode-select, .mfp-close, .give-hidden';
  jQuery.magnificPopup.open({
    mainClass: give_global_vars.magnific_options.main_class,
    closeOnBgClick: give_global_vars.magnific_options.close_on_bg_click,
    fixedContentPos: !0,
    fixedBgPos: !0,
    removalDelay: 250,
    items: { src: i, type: 'inline' },
    callbacks: {
      beforeOpen: function () {
        if (jQuery('body').addClass('give-modal-open'), e.hasClass('give-display-button-only') && !i.data('content')) {
          var a = jQuery('.give-form-content-wrap', e), t = jQuery('.give-form-title', e),
            n = jQuery('.give-goal-progress', e), o = jQuery('>.give_error', e), r = jQuery('.give_errors', e);
          a.length && !jQuery('.give-form-content-wrap', i).length && (a.hasClass('give_post_form-content') ? i.append(a) : i.prepend(a)), r.length && !jQuery('.give_errors', i).length && r.each(function (e, a) {
            i.prepend(jQuery(a))
          }), o.length && !jQuery('>.give_error', i).length && o.each(function (e, a) {
            i.prepend(jQuery(a))
          }), n.length && !jQuery('.give-goal-progress', i).length && i.prepend(n), t.length && !jQuery('.give-form-title', i).length && i.prepend(t), i.data('content', 'loaded')
        }
      }, open: function () {
        var t = jQuery('.mfp-content');
        t.outerWidth() >= 500 && t.addClass('give-responsive-mfp-content'), e.hasClass('give-display-button-only') && (a = i.children().not('.give-hidden, .give-btn-modal')), i.children().not(a).hide()
      }, close: function () {
        i.removeClass('mfp-hide'), jQuery('body').removeClass('give-modal-open'), i.children().not(a).show()
      }
    }
  })
}

function give_fl_trigger() {
  give_float_labels instanceof FloatLabels ? give_float_labels.rebuild() : give_float_labels = new FloatLabels('.float-labels-enabled', {
    exclude: '#give-amount, .give-select-level, [multiple]',
    prioritize: 'placeholder',
    style: 'give'
  })
}

function give_change_html5_form_field_validation_message() {
  var e, i = jQuery('.give-form');
  i.length && jQuery.each(i, function (i, a) {
    e = jQuery('input', a), e.length && jQuery.each(e, function (e, i) {
      i = jQuery(i).get(0), give_global_vars.form_translation.hasOwnProperty(i.name) && (i.oninvalid = function (e) {
        e.target.setCustomValidity(''), e.target.validity.valid || e.target.setCustomValidity(give_global_vars.form_translation[i.name])
      })
    })
  })
}

function update_profile_state_field() {
  var e = jQuery(this), i = e.parents('form');
  if ('give_address_country' === e.attr('id')) {
    i.find('#give_address_state').empty().append('<option value="1">' + give_global_vars.general_loading + '</option>').prop('disabled', !0);
    var a = { action: 'give_get_states', country: e.val(), field_name: 'give_address_state' };
    jQuery.ajax({
      type: 'POST',
      data: a,
      url: give_global_vars.ajaxurl,
      xhrFields: { withCredentials: !0 },
      success: function (e) {
        var a = '', t = e.states_label;
        a = void 0 != typeof e.states_found && 1 == e.states_found ? e.data : '<input type="text" id="give_address_state"  name="give_address_state" class="text give-input" placeholder="' + t + '" value="' + e.default_state + '"/>', i.find('input[name="give_address_state"], select[name="give_address_state"]').replaceWith(a), void 0 != typeof e.show_field && 1 == e.show_field ? (i.find('p#give-card-state-wrap').removeClass('give-hidden'), i.find('p#give-card-zip-wrap').addClass('form-row-last'), i.find('p#give-card-zip-wrap').removeClass('form-row-wide')) : (i.find('p#give-card-state-wrap').addClass('give-hidden'), i.find('p#give-card-zip-wrap').addClass('form-row-wide'), i.find('p#give-card-zip-wrap').removeClass('form-row-last'))
      }
    }).fail(function (e) {
      window.console && window.console.log && console.log(e)
    })
  }
  return !1
}

var give_scripts, give_float_labels;
jQuery(function (e) {
  var i = e(document);
  give_fl_trigger(), give_change_html5_form_field_validation_message(), i.on('give_gateway_loaded', function (e, i, a) {
    give_fl_trigger()
  }), i.on('give_checkout_billing_address_updated', function (i, a, t) {
    e('form#' + t).hasClass('float-labels-enabled') && give_fl_trigger()
  }), i.on('click', '.give-btn-reveal', function (i) {
    i.preventDefault();
    var a = e(this), t = e(this).parents('form'), n = '#give-payment-mode-select', o = e(n), r = '';
    return a.hide(), e('li', o).length > 1 && (r = n + ', '), t.find(r + '#give_purchase_form_wrap').slideDown(), !1
  }), i.on('click', '.give-btn-modal', function (i) {
    i.preventDefault();
    var a = e(this).parents('div.give-form-wrap'), t = a.find('form.give-form'), n = t.find('#give-amount'),
      o = n.val();
    return !o || o <= 0 ? (n.focus(), !1) : void give_open_form_modal(a, t)
  });
  var a = jQuery('.give_notice[data-dismissible="auto"]');
  a.length && a.each(function (i, a) {
    a = e(a), window.setTimeout(function () {
      a.slideUp()
    }, a.data('dismiss-interval'))
  }), i.on('change', '#give_profile_billing_address_wrap #give_address_country', update_profile_state_field)
});