$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/codemirror-keymap-emacs","description":"CodeMirror Keymap: Emacs","author":"JeremyRuston","list":"readme","version":"5.1.20","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/codemirror/keymaps/emacs\":{\"title\":\"$:/plugins/tiddlywiki/codemirror/keymaps/emacs\",\"module-type\":\"codemirror-keymap\",\"text\":\"emacs\\n\"},\"$:/plugins/tiddlywiki/codemirror/keymap/emacs.js\":{\"text\":\"// CodeMirror, copyright (c) by Marijn Haverbeke and others\\n// Distributed under an MIT license: http://codemirror.net/LICENSE\\n!function(t){\\\"object\\\"==typeof exports&&\\\"object\\\"==typeof module?t(require(\\\"../lib/codemirror\\\")):\\\"function\\\"==typeof define&&define.amd?define([\\\"../lib/codemirror\\\"],t):t(CodeMirror)}(function(t){\\\"use strict\\\";var e=t.Pos;function n(t,e){return t.line==e.line&&t.ch==e.ch}var r=[];function o(t){r.push(t),r.length>50&&r.shift()}function i(t){return r[r.length-(t?Math.min(t,1):1)]||\\\"\\\"}var l=null;function a(t,e,i,a,c){null==c&&(c=t.getRange(e,i)),\\\"grow\\\"==a&&l&&l.cm==t&&n(e,l.pos)&&t.isClean(l.gen)?function(t){if(!r.length)return o(t);r[r.length-1]+=t}(c):!1!==a&&o(c),t.replaceRange(\\\"\\\",e,i,\\\"+delete\\\"),l=\\\"grow\\\"==a?{cm:t,pos:e,gen:t.changeGeneration()}:null}function c(t,e,n){return t.findPosH(e,n,\\\"char\\\",!0)}function u(t,e,n){return t.findPosH(e,n,\\\"word\\\",!0)}function f(t,e,n){return t.findPosV(e,n,\\\"line\\\",t.doc.sel.goalColumn)}function s(t,e,n){return t.findPosV(e,n,\\\"page\\\",t.doc.sel.goalColumn)}function g(t,n,r){for(var o=n.line,i=t.getLine(o),l=/\\\\S/.test(r<0?i.slice(0,n.ch):i.slice(n.ch)),a=t.firstLine(),c=t.lastLine();;){if((o+=r)<a||o>c)return t.clipPos(e(o-r,r<0?0:null));if(i=t.getLine(o),/\\\\S/.test(i))l=!0;else if(l)return e(o,0)}}function C(t,n,r){for(var o=n.line,i=n.ch,l=t.getLine(n.line),a=!1;;){var c=l.charAt(i+(r<0?-1:0));if(c){if(a&&/[!?.]/.test(c))return e(o,i+(r>0?1:0));a||(a=/\\\\w/.test(c)),i+=r}else{if(o==(r<0?t.firstLine():t.lastLine()))return e(o,i);if(l=t.getLine(o+r),!/\\\\S/.test(l))return e(o,i);o+=r,i=r<0?l.length:0}}}function d(t,r,o){var i;if(t.findMatchingBracket&&(i=t.findMatchingBracket(r,{strict:!0}))&&i.match&&(i.forward?1:-1)==o)return o>0?e(i.to.line,i.to.ch+1):i.to;for(var l=!0;;l=!1){var a=t.getTokenAt(r),c=e(r.line,o<0?a.start:a.end);if(!(l&&o>0&&a.end==r.ch)&&/\\\\w/.test(a.string))return c;var u=t.findPosH(c,o,\\\"char\\\");if(n(c,u))return r;r=u}}function p(t,e){var n=t.state.emacsPrefix;return n?(L(t),\\\"-\\\"==n?-1:Number(n)):e?null:1}function h(t){var e=\\\"string\\\"==typeof t?function(e){e.execCommand(t)}:t;return function(t){var n=p(t);e(t);for(var r=1;r<n;++r)e(t)}}function v(t,e,r,o){var i=p(t);i<0&&(o=-o,i=-i);for(var l=0;l<i;++l){var a=r(t,e,o);if(n(a,e))break;e=a}return e}function m(t,e){var n=function(n){n.extendSelection(v(n,n.getCursor(),t,e))};return n.motion=!0,n}function A(t,e,n,r){for(var o,i=t.listSelections(),l=i.length;l--;)a(t,o=i[l].head,v(t,o,e,n),r)}function S(t,e){if(t.somethingSelected()){for(var n,r=t.listSelections(),o=r.length;o--;)a(t,(n=r[o]).anchor,n.head,e);return!0}}function P(t,e){t.state.emacsPrefix?\\\"-\\\"!=e&&(t.state.emacsPrefix+=e):(t.state.emacsPrefix=e,t.on(\\\"keyHandled\\\",x),t.on(\\\"inputRead\\\",R))}var w={\\\"Alt-G\\\":!0,\\\"Ctrl-X\\\":!0,\\\"Ctrl-Q\\\":!0,\\\"Ctrl-U\\\":!0};function x(t,e){t.state.emacsPrefixMap||w.hasOwnProperty(e)||L(t)}function L(t){t.state.emacsPrefix=null,t.off(\\\"keyHandled\\\",x),t.off(\\\"inputRead\\\",R)}function R(t,e){var n=p(t);if(n>1&&\\\"+input\\\"==e.origin){for(var r=e.text.join(\\\"\\\\n\\\"),o=\\\"\\\",i=1;i<n;++i)o+=r;t.replaceSelection(o)}}function y(t,e){(\\\"string\\\"!=typeof e||!/^\\\\d$/.test(e)&&\\\"Ctrl-U\\\"!=e)&&(t.removeKeyMap(D),t.state.emacsPrefixMap=!1,t.off(\\\"keyHandled\\\",y),t.off(\\\"inputRead\\\",y))}function k(t){t.setCursor(t.getCursor()),t.setExtending(!t.getExtending()),t.on(\\\"change\\\",function(){t.setExtending(!1)})}function b(t){t.setExtending(!1),t.setCursor(t.getCursor())}function U(t,e){var n=t.getCursor(),r=t.findPosH(n,1,\\\"word\\\");t.replaceRange(e(t.getRange(n,r)),n,r),t.setCursor(r)}t.emacs={kill:a,killRegion:S,repeated:h};var X=t.keyMap.emacs=t.normalizeKeyMap({\\\"Ctrl-W\\\":function(t){a(t,t.getCursor(\\\"start\\\"),t.getCursor(\\\"end\\\"),!0)},\\\"Ctrl-K\\\":h(function(t){var n=t.getCursor(),r=t.clipPos(e(n.line)),o=t.getRange(n,r);/\\\\S/.test(o)||(o+=\\\"\\\\n\\\",r=e(n.line+1,0)),a(t,n,r,\\\"grow\\\",o)}),\\\"Alt-W\\\":function(t){o(t.getSelection()),b(t)},\\\"Ctrl-Y\\\":function(t){var e=t.getCursor();t.replaceRange(i(p(t)),e,e,\\\"paste\\\"),t.setSelection(e,t.getCursor())},\\\"Alt-Y\\\":function(t){t.replaceSelection((r.length>1&&r.pop(),i()),\\\"around\\\",\\\"paste\\\")},\\\"Ctrl-Space\\\":k,\\\"Ctrl-Shift-2\\\":k,\\\"Ctrl-F\\\":m(c,1),\\\"Ctrl-B\\\":m(c,-1),Right:m(c,1),Left:m(c,-1),\\\"Ctrl-D\\\":function(t){A(t,c,1,!1)},Delete:function(t){S(t,!1)||A(t,c,1,!1)},\\\"Ctrl-H\\\":function(t){A(t,c,-1,!1)},Backspace:function(t){S(t,!1)||A(t,c,-1,!1)},\\\"Alt-F\\\":m(u,1),\\\"Alt-B\\\":m(u,-1),\\\"Alt-D\\\":function(t){A(t,u,1,\\\"grow\\\")},\\\"Alt-Backspace\\\":function(t){A(t,u,-1,\\\"grow\\\")},\\\"Ctrl-N\\\":m(f,1),\\\"Ctrl-P\\\":m(f,-1),Down:m(f,1),Up:m(f,-1),\\\"Ctrl-A\\\":\\\"goLineStart\\\",\\\"Ctrl-E\\\":\\\"goLineEnd\\\",End:\\\"goLineEnd\\\",Home:\\\"goLineStart\\\",\\\"Alt-V\\\":m(s,-1),\\\"Ctrl-V\\\":m(s,1),PageUp:m(s,-1),PageDown:m(s,1),\\\"Ctrl-Up\\\":m(g,-1),\\\"Ctrl-Down\\\":m(g,1),\\\"Alt-A\\\":m(C,-1),\\\"Alt-E\\\":m(C,1),\\\"Alt-K\\\":function(t){A(t,C,1,\\\"grow\\\")},\\\"Ctrl-Alt-K\\\":function(t){A(t,d,1,\\\"grow\\\")},\\\"Ctrl-Alt-Backspace\\\":function(t){A(t,d,-1,\\\"grow\\\")},\\\"Ctrl-Alt-F\\\":m(d,1),\\\"Ctrl-Alt-B\\\":m(d,-1),\\\"Shift-Ctrl-Alt-2\\\":function(t){var e=t.getCursor();t.setSelection(v(t,e,d,1),e)},\\\"Ctrl-Alt-T\\\":function(t){var e=d(t,t.getCursor(),-1),n=d(t,e,1),r=d(t,n,1),o=d(t,r,-1);t.replaceRange(t.getRange(o,r)+t.getRange(n,o)+t.getRange(e,n),e,r)},\\\"Ctrl-Alt-U\\\":h(function(t){for(var n=t.getCursor(),r=n.line,o=n.ch,i=[];r>=t.firstLine();){for(var l=t.getLine(r),a=null==o?l.length:o;a>0;)if(\\\")\\\"==(o=l.charAt(--a)))i.push(\\\"(\\\");else if(\\\"]\\\"==o)i.push(\\\"[\\\");else if(\\\"}\\\"==o)i.push(\\\"{\\\");else if(/[\\\\(\\\\{\\\\[]/.test(o)&&(!i.length||i.pop()!=o))return t.extendSelection(e(r,a));--r,o=null}}),\\\"Alt-Space\\\":function(t){for(var n=t.getCursor(),r=n.ch,o=n.ch,i=t.getLine(n.line);r&&/\\\\s/.test(i.charAt(r-1));)--r;for(;o<i.length&&/\\\\s/.test(i.charAt(o));)++o;t.replaceRange(\\\" \\\",e(n.line,r),e(n.line,o))},\\\"Ctrl-O\\\":h(function(t){t.replaceSelection(\\\"\\\\n\\\",\\\"start\\\")}),\\\"Ctrl-T\\\":h(function(t){t.execCommand(\\\"transposeChars\\\")}),\\\"Alt-C\\\":h(function(t){U(t,function(t){var e=t.search(/\\\\w/);return-1==e?t:t.slice(0,e)+t.charAt(e).toUpperCase()+t.slice(e+1).toLowerCase()})}),\\\"Alt-U\\\":h(function(t){U(t,function(t){return t.toUpperCase()})}),\\\"Alt-L\\\":h(function(t){U(t,function(t){return t.toLowerCase()})}),\\\"Alt-;\\\":\\\"toggleComment\\\",\\\"Ctrl-/\\\":h(\\\"undo\\\"),\\\"Shift-Ctrl--\\\":h(\\\"undo\\\"),\\\"Ctrl-Z\\\":h(\\\"undo\\\"),\\\"Cmd-Z\\\":h(\\\"undo\\\"),\\\"Shift-Alt-,\\\":\\\"goDocStart\\\",\\\"Shift-Alt-.\\\":\\\"goDocEnd\\\",\\\"Ctrl-S\\\":\\\"findPersistentNext\\\",\\\"Ctrl-R\\\":\\\"findPersistentPrev\\\",\\\"Ctrl-G\\\":function(t){t.execCommand(\\\"clearSearch\\\"),b(t)},\\\"Shift-Alt-5\\\":\\\"replace\\\",\\\"Alt-/\\\":\\\"autocomplete\\\",Enter:\\\"newlineAndIndent\\\",\\\"Ctrl-J\\\":h(function(t){t.replaceSelection(\\\"\\\\n\\\",\\\"end\\\")}),Tab:\\\"indentAuto\\\",\\\"Alt-G G\\\":function(t){var e,n,r,o=p(t,!0);if(null!=o&&o>0)return t.setCursor(o-1);n=\\\"Goto line\\\",r=function(e){var n;e&&!isNaN(n=Number(e))&&n==(0|n)&&n>0&&t.setCursor(n-1)},(e=t).openDialog?e.openDialog(n+': <input type=\\\"text\\\" style=\\\"width: 10em\\\"/>',r,{bottom:!0}):r(prompt(n,\\\"\\\"))},\\\"Ctrl-X Tab\\\":function(t){t.indentSelection(p(t,!0)||t.getOption(\\\"indentUnit\\\"))},\\\"Ctrl-X Ctrl-X\\\":function(t){t.setSelection(t.getCursor(\\\"head\\\"),t.getCursor(\\\"anchor\\\"))},\\\"Ctrl-X Ctrl-S\\\":\\\"save\\\",\\\"Ctrl-X Ctrl-W\\\":\\\"save\\\",\\\"Ctrl-X S\\\":\\\"saveAll\\\",\\\"Ctrl-X F\\\":\\\"open\\\",\\\"Ctrl-X U\\\":h(\\\"undo\\\"),\\\"Ctrl-X K\\\":\\\"close\\\",\\\"Ctrl-X Delete\\\":function(t){a(t,t.getCursor(),C(t,t.getCursor(),1),\\\"grow\\\")},\\\"Ctrl-X H\\\":\\\"selectAll\\\",\\\"Ctrl-Q Tab\\\":h(\\\"insertTab\\\"),\\\"Ctrl-U\\\":function(t){t.state.emacsPrefixMap=!0,t.addKeyMap(D),t.on(\\\"keyHandled\\\",y),t.on(\\\"inputRead\\\",y)}}),D={\\\"Ctrl-G\\\":L};function E(t){D[t]=function(e){P(e,t)},X[\\\"Ctrl-\\\"+t]=function(e){P(e,t)},w[\\\"Ctrl-\\\"+t]=!0}for(var H=0;H<10;++H)E(String(H));E(\\\"-\\\")});\",\"type\":\"application/javascript\",\"title\":\"$:/plugins/tiddlywiki/codemirror/keymap/emacs.js\",\"module-type\":\"codemirror\"},\"$:/plugins/tiddlywiki/codemirror-keymap-emacs/readme\":{\"title\":\"$:/plugins/tiddlywiki/codemirror-keymap-emacs/readme\",\"text\":\"This plugin adds a ''Keymap'' with some of the most important ''Emacs'' keyboard shortcuts\\n\\nFor more information about available ''keyboard shortcuts'' see the [ext[CodeMirror emacs demo|https://codemirror.net/demo/emacs.html]]\\n\"}}}"});