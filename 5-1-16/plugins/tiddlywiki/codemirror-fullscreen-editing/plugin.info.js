$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/codemirror-fullscreen","description":"CodeMirror AddOn: Fullscreen Editing","author":"JeremyRuston","list":"readme","version":"5.1.16","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/config/codemirror/fullscreen\":{\"title\":\"$:/config/codemirror/fullscreen\",\"extend\":\"extraKeys\",\"type\":\"json\",\"text\":\"{\\n\\t\\\"F11\\\": \\\"togglefullscreen\\\"\\n}\"},\"$:/plugins/tiddlywiki/codemirror/addon/fullscreen/fullscreen.js\":{\"text\":\"// CodeMirror, copyright (c) by Marijn Haverbeke and others\\n// Distributed under an MIT license: http://codemirror.net/LICENSE\\n!function(e){\\\"object\\\"==typeof exports&&\\\"object\\\"==typeof module?e(require(\\\"../../lib/codemirror\\\")):\\\"function\\\"==typeof define&&define.amd?define([\\\"../../lib/codemirror\\\"],e):e(CodeMirror)}(function(e){\\\"use strict\\\";e.defineOption(\\\"fullScreen\\\",!1,function(t,l,o){var r,n;(o==e.Init&&(o=!1),!o!=!l)&&(l?(n=(r=t).getWrapperElement(),r.state.fullScreenRestore={scrollTop:window.pageYOffset,scrollLeft:window.pageXOffset,width:n.style.width,height:n.style.height},n.style.width=\\\"\\\",n.style.height=\\\"auto\\\",n.className+=\\\" CodeMirror-fullscreen\\\",document.documentElement.style.overflow=\\\"hidden\\\",r.refresh()):function(e){var t=e.getWrapperElement();t.className=t.className.replace(/\\\\s*CodeMirror-fullscreen\\\\b/,\\\"\\\"),document.documentElement.style.overflow=\\\"\\\";var l=e.state.fullScreenRestore;t.style.width=l.width,t.style.height=l.height,window.scrollTo(l.scrollLeft,l.scrollTop),e.refresh()}(t))}),e.toggleFullscreen=function(e){e.setOption(\\\"fullScreen\\\",!e.getOption(\\\"fullScreen\\\"))},e.commands.togglefullscreen=e.toggleFullscreen});\",\"type\":\"application/javascript\",\"title\":\"$:/plugins/tiddlywiki/codemirror/addon/fullscreen/fullscreen.js\",\"module-type\":\"codemirror\"},\"$:/plugins/tiddlywiki/codemirror/addon/fullscreen/fullscreen.css\":{\"text\":\".CodeMirror-fullscreen {\\n  position: fixed;\\n  top: 0; left: 0; right: 0; bottom: 0;\\n  height: auto;\\n  z-index: 9;\\n}\\n\",\"type\":\"text/css\",\"title\":\"$:/plugins/tiddlywiki/codemirror/addon/fullscreen/fullscreen.css\",\"tags\":\"[[$:/tags/Stylesheet]]\"},\"$:/plugins/tiddlywiki/codemirror-fullscreen/readme\":{\"title\":\"$:/plugins/tiddlywiki/codemirror-fullscreen/readme\",\"text\":\"This plugin adds a ''Fullscreen editing Mode'' to the [[CodeMirror|http://codemirror.net]] text editor. It needs the latest [[CodeMirror plugin|$:/plugins/tiddlywiki/codemirror]] to be installed\\n\\nPressing ''F11'' with the focus within the editor-textarea will make the editor go fullscreen, pressing ''F11'' again leaves fullscreen-mode\\n\\n\"}}}"});