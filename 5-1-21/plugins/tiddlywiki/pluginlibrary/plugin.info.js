$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/pluginlibrary","description":"Plugin library builder","author":"JeremyRuston","core-version":">=5.0.0","list":"readme","version":"5.1.21","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\n    \"tiddlers\": {\n        \"$:/plugins/tiddlywiki/pluginlibrary/asset-list-json\": {\n            \"title\": \"$:/plugins/tiddlywiki/pluginlibrary/asset-list-json\",\n            \"text\": \"`var assetList = `<$view tiddler=\\\"$:/UpgradeLibrary/List\\\"/>`;\\n`\"\n        },\n        \"$:/plugins/tiddlywiki/pluginlibrary/library.template.html\": {\n            \"title\": \"$:/plugins/tiddlywiki/pluginlibrary/library.template.html\",\n            \"text\": \"\\\\rules only filteredtranscludeinline transcludeinline\\n<!doctype html>\\n<html>\\n<head>\\n<meta http-equiv=\\\"Content-Type\\\" content=\\\"text/html;charset=utf-8\\\" />\\n<meta name=\\\"application-name\\\" content=\\\"TiddlyWiki Plugin Library\\\" />\\n<meta name=\\\"application-version\\\" content=\\\"v0.0.0\\\" />\\n<meta name=\\\"copyright\\\" content=\\\"Copyright 2015 Jeremy Ruston\\\" />\\n<link id=\\\"faviconLink\\\" rel=\\\"shortcut icon\\\" href=\\\"favicon.ico\\\">\\n<title>Plugin Library</title>\\n<script>\\n{{$:/plugins/tiddlywiki/pluginlibrary/asset-list-json}}\\n{{$:/plugins/tiddlywiki/pluginlibrary/libraryserver.js}}\\n</script>\\n</head>\\n<body>\\n\\n<h1>HelloThere</h1>\\n\\n<p>This is the TiddlyWiki plugin library. It is not intended to be opened directly in the browser.</p>\\n\\n<p>See <a href=\\\"https://tiddlywiki.com/\\\" target=\\\"_blank\\\">https://tiddlywiki.com/</a> for details of how to install plugins.</p>\\n\\n</body>\\n</html>\"\n        },\n        \"$:/plugins/tiddlywiki/pluginlibrary/libraryserver.js\": {\n            \"title\": \"$:/plugins/tiddlywiki/pluginlibrary/libraryserver.js\",\n            \"text\": \"/*\\\\\\ntitle: $:/plugins/tiddlywiki/pluginlibrary/libraryserver.js\\ntype: application/javascript\\nmodule-type: library\\n\\nA simple HTTP-over-window.postMessage implementation of a standard TiddlyWeb-compatible server. It uses real HTTP to load the individual tiddler JSON files.\\n\\n\\\\*/\\n(function(){\\n\\n/*jslint node: true, browser: true */\\n/*global $tw: false */\\n\\\"use strict\\\";\\n\\n// Listen for window messages\\nwindow.addEventListener(\\\"message\\\",function listener(event){\\n\\tconsole.log(\\\"plugin library: Received message from\\\",event.origin);\\n\\tconsole.log(\\\"plugin library: Message content\\\",event.data);\\n\\tswitch(event.data.verb) {\\n\\t\\tcase \\\"GET\\\":\\n\\t\\t\\tif(event.data.url === \\\"recipes/library/tiddlers.json\\\") {\\n\\t\\t\\t\\t// Route for recipes/library/tiddlers.json\\n\\t\\t\\t\\tevent.source.postMessage({\\n\\t\\t\\t\\t\\tverb: \\\"GET-RESPONSE\\\",\\n\\t\\t\\t\\t\\tstatus: \\\"200\\\",\\n\\t\\t\\t\\t\\tcookies: event.data.cookies,\\n\\t\\t\\t\\t\\turl: event.data.url,\\n\\t\\t\\t\\t\\ttype: \\\"application/json\\\",\\n\\t\\t\\t\\t\\tbody: JSON.stringify(assetList,null,4)\\n\\t\\t\\t\\t},\\\"*\\\");\\n\\t\\t\\t} else if(event.data.url.indexOf(\\\"recipes/library/tiddlers/\\\") === 0) {\\n\\t\\t\\t\\tvar url = \\\"recipes/library/tiddlers/\\\" + encodeURIComponent(removePrefix(event.data.url,\\\"recipes/library/tiddlers/\\\"));\\n\\t\\t\\t\\t// Route for recipes/library/tiddlers/<uri-encoded-tiddler-title>.json\\n\\t\\t\\t\\thttpGet(url,function(err,responseText) {\\n\\t\\t\\t\\t\\tif(err) {\\n\\t\\t\\t\\t\\t\\tevent.source.postMessage({\\n\\t\\t\\t\\t\\t\\t\\tverb: \\\"GET-RESPONSE\\\",\\n\\t\\t\\t\\t\\t\\t\\tstatus: \\\"404\\\",\\n\\t\\t\\t\\t\\t\\t\\tcookies: event.data.cookies,\\n\\t\\t\\t\\t\\t\\t\\turl: event.data.url,\\n\\t\\t\\t\\t\\t\\t\\ttype: \\\"text/plain\\\",\\n\\t\\t\\t\\t\\t\\t\\tbody: \\\"Not found\\\"\\n\\t\\t\\t\\t\\t\\t},\\\"*\\\");\\n\\t\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\t\\tevent.source.postMessage({\\n\\t\\t\\t\\t\\t\\t\\tverb: \\\"GET-RESPONSE\\\",\\n\\t\\t\\t\\t\\t\\t\\tstatus: \\\"200\\\",\\n\\t\\t\\t\\t\\t\\t\\tcookies: event.data.cookies,\\n\\t\\t\\t\\t\\t\\t\\turl: event.data.url,\\n\\t\\t\\t\\t\\t\\t\\ttype: \\\"application/json\\\",\\n\\t\\t\\t\\t\\t\\t\\tbody: responseText\\n\\t\\t\\t\\t\\t\\t},\\\"*\\\");\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t});\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tevent.source.postMessage({\\n\\t\\t\\t\\t\\tverb: \\\"GET-RESPONSE\\\",\\n\\t\\t\\t\\t\\tstatus: \\\"404\\\",\\n\\t\\t\\t\\t\\tcookies: event.data.cookies,\\n\\t\\t\\t\\t\\turl: event.data.url,\\n\\t\\t\\t\\t\\ttype: \\\"text/plain\\\",\\n\\t\\t\\t\\t\\tbody: \\\"Not found\\\"\\n\\t\\t\\t\\t},\\\"*\\\");\\n\\t\\t\\t}\\n\\t\\t\\tbreak;\\n\\t}\\n},false);\\n\\n// Helper to remove string prefixes\\nfunction removePrefix(string,prefix) {\\n\\tif(string.indexOf(prefix) === 0) {\\n\\t\\treturn string.substr(prefix.length);\\n\\t} else {\\n\\t\\treturn string;\\n\\t}\\n}\\n\\n// Helper for HTTP GET\\nfunction httpGet(url,callback) {\\n\\tvar http = new XMLHttpRequest();\\n\\thttp.open(\\\"GET\\\",url,true);\\n\\thttp.onreadystatechange = function() {\\n\\t\\tif(http.readyState == 4 && http.status == 200) {\\n\\t\\t\\tcallback(null,http.responseText);\\n\\t\\t}\\n\\t};\\n\\thttp.send();\\n}\\n\\n})();\\n\",\n            \"type\": \"application/javascript\",\n            \"module-type\": \"library\"\n        },\n        \"$:/plugins/tiddlywiki/pluginlibrary/readme\": {\n            \"title\": \"$:/plugins/tiddlywiki/pluginlibrary/readme\",\n            \"text\": \"This plugin is used behind the scenes by TiddlyWiki to build the plugin library.\\n\\n[[Source code|https://github.com/Jermolene/TiddlyWiki5/blob/master/plugins/tiddlywiki/pluginlibrary]]\\n\"\n        }\n    }\n}"});