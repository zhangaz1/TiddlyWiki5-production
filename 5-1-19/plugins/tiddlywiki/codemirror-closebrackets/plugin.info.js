$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/codemirror-closebrackets","description":"CodeMirror AddOn: Close Brackets","author":"JeremyRuston","list":"readme","version":"5.1.19","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/config/codemirror/autoCloseBrackets\":{\"title\":\"$:/config/codemirror/autoCloseBrackets\",\"type\":\"bool\",\"text\":\"true\"},\"$:/config/codemirror/matchBrackets\":{\"title\":\"$:/config/codemirror/matchBrackets\",\"type\":\"bool\",\"text\":\"true\\n\"},\"$:/plugins/tiddlywiki/codemirror/addon/edit/closebrackets.js\":{\"text\":\"// CodeMirror, copyright (c) by Marijn Haverbeke and others\\n// Distributed under an MIT license: http://codemirror.net/LICENSE\\n!function(e){\\\"object\\\"==typeof exports&&\\\"object\\\"==typeof module?e(require(\\\"../../lib/codemirror\\\")):\\\"function\\\"==typeof define&&define.amd?define([\\\"../../lib/codemirror\\\"],e):e(CodeMirror)}(function(e){var t={pairs:\\\"()[]{}''\\\\\\\"\\\\\\\"\\\",triples:\\\"\\\",explode:\\\"[]{}\\\"},r=e.Pos;function n(e,r){return\\\"pairs\\\"==r&&\\\"string\\\"==typeof e?e:\\\"object\\\"==typeof e&&null!=e[r]?e[r]:t[r]}e.defineOption(\\\"autoCloseBrackets\\\",!1,function(t,r,o){o&&o!=e.Init&&(t.removeKeyMap(i),t.state.closeBrackets=null),r&&(a(n(r,\\\"pairs\\\")),t.state.closeBrackets=r,t.addKeyMap(i))});var i={Backspace:function(t){var i=s(t);if(!i||t.getOption(\\\"disableInput\\\"))return e.Pass;for(var a=n(i,\\\"pairs\\\"),o=t.listSelections(),c=0;c<o.length;c++){if(!o[c].empty())return e.Pass;var f=l(t,o[c].head);if(!f||a.indexOf(f)%2!=0)return e.Pass}for(var c=o.length-1;c>=0;c--){var h=o[c].head;t.replaceRange(\\\"\\\",r(h.line,h.ch-1),r(h.line,h.ch+1),\\\"+delete\\\")}},Enter:function(t){var r=s(t),i=r&&n(r,\\\"explode\\\");if(!i||t.getOption(\\\"disableInput\\\"))return e.Pass;for(var a=t.listSelections(),o=0;o<a.length;o++){if(!a[o].empty())return e.Pass;var c=l(t,a[o].head);if(!c||i.indexOf(c)%2!=0)return e.Pass}t.operation(function(){var e=t.lineSeparator()||\\\"\\\\n\\\";t.replaceSelection(e+e,null),t.execCommand(\\\"goCharLeft\\\"),a=t.listSelections();for(var r=0;r<a.length;r++){var n=a[r].head.line;t.indentLine(n,null,!0),t.indentLine(n+1,null,!0)}})}};function a(e){for(var t=0;t<e.length;t++){var r=e.charAt(t),n=\\\"'\\\"+r+\\\"'\\\";i[n]||(i[n]=o(r))}}function o(t){return function(i){return function(t,i){var a=s(t);if(!a||t.getOption(\\\"disableInput\\\"))return e.Pass;var o=n(a,\\\"pairs\\\"),l=o.indexOf(i);if(-1==l)return e.Pass;for(var c,f=n(a,\\\"triples\\\"),h=o.charAt(l+1)==i,d=t.listSelections(),u=l%2==0,g=0;g<d.length;g++){var p,v=d[g],m=v.head,b=t.getRange(m,r(m.line,m.ch+1));if(u&&!v.empty())p=\\\"surround\\\";else if(!h&&u||b!=i)if(h&&m.ch>1&&f.indexOf(i)>=0&&t.getRange(r(m.line,m.ch-2),m)==i+i){if(m.ch>2&&/\\\\bstring/.test(t.getTokenTypeAt(r(m.line,m.ch-2))))return e.Pass;p=\\\"addFour\\\"}else if(h){var C=0==m.ch?\\\" \\\":t.getRange(r(m.line,m.ch-1),m);if(e.isWordChar(b)||C==i||e.isWordChar(C))return e.Pass;p=\\\"both\\\"}else{if(!u||!(t.getLine(m.line).length==m.ch||(x=b,P=o,void 0,k=P.lastIndexOf(x),k>-1&&k%2==1)||/\\\\s/.test(b)))return e.Pass;p=\\\"both\\\"}else p=!h||(S=m,void 0,O=(y=t).getTokenAt(r(S.line,S.ch+1)),!/\\\\bstring/.test(O.type)||O.start!=S.ch||0!=S.ch&&/\\\\bstring/.test(y.getTokenTypeAt(S)))?f.indexOf(i)>=0&&t.getRange(m,r(m.line,m.ch+3))==i+i+i?\\\"skipThree\\\":\\\"skip\\\":\\\"both\\\";if(c){if(c!=p)return e.Pass}else c=p}var x,P,k;var y,S,O;var R=l%2?o.charAt(l-1):i,A=l%2?i:o.charAt(l+1);t.operation(function(){if(\\\"skip\\\"==c)t.execCommand(\\\"goCharRight\\\");else if(\\\"skipThree\\\"==c)for(var n=0;n<3;n++)t.execCommand(\\\"goCharRight\\\");else if(\\\"surround\\\"==c){for(var i=t.getSelections(),n=0;n<i.length;n++)i[n]=R+i[n]+A;t.replaceSelections(i,\\\"around\\\"),i=t.listSelections().slice();for(var n=0;n<i.length;n++)i[n]=(a=i[n],void 0,o=e.cmpPos(a.anchor,a.head)>0,{anchor:new r(a.anchor.line,a.anchor.ch+(o?-1:1)),head:new r(a.head.line,a.head.ch+(o?1:-1))});t.setSelections(i)}else\\\"both\\\"==c?(t.replaceSelection(R+A,null),t.triggerElectric(R+A),t.execCommand(\\\"goCharLeft\\\")):\\\"addFour\\\"==c&&(t.replaceSelection(R+R+R+R,\\\"before\\\"),t.execCommand(\\\"goCharRight\\\"));var a,o})}(i,t)}}function s(e){var t=e.state.closeBrackets;return!t||t.override?t:e.getModeAt(e.getCursor()).closeBrackets||t}function l(e,t){var n=e.getRange(r(t.line,t.ch-1),r(t.line,t.ch+1));return 2==n.length?n:null}a(t.pairs+\\\"`\\\")});\",\"type\":\"application/javascript\",\"title\":\"$:/plugins/tiddlywiki/codemirror/addon/edit/closebrackets.js\",\"module-type\":\"codemirror\"},\"$:/plugins/tiddlywiki/codemirror/addon/edit/matchbrackets.js\":{\"text\":\"// CodeMirror, copyright (c) by Marijn Haverbeke and others\\n// Distributed under an MIT license: http://codemirror.net/LICENSE\\n!function(t){\\\"object\\\"==typeof exports&&\\\"object\\\"==typeof module?t(require(\\\"../../lib/codemirror\\\")):\\\"function\\\"==typeof define&&define.amd?define([\\\"../../lib/codemirror\\\"],t):t(CodeMirror)}(function(t){var e=/MSIE \\\\d/.test(navigator.userAgent)&&(null==document.documentMode||document.documentMode<8),n=t.Pos,r={\\\"(\\\":\\\")>\\\",\\\")\\\":\\\"(<\\\",\\\"[\\\":\\\"]>\\\",\\\"]\\\":\\\"[<\\\",\\\"{\\\":\\\"}>\\\",\\\"}\\\":\\\"{<\\\"};function i(t,e,i){var c=t.getLineHandle(e.line),o=e.ch-1,l=i&&i.afterCursor;null==l&&(l=/(^| )cm-fat-cursor($| )/.test(t.getWrapperElement().className));var h=!l&&o>=0&&r[c.text.charAt(o)]||r[c.text.charAt(++o)];if(!h)return null;var s=\\\">\\\"==h.charAt(1)?1:-1;if(i&&i.strict&&s>0!=(o==e.ch))return null;var u=t.getTokenTypeAt(n(e.line,o+1)),f=a(t,n(e.line,o+(s>0?1:0)),s,u||null,i);return null==f?null:{from:n(e.line,o),to:f&&f.pos,match:f&&f.ch==h.charAt(0),forward:s>0}}function a(t,e,i,a,c){for(var o=c&&c.maxScanLineLength||1e4,l=c&&c.maxScanLines||1e3,h=[],s=c&&c.bracketRegex?c.bracketRegex:/[(){}[\\\\]]/,u=i>0?Math.min(e.line+l,t.lastLine()+1):Math.max(t.firstLine()-1,e.line-l),f=e.line;f!=u;f+=i){var m=t.getLine(f);if(m){var g=i>0?0:m.length-1,d=i>0?m.length:-1;if(!(m.length>o))for(f==e.line&&(g=e.ch-(i<0?1:0));g!=d;g+=i){var k=m.charAt(g);if(s.test(k)&&(void 0===a||t.getTokenTypeAt(n(f,g+1))==a))if(\\\">\\\"==r[k].charAt(1)==i>0)h.push(k);else{if(!h.length)return{pos:n(f,g),ch:k};h.pop()}}}}return f-i!=(i>0?t.lastLine():t.firstLine())&&null}function c(t,r,a){for(var c=t.state.matchBrackets.maxHighlightLineLength||1e3,o=[],l=t.listSelections(),h=0;h<l.length;h++){var s=l[h].empty()&&i(t,l[h].head,a);if(s&&t.getLine(s.from.line).length<=c){var u=s.match?\\\"CodeMirror-matchingbracket\\\":\\\"CodeMirror-nonmatchingbracket\\\";o.push(t.markText(s.from,n(s.from.line,s.from.ch+1),{className:u})),s.to&&t.getLine(s.to.line).length<=c&&o.push(t.markText(s.to,n(s.to.line,s.to.ch+1),{className:u}))}}if(o.length){e&&t.state.focused&&t.focus();var f=function(){t.operation(function(){for(var t=0;t<o.length;t++)o[t].clear()})};if(!r)return f;setTimeout(f,800)}}function o(t){t.operation(function(){t.state.matchBrackets.currentlyHighlighted&&(t.state.matchBrackets.currentlyHighlighted(),t.state.matchBrackets.currentlyHighlighted=null),t.state.matchBrackets.currentlyHighlighted=c(t,!1,t.state.matchBrackets)})}t.defineOption(\\\"matchBrackets\\\",!1,function(e,n,r){r&&r!=t.Init&&(e.off(\\\"cursorActivity\\\",o),e.state.matchBrackets&&e.state.matchBrackets.currentlyHighlighted&&(e.state.matchBrackets.currentlyHighlighted(),e.state.matchBrackets.currentlyHighlighted=null)),n&&(e.state.matchBrackets=\\\"object\\\"==typeof n?n:{},e.on(\\\"cursorActivity\\\",o))}),t.defineExtension(\\\"matchBrackets\\\",function(){c(this,!0)}),t.defineExtension(\\\"findMatchingBracket\\\",function(t,e,n){return(n||\\\"boolean\\\"==typeof e)&&(n?(n.strict=e,e=n):e=e?{strict:!0}:null),i(this,t,e)}),t.defineExtension(\\\"scanForBracket\\\",function(t,e,n,r){return a(this,t,e,n,r)})});\",\"type\":\"application/javascript\",\"title\":\"$:/plugins/tiddlywiki/codemirror/addon/edit/matchbrackets.js\",\"module-type\":\"codemirror\"},\"$:/plugins/tiddlywiki/codemirror-closebrackets/readme\":{\"title\":\"$:/plugins/tiddlywiki/codemirror-closebrackets/readme\",\"text\":\"This plugin adds the ability to automatically insert the closing brackets when you type an opening bracket.\\nAlso enables highlighting of matching brackets.\\n\\nIt needs the latest [[CodeMirror plugin|$:/plugins/tiddlywiki/codemirror]] to be installed\\n\\n\"}}}"});