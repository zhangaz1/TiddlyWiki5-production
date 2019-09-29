$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/classictools","description":"TiddlyWiki Classic manipulation tools","author":"JeremyRuston","core-version":">=5.0.0","list":"readme","version":"5.1.19","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/classictools/recipe.js\":{\"title\":\"$:/plugins/tiddlywiki/classictools/recipe.js\",\"text\":\"/*\\\\\\ntitle: $:/plugins/tiddlywiki/classictools/recipe.js\\ntype: application/javascript\\nmodule-type: tiddlerdeserializer\\n\\nModule to deserialize tiddlers from an old school TiddlyWiki recipe file.\\n\\nThe idea is to process the recipe file recursively, loading tiddlers into the main store using synchronous file operations. The tiddlers have their titles prefixed with the associated marker in curly brackets (\\\"{shadow}\\\", \\\"{tiddler}\\\" etc).\\n\\n\\\\*/\\n(function(){\\n\\n/*jslint node: true, browser: true */\\n/*global $tw: false */\\n\\\"use strict\\\";\\n\\nexports[\\\"text/vnd.tiddlywiki2-recipe\\\"] = function(text,fields) {\\n\\tvar self = this,\\n\\t\\tpath = require(\\\"path\\\"),\\n\\t\\tfs = require(\\\"fs\\\"),\\n\\t\\ttiddlers = [],\\n\\t\\tparseRecipe = function(text) {\\n\\t\\t\\tvar recipe = [];\\n\\t\\t\\ttext.toString().split(/\\\\r?\\\\n/mg).forEach(function(line) {\\n\\t\\t\\t\\t// Check if the line is a comment\\n\\t\\t\\t\\tif(line.charAt(0) !== \\\"#\\\") {\\n\\t\\t\\t\\t\\t// Find the colon splitting the name from the value\\n\\t\\t\\t\\t\\tvar p = line.indexOf(\\\":\\\");\\n\\t\\t\\t\\t\\tif(p !== -1) {\\n\\t\\t\\t\\t\\t\\trecipe.push({\\n\\t\\t\\t\\t\\t\\t\\tname: line.substr(0,p).trim(),\\n\\t\\t\\t\\t\\t\\t\\tvalue: line.substr(p+1).trim()\\n\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}\\n\\t\\t\\t});\\n\\t\\t\\treturn recipe;\\n\\t\\t},\\n\\t\\tloadTiddlersFromFile = function(sourcePath,prefix) {\\n\\t\\t\\tvar ext = path.extname(sourcePath),\\n\\t\\t\\t\\textensionInfo = $tw.utils.getFileExtensionInfo(ext),\\n\\t\\t\\t\\ttypeInfo = extensionInfo ? $tw.config.contentTypeInfo[extensionInfo.type] : null,\\n\\t\\t\\t\\tdata = fs.readFileSync(sourcePath,typeInfo ? typeInfo.encoding : \\\"utf8\\\"),\\n\\t\\t\\t\\tfields = {title: sourcePath},\\n\\t\\t\\t\\ttids = self.deserializeTiddlers(ext,data,fields),\\n\\t\\t\\t\\tmetafile = sourcePath + \\\".meta\\\";\\n\\t\\t\\tif(ext !== \\\".json\\\" && tids.length === 1 && fs.existsSync(metafile)) {\\n\\t\\t\\t\\tvar metadata = fs.readFileSync(metafile,\\\"utf8\\\");\\n\\t\\t\\t\\tif(metadata) {\\n\\t\\t\\t\\t\\ttids = [$tw.utils.parseFields(metadata,tids[0])];\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t\\ttids.forEach(function(tid) {\\n\\t\\t\\t\\ttid.title = prefix + tid.title;\\n\\t\\t\\t});\\n\\t\\t\\ttiddlers.push.apply(tiddlers,tids);\\n\\t\\t},\\n\\t\\tprocessRecipe = function(sourcePath,text) {\\n\\t\\t\\tvar recipe = parseRecipe(text);\\n\\t\\t\\tfor(var t=0; t<recipe.length; t++) {\\n\\t\\t\\t\\tif(recipe[t].name === \\\"recipe\\\") {\\n\\t\\t\\t\\t\\tvar recipeFile = path.resolve(path.dirname(sourcePath),recipe[t].value);\\n\\t\\t\\t\\t\\tprocessRecipe(recipeFile,fs.readFileSync(recipeFile,\\\"utf8\\\"));\\n\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\tvar tiddlerFile = path.resolve(path.dirname(sourcePath),recipe[t].value);\\n\\t\\t\\t\\t\\tloadTiddlersFromFile(tiddlerFile,\\\"{\\\" + recipe[t].name + \\\"}\\\");\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t},\\n\\t\\tsourcePath = fields.title; // Bit of a hack to take advantage of the default title being the path to the tiddler file\\n\\tprocessRecipe(sourcePath,text);\\n\\treturn tiddlers;\\n};\\n\\n})();\\n\",\"type\":\"application/javascript\",\"module-type\":\"tiddlerdeserializer\"},\"$:/plugins/tiddlywiki/classictools/readme\":{\"title\":\"$:/plugins/tiddlywiki/classictools/readme\",\"text\":\"This plugin provides facilities for working with TiddlyWiki Classic. It is used in the build process for TiddlyWiki Classic.\\n\\nThe additional features are:\\n\\n* A ''tiddlerdeserializer'' module for reading TiddlyWiki Classic `.recipe` files\\n* Templates for building TiddlyWiki Classic.\\n\\nSee https://github.com/TiddlyWiki/tiddlywiki.com for more details.\\n\\n[[Source code|https://github.com/Jermolene/TiddlyWiki5/blob/master/plugins/tiddlywiki/classictools]]\\n\"},\"$:/core/templates/html-div-tiddler-remove-prefix\":{\"title\":\"$:/core/templates/html-div-tiddler-remove-prefix\",\"text\":\"<!--\\n\\nThis template is used for saving tiddlers as an HTML DIV tag with attributes representing the tiddler fields.\\n\\n-->`<div`<$fields template=' $name$=\\\"$encoded_value$\\\"' stripTitlePrefix=\\\"yes\\\"></$fields>`>\\n<pre>`<$view field=\\\"text\\\" format=\\\"htmlencoded\\\" />`</pre>\\n</div>`\\n\"},\"$:/core/templates/plain-text-tiddler-strip-comments\":{\"title\":\"$:/core/templates/plain-text-tiddler-strip-comments\",\"text\":\"<$view field=\\\"text\\\" format=\\\"stripcomments\\\" />\"},\"$:/core/templates/tiddlywiki2.externaljs.template.html\":{\"title\":\"$:/core/templates/tiddlywiki2.externaljs.template.html\",\"text\":\"{{{ [prefix[{prejs}]] ||$:/core/templates/plain-text-tiddler-strip-comments}}}\\n{{{ [prefix[{js}]] ||$:/core/templates/plain-text-tiddler-strip-comments}}}\\n{{{ [prefix[{postjs}]] ||$:/core/templates/plain-text-tiddler-strip-comments}}}\\n{{{ [prefix[{jsext}]] ||$:/core/templates/plain-text-tiddler-strip-comments}}}\\n\\n\"},\"$:/core/templates/tiddlywiki2.template.html\":{\"title\":\"$:/core/templates/tiddlywiki2.template.html\",\"text\":\"\\\\rules only filteredtranscludeinline transcludeinline\\n<!DOCTYPE html PUBLIC \\\"-//W3C//DTD XHTML 1.0 Strict//EN\\\" \\\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\\\">\\n<html xmlns=\\\"http://www.w3.org/1999/xhtml\\\" xml:lang=\\\"en\\\" lang=\\\"en\\\">\\n<head>\\n<script id=\\\"versionArea\\\" type=\\\"text/javascript\\\">\\n//<![CDATA[\\n{{{ [prefix[{version}]] ||$:/core/templates/plain-text-tiddler}}}\\n//]]>\\n</script>\\n<meta http-equiv=\\\"Content-Type\\\" content=\\\"text/html;charset=utf-8\\\" />\\n<meta name=\\\"copyright\\\" content=\\\"\\n{{{ [prefix[{copyright}]] ||$:/core/templates/plain-text-tiddler}}}\\n\\\" />\\n<!--PRE-HEAD-START-->\\n{{{ [prefix[{prehead}]] ||$:/core/templates/plain-text-tiddler}}}\\n<!--PRE-HEAD-END-->\\n<title>\\n{{{ [prefix[{title}]] ||$:/core/templates/plain-text-tiddler}}}\\n</title>\\n<style id=\\\"styleArea\\\" type=\\\"text/css\\\">\\n{{{ [prefix[{style}]] ||$:/core/templates/plain-text-tiddler}}}\\n</style>\\n<!--POST-HEAD-START-->\\n{{{ [prefix[{posthead}]] ||$:/core/templates/plain-text-tiddler}}}\\n<!--POST-HEAD-END-->\\n</head>\\n<body onload=\\\"main();\\\" onunload=\\\"if(window.unload) unload();\\\">\\n<!--PRE-BODY-START-->\\n{{{ [prefix[{prebody}]] ||$:/core/templates/plain-text-tiddler}}}\\n<!--PRE-BODY-END-->\\n<div id=\\\"copyright\\\">\\nWelcome to TiddlyWiki created by Jeremy Ruston; Copyright &copy; 2004-2007 Jeremy Ruston, Copyright &copy; 2007-2011 UnaMesa Association\\n</div>\\n<noscript>\\n{{{ [prefix[{noscript}]] ||$:/core/templates/plain-text-tiddler}}}\\n</noscript>\\n<div id=\\\"saveTest\\\"></div>\\n<div id=\\\"backstageCloak\\\"></div>\\n<div id=\\\"backstageButton\\\"></div>\\n<div id=\\\"backstageArea\\\"><div id=\\\"backstageToolbar\\\"></div></div>\\n<div id=\\\"backstage\\\">\\n\\t<div id=\\\"backstagePanel\\\"></div>\\n</div>\\n<div id=\\\"contentWrapper\\\"></div>\\n<div id=\\\"contentStash\\\"></div>\\n<div id=\\\"shadowArea\\\">\\n{{{ [prefix[{shadow}]] +[sortcs[title]] ||$:/core/templates/html-div-tiddler-remove-prefix}}}\\n</div>\\n<!--POST-SHADOWAREA-->\\n<div id=\\\"storeArea\\\">\\n{{{ [prefix[{tiddler}]] +[sortcs[title]] ||$:/core/templates/html-div-tiddler-remove-prefix}}}\\n{{{ [prefix[{plugin}]] ||$:/core/templates/plain-text-tiddler}}}\\n{{{ [prefix[{posttiddlers}]] ||$:/core/templates/plain-text-tiddler}}}\\n</div>\\n<!--POST-STOREAREA-->\\n<!--POST-BODY-START-->\\n{{{ [prefix[{postbody}]] ||$:/core/templates/plain-text-tiddler}}}\\n<!--POST-BODY-END-->\\n<script id=\\\"jsArea\\\" type=\\\"text/javascript\\\">\\n//<![CDATA[\\n{{{ [prefix[{prejs}]] ||$:/core/templates/plain-text-tiddler-strip-comments}}}\\n{{{ [prefix[{js}]] ||$:/core/templates/plain-text-tiddler-strip-comments}}}\\n{{{ [prefix[{postjs}]] ||$:/core/templates/plain-text-tiddler-strip-comments}}}\\n//]]>\\n</script>\\n{{{ [prefix[{jsext}]] ||$:/core/templates/plain-text-tiddler-strip-comments}}}\\n<script id=\\\"jsdeprecatedArea\\\" type=\\\"text/javascript\\\">\\n//<![CDATA[\\n{{{ [prefix[{jsdeprecated}]] ||$:/core/templates/plain-text-tiddler-strip-comments}}}\\n//]]>\\n</script>\\n<script id=\\\"jslibArea\\\" type=\\\"text/javascript\\\">\\n//<![CDATA[\\n{{{ [prefix[{jslib}]] ||$:/core/templates/plain-text-tiddler-strip-comments}}}\\n//]]>\\n</script>\\n<script id=\\\"jqueryArea\\\" type=\\\"text/javascript\\\">\\n//<![CDATA[\\n{{{ [prefix[{jquery}]] ||$:/core/templates/plain-text-tiddler-strip-comments}}}\\n//]]>\\n</script>\\n<script type=\\\"text/javascript\\\">\\n//<![CDATA[\\nif(useJavaSaver)\\n\\tdocument.write(\\\"<applet style='position:absolute;left:-1px' name='TiddlySaver' code='TiddlySaver.class' archive='TiddlySaver.jar' width='1' height='1'></applet>\\\");\\n//]]>\\n</script>\\n<!--POST-SCRIPT-START-->\\n{{{ [prefix[{postscript}]] ||$:/core/templates/plain-text-tiddler}}}\\n<!--POST-SCRIPT-END-->\\n</body>\\n</html>\\n\"}}}"});