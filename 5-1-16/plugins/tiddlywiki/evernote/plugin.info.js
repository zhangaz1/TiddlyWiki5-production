$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/evernote","description":"Evernote migration tools","author":"JeremyRuston","core-version":">=5.0.0","list":"readme docs","version":"5.1.16","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/evernote/docs\":{\"title\":\"$:/plugins/tiddlywiki/evernote/docs\",\"text\":\"! Introduction\\n\\n\"},\"$:/plugins/tiddlywiki/evernote/modules/enex-deserializer.js\":{\"title\":\"$:/plugins/tiddlywiki/evernote/modules/enex-deserializer.js\",\"text\":\"/*\\\\\\ntitle: $:/plugins/tiddlywiki/evernote/modules/enex-deserializer.js\\ntype: application/javascript\\nmodule-type: tiddlerdeserializer\\n\\nENEX file deserializer\\n\\nFor details see: https://blog.evernote.com/tech/2013/08/08/evernote-export-format-enex/\\n\\n\\\\*/\\n(function(){\\n\\n/*jslint node: true, browser: true */\\n/*global $tw: false */\\n\\\"use strict\\\";\\n\\n// DOMParser = require(\\\"$:/plugins/tiddlywiki/xmldom/dom-parser\\\").DOMParser;\\n\\n/*\\nParse an ENEX file into tiddlers\\n*/\\nexports[\\\"application/enex+xml\\\"] = function(text,fields) {\\n\\t// Collect output tiddlers in an array\\n\\tvar results = [];\\n\\t// Parse the XML document\\n\\tvar parser = new DOMParser(),\\n\\t\\tdoc = parser.parseFromString(text,\\\"application/xml\\\");\\n\\t// Output a report tiddler with information about the import\\n\\tvar enex = doc.querySelector(\\\"en-export\\\");\\n\\tresults.push({\\n\\t\\ttitle: \\\"Evernote Import Report\\\",\\n\\t\\ttext: \\\"Evernote file imported on \\\" + enex.getAttribute(\\\"export-date\\\") + \\\" from \\\" + enex.getAttribute(\\\"application\\\") + \\\" (\\\" + enex.getAttribute(\\\"version\\\") + \\\")\\\"\\n\\t})\\n\\t// Get all the \\\"note\\\" nodes\\n\\tvar noteNodes = doc.querySelectorAll(\\\"note\\\");\\n\\t$tw.utils.each(noteNodes,function(noteNode) {\\n\\t\\tvar result = {\\n\\t\\t\\ttitle: getTextContent(noteNode,\\\"title\\\"),\\n\\t\\t\\ttype: \\\"text/html\\\",\\n\\t\\t\\ttags: [],\\n\\t\\t\\ttext: getTextContent(noteNode,\\\"content\\\"),\\n\\t\\t\\tmodified: convertDate(getTextContent(noteNode,\\\"created\\\")),\\n\\t\\t\\tcreated:  convertDate(getTextContent(noteNode,\\\"created\\\"))\\n\\n\\t\\t};\\n\\t\\t$tw.utils.each(noteNode.querySelectorAll(\\\"tag\\\"),function(tagNode) {\\n\\t\\t\\tresult.tags.push(tagNode.textContent);\\n\\t\\t});\\n\\t\\t// If there's an update date, set modifiy date accordingly\\n\\t\\tvar update = getTextContent(noteNode,\\\"updated\\\");\\n\\t\\tif(update) {\\n\\t\\t\\tresult.modified = convertDate(update);\\n\\t\\t}\\n\\t\\t$tw.utils.each(noteNode.querySelectorAll(\\\"note-attributes>*\\\"),function(attrNode) {\\n\\t\\t\\tresult[attrNode.tagName] = attrNode.textContent;\\n\\t\\t});\\n\\t\\tresults.push(result);\\n\\t\\t$tw.utils.each(noteNode.querySelectorAll(\\\"resource\\\"),function(resourceNode) {\\n\\t\\t\\tresults.push({\\n\\t\\t\\t\\ttitle: getTextContent(resourceNode,\\\"resource-attributes>file-name\\\"),\\n\\t\\t\\t\\ttype: getTextContent(resourceNode,\\\"mime\\\"),\\n\\t\\t\\t\\twidth: getTextContent(resourceNode,\\\"width\\\"),\\n\\t\\t\\t\\theight: getTextContent(resourceNode,\\\"height\\\"),\\n\\t\\t\\t\\ttext: getTextContent(resourceNode,\\\"data\\\")\\n\\t\\t\\t});\\n\\t\\t});\\n\\t});\\n\\t// Return the output tiddlers\\n\\treturn results;\\n};\\n\\nfunction getTextContent(node,selector) {\\n\\treturn (node.querySelector(selector) || {}).textContent;\\n}\\n\\nfunction convertDate(isoDate) {\\n\\treturn (isoDate || \\\"\\\").replace(\\\"T\\\",\\\"\\\").replace(\\\"Z\\\",\\\"\\\") + \\\"000\\\"\\n}\\n\\n})();\\n\",\"type\":\"application/javascript\",\"module-type\":\"tiddlerdeserializer\"},\"$:/plugins/tiddlywiki/evernote/readme\":{\"title\":\"$:/plugins/tiddlywiki/evernote/readme\",\"text\":\"This plugin contains tool to assist migration of content from Evernote ENEX files.\\n\\n!! Instructions\\n\\n# Download or save your ENEX file from Evernote\\n# Rename the file to have an `.enex` extension\\n# Drag the file into the TiddlyWiki browser window\\n## Alternatively, click the \\\"Import\\\" button in the \\\"Tools\\\" sidebar tab\\n# Review and accept the converted tiddlers\\n\"}}}"});