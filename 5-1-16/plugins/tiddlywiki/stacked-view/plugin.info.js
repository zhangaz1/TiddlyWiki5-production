$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/stacked-view","description":"Stacked card storyview","author":"JeremyRuston","core-version":">=5.0.0","list":"readme","version":"5.1.16","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/stacked-view/StackedControls\":{\"title\":\"$:/plugins/tiddlywiki/stacked-view/StackedControls\",\"caption\":\"Stacked View\",\"tags\":\"$:/tags/SideBar\",\"text\":\"Set the [[fan separation|$:/config/StackedStoryViewFanHeight]]:\\n\\n* <$button set=\\\"$:/config/StackedStoryViewFanHeight\\\" setTo=\\\"-10\\\">-10</$button>\\n* <$button set=\\\"$:/config/StackedStoryViewFanHeight\\\" setTo=\\\"0\\\">0</$button>\\n* <$button set=\\\"$:/config/StackedStoryViewFanHeight\\\" setTo=\\\"10\\\">10</$button>\\n* <$button set=\\\"$:/config/StackedStoryViewFanHeight\\\" setTo=\\\"30\\\">30</$button>\\n* <$button set=\\\"$:/config/StackedStoryViewFanHeight\\\" setTo=\\\"50\\\">50</$button>\\n* <$button set=\\\"$:/config/StackedStoryViewFanHeight\\\" setTo=\\\"100\\\">100</$button>\\n* <$button set=\\\"$:/config/StackedStoryViewFanHeight\\\" setTo=\\\"150\\\">150</$button>\\n* <$button set=\\\"$:/config/StackedStoryViewFanHeight\\\" setTo=\\\"200\\\">200</$button>\\n* <$button set=\\\"$:/config/StackedStoryViewFanHeight\\\" setTo=\\\"250\\\">250</$button>\\n* <$button set=\\\"$:/config/StackedStoryViewFanHeight\\\" setTo=\\\"300\\\">300</$button>\\n* <$button set=\\\"$:/config/StackedStoryViewFanHeight\\\" setTo=\\\"500\\\">500</$button>\\n* <$button set=\\\"$:/config/StackedStoryViewFanHeight\\\" setTo=\\\"700\\\">700</$button>\\n* <$button set=\\\"$:/config/StackedStoryViewFanHeight\\\" setTo=\\\"1500\\\">1500</$button>\\n\"},\"$:/config/StackedStoryViewFanHeight\":{\"title\":\"$:/config/StackedStoryViewFanHeight\",\"text\":\"100\"},\"$:/plugins/tiddlywiki/stacked-view/readme\":{\"title\":\"$:/plugins/tiddlywiki/stacked-view/readme\",\"text\":\"This plugin provides a new story visualisation that displays individual tiddlers as a stack of cards. It is currently experimental and incomplete.\\n\\n[[Source code|https://github.com/Jermolene/TiddlyWiki5/blob/master/plugins/tiddlywiki/stacked-view]]\\n\"},\"$:/plugins/tiddlywiki/stacked-view/config-macros/stacked-storyview\":{\"title\":\"$:/plugins/tiddlywiki/stacked-view/config-macros/stacked-storyview\",\"tags\":\"$:/tags/Macro\",\"text\":\"\\\\define tv-stacked-storyview-fan-height-config-title() $:/config/StackedStoryViewFanHeight\\n\"},\"$:/plugins/tiddlywiki/stacked-view/stacked.js\":{\"title\":\"$:/plugins/tiddlywiki/stacked-view/stacked.js\",\"text\":\"/*\\\\\\ntitle: $:/plugins/tiddlywiki/stacked-view/stacked.js\\ntype: application/javascript\\nmodule-type: storyview\\n\\nKeeps tiddlers in a stack\\n\\n\\\\*/\\n(function(){\\n\\n/*jslint node: true, browser: true */\\n/*global $tw: false */\\n\\\"use strict\\\";\\n\\nvar easing = \\\"cubic-bezier(0.645, 0.045, 0.355, 1)\\\"; // From http://easings.net/#easeInOutCubic\\n\\nvar StackedListView = function(listWidget) {\\n\\tvar self = this;\\n\\tthis.listWidget = listWidget;\\n\\tthis.fanHeightConfigTitle = listWidget.getVariable(\\\"tv-stacked-storyview-fan-height-config-title\\\");\\n\\tthis.placeTiddlers();\\n};\\n\\nStackedListView.prototype.placeTiddlers = function() {\\n\\t// Initialise the stack of tiddler titles\\n\\tthis.listStack = [];\\n\\tvar numItems = this.listWidget.children.length,\\n\\t\\tt, itemWidget,\\n\\t\\tduration = $tw.utils.getAnimationDuration();\\n\\tfor(t=numItems-1; t>=0; t--) {\\n\\t\\titemWidget = this.listWidget.children[t];\\n\\t\\tthis.listStack.push(itemWidget.parseTreeNode.itemTitle);\\n\\t}\\n\\t// Ensure the tiddler at the top of the history stack is at the top of the array\\n\\tvar history = this.listWidget.wiki.getTiddlerData(this.listWidget.historyTitle,[]);\\n\\tfor(t=0; t<history.length; t++) {\\n\\t\\tvar title = history[t].title;\\n\\t\\tif(this.listStack.indexOf(title) !== -1) {\\n\\t\\t\\t$tw.utils.pushTop(this.listStack,title);\\n\\t\\t}\\n\\t}\\n\\t// Get the configured fan height\\n\\tvar fanHeight = parseInt(this.listWidget.wiki.getTiddlerText(this.fanHeightConfigTitle),10);\\n\\t// Position each tiddler\\n\\tfor(var t=numItems-1; t>=0; t--) {\\n\\t\\t// Get the DOM node for this tiddler\\n\\t\\titemWidget = this.listWidget.children[t];\\n\\t\\tvar domNode = itemWidget.findFirstDomNode();\\n\\t\\tif(domNode instanceof Element) {\\n\\t\\t\\t// Allows the width of the tiddler to be adjusted\\n\\t\\t\\t$tw.utils.addClass(domNode,\\\"tc-storyview-zoomin-tiddler\\\");\\n\\t\\t\\t// Find the position of the tiddler in the stack\\n\\t\\t\\tvar pos = this.listStack.indexOf(itemWidget.parseTreeNode.itemTitle);\\n\\t\\t\\tif(pos !== -1) {\\n\\t\\t\\t\\t// Style the tiddler to position it\\n\\t\\t\\t\\tvar posFactor = pos/(numItems-1);\\n\\t\\t\\t\\t$tw.utils.setStyle(domNode,[\\n\\t\\t\\t\\t\\t{position: \\\"absolute\\\"},\\n\\t\\t\\t\\t\\t{transformOrigin: \\\"50% 0\\\"},\\n\\t\\t\\t\\t\\t{transition: $tw.utils.roundTripPropertyName(\\\"transform\\\") + \\\" \\\" + duration * (0.5 + posFactor) + \\\"ms \\\" + easing},\\n\\t\\t\\t\\t\\t{transform: \\\"translateX(0px) translateY(\\\" + (fanHeight * posFactor * posFactor) + \\\"px) scale(\\\" + (0.1 + posFactor * 0.9) + \\\")\\\"},\\n\\t\\t\\t\\t\\t{zIndex: pos + \\\"\\\"}\\n\\t\\t\\t\\t]);\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n};\\n\\nStackedListView.prototype.refreshStart = function(changedTiddlers,changedAttributes) {\\n};\\n\\nStackedListView.prototype.refreshEnd = function(changedTiddlers,changedAttributes) {\\n\\tthis.placeTiddlers();\\n};\\n\\nStackedListView.prototype.navigateTo = function(historyInfo) {\\n};\\n\\nStackedListView.prototype.insert = function(widget) {\\n};\\n\\nStackedListView.prototype.remove = function(widget) {\\n\\twidget.removeChildDomNodes();\\n};\\n\\nexports.stacked = StackedListView;\\n\\n})();\",\"type\":\"application/javascript\",\"module-type\":\"storyview\"},\"$:/core/images/storyview-stacked\":{\"title\":\"$:/core/images/storyview-stacked\",\"tags\":\"$:/tags/Image\",\"text\":\"<svg class=\\\"tc-image-storyview-stack tc-image-button\\\" width=\\\"22pt\\\" height=\\\"22pt\\\" viewBox=\\\"0 0 128 128\\\">\\n    <g fill-rule=\\\"evenodd\\\">\\n        <path d=\\\"M8.00697327,0 C3.58484404,0 0,3.59075293 0,8.00697327 L0,119.993027 C0,124.415156 3.59075293,128 8.00697327,128 L119.993027,128 C124.415156,128 128,124.409247 128,119.993027 L128,8.00697327 C128,3.58484404 124.409247,0 119.993027,0 L8.00697327,0 L8.00697327,0 Z M32,43 L32,37.3807213 C32,34.4040057 34.3875896,32 37.3328305,32 L45.5,32 L45.5,32 L84,32 L90.6671695,32 C93.6079301,32 96,34.409031 96,37.3807213 L96,43 L32,43 Z M30,48 L23.9992458,48 C19.5813843,48 16,51.578055 16,56.0085154 L16,103.991485 C16,108.414466 19.5881049,112 23.9992458,112 L104.000754,112 C108.418616,112 112,108.421945 112,103.991485 L112,56.0085154 C112,51.5855345 108.411895,48 104.000754,48 L98.5,48 L30,48 Z M80,27 L80,23.7529272 C80,22.2325275 78.803965,21 77.3335847,21 L50.6664153,21 C49.1937948,21 48,22.2299564 48,23.7529272 L48,27 L80,27 Z\\\"></path>\\n    </g>\\n</svg>\"}}}"});