$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/external-attachments","description":"External attachment support for TiddlyDesktop et al.","author":"Jeremy Ruston","core-version":">=5.0.0","list":"readme settings","version":"5.1.21","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/config/ExternalAttachments/Enable\":{\"title\":\"$:/config/ExternalAttachments/Enable\",\"text\":\"yes\"},\"$:/config/ExternalAttachments/UseAbsoluteForDescendents\":{\"title\":\"$:/config/ExternalAttachments/UseAbsoluteForDescendents\",\"text\":\"no\"},\"$:/config/ExternalAttachments/UseAbsoluteForNonDescendents\":{\"title\":\"$:/config/ExternalAttachments/UseAbsoluteForNonDescendents\",\"text\":\"no\"},\"$:/plugins/tiddlywiki/external-attachments/readme\":{\"title\":\"$:/plugins/tiddlywiki/external-attachments/readme\",\"text\":\"! Introduction\\n\\nThis plugin provides support for importing tiddlers as external attachments. That means that instead of importing binary files as self-contained tiddlers, they are imported as \\\"skinny\\\" tiddlers that reference the original file via the ''_canonical_uri'' field. This reduces the size of the wiki and thus improves performance. However, it does mean that the wiki is no longer fully self-contained.\\n\\n! Compatibility\\n\\nThis plugin only works when using TiddlyWiki with platforms such as TiddlyDesktop that support the ''path'' attribute for imported/dragged files.\\n\\n\"},\"$:/plugins/tiddlywiki/external-attachments/settings\":{\"title\":\"$:/plugins/tiddlywiki/external-attachments/settings\",\"text\":\"When used on platforms that provide the necessary support (such as ~TiddlyDesktop), you can optionally import binary files as external tiddlers that reference the original file via the ''_canonical_uri'' field.\\n\\nBy default, a relative path is used to reference the file. Optionally, you can specify that an absolute path is used instead. You can do this separately for \\\"descendent\\\" attachments -- files that are contained within the directory containing the wiki -- vs. \\\"non-descendent\\\" attachments.\\n\\n<$checkbox tiddler=\\\"$:/config/ExternalAttachments/Enable\\\" field=\\\"text\\\" checked=\\\"yes\\\" unchecked=\\\"no\\\" default=\\\"no\\\"> <$link to=\\\"$:/config/ExternalAttachments/Enable\\\">Enable importing binary files as external attachments</$link> </$checkbox>\\n\\n<$checkbox tiddler=\\\"$:/config/ExternalAttachments/UseAbsoluteForDescendents\\\" field=\\\"text\\\" checked=\\\"yes\\\" unchecked=\\\"no\\\" default=\\\"no\\\"> <$link to=\\\"$:/config/ExternalAttachments/UseAbsoluteForDescendents\\\">Use absolute paths for descendent attachments</$link> </$checkbox>\\n\\n<$checkbox tiddler=\\\"$:/config/ExternalAttachments/UseAbsoluteForNonDescendents\\\" field=\\\"text\\\" checked=\\\"yes\\\" unchecked=\\\"no\\\" default=\\\"no\\\"> <$link to=\\\"$:/config/ExternalAttachments/UseAbsoluteForNonDescendents\\\">Use absolute paths for non-descendent attachments</$link> </$checkbox>\\n\"},\"$:/plugins/tiddlywiki/external-attachments/startup.js\":{\"title\":\"$:/plugins/tiddlywiki/external-attachments/startup.js\",\"text\":\"/*\\\\\\ntitle: $:/plugins/tiddlywiki/external-attachments/startup.js\\ntype: application/javascript\\nmodule-type: startup\\n\\nStartup initialisation\\n\\n\\\\*/\\n(function(){\\n\\n/*jslint node: true, browser: true */\\n/*global $tw: false */\\n\\\"use strict\\\";\\n\\nvar ENABLE_EXTERNAL_ATTACHMENTS_TITLE = \\\"$:/config/ExternalAttachments/Enable\\\",\\n\\tUSE_ABSOLUTE_FOR_DESCENDENTS_TITLE = \\\"$:/config/ExternalAttachments/UseAbsoluteForDescendents\\\",\\n\\tUSE_ABSOLUTE_FOR_NON_DESCENDENTS_TITLE = \\\"$:/config/ExternalAttachments/UseAbsoluteForNonDescendents\\\";\\n\\n// Export name and synchronous status\\nexports.name = \\\"external-attachments\\\";\\nexports.platforms = [\\\"browser\\\"];\\nexports.after = [\\\"startup\\\"];\\nexports.synchronous = true;\\n\\nexports.startup = function() {\\n\\ttest_makePathRelative();\\n\\t$tw.hooks.addHook(\\\"th-importing-file\\\",function(info) {\\n\\t\\tif(document.location.protocol === \\\"file:\\\" && info.isBinary && info.file.path && $tw.wiki.getTiddlerText(ENABLE_EXTERNAL_ATTACHMENTS_TITLE,\\\"\\\") === \\\"yes\\\") {\\nconsole.log(\\\"Wiki location\\\",document.location.pathname)\\nconsole.log(\\\"File location\\\",info.file.path)\\n\\t\\t\\tinfo.callback([\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\ttitle: info.file.name,\\n\\t\\t\\t\\t\\ttype: info.type,\\n\\t\\t\\t\\t\\t\\\"_canonical_uri\\\": makePathRelative(\\n\\t\\t\\t\\t\\t\\tinfo.file.path,\\n\\t\\t\\t\\t\\t\\tdocument.location.pathname,\\n\\t\\t\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\t\\t\\tuseAbsoluteForNonDescendents: $tw.wiki.getTiddlerText(USE_ABSOLUTE_FOR_NON_DESCENDENTS_TITLE,\\\"\\\") === \\\"yes\\\",\\n\\t\\t\\t\\t\\t\\t\\tuseAbsoluteForDescendents: $tw.wiki.getTiddlerText(USE_ABSOLUTE_FOR_DESCENDENTS_TITLE,\\\"\\\") === \\\"yes\\\"\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t)\\n\\t\\t\\t\\t}\\n\\t\\t\\t]);\\n\\t\\t\\treturn true;\\n\\t\\t} else {\\n\\t\\t\\treturn false;\\n\\t\\t}\\n\\t});\\n};\\n\\n/*\\nGiven a source absolute filepath and a root absolute path, returns the source filepath expressed as a relative filepath from the root path.\\n\\nsourcepath comes from the \\\"path\\\" property of the file object, with the following patterns:\\n\\t/path/to/file.png for Unix systems\\n\\tC:\\\\path\\\\to\\\\file.png for local files on Windows\\n\\t\\\\\\\\sharename\\\\path\\\\to\\\\file.png for network shares on Windows\\nrootpath comes from document.location.pathname with urlencode applied with the following patterns:\\n\\t/path/to/file.html for Unix systems\\n\\t/C:/path/to/file.html for local files on Windows\\n\\t/sharename/path/to/file.html for network shares on Windows\\n*/\\nfunction makePathRelative(sourcepath,rootpath,options) {\\n\\toptions = options || {};\\n\\t// First we convert the source path from OS-dependent format to generic file:// format\\n\\tif(options.isWindows || $tw.platform.isWindows) {\\n\\t\\tsourcepath = sourcepath.replace(/\\\\\\\\/g,\\\"/\\\");\\n\\t\\t// If it's a local file like C:/path/to/file.ext then add a leading slash\\n\\t\\tif(sourcepath.charAt(0) !== \\\"/\\\") {\\n\\t\\t\\tsourcepath = \\\"/\\\" + sourcepath;\\n\\t\\t}\\n\\t\\t// If it's a network share then remove one of the leading slashes\\n\\t\\tif(sourcepath.substring(0,2) === \\\"//\\\") {\\n\\t\\t\\tsourcepath = sourcepath.substring(1);\\n\\t\\t}\\n\\t}\\n\\t// Split the path into parts\\n\\tvar sourceParts = sourcepath.split(\\\"/\\\"),\\n\\t\\trootParts = rootpath.split(\\\"/\\\"),\\n\\t\\toutputParts = [];\\n\\t// urlencode the parts of the sourcepath\\n\\t$tw.utils.each(sourceParts,function(part,index) {\\n\\t\\tsourceParts[index] = encodeURI(part);\\n\\t});\\n\\t// Identify any common portion from the start\\n\\tvar c = 0,\\n\\t\\tp;\\n\\twhile(c < sourceParts.length && c < rootParts.length && sourceParts[c] === rootParts[c]) {\\n\\t\\tc += 1;\\n\\t}\\n\\t// Use an absolute path if there's no common portion, or if specifically requested\\n\\tif(c === 1 || (options.useAbsoluteForNonDescendents && c < rootParts.length) || (options.useAbsoluteForDescendents && c === rootParts.length)) {\\n\\t\\treturn sourcepath;\\n\\t}\\n\\t// Move up a directory for each directory left in the root\\n\\tfor(p = c; p < rootParts.length; p++) {\\n\\t\\toutputParts.push(\\\"..\\\");\\n\\t}\\t\\t\\n\\t// Add on the remaining parts of the source path\\n\\tfor(p = c; p < sourceParts.length; p++) {\\n\\t\\toutputParts.push(sourceParts[p]);\\n\\t}\\n\\treturn outputParts.join(\\\"/\\\");\\n}\\n\\nfunction test_makePathRelative() {\\n\\tvar test = function(sourcepath,rootpath,result,options) {\\n\\t\\tif(makePathRelative(sourcepath,rootpath,options) !== result) {\\n\\t\\t\\tthrow \\\"makePathRelative test failed: makePathRelative(\\\" + sourcepath + \\\",\\\" + rootpath + \\\",\\\" + JSON.stringify(options) + \\\") is not equal to \\\" + result;\\t\\t\\t\\n\\t\\t}\\n\\t};\\n\\ttest(\\\"/Users/me/something/file.png\\\",\\\"/Users/you/something\\\",\\\"../../me/something/file.png\\\");\\n\\ttest(\\\"/Users/me/something/file.png\\\",\\\"/Users/you/something\\\",\\\"/Users/me/something/file.png\\\",{useAbsoluteForNonDescendents: true});\\n\\ttest(\\\"/Users/me/something/else/file.png\\\",\\\"/Users/me/something\\\",\\\"else/file.png\\\");\\n\\ttest(\\\"/Users/me/something/file.png\\\",\\\"/Users/me/something/new\\\",\\\"../file.png\\\");\\n\\ttest(\\\"/Users/me/something/file.png\\\",\\\"/Users/me/something/new\\\",\\\"/Users/me/something/file.png\\\",{useAbsoluteForNonDescendents: true});\\n\\ttest(\\\"/Users/me/something/file.png\\\",\\\"/Users/me/something\\\",\\\"file.png\\\");\\n\\ttest(\\\"C:\\\\\\\\Users\\\\\\\\me\\\\\\\\something\\\\\\\\file.png\\\",\\\"/C:/Users/me/something\\\",\\\"file.png\\\",{isWindows: true});\\n\\ttest(\\\"\\\\\\\\\\\\\\\\SHARE\\\\\\\\Users\\\\\\\\me\\\\\\\\something\\\\\\\\file.png\\\",\\\"/SHARE/Users/me/somethingelse\\\",\\\"../something/file.png\\\",{isWindows: true});\\n\\ttest(\\\"\\\\\\\\\\\\\\\\SHARE\\\\\\\\Users\\\\\\\\me\\\\\\\\something\\\\\\\\file.png\\\",\\\"/C:/Users/me/something\\\",\\\"/SHARE/Users/me/something/file.png\\\",{isWindows: true});\\n}\\n\\n\\n})();\\n\",\"type\":\"application/javascript\",\"module-type\":\"startup\"}}}"});