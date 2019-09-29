$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/github-fork-ribbon","description":"Corner ribbon","author":"Simon Whitaker, adapted for TiddlyWiki by JeremyRuston","list":"readme usage","version":"5.1.16","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/github-fork-ribbon/readme\":{\"title\":\"$:/plugins/tiddlywiki/github-fork-ribbon/readme\",\"text\":\"This plugin provides a diagonal ribbon across the corner of the window. It resembles the design used by ~GitHub for their \\\"Fork me on ~GitHub\\\" ribbons.\\n\\nThe ribbon can be positioned over any corner, and can incorporate user defined text, colours and a link.\\n\\nThe CSS stylesheet is adapted from work by Simon Whitaker:\\n\\nhttps://github.com/simonwhitaker/github-fork-ribbon-css/\\n\\n[[Source code|https://github.com/Jermolene/TiddlyWiki5/blob/master/plugins/tiddlywiki/github-fork-ribbon]]\\n\"},\"$:/plugins/tiddlywiki/github-fork-ribbon/styles\":{\"title\":\"$:/plugins/tiddlywiki/github-fork-ribbon/styles\",\"tags\":\"[[$:/tags/Stylesheet]]\",\"text\":\"/* Left will inherit from right (so we don't need to duplicate code */\\n.github-fork-ribbon {\\n  /* The right and left lasses determine the side we attach our banner to */\\n  position: absolute;\\n\\n  /* Add a bit of padding to give some substance outside the \\\"stitching\\\" */\\n  padding: 2px 0;\\n\\n  /* Set the base colour */\\n  background-color: #a00;\\n\\n  /* Set a gradient: transparent black at the top to almost-transparent black at the bottom */\\n  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.00)), to(rgba(0, 0, 0, 0.15)));\\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.00), rgba(0, 0, 0, 0.15));\\n  background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 0.00), rgba(0, 0, 0, 0.15));\\n  background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0.00), rgba(0, 0, 0, 0.15));\\n  background-image: -ms-linear-gradient(top, rgba(0, 0, 0, 0.00), rgba(0, 0, 0, 0.15));\\n  background-image: linear-gradient(top, rgba(0, 0, 0, 0.00), rgba(0, 0, 0, 0.15));\\n  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,StartColorStr='#000000', EndColorStr='#000000');\\n\\n  /* Add a drop shadow */\\n  -webkit-box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);\\n  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);\\n\\n  z-index: 999;\\n  pointer-events: auto;\\n}\\n\\n.github-fork-ribbon a, .github-fork-ribbon a.tc-tiddlylink,\\n.github-fork-ribbon a:hover, .github-fork-ribbon a.tc-tiddlylink:hover  {\\n  /* Set the font */\\n  font-family: \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif;\\n  font-size: 13px;\\n  font-weight: 700;\\n  color: white;\\n\\n  /* Set the text properties */\\n  text-decoration: none;\\n  text-shadow: 0 -1px rgba(0,0,0,0.5);\\n  text-align: center;\\n\\n  /* Set the geometry. If you fiddle with these you'll also need to tweak the top and right values in #github-fork-ribbon. */\\n  width: 200px;\\n  line-height: 20px;\\n\\n  /* Set the layout properties */\\n  display: inline-block;\\n  padding: 2px 0;\\n\\n  /* Add \\\"stitching\\\" effect */\\n  border-width: 1px 0;\\n  border-style: dotted;\\n  border-color: rgba(255,255,255,0.7);\\n}\\n\\n.github-fork-ribbon-wrapper {\\n  width: 150px;\\n  height: 150px;\\n  position: absolute;\\n  overflow: hidden;\\n  top: 0;\\n  z-index: 999;\\n  pointer-events: none;\\n}\\n\\n.github-fork-ribbon-wrapper.fixed {\\n  position: fixed;\\n}\\n\\n.github-fork-ribbon-wrapper.left {\\n  left: 0;\\n}\\n\\n.github-fork-ribbon-wrapper.right {\\n  right: 0;\\n}\\n\\n.github-fork-ribbon-wrapper.left-bottom {\\n  position: fixed;\\n  top: inherit;\\n  bottom: 0;\\n  left: 0;\\n}\\n\\n.github-fork-ribbon-wrapper.right-bottom {\\n  position: fixed;\\n  top: inherit;\\n  bottom: 0;\\n  right: 0;\\n}\\n\\n.github-fork-ribbon-wrapper.right .github-fork-ribbon {\\n  top: 42px;\\n  right: -43px;\\n\\n  /* Rotate the banner 45 degrees */\\n  -webkit-transform: rotate(45deg);\\n  -moz-transform: rotate(45deg);\\n  -o-transform: rotate(45deg);\\n  transform: rotate(45deg);\\n}\\n\\n.github-fork-ribbon-wrapper.left .github-fork-ribbon {\\n  top: 42px;\\n  left: -43px;\\n\\n  /* Rotate the banner -45 degrees */\\n  -webkit-transform: rotate(-45deg);\\n  -moz-transform: rotate(-45deg);\\n  -o-transform: rotate(-45deg);\\n  transform: rotate(-45deg);\\n}\\n\\n\\n.github-fork-ribbon-wrapper.left-bottom .github-fork-ribbon {\\n  top: 80px;\\n  left: -43px;\\n\\n  /* Rotate the banner -45 degrees */\\n  -webkit-transform: rotate(45deg);\\n  -moz-transform: rotate(45deg);\\n  -o-transform: rotate(45deg);\\n  transform: rotate(45deg);\\n}\\n\\n.github-fork-ribbon-wrapper.right-bottom .github-fork-ribbon {\\n  top: 80px;\\n  right: -43px;\\n\\n  /* Rotate the banner -45 degrees */\\n  -webkit-transform: rotate(-45deg);\\n  -moz-transform: rotate(-45deg);\\n  -o-transform: rotate(-45deg);\\n  transform: rotate(-45deg);\\n}\\n\"},\"$:/plugins/tiddlywiki/github-fork-ribbon/usage\":{\"title\":\"$:/plugins/tiddlywiki/github-fork-ribbon/usage\",\"text\":\"```\\n<!-- TOP RIGHT RIBBON: START COPYING HERE -->\\n<div class=\\\"github-fork-ribbon-wrapper right\\\"><div class=\\\"github-fork-ribbon\\\"><a href=\\\"https://github.com/simonwhitaker/github-fork-ribbon-css\\\">Fork me on ~GitHub</a></div>\\n</div>\\n<!-- TOP RIGHT RIBBON: END COPYING HERE -->\\n\\n<!-- TOP LEFT RIBBON: START COPYING HERE -->\\n<div class=\\\"github-fork-ribbon-wrapper left\\\"><div class=\\\"github-fork-ribbon\\\"><a href=\\\"https://github.com/simonwhitaker/github-fork-ribbon-css\\\">Fork me on ~GitHub</a></div>\\n</div>\\n<!-- TOP LEFT RIBBON: END COPYING HERE -->\\n\\n\\n<!-- BOTTOM RIGHT RIBBON: START COPYING HERE -->\\n<div class=\\\"github-fork-ribbon-wrapper right-bottom\\\"><div class=\\\"github-fork-ribbon\\\"><a href=\\\"https://github.com/simonwhitaker/github-fork-ribbon-css\\\">Fork me on ~GitHub</a></div>\\n</div>\\n<!-- BOTTOM RIGHT RIBBON: END COPYING HERE -->\\n\\n<!-- BOTTOM LEFT RIBBON: START COPYING HERE -->\\n<div class=\\\"github-fork-ribbon-wrapper left-bottom\\\"><div class=\\\"github-fork-ribbon\\\"><a href=\\\"https://github.com/simonwhitaker/github-fork-ribbon-css\\\">Fork me on ~GitHub</a></div>\\n</div>\\n<!-- BOTTOM LEFT RIBBON: END COPYING HERE -->\\n```\\n\"}}}"});