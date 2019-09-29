$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/codemirror-mode-htmlembedded","description":"CodeMirror Mode: Embedded-HTML Highlighting","author":"JeremyRuston","list":"readme","version":"5.1.18","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/codemirror/addon/mode/multiplex.js\":{\"text\":\"// CodeMirror, copyright (c) by Marijn Haverbeke and others\\n// Distributed under an MIT license: http://codemirror.net/LICENSE\\n!function(e){\\\"object\\\"==typeof exports&&\\\"object\\\"==typeof module?e(require(\\\"../../lib/codemirror\\\")):\\\"function\\\"==typeof define&&define.amd?define([\\\"../../lib/codemirror\\\"],e):e(CodeMirror)}(function(e){\\\"use strict\\\";e.multiplexingMode=function(n){var i=Array.prototype.slice.call(arguments,1);function t(e,n,i,t){if(\\\"string\\\"==typeof n){var r=e.indexOf(n,i);return t&&r>-1?r+n.length:r}var o=n.exec(i?e.slice(i):e);return o?o.index+i+(t?o[0].length:0):-1}return{startState:function(){return{outer:e.startState(n),innerActive:null,inner:null}},copyState:function(i){return{outer:e.copyState(n,i.outer),innerActive:i.innerActive,inner:i.innerActive&&e.copyState(i.innerActive.mode,i.inner)}},token:function(r,o){if(o.innerActive){var c=o.innerActive;a=r.string;if(!c.close&&r.sol())return o.innerActive=o.inner=null,this.token(r,o);if((v=c.close?t(a,c.close,r.pos,c.parseDelimiters):-1)==r.pos&&!c.parseDelimiters)return r.match(c.close),o.innerActive=o.inner=null,c.delimStyle&&c.delimStyle+\\\" \\\"+c.delimStyle+\\\"-close\\\";v>-1&&(r.string=a.slice(0,v));var l=c.mode.token(r,o.inner);return v>-1&&(r.string=a),v==r.pos&&c.parseDelimiters&&(o.innerActive=o.inner=null),c.innerStyle&&(l=l?l+\\\" \\\"+c.innerStyle:c.innerStyle),l}for(var s=1/0,a=r.string,u=0;u<i.length;++u){var v,d=i[u];if((v=t(a,d.open,r.pos))==r.pos){d.parseDelimiters||r.match(d.open),o.innerActive=d;var f=0;if(n.indent){var m=n.indent(o.outer,\\\"\\\");m!==e.Pass&&(f=m)}return o.inner=e.startState(d.mode,f),d.delimStyle&&d.delimStyle+\\\" \\\"+d.delimStyle+\\\"-open\\\"}-1!=v&&v<s&&(s=v)}s!=1/0&&(r.string=a.slice(0,s));var p=n.token(r,o.outer);return s!=1/0&&(r.string=a),p},indent:function(i,t){var r=i.innerActive?i.innerActive.mode:n;return r.indent?r.indent(i.innerActive?i.inner:i.outer,t):e.Pass},blankLine:function(t){var r=t.innerActive?t.innerActive.mode:n;if(r.blankLine&&r.blankLine(t.innerActive?t.inner:t.outer),t.innerActive)\\\"\\\\n\\\"===t.innerActive.close&&(t.innerActive=t.inner=null);else for(var o=0;o<i.length;++o){var c=i[o];\\\"\\\\n\\\"===c.open&&(t.innerActive=c,t.inner=e.startState(c.mode,r.indent?r.indent(t.outer,\\\"\\\"):0))}},electricChars:n.electricChars,innerMode:function(e){return e.inner?{state:e.inner,mode:e.innerActive.mode}:{state:e.outer,mode:n}}}}});\\n\",\"type\":\"application/javascript\",\"title\":\"$:/plugins/tiddlywiki/codemirror/addon/mode/multiplex.js\",\"module-type\":\"codemirror\"},\"$:/plugins/tiddlywiki/codemirror/mode/htmlembedded/htmlembedded.js\":{\"text\":\"// CodeMirror, copyright (c) by Marijn Haverbeke and others\\n// Distributed under an MIT license: http://codemirror.net/LICENSE\\n!function(e){\\\"object\\\"==typeof exports&&\\\"object\\\"==typeof module?e(require(\\\"../../lib/codemirror\\\"),require(\\\"../htmlmixed/htmlmixed\\\"),require(\\\"../../addon/mode/multiplex\\\")):\\\"function\\\"==typeof define&&define.amd?define([\\\"../../lib/codemirror\\\",\\\"../htmlmixed/htmlmixed\\\",\\\"../../addon/mode/multiplex\\\"],e):e(CodeMirror)}(function(e){\\\"use strict\\\";e.defineMode(\\\"htmlembedded\\\",function(i,t){var d=t.closeComment||\\\"--%>\\\";return e.multiplexingMode(e.getMode(i,\\\"htmlmixed\\\"),{open:t.openComment||\\\"<%--\\\",close:d,delimStyle:\\\"comment\\\",mode:{token:function(e){return e.skipTo(d)||e.skipToEnd(),\\\"comment\\\"}}},{open:t.open||t.scriptStartRegex||\\\"<%\\\",close:t.close||t.scriptEndRegex||\\\"%>\\\",mode:e.getMode(i,t.scriptingModeSpec)})},\\\"htmlmixed\\\"),e.defineMIME(\\\"application/x-ejs\\\",{name:\\\"htmlembedded\\\",scriptingModeSpec:\\\"javascript\\\"}),e.defineMIME(\\\"application/x-aspx\\\",{name:\\\"htmlembedded\\\",scriptingModeSpec:\\\"text/x-csharp\\\"}),e.defineMIME(\\\"application/x-jsp\\\",{name:\\\"htmlembedded\\\",scriptingModeSpec:\\\"text/x-java\\\"}),e.defineMIME(\\\"application/x-erb\\\",{name:\\\"htmlembedded\\\",scriptingModeSpec:\\\"ruby\\\"})});\",\"type\":\"application/javascript\",\"title\":\"$:/plugins/tiddlywiki/codemirror/mode/htmlembedded/htmlembedded.js\",\"module-type\":\"codemirror\"},\"$:/plugins/tiddlywiki/codemirror-mode-htmlembedded/readme\":{\"title\":\"$:/plugins/tiddlywiki/codemirror-mode-htmlembedded/readme\",\"text\":\"This plugin adds Syntax Highlighting for Embedded-HTML tiddlers (application/x-aspx, application/x-ejs, application/x-jsp and application/x-erb) to the [[CodeMirror|http://codemirror.net]] text editor. It needs the latest [[CodeMirror plugin|$:/plugins/tiddlywiki/codemirror]] to be installed\\n\\n\"}}}"});