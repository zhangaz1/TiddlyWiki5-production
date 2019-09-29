$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/codemirror-mode-xml","description":"CodeMirror Mode: XML Highlighting","author":"JeremyRuston","list":"readme","version":"5.1.17","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/codemirror/mode/xml/xml.js\":{\"text\":\"// CodeMirror, copyright (c) by Marijn Haverbeke and others\\n// Distributed under an MIT license: http://codemirror.net/LICENSE\\n!function(t){\\\"object\\\"==typeof exports&&\\\"object\\\"==typeof module?t(require(\\\"../../lib/codemirror\\\")):\\\"function\\\"==typeof define&&define.amd?define([\\\"../../lib/codemirror\\\"],t):t(CodeMirror)}(function(t){\\\"use strict\\\";var e={autoSelfClosers:{area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},implicitlyClosed:{dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},contextGrabbers:{dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}},doNotIndent:{pre:!0},allowUnquoted:!0,allowMissing:!0,caseFold:!0},n={autoSelfClosers:{},implicitlyClosed:{},contextGrabbers:{},doNotIndent:{},allowUnquoted:!1,allowMissing:!1,allowMissingTagName:!1,caseFold:!1};t.defineMode(\\\"xml\\\",function(r,o){var a,i,l=r.indentUnit,u={},d=o.htmlMode?e:n;for(var c in d)u[c]=d[c];for(var c in o)u[c]=o[c];function s(t,e){function n(n){return e.tokenize=n,n(t,e)}var r=t.next();return\\\"<\\\"==r?t.eat(\\\"!\\\")?t.eat(\\\"[\\\")?t.match(\\\"CDATA[\\\")?n(m(\\\"atom\\\",\\\"]]>\\\")):null:t.match(\\\"--\\\")?n(m(\\\"comment\\\",\\\"--\\\\x3e\\\")):t.match(\\\"DOCTYPE\\\",!0,!0)?(t.eatWhile(/[\\\\w\\\\._\\\\-]/),n(function t(e){return function(n,r){for(var o;null!=(o=n.next());){if(\\\"<\\\"==o)return r.tokenize=t(e+1),r.tokenize(n,r);if(\\\">\\\"==o){if(1==e){r.tokenize=s;break}return r.tokenize=t(e-1),r.tokenize(n,r)}}return\\\"meta\\\"}}(1))):null:t.eat(\\\"?\\\")?(t.eatWhile(/[\\\\w\\\\._\\\\-]/),e.tokenize=m(\\\"meta\\\",\\\"?>\\\"),\\\"meta\\\"):(a=t.eat(\\\"/\\\")?\\\"closeTag\\\":\\\"openTag\\\",e.tokenize=f,\\\"tag bracket\\\"):\\\"&\\\"==r?(t.eat(\\\"#\\\")?t.eat(\\\"x\\\")?t.eatWhile(/[a-fA-F\\\\d]/)&&t.eat(\\\";\\\"):t.eatWhile(/[\\\\d]/)&&t.eat(\\\";\\\"):t.eatWhile(/[\\\\w\\\\.\\\\-:]/)&&t.eat(\\\";\\\"))?\\\"atom\\\":\\\"error\\\":(t.eatWhile(/[^&<]/),null)}function f(t,e){var n,r,o=t.next();if(\\\">\\\"==o||\\\"/\\\"==o&&t.eat(\\\">\\\"))return e.tokenize=s,a=\\\">\\\"==o?\\\"endTag\\\":\\\"selfcloseTag\\\",\\\"tag bracket\\\";if(\\\"=\\\"==o)return a=\\\"equals\\\",null;if(\\\"<\\\"==o){e.tokenize=s,e.state=h,e.tagName=e.tagStart=null;var i=e.tokenize(t,e);return i?i+\\\" tag error\\\":\\\"tag error\\\"}return/[\\\\'\\\\\\\"]/.test(o)?(e.tokenize=(n=o,(r=function(t,e){for(;!t.eol();)if(t.next()==n){e.tokenize=f;break}return\\\"string\\\"}).isInAttribute=!0,r),e.stringStartCol=t.column(),e.tokenize(t,e)):(t.match(/^[^\\\\s\\\\u00a0=<>\\\\\\\"\\\\']*[^\\\\s\\\\u00a0=<>\\\\\\\"\\\\'\\\\/]/),\\\"word\\\")}function m(t,e){return function(n,r){for(;!n.eol();){if(n.match(e)){r.tokenize=s;break}n.next()}return t}}function g(t){t.context&&(t.context=t.context.prev)}function p(t,e){for(var n;;){if(!t.context)return;if(n=t.context.tagName,!u.contextGrabbers.hasOwnProperty(n)||!u.contextGrabbers[n].hasOwnProperty(e))return;g(t)}}function h(t,e,n){return\\\"openTag\\\"==t?(n.tagStart=e.column(),x):\\\"closeTag\\\"==t?b:h}function x(t,e,n){return\\\"word\\\"==t?(n.tagName=e.current(),i=\\\"tag\\\",v):u.allowMissingTagName&&\\\"endTag\\\"==t?(i=\\\"tag bracket\\\",v(t,e,n)):(i=\\\"error\\\",x)}function b(t,e,n){if(\\\"word\\\"==t){var r=e.current();return n.context&&n.context.tagName!=r&&u.implicitlyClosed.hasOwnProperty(n.context.tagName)&&g(n),n.context&&n.context.tagName==r||!1===u.matchClosing?(i=\\\"tag\\\",k):(i=\\\"tag error\\\",w)}return u.allowMissingTagName&&\\\"endTag\\\"==t?(i=\\\"tag bracket\\\",k(t,e,n)):(i=\\\"error\\\",w)}function k(t,e,n){return\\\"endTag\\\"!=t?(i=\\\"error\\\",k):(g(n),h)}function w(t,e,n){return i=\\\"error\\\",k(t,0,n)}function v(t,e,n){if(\\\"word\\\"==t)return i=\\\"attribute\\\",T;if(\\\"endTag\\\"==t||\\\"selfcloseTag\\\"==t){var r=n.tagName,o=n.tagStart;return n.tagName=n.tagStart=null,\\\"selfcloseTag\\\"==t||u.autoSelfClosers.hasOwnProperty(r)?p(n,r):(p(n,r),n.context=new function(t,e,n){this.prev=t.context,this.tagName=e,this.indent=t.indented,this.startOfLine=n,(u.doNotIndent.hasOwnProperty(e)||t.context&&t.context.noIndent)&&(this.noIndent=!0)}(n,r,o==n.indented)),h}return i=\\\"error\\\",v}function T(t,e,n){return\\\"equals\\\"==t?y:(u.allowMissing||(i=\\\"error\\\"),v(t,0,n))}function y(t,e,n){return\\\"string\\\"==t?N:\\\"word\\\"==t&&u.allowUnquoted?(i=\\\"string\\\",v):(i=\\\"error\\\",v(t,0,n))}function N(t,e,n){return\\\"string\\\"==t?N:v(t,0,n)}return s.isInText=!0,{startState:function(t){var e={tokenize:s,state:h,indented:t||0,tagName:null,tagStart:null,context:null};return null!=t&&(e.baseIndent=t),e},token:function(t,e){if(!e.tagName&&t.sol()&&(e.indented=t.indentation()),t.eatSpace())return null;a=null;var n=e.tokenize(t,e);return(n||a)&&\\\"comment\\\"!=n&&(i=null,e.state=e.state(a||n,t,e),i&&(n=\\\"error\\\"==i?n+\\\" error\\\":i)),n},indent:function(e,n,r){var o=e.context;if(e.tokenize.isInAttribute)return e.tagStart==e.indented?e.stringStartCol+1:e.indented+l;if(o&&o.noIndent)return t.Pass;if(e.tokenize!=f&&e.tokenize!=s)return r?r.match(/^(\\\\s*)/)[0].length:0;if(e.tagName)return!1!==u.multilineTagIndentPastTag?e.tagStart+e.tagName.length+2:e.tagStart+l*(u.multilineTagIndentFactor||1);if(u.alignCDATA&&/<!\\\\[CDATA\\\\[/.test(n))return 0;var a=n&&/^<(\\\\/)?([\\\\w_:\\\\.-]*)/.exec(n);if(a&&a[1])for(;o;){if(o.tagName==a[2]){o=o.prev;break}if(!u.implicitlyClosed.hasOwnProperty(o.tagName))break;o=o.prev}else if(a)for(;o;){var i=u.contextGrabbers[o.tagName];if(!i||!i.hasOwnProperty(a[2]))break;o=o.prev}for(;o&&o.prev&&!o.startOfLine;)o=o.prev;return o?o.indent+l:e.baseIndent||0},electricInput:/<\\\\/[\\\\s\\\\w:]+>$/,blockCommentStart:\\\"\\\\x3c!--\\\",blockCommentEnd:\\\"--\\\\x3e\\\",configuration:u.htmlMode?\\\"html\\\":\\\"xml\\\",helperType:u.htmlMode?\\\"html\\\":\\\"xml\\\",skipAttribute:function(t){t.state==y&&(t.state=v)}}}),t.defineMIME(\\\"text/xml\\\",\\\"xml\\\"),t.defineMIME(\\\"application/xml\\\",\\\"xml\\\"),t.mimeModes.hasOwnProperty(\\\"text/html\\\")||t.defineMIME(\\\"text/html\\\",{name:\\\"xml\\\",htmlMode:!0})});\",\"type\":\"application/javascript\",\"title\":\"$:/plugins/tiddlywiki/codemirror/mode/xml/xml.js\",\"module-type\":\"codemirror\"},\"$:/plugins/tiddlywiki/codemirror-mode-xml/readme\":{\"title\":\"$:/plugins/tiddlywiki/codemirror-mode-xml/readme\",\"text\":\"This plugin is a requirement for other Syntax-highlighting plugins and adds Highlighting for XML tiddlers (application/xml) to the [[CodeMirror|http://codemirror.net]] text editor. It needs the latest [[CodeMirror plugin|$:/plugins/tiddlywiki/codemirror]] to be installed\\n\\n\"}}}"});