$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/googleanalytics","description":"Google Analytics: website statistics","author":"JeremyRuston","contributor":"Sylvain Comte","core-version":">=5.0.0","list":"readme settings usage","version":"5.1.17","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/googleanalytics/googleanalytics.js\":{\"title\":\"$:/plugins/tiddlywiki/googleanalytics/googleanalytics.js\",\"text\":\"/*\\\\\\ntitle: $:/plugins/tiddlywiki/googleanalytics/googleanalytics.js\\ntype: application/javascript\\nmodule-type: startup\\n\\nRuns Google Analytics with the account number in the tiddler `$:/GoogleAnalyticsAccount` and the domain name in `$:/GoogleAnalyticsDomain`\\n\\n\\\\*/\\n(function(){\\n\\n/*jslint node: true, browser: true */\\n/*global $tw: false */\\n\\\"use strict\\\";\\n\\n// Export name and synchronous status\\nexports.name = \\\"google-analytics\\\";\\nexports.platforms = [\\\"browser\\\"];\\nexports.synchronous = true;\\n\\nexports.startup = function() {\\n\\t// getting parameters\\n\\tvar GA_ACCOUNT = $tw.wiki.getTiddlerText(\\\"$:/GoogleAnalyticsAccount\\\",\\\"\\\").replace(/\\\\n/g,\\\"\\\"),\\n\\t\\tGA_DOMAIN = $tw.wiki.getTiddlerText(\\\"$:/GoogleAnalyticsDomain\\\",\\\"\\\").replace(/\\\\n/g,\\\"\\\");\\n\\tif (GA_DOMAIN == \\\"\\\" || GA_DOMAIN == undefined) GA_DOMAIN = \\\"auto\\\";\\n\\n\\t// using ga \\\"isogram\\\" function\\n  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\\n  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\\n  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\\n  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\\n\\n  ga('create', GA_ACCOUNT, GA_DOMAIN);\\n  ga('send', 'pageview');\\n};\\n\\n})();\\n\",\"type\":\"application/javascript\",\"module-type\":\"startup\"},\"$:/plugins/tiddlywiki/googleanalytics/readme\":{\"title\":\"$:/plugins/tiddlywiki/googleanalytics/readme\",\"text\":\"This plugin enables you to use Google Analytics to track access to your online TiddlyWiki document. Based upon the [[official Google code|https://developers.google.com/analytics/devguides/collection/analyticsjs]].\\n\\n[[Source code|https://github.com/Jermolene/TiddlyWiki5/blob/master/plugins/tiddlywiki/googleanalytics]]\\n\"},\"$:/plugins/tiddlywiki/googleanalytics/settings\":{\"title\":\"$:/plugins/tiddlywiki/googleanalytics/settings\",\"text\":\"You have only two value to set, only first is mandatory:\\n\\n# ''[[Google Analytics Account|$:/GoogleAnalyticsAccount]]'': (mandatory) a code of the form `UA-XXXXXX-XX` where X are digits<br/><$edit-text tiddler=\\\"$:/GoogleAnalyticsAccount\\\" default=\\\"\\\" tag=\\\"input\\\"/>\\n\\n# ''[[Google Analytics Domain|$:/GoogleAnalyticsDomain]]'': (optional) the website URL where the TiddlyWiki file is published. Defaults to `auto` if not set.<br/><$edit-text tiddler=\\\"$:/GoogleAnalyticsDomain\\\" default=\\\"\\\" tag=\\\"input\\\"/>\\n\"},\"$:/plugins/tiddlywiki/googleanalytics/usage\":{\"title\":\"$:/plugins/tiddlywiki/googleanalytics/usage\",\"text\":\"!! Create a Google Analytics account\\n\\nIf you don't already have an account:\\n\\n# Go to the Google Analytics website: http://www.google.com/analytics/\\n# Click the ''Access Google Analytics'' button and follow instructions to set up your account\\n# Enter the URL where the wiki is hosted\\n# Note the Tracking ID for this domain of the form `UA-XXXXXX-XX`\\n\\n!! Install the plugin on your local copy of the TiddlyWiki\\n\\n# ''Backup your TiddlyWiki''. Just in case\\n# Install the plugin via the plugin manager in control panel\\n# Save the TiddlyWiki andrefresh the page to load the plugin\\n# Go to [[$:/ControlPanel]] > Plugins tab and unfold the Google Analytics Plugin\\n# Go to the //settings// tab and edit the parameters\\n# Save the TiddlyWiki\\n\\n!! Upload the new version of your TiddlyWiki\\n\\n# Upload the saved TiddlyWiki to TiddlySpot, GitHub, GitLab or other web host\\n# Return to your Google Analytics page to check that your site is being tracked\\n\"}}}"});