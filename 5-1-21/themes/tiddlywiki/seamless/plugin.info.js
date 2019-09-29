$tw.preloadTiddler({"title":"$:/themes/tiddlywiki/seamless","name":"Seamless","author":"JeremyRuston","core-version":">=5.0.0","plugin-type":"theme","description":"Removes borders from tiddlers","dependents":"$:/themes/tiddlywiki/vanilla","version":"5.1.21","type":"application/json","text":"{\n    \"tiddlers\": {\n        \"$:/themes/tiddlywiki/seamless/base\": {\n            \"title\": \"$:/themes/tiddlywiki/seamless/base\",\n            \"tags\": \"[[$:/tags/Stylesheet]]\",\n            \"list-after\": \"$:/themes/tiddlywiki/vanilla/base\",\n            \"text\": \"\\\\rules only filteredtranscludeinline transcludeinline macrodef macrocallinline\\n\\n/*\\nRules copied from Snow White\\n*/\\n\\n.tc-page-controls button svg, .tc-tiddler-controls button svg, .tc-topbar button svg {\\n\\t<<transition \\\"fill 150ms ease-in-out\\\">>\\n}\\n\\n.tc-tiddler-controls button.tc-selected svg {\\n\\t<<filter \\\"drop-shadow(0px -1px 2px rgba(0,0,0,0.25))\\\">>\\n}\\n\\n.tc-drop-down {\\n\\tborder-radius: 4px;\\n\\t<<box-shadow \\\"2px 2px 10px rgba(0, 0, 0, 0.5)\\\">>\\n}\\n\\n.tc-block-dropdown {\\n\\tborder-radius: 4px;\\n\\t<<box-shadow \\\"2px 2px 10px rgba(0, 0, 0, 0.5)\\\">>\\n}\\n\\n.tc-modal-displayed {\\n\\t<<filter \\\"blur(4px)\\\">>\\n}\\n\\n.tc-modal {\\n\\tborder-radius: 6px;\\n\\t<<box-shadow \\\"0 3px 7px rgba(0,0,0,0.3)\\\">>\\n}\\n\\n.tc-modal-footer {\\n\\tborder-radius: 0 0 6px 6px;\\n\\t<<box-shadow \\\"inset 0 1px 0 #fff\\\">>;\\n}\\n\\n.tc-alert {\\n\\tborder-radius: 6px;\\n\\t<<box-shadow \\\"0 3px 7px rgba(0,0,0,0.6)\\\">>\\n}\\n\\n.tc-notification {\\n\\tborder-radius: 6px;\\n\\t<<box-shadow \\\"0 3px 7px rgba(0,0,0,0.3)\\\">>\\n\\ttext-shadow: 0 1px 0 rgba(255,255,255, 0.8);\\n}\\n\\n.tc-message-box img {\\n\\t<<box-shadow \\\"1px 1px 3px rgba(0,0,0,0.5)\\\">>\\n}\\n\\n/*\\nSeamless modifications\\n*/\\n\\n@media (min-width: {{$:/themes/tiddlywiki/vanilla/metrics/sidebarbreakpoint}}) {\\n\\n\\t/* Drop the tiddler frame padding */\\n\\tbody.tc-body .tc-tiddler-frame {\\n\\t\\tpadding: 0;\\n\\t}\\n\\n\\t/* Move the sidebar up so that the title lines up */\\n\\tbody.tc-body .tc-sidebar-scrollable {\\n\\t\\tpadding: 43px 0 28px 42px;\\n\\t}\\n\\n\\t/* Stop the tiddler info panel from bleeding into the tiddler frame padding */\\n\\tbody.tc-body .tc-tiddler-info {\\n\\t\\tmargin: 0;\\n\\t}\\n\\n\\t/* Stop message boxes from bleeding into the tiddler frame padding */\\n\\tbody.tc-body .tc-message-box {\\n\\t\\tmargin: 21px 0 21px 0;\\n\\t}\\n\\n}\\n\\n/* Use the tiddler background colour for the page background */\\nhtml body.tc-body {\\n\\tbackground-color: <<colour background>>;\\n}\\n\\nhtml:-webkit-full-screen {\\n\\tbackground-color: <<colour background>>;\\n}\\n\\n/* Adjust the colour of the page controls */\\nbody.tc-body .tc-page-controls svg {\\n\\tfill: <<colour muted-foreground>>;\\n}\\n\\n/* Adjust the colour of the sidebar selected tabs */\\nbody.tc-body .tc-sidebar-lists .tc-tab-buttons button.tc-tab-selected {\\n\\tbackground-color: <<colour background>>;\\n}\\n\"\n        }\n    }\n}"});