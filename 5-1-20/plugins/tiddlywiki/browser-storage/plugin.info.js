$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/browser-storage","description":"Browser-based local storage","author":"Jeremy Ruston ","core-version":">=5.0.0","list":"readme settings","version":"5.1.20","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/config/BrowserStorage/SaveFilter\":{\"title\":\"$:/config/BrowserStorage/SaveFilter\",\"text\":\"[prefix[$:/state/]]\"},\"$:/plugins/tiddlywiki/browser-storage/icon\":{\"title\":\"$:/plugins/tiddlywiki/browser-storage/icon\",\"tags\":\"$:/tags/Image\",\"text\":\"<svg class=\\\"tc-image-down-arrow tc-image-button\\\" viewBox=\\\"0 0 128 128\\\" width=\\\"22pt\\\" height=\\\"22pt\\\">\\n    <g stroke=\\\"none\\\" stroke-width=\\\"1\\\" fill-rule=\\\"evenodd\\\">\\n        <ellipse id=\\\"Oval\\\" cx=\\\"64\\\" cy=\\\"16\\\" rx=\\\"40\\\" ry=\\\"16\\\"></ellipse>\\n        <path d=\\\"M24,96 C24,104.836556 41.90861,112 64,112 C86.09139,112 104,104.836556 104,96 L104,112 C104,120.836556 86.09139,128 64,128 C41.90861,128 24,120.836556 24,112 L24,96 Z\\\" id=\\\"Combined-Shape\\\"></path>\\n        <path d=\\\"M24,72 C24,80.836556 41.90861,88 64,88 C86.09139,88 104,80.836556 104,72 L104,88 C104,96.836556 86.09139,104 64,104 C41.90861,104 24,96.836556 24,88 L24,72 Z\\\" id=\\\"Combined-Shape-Copy-16\\\"></path>\\n        <path d=\\\"M24,48 C24,56.836556 41.90861,64 64,64 C86.09139,64 104,56.836556 104,48 L104,64 C104,72.836556 86.09139,80 64,80 C41.90861,80 24,72.836556 24,64 L24,48 Z\\\" id=\\\"Combined-Shape-Copy-17\\\"></path>\\n        <path d=\\\"M24,24 C24,32.836556 41.90861,40 64,40 C86.09139,40 104,32.836556 104,24 L104,40 C104,48.836556 86.09139,56 64,56 C41.90861,56 24,48.836556 24,40 L24,24 Z\\\" id=\\\"Combined-Shape-Copy-18\\\"></path>\\n    </g>\\n</svg>\"},\"$:/plugins/tiddlywiki/browser-storage/rawmarkup.js\":{\"title\":\"$:/plugins/tiddlywiki/browser-storage/rawmarkup.js\",\"text\":\"/*\\\\\\ntitle: $:/plugins/tiddlywiki/browser-storage/rawmarkup.js\\ntype: application/javascript\\nmodule-type: library\\n\\nStartup code injected as raw markup\\n\\n\\\\*/\\n\\n(function() {\\n\\n// Need to initialise these because we run before bootprefix.js and boot.js\\n$tw = window.$tw || Object.create(null);\\n$tw.hooks = $tw.hooks || { names: {}};\\n$tw.boot = $tw.boot || {};\\n$tw.boot.preloadDirty = $tw.boot.preloadDirty || [];\\n\\n// Hook the point in the startup process when the tiddlers have been loaded but plugins not unpacked\\nvar hookName = \\\"th-boot-tiddlers-loaded\\\";\\nif(Object.prototype.hasOwnProperty.call($tw.hooks.names,hookName)) {\\n\\t$tw.hooks.names[hookName].push(hookBootTiddlersLoaded);\\n} else {\\n\\t$tw.hooks.names[hookName] = [hookBootTiddlersLoaded];\\n}\\n\\n// Load tiddlers from browser storage\\nfunction hookBootTiddlersLoaded() {\\n\\tvar url = window.location.pathname,\\n\\t\\tlog = [];\\n\\t// Check that browser storage is available\\n\\ttry {\\n\\t\\twindow.localStorage;\\n\\t} catch(e) {\\n\\t\\treturn;\\n\\t}\\n\\t// Step through each browsder storage item\\n\\tfor(var index=0; index<window.localStorage.length; index++) {\\n\\t\\tvar key = window.localStorage.key(index),\\n\\t\\t\\tparts = key.split(\\\"#\\\");\\n\\t\\t// If it's ours\\n\\t\\tif(parts[0] === \\\"tw5\\\" && parts[1] === url) {\\n\\t\\t\\t// Read it as JSON\\n\\t\\t\\tvar jsonString = window.localStorage.getItem(key),\\n\\t\\t\\t\\tjsonData;\\n\\t\\t\\tif(jsonString) {\\n\\t\\t\\t\\ttry {\\n\\t\\t\\t\\t\\tjsonData = JSON.parse(jsonString);\\n\\t\\t\\t\\t} catch(e) {}\\n\\t\\t\\t\\tif(jsonData) {\\n\\t\\t\\t\\t\\t// Convert it to a tiddler\\n\\t\\t\\t\\t\\tvar incomingTiddler = new $tw.Tiddler(jsonData);\\n\\t\\t\\t\\t\\tif(incomingTiddler) {\\n\\t\\t\\t\\t\\t\\t// Get any existing tiddler\\n\\t\\t\\t\\t\\t\\tvar title = incomingTiddler.fields.title,\\n\\t\\t\\t\\t\\t\\t\\texistingTiddler = $tw.wiki.getTiddler(title);\\n\\t\\t\\t\\t\\t\\tif(existingTiddler && existingTiddler.isEqual(incomingTiddler)) {\\n\\t\\t\\t\\t\\t\\t\\t// If the incoming tiddler is the same as the existing then we can delete the local storage version\\n\\t\\t\\t\\t\\t\\t\\twindow.localStorage.removeItem(key);\\n\\t\\t\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\t\\t\\t$tw.wiki.addTiddler(incomingTiddler);\\n\\t\\t\\t\\t\\t\\t\\tlog.push(title);\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n\\t// Make sure that all the tiddlers we've loaded are marked as dirty at startup\\n\\tArray.prototype.push.apply($tw.boot.preloadDirty,log);\\n\\t// Save the log\\n\\t$tw.wiki.addTiddler({\\n\\t\\ttitle: \\\"$:/temp/BrowserStorage/Log\\\",\\n\\t\\ttext: $tw.utils.stringifyList(log)\\n\\t});\\n}\\n\\n})();\\n\",\"type\":\"application/javascript\",\"module-type\":\"library\"},\"$:/plugins/tiddlywiki/browser-storage/rawmarkup\":{\"title\":\"$:/plugins/tiddlywiki/browser-storage/rawmarkup\",\"tags\":\"$:/tags/RawMarkupWikified\",\"text\":\"`<script>`\\n{{$:/plugins/tiddlywiki/browser-storage/rawmarkup.js}}\\n`</script>`\\n\"},\"$:/plugins/tiddlywiki/browser-storage/readme\":{\"title\":\"$:/plugins/tiddlywiki/browser-storage/readme\",\"text\":\"This plugin enables TiddlyWiki to save tiddlers in [[browser local storage|https://en.wikipedia.org/wiki/Web_storage#localStorage]]. This means that changes are stored within the browser, and automatically re-applied any time the base wiki is reloaded.\\n\\nAt startup, the plugin reads tiddlers from local storage. Any tiddlers that are identical to those built into the file are deleted from local storage. Once the wiki is up and running, any tiddler changes are written straight to local storage.\\n\\nBrowser local storage is not a panacea for TiddlyWiki:\\n\\n* Browsers limit the amount of local storage available to a page, typically to 5 or 10MB\\n* Keeping personal data in browser local storage can lead to unexpected privacy violations\\n* Browsers reserve the right to without warning delete data stored in local storage at any time\\n* Browsers tie local storage to a URL which can lead to problems if you move a wiki to a URL previously occupied by a different wiki\\n\\nPlease use this plugin with caution. There are a number of unresolved issues and open questions:\\n\\n* Innerwikis read the local storage of their parent wikis\\n* This plugin does not interfere with the existing saver mechanism, so you'll still get warnings when refreshing the page, even if your changes are safely committed to local storage\\n* Deleted tiddlers will be restored when the wiki is refreshed\\n* There is a possibility that tiddlers might be transferred between different wikis if they are accessed via the same URL. This is particularly likely when running in local client server configuration under Node.js\\n\"},\"$:/plugins/tiddlywiki/browser-storage/settings\":{\"title\":\"$:/plugins/tiddlywiki/browser-storage/settings\",\"text\":\"! Disable\\n\\nYou can disable the browser storage plugin:\\n\\n<$checkbox tiddler=\\\"$:/config/BrowserStorage/Enabled\\\" field=\\\"text\\\" checked=\\\"yes\\\" unchecked=\\\"no\\\" default=\\\"yes\\\"> Use browser local storage</$checkbox>\\n\\n! Clear\\n\\nClick this button to clear browser storage and disable its use:\\n\\n<$button message=\\\"tm-clear-browser-storage\\\">Clear browser storage</$button>\\n\\n! Save Filter\\n\\nThis filter determines which tiddlers will be saved to local storage. By default, it contains `[prefix[$:/state/]]` to just save state tiddlers, thus preserving selected tabs, and the open/closed status of table of contents entries. Other useful values include `[all[]]` meaning that it will attempt to save all tiddlers.\\n\\n<$link to=\\\"$:/config/BrowserStorage/SaveFilter\\\">Browser Storage Save Filter</$link>: <$edit-text tiddler=\\\"$:/config/BrowserStorage/SaveFilter\\\" default=\\\"\\\" tag=\\\"input\\\" size=\\\"50\\\"/>\\n\\n! Custom Quota Exceeded Alert\\n\\nThis setting allows a custom alert message to be displayed when an attempt to store a tiddler fails due to the storage quota being exceeded:\\n\\n<$link to=\\\"$:/config/BrowserStorage/QuotaExceededAlert\\\">Quota Exceeded Alert</$link>: <$edit-text tiddler=\\\"$:/config/BrowserStorage/QuotaExceededAlert\\\" default=\\\"\\\" tag=\\\"input\\\" size=\\\"50\\\"/>\\n\\n! Startup Log\\n\\nThe tiddler $:/temp/BrowserStorage/Log contains a log of the tiddlers that were loaded from local storage at startup:\\n\\n<<list-links \\\"[enlist{$:/temp/BrowserStorage/Log}sort[]]\\\">>\\n\"},\"$:/plugins/tiddlywiki/browser-storage/startup.js\":{\"title\":\"$:/plugins/tiddlywiki/browser-storage/startup.js\",\"text\":\"/*\\\\\\ntitle: $:/plugins/tiddlywiki/browser-storage/startup.js\\ntype: application/javascript\\nmodule-type: startup\\n\\nStartup initialisation\\n\\n\\\\*/\\n(function(){\\n\\n/*jslint node: true, browser: true */\\n/*global $tw: false */\\n\\\"use strict\\\";\\n\\n// Export name and synchronous status\\nexports.name = \\\"browser-storage\\\";\\nexports.platforms = [\\\"browser\\\"];\\nexports.after = [\\\"load-modules\\\"];\\nexports.synchronous = true;\\n\\nvar ENABLED_TITLE = \\\"$:/config/BrowserStorage/Enabled\\\",\\n\\tSAVE_FILTER_TITLE = \\\"$:/config/BrowserStorage/SaveFilter\\\",\\n\\tQUOTA_EXCEEDED_ALERT_TITLE = \\\"$:/config/BrowserStorage/QuotaExceededAlert\\\",\\n\\tDEFAULT_QUOTA_EXCEEDED_ALERT_PREFIX = \\\"Quota exceeded attempting to store `\\\",\\n\\tDEFAULT_QUOTA_EXCEEDED_ALERT_SUFFIX = \\\"` in browser local storage\\\";\\n\\nexports.startup = function() {\\n\\tvar self = this;\\n\\t// Compute our prefix for local storage keys\\n\\tvar prefix = \\\"tw5#\\\" + window.location.pathname + \\\"#\\\";\\n\\t// Make a logger\\n\\tvar logger = new $tw.utils.Logger(\\\"browser-storage\\\",{\\n\\t\\t\\tcolour: \\\"cyan\\\"\\n\\t\\t});\\n\\t// Function to compile the filter\\n\\tvar filterFn,\\n\\t\\tcompileFilter = function() {\\n\\t\\t\\tfilterFn = $tw.wiki.compileFilter($tw.wiki.getTiddlerText(SAVE_FILTER_TITLE));\\n\\t}\\n\\tcompileFilter();\\n\\t// Listen for tm-clear-browser-storage messages\\n\\t$tw.rootWidget.addEventListener(\\\"tm-clear-browser-storage\\\",function(event) {\\n\\t\\t$tw.wiki.addTiddler({title: ENABLED_TITLE, text: \\\"no\\\"});\\n\\t\\tclearLocalStorage();\\n\\t});\\n\\t// Track tiddler changes\\n\\t$tw.wiki.addEventListener(\\\"change\\\",function(changes) {\\n\\t\\t// Bail if browser storage is disabled\\n\\t\\tif($tw.wiki.getTiddlerText(ENABLED_TITLE) === \\\"no\\\") {\\n\\t\\t\\treturn;\\n\\t\\t}\\n\\t\\t// Recompile the filter if it has changed\\n\\t\\tif(changes[SAVE_FILTER_TITLE]) {\\n\\t\\t\\tcompileFilter();\\n\\t\\t}\\n\\t\\t// Filter the changes\\n\\t\\tvar filteredChanges = filterFn.call($tw.wiki,function(iterator) {\\n\\t\\t\\t$tw.utils.each(changes,function(change,title) {\\n\\t\\t\\t\\tvar tiddler = $tw.wiki.getTiddler(title);\\n\\t\\t\\t\\titerator(tiddler,title);\\n\\t\\t\\t});\\n\\t\\t});\\n\\t\\t$tw.utils.each(filteredChanges,function(title) {\\n\\t\\t\\t// Don't try to save changes to our enabled status\\n\\t\\t\\t// (If it were enabled in the file but disabled in local storage then we might not realise that distributing a copy of the file would have local storage enabled for other users)\\n\\t\\t\\tif(title === ENABLED_TITLE) {\\n\\t\\t\\t\\treturn;\\n\\t\\t\\t}\\n\\t\\t\\t// Save the tiddler\\n\\t\\t\\tsaveTiddlerToLocalStorage(title,{\\n\\t\\t\\t\\tlogger: logger,\\n\\t\\t\\t\\tprefix: prefix\\n\\t\\t\\t});\\n\\t\\t});\\n\\t});\\n};\\n\\nfunction saveTiddlerToLocalStorage(title,options) {\\n\\toptions = options || {};\\n\\t// Get the tiddler\\n\\tvar tiddler = $tw.wiki.getTiddler(title);\\n\\tif(tiddler) {\\n\\t\\tconsole.log(\\\"browser-storage: Saving\\\",title);\\n\\t\\t// Get the JSON of the tiddler\\t\\t\\t\\t\\n\\t\\tvar json = JSON.stringify(tiddler.getFieldStrings());\\n\\t\\t// Try to save it to local storage\\n\\t\\ttry {\\n\\t\\t\\twindow.localStorage.setItem(options.prefix + title,json);\\n\\t\\t} catch(e) {\\n\\t\\t\\tif(e.name === \\\"QuotaExceededError\\\") {\\n\\t\\t\\t\\t// Complain if we failed\\n\\t\\t\\t\\tvar msg = $tw.wiki.getTiddlerText(QUOTA_EXCEEDED_ALERT_TITLE,DEFAULT_QUOTA_EXCEEDED_ALERT_PREFIX + title + DEFAULT_QUOTA_EXCEEDED_ALERT_SUFFIX);\\n\\t\\t\\t\\tif(options.logger) {\\n\\t\\t\\t\\t\\toptions.logger.alert(msg);\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\t// No point in keeping old values around for this tiddler\\n\\t\\t\\t\\twindow.localStorage.removeItem(options.prefix + title);\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tconsole.log(\\\"Browser-storage error:\\\",e);\\n\\t\\t\\t}\\n\\t\\t}\\n\\t} else {\\n\\t\\tconsole.log(\\\"browser-storage: Deleting\\\",title);\\n\\t\\ttry {\\n\\t\\t\\twindow.localStorage.removeItem(options.prefix + title);\\n\\t\\t} catch(e) {\\n\\t\\t\\tconsole.log(\\\"Browser-storage error:\\\",e);\\n\\t\\t}\\n\\t}\\n}\\n\\nfunction clearLocalStorage() {\\n\\tvar url = window.location.pathname,\\n\\t\\tlog = [];\\n\\t// Step through each browsder storage item\\n\\tfor(var index=window.localStorage.length - 1; index>=0; index--) {\\n\\t\\tvar key = window.localStorage.key(index),\\n\\t\\t\\tparts = key.split(\\\"#\\\");\\n\\t\\t// Delete it if it's ours\\n\\t\\tif(parts[0] === \\\"tw5\\\" && parts[1] === url) {\\n\\t\\t\\twindow.localStorage.removeItem(key);\\n\\t\\t}\\n\\t}\\n}\\n\\n})();\\n\",\"type\":\"application/javascript\",\"module-type\":\"startup\"}}}"});