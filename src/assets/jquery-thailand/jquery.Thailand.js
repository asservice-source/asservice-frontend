/**
 * @name jquery.Thailand.js
 * @version 1.5.1
 * @update Jul 14, 2017
 * @website https://github.com/earthchie/jquery.Thailand.js
 * @license WTFPL v.2 - http://www.wtfpl.net/
 *
 * @dependencies: jQuery <https://jquery.com/>
 *              zip.js <https://github.com/gildas-lormeau/zip.js> (optional: for zip database_type only)
 *              typeahead.js <https://twitter.github.io/typeahead.js/>
 *              JQL.js <https://github.com/earthchie/JQL.js>
 **/
 /**
  * @name JQL.js
  * @version 1.0.3
  * @update Apr 16, 2017
  * @author Earthchie http://www.earthchie.com/
  * @license WTFPL v.2 - http://www.wtfpl.net/
  **/
  function JQL(a){"string"==typeof a&&(a=JSON.parse(a)),this.data_source=a,this.buffer=a,this.focused_field="",this.options=[],this.size=!1;for(var b in a){for(var c in a[b])this.options.push(c);break}this.fetch=function(){if("object"==typeof this.options){var b={};for(var a in this.buffer){b[a]={};for(var c in this.options){var d=this.options[c];this.buffer[a][d]&&(b[a][d]=this.buffer[a][d])}}this.buffer=b}if(this.size){var b=this.size.toString().split(",");var c=0,d=this.size;b.length>1&&b[0]<b[1]&&(c=parseInt(b[0]),d=c+parseInt(b[1]));var e={};for(var a=c;a<d&&this.buffer[a];a++)e[a]=this.buffer[a];this.buffer=e}return this.buffer},this.new=function(a){this.data_source=a,this.buffer=a},this.limit=function(a){return this.size=a,this},this.select=function(a){return this.options=a,"string"==typeof a&&"*"!==a&&(this.options=a.split(",")),this.buffer=this.data_source,this.size=!1,this},this.where=function(a){return this.focused_field=a,this},this.contains=function(a,b){var c=this.buffer;this.buffer=[];for(var d in c)b?~c[d][this.focused_field].indexOf(a)&&this.buffer.push(c[d]):~c[d][this.focused_field].toLowerCase().indexOf(a.toLowerCase())&&this.buffer.push(c[d]);return this},this.match=function(a,b){if("string"==typeof a&&""!==a){b=b||"ig",a=new RegExp(a,b);var c=this.buffer;this.buffer=[];for(var b in c)a.lastIndex=0,a.exec(c[b][this.focused_field])&&this.buffer.push(c[b])}return this},this.equalTo=function(a){var b=this.buffer;this.buffer=[];for(var c in b)b[c][this.focused_field]==a&&this.buffer.push(b[c]);return this},this.in=function(a){var b=this.buffer;this.buffer=[];for(var c in b)this.in_array(b[c][this.focused_field],a)&&this.buffer.push(b[c]);return this},this.moreThan=function(a){var b=this.buffer;this.buffer=[];for(var c in b)parseFloat(b[c][this.focused_field])>parseFloat(a)&&this.buffer.push(b[c]);return this},this.moreThanOrEqualTo=function(a){var b=this.buffer;this.buffer=[];for(var c in b)parseFloat(b[c][this.focused_field])>=parseFloat(a)&&this.buffer.push(b[c]);return this},this.lessThan=function(a){var b=this.buffer;this.buffer=[];for(var c in b)parseFloat(b[c][this.focused_field])<parseFloat(a)&&this.buffer.push(b[c]);return this},this.lessThanOrEqualTo=function(a){var b=this.buffer;this.buffer=[];for(var c in b)parseFloat(b[c][this.focused_field])<=parseFloat(a)&&this.buffer.push(b[c]);return this},this.orderBy=function(a,b){var c="asc";var d=a.split(" "),e=d.pop();e&&"desc"==e.toLowerCase()&&(c="desc",a=d.join(" "));var f=[];for(var g in this.buffer)f.push([g,this.buffer[g][a]]);if(f.length<2)return this;b=void 0==b&&isNaN(f[0][1])?"string":"numeric","string"==b?f.sort((a,b)=>{if(a[1]<b[1])return-1;if(a[1]>b[1])return 1;return 0}):f.sort((a,b)=>a[1]-b[1]),results=[];for(var g in f)results.push(this.buffer[f[g][0]]);return this.buffer=results,"desc"==c&&(this.buffer=this.buffer.reverse()),this},this.and=this.where,this.is=this.equalTo,this.in_array=function(a,b){for(var c in b)if(a==b[c])return!0;return!1}}
  /*!
 * typeahead.js 1.1.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2017 Twitter, Inc. and other contributors; Licensed MIT
 */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(c){return a.Bloodhound=b(c)}):"object"==typeof exports?module.exports=b(require("jquery")):a.Bloodhound=b(a.jQuery)}(this,function(a){var b=function(){"use strict";return{isMsie:function(){return!!/(msie|trident)/i.test(navigator.userAgent)&&navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return void 0===a},isElement:function(a){return!(!a||1!==a.nodeType)},isJQuery:function(b){return b instanceof a},toStr:function(c){return b.isUndefined(c)||null===c?"":c+""},bind:a.proxy,each:function(b,c){function d(a,b){return c(b,a)}a.each(b,d)},map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){if(!(d=c.call(null,e,a,b)))return!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){if(d=c.call(null,e,a,b))return!1}),!!d):d},mixin:a.extend,identity:function(a){return a},clone:function(b){return a.extend(!0,{},b)},getIdGenerator:function(){var a=0;return function(){return a++}},templatify:function(c){function d(){return String(c)}return a.isFunction(c)?c:d},defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var h,i,f=this,g=arguments;return h=function(){d=null,c||(e=a.apply(f,g))},i=c&&!d,clearTimeout(d),d=setTimeout(h,b),i&&(e=a.apply(f,g)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,j<=0?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},stringify:function(a){return b.isString(a)?a:JSON.stringify(a)},guid:function(){function a(a){var b=(Math.random().toString(16)+"000000000").substr(2,8);return a?"-"+b.substr(0,4)+"-"+b.substr(4,4):b}return"tt-"+a()+a(!0)+a(!0)+a()},noop:function(){}}}(),c="1.1.1",d=function(){"use strict";function a(a){return a=b.toStr(a),a?a.split(/\s+/):[]}function c(a){return a=b.toStr(a),a?a.split(/\W+/):[]}function d(a){a=b.toStr(a);var c=[],d="";return b.each(a.split(""),function(a){a.match(/\s+/)?d="":(c.push(d+a),d+=a)}),c}function e(a){return function(d){return d=b.isArray(d)?d:[].slice.call(arguments,0),function(e){var f=[];return b.each(d,function(c){f=f.concat(a(b.toStr(e[c])))}),f}}}return{nonword:c,whitespace:a,ngram:d,obj:{nonword:e(c),whitespace:e(a),ngram:e(d)}}}(),e=function(){"use strict";function c(c){this.maxSize=b.isNumber(c)?c:100,this.reset(),this.maxSize<=0&&(this.set=this.get=a.noop)}function d(){this.head=this.tail=null}function e(a,b){this.key=a,this.val=b,this.prev=this.next=null}return b.mixin(c.prototype,{set:function(b,c){var f,d=this.list.tail;this.size>=this.maxSize&&(this.list.remove(d),delete this.hash[d.key],this.size--),(f=this.hash[b])?(f.val=c,this.list.moveToFront(f)):(f=new e(b,c),this.list.add(f),this.hash[b]=f,this.size++)},get:function(b){var c=this.hash[b];if(c)return this.list.moveToFront(c),c.val},reset:function(){this.size=0,this.hash={},this.list=new d}}),b.mixin(d.prototype,{add:function(b){this.head&&(b.next=this.head,this.head.prev=b),this.head=b,this.tail=this.tail||b},remove:function(b){b.prev?b.prev.next=b.next:this.head=b.next,b.next?b.next.prev=b.prev:this.tail=b.prev},moveToFront:function(a){this.remove(a),this.add(a)}}),c}(),f=function(){"use strict";function d(a,d){this.prefix=["__",a,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+b.escapeRegExChars(this.prefix)),this.ls=d||c,!this.ls&&this._noop()}function e(){return(new Date).getTime()}function f(a){return JSON.stringify(b.isUndefined(a)?null:a)}function g(b){return a.parseJSON(b)}function h(a){var b,d,e=[],f=c.length;for(b=0;b<f;b++)(d=c.key(b)).match(a)&&e.push(d.replace(a,""));return e}var c;try{c=window.localStorage,c.setItem("~~~","!"),c.removeItem("~~~")}catch(a){c=null}return b.mixin(d.prototype,{_prefix:function(a){return this.prefix+a},_ttlKey:function(a){return this._prefix(a)+this.ttlKey},_noop:function(){this.get=this.set=this.remove=this.clear=this.isExpired=b.noop},_safeSet:function(a,b){try{this.ls.setItem(a,b)}catch(a){"QuotaExceededError"===a.name&&(this.clear(),this._noop())}},get:function(a){return this.isExpired(a)&&this.remove(a),g(this.ls.getItem(this._prefix(a)))},set:function(a,c,d){return b.isNumber(d)?this._safeSet(this._ttlKey(a),f(e()+d)):this.ls.removeItem(this._ttlKey(a)),this._safeSet(this._prefix(a),f(c))},remove:function(a){return this.ls.removeItem(this._ttlKey(a)),this.ls.removeItem(this._prefix(a)),this},clear:function(){var a,b=h(this.keyMatcher);for(a=b.length;a--;)this.remove(b[a]);return this},isExpired:function(a){var c=g(this.ls.getItem(this._ttlKey(a)));return!!(b.isNumber(c)&&e()>c)}}),d}(),g=function(){"use strict";function g(a){a=a||{},this.maxPendingRequests=a.maxPendingRequests||6,this.cancelled=!1,this.lastReq=null,this._send=a.transport,this._get=a.limiter?a.limiter(this._get):this._get,this._cache=!1===a.cache?new e(0):f}var c=0,d={},f=new e(10);return g.setMaxPendingRequests=function(b){this.maxPendingRequests=b},g.resetCache=function(){f.reset()},b.mixin(g.prototype,{_fingerprint:function(c){return c=c||{},c.url+c.type+a.param(c.data||{})},_get:function(a,b){function h(a){b(null,a),e._cache.set(f,a)}function i(){b(!0)}function j(){c--,delete d[f],e.onDeckRequestArgs&&(e._get.apply(e,e.onDeckRequestArgs),e.onDeckRequestArgs=null)}var f,g,e=this;f=this._fingerprint(a),this.cancelled||f!==this.lastReq||((g=d[f])?g.done(h).fail(i):c<this.maxPendingRequests?(c++,d[f]=this._send(a).done(h).fail(i).always(j)):this.onDeckRequestArgs=[].slice.call(arguments,0))},get:function(c,d){var e,f;d=d||a.noop,c=b.isString(c)?{url:c}:c||{},f=this._fingerprint(c),this.cancelled=!1,this.lastReq=f,(e=this._cache.get(f))?d(null,e):this._get(c,d)},cancel:function(){this.cancelled=!0}}),g}(),h=window.SearchIndex=function(){"use strict";function e(c){c=c||{},c.datumTokenizer&&c.queryTokenizer||a.error("datumTokenizer and queryTokenizer are both required"),this.identify=c.identify||b.stringify,this.datumTokenizer=c.datumTokenizer,this.queryTokenizer=c.queryTokenizer,this.matchAnyQueryToken=c.matchAnyQueryToken,this.reset()}function f(a){return a=b.filter(a,function(a){return!!a}),a=b.map(a,function(a){return a.toLowerCase()})}function g(){var a={};return a[d]=[],a[c]={},a}function h(a){for(var b={},c=[],d=0,e=a.length;d<e;d++)b[a[d]]||(b[a[d]]=!0,c.push(a[d]));return c}function i(a,b){var c=0,d=0,e=[];a=a.sort(),b=b.sort();for(var f=a.length,g=b.length;c<f&&d<g;)a[c]<b[d]?c++:a[c]>b[d]?d++:(e.push(a[c]),c++,d++);return e}var c="c",d="i";return b.mixin(e.prototype,{bootstrap:function(b){this.datums=b.datums,this.trie=b.trie},add:function(a){var e=this;a=b.isArray(a)?a:[a],b.each(a,function(a){var h,i;e.datums[h=e.identify(a)]=a,i=f(e.datumTokenizer(a)),b.each(i,function(a){var b,f,i;for(b=e.trie,f=a.split("");i=f.shift();)b=b[c][i]||(b[c][i]=g()),b[d].push(h)})})},get:function(c){var d=this;return b.map(c,function(a){return d.datums[a]})},search:function(e){var j,k,g=this;return j=f(this.queryTokenizer(e)),b.each(j,function(a){var b,e,f,h;if(k&&0===k.length&&!g.matchAnyQueryToken)return!1;for(b=g.trie,e=a.split("");b&&(f=e.shift());)b=b[c][f];if(b&&0===e.length)h=b[d].slice(0),k=k?i(k,h):h;else if(!g.matchAnyQueryToken)return k=[],!1}),k?b.map(h(k),function(a){return g.datums[a]}):[]},all:function(){var b=[];for(var c in this.datums)b.push(this.datums[c]);return b},reset:function(){this.datums={},this.trie=g()},serialize:function(){return{datums:this.datums,trie:this.trie}}}),e}(),i=function(){"use strict";function c(a){this.url=a.url,this.ttl=a.ttl,this.cache=a.cache,this.prepare=a.prepare,this.transform=a.transform,this.transport=a.transport,this.thumbprint=a.thumbprint,this.storage=new f(a.cacheKey)}var a;return a={data:"data",protocol:"protocol",thumbprint:"thumbprint"},b.mixin(c.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},store:function(c){this.cache&&(this.storage.set(a.data,c,this.ttl),this.storage.set(a.protocol,location.protocol,this.ttl),this.storage.set(a.thumbprint,this.thumbprint,this.ttl))},fromCache:function(){var d,c={};return this.cache?(c.data=this.storage.get(a.data),c.protocol=this.storage.get(a.protocol),c.thumbprint=this.storage.get(a.thumbprint),d=c.thumbprint!==this.thumbprint||c.protocol!==location.protocol,c.data&&!d?c.data:null):null},fromNetwork:function(a){function d(){a(!0)}function e(c){a(null,b.transform(c))}var c,b=this;a&&(c=this.prepare(this._settings()),this.transport(c).fail(d).done(e))},clear:function(){return this.storage.clear(),this}}),c}(),j=function(){"use strict";function a(a){this.url=a.url,this.prepare=a.prepare,this.transform=a.transform,this.indexResponse=a.indexResponse,this.transport=new g({cache:a.cache,limiter:a.limiter,transport:a.transport,maxPendingRequests:a.maxPendingRequests})}return b.mixin(a.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},get:function(b,c){function f(a,b){c(a?[]:d.transform(b))}var e,d=this;if(c)return b=b||"",e=this.prepare(b,this._settings()),this.transport.get(e,f)},cancelLastRequest:function(){this.transport.cancel()}}),a}(),k=function(){"use strict";function d(d){var e;return d?(e={url:null,ttl:864e5,cache:!0,cacheKey:null,thumbprint:"",prepare:b.identity,transform:b.identity,transport:null},d=b.isString(d)?{url:d}:d,d=b.mixin(e,d),!d.url&&a.error("prefetch requires url to be set"),d.transform=d.filter||d.transform,d.cacheKey=d.cacheKey||d.url,d.thumbprint=c+d.thumbprint,d.transport=d.transport?h(d.transport):a.ajax,d):null}function e(c){var d;if(c)return d={url:null,cache:!0,prepare:null,replace:null,wildcard:null,limiter:null,rateLimitBy:"debounce",rateLimitWait:300,transform:b.identity,transport:null},c=b.isString(c)?{url:c}:c,c=b.mixin(d,c),!c.url&&a.error("remote requires url to be set"),c.transform=c.filter||c.transform,c.prepare=f(c),c.limiter=g(c),c.transport=c.transport?h(c.transport):a.ajax,delete c.replace,delete c.wildcard,delete c.rateLimitBy,delete c.rateLimitWait,c}function f(a){function e(a,b){return b.url=c(b.url,a),b}function f(a,b){return b.url=b.url.replace(d,encodeURIComponent(a)),b}function g(a,b){return b}var b,c,d;return b=a.prepare,c=a.replace,d=a.wildcard,b||(b=c?e:a.wildcard?f:g)}function g(a){function f(a){return function(d){return b.debounce(d,a)}}function g(a){return function(d){return b.throttle(d,a)}}var c,d,e;return c=a.limiter,d=a.rateLimitBy,e=a.rateLimitWait,c||(c=/^throttle$/i.test(d)?g(e):f(e)),c}function h(c){return function(e){function g(a){b.defer(function(){f.resolve(a)})}function h(a){b.defer(function(){f.reject(a)})}var f=a.Deferred();return c(e,g,h),f}}return function(f){var g,h;return g={initialize:!0,identify:b.stringify,datumTokenizer:null,queryTokenizer:null,matchAnyQueryToken:!1,sufficient:5,indexRemote:!1,sorter:null,local:[],prefetch:null,remote:null},f=b.mixin(g,f||{}),!f.datumTokenizer&&a.error("datumTokenizer is required"),!f.queryTokenizer&&a.error("queryTokenizer is required"),h=f.sorter,f.sorter=h?function(a){return a.sort(h)}:b.identity,f.local=b.isFunction(f.local)?f.local():f.local,f.prefetch=d(f.prefetch),f.remote=e(f.remote),f}}();return function(){"use strict";function e(a){a=k(a),this.sorter=a.sorter,this.identify=a.identify,this.sufficient=a.sufficient,this.indexRemote=a.indexRemote,this.local=a.local,this.remote=a.remote?new j(a.remote):null,this.prefetch=a.prefetch?new i(a.prefetch):null,this.index=new h({identify:this.identify,datumTokenizer:a.datumTokenizer,queryTokenizer:a.queryTokenizer}),!1!==a.initialize&&this.initialize()}var c;return c=window&&window.Bloodhound,e.noConflict=function(){return window&&(window.Bloodhound=c),e},e.tokenizers=d,b.mixin(e.prototype,{__ttAdapter:function(){function c(a,c,d){return b.search(a,c,d)}function d(a,c){return b.search(a,c)}var b=this;return this.remote?c:d},_loadPrefetch:function(){function f(a,b){if(a)return d.reject();c.add(b),c.prefetch.store(c.index.serialize()),d.resolve()}var d,e,c=this;return d=a.Deferred(),this.prefetch?(e=this.prefetch.fromCache())?(this.index.bootstrap(e),d.resolve()):this.prefetch.fromNetwork(f):d.resolve(),d.promise()},_initialize:function(){function d(){b.add(b.local)}var b=this;return this.clear(),(this.initPromise=this._loadPrefetch()).done(d),this.initPromise},initialize:function(b){return!this.initPromise||b?this._initialize():this.initPromise},add:function(b){return this.index.add(b),this},get:function(c){return c=b.isArray(c)?c:[].slice.call(arguments),this.index.get(c)},search:function(c,d,e){function h(a){var c=[];b.each(a,function(a){!b.some(g,function(b){return f.identify(a)===f.identify(b)})&&c.push(a)}),f.indexRemote&&f.add(c),e(c)}var g,f=this;return d=d||b.noop,e=e||b.noop,g=this.sorter(this.index.search(c)),d(this.remote?g.slice():g),this.remote&&g.length<this.sufficient?this.remote.get(c,h):this.remote&&this.remote.cancelLastRequest(),this},all:function(){return this.index.all()},clear:function(){return this.index.reset(),this},clearPrefetchCache:function(){return this.prefetch&&this.prefetch.clear(),this},clearRemoteCache:function(){return g.resetCache(),this},ttAdapter:function(){return this.__ttAdapter()}}),e}()}),function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(a){return b(a)}):"object"==typeof exports?module.exports=b(require("jquery")):b(a.jQuery)}(this,function(a){var b=function(){"use strict";return{isMsie:function(){return!!/(msie|trident)/i.test(navigator.userAgent)&&navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return void 0===a},isElement:function(a){return!(!a||1!==a.nodeType)},isJQuery:function(b){return b instanceof a},toStr:function(c){return b.isUndefined(c)||null===c?"":c+""},bind:a.proxy,each:function(b,c){function d(a,b){return c(b,a)}a.each(b,d)},map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){if(!(d=c.call(null,e,a,b)))return!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){if(d=c.call(null,e,a,b))return!1}),!!d):d},mixin:a.extend,identity:function(a){return a},clone:function(b){return a.extend(!0,{},b)},getIdGenerator:function(){var a=0;return function(){return a++}},templatify:function(c){function d(){return String(c)}return a.isFunction(c)?c:d},defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var h,i,f=this,g=arguments;return h=function(){d=null,c||(e=a.apply(f,g))},i=c&&!d,clearTimeout(d),d=setTimeout(h,b),i&&(e=a.apply(f,g)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,j<=0?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},stringify:function(a){return b.isString(a)?a:JSON.stringify(a)},guid:function(){function a(a){var b=(Math.random().toString(16)+"000000000").substr(2,8);return a?"-"+b.substr(0,4)+"-"+b.substr(4,4):b}return"tt-"+a()+a(!0)+a(!0)+a()},noop:function(){}}}(),c=function(){"use strict";function c(c){var g,h;return h=b.mixin({},a,c),g={css:f(),classes:h,html:d(h),selectors:e(h)},{css:g.css,html:g.html,classes:g.classes,selectors:g.selectors,mixin:function(a){b.mixin(a,g)}}}function d(a){return{wrapper:'<span class="'+a.wrapper+'"></span>',menu:'<div role="listbox" class="'+a.menu+'"></div>'}}function e(a){var c={};return b.each(a,function(a,b){c[b]="."+a}),c}function f(){var a={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},menu:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:" 0"}};return b.isMsie()&&b.mixin(a.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),a}var a={wrapper:"twitter-typeahead",input:"tt-input",hint:"tt-hint",menu:"tt-menu",dataset:"tt-dataset",suggestion:"tt-suggestion",selectable:"tt-selectable",empty:"tt-empty",open:"tt-open",cursor:"tt-cursor",highlight:"tt-highlight"};return c}(),d=function(){"use strict";function e(b){b&&b.el||a.error("EventBus initialized without el"),this.$el=a(b.el)}var c,d;return c="typeahead:",d={render:"rendered",cursorchange:"cursorchanged",select:"selected",autocomplete:"autocompleted"},b.mixin(e.prototype,{_trigger:function(b,d){var e=a.Event(c+b);return this.$el.trigger.call(this.$el,e,d||[]),e},before:function(a){var b,c;return b=[].slice.call(arguments,1),c=this._trigger("before"+a,b),c.isDefaultPrevented()},trigger:function(a){var b;this._trigger(a,[].slice.call(arguments,1)),(b=d[a])&&this._trigger(b,[].slice.call(arguments,1))}}),e}(),e=function(){"use strict";function c(b,c,d,e){var f;if(!d)return this;for(c=c.split(a),d=e?j(d,e):d,this._callbacks=this._callbacks||{};f=c.shift();)this._callbacks[f]=this._callbacks[f]||{sync:[],async:[]},this._callbacks[f][b].push(d);return this}function d(a,b,d){return c.call(this,"async",a,b,d)}function e(a,b,d){return c.call(this,"sync",a,b,d)}function f(b){var c;if(!this._callbacks)return this;for(b=b.split(a);c=b.shift();)delete this._callbacks[c];return this}function g(c){var d,e,f,g,i;if(!this._callbacks)return this;for(c=c.split(a),f=[].slice.call(arguments,1);(d=c.shift())&&(e=this._callbacks[d]);)g=h(e.sync,this,[d].concat(f)),i=h(e.async,this,[d].concat(f)),g()&&b(i);return this}function h(a,b,c){function d(){for(var d,e=0,f=a.length;!d&&e<f;e+=1)d=!1===a[e].apply(b,c);return!d}return d}function i(){return window.setImmediate?function(b){setImmediate(function(){b()})}:function(b){setTimeout(function(){b()},0)}}function j(a,b){return a.bind?a.bind(b):function(){a.apply(b,[].slice.call(arguments,0))}}var a=/\s+/,b=i();return{onSync:e,onAsync:d,off:f,trigger:g}}(),f=function(a){"use strict";function e(a){return d[a.toUpperCase()]||a}function f(a,c,d,f){for(var h,g=[],i=0,j=a.length;i<j;i++){var k=b.escapeRegExChars(a[i]);f&&(k=k.replace(/\S/g,e)),g.push(k)}return h=d?"\\b("+g.join("|")+")\\b":"("+g.join("|")+")",c?new RegExp(h):new RegExp(h,"i")}var c={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:!1,caseSensitive:!1,diacriticInsensitive:!1},d={A:"[AaªÀ-Åà-åĀ-ąǍǎȀ-ȃȦȧᴬᵃḀḁẚẠ-ảₐ℀℁℻⒜Ⓐⓐ㍱-㍴㎀-㎄㎈㎉㎩-㎯㏂㏊㏟㏿Ａａ]",B:"[BbᴮᵇḂ-ḇℬ⒝Ⓑⓑ㍴㎅-㎇㏃㏈㏔㏝Ｂｂ]",C:"[CcÇçĆ-čᶜ℀ℂ℃℅℆ℭⅭⅽ⒞Ⓒⓒ㍶㎈㎉㎝㎠㎤㏄-㏇Ｃｃ]",D:"[DdĎďǄ-ǆǱ-ǳᴰᵈḊ-ḓⅅⅆⅮⅾ⒟Ⓓⓓ㋏㍲㍷-㍹㎗㎭-㎯㏅㏈Ｄｄ]",E:"[EeÈ-Ëè-ëĒ-ěȄ-ȇȨȩᴱᵉḘ-ḛẸ-ẽₑ℡ℯℰⅇ⒠Ⓔⓔ㉐㋍㋎Ｅｅ]",F:"[FfᶠḞḟ℉ℱ℻⒡Ⓕⓕ㎊-㎌㎙ﬀ-ﬄＦｆ]",G:"[GgĜ-ģǦǧǴǵᴳᵍḠḡℊ⒢Ⓖⓖ㋌㋍㎇㎍-㎏㎓㎬㏆㏉㏒㏿Ｇｇ]",H:"[HhĤĥȞȟʰᴴḢ-ḫẖℋ-ℎ⒣Ⓗⓗ㋌㍱㎐-㎔㏊㏋㏗Ｈｈ]",I:"[IiÌ-Ïì-ïĨ-İĲĳǏǐȈ-ȋᴵᵢḬḭỈ-ịⁱℐℑℹⅈⅠ-ⅣⅥ-ⅨⅪⅫⅰ-ⅳⅵ-ⅸⅺⅻ⒤Ⓘⓘ㍺㏌㏕ﬁﬃＩｉ]",J:"[JjĲ-ĵǇ-ǌǰʲᴶⅉ⒥ⒿⓙⱼＪｊ]",K:"[KkĶķǨǩᴷᵏḰ-ḵK⒦Ⓚⓚ㎄㎅㎉㎏㎑㎘㎞㎢㎦㎪㎸㎾㏀㏆㏍-㏏Ｋｋ]",L:"[LlĹ-ŀǇ-ǉˡᴸḶḷḺ-ḽℒℓ℡Ⅼⅼ⒧Ⓛⓛ㋏㎈㎉㏐-㏓㏕㏖㏿ﬂﬄＬｌ]",M:"[MmᴹᵐḾ-ṃ℠™ℳⅯⅿ⒨Ⓜⓜ㍷-㍹㎃㎆㎎㎒㎖㎙-㎨㎫㎳㎷㎹㎽㎿㏁㏂㏎㏐㏔-㏖㏘㏙㏞㏟Ｍｍ]",N:"[NnÑñŃ-ŉǊ-ǌǸǹᴺṄ-ṋⁿℕ№⒩Ⓝⓝ㎁㎋㎚㎱㎵㎻㏌㏑Ｎｎ]",O:"[OoºÒ-Öò-öŌ-őƠơǑǒǪǫȌ-ȏȮȯᴼᵒỌ-ỏₒ℅№ℴ⒪Ⓞⓞ㍵㏇㏒㏖Ｏｏ]",P:"[PpᴾᵖṔ-ṗℙ⒫Ⓟⓟ㉐㍱㍶㎀㎊㎩-㎬㎰㎴㎺㏋㏗-㏚Ｐｐ]",Q:"[Qqℚ⒬Ⓠⓠ㏃Ｑｑ]",R:"[RrŔ-řȐ-ȓʳᴿᵣṘ-ṛṞṟ₨ℛ-ℝ⒭Ⓡⓡ㋍㍴㎭-㎯㏚㏛Ｒｒ]",S:"[SsŚ-šſȘșˢṠ-ṣ₨℁℠⒮Ⓢⓢ㎧㎨㎮-㎳㏛㏜ﬆＳｓ]",T:"[TtŢ-ťȚțᵀᵗṪ-ṱẗ℡™⒯Ⓣⓣ㉐㋏㎔㏏ﬅﬆＴｔ]",U:"[UuÙ-Üù-üŨ-ųƯưǓǔȔ-ȗᵁᵘᵤṲ-ṷỤ-ủ℆⒰Ⓤⓤ㍳㍺Ｕｕ]",V:"[VvᵛᵥṼ-ṿⅣ-Ⅷⅳ-ⅷ⒱Ⓥⓥⱽ㋎㍵㎴-㎹㏜㏞Ｖｖ]",W:"[WwŴŵʷᵂẀ-ẉẘ⒲Ⓦⓦ㎺-㎿㏝Ｗｗ]",X:"[XxˣẊ-ẍₓ℻Ⅸ-Ⅻⅸ-ⅻ⒳Ⓧⓧ㏓Ｘｘ]",Y:"[YyÝýÿŶ-ŸȲȳʸẎẏẙỲ-ỹ⒴Ⓨⓨ㏉Ｙｙ]",Z:"[ZzŹ-žǱ-ǳᶻẐ-ẕℤℨ⒵Ⓩⓩ㎐-㎔Ｚｚ]"};return function(e){function h(b){var c,d,f;return(c=g.exec(b.data))&&(f=a.createElement(e.tagName),e.className&&(f.className=e.className),d=b.splitText(c.index),d.splitText(c[0].length),f.appendChild(d.cloneNode(!0)),b.parentNode.replaceChild(f,d)),!!c}function i(a,b){for(var c,d=3,e=0;e<a.childNodes.length;e++)c=a.childNodes[e],c.nodeType===d?e+=b(c)?1:0:i(c,b)}var g;e=b.mixin({},c,e),e.node&&e.pattern&&(e.pattern=b.isArray(e.pattern)?e.pattern:[e.pattern],g=f(e.pattern,e.caseSensitive,e.wordsOnly,e.diacriticInsensitive),i(e.node,h))}}(window.document),g=function(){"use strict";function d(c,d){c=c||{},c.input||a.error("input is missing"),d.mixin(this),this.$hint=a(c.hint),this.$input=a(c.input),this.$input.attr({"aria-activedescendant":"","aria-owns":this.$input.attr("id")+"_listbox",role:"combobox","aria-readonly":"true","aria-autocomplete":"list"}),a(d.menu).attr("id",this.$input.attr("id")+"_listbox"),this.query=this.$input.val(),this.queryWhenFocused=this.hasFocus()?this.query:null,this.$overflowHelper=f(this.$input),this._checkLanguageDirection(),0===this.$hint.length&&(this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=b.noop),this.onSync("cursorchange",this._updateDescendent)}function f(b){return a('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:b.css("font-family"),fontSize:b.css("font-size"),fontStyle:b.css("font-style"),fontVariant:b.css("font-variant"),fontWeight:b.css("font-weight"),wordSpacing:b.css("word-spacing"),letterSpacing:b.css("letter-spacing"),textIndent:b.css("text-indent"),textRendering:b.css("text-rendering"),textTransform:b.css("text-transform")}).insertAfter(b)}function g(a,b){return d.normalizeQuery(a)===d.normalizeQuery(b)}function h(a){return a.altKey||a.ctrlKey||a.metaKey||a.shiftKey}var c;return c={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},d.normalizeQuery=function(a){return b.toStr(a).replace(/^\s*/g,"").replace(/\s{2,}/g," ")},b.mixin(d.prototype,e,{_onBlur:function(){this.resetInputValue(),this.trigger("blurred")},_onFocus:function(){this.queryWhenFocused=this.query,this.trigger("focused")},_onKeydown:function(b){var d=c[b.which||b.keyCode];this._managePreventDefault(d,b),d&&this._shouldTrigger(d,b)&&this.trigger(d+"Keyed",b)},_onInput:function(){this._setQuery(this.getInputValue()),this.clearHintIfInvalid(),this._checkLanguageDirection()},_managePreventDefault:function(b,c){var d;switch(b){case"up":case"down":d=!h(c);break;default:d=!1}d&&c.preventDefault()},_shouldTrigger:function(b,c){var d;switch(b){case"tab":d=!h(c);break;default:d=!0}return d},_checkLanguageDirection:function(){var b=(this.$input.css("direction")||"ltr").toLowerCase();this.dir!==b&&(this.dir=b,this.$hint.attr("dir",b),this.trigger("langDirChanged",b))},_setQuery:function(b,c){var d,e;d=g(b,this.query),e=!!d&&this.query.length!==b.length,this.query=b,c||d?!c&&e&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",this.query)},_updateDescendent:function(b,c){this.$input.attr("aria-activedescendant",c)},bind:function(){var d,e,f,g,a=this;return d=b.bind(this._onBlur,this),e=b.bind(this._onFocus,this),f=b.bind(this._onKeydown,this),g=b.bind(this._onInput,this),this.$input.on("blur.tt",d).on("focus.tt",e).on("keydown.tt",f),!b.isMsie()||b.isMsie()>9?this.$input.on("input.tt",g):this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(d){c[d.which||d.keyCode]||b.defer(b.bind(a._onInput,a,d))}),this},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getLangDir:function(){return this.dir},getQuery:function(){return this.query||""},setQuery:function(b,c){this.setInputValue(b),this._setQuery(b,c)},hasQueryChangedSinceLastFocus:function(){return this.query!==this.queryWhenFocused},getInputValue:function(){return this.$input.val()},setInputValue:function(b){this.$input.val(b),this.clearHintIfInvalid(),this._checkLanguageDirection()},resetInputValue:function(){this.setInputValue(this.query)},getHint:function(){return this.$hint.val()},setHint:function(b){this.$hint.val(b)},clearHint:function(){this.setHint("")},clearHintIfInvalid:function(){var b,c,d,e;b=this.getInputValue(),c=this.getHint(),d=b!==c&&0===c.indexOf(b),!(e=""!==b&&d&&!this.hasOverflow())&&this.clearHint()},hasFocus:function(){return this.$input.is(":focus")},hasOverflow:function(){var b=this.$input.width()-2;return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>=b},isCursorAtEnd:function(){var a,c,d;return a=this.$input.val().length,c=this.$input[0].selectionStart,b.isNumber(c)?c===a:!document.selection||(d=document.selection.createRange(),d.moveStart("character",-a),a===d.text.length)},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$overflowHelper.remove(),this.$hint=this.$input=this.$overflowHelper=a("<div>")}}),d}(),h=function(){"use strict";function g(c,e){c=c||{},c.templates=c.templates||{},c.templates.notFound=c.templates.notFound||c.templates.empty,c.source||a.error("missing source"),c.node||a.error("missing node"),c.name&&!j(c.name)&&a.error("invalid dataset name: "+c.name),e.mixin(this),this.highlight=!!c.highlight,this.name=b.toStr(c.name||d()),this.limit=c.limit||5,this.displayFn=h(c.display||c.displayKey),this.templates=i(c.templates,this.displayFn),this.source=c.source.__ttAdapter?c.source.__ttAdapter():c.source,this.async=b.isUndefined(c.async)?this.source.length>2:!!c.async,this._resetLastSuggestion(),this.$el=a(c.node).attr("role","presentation").addClass(this.classes.dataset).addClass(this.classes.dataset+"-"+this.name)}function h(a){function c(b){return b[a]}return a=a||b.stringify,b.isFunction(a)?a:c}function i(c,d){function e(c){return a('<div role="option">').attr("id",b.guid()).text(d(c))}return{notFound:c.notFound&&b.templatify(c.notFound),pending:c.pending&&b.templatify(c.pending),header:c.header&&b.templatify(c.header),footer:c.footer&&b.templatify(c.footer),suggestion:c.suggestion||e}}function j(a){return/^[_a-zA-Z0-9-]+$/.test(a)}var c,d;return c={dataset:"tt-selectable-dataset",val:"tt-selectable-display",obj:"tt-selectable-object"},d=b.getIdGenerator(),g.extractData=function(d){var e=a(d);return e.data(c.obj)?{dataset:e.data(c.dataset)||"",val:e.data(c.val)||"",obj:e.data(c.obj)||null}:null},b.mixin(g.prototype,e,{_overwrite:function(b,c){c=c||[],c.length?this._renderSuggestions(b,c):this.async&&this.templates.pending?this._renderPending(b):!this.async&&this.templates.notFound?this._renderNotFound(b):this._empty(),this.trigger("rendered",c,!1,this.name)},_append:function(b,c){c=c||[],c.length&&this.$lastSuggestion.length?this._appendSuggestions(b,c):c.length?this._renderSuggestions(b,c):!this.$lastSuggestion.length&&this.templates.notFound&&this._renderNotFound(b),this.trigger("rendered",c,!0,this.name)},_renderSuggestions:function(b,c){var d;d=this._getSuggestionsFragment(b,c),this.$lastSuggestion=d.children().last(),this.$el.html(d).prepend(this._getHeader(b,c)).append(this._getFooter(b,c))},_appendSuggestions:function(b,c){var d,e;d=this._getSuggestionsFragment(b,c),e=d.children().last(),this.$lastSuggestion.after(d),this.$lastSuggestion=e},_renderPending:function(b){var c=this.templates.pending;this._resetLastSuggestion(),c&&this.$el.html(c({query:b,dataset:this.name}))},_renderNotFound:function(b){var c=this.templates.notFound;this._resetLastSuggestion(),c&&this.$el.html(c({query:b,dataset:this.name}))},_empty:function(){this.$el.empty(),this._resetLastSuggestion()},_getSuggestionsFragment:function(e,g){var i,h=this;return i=document.createDocumentFragment(),b.each(g,function(d){var f,g;g=h._injectQuery(e,d),f=a(h.templates.suggestion(g)).data(c.dataset,h.name).data(c.obj,d).data(c.val,h.displayFn(d)).addClass(h.classes.suggestion+" "+h.classes.selectable),i.appendChild(f[0])}),this.highlight&&f({className:this.classes.highlight,node:i,pattern:e}),a(i)},_getFooter:function(b,c){return this.templates.footer?this.templates.footer({query:b,suggestions:c,dataset:this.name}):null},_getHeader:function(b,c){return this.templates.header?this.templates.header({query:b,suggestions:c,dataset:this.name}):null},_resetLastSuggestion:function(){this.$lastSuggestion=a()},_injectQuery:function(c,d){return b.isObject(d)?b.mixin({_query:c},d):d},update:function(c){function h(a){f||(f=!0,a=(a||[]).slice(0,d.limit),g=a.length,d._overwrite(c,a),g<d.limit&&d.async&&d.trigger("asyncRequested",c,d.name))}function i(b){if(b=b||[],!e&&g<d.limit){d.cancel=a.noop;var f=Math.abs(g-d.limit);g+=f,d._append(c,b.slice(0,f)),d.async&&d.trigger("asyncReceived",c,d.name)}}var d=this,e=!1,f=!1,g=0;this.cancel(),this.cancel=function(){e=!0,d.cancel=a.noop,d.async&&d.trigger("asyncCanceled",c,d.name)},this.source(c,h,i),!f&&h([])},cancel:a.noop,clear:function(){this._empty(),this.cancel(),this.trigger("cleared")},isEmpty:function(){return this.$el.is(":empty")},destroy:function(){this.$el=a("<div>")}}),g}(),i=function(){"use strict";function c(c,d){function f(b){var c=e.$node.find(b.node).first();return b.node=c.length?c:a("<div>").appendTo(e.$node),new h(b,d)}var e=this;c=c||{},c.node||a.error("node is required"),d.mixin(this),this.$node=a(c.node),this.query=null,this.datasets=b.map(c.datasets,f)}return b.mixin(c.prototype,e,{_onSelectableClick:function(c){this.trigger("selectableClicked",a(c.currentTarget))},_onRendered:function(b,c,d,e){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetRendered",c,d,e)},_onCleared:function(){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetCleared")},_propagate:function(){this.trigger.apply(this,arguments)},_allDatasetsEmpty:function(){return b.every(this.datasets,b.bind(function(b){var c=b.isEmpty();return this.$node.attr("aria-expanded",!c),c},this))},_getSelectables:function(){return this.$node.find(this.selectors.selectable)},_removeCursor:function(){var b=this.getActiveSelectable();b&&b.removeClass(this.classes.cursor)},_ensureVisible:function(b){var c,d,e,f;c=b.position().top,d=c+b.outerHeight(!0),e=this.$node.scrollTop(),f=this.$node.height()+parseInt(this.$node.css("paddingTop"),10)+parseInt(this.$node.css("paddingBottom"),10),c<0?this.$node.scrollTop(e+c):f<d&&this.$node.scrollTop(e+(d-f))},bind:function(){var d,c=this;return d=b.bind(this._onSelectableClick,this),this.$node.on("click.tt",this.selectors.selectable,d),this.$node.on("mouseover",this.selectors.selectable,function(){c.setCursor(a(this))}),this.$node.on("mouseleave",function(){c._removeCursor()}),b.each(this.datasets,function(a){a.onSync("asyncRequested",c._propagate,c).onSync("asyncCanceled",c._propagate,c).onSync("asyncReceived",c._propagate,c).onSync("rendered",c._onRendered,c).onSync("cleared",c._onCleared,c)}),this},isOpen:function(){return this.$node.hasClass(this.classes.open)},open:function(){this.$node.scrollTop(0),this.$node.addClass(this.classes.open)},close:function(){this.$node.attr("aria-expanded",!1),this.$node.removeClass(this.classes.open),this._removeCursor()},setLanguageDirection:function(b){this.$node.attr("dir",b)},selectableRelativeToCursor:function(b){var c,d,e,f;return d=this.getActiveSelectable(),c=this._getSelectables(),e=d?c.index(d):-1,f=e+b,f=(f+1)%(c.length+1)-1,f=f<-1?c.length-1:f,-1===f?null:c.eq(f)},setCursor:function(b){this._removeCursor(),(b=b&&b.first())&&(b.addClass(this.classes.cursor),this._ensureVisible(b))},getSelectableData:function(b){return b&&b.length?h.extractData(b):null},getActiveSelectable:function(){var b=this._getSelectables().filter(this.selectors.cursor).first();return b.length?b:null},getTopSelectable:function(){var b=this._getSelectables().first();return b.length?b:null},update:function(c){function e(a){a.update(c)}var d=c!==this.query;return d&&(this.query=c,b.each(this.datasets,e)),d},empty:function(){function c(a){a.clear()}b.each(this.datasets,c),this.query=null,this.$node.addClass(this.classes.empty)},destroy:function(){function d(a){a.destroy()}this.$node.off(".tt"),this.$node=a("<div>"),b.each(this.datasets,d)}}),c}(),j=function(){"use strict";function c(c){this.$el=a("<span></span>",{role:"status","aria-live":"polite"}).css({position:"absolute",padding:"0",border:"0",height:"1px",width:"1px","margin-bottom":"-1px","margin-right":"-1px",overflow:"hidden",clip:"rect(0 0 0 0)","white-space":"nowrap"}),c.$input.after(this.$el),b.each(c.menu.datasets,b.bind(function(a){a.onSync&&(a.onSync("rendered",b.bind(this.update,this)),a.onSync("cleared",b.bind(this.cleared,this)))},this))}return b.mixin(c.prototype,{update:function(b,c){var e,d=c.length;e=1===d?{result:"result",is:"is"}:{result:"results",is:"are"},this.$el.text(d+" "+e.result+" "+e.is+" available, use up and down arrow keys to navigate.")},cleared:function(){this.$el.text("")}}),c}(),k=function(){"use strict";function c(){i.apply(this,[].slice.call(arguments,0))}var a=i.prototype;return b.mixin(c.prototype,i.prototype,{open:function(){return!this._allDatasetsEmpty()&&this._show(),a.open.apply(this,[].slice.call(arguments,0))},close:function(){return this._hide(),a.close.apply(this,[].slice.call(arguments,0))},_onRendered:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),a._onRendered.apply(this,[].slice.call(arguments,0))},_onCleared:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),a._onCleared.apply(this,[].slice.call(arguments,0))},setLanguageDirection:function(c){return this.$node.css("ltr"===c?this.css.ltr:this.css.rtl),a.setLanguageDirection.apply(this,[].slice.call(arguments,0))},_hide:function(){this.$node.hide()},_show:function(){this.$node.css("display","block")}}),c}(),l=function(){"use strict";function c(c,e){var f,g,h,i,j,k,l,m,n,o,p;c=c||{},c.input||a.error("missing input"),c.menu||a.error("missing menu"),c.eventBus||a.error("missing event bus"),e.mixin(this),this.eventBus=c.eventBus,this.minLength=b.isNumber(c.minLength)?c.minLength:1,this.input=c.input,this.menu=c.menu,this.enabled=!0,this.active=!1,this.input.hasFocus()&&this.activate(),this.dir=this.input.getLangDir(),this._hacks(),this.menu.bind().onSync("selectableClicked",this._onSelectableClicked,this).onSync("asyncRequested",this._onAsyncRequested,this).onSync("asyncCanceled",this._onAsyncCanceled,this).onSync("asyncReceived",this._onAsyncReceived,this).onSync("datasetRendered",this._onDatasetRendered,this).onSync("datasetCleared",this._onDatasetCleared,this),f=d(this,"activate","open","_onFocused"),g=d(this,"deactivate","_onBlurred"),h=d(this,"isActive","isOpen","_onEnterKeyed"),i=d(this,"isActive","isOpen","_onTabKeyed"),j=d(this,"isActive","_onEscKeyed"),k=d(this,"isActive","open","_onUpKeyed"),l=d(this,"isActive","open","_onDownKeyed"),m=d(this,"isActive","isOpen","_onLeftKeyed"),n=d(this,"isActive","isOpen","_onRightKeyed"),o=d(this,"_openIfActive","_onQueryChanged"),p=d(this,"_openIfActive","_onWhitespaceChanged"),this.input.bind().onSync("focused",f,this).onSync("blurred",g,this).onSync("enterKeyed",h,this).onSync("tabKeyed",i,this).onSync("escKeyed",j,this).onSync("upKeyed",k,this).onSync("downKeyed",l,this).onSync("leftKeyed",m,this).onSync("rightKeyed",n,this).onSync("queryChanged",o,this).onSync("whitespaceChanged",p,this).onSync("langDirChanged",this._onLangDirChanged,this)}function d(a){var c=[].slice.call(arguments,1);return function(){var d=[].slice.call(arguments);b.each(c,function(b){return a[b].apply(a,d)})}}return b.mixin(c.prototype,{_hacks:function(){var d,e;d=this.input.$input||a("<div>"),e=this.menu.$node||a("<div>"),d.on("blur.tt",function(a){var c,f,g;c=document.activeElement,f=e.is(c),g=e.has(c).length>0,b.isMsie()&&(f||g)&&(a.preventDefault(),a.stopImmediatePropagation(),b.defer(function(){d.focus()}))}),e.on("mousedown.tt",function(a){a.preventDefault()})},_onSelectableClicked:function(b,c){this.select(c)},_onDatasetCleared:function(){this._updateHint()},_onDatasetRendered:function(b,c,d,e){this._updateHint(),this.eventBus.trigger("render",c,d,e)},_onAsyncRequested:function(b,c,d){this.eventBus.trigger("asyncrequest",d,c)},_onAsyncCanceled:function(b,c,d){this.eventBus.trigger("asynccancel",d,c)},_onAsyncReceived:function(b,c,d){this.eventBus.trigger("asyncreceive",d,c)},_onFocused:function(){this._minLengthMet()&&this.menu.update(this.input.getQuery())},_onBlurred:function(){this.input.hasQueryChangedSinceLastFocus()&&this.eventBus.trigger("change",this.input.getQuery())},_onEnterKeyed:function(b,c){var d;(d=this.menu.getActiveSelectable())&&this.select(d)&&(c.preventDefault(),c.stopPropagation())},_onTabKeyed:function(b,c){var d;(d=this.menu.getActiveSelectable())?this.select(d)&&c.preventDefault():(d=this.menu.getTopSelectable())&&this.autocomplete(d)&&c.preventDefault()},_onEscKeyed:function(){this.close()},_onUpKeyed:function(){this.moveCursor(-1)},_onDownKeyed:function(){this.moveCursor(1)},_onLeftKeyed:function(){"rtl"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getActiveSelectable()||this.menu.getTopSelectable())},_onRightKeyed:function(){"ltr"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getActiveSelectable()||this.menu.getTopSelectable())},_onQueryChanged:function(b,c){this._minLengthMet(c)?this.menu.update(c):this.menu.empty()},_onWhitespaceChanged:function(){this._updateHint()},_onLangDirChanged:function(b,c){this.dir!==c&&(this.dir=c,this.menu.setLanguageDirection(c))},_openIfActive:function(){this.isActive()&&this.open()},_minLengthMet:function(c){return c=b.isString(c)?c:this.input.getQuery()||"",c.length>=this.minLength},_updateHint:function(){var c,d,e,f,h,i,j;c=this.menu.getTopSelectable(),d=this.menu.getSelectableData(c),e=this.input.getInputValue(),!d||b.isBlankString(e)||this.input.hasOverflow()?this.input.clearHint():(f=g.normalizeQuery(e),h=b.escapeRegExChars(f),i=new RegExp("^(?:"+h+")(.+$)","i"),(j=i.exec(d.val))&&this.input.setHint(e+j[1]))},isEnabled:function(){return this.enabled},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},isActive:function(){return this.active},activate:function(){return!!this.isActive()||!(!this.isEnabled()||this.eventBus.before("active"))&&(this.active=!0,this.eventBus.trigger("active"),!0)},deactivate:function(){return!this.isActive()||!this.eventBus.before("idle")&&(this.active=!1,this.close(),this.eventBus.trigger("idle"),!0)},isOpen:function(){return this.menu.isOpen()},open:function(){return this.isOpen()||this.eventBus.before("open")||(this.menu.open(),this._updateHint(),this.eventBus.trigger("open")),this.isOpen()},close:function(){return this.isOpen()&&!this.eventBus.before("close")&&(this.menu.close(),this.input.clearHint(),this.input.resetInputValue(),this.eventBus.trigger("close")),!this.isOpen()},setVal:function(c){this.input.setQuery(b.toStr(c))},getVal:function(){return this.input.getQuery()},select:function(b){var c=this.menu.getSelectableData(b);return!(!c||this.eventBus.before("select",c.obj,c.dataset))&&(this.input.setQuery(c.val,!0),this.eventBus.trigger("select",c.obj,c.dataset),this.close(),!0)},autocomplete:function(b){var c,d;return c=this.input.getQuery(),d=this.menu.getSelectableData(b),!(!(d&&c!==d.val)||this.eventBus.before("autocomplete",d.obj,d.dataset))&&(this.input.setQuery(d.val),this.eventBus.trigger("autocomplete",d.obj,d.dataset),!0)},moveCursor:function(b){var c,d,e,f,g,i;return c=this.input.getQuery(),d=this.menu.selectableRelativeToCursor(b),e=this.menu.getSelectableData(d),f=e?e.obj:null,g=e?e.dataset:null,i=d?d.attr("id"):null,this.input.trigger("cursorchange",i),!(this._minLengthMet()&&this.menu.update(c))&&!this.eventBus.before("cursorchange",f,g)&&(this.menu.setCursor(d),e?this.input.setInputValue(e.val):(this.input.resetInputValue(),this._updateHint()),this.eventBus.trigger("cursorchange",f,g),!0)},destroy:function(){this.input.destroy(),this.menu.destroy()}}),c}();!function(){"use strict";function m(b,c){b.each(function(){var d,b=a(this);(d=b.data(f.typeahead))&&c(d,b)})}function n(a,b){return a.clone().addClass(b.classes.hint).removeData().css(b.css.hint).css(p(a)).prop("readonly",!0).removeAttr("id name placeholder required").attr({spellcheck:"false",tabindex:-1})}function o(a,b){a.data(f.attrs,{dir:a.attr("dir"),autocomplete:a.attr("autocomplete"),spellcheck:a.attr("spellcheck"),style:a.attr("style")}),a.addClass(b.classes.input).attr({spellcheck:!1});try{!a.attr("dir")&&a.attr("dir","auto")}catch(a){}return a}function p(a){return{backgroundAttachment:a.css("background-attachment"),backgroundClip:a.css("background-clip"),backgroundColor:a.css("background-color"),backgroundImage:a.css("background-image"),backgroundOrigin:a.css("background-origin"),backgroundPosition:a.css("background-position"),backgroundRepeat:a.css("background-repeat"),backgroundSize:a.css("background-size")}}function q(a){var c,d;c=a.data(f.www),d=a.parent().filter(c.selectors.wrapper),b.each(a.data(f.attrs),function(c,d){b.isUndefined(c)?a.removeAttr(d):a.attr(d,c)}),a.removeData(f.typeahead).removeData(f.www).removeData(f.attr).removeClass(c.classes.input),d.length&&(a.detach().insertAfter(d),d.remove())}function r(c){var d,e;return d=b.isJQuery(c)||b.isElement(c),e=d?a(c).first():[],e.length?e:null}var e,f,h;e=a.fn.typeahead,f={www:"tt-www",attrs:"tt-attrs",typeahead:"tt-typeahead"},h={initialize:function(h,m){function q(){var c,e,q,s,t,u,v,w,x,z,A;b.each(m,function(a){a.highlight=!!h.highlight}),c=a(this),e=a(p.html.wrapper),q=r(h.hint),s=r(h.menu),t=!1!==h.hint&&!q,u=!1!==h.menu&&!s,t&&(q=n(c,p)),u&&(s=a(p.html.menu).css(p.css.menu)),q&&q.val(""),c=o(c,p),(t||u)&&(e.css(p.css.wrapper),c.css(t?p.css.input:p.css.inputWithNoHint),c.wrap(e).parent().prepend(t?q:null).append(u?s:null)),A=u?k:i,v=new d({el:c}),w=new g({hint:q,input:c},p),x=new A({node:s,datasets:m},p),new j({$input:c,menu:x}),z=new l({input:w,menu:x,eventBus:v,minLength:h.minLength},p),c.data(f.www,p),c.data(f.typeahead,z)}var p;return m=b.isArray(m)?m:[].slice.call(arguments,1),h=h||{},p=c(h.classNames),this.each(q)},isEnabled:function(){var b;return m(this.first(),function(a){b=a.isEnabled()}),b},enable:function(){return m(this,function(a){a.enable()}),this},disable:function(){return m(this,function(a){a.disable()}),this},isActive:function(){var b;return m(this.first(),function(a){b=a.isActive()}),b},activate:function(){return m(this,function(a){a.activate()}),this},deactivate:function(){return m(this,function(a){a.deactivate()}),this},isOpen:function(){var b;return m(this.first(),function(a){b=a.isOpen()}),b},open:function(){return m(this,function(a){a.open()}),this},close:function(){return m(this,function(a){a.close()}),this},select:function(c){var d=!1,e=a(c);return m(this.first(),function(a){d=a.select(e)}),d},autocomplete:function(c){var d=!1,e=a(c);return m(this.first(),function(a){d=a.autocomplete(e)}),d},moveCursor:function(b){var c=!1;return m(this.first(),function(a){c=a.moveCursor(b)}),c},val:function(c){var d;return arguments.length?(m(this,function(a){a.setVal(b.toStr(c))}),this):(m(this.first(),function(a){d=a.getVal()}),d)},destroy:function(){return m(this,function(a,b){q(b),a.destroy()}),this}},a.fn.typeahead=function(a){return h[a]?h[a].apply(this,[].slice.call(arguments,1)):h.initialize.apply(this,arguments)},a.fn.typeahead.noConflict=function(){return a.fn.typeahead=e,this}}()});

$.Thailand = function (options) {
    'use strict';

    options = $.extend({

        database: '../database/db.json',
        database_type: 'auto', // json or zip; any other value will be ignored and script will attempt to evaluate the type from file extension instead.
        zip_worker_path: false, // path to zip worker folder e.g. './jquery.Thailand.js/dependencies/zip.js/'; Leave it to false unless you found any error.
        autocomplete_size: 20,

        onLoad: function () {},
        onDataFill: function () {},

        $district: false,
        $district_code: false, // geodb only
        $amphoe: false,
        $amphoe_code: false, // geodb only
        $province: false,
        $province_code: false, // geodb only
        $zipcode: false,
        $search: false

    }, options);

    var preprocess = function (data) {
            var lookup = [],
                words = [],
                expanded = [],
                useLookup = false,
                t;

            if (data.lookup && data.words) {
                // compact with dictionary and lookup
                useLookup = true;
                lookup = data.lookup.split('|');
                words = data.words.split('|');
                data = data.data;
            }

            t = function (text) {
                function repl(m) {
                    var ch = m.charCodeAt(0);
                    return words[ch < 97 ? ch - 65 : 26 + ch - 97];
                }
                if (!useLookup) {
                    return text;
                }
                if (typeof text === 'number') {
                    text = lookup[text];
                }
                return text.replace(/[A-Z]/ig, repl);
            };

            if (!data[0].length) {
                // non-compacted database
                return data;
            }
            // decompacted database in hierarchical form of:
            // [["province",[["amphur",[["district",["zip"...]]...]]...]]...]
            data.map(function (provinces) {
                var i = 1;
                if(provinces.length === 3){ // geographic database
                    i = 2;
                }

                provinces[i].map(function (amphoes) {
                    amphoes[i].map(function (districts) {
                        districts[i] = districts[i] instanceof Array ? districts[i] : [districts[i]];
                        districts[i].map(function (zipcode) {
                            var entry = {
                                district: t(districts[0]),
                                amphoe: t(amphoes[0]),
                                province: t(provinces[0]),
                                zipcode: zipcode
                            };
                            if(i === 2){ // geographic database
                                entry.district_code = districts[1] || false;
                                entry.amphoe_code = amphoes[1] || false;
                                entry.province_code = provinces[1] || false;
                            }
                            expanded.push(entry);
                        });
                    });
                });
            });
            return expanded;
        },
        similar_text = function (first, second, percentage) {
            // compare 2 strings, return value of similarity compare to each other. more value = more similarity
            first += '';
            second += '';

            var pos1 = 0,
                pos2 = 0,
                max = 0,
                firstLength = first.length,
                secondLength = second.length,
                p,
                q,
                l,
                sum;

            for (p = 0; p < firstLength; p = p + 1) {
                for (q = 0; q < secondLength; q = q + 1) {
                    l = 0;
                    while ((p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l))) {
                        l = l + 1;
                    }
                    if (l > max) {
                        max = l;
                        pos1 = p;
                        pos2 = q;
                    }
                }
            }

            sum = max;

            if (sum) {
                if (pos1 && pos2) {
                    sum += similar_text(first.substr(0, pos2), second.substr(0, pos2), false);
                }

                if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
                    sum += similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max, secondLength - pos2 - max), false);
                }
            }

            if (percentage === false) {
                return sum;
            } else {
                if (first === second) {
                    return 100;
                } else {
                    if (firstLength > secondLength) {
                        return Math.floor(sum / firstLength * 100);
                    } else {
                        return Math.floor(sum / secondLength * 100);
                    }
                }
            }
        },
        loadDB = function (callback) {
            var type = options.database_type.toLowerCase(),
                xhr;

            if (type !== 'json' && type !== 'zip') {
                type = options.database.split('.').pop(); // attempt to use file extension instead
            }

            switch (type) {

            case 'json':

                $.getJSON(options.database, function (json) {
                    callback(new JQL(preprocess(json)));
                }).fail(function (err) {
                    throw new Error('File "' + options.database + '" is not exists.');
                });
                break;

            case 'zip':

                if (!options.zip_worker_path) {
                    $('script').each(function () {
                        var fragments = this.src.split('/'),
                            filename = fragments.pop();
                        if (filename === 'zip.js') {
                            zip.workerScriptsPath = fragments.join('/') + '/';
                        }
                    });
                }

                xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            zip.createReader(new zip.BlobReader(xhr.response), function (zipReader) {
                                zipReader.getEntries(function (r) {
                                    r[0].getData(new zip.BlobWriter(), function (blob) {
                                        var reader = new FileReader();
                                        reader.onload = function () {
                                            callback(new JQL(preprocess(JSON.parse(reader.result))));
                                        };
                                        reader.readAsText(blob);
                                    });
                                });
                            });
                        } else {
                            throw new Error('File "' + options.database + '" is not exists.');
                        }
                    }
                };
                xhr.open('GET', options.database);
                xhr.send();

                break;

            default:
                throw new Error('Unknown database type: "' + options.database_type + '". Please define database_type explicitly (json or zip)');
            }

        };

    // get database
    loadDB(function (DB) {
        var i,
            key,
            templates = { // template of autocomplete choices
                empty: ' ',
                suggestion: function (data) {
                    if (data.zipcode) {
                        data.zipcode = ' » ' + data.zipcode;
                    }
                    return '<div>' + data.district + ' » ' + data.amphoe + ' » ' + data.province + data.zipcode + '</div>';
                }
            },
            autocomplete_handler = function (e, v) { // set value when user selected autocomplete choice
                
                for (i in options) {
                    key = i.replace('$','');
                    if (i.indexOf('$') > -1 && options.hasOwnProperty(i) && options[i] && v[key]) {
                        options[i].typeahead('val', v[key]).trigger('change');
                    }
                }

                if (typeof options.onDataFill === 'function') {
                    delete v.likely;
                    options.onDataFill(v);
                }

            };

        for (i in options) {
            if (i.indexOf('$') > -1 && i !== '$search' && options.hasOwnProperty(i) && options[i]) {
                
                options[i].typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                }, {
                    limit: options.autocomplete_size,
                    templates: templates,
                    source: function (str, callback) {
                        var possibles = [],
                            field = this.$el.data('field');
                        try {
                            possibles = DB.select('*').where(field).match('^' + str).orderBy(field).fetch();
                        } catch (e) {}
                        callback(possibles);
                    },
                    display: function (data) {
                        return data[this.$el.data('field')];
                    }
                }).parent().find('.tt-dataset').data('field', i.replace('$',''));

            }
        }

        if (options.$search) {
            options.$search.typeahead({
                hint: true,
                highlight: true,
                minLength: 2
            }, {
                limit: options.autocomplete_size,
                templates: templates,
                source: function (str, callback) {
                    var possibles = [],
                        i;
                    try {
                        possibles = new JQL(possibles
                            .concat(DB.select('*').where('zipcode').match(str).fetch())
                            .concat(DB.select('*').where('province').match(str).fetch())
                            .concat(DB.select('*').where('amphoe').match(str).fetch())
                            .concat(DB.select('*').where('district').match(str).fetch())
                            .map(function(item){
                                return JSON.stringify(item);
                            }).filter(function(item, pos, self){
                                return self.indexOf(item) == pos;
                            }).map(function (self) { // give a likely score, will use to sort data later

                                self = JSON.parse(self);
                                self.likely = [
                                    similar_text(str, self.district) * 5,
                                    similar_text(str, self.amphoe.replace(/^เมือง/, '')) * 3,
                                    similar_text(str, self.province),
                                    similar_text(str, self.zipcode)
                                ].reduce(function (a, b) {
                                    return Math.max(a, b);
                                });

                                return self;

                            })).select('*').orderBy('likely desc').fetch();
                    } catch (e) {}

                    callback(possibles);
                },
                
                display: function (data) {
                    return '';
                }
            });
        }
        
        // on autocomplete
        for (i in options) {
            if (i.indexOf('$') > -1 && options.hasOwnProperty(i) && options[i]) {
                options[i]
                    .bind('typeahead:select typeahead:autocomplete', autocomplete_handler)
                    .blur(function () {
                        if (!this.value) {
                            $(this).parent().find('.tt-dataset').html('');
                        }
                    });
            }
        }

        // callback
        if (typeof options.onLoad === 'function') {
            options.onLoad();
        }

        // callback, fallback to version 1.2.
        if (typeof options.onComplete === 'function') {
            options.onComplete();
        }

    });
};