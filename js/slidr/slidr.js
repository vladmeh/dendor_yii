/*!
 * slidr v0.4.0 - A Javascript library for adding slide effects.
 * bchanx.com/slidr
 * MIT licensed
 *
 * Copyright (c) 2013 Brian Chan (bchanx.com)
 */
(function(t,e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):t.slidr=e()})(this,function(){"use strict";function t(t,e){var i=t;for(var n in e){if(!i||!i.hasOwnProperty(e[n]))return null;i=i[e[n]]}return i===t?null:i}function e(){for(var t,e={},i=0;t=arguments[i];i++)for(var n in t)e[n]=t[n];return e}function i(t,e){return t.contains?t.contains(e):t.compareDocumentPosition?16&t.compareDocumentPosition(e):0}function n(t){return t.tagName?t.tagName.toLowerCase():null}function r(t,e){if(Array.prototype.indexOf)return t.indexOf(e);for(var i=0,n=t.length;n>i;i++)if(t[i]===e)return i;return-1}function a(t){return"".trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function o(t,e){var i=document.createElement(t);for(var n in e)i[n]=e[n];return i}function s(t,e){var i=a(t.className);i=i?i.split(/\s+/):[];for(var n,o,s=2;n=arguments[s];s++)o=r(i,n),"add"===e&&0>o&&i.push(n),"rm"===e&&o>=0&&i.splice(o,1);return t.className=i.join(" "),t}function d(t){return t.replace(/[\s'"]/gi,"").split("").sort().join("")}function c(t,e,i){return t&&t.setAttribute&&t.setAttribute(e,i),t}function u(t,e){return t&&t.getAttribute?t.getAttribute(e):null}function l(t,e){if("string"==typeof e){var i=document.defaultView?document.defaultView.getComputedStyle(t):t.currentStyle,n=i[m.fix(e)];if(n||"opacity"!==e||(n=i.filter?i.filter.split("=")[1].replace(")",""):"1"),n){var r=n.slice(0,-2);return"px"===n.slice(-2)&&!isNaN(parseInt(r))&&0>=r.search("px")?parseInt(r):n}return"none"}for(var a in e)m.fix(a)&&(t.style[m.fix(a)]=e[a]);return t}function f(t,e,i,n){"string"==typeof e&&(e=[e]);for(var a,o,s=0;a=e[s];s++)o=r(m.animations,a)>0,a="click"===a&&"ontouchstart"in window?"touchend":t.attachEvent&&!o?"on"+a:a,t.attachEvent&&!o?n?t.detachEvent(a,i):t.attachEvent(a,i):n?t.removeEventListener(a,i):t.addEventListener(a,i)}function h(t,e,i){f(t,e,i,!0)}function p(t){return"border-box"===l(t,"box-sizing")}var m={prefixes:["webkit","Moz","ms","O"],cache:{},keyframes:{},isIE:function(){return m.isIE=m.supports("filter")&&!m.supports("opacity")?function(){return!0}:function(){return!1},m.isIE()},styleEl:document.getElementsByTagName("html")[0].style,styleSheet:function(){var t=o("style",{type:"text/css"});return document.getElementsByTagName("head")[0].appendChild(t),t.sheet||t.styleSheet}(),cssRules:function(){return m.cssRules=function(){return m.styleSheet.cssRules||m.styleSheet.rules},m.cssRules()},insertRule:function(t){m.insertRule=m.styleSheet.insertRule?function(t){m.styleSheet.insertRule(t,m.cssRules().length)}:function(t){var e=t.split(" {");if(2===e.length){var i=e[0],n=a(e[1].replace(/;?\s?}$/g,""));i&&n&&m.styleSheet.addRule(i,n)}},m.insertRule(t)},addCSSRule:function(t,e,i){t=d(t);for(var n,r,a=0;n=m.cssRules()[a];a++)if(r=d(n.name||n.selectorText||n.cssText.split(" {")[0]||""),r===t){if(i||d(n.cssText)===d(e))return;m.styleSheet.deleteRule(a);break}m.insertRule(e)},createRule:function(t,e){var i=[t,"{"];for(var n in e)m.fix(n,!0)&&i.push(m.fix(n,!0)+":"+e[n]+";");return i.push("}"),i.join(" ")},createStyle:function(t,e,i){m.addCSSRule(t,m.createRule(t,e),i)},prefix:function(t){return 3===t.split("-").length?"-"+t.split("-")[1]+"-":""},createKeyframe:function(t,e){var i=m.fix("animation",!0);if(i&&!m.keyframes[t]){var n=["@"+m.prefix(i)+"keyframes "+t+" {"];for(var r in e)n.push(m.createRule(r+"%",e[r]));n.push("}"),m.addCSSRule(t,n.join(" ")),m.keyframes[t]=!0}},fix:function(t,e){if(!(t in m.cache)){for(var i,n=t.split("-"),r=0;i=n[r];r++)n[r]=i[0].toUpperCase()+i.toLowerCase().slice(1);var a=n.join("");if(a=a[0].toLowerCase()+a.slice(1),void 0!==m.styleEl[a])m.cache[t]={css:t,dom:a};else for(a=n.join(""),r=0;m.prefixes.length>r;r++)void 0!==m.styleEl[m.prefixes[r]+a]&&(m.cache[t]={css:"-"+m.prefixes[r].toLowerCase()+"-"+t,dom:m.prefixes[r]+a});m.cache[t]||(m.cache[t]=null)}return null!==m.cache[t]?e?m.cache[t].css:m.cache[t].dom:null},supports:function(){for(var t,e=0;t=arguments[e];e++)if(!m.fix(t))return!1;return!0},add:{fade:function(t,e,i){m.createKeyframe(t,{0:{opacity:e,visibility:"visible"},100:{opacity:i,visibility:"hidden"}})},linear:function(t,e,i,n,r,a){m.createKeyframe(t,{0:{transform:"translate"+i[0]+"(0%)",opacity:"in"===e?"0":r,visibility:"visible"},1:{transform:"translate"+i+"px)",opacity:r},99:{transform:"translate"+n+"px)",opacity:a},100:{transform:"translate"+n[0]+"(0%)",opacity:"out"===e?"0":a,visibility:"hidden"}})},cube:function(t,e,i,n,r,a){m.createKeyframe(t,{0:{transform:"rotate"+e+"0deg) translateZ("+n+"px)",opacity:r,visibility:"visible"},100:{transform:"rotate"+i+"0deg) translateZ("+n+"px)",opacity:a,visibility:"hidden"}})}},classnames:function(t){return{main:t,maincss:'aside[id*="-'+t+'"]',nav:"slidr-"+t,navcss:'aside[id*="-'+t+'"] .slidr-'+t,data:"data-slidr-"+t,id:function(e,i){return i?'aside[id="'+e.id+"-"+t+'"]':e.id+"-"+t}}},sanitize:function(t){return t=t||window.event,t.target||(t.target=t.srcElement),t.currentTarget||(t.currentTarget=t.srcElement),!t.which&&t.keyCode&&(t.which=t.keyCode),t},stop:function(t){return t=t||window.event,t.cancelBubble=!0,t.returnValue=!1,t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault(),!1},animations:["animationend","webkitAnimationEnd","oanimationend","MSAnimationEnd"]},g={available:["cube","fade","linear","none"],validate:function(t,e){return e=e||t.settings.transition,0>r(g.available,e)||!w.supported[e]?"none":e},get:function(e,i,n,r){return t(e.trans,[i,"in"===n?b.opposite(r):r])},set:function(t,e,i,n){return n=g.validate(t,n),t.trans[e]||(t.trans[e]={}),t.trans[e][i]=n,n},apply:function(t,e,i,n,r){x.update(t,e,i),w.animate(t,e,r,i,n)}},v={cache:{},hash:function(t){return[t.id,t["in"].slidr,t["in"].trans,t["in"].dir,t.out.slidr,t.out.trans,t.out.dir].join("-")},meta:function(t,e,i,n,r,a,o){return{id:t.id,"in":{el:b.get(t,i).el,slidr:i,trans:o,dir:r},out:{el:b.get(t,e).el,slidr:e,trans:a,dir:b.opposite(n)}}},before:function(t,e){var i=v.hash(e);if(v.cache[i]||(v.cache[i]={}),!v.cache[i].before){v.cache[i].before=!0;var n=t.settings.before;"function"==typeof n&&n(e)}},after:function(t,e){var i=v.hash(e);if(!v.cache[i].after){v.cache[i].after=!0;var n=t.settings.after;"function"==typeof n&&v.bindonce(n,e)}},bindonce:function(t,e){if(m.supports("animation")&&"none"!==e["in"].trans){var i=function(n){m.keyframes[n.animationName]&&(t(e),h(e["in"].el,m.animations,i),v.reset(e))};f(e["in"].el,m.animations,i)}else t(e),v.reset(e)},reset:function(t){var e=v.hash(t);v.cache[e].before=!1,v.cache[e].after=!1}},b={directions:["left","up","top","right","down","bottom"],isdir:function(t){return r(b.directions,t)>=0},opposite:function(t){var e=b.directions.length;return b.isdir(t)?b.directions[(r(b.directions,t)+e/2)%e]:null},get:function(e){for(var i,n=[],r=1;void 0!==(i=arguments[r++]);n.push(i));return t(e.slides,n)},display:function(t){!t.displayed&&b.get(t,t.start)&&(t.current=t.start,x.create(t),y.create(t),w.init(t,t.current,"fade"),w.animate(t,t.current,"fade","in"),t.displayed=!0,E.controls(t,t.settings.controls),t.settings.breadcrumbs&&E.breadcrumbs(t))},slide:function(t,e){return b.isdir(e)?b.go(t,b.get(t,t.current,e),e,e):b.jump(t,e)},jump:function(t,e){if(e&&e!==t.current&&b.get(t,e)){var i=t.crumbs[t.current],n=t.crumbs[e],r=i.x<n.x?"right":i.x>n.x?"left":null,a=i.y<n.y?"up":i.y>n.y?"down":null,o=g.get(t,t.current,"out",r)?r:g.get(t,t.current,"out",a)?a:null,s=g.get(t,e,"in",r)?r:g.get(t,e,"in",a)?a:null;b.go(t,e,o,s,o?null:"fade",s?null:"fade")}},go:function(t,e,i,n,r,a){if(t.current&&e){var o=a||g.get(t,e,"in",n),s=r||g.get(t,t.current,"out",i),d=v.meta(t,t.current,e,i,n,s,o);return v.before(t,d),g.apply(t,e,"in",n,o),g.apply(t,t.current,"out",i,s),v.after(t,d),t.current=e,y.update(t),!0}return!1},find:function(t,e){for(var i,n,a=e?[]:{},o=0;i=t.slidr.childNodes[o];o++)n=u(i,"data-slidr"),n&&(e&&0>r(a,n)?a.push(n):n in a||(a[n]=i));return a},validate:function(t,e,i,n,r,a){if(!e||e.constructor!==Array)return!1;for(var o,s,d,c,u,l,f,h,p=0;o=e[p];p++){if(!(o in n))return!1;if(b.get(t,o)&&(s=e[p-1]||null,d=e[p+1]||null,c=b.get(t,o,r),u=b.get(t,o,a),l=b.get(t,d,r),f=g.get(t,o,"out",r),h=g.get(t,o,"out",a),u&&d&&u!=d||c&&s&&c!=s||l&&l!=o||s&&f&&f!=i||d&&h&&h!=i))return!1}return!0},add:function(t,e,i,n,r,a){for(var o,s=0;o=e[s];s++){t.slides[o]=t.slides[o]||{};var d=b.get(t,o);d.el=n[o],e[s-1]&&(d[r]=e[s-1],g.set(t,o,r,i)),e[s+1]&&(d[a]=e[s+1],g.set(t,o,a,i)),w.init(t,o,i),t.start=t.start?t.start:o}return t.started&&(t.displayed?x.create(t):b.display(t)),!0}},y={cls:m.classnames("control"),types:["border","corner","none"],valid:function(t){return r(y.types,t)>=0},create:function(t){if(t.slidr&&!t.controls){t.controls=l(s(o("aside",{id:y.cls.id(t)}),"add","disabled"),{opacity:"0",filter:"alpha(opacity=0)","z-index":"0",visibility:"hidden","pointer-events":"none"});for(var e in t.nav)t.nav[e]=c(s(o("div"),"add",y.cls.nav,e),y.cls.data,e),t.controls.appendChild(t.nav[e]);y.css(t),t.slidr.appendChild(t.controls),f(t.controls,"click",y.onclick(t))}},css:function(t){m.createStyle(y.cls.maincss,{position:"absolute",bottom:l(t.slidr,"padding-bottom")+"px",right:l(t.slidr,"padding-right")+"px",padding:"10px","box-sizing":"border-box",width:"75px",height:"75px",transform:"translateZ(9998px)"},!0),m.createStyle(y.cls.maincss+".disabled",{transform:"translateZ(0px) !important"},!0),m.createStyle(y.cls.maincss+".breadcrumbs",{left:l(t.slidr,"padding-left")+"px",right:"auto"},!0),m.createStyle(y.cls.maincss+".border",{bottom:"0",right:"0",left:"0",width:"100%",height:"100%"},!0),m.createStyle(y.cls.navcss,{position:"absolute","pointer-events":"auto",cursor:"pointer",transition:"opacity 0.2s linear"},!0);var e={opacity:"0.05",cursor:"auto"};m.isIE()&&(e.display="none"),m.createStyle(y.cls.navcss+".disabled",e,!0);var i,n,r,a,o,s,d,c;for(i in t.nav)n="left"===i||"right"===i,r="up"===i?"top":"down"===i?"bottom":i,a=n?"top":"left",o={width:n?"22px":"16px",height:n?"16px":"22px","tap-highlight-color":"rgba(0, 0, 0, 0)","touch-callout":"none","user-select":"none"},o[r]="0",o[a]="50%",o["margin-"+a]="-8px",m.createStyle(y.cls.navcss+"."+i,o,!0),s={width:"0",height:"0",content:'""',position:"absolute",border:"8px solid transparent"},s["border-"+b.opposite(r)+"-width"]="12px",s["border-"+r+"-width"]="10px",s["border-"+b.opposite(r)+"-color"]=t.settings.theme,s[r]="0",s[a]="50%",s["margin-"+a]="-8px",m.createStyle(y.cls.id(t,!0)+" ."+y.cls.nav+"."+i+":after",s,!0),d={},d[n?"height":"width"]="100%",d[a]="0",d["margin-"+a]="0",m.createStyle(y.cls.maincss+".border ."+y.cls.nav+"."+i,d,!0),c={},c[r]=l(t.slidr,"padding-"+r)+"px",m.createStyle(y.cls.id(t,!0)+".border ."+y.cls.nav+"."+i,c,!0)},onclick:function(t){return function(e){E.slide(t,u(m.sanitize(e).target,y.cls.data))}},update:function(t){for(var e in t.nav)s(t.nav[e],E.canSlide(t,e)?"rm":"add","disabled")}},x={cls:m.classnames("breadcrumbs"),init:function(t){t.slidr&&!t.breadcrumbs&&(t.breadcrumbs=l(s(o("aside",{id:x.cls.id(t)}),"add","disabled"),{opacity:"0",filter:"alpha(opacity=0)","z-index":"0","pointer-events":"none",visibility:"hidden"}),x.css(t),t.slidr.appendChild(t.breadcrumbs),f(t.breadcrumbs,"click",x.onclick(t)))},css:function(t){m.createStyle(x.cls.maincss,{position:"absolute",bottom:l(t.slidr,"padding-bottom")+"px",right:l(t.slidr,"padding-right")+"px",padding:"10px","box-sizing":"border-box",transform:"translateZ(9999px)"},!0),m.createStyle(x.cls.maincss+".disabled",{transform:"translateZ(0px) !important"},!0),m.createStyle(x.cls.navcss,{padding:"0","font-size":"0","line-height":"0"},!0),m.createStyle(x.cls.navcss+" li",{width:"10px",height:"10px",display:"inline-block",margin:"3px","tap-highlight-color":"rgba(0, 0, 0, 0)","touch-callout":"none","user-select":"none"},!0),m.createStyle(x.cls.id(t,!0)+" ."+x.cls.nav+" li.normal",{"border-radius":"100%",border:"1px "+t.settings.theme+" solid",cursor:"pointer","pointer-events":"auto"},!0),m.createStyle(x.cls.id(t,!0)+" ."+x.cls.nav+" li.active",{width:"12px",height:"12px",margin:"2px","background-color":t.settings.theme},!0)},onclick:function(t){return function(e){E.slide(t,u(m.sanitize(e).target,x.cls.data))}},offsets:{right:{x:1,y:0},up:{x:0,y:1},left:{x:-1,y:0},down:{x:0,y:-1}},find:function(t,e,i,n,r,a){if(n){e[n]||(e[n]={x:r,y:a},i.x.min>r&&(i.x.min=r),r>i.x.max&&(i.x.max=r),i.y.min>a&&(i.y.min=a),a>i.y.max&&(i.y.max=a)),n=b.get(t,n);for(var o in x.offsets)n[o]&&!e[n[o]]&&x.find(t,e,i,n[o],r+x.offsets[o].x,a+x.offsets[o].y)}},update:function(t,e,i){s(t.crumbs[e].el,"in"===i?"add":"rm","active")},create:function(t){if(x.init(t),t.breadcrumbs){var e={},i={x:{min:0,max:0},y:{min:0,max:0}};x.find(t,e,i,t.start,0,0),i.x.modifier=0-i.x.min,i.y.modifier=0-i.y.min;var n={};for(var r in e)e[r].x+=i.x.modifier,e[r].y+=i.y.modifier,n[e[r].x+","+e[r].y]=r;for(var a=i.y.max-i.y.min+1,d=i.x.max-i.x.min+1;t.breadcrumbs.firstChild;)t.breadcrumbs.removeChild(t.breadcrumbs.firstChild);for(var u,l=s(o("ul"),"add",x.cls.nav),f=o("li"),h=a-1;h>=0;h--){u=l.cloneNode(!1);for(var p,m,g=0;d>g;g++)p=f.cloneNode(!1),m=n[g+","+h],m&&(s(p,"add","normal",m===t.current?"active":null),c(p,x.cls.data,m),e[m].el=p),u.appendChild(p);t.breadcrumbs.appendChild(u)}t.crumbs=e}}},w={init:function(t,i){var n=b.get(t,i);if(!n.initialized){var r=l(n.el,"display"),a={display:"none"===r?"block":r,visibility:"hidden",position:"absolute",opacity:"0",filter:"alpha(opacity=0)","z-index":"0","pointer-events":"none","backface-visibility":"hidden","transform-style":"preserve-3d"};m.isIE()&&(a=e(a,{display:"none",visibility:"visible"})),n.initialized=!0,l(n.el,a)}},supported:{none:!0,fade:m.supports("animation","opacity"),linear:m.supports("animation","opacity","transform"),cube:m.supports("animation","backface-visibility","opacity","transform","transform-style")},animation:{fade:function(){m.add.fade("slidr-fade-in","0","1"),m.add.fade("slidr-fade-out","1","0")}(),linear:{"in":{left:function(t,e,i){m.add.linear(t,"in","X(-"+e,"X(0",i,"1")},right:function(t,e,i){m.add.linear(t,"in","X("+e,"X(0",i,"1")},up:function(t,e,i){m.add.linear(t,"in","Y(-"+e,"Y(0",i,"1")},down:function(t,e,i){m.add.linear(t,"in","Y("+e,"Y(0",i,"1")}},out:{left:function(t,e,i){m.add.linear(t,"out","X(0","X("+e,"1",i)},right:function(t,e,i){m.add.linear(t,"out","X(0","X(-"+e,"1",i)},up:function(t,e,i){m.add.linear(t,"out","Y(0","Y("+e,"1",i)},down:function(t,e,i){m.add.linear(t,"out","Y(0","Y(-"+e,"1",i)}}},cube:{"in":{left:function(t,e,i){m.add.cube(t,"Y(-9","Y(",e/2,i,"1")},right:function(t,e,i){m.add.cube(t,"Y(9","Y(",e/2,i,"1")},up:function(t,e,i){m.add.cube(t,"X(9","X(",e/2,i,"1")},down:function(t,e,i){m.add.cube(t,"X(-9","X(",e/2,i,"1")}},out:{left:function(t,e,i){m.add.cube(t,"Y(","Y(9",e/2,"1",i)},right:function(t,e,i){m.add.cube(t,"Y(","Y(-9",e/2,"1",i)},up:function(t,e,i){m.add.cube(t,"X(","X(-9",e/2,"1",i)},down:function(t,e,i){m.add.cube(t,"X(","X(9",e/2,"1",i)}}}},name:function(e,i,n,r,a){var o=["slidr",n,r];if(("linear"===n||"cube"===n)&&a){o.push(a);var s=e.settings.fade?"0":"1";"0"===s&&o.push("fade");var d="up"===a||"down"===a?"h":"w",c="h"===d?S.getHeight(i):S.getWidth(i);o.push(d,c);var u=t(w.animation,[n,r,a]);u&&u(o.join("-"),c,s)}return o.join("-")},animate:function(t,i,n,r,a,o,s,d){var c={opacity:"in"===r?"1":"0",filter:"alpha(opacity="+("in"===r?"100":"0")+")","z-index":s||("in"===r?"1":"0"),visibility:"in"===r?"visible":"hidden","pointer-events":d||("in"===r?"auto":"none")};m.isIE()&&(c=e(c,{display:"in"===r?"block":"none",visibility:"visible"}));var u=o||b.get(t,i).el,f=t.settings.timing[n];if(w.supported[n]&&f){var h=w.name(t,u,n,r,a);c.animation="none"===n?"none":[h,f].join(" ")}l(u,c),b.get(t,i)&&m.supports("transform")&&w.fixTranslateZ(t,u,r)},fixTranslateZ:function(t,e,i){var r=e.getElementsByTagName("aside");if(r.length)for(var a,o,d,c,f=0;a=r[f];f++)if(a.getAttribute("id")){for(o=a.parentNode;!u(o,"data-slidr")&&"body"!==n(o);)o=o.parentNode;"body"===n(o)&&(o=t.slidr),c=l(o,"visibility"),d="out"===i||!i&&"hidden"===c?"add":"visible"===c?"rm":null,d&&s(a,d,"disabled")}}},S={active:{},autoResize:function(t){S.active[t.id]={src:t,w:0,h:0,d:S.dynamic(t)}},dynamic:function(t){var e=l(t.slidr.cloneNode(!1),{position:"absolute",opacity:"0",filter:"alpha(opacity=0)"}),i=l(o("div"),{width:"42px",height:"42px"});e.appendChild(i),t.slidr.parentNode.insertBefore(e,t.slidr);var n=(p(e)?S.extraWidth(t.slidr):0)+42,r=(p(e)?S.extraHeight(t.slidr):0)+42,a=l(e,"width"),s=l(e,"height"),d=l(e,"min-width"),c=l(e,"min-height"),u={width:"auto"===a||a===n||0!==d&&"auto"!=d,height:"auto"===s||s===r||0!==c&&"auto"!=c};return t.slidr.parentNode.removeChild(e),u},widthMargin:function(t){return Math.max(0,l(t,"margin-left"))+Math.max(0,l(t,"margin-right"))},heightMargin:function(t){return Math.max(0,l(t,"margin-top"))+Math.max(0,l(t,"margin-bottom"))},widthPad:function(t){return l(t,"padding-left")+l(t,"padding-right")},heightPad:function(t){return l(t,"padding-top")+l(t,"padding-bottom")},widthBorder:function(t){return l(t,"border-left-width")+l(t,"border-right-width")},heightBorder:function(t){return l(t,"border-top-width")+l(t,"border-bottom-width")},extraWidth:function(t){return S.widthPad(t)+S.widthBorder(t)},extraHeight:function(t){return S.heightPad(t)+S.heightBorder(t)},getWidth:function(t){var e=l(t,"width");return m.isIE()&&"auto"===e&&t.offsetWidth&&(e=t.offsetWidth),"auto"!==e&&(e+=S.widthMargin(t)+(p(t)?0:S.extraWidth(t))),e},getHeight:function(t){var e=l(t,"height");return m.isIE()&&"auto"===e&&t.offsetHeight&&(e=t.offsetHeight),"auto"!==e&&(e+=S.heightMargin(t)+(p(t)?0:S.extraHeight(t))),e},setWidth:function(t,e){var i=e;return"auto"!==e&&""!==e&&(i=e+(p(t)?S.extraWidth(t):0)+"px"),l(t,{width:i}),e},setHeight:function(t,e){var i=e;return"auto"!==e&&""!==e&&(i=e+(p(t)?S.extraHeight(t):0)+"px"),l(t,{height:i}),e}},k={mouse:{over:[],isOver:function(t){return r(k.mouse.over,t)>=0},add:function(t){k.mouse.isOver(t)||k.mouse.over.push(t)},remove:function(t){k.mouse.isOver(t)&&k.mouse.over.splice(r(k.mouse.over,t),1)},current:function(){for(var t=k.mouse.over[k.mouse.over.length-1],e=0,n=k.mouse.over.length,r=k.mouse.over[e];n>e;e++)i(t,r)&&(t=r);return t},track:function(t){f(t,"mouseenter",function(t){k.mouse.add(m.sanitize(t).currentTarget.id)}),f(t,"mouseleave",function(t){k.mouse.remove(m.sanitize(t).currentTarget.id)})}},keyboard:function(){f(document,"keydown",function(t){if(t=m.sanitize(t),k.mouse.current()&&40>=t.which&&t.which>=37){var e=N[k.mouse.current()],i=null;40===t.which&&e.canSlide("down")?i="down":39===t.which&&e.canSlide("right")?i="right":38===t.which&&e.canSlide("up")?i="up":37===t.which&&e.canSlide("left")&&(i="left"),i&&e.slide(i)&&m.stop(t)}})}(),touch:function(t){var e={},i={};f(t.slidr,"touchstart",function(t){t=m.sanitize(t),e={x:t.touches[0].pageX,y:t.touches[0].pageY,time:+new Date},i={x:0,y:0,duration:0}}),f(t.slidr,"touchmove",function(t){t=m.sanitize(t),t.touches.length>1||t.scale&&1!==t.scale||(i.x=t.touches[0].pageX-e.x,i.y=t.touches[0].pageY-e.y,i.duration=+new Date-e.time,i.duration>100&&.25>(Math.abs(i.x)+Math.abs(i.y))/i.duration||m.stop(t))}),f(t.slidr,"touchend",function(n){if(n=m.sanitize(n),250>Number(+new Date-e.time)){var r=Math.abs(i.x),a=Math.abs(i.y),o=r>20,s=a>20,d=0>i.x?"right":"left",c=0>i.y?"down":"up",u=o&&s?r>a?d:c:o?d:s?c:null;u&&E.slide(t,u),m.stop(n)}})}},E={start:function(t,e){if(!t.started&&t.slidr){var i=l(t.slidr,"display"),n=l(t.slidr,"position"),r=l(t.slidr,"opacity");l(t.slidr,{visibility:"visible",opacity:r,filter:"alpha(opacity="+100*r+")",display:"inline-block"===i||"inline"===i?"inline-block":"block",position:"static"===n?"relative":n,overflow:t.settings.overflow?l(t.slidr,"overflow"):"hidden",transition:"height 0.05s ease-out, width 0.05s ease-out","tap-highlight-color":"rgba(0, 0, 0, 0)","touch-callout":"none"}),t.start||E.add(t,t.settings.direction,b.find(t,!0),t.settings.transition),b.get(t,e)&&(t.start=e),b.display(t),S.autoResize(t),w.fixTranslateZ(t,t.slidr),t.settings.keyboard&&k.mouse.track(t.slidr),t.settings.touch&&k.touch(t),t.started=!0,y.update(t)}},canSlide:function(t,e){return t.started&&e&&(b.isdir(e)?!!b.get(t,t.current,e):!!b.get(t,e))},slide:function(t,e){E.canSlide(t,e)&&b.slide(t,e)},add:function(t,e,i,n,r){if(t.slidr){var a=g.validate(t,n),o=b.find(t),s="horizontal"===e||"h"===e?"left":"up",d="horizontal"===e||"h"===e?"right":"down";b.validate(t,i,a,o,s,d)||r?b.add(t,i,a,o,s,d):console.warn("[Slidr] Error adding ["+e+"] slides for ["+t.id+"].")}},auto:function(t,e,i){t.started&&b.isdir(i)&&(E.stop(t),t.auto=setInterval(function(){b.slide(t,i)},e))},stop:function(t){t.started&&t.auto&&(clearInterval(t.auto),t.auto=null)},breadcrumbs:function(t){if(t.breadcrumbs&&t.displayed){var e="0"===l(t.breadcrumbs,"opacity")?"in":"out";w.animate(t,null,"fade",e,null,t.breadcrumbs,"3","none"),t.controls&&s(t.controls,"in"===e?"add":"rm","breadcrumbs")}},controls:function(t,e){if(t.controls&&t.displayed){y.valid(e)||(e=null);var i="hidden"===l(t.controls,"visibility"),n=e&&"none"!==e?"in":"out";if("out"===n&&i)return;"border"===e?s(t.controls,"add","border"):"corner"===e&&s(t.controls,"rm","border"),w.animate(t,null,"fade",n,null,t.controls,"2","none")}}},z=function(t,i,n){var r={id:t,slidr:i,breadcrumbs:null,controls:null,settings:n,started:!1,displayed:!1,start:null,current:null,auto:null,slides:{},trans:{},crumbs:{},nav:{up:null,down:null,left:null,right:null}},a={start:function(t){return E.start(r,t),this},canSlide:function(t){return E.canSlide(r,t)},slide:function(t){return E.slide(r,t),this},add:function(t,e,i,n){return E.add(r,t,e,i,n),this},auto:function(t,e,i){return E.start(r,i),E.auto(r,t||5e3,e||"right"),this},stop:function(){return E.stop(r),this},timing:function(t,i){return t&&t.constructor===Object?r.settings.timing=e(r.settings.timing,t):"string"==typeof t&&"string"==typeof i&&(r.settings.timing[t]=i),this},breadcrumbs:function(){return E.breadcrumbs(r),this},controls:function(t){return E.controls(r,t),this}};return a};setInterval(function C(){var t,e,n,r,a,o;for(n in S.active)e=S.active[n],t=e.src,m.isIE()||i(document,t.slidr)?"hidden"===l(t.slidr,"visibility")?(S.active[n].w=S.setWidth(t.slidr,0),S.active[n].h=S.setHeight(t.slidr,0)):b.get(t,t.current)&&(r=b.get(t,t.current).el,a=S.getWidth(r),o=S.getHeight(r),e.d.width&&e.w!=a&&(S.active[n].w=S.setWidth(t.slidr,a)),e.d.height&&e.h!=o&&(S.active[n].h=S.setHeight(t.slidr,o))):(delete S.active[n],delete N[t.id]);return C}(),250);var R="0.4.0",N={},X=function(){},Y={after:X,before:X,breadcrumbs:!1,controls:"border",direction:"horizontal",fade:!0,keyboard:!1,overflow:!1,theme:"#fff",timing:{},touch:!1,transition:"linear"},I={none:"none",fade:"0.4s ease-out",linear:"0.6s ease-out",cube:"1s cubic-bezier(0.15, 0.9, 0.25, 1)"};return{version:function(){return R},transitions:function(){return g.available.slice(0)},create:function(t,i){var n=document.getElementById(t);if(!n)return console.warn("[Slidr] Could not find element with id ["+t+"]."),void 0;var r=e(Y,i||{});return r.timing=e(I,r.timing),N[t]=N[t]||new z(t,n,r),N[t]}}});