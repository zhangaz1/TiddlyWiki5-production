$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/tiddlyweb","description":"TiddlyWeb and TiddlySpace components","author":"JeremyRuston","core-version":">=5.0.0","list":"readme","version":"5.1.15","plugin-type":"plugin","dependents":"","type":"application/json","tiddlers":{"GettingStarted":{"title":"GettingStarted","tags":"$:/tags/GettingStarted","caption":"Step 1<br>Syncing","text":"Welcome to ~TiddlyWiki and the ~TiddlyWiki community\n\nVisit https://tiddlywiki.com/ to find out more about ~TiddlyWiki and what it can do.\n\n! Syncing Changes to the Server\n\nBefore you can start storing important information in ~TiddlyWiki it is important to make sure that your changes are being reliably saved by the server.\n\n# Create a new tiddler using the {{$:/core/images/new-button}} button in the sidebar on the right\n# Click the {{$:/core/images/done-button}} button at the top right of the new tiddler\n# Check the ~TiddlyWiki command line for a message confirming the tiddler has been saved\n# Refresh the page in the browser to and verify that the new tiddler has been correctly saved\n"},"$:/config/SaveWikiButton/Template":{"title":"$:/config/SaveWikiButton/Template","text":"$:/plugins/tiddlywiki/tiddlyweb/save/offline"},"$:/plugins/tiddlywiki/tiddlyweb/ServerControlPanel":{"title":"$:/plugins/tiddlywiki/tiddlyweb/ServerControlPanel","caption":"Server","tags":"$:/tags/ControlPanel","text":"<$reveal state=\"$:/status/IsLoggedIn\" type=\"nomatch\" text=\"yes\">\nLog in to ~TiddlyWeb: <$button message=\"tm-login\">Login</$button>\n</$reveal>\n<$reveal state=\"$:/status/IsLoggedIn\" type=\"match\" text=\"yes\">\nLogged in as {{$:/status/UserName}} <$button message=\"tm-logout\">Logout</$button>\n</$reveal>\n\n----\n\nHost configuration: <$edit-text tiddler=\"$:/config/tiddlyweb/host\" tag=\"input\" default=\"\"/>\n\n<blockquote>//for example, `$protocol$//$host$/folder`, where `$protocol$` is replaced by the protocol (typically `http` or `https`), and `$host$` by the host name//</blockquote>\n\n----\n\n<$button message=\"tm-server-refresh\">Refresh</$button> to fetch changes from the server immediately\n"},"$:/core/templates/html-div-tiddler":{"title":"$:/core/templates/html-div-tiddler","text":"<!--\n\nThis template is used for saving tiddlers as an HTML DIV tag with attributes representing the tiddler fields. This version includes the tiddler changecount as the field `revision`.\n\n-->`<div`<$fields exclude='text revision bag' template=' $name$=\"$encoded_value$\"'></$fields>` revision=\"`<<changecount>>`\" bag=\"default\">\n<pre>`<$view field=\"text\" format=\"htmlencoded\" />`</pre>\n</div>`\n"},"$:/plugins/tiddlywiki/tiddlyweb/readme":{"title":"$:/plugins/tiddlywiki/tiddlyweb/readme","text":"This plugin runs in the browser to synchronise tiddler changes to and from a TiddlyWeb-compatible server (including TiddlyWiki 5 itself, running on Node.js). It is inert when run under Node.js. Disabling this plugin via the browser can not be undone via the browser since this plugin provides the mechanism to synchronize settings with the server.\n\n[[Source code|https://github.com/Jermolene/TiddlyWiki5/blob/master/plugins/tiddlywiki/tiddlyweb]]\n"},"$:/plugins/tiddlywiki/tiddlyweb/save/offline":{"title":"$:/plugins/tiddlywiki/tiddlyweb/save/offline","text":"\\define saveTiddlerFilter()\n[is[tiddler]] -[[$:/boot/boot.css]] -[[$:/HistoryList]] -[type[application/javascript]library[yes]] -[[$:/boot/boot.js]] -[[$:/boot/bootprefix.js]] -[[$:/plugins/tiddlywiki/filesystem]] -[[$:/plugins/tiddlywiki/tiddlyweb]] +[sort[title]] $(publishFilter)$\n\\end\n{{$:/core/templates/tiddlywiki5.html}}\n"},"$:/plugins/tiddlywiki/tiddlyweb/tiddlywebadaptor.js":{"title":"$:/plugins/tiddlywiki/tiddlyweb/tiddlywebadaptor.js","text":"/*\\\ntitle: $:/plugins/tiddlywiki/tiddlyweb/tiddlywebadaptor.js\ntype: application/javascript\nmodule-type: syncadaptor\n\nA sync adaptor module for synchronising with TiddlyWeb compatible servers\n\n\\*/\n(function(){\n\n/*jslint node: true, browser: true */\n/*global $tw: false */\n\"use strict\";\n\nvar CONFIG_HOST_TIDDLER = \"$:/config/tiddlyweb/host\",\n\tDEFAULT_HOST_TIDDLER = \"$protocol$//$host$/\";\n\nfunction TiddlyWebAdaptor(options) {\n\tthis.wiki = options.wiki;\n\tthis.host = this.getHost();\n\tthis.recipe = undefined;\n\tthis.hasStatus = false;\n\tthis.logger = new $tw.utils.Logger(\"TiddlyWebAdaptor\");\n}\n\nTiddlyWebAdaptor.prototype.name = \"tiddlyweb\";\n\nTiddlyWebAdaptor.prototype.isReady = function() {\n\treturn this.hasStatus;\n};\n\nTiddlyWebAdaptor.prototype.getHost = function() {\n\tvar text = this.wiki.getTiddlerText(CONFIG_HOST_TIDDLER,DEFAULT_HOST_TIDDLER),\n\t\tsubstitutions = [\n\t\t\t{name: \"protocol\", value: document.location.protocol},\n\t\t\t{name: \"host\", value: document.location.host}\n\t\t];\n\tfor(var t=0; t<substitutions.length; t++) {\n\t\tvar s = substitutions[t];\n\t\ttext = $tw.utils.replaceString(text,new RegExp(\"\\\\$\" + s.name + \"\\\\$\",\"mg\"),s.value);\n\t}\n\treturn text;\n};\n\nTiddlyWebAdaptor.prototype.getTiddlerInfo = function(tiddler) {\n\treturn {\n\t\tbag: tiddler.fields.bag\n\t};\n};\n\n/*\nGet the current status of the TiddlyWeb connection\n*/\nTiddlyWebAdaptor.prototype.getStatus = function(callback) {\n\t// Get status\n\tvar self = this;\n\tthis.logger.log(\"Getting status\");\n\t$tw.utils.httpRequest({\n\t\turl: this.host + \"status\",\n\t\tcallback: function(err,data) {\n\t\t\tself.hasStatus = true;\n\t\t\tif(err) {\n\t\t\t\treturn callback(err);\n\t\t\t}\n\t\t\t// Decode the status JSON\n\t\t\tvar json = null,\n\t\t\t\tisLoggedIn = false;\n\t\t\ttry {\n\t\t\t\tjson = JSON.parse(data);\n\t\t\t} catch (e) {\n\t\t\t}\n\t\t\tif(json) {\n\t\t\t\tself.logger.log(\"Status:\",data);\n\t\t\t\t// Record the recipe\n\t\t\t\tif(json.space) {\n\t\t\t\t\tself.recipe = json.space.recipe;\n\t\t\t\t}\n\t\t\t\t// Check if we're logged in\n\t\t\t\tisLoggedIn = json.username !== \"GUEST\";\n\t\t\t}\n\t\t\t// Invoke the callback if present\n\t\t\tif(callback) {\n\t\t\t\tcallback(null,isLoggedIn,json.username);\n\t\t\t}\n\t\t}\n\t});\n};\n\n/*\nAttempt to login and invoke the callback(err)\n*/\nTiddlyWebAdaptor.prototype.login = function(username,password,callback) {\n\tvar options = {\n\t\turl: this.host + \"challenge/tiddlywebplugins.tiddlyspace.cookie_form\",\n\t\ttype: \"POST\",\n\t\tdata: {\n\t\t\tuser: username,\n\t\t\tpassword: password,\n\t\t\ttiddlyweb_redirect: \"/status\" // workaround to marginalize automatic subsequent GET\n\t\t},\n\t\tcallback: function(err) {\n\t\t\tcallback(err);\n\t\t}\n\t};\n\tthis.logger.log(\"Logging in:\",options);\n\t$tw.utils.httpRequest(options);\n};\n\n/*\n*/\nTiddlyWebAdaptor.prototype.logout = function(callback) {\n\tvar options = {\n\t\turl: this.host + \"logout\",\n\t\ttype: \"POST\",\n\t\tdata: {\n\t\t\tcsrf_token: this.getCsrfToken(),\n\t\t\ttiddlyweb_redirect: \"/status\" // workaround to marginalize automatic subsequent GET\n\t\t},\n\t\tcallback: function(err,data) {\n\t\t\tcallback(err);\n\t\t}\n\t};\n\tthis.logger.log(\"Logging out:\",options);\n\t$tw.utils.httpRequest(options);\n};\n\n/*\nRetrieve the CSRF token from its cookie\n*/\nTiddlyWebAdaptor.prototype.getCsrfToken = function() {\n\tvar regex = /^(?:.*; )?csrf_token=([^(;|$)]*)(?:;|$)/,\n\t\tmatch = regex.exec(document.cookie),\n\t\tcsrf = null;\n\tif (match && (match.length === 2)) {\n\t\tcsrf = match[1];\n\t}\n\treturn csrf;\n};\n\n/*\nGet an array of skinny tiddler fields from the server\n*/\nTiddlyWebAdaptor.prototype.getSkinnyTiddlers = function(callback) {\n\tvar self = this;\n\t$tw.utils.httpRequest({\n\t\turl: this.host + \"recipes/\" + this.recipe + \"/tiddlers.json\",\n\t\tcallback: function(err,data) {\n\t\t\t// Check for errors\n\t\t\tif(err) {\n\t\t\t\treturn callback(err);\n\t\t\t}\n\t\t\t// Process the tiddlers to make sure the revision is a string\n\t\t\tvar tiddlers = JSON.parse(data);\n\t\t\tfor(var t=0; t<tiddlers.length; t++) {\n\t\t\t\ttiddlers[t] = self.convertTiddlerFromTiddlyWebFormat(tiddlers[t]);\n\t\t\t}\n\t\t\t// Invoke the callback with the skinny tiddlers\n\t\t\tcallback(null,tiddlers);\n\t\t}\n\t});\n};\n\n/*\nSave a tiddler and invoke the callback with (err,adaptorInfo,revision)\n*/\nTiddlyWebAdaptor.prototype.saveTiddler = function(tiddler,callback) {\n\tvar self = this;\n\t$tw.utils.httpRequest({\n\t\turl: this.host + \"recipes/\" + encodeURIComponent(this.recipe) + \"/tiddlers/\" + encodeURIComponent(tiddler.fields.title),\n\t\ttype: \"PUT\",\n\t\theaders: {\n\t\t\t\"Content-type\": \"application/json\"\n\t\t},\n\t\tdata: this.convertTiddlerToTiddlyWebFormat(tiddler),\n\t\tcallback: function(err,data,request) {\n\t\t\tif(err) {\n\t\t\t\treturn callback(err);\n\t\t\t}\n\t\t\t// Save the details of the new revision of the tiddler\n\t\t\tvar etagInfo = self.parseEtag(request.getResponseHeader(\"Etag\"));\n\t\t\t// Invoke the callback\n\t\t\tcallback(null,{\n\t\t\t\tbag: etagInfo.bag\n\t\t\t}, etagInfo.revision);\n\t\t}\n\t});\n};\n\n/*\nLoad a tiddler and invoke the callback with (err,tiddlerFields)\n*/\nTiddlyWebAdaptor.prototype.loadTiddler = function(title,callback) {\n\tvar self = this;\n\t$tw.utils.httpRequest({\n\t\turl: this.host + \"recipes/\" + encodeURIComponent(this.recipe) + \"/tiddlers/\" + encodeURIComponent(title),\n\t\tcallback: function(err,data,request) {\n\t\t\tif(err) {\n\t\t\t\treturn callback(err);\n\t\t\t}\n\t\t\t// Invoke the callback\n\t\t\tcallback(null,self.convertTiddlerFromTiddlyWebFormat(JSON.parse(data)));\n\t\t}\n\t});\n};\n\n/*\nDelete a tiddler and invoke the callback with (err)\noptions include:\ntiddlerInfo: the syncer's tiddlerInfo for this tiddler\n*/\nTiddlyWebAdaptor.prototype.deleteTiddler = function(title,callback,options) {\n\tvar self = this,\n\t\tbag = options.tiddlerInfo.adaptorInfo.bag;\n\t// If we don't have a bag it means that the tiddler hasn't been seen by the server, so we don't need to delete it\n\tif(!bag) {\n\t\treturn callback(null);\n\t}\n\t// Issue HTTP request to delete the tiddler\n\t$tw.utils.httpRequest({\n\t\turl: this.host + \"bags/\" + encodeURIComponent(bag) + \"/tiddlers/\" + encodeURIComponent(title),\n\t\ttype: \"DELETE\",\n\t\tcallback: function(err,data,request) {\n\t\t\tif(err) {\n\t\t\t\treturn callback(err);\n\t\t\t}\n\t\t\t// Invoke the callback\n\t\t\tcallback(null);\n\t\t}\n\t});\n};\n\n/*\nConvert a tiddler to a field set suitable for PUTting to TiddlyWeb\n*/\nTiddlyWebAdaptor.prototype.convertTiddlerToTiddlyWebFormat = function(tiddler) {\n\tvar result = {},\n\t\tknownFields = [\n\t\t\t\"bag\", \"created\", \"creator\", \"modified\", \"modifier\", \"permissions\", \"recipe\", \"revision\", \"tags\", \"text\", \"title\", \"type\", \"uri\"\n\t\t];\n\tif(tiddler) {\n\t\t$tw.utils.each(tiddler.fields,function(fieldValue,fieldName) {\n\t\t\tvar fieldString = fieldName === \"tags\" ?\n\t\t\t\t\t\t\t\ttiddler.fields.tags :\n\t\t\t\t\t\t\t\ttiddler.getFieldString(fieldName); // Tags must be passed as an array, not a string\n\n\t\t\tif(knownFields.indexOf(fieldName) !== -1) {\n\t\t\t\t// If it's a known field, just copy it across\n\t\t\t\tresult[fieldName] = fieldString;\n\t\t\t} else {\n\t\t\t\t// If it's unknown, put it in the \"fields\" field\n\t\t\t\tresult.fields = result.fields || {};\n\t\t\t\tresult.fields[fieldName] = fieldString;\n\t\t\t}\n\t\t});\n\t}\n\t// Default the content type\n\tresult.type = result.type || \"text/vnd.tiddlywiki\";\n\treturn JSON.stringify(result,null,$tw.config.preferences.jsonSpaces);\n};\n\n/*\nConvert a field set in TiddlyWeb format into ordinary TiddlyWiki5 format\n*/\nTiddlyWebAdaptor.prototype.convertTiddlerFromTiddlyWebFormat = function(tiddlerFields) {\n\tvar self = this,\n\t\tresult = {};\n\t// Transfer the fields, pulling down the `fields` hashmap\n\t$tw.utils.each(tiddlerFields,function(element,title,object) {\n\t\tif(title === \"fields\") {\n\t\t\t$tw.utils.each(element,function(element,subTitle,object) {\n\t\t\t\tresult[subTitle] = element;\n\t\t\t});\n\t\t} else {\n\t\t\tresult[title] = tiddlerFields[title];\n\t\t}\n\t});\n\t// Make sure the revision is expressed as a string\n\tif(typeof result.revision === \"number\") {\n\t\tresult.revision = result.revision.toString();\n\t}\n\t// Some unholy freaking of content types\n\tif(result.type === \"text/javascript\") {\n\t\tresult.type = \"application/javascript\";\n\t} else if(!result.type || result.type === \"None\") {\n\t\tresult.type = \"text/x-tiddlywiki\";\n\t}\n\treturn result;\n};\n\n/*\nSplit a TiddlyWeb Etag into its constituent parts. For example:\n\n```\n\"system-images_public/unsyncedIcon/946151:9f11c278ccde3a3149f339f4a1db80dd4369fc04\"\n```\n\nNote that the value includes the opening and closing double quotes.\n\nThe parts are:\n\n```\n<bag>/<title>/<revision>:<hash>\n```\n*/\nTiddlyWebAdaptor.prototype.parseEtag = function(etag) {\n\tvar firstSlash = etag.indexOf(\"/\"),\n\t\tlastSlash = etag.lastIndexOf(\"/\"),\n\t\tcolon = etag.lastIndexOf(\":\");\n\tif(firstSlash === -1 || lastSlash === -1 || colon === -1) {\n\t\treturn null;\n\t} else {\n\t\treturn {\n\t\t\tbag: decodeURIComponent(etag.substring(1,firstSlash)),\n\t\t\ttitle: decodeURIComponent(etag.substring(firstSlash + 1,lastSlash)),\n\t\t\trevision: etag.substring(lastSlash + 1,colon)\n\t\t};\n\t}\n};\n\nif($tw.browser && document.location.protocol.substr(0,4) === \"http\" ) {\n\texports.adaptorClass = TiddlyWebAdaptor;\n}\n\n})();\n","type":"application/javascript","module-type":"syncadaptor"}}});