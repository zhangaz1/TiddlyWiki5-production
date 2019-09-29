$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/codemirror-search-replace","description":"CodeMirror AddOn: Search and Replace","author":"JeremyRuston","list":"readme","version":"5.1.19","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/codemirror/addon/search/search.js\":{\"text\":\"// CodeMirror, copyright (c) by Marijn Haverbeke and others\\n// Distributed under an MIT license: http://codemirror.net/LICENSE\\n!function(e){\\\"object\\\"==typeof exports&&\\\"object\\\"==typeof module?e(require(\\\"../../lib/codemirror\\\"),require(\\\"./searchcursor\\\"),require(\\\"../dialog/dialog\\\")):\\\"function\\\"==typeof define&&define.amd?define([\\\"../../lib/codemirror\\\",\\\"./searchcursor\\\",\\\"../dialog/dialog\\\"],e):e(CodeMirror)}(function(e){\\\"use strict\\\";function o(e){return e.state.search||(e.state.search=new function(){this.posFrom=this.posTo=this.lastQuery=this.query=null,this.overlay=null})}function n(e){return\\\"string\\\"==typeof e&&e==e.toLowerCase()}function r(e,o,r){return e.getSearchCursor(o,r,{caseFold:n(o),multiline:!0})}function t(e,o,n,r,t){e.openDialog?e.openDialog(o,t,{value:r,selectValueOnOpen:!0}):t(prompt(n,r))}function i(e){return e.replace(/\\\\\\\\(.)/g,function(e,o){return\\\"n\\\"==o?\\\"\\\\n\\\":\\\"r\\\"==o?\\\"\\\\r\\\":o})}function a(e){var o=e.match(/^\\\\/(.*)\\\\/([a-z]*)$/);if(o)try{e=new RegExp(o[1],-1==o[2].indexOf(\\\"i\\\")?\\\"\\\":\\\"i\\\")}catch(e){}else e=i(e);return(\\\"string\\\"==typeof e?\\\"\\\"==e:e.test(\\\"\\\"))&&(e=/x^/),e}var s='<span class=\\\"CodeMirror-search-label\\\">Search:</span> <input type=\\\"text\\\" style=\\\"width: 10em\\\" class=\\\"CodeMirror-search-field\\\"/> <span style=\\\"color: #888\\\" class=\\\"CodeMirror-search-hint\\\">(Use /re/ syntax for regexp search)</span>';function c(e,o,r){var t,i;o.queryText=r,o.query=a(r),e.removeOverlay(o.overlay,n(o.query)),o.overlay=(t=o.query,i=n(o.query),\\\"string\\\"==typeof t?t=new RegExp(t.replace(/[\\\\-\\\\[\\\\]\\\\/\\\\{\\\\}\\\\(\\\\)\\\\*\\\\+\\\\?\\\\.\\\\\\\\\\\\^\\\\$\\\\|]/g,\\\"\\\\\\\\$&\\\"),i?\\\"gi\\\":\\\"g\\\"):t.global||(t=new RegExp(t.source,t.ignoreCase?\\\"gi\\\":\\\"g\\\")),{token:function(e){t.lastIndex=e.pos;var o=t.exec(e.string);if(o&&o.index==e.pos)return e.pos+=o[0].length||1,\\\"searching\\\";o?e.pos=o.index:e.skipToEnd()}}),e.addOverlay(o.overlay),e.showMatchesOnScrollbar&&(o.annotate&&(o.annotate.clear(),o.annotate=null),o.annotate=e.showMatchesOnScrollbar(o.query,n(o.query)))}function l(n,r,i,a){var l=o(n);if(l.query)return u(n,r);var p,d,y,m,g,h=n.getSelection()||l.lastQuery;if(h instanceof RegExp&&\\\"x^\\\"==h.source&&(h=null),i&&n.openDialog){var v=null,x=function(o,r){e.e_stop(r),o&&(o!=l.queryText&&(c(n,l,o),l.posFrom=l.posTo=n.getCursor()),v&&(v.style.opacity=1),u(n,r.shiftKey,function(e,o){var r;o.line<3&&document.querySelector&&(r=n.display.wrapper.querySelector(\\\".CodeMirror-dialog\\\"))&&r.getBoundingClientRect().bottom-4>n.cursorCoords(o,\\\"window\\\").top&&((v=r).style.opacity=.4)}))};d=s,y=h,m=x,g=function(r,t){var i=e.keyName(r),a=n.getOption(\\\"extraKeys\\\"),s=a&&a[i]||e.keyMap[n.getOption(\\\"keyMap\\\")][i];\\\"findNext\\\"==s||\\\"findPrev\\\"==s||\\\"findPersistentNext\\\"==s||\\\"findPersistentPrev\\\"==s?(e.e_stop(r),c(n,o(n),t),n.execCommand(s)):\\\"find\\\"!=s&&\\\"findPersistent\\\"!=s||(e.e_stop(r),x(t,r))},(p=n).openDialog(d,m,{value:y,selectValueOnOpen:!0,closeOnEnter:!1,onClose:function(){f(p)},onKeyDown:g}),a&&h&&(c(n,l,h),u(n,r))}else t(n,s,\\\"Search for:\\\",h,function(e){e&&!l.query&&n.operation(function(){c(n,l,e),l.posFrom=l.posTo=n.getCursor(),u(n,r)})})}function u(n,t,i){n.operation(function(){var a=o(n),s=r(n,a.query,t?a.posFrom:a.posTo);(s.find(t)||(s=r(n,a.query,t?e.Pos(n.lastLine()):e.Pos(n.firstLine(),0))).find(t))&&(n.setSelection(s.from(),s.to()),n.scrollIntoView({from:s.from(),to:s.to()},20),a.posFrom=s.from(),a.posTo=s.to(),i&&i(s.from(),s.to()))})}function f(e){e.operation(function(){var n=o(e);n.lastQuery=n.query,n.query&&(n.query=n.queryText=null,e.removeOverlay(n.overlay),n.annotate&&(n.annotate.clear(),n.annotate=null))})}var p=' <input type=\\\"text\\\" style=\\\"width: 10em\\\" class=\\\"CodeMirror-search-field\\\"/> <span style=\\\"color: #888\\\" class=\\\"CodeMirror-search-hint\\\">(Use /re/ syntax for regexp search)</span>',d='<span class=\\\"CodeMirror-search-label\\\">With:</span> <input type=\\\"text\\\" style=\\\"width: 10em\\\" class=\\\"CodeMirror-search-field\\\"/>',y='<span class=\\\"CodeMirror-search-label\\\">Replace?</span> <button>Yes</button> <button>No</button> <button>All</button> <button>Stop</button>';function m(e,o,n){e.operation(function(){for(var t=r(e,o);t.findNext();)if(\\\"string\\\"!=typeof o){var i=e.getRange(t.from(),t.to()).match(o);t.replace(n.replace(/\\\\$(\\\\d)/g,function(e,o){return i[o]}))}else t.replace(n)})}function g(e,n){if(!e.getOption(\\\"readOnly\\\")){var s=e.getSelection()||o(e).lastQuery,c='<span class=\\\"CodeMirror-search-label\\\">'+(n?\\\"Replace all:\\\":\\\"Replace:\\\")+\\\"</span>\\\";t(e,c+p,c,s,function(o){o&&(o=a(o),t(e,d,\\\"Replace with:\\\",\\\"\\\",function(t){if(t=i(t),n)m(e,o,t);else{f(e);var a=r(e,o,e.getCursor(\\\"from\\\")),s=function(){var n,i,l,u,f,p=a.from();!(n=a.findNext())&&(a=r(e,o),!(n=a.findNext())||p&&a.from().line==p.line&&a.from().ch==p.ch)||(e.setSelection(a.from(),a.to()),e.scrollIntoView({from:a.from(),to:a.to()}),l=y,u=\\\"Replace?\\\",f=[function(){c(n)},s,function(){m(e,o,t)}],(i=e).openConfirm?i.openConfirm(l,f):confirm(u)&&f[0]())},c=function(e){a.replace(\\\"string\\\"==typeof o?t:t.replace(/\\\\$(\\\\d)/g,function(o,n){return e[n]})),s()};s()}}))})}}e.commands.find=function(e){f(e),l(e)},e.commands.findPersistent=function(e){f(e),l(e,!1,!0)},e.commands.findPersistentNext=function(e){l(e,!1,!0,!0)},e.commands.findPersistentPrev=function(e){l(e,!0,!0,!0)},e.commands.findNext=l,e.commands.findPrev=function(e){l(e,!0)},e.commands.clearSearch=f,e.commands.replace=g,e.commands.replaceAll=function(e){g(e,!0)}});\",\"type\":\"application/javascript\",\"title\":\"$:/plugins/tiddlywiki/codemirror/addon/search/search.js\",\"module-type\":\"codemirror\"},\"$:/plugins/tiddlywiki/codemirror/addon/search/jump-to-line.js\":{\"text\":\"// CodeMirror, copyright (c) by Marijn Haverbeke and others\\n// Distributed under an MIT license: http://codemirror.net/LICENSE\\n!function(e){\\\"object\\\"==typeof exports&&\\\"object\\\"==typeof module?e(require(\\\"../../lib/codemirror\\\"),require(\\\"../dialog/dialog\\\")):\\\"function\\\"==typeof define&&define.amd?define([\\\"../../lib/codemirror\\\",\\\"../dialog/dialog\\\"],e):e(CodeMirror)}(function(e){\\\"use strict\\\";function o(e,o){var r=Number(o);return/^[-+]/.test(o)?e.getCursor().line+r:r-1}e.commands.jumpToLine=function(e){var r,i,t,s,n,l=e.getCursor();r=e,i='Jump to line: <input type=\\\"text\\\" style=\\\"width: 10em\\\" class=\\\"CodeMirror-search-field\\\"/> <span style=\\\"color: #888\\\" class=\\\"CodeMirror-search-hint\\\">(Use line:column or scroll% syntax)</span>',t=\\\"Jump to line:\\\",s=l.line+1+\\\":\\\"+l.ch,n=function(r){var i;if(r)if(i=/^\\\\s*([\\\\+\\\\-]?\\\\d+)\\\\s*\\\\:\\\\s*(\\\\d+)\\\\s*$/.exec(r))e.setCursor(o(e,i[1]),Number(i[2]));else if(i=/^\\\\s*([\\\\+\\\\-]?\\\\d+(\\\\.\\\\d+)?)\\\\%\\\\s*/.exec(r)){var t=Math.round(e.lineCount()*Number(i[1])/100);/^[-+]/.test(i[1])&&(t=l.line+t+1),e.setCursor(t-1,l.ch)}else(i=/^\\\\s*\\\\:?\\\\s*([\\\\+\\\\-]?\\\\d+)\\\\s*/.exec(r))&&e.setCursor(o(e,i[1]),l.ch)},r.openDialog?r.openDialog(i,n,{value:s,selectValueOnOpen:!0}):n(prompt(t,s))},e.keyMap.default[\\\"Alt-G\\\"]=\\\"jumpToLine\\\"});\",\"type\":\"application/javascript\",\"title\":\"$:/plugins/tiddlywiki/codemirror/addon/search/jump-to-line.js\",\"module-type\":\"codemirror\"},\"$:/plugins/tiddlywiki/codemirror/addon/search/searchcursor.js\":{\"text\":\"// CodeMirror, copyright (c) by Marijn Haverbeke and others\\n// Distributed under an MIT license: http://codemirror.net/LICENSE\\n!function(t){\\\"object\\\"==typeof exports&&\\\"object\\\"==typeof module?t(require(\\\"../../lib/codemirror\\\")):\\\"function\\\"==typeof define&&define.amd?define([\\\"../../lib/codemirror\\\"],t):t(CodeMirror)}(function(t){\\\"use strict\\\";var e,n,r=t.Pos;function i(t,e){for(var n,r,i=null!=(r=(n=t).flags)?r:(n.ignoreCase?\\\"i\\\":\\\"\\\")+(n.global?\\\"g\\\":\\\"\\\")+(n.multiline?\\\"m\\\":\\\"\\\"),o=i,l=0;l<e.length;l++)-1==o.indexOf(e.charAt(l))&&(o+=e.charAt(l));return i==o?t:new RegExp(t.source,o)}function o(t,e,n){e=i(e,\\\"g\\\");for(var o=n.line,l=n.ch,h=t.lastLine();o<=h;o++,l=0){e.lastIndex=l;var s=t.getLine(o),c=e.exec(s);if(c)return{from:r(o,c.index),to:r(o,c.index+c[0].length),match:c}}}function l(t,e){for(var n,r=0;;){e.lastIndex=r;var i=e.exec(t);if(!i)return n;if((r=(n=i).index+(n[0].length||1))==t.length)return n}}function h(t,e,n,r){if(t.length==e.length)return n;for(var i=0,o=n+Math.max(0,t.length-e.length);;){if(i==o)return i;var l=i+o>>1,h=r(t.slice(0,l)).length;if(h==n)return l;h>n?o=l:i=l+1}}function s(t,s,c,f){var u;this.atOccurrence=!1,this.doc=t,c=c?t.clipPos(c):r(0,0),this.pos={from:c,to:c},\\\"object\\\"==typeof f?u=f.caseFold:(u=f,f=null),\\\"string\\\"==typeof s?(null==u&&(u=!1),this.matches=function(i,o){return(i?function(t,i,o,l){if(!i.length)return null;var s=l?e:n,c=s(i).split(/\\\\r|\\\\n\\\\r?/);t:for(var f=o.line,u=o.ch,a=t.firstLine()-1+c.length;f>=a;f--,u=-1){var g=t.getLine(f);u>-1&&(g=g.slice(0,u));var m=s(g);if(1==c.length){var d=m.lastIndexOf(c[0]);if(-1==d)continue t;return{from:r(f,h(g,m,d,s)),to:r(f,h(g,m,d+c[0].length,s))}}var v=c[c.length-1];if(m.slice(0,v.length)==v){var p=1;for(o=f-c.length+1;p<c.length-1;p++)if(s(t.getLine(o+p))!=c[p])continue t;var x=t.getLine(f+1-c.length),L=s(x);if(L.slice(L.length-c[0].length)==c[0])return{from:r(f+1-c.length,h(x,L,x.length-c[0].length,s)),to:r(f,h(g,m,v.length,s))}}}}:function(t,i,o,l){if(!i.length)return null;var s=l?e:n,c=s(i).split(/\\\\r|\\\\n\\\\r?/);t:for(var f=o.line,u=o.ch,a=t.lastLine()+1-c.length;f<=a;f++,u=0){var g=t.getLine(f).slice(u),m=s(g);if(1==c.length){var d=m.indexOf(c[0]);if(-1==d)continue t;return o=h(g,m,d,s)+u,{from:r(f,h(g,m,d,s)+u),to:r(f,h(g,m,d+c[0].length,s)+u)}}var v=m.length-c[0].length;if(m.slice(v)==c[0]){for(var p=1;p<c.length-1;p++)if(s(t.getLine(f+p))!=c[p])continue t;var x=t.getLine(f+c.length-1),L=s(x),C=c[c.length-1];if(L.slice(0,C.length)==C)return{from:r(f,h(g,m,v,s)+u),to:r(f+c.length-1,h(x,L,C.length,s))}}}})(t,s,o,u)}):(s=i(s,\\\"gm\\\"),f&&!1===f.multiline?this.matches=function(e,n){return(e?function(t,e,n){e=i(e,\\\"g\\\");for(var o=n.line,h=n.ch,s=t.firstLine();o>=s;o--,h=-1){var c=t.getLine(o);h>-1&&(c=c.slice(0,h));var f=l(c,e);if(f)return{from:r(o,f.index),to:r(o,f.index+f[0].length),match:f}}}:o)(t,s,n)}:this.matches=function(e,n){return(e?function(t,e,n){e=i(e,\\\"gm\\\");for(var o,h=1,s=n.line,c=t.firstLine();s>=c;){for(var f=0;f<h;f++){var u=t.getLine(s--);o=null==o?u.slice(0,n.ch):u+\\\"\\\\n\\\"+o}h*=2;var a=l(o,e);if(a){var g=o.slice(0,a.index).split(\\\"\\\\n\\\"),m=a[0].split(\\\"\\\\n\\\"),d=s+g.length,v=g[g.length-1].length;return{from:r(d,v),to:r(d+m.length-1,1==m.length?v+m[0].length:m[m.length-1].length),match:a}}}}:function(t,e,n){if(!/\\\\\\\\s|\\\\\\\\n|\\\\n|\\\\\\\\W|\\\\\\\\D|\\\\[\\\\^/.test(e.source))return o(t,e,n);e=i(e,\\\"gm\\\");for(var l,h=1,s=n.line,c=t.lastLine();s<=c;){for(var f=0;f<h&&!(s>c);f++){var u=t.getLine(s++);l=null==l?u:l+\\\"\\\\n\\\"+u}h*=2,e.lastIndex=n.ch;var a=e.exec(l);if(a){var g=l.slice(0,a.index).split(\\\"\\\\n\\\"),m=a[0].split(\\\"\\\\n\\\"),d=n.line+g.length-1,v=g[g.length-1].length;return{from:r(d,v),to:r(d+m.length-1,1==m.length?v+m[0].length:m[m.length-1].length),match:a}}}})(t,s,n)})}String.prototype.normalize?(e=function(t){return t.normalize(\\\"NFD\\\").toLowerCase()},n=function(t){return t.normalize(\\\"NFD\\\")}):(e=function(t){return t.toLowerCase()},n=function(t){return t}),s.prototype={findNext:function(){return this.find(!1)},findPrevious:function(){return this.find(!0)},find:function(e){for(var n=this.matches(e,this.doc.clipPos(e?this.pos.from:this.pos.to));n&&0==t.cmpPos(n.from,n.to);)e?n.from.ch?n.from=r(n.from.line,n.from.ch-1):n=n.from.line==this.doc.firstLine()?null:this.matches(e,this.doc.clipPos(r(n.from.line-1))):n.to.ch<this.doc.getLine(n.to.line).length?n.to=r(n.to.line,n.to.ch+1):n=n.to.line==this.doc.lastLine()?null:this.matches(e,r(n.to.line+1,0));if(n)return this.pos=n,this.atOccurrence=!0,this.pos.match||!0;var i=r(e?this.doc.firstLine():this.doc.lastLine()+1,0);return this.pos={from:i,to:i},this.atOccurrence=!1},from:function(){if(this.atOccurrence)return this.pos.from},to:function(){if(this.atOccurrence)return this.pos.to},replace:function(e,n){if(this.atOccurrence){var i=t.splitLines(e);this.doc.replaceRange(i,this.pos.from,this.pos.to,n),this.pos.to=r(this.pos.from.line+i.length-1,i[i.length-1].length+(1==i.length?this.pos.from.ch:0))}}},t.defineExtension(\\\"getSearchCursor\\\",function(t,e,n){return new s(this.doc,t,e,n)}),t.defineDocExtension(\\\"getSearchCursor\\\",function(t,e,n){return new s(this,t,e,n)}),t.defineExtension(\\\"selectMatches\\\",function(e,n){for(var r=[],i=this.getSearchCursor(e,this.getCursor(\\\"from\\\"),n);i.findNext()&&!(t.cmpPos(i.to(),this.getCursor(\\\"to\\\"))>0);)r.push({anchor:i.from(),head:i.to()});r.length&&this.setSelections(r,0)})});\",\"type\":\"application/javascript\",\"title\":\"$:/plugins/tiddlywiki/codemirror/addon/search/searchcursor.js\",\"module-type\":\"codemirror\"},\"$:/plugins/tiddlywiki/codemirror-search-replace/readme\":{\"title\":\"$:/plugins/tiddlywiki/codemirror-search-replace/readme\",\"text\":\"This plugin enhances the [[CodeMirror|http://codemirror.net]] text editor with Search and Replace functionality. It needs the latest [[CodeMirror plugin|$:/plugins/tiddlywiki/codemirror]] to be installed\\n\\nIt adds these Keyboard Shortcuts to ~CodeMirror:\\n\\n|Shortcut |Function |h\\n|Ctrl-F / Cmd-F |Start searching |\\n|Ctrl-G / Cmd-G / Shift-F3 |Find next |\\n|Shift-Ctrl-G / Shift-Cmd-G / F3 |Find previous |\\n|Shift-Ctrl-F / Cmd-Option-F |Replace |\\n|Shift-Ctrl-R / Shift-Cmd-Option-F |Replace all |\\n|Alt-F |Persistent search (dialog doesn't autoclose, enter to find next, Shift-Enter to find previous) |\\n|Alt-G |Jump to line |\\n\\n\"}}}"});