$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/nodewebkitsaver","description":"NW.js saver","author":"JeremyRuston","core-version":">=5.0.0","list":"readme","version":"5.1.18","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/core/modules/savers/nodewebkit.js\":{\"title\":\"$:/core/modules/savers/nodewebkit.js\",\"text\":\"/*\\\\\\ntitle: $:/core/modules/savers/nodewebkit.js\\ntype: application/javascript\\nmodule-type: saver\\n\\nHandles saving changes in the NW.js environment. Not required by TiddlyDesktop, which re-uses the TiddlyFox saver, but useful if you're embedding a single TiddlyWiki document into a NW.js app.\\n\\n\\\\*/\\n(function(){\\n\\n/*jslint node: true, browser: true */\\n/*global $tw: false, netscape: false, Components: false */\\n\\\"use strict\\\";\\n\\nvar NodeWebKitSaver = function(wiki) {\\n};\\n\\nNodeWebKitSaver.prototype.save = function(text,method,callback) {\\n\\t// Bail out unless this is a save (rather than a download)\\n\\tif(method !== \\\"save\\\") {\\n\\t\\treturn false;\\n\\t}\\n\\t// Get the pathname of this document\\n\\tvar pathname = document.location.pathname;\\n\\t// Test for a Windows path of the form /x:/blah/blah\\n\\tif(/^\\\\/[A-Z]\\\\:\\\\//i.test(pathname)) {\\n\\t\\t// Remove the leading slash\\n\\t\\tpathname = pathname.substr(1);\\n\\t\\t// Convert slashes to backslashes\\n\\t\\tpathname = pathname.replace(/\\\\//g,\\\"\\\\\\\\\\\");\\n\\t}\\n\\t// Try to save\\n\\tvar fs = require(\\\"fs\\\");\\n\\tfs.writeFile(pathname,text,callback);\\n\\treturn true;\\n};\\n\\n/*\\nInformation about this saver\\n*/\\nNodeWebKitSaver.prototype.info = {\\n\\tname: \\\"nodewebkit\\\",\\n\\tpriority: 1700\\n};\\n\\n/*\\nStatic method that returns true if this saver is capable of working\\n*/\\nexports.canSave = function(wiki) {\\n\\t// Check if we're running under node-webkit\\n\\treturn (typeof process == \\\"object\\\");\\n};\\n\\n/*\\nCreate an instance of this saver\\n*/\\nexports.create = function(wiki) {\\n\\treturn new NodeWebKitSaver(wiki);\\n};\\n\\n})();\\n\",\"type\":\"application/javascript\",\"module-type\":\"saver\"},\"$:/plugins/tiddlywiki/nodewebkitsaver/readme\":{\"title\":\"$:/plugins/tiddlywiki/nodewebkitsaver/readme\",\"text\":\"This plugin provides a ''saver'' module for saving changes when using TiddlyWiki directly under NW.js (previously known as node-webkit).\\n\\n[[Source code|https://github.com/Jermolene/TiddlyWiki5/blob/master/plugins/tiddlywiki/nodewebkitsaver]]\\n\"}}}"});