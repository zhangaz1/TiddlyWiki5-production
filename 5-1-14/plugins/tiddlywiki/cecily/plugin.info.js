$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/cecily","description":"Zoomable storyview (Cecily)","author":"JeremyRuston","core-version":">=5.0.0","list":"readme","version":"5.1.14","plugin-type":"plugin","dependents":"","type":"application/json","tiddlers":{"$:/plugins/tiddlywiki/cecily/cecily.js":{"text":"/*\\\ntitle: $:/plugins/tiddlywiki/cecily/cecily.js\ntype: application/javascript\nmodule-type: storyview\n\nPositions tiddlers on a 2D map\n\n\\*/\n(function(){\n\n/*jslint node: true, browser: true */\n/*global $tw: false */\n\"use strict\";\n\nvar CecilyStoryView = function(listWidget) {\n\tvar self = this;\n\tthis.listWidget = listWidget;\n\t// Load the map\n\tthis.loadMap();\n\t// Position the existing tiddlers\n\t$tw.utils.each(this.listWidget.children,function(itemWidget,index) {\n\t\tvar domNode = itemWidget.findFirstDomNode();\n\t\tdomNode.style.position = \"absolute\";\n\t\tvar title = itemWidget.parseTreeNode.itemTitle;\n\t\tself.positionTiddler(title,domNode);\n\t});\n};\n\nCecilyStoryView.prototype.navigateTo = function(historyInfo) {\n\tvar listElementIndex = this.listWidget.findListItem(0,historyInfo.title);\n\tif(listElementIndex === undefined) {\n\t\treturn;\n\t}\n\tvar listItemWidget = this.listWidget.children[listElementIndex],\n\t\ttargetElement = listItemWidget.findFirstDomNode();\n\t// Scroll the node into view\n\tthis.listWidget.dispatchEvent({type: \"tm-scroll\", target: targetElement});\n};\n\nCecilyStoryView.prototype.insert = function(widget) {\n\tvar domNode = widget.findFirstDomNode(),\n\t\tduration = $tw.utils.getAnimationDuration();\n\t// Make the newly inserted node position absolute\n\t$tw.utils.setStyle(domNode,[\n\t\t{position: \"absolute\"},\n\t\t{transition: \"\"},\n\t\t{opacity: \"0.0\"}\n\t]);\n\t// Position it\n\tvar title = widget.parseTreeNode.itemTitle;\n\tthis.positionTiddler(title,domNode);\n\t$tw.utils.forceLayout(domNode);\n\t// Animate it in\n\t$tw.utils.setStyle(domNode,[\n\t\t{transition: \"opacity \" + duration + \"ms ease-out\"},\n\t\t{opacity: \"1.0\"}\n\t]);\n};\n\nCecilyStoryView.prototype.remove = function(widget) {\n\tvar targetElement = widget.findFirstDomNode(),\n\t\tduration = $tw.utils.getAnimationDuration();\n\t// Remove the widget at the end of the transition\n\tsetTimeout(function() {\n\t\twidget.removeChildDomNodes();\n\t},duration);\n\t// Animate the closure\n\t$tw.utils.setStyle(targetElement,[\n\t\t{transition: \"none\"},\n\t\t{opacity: \"1.0\"}\n\t]);\n\t$tw.utils.forceLayout(targetElement);\n\t$tw.utils.setStyle(targetElement,[\n\t\t{transition: $tw.utils.roundTripPropertyName(\"transform\") + \" \" + duration + \"ms ease-in-out, \" +\n\t\t\t\t\t\"opacity \" + duration + \"ms ease-in-out\"},\n\t\t{transform: \"scale(0.01)\"},\n\t\t{opacity: \"0.0\"}\n\t]);\n};\n\n/*\nLoad the current map\n*/\nCecilyStoryView.prototype.loadMap = function() {\n\tthis.map = this.listWidget.wiki.getTiddlerData(this.getMapTiddlerTitle(),{\n\t\tpositions: {},\n\t\tnewTiddlerPosition: {x: 0, y: 0},\n\t\twidth: parseInt(this.listWidget.getAttribute(\"cecily-width\",\"600\"),10)\n\t});\n};\n\nCecilyStoryView.prototype.getMapTiddlerTitle = function() {\n\treturn this.listWidget.getAttribute(\"cecily-map\",\"$:/TiddlerMap\");\n};\n\n/*\nPosition a tiddler according to the map\n*/\nCecilyStoryView.prototype.positionTiddler = function(title,domNode) {\n\tvar pos = this.lookupTiddlerInMap(title,domNode),\n\t\tscale = pos.w/domNode.offsetWidth;\n\t$tw.utils.setStyle(domNode,[\n\t\t{width: this.map.width + \"px\"},\n\t\t{transformOrigin: \"0% 0%\"},\n\t\t{transform: \"translateX(\" + pos.x + \"px) translateY(\" + pos.y + \"px) scale(\" + scale + \") translateX(-50%) rotate(\" + (pos.r || 0) + \"deg) translateX(50%)\"}\n\t]);\n};\n\n// Get the position of a particular tiddler\nCecilyStoryView.prototype.lookupTiddlerInMap = function(title,domNode) {\n\t// If this is a draft tiddler then look for the position of the original tiddler\n\tvar tiddler = this.listWidget.wiki.getTiddler(title);\n\tif(tiddler) {\n\t\tvar draftOf = tiddler.fields[\"draft.of\"];\n\t\tif(draftOf && this.map.positions[draftOf]) {\n\t\t\treturn this.map.positions[draftOf];\n\t\t}\n\t}\n\t// Try looking the target tiddler up in the map\n\tif(this.map.positions[title]) {\n\t\treturn this.map.positions[title];\n\t}\n\t// If the tiddler wasn't in the map we'll have to compute it\n\tvar newPosition;\n\tswitch(this.map.positionNew) {\n\t\tdefault: // \"right\"\n\t\t\tnewPosition = {\n\t\t\t\tx: this.map.newTiddlerPosition.x,\n\t\t\t\ty: this.map.newTiddlerPosition.y,\n\t\t\t\tw: 200,\n\t\t\t\th: 200\n\t\t\t};\n\t\t\tthis.map.newTiddlerPosition.x += newPosition.w * 1.1;\n\t\t\tbreak;\n\t}\n\t// A default position\n\tnewPosition = newPosition || {x: 0,y: 0,w: 100,h: 100};\n\t// Save the position back to the map\n\tthis.map.positions[title] = newPosition;\n\treturn newPosition;\n};\n\nexports.cecily = CecilyStoryView;\n\n})();\n","title":"$:/plugins/tiddlywiki/cecily/cecily.js","type":"application/javascript","module-type":"storyview"},"$:/plugins/tiddlywiki/cecily/readme":{"title":"$:/plugins/tiddlywiki/cecily/readme","text":"This experimental plugin provides a new story visualisation that displays individual tiddlers as resizable tiles on an infinite canvas.\n\nCecily is based on an earlier plugin for TiddlyWiki Classic: http://jermolene.com/cecily\n\nCecily is currently in the early stages of development with little functionality yet implemented.\n\n[[Source code|https://github.com/Jermolene/TiddlyWiki5/blob/master/plugins/tiddlywiki/cecily]]\n"},"$:/core/images/storyview-cecily":{"title":"$:/core/images/storyview-cecily","tags":"$:/tags/Image","text":"<svg class=\"tc-image-storyview-cecily tc-image-button\" width=\"22pt\" height=\"22pt\" viewBox=\"0 0 128 128\">\n    <g fill-rule=\"evenodd\">\n        <path d=\"M8.00697327,0 C3.58484404,0 0,3.59075293 0,8.00697327 L0,119.993027 C0,124.415156 3.59075293,128 8.00697327,128 L119.993027,128 C124.415156,128 128,124.409247 128,119.993027 L128,8.00697327 C128,3.58484404 124.409247,0 119.993027,0 L8.00697327,0 L8.00697327,0 Z M23.9949725,16 C19.5794711,16 16,19.5776607 16,23.9924054 L16,40.0075946 C16,44.4216782 19.5905136,48 23.9949725,48 L71.0050275,48 C75.4205289,48 79,44.4223393 79,40.0075946 L79,23.9924054 C79,19.5783218 75.4094864,16 71.0050275,16 L23.9949725,16 L23.9949725,16 Z M72.0070969,64 C67.5848994,64 64,67.5881712 64,72.0070969 L64,103.992903 C64,108.415101 67.5881712,112 72.0070969,112 L103.992903,112 C108.415101,112 112,108.411829 112,103.992903 L112,72.0070969 C112,67.5848994 108.411829,64 103.992903,64 L72.0070969,64 L72.0070969,64 Z M24.0034204,80 C19.5832534,80 16,83.5776607 16,87.9924054 L16,104.007595 C16,108.421678 19.5863782,112 24.0034204,112 L38.9965796,112 C43.4167466,112 47,108.422339 47,104.007595 L47,87.9924054 C47,83.5783218 43.4136218,80 38.9965796,80 L24.0034204,80 L24.0034204,80 Z M104,16 C99.581722,16 96,19.5776607 96,23.9924054 L96,40.0075946 C96,44.4216782 99.5907123,48 104,48 C108.418278,48 112,44.4223393 112,40.0075946 L112,23.9924054 C112,19.5783218 108.409288,16 104,16 L104,16 Z\"></path>\n    </g>\n</svg>"}}});