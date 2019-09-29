$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/internals","description":"Tools for exploring the internals of TiddlyWiki","author":"JeremyRuston","core-version":">=5.0.0","list":"readme","version":"5.1.18","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/internals/EditTemplate/body/preview/parse-tree\":{\"title\":\"$:/plugins/tiddlywiki/internals/EditTemplate/body/preview/parse-tree\",\"tags\":\"$:/tags/EditPreview\",\"list-after\":\"$:/core/ui/EditTemplate/body/preview/output\",\"caption\":\"parse tree\",\"text\":\"\\\\define preview(mode)\\n<$wikify name=\\\"preview-text\\\" text={{!!text}} type={{!!type}} mode=\\\"$mode$\\\" output=\\\"parsetree\\\">\\n<pre>\\n<code>\\n<$text text=<<preview-text>>/>\\n</code>\\n</pre>\\n</$wikify>\\n\\\\end\\n\\n{{||$:/plugins/tiddlywiki/internals/EditTemplate/body/preview/shared}}\\n\"},\"$:/plugins/tiddlywiki/internals/EditTemplate/body/preview/raw\":{\"title\":\"$:/plugins/tiddlywiki/internals/EditTemplate/body/preview/raw\",\"tags\":\"$:/tags/EditPreview\",\"caption\":\"raw HTML\",\"list-after\":\"$:/plugins/tiddlywiki/internals/EditTemplate/body/preview/widget-tree\",\"text\":\"<pre><code><$view field=\\\"text\\\" format=\\\"htmlwikified\\\" /></code></pre>\\n\"},\"$:/plugins/tiddlywiki/internals/EditTemplate/body/preview/shared\":{\"title\":\"$:/plugins/tiddlywiki/internals/EditTemplate/body/preview/shared\",\"text\":\"\\\\define body()\\n\\nMode: <$select tiddler=\\\"$(tv-mode-configuration)$\\\" default=\\\"block\\\">\\n<option value=\\\"inline\\\">Inline</option>\\n<option value=\\\"block\\\">Block</option>\\n</$select>\\n\\n<$macrocall $name=\\\"preview\\\" mode={{$(tv-mode-configuration)$}}/>\\n\\\\end\\n\\n<div class=\\\"tc-internal-tree-preview-wrapper\\\">\\n\\n<div class=\\\"tc-internal-tree-preview\\\">\\n\\n<$vars tv-mode-configuration=<<qualify \\\"$:/state/internals/preview/mode\\\">>>\\n\\n<<body>>\\n\\n</$vars>\\n\\n</div>\\n\\n</div>\\n\"},\"$:/plugins/tiddlywiki/internals/EditTemplate/body/preview/widget-tree\":{\"title\":\"$:/plugins/tiddlywiki/internals/EditTemplate/body/preview/widget-tree\",\"tags\":\"$:/tags/EditPreview\",\"caption\":\"widget tree\",\"list-after\":\"$:/plugins/tiddlywiki/internals/EditTemplate/body/preview/parse-tree\",\"text\":\"\\\\define preview(mode)\\n<$wikify name=\\\"preview-text\\\" text={{!!text}} type={{!!type}} mode=\\\"$mode$\\\" output=\\\"widgettree\\\">\\n<pre>\\n<code>\\n<$text text=<<preview-text>>/>\\n</code>\\n</pre>\\n</$wikify>\\n\\\\end\\n\\n{{||$:/plugins/tiddlywiki/internals/EditTemplate/body/preview/shared}}\\n\"},\"$:/plugins/tiddlywiki/internals/readme\":{\"title\":\"$:/plugins/tiddlywiki/internals/readme\",\"text\":\"This plugin adds features to help explore the internals of TiddlyWiki:\\n\\n* New preview panes showing:\\n** the parse tree\\n** the widget tree\\n** the raw HTML output\\n\\nThe first two include a dropdown for choosing block vs. inline parsing mode.\\n\"},\"$:/plugins/tiddlywiki/internals/styles\":{\"title\":\"$:/plugins/tiddlywiki/internals/styles\",\"tags\":\"$:/tags/Stylesheet\",\"text\":\"\\\\rules only filteredtranscludeinline transcludeinline macrodef macrocallinline macrocallblock\\n\"}}}"});