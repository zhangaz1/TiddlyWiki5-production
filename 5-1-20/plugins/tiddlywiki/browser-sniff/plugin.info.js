$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/browser-sniff","description":"Browser sniffing","author":"JeremyRuston","core-version":">=5.0.0","list":"readme usage","version":"5.1.20","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/browser-sniff/sniff.js\":{\"title\":\"$:/plugins/tiddlywiki/browser-sniff/sniff.js\",\"text\":\"/*\\\\\\ntitle: $:/plugins/tiddlywiki/browser-sniff/sniff.js\\ntype: application/javascript\\nmodule-type: info\\n\\nInitialise $:/info/browser tiddlers\\n\\n\\\\*/\\n(function(){\\n\\n/*jslint node: true, browser: true */\\n/*global $tw: false */\\n\\\"use strict\\\";\\n\\nexports.getInfoTiddlerFields = function() {\\n\\tvar mapBoolean = function(value) {return value ? \\\"yes\\\" : \\\"no\\\";},\\n\\t\\tinfoTiddlerFields = [];\\n\\t// Basics\\n\\tif($tw.browser) {\\n\\t\\t// Mappings from tiddler titles (prefixed with \\\"$:/info/browser/\\\") to bowser.browser property name\\n\\t\\tvar bowser = require(\\\"$:/plugins/tiddlywiki/browser-sniff/bowser/bowser.js\\\"),\\n\\t\\t\\tmappings = [\\n\\t\\t\\t\\t[\\\"name\\\",\\\"name\\\",\\\"unknown\\\"],\\n\\t\\t\\t\\t[\\\"version\\\",\\\"version\\\"],\\n\\t\\t\\t\\t[\\\"is/webkit\\\",\\\"webkit\\\"],\\n\\t\\t\\t\\t[\\\"is/gecko\\\",\\\"gecko\\\"],\\n\\t\\t\\t\\t[\\\"is/chrome\\\",\\\"chrome\\\"],\\n\\t\\t\\t\\t[\\\"is/firefox\\\",\\\"firefox\\\"],\\n\\t\\t\\t\\t[\\\"is/ios\\\",\\\"ios\\\"],\\n\\t\\t\\t\\t[\\\"is/iphone\\\",\\\"iphone\\\"],\\n\\t\\t\\t\\t[\\\"is/ipad\\\",\\\"ipad\\\"],\\n\\t\\t\\t\\t[\\\"is/ipod\\\",\\\"ios\\\"],\\n\\t\\t\\t\\t[\\\"is/opera\\\",\\\"opera\\\"],\\n\\t\\t\\t\\t[\\\"is/phantomjs\\\",\\\"phantomjs\\\"],\\n\\t\\t\\t\\t[\\\"is/safari\\\",\\\"safari\\\"],\\n\\t\\t\\t\\t[\\\"is/seamonkey\\\",\\\"seamonkey\\\"],\\n\\t\\t\\t\\t[\\\"is/blackberry\\\",\\\"blackberry\\\"],\\n\\t\\t\\t\\t[\\\"is/webos\\\",\\\"webos\\\"],\\n\\t\\t\\t\\t[\\\"is/silk\\\",\\\"silk\\\"],\\n\\t\\t\\t\\t[\\\"is/bada\\\",\\\"bada\\\"],\\n\\t\\t\\t\\t[\\\"is/tizen\\\",\\\"tizen\\\"],\\n\\t\\t\\t\\t[\\\"is/sailfish\\\",\\\"sailfish\\\"],\\n\\t\\t\\t\\t[\\\"is/android\\\",\\\"android\\\"],\\n\\t\\t\\t\\t[\\\"is/windowsphone\\\",\\\"windowsphone\\\"],\\n\\t\\t\\t\\t[\\\"is/firefoxos\\\",\\\"firefoxos\\\"]\\n\\t\\t\\t];\\n\\t\\t$tw.utils.each(mappings,function(mapping) {\\n\\t\\t\\tvar value = bowser.browser[mapping[1]];\\n\\t\\t\\tif(value === undefined) {\\n\\t\\t\\t\\tvalue = mapping[2];\\n\\t\\t\\t}\\n\\t\\t\\tif(value === undefined) {\\n\\t\\t\\t\\tvalue = false;\\n\\t\\t\\t}\\n\\t\\t\\tif(typeof value === \\\"boolean\\\") {\\n\\t\\t\\t\\tvalue = mapBoolean(value);\\n\\t\\t\\t}\\n\\t\\t\\tinfoTiddlerFields.push({title: \\\"$:/info/browser/\\\" + mapping[0], text: value});\\n\\t\\t});\\n\\t\\t// Set $:/info/browser/name to the platform with some changes from Bowser\\n\\t\\tvar platform = bowser.browser.name;\\n\\t\\tif(\\\"iPad iPhone iPod\\\".split(\\\" \\\").indexOf(platform) !== -1) {\\n\\t\\t\\tplatform = \\\"iOS\\\";\\n\\t\\t}\\n\\t\\tinfoTiddlerFields.push({title: \\\"$:/info/browser/name\\\", text: platform});\\n\\t\\t// Non-bowser settings for TiddlyFox and TiddlyDesktop\\n\\t\\tvar hasTiddlyFox = !!document.getElementById(\\\"tiddlyfox-message-box\\\"), // Fails because message box is added after page load\\n\\t\\t\\tisTiddlyDesktop = false; // Can't detect it until we update TiddlyDesktop to have a distinct useragent string\\n\\t\\t//infoTiddlerFields.push({title: \\\"$:/info/browser/has/tiddlyfox\\\", text: mapBoolean(hasTiddlyFox)});\\n\\t\\t//infoTiddlerFields.push({title: \\\"$:/info/browser/is/tiddlydesktop\\\", text: mapBoolean(isTiddlyDesktop)});\\n\\t\\tif(isTiddlyDesktop) {\\n\\t\\t\\tinfoTiddlerFields.push({title: \\\"$:/info/browser/name\\\", text: \\\"TiddlyDesktop\\\"});\\n\\t\\t}\\n\\t}\\n\\treturn infoTiddlerFields;\\n};\\n\\n})();\\n\",\"type\":\"application/javascript\",\"module-type\":\"info\"},\"$:/plugins/tiddlywiki/browser-sniff/bowser/bowser.js\":{\"text\":\"/*!\\n  * Bowser - a browser detector\\n  * https://github.com/ded/bowser\\n  * MIT License | (c) Dustin Diaz 2014\\n  */\\n\\n!function (name, definition) {\\n  if (typeof module != 'undefined' && module.exports) module.exports['browser'] = definition()\\n  else if (typeof define == 'function') define(definition)\\n  else this[name] = definition()\\n}('bowser', function () {\\n  /**\\n    * See useragents.js for examples of navigator.userAgent\\n    */\\n\\n  var t = true\\n\\n  function detect(ua) {\\n\\n    function getFirstMatch(regex) {\\n      var match = ua.match(regex);\\n      return (match && match.length > 1 && match[1]) || '';\\n    }\\n\\n    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()\\n      , likeAndroid = /like android/i.test(ua)\\n      , android = !likeAndroid && /android/i.test(ua)\\n      , versionIdentifier = getFirstMatch(/version\\\\/(\\\\d+(\\\\.\\\\d+)?)/i)\\n      , tablet = /tablet/i.test(ua)\\n      , mobile = !tablet && /[^-]mobi/i.test(ua)\\n      , result\\n\\n    if (/opera|opr/i.test(ua)) {\\n      result = {\\n        name: 'Opera'\\n      , opera: t\\n      , version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\\\\s\\\\/](\\\\d+(\\\\.\\\\d+)?)/i)\\n      }\\n    }\\n    else if (/windows phone/i.test(ua)) {\\n      result = {\\n        name: 'Windows Phone'\\n      , windowsphone: t\\n      , msie: t\\n      , version: getFirstMatch(/iemobile\\\\/(\\\\d+(\\\\.\\\\d+)?)/i)\\n      }\\n    }\\n    else if (/msie|trident/i.test(ua)) {\\n      result = {\\n        name: 'Internet Explorer'\\n      , msie: t\\n      , version: getFirstMatch(/(?:msie |rv:)(\\\\d+(\\\\.\\\\d+)?)/i)\\n      }\\n    }\\n    else if (/chrome|crios|crmo/i.test(ua)) {\\n      result = {\\n        name: 'Chrome'\\n      , chrome: t\\n      , version: getFirstMatch(/(?:chrome|crios|crmo)\\\\/(\\\\d+(\\\\.\\\\d+)?)/i)\\n      }\\n    }\\n    else if (iosdevice) {\\n      result = {\\n        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'\\n      }\\n      // WTF: version is not part of user agent in web apps\\n      if (versionIdentifier) {\\n        result.version = versionIdentifier\\n      }\\n    }\\n    else if (/sailfish/i.test(ua)) {\\n      result = {\\n        name: 'Sailfish'\\n      , sailfish: t\\n      , version: getFirstMatch(/sailfish\\\\s?browser\\\\/(\\\\d+(\\\\.\\\\d+)?)/i)\\n      }\\n    }\\n    else if (/seamonkey\\\\//i.test(ua)) {\\n      result = {\\n        name: 'SeaMonkey'\\n      , seamonkey: t\\n      , version: getFirstMatch(/seamonkey\\\\/(\\\\d+(\\\\.\\\\d+)?)/i)\\n      }\\n    }\\n    else if (/firefox|iceweasel/i.test(ua)) {\\n      result = {\\n        name: 'Firefox'\\n      , firefox: t\\n      , version: getFirstMatch(/(?:firefox|iceweasel)[ \\\\/](\\\\d+(\\\\.\\\\d+)?)/i)\\n      }\\n      if (/\\\\((mobile|tablet);[^\\\\)]*rv:[\\\\d\\\\.]+\\\\)/i.test(ua)) {\\n        result.firefoxos = t\\n      }\\n    }\\n    else if (/silk/i.test(ua)) {\\n      result =  {\\n        name: 'Amazon Silk'\\n      , silk: t\\n      , version : getFirstMatch(/silk\\\\/(\\\\d+(\\\\.\\\\d+)?)/i)\\n      }\\n    }\\n    else if (android) {\\n      result = {\\n        name: 'Android'\\n      , version: versionIdentifier\\n      }\\n    }\\n    else if (/phantom/i.test(ua)) {\\n      result = {\\n        name: 'PhantomJS'\\n      , phantom: t\\n      , version: getFirstMatch(/phantomjs\\\\/(\\\\d+(\\\\.\\\\d+)?)/i)\\n      }\\n    }\\n    else if (/blackberry|\\\\bbb\\\\d+/i.test(ua) || /rim\\\\stablet/i.test(ua)) {\\n      result = {\\n        name: 'BlackBerry'\\n      , blackberry: t\\n      , version: versionIdentifier || getFirstMatch(/blackberry[\\\\d]+\\\\/(\\\\d+(\\\\.\\\\d+)?)/i)\\n      }\\n    }\\n    else if (/(web|hpw)os/i.test(ua)) {\\n      result = {\\n        name: 'WebOS'\\n      , webos: t\\n      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\\\\/(\\\\d+(\\\\.\\\\d+)?)/i)\\n      };\\n      /touchpad\\\\//i.test(ua) && (result.touchpad = t)\\n    }\\n    else if (/bada/i.test(ua)) {\\n      result = {\\n        name: 'Bada'\\n      , bada: t\\n      , version: getFirstMatch(/dolfin\\\\/(\\\\d+(\\\\.\\\\d+)?)/i)\\n      };\\n    }\\n    else if (/tizen/i.test(ua)) {\\n      result = {\\n        name: 'Tizen'\\n      , tizen: t\\n      , version: getFirstMatch(/(?:tizen\\\\s?)?browser\\\\/(\\\\d+(\\\\.\\\\d+)?)/i) || versionIdentifier\\n      };\\n    }\\n    else if (/safari/i.test(ua)) {\\n      result = {\\n        name: 'Safari'\\n      , safari: t\\n      , version: versionIdentifier\\n      }\\n    }\\n    else result = {}\\n\\n    // set webkit or gecko flag for browsers based on these engines\\n    if (/(apple)?webkit/i.test(ua)) {\\n      result.name = result.name || \\\"Webkit\\\"\\n      result.webkit = t\\n      if (!result.version && versionIdentifier) {\\n        result.version = versionIdentifier\\n      }\\n    } else if (!result.opera && /gecko\\\\//i.test(ua)) {\\n      result.name = result.name || \\\"Gecko\\\"\\n      result.gecko = t\\n      result.version = result.version || getFirstMatch(/gecko\\\\/(\\\\d+(\\\\.\\\\d+)?)/i)\\n    }\\n\\n    // set OS flags for platforms that have multiple browsers\\n    if (android || result.silk) {\\n      result.android = t\\n    } else if (iosdevice) {\\n      result[iosdevice] = t\\n      result.ios = t\\n    }\\n\\n    // OS version extraction\\n    var osVersion = '';\\n    if (iosdevice) {\\n      osVersion = getFirstMatch(/os (\\\\d+([_\\\\s]\\\\d+)*) like mac os x/i);\\n      osVersion = osVersion.replace(/[_\\\\s]/g, '.');\\n    } else if (android) {\\n      osVersion = getFirstMatch(/android[ \\\\/-](\\\\d+(\\\\.\\\\d+)*)/i);\\n    } else if (result.windowsphone) {\\n      osVersion = getFirstMatch(/windows phone (?:os)?\\\\s?(\\\\d+(\\\\.\\\\d+)*)/i);\\n    } else if (result.webos) {\\n      osVersion = getFirstMatch(/(?:web|hpw)os\\\\/(\\\\d+(\\\\.\\\\d+)*)/i);\\n    } else if (result.blackberry) {\\n      osVersion = getFirstMatch(/rim\\\\stablet\\\\sos\\\\s(\\\\d+(\\\\.\\\\d+)*)/i);\\n    } else if (result.bada) {\\n      osVersion = getFirstMatch(/bada\\\\/(\\\\d+(\\\\.\\\\d+)*)/i);\\n    } else if (result.tizen) {\\n      osVersion = getFirstMatch(/tizen[\\\\/\\\\s](\\\\d+(\\\\.\\\\d+)*)/i);\\n    }\\n    if (osVersion) {\\n      result.osversion = osVersion;\\n    }\\n\\n    // device type extraction\\n    var osMajorVersion = osVersion.split('.')[0];\\n    if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {\\n      result.tablet = t\\n    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {\\n      result.mobile = t\\n    }\\n\\n    // Graded Browser Support\\n    // http://developer.yahoo.com/yui/articles/gbs\\n    if ((result.msie && result.version >= 10) ||\\n        (result.chrome && result.version >= 20) ||\\n        (result.firefox && result.version >= 20.0) ||\\n        (result.safari && result.version >= 6) ||\\n        (result.opera && result.version >= 10.0) ||\\n        (result.ios && result.osversion && result.osversion.split(\\\".\\\")[0] >= 6)\\n        ) {\\n      result.a = t;\\n    }\\n    else if ((result.msie && result.version < 10) ||\\n        (result.chrome && result.version < 20) ||\\n        (result.firefox && result.version < 20.0) ||\\n        (result.safari && result.version < 6) ||\\n        (result.opera && result.version < 10.0) ||\\n        (result.ios && result.osversion && result.osversion.split(\\\".\\\")[0] < 6)\\n        ) {\\n      result.c = t\\n    } else result.x = t\\n\\n    return result\\n  }\\n\\n  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')\\n\\n\\n  /*\\n   * Set our detect method to the main bowser object so we can\\n   * reuse it to test other user agents.\\n   * This is needed to implement future tests.\\n   */\\n  bowser._detect = detect;\\n\\n  return bowser\\n});\\n\",\"type\":\"application/javascript\",\"title\":\"$:/plugins/tiddlywiki/browser-sniff/bowser/bowser.js\",\"module-type\":\"library\"},\"$:/plugins/tiddlywiki/browser-sniff/readme\":{\"title\":\"$:/plugins/tiddlywiki/browser-sniff/readme\",\"text\":\"This plugin adds a number of `$:/info/` tiddlers containing information about the current browser.\\n\\nIt allows you to create content that is presented in a way that is responsive to different browsers.\\n\\nFor example, https://tiddlywiki.com uses this plugin to present the user with the best options for getting started depending on their browser.\\n\\n[[Source code|https://github.com/Jermolene/TiddlyWiki5/blob/master/plugins/tiddlywiki/browser-sniff]]\\n\"},\"$:/plugins/tiddlywiki/browser-sniff/usage\":{\"title\":\"$:/plugins/tiddlywiki/browser-sniff/usage\",\"text\":\"! Information Tiddlers\\n\\nThe following informational tiddlers are created at startup:\\n\\n|!Title |!Description |\\n|[[$:/info/browser/is/android]] |Running on Android? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/bada]] |Running on Bada? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/blackberry]] |Running on ~BlackBerry? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/chrome]] |Running on Chrome? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/firefox]] |Running on Firefox? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/firefoxos]] |Running on Firefox OS? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/gecko]] |Running on Gecko? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/ios]] |Running on iOS (ie an iPhone, iPad or iPod)? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/ipad]] |Running on iPad? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/iphone]] |Running on iPhone? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/ipod]] |Running on iPod? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/opera]] |Running on Opera? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/phantomjs]] |Running on ~PhantomJS? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/safari]] |Running on Safari? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/sailfish]] |Running on Sailfish? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/seamonkey]] |Running on Sea Monkey? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/silk]] |Running on Amazon's Silk? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/tizen]] |Running on Tizen? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/webkit]] |Running on ~WebKit? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/webos]] |Running on ~WebOS? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/is/windowsphone]] |Running on Windows Phone? (\\\"yes\\\" or \\\"no\\\")  |\\n|[[$:/info/browser/name]] |Platform name (see below) |\\n|[[$:/info/browser/version]] |Browser version |\\n\\nThe browser information is obtained with [[Bowser, a browser detector library from Dustin Diaz|https://github.com/ded/bowser/]]. Possible browser names include:\\n\\n* ''\\\"Amazon Silk\\\"''\\n* ''\\\"Android\\\"''\\n* ''\\\"Bada\\\"''\\n* ''\\\"~BlackBerry\\\"''\\n* ''\\\"Chrome\\\"''\\n* ''\\\"Firefox\\\"''\\n* ''\\\"Internet Explorer\\\"''\\n* ''\\\"iOS\\\"''\\n* ''\\\"Opera\\\"''\\n* ''\\\"~PhantomJS\\\"''\\n* ''\\\"Safari\\\"''\\n* ''\\\"Sailfish\\\"''\\n* ''\\\"~SeaMonkey\\\"''\\n* ''\\\"~TiddlyDesktop\\\"''\\n* ''\\\"Tizen\\\"''\\n* ''\\\"~WebOS\\\"''\\n* ''\\\"Windows Phone\\\"''\\n\\nNote that Bowser returns \\\"iPhone\\\", \\\"iPad\\\" and \\\"iPod\\\" as distinct values for the name of the current browser. TiddlyWiki converts all three distinct values into \\\"iOS\\\" before copying to [[$:/info/browser/name]].\\n\"}}}"});