// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/ress.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"scss/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../images/hero.jpg":[["hero.0f0b5fd4.jpg","images/hero.jpg"],"images/hero.jpg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/modules/scrollTrigger.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* Written by Erik Terwan - MIT license - https://github.com/terwanerik */
!function (t, e) {
  "function" == typeof define && define.amd ? define([], e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e() : t.ScrollTrigger = e();
}(this, function () {
  "use strict";

  return function (t, e, n) {
    function i() {
      var t = h.bindElement.scrollTop ? h.bindElement.scrollTop : document.documentElement.scrollTop,
          e = h.bindElement.scrollLeft ? h.bindElement.scrollLeft : document.documentElement.scrollLeft;
      a.left == e && a.top == t || h.scrollDidChange(), r.length > 0 || c.length > 0 ? (u = !0, d(i)) : u = !1;
    }

    function l(t, e) {
      var n = e.split("("),
          i = n[0];
      if (n.length > 1 ? (n = n[1].split(")")[0], n = n.indexOf("', '") > -1 ? n.split("', '") : n.indexOf("','") > -1 ? n.split("','") : n.indexOf('", "') > -1 ? n.split('", "') : n.indexOf('","') > -1 ? n.split('","') : [n]) : n = [], n = n.map(function (t) {
        return s(t);
      }), "function" == typeof h.callScope[i]) try {
        h.callScope[i].apply(t.element, n);
      } catch (l) {
        try {
          h.callScope[i].apply(null, n);
        } catch (l) {}
      }
    }

    function s(t) {
      return t += "", '"' == t[0] && (t = t.substr(1)), "'" == t[0] && (t = t.substr(1)), '"' == t[t.length - 1] && (t = t.substr(0, t.length - 1)), "'" == t[t.length - 1] && (t = t.substr(0, t.length - 1)), t;
    }

    var o = function o(t, e) {
      this.element = e, this.defaultOptions = t, this.showCallback = null, this.hideCallback = null, this.visibleClass = "visible", this.hiddenClass = "invisible", this.addWidth = !1, this.addHeight = !1, this.once = !1;
      var n = 0,
          i = 0;
      this.left = function (t) {
        return function () {
          return t.element.getBoundingClientRect().left;
        };
      }(this), this.top = function (t) {
        return function () {
          return t.element.getBoundingClientRect().top;
        };
      }(this), this.xOffset = function (t) {
        return function (e) {
          var i = n;
          return t.addWidth && !e ? i += t.width() : e && !t.addWidth && (i -= t.width()), i;
        };
      }(this), this.yOffset = function (t) {
        return function (e) {
          var n = i;
          return t.addHeight && !e ? n += t.height() : e && !t.addHeight && (n -= t.height()), n;
        };
      }(this), this.width = function (t) {
        return function () {
          return t.element.offsetWidth;
        };
      }(this), this.height = function (t) {
        return function () {
          return t.element.offsetHeight;
        };
      }(this), this.reset = function (t) {
        return function () {
          t.removeClass(t.visibleClass), t.removeClass(t.hiddenClass);
        };
      }(this), this.addClass = function (t) {
        var e = function e(_e, n) {
          t.element.classList.contains(_e) || (t.element.classList.add(_e), "function" == typeof n && n());
        },
            n = function n(e, _n) {
          e = e.trim();
          var i = new RegExp("(?:^|\\s)" + e + "(?:(\\s\\w)|$)", "ig"),
              l = t.element.className;
          i.test(l) || (t.element.className += " " + e, "function" == typeof _n && _n());
        };

        return t.element.classList ? e : n;
      }(this), this.removeClass = function (t) {
        var e = function e(_e2, n) {
          t.element.classList.contains(_e2) && (t.element.classList.remove(_e2), "function" == typeof n && n());
        },
            n = function n(e, _n2) {
          e = e.trim();
          var i = new RegExp("(?:^|\\s)" + e + "(?:(\\s\\w)|$)", "ig"),
              l = t.element.className;
          i.test(l) && (t.element.className = l.replace(i, "$1").trim(), "function" == typeof _n2 && _n2());
        };

        return t.element.classList ? e : n;
      }(this), this.init = function (t) {
        return function () {
          var e = t.defaultOptions,
              l = t.element.getAttribute("data-scroll");
          e && (e.toggle && e.toggle.visible && (t.visibleClass = e.toggle.visible), e.toggle && e.toggle.hidden && (t.hiddenClass = e.toggle.hidden), e.showCallback && (t.showCallback = e.showCallback), e.hideCallback && (t.hideCallback = e.hideCallback), e.centerHorizontal === !0 && (n = t.element.offsetWidth / 2), e.centerVertical === !0 && (i = t.element.offsetHeight / 2), e.offset && e.offset.x && (n += e.offset.x), e.offset && e.offset.y && (i += e.offset.y), e.addWidth && (t.addWidth = e.addWidth), e.addHeight && (t.addHeight = e.addHeight), e.once && (t.once = e.once));
          var s = l.indexOf("addWidth") > -1,
              o = l.indexOf("addHeight") > -1,
              r = l.indexOf("once") > -1;
          t.addWidth === !1 && s === !0 && (t.addWidth = s), t.addHeight === !1 && o === !0 && (t.addHeight = o), t.once === !1 && r === !0 && (t.once = r), t.showCallback = t.element.hasAttribute("data-scroll-showCallback") ? t.element.getAttribute("data-scroll-showCallback") : t.showCallback, t.hideCallback = t.element.hasAttribute("data-scroll-hideCallback") ? t.element.getAttribute("data-scroll-hideCallback") : t.hideCallback;
          var c = l.split("toggle(");

          if (c.length > 1) {
            var a = c[1].split(")")[0].split(",");
            String.prototype.trim || (String.prototype.trim = function () {
              return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
            }), t.visibleClass = a[0].trim().replace(".", ""), t.hiddenClass = a[1].trim().replace(".", "");
          }

          l.indexOf("centerHorizontal") > -1 && (n = t.element.offsetWidth / 2), l.indexOf("centerVertical") > -1 && (i = t.element.offsetHeight / 2);
          var d = l.split("offset(");

          if (d.length > 1) {
            var u = d[1].split(")")[0].split(",");
            n += parseInt(u[0].replace("px", "")), i += parseInt(u[1].replace("px", ""));
          }

          return t;
        };
      }(this);
    };

    this.scrollElement = window, this.bindElement = document.body, this.callScope = window;

    var r = [],
        c = [],
        a = {
      left: -1,
      top: -1
    },
        d = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (t) {
      setTimeout(t, 1e3 / 60);
    },
        u = !1,
        f = function (t) {
      return function (e, n, i) {
        return void 0 != n && null != n ? t.bindElement = n : t.bindElement = document.body, void 0 != i && null != i ? t.scrollElement = i : t.scrollElement = window, t.bind(t.bindElement.querySelectorAll("[data-scroll]")), t;
      };
    }(this);

    this.bind = function (e) {
      return function (n) {
        n instanceof HTMLElement && (n = [n]);
        var l = [].slice.call(n);
        return l = l.map(function (e) {
          var n = new o(t, e);
          return n.init();
        }), r = r.concat(l), r.length > 0 && 0 == u ? (u = !0, i()) : u = !1, e;
      };
    }(this), this.triggerFor = function () {
      return function (t) {
        var e = null;
        return r.each(function (n) {
          n.element == t && (e = n);
        }), e;
      };
    }(this), this.destroy = function (t) {
      return function (e) {
        return r.each(function (t, n) {
          t.element == e && r.splice(n, 1);
        }), t;
      };
    }(this), this.destroyAll = function (t) {
      return function () {
        return r = [], t;
      };
    }(this), this.reset = function (t) {
      return function (e) {
        var n = t.triggerFor(e);

        if (null != n) {
          n.reset();
          var i = r.indexOf(n);
          i > -1 && r.splice(i, 1);
        }

        return t;
      };
    }(this), this.resetAll = function (t) {
      return function () {
        return r.each(function (t) {
          t.reset();
        }), r = [], t;
      };
    }(this), this.attach = function (t) {
      return function (e) {
        return c.push(e), u || (u = !0, i()), t;
      };
    }(this), this.detach = function (t) {
      return function (e) {
        var n = c.indexOf(e);
        return n > -1 && c.splice(n, 1), t;
      };
    }(this);
    var h = this;
    return this.scrollDidChange = function (t) {
      return function () {
        var e = t.scrollElement.innerWidth || t.scrollElement.offsetWidth,
            n = t.scrollElement.innerHeight || t.scrollElement.offsetHeight,
            i = t.bindElement.scrollTop ? t.bindElement.scrollTop : document.documentElement.scrollTop,
            s = t.bindElement.scrollLeft ? t.bindElement.scrollLeft : document.documentElement.scrollLeft,
            o = [];
        r.each(function (t) {
          var r = t.left(),
              c = t.top();
          a.left > s ? r -= t.xOffset(!0) : a.left < s && (r += t.xOffset(!1)), a.top > i ? c -= t.yOffset(!0) : a.top < i && (c += t.yOffset(!1)), e > r && r >= 0 && n > c && c >= 0 ? (t.addClass(t.visibleClass, function () {
            t.showCallback && l(t, t.showCallback);
          }), t.removeClass(t.hiddenClass), t.once && o.push(t)) : (t.addClass(t.hiddenClass), t.removeClass(t.visibleClass, function () {
            t.hideCallback && l(t, t.hideCallback);
          }));
        }), c.each(function (l) {
          l.call(t, s, i, e, n);
        }), o.each(function (t) {
          var e = r.indexOf(t);
          e > -1 && r.splice(e, 1);
        }), a.left = s, a.top = i;
      };
    }(this), Array.prototype.each = function (t) {
      for (var e = this.length, n = 0; e > n; n++) {
        var i = this[n];
        i && t(i, n);
      }
    }, f(t, e, n);
  };
});
},{}],"js/app.js":[function(require,module,exports) {
"use strict";

require("../scss/ress.scss");

require("../scss/style.scss");

var _scrollTrigger = _interopRequireDefault(require("./modules/scrollTrigger.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
  var trigger = new _scrollTrigger.default();
  var headH = document.getElementsByClassName('header').offsetHeight;
  document.body.style.marginTop = headH + 'px';
  smoothLink(headH);
};

window.onscroll = function () {
  scrollClassToggler(150, '.header', 'header__scrolled');
};

function scrollClassToggler(offset, target, toggleClass) {
  if (window.pageYOffset > offset) {
    var el = document.querySelectorAll(target)[0];
    el.classList.add(toggleClass);
  } else {
    var _el = document.querySelectorAll(target)[0];

    _el.classList.remove(toggleClass);
  }
}

function smoothLink() {
  var headH = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var interval = 10; //スクロール処理を繰り返す間隔

  var divisor = 8; //近づく割合（数値が大きいほどゆっくり近く）

  var range = divisor / 2 + 1; //どこまで近づけば処理を終了するか(無限ループにならないように divisor から算出)

  var links = document.querySelectorAll('a[href^="#"]');

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
      e.preventDefault();
      var toY;
      var nowY = window.pageYOffset; //現在のスクロール値

      var href = e.target.getAttribute('href'); //href取得

      var target = document.querySelector(href); //リンク先の要素（ターゲット）取得

      var targetRect = target.getBoundingClientRect(); //ターゲットの座標取得

      var targetY = targetRect.top + nowY - headH //現在のスクロール値 & ヘッダーの高さを踏まえた座標
      //スクロール終了まで繰り返す処理
      ;

      (function doScroll() {
        toY = nowY + Math.round((targetY - nowY) / divisor); //次に移動する場所（近く割合は除数による。）

        window.scrollTo(0, toY); //スクロールさせる

        nowY = toY; //nowY更新

        if (document.body.clientHeight - window.innerHeight < toY) {
          //最下部にスクロールしても対象まで届かない場合は下限までスクロールして強制終了
          window.scrollTo(0, document.body.clientHeight);
          return;
        }

        if (toY >= targetY + range || toY <= targetY - range) {
          //+-rangeの範囲内へ近くまで繰り返す
          window.setTimeout(doScroll, interval);
        } else {
          //+-range の範囲内にくれば正確な値へ移動して終了。
          window.scrollTo(0, targetY);
        }
      })();
    });
  }
}
},{"../scss/ress.scss":"scss/ress.scss","../scss/style.scss":"scss/style.scss","./modules/scrollTrigger.js":"js/modules/scrollTrigger.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60265" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map