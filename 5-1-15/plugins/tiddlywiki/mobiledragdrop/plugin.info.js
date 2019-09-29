$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/mobiledragdrop","description":"Mobile drag and drop shim","author":"Tim Ruffles, adapted by Jeremy Ruston ","core-version":">=5.0.0","list":"readme license","version":"5.1.15","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/mobiledragdrop/ios-drag-drop.js\":{\"text\":\"(function(doc) {\\n\\nfunction _exposeIosHtml5DragDropShim(config) {\\n  log = noop; // noOp, remove this line to enable debugging\\n\\n  var coordinateSystemForElementFromPoint;\\n\\n  var DRAG_OVER_EMIT_FREQ = 50;\\n\\n  function main() {\\n    config = config || {};\\n    if (!config.hasOwnProperty(\\\"simulateAnchorClick\\\")) config.simulateAnchorClick = true;\\n\\n    coordinateSystemForElementFromPoint = navigator.userAgent.match(/OS [1-4](?:_\\\\d+)+ like Mac/) ? \\\"page\\\" : \\\"client\\\";\\n\\n    var div = doc.createElement('div');\\n    var dragDiv = 'draggable' in div;\\n    var evts = 'ondragstart' in div && 'ondrop' in div;\\n\\n    var needsPatch = !(dragDiv || evts) || /iPad|iPhone|iPod|Android/.test(navigator.userAgent);\\n    log((needsPatch ? \\\"\\\" : \\\"not \\\") + \\\"patching html5 drag drop\\\");\\n\\n    if(!needsPatch) {\\n      return;\\n    }\\n\\n    if(!config.enableEnterLeave) {\\n      DragDrop.prototype.synthesizeEnterLeave = noop;\\n    }\\n\\n    if(config.holdToDrag){\\n      doc.addEventListener(\\\"touchstart\\\", touchstartDelay(config.holdToDrag), {passive:false});\\n    }\\n    else {\\n      doc.addEventListener(\\\"touchstart\\\", touchstart, {passive:false});\\n    }\\n  }\\n\\n  function DragDrop(event, el) {\\n\\n    this.dragData = {};\\n    this.dragDataTypes = [];\\n    this.dragImage = null;\\n    this.dragImageTransform = null;\\n    this.dragImageWebKitTransform = null;\\n    this.customDragImage = null;\\n    this.customDragImageX = null;\\n    this.customDragImageY = null;\\n    this.el = el || event.target;\\n    this.dragOverTimer = null;\\n    this.lastMoveEvent = null;\\n\\n    log(\\\"dragstart\\\");\\n\\n    if (this.dispatchDragStart()) {\\n      this.createDragImage();\\n      this.listen();\\n    }\\n  }\\n\\n  DragDrop.prototype = {\\n    listen: function() {\\n      var move = onEvt(doc, \\\"touchmove\\\", this.move, this);\\n      var end = onEvt(doc, \\\"touchend\\\", ontouchend, this);\\n      var cancel = onEvt(doc, \\\"touchcancel\\\", cleanup, this);\\n\\n      function ontouchend(event) {\\n        this.dragend(event, event.target);\\n        cleanup.call(this);\\n      }\\n      function cleanup() {\\n        log(\\\"cleanup\\\");\\n        this.dragDataTypes = [];\\n        if (this.dragImage !== null) {\\n          this.dragImage.parentNode.removeChild(this.dragImage);\\n          this.dragImage = null;\\n          this.dragImageTransform = null;\\n          this.dragImageWebKitTransform = null;\\n        }\\n        this.customDragImage = null;\\n        this.customDragImageX = null;\\n        this.customDragImageY = null;\\n        this.el = this.dragData = null;\\n        return [move, end, cancel].forEach(function(handler) {\\n          return handler.off();\\n        });\\n      }\\n    },\\n    move: function(event) {\\n      event.preventDefault();\\n      var pageXs = [], pageYs = [];\\n      [].forEach.call(event.changedTouches, function(touch) {\\n        pageXs.push(touch.pageX);\\n        pageYs.push(touch.pageY);\\n      });\\n\\n      var x = average(pageXs) - (this.customDragImageX || parseInt(this.dragImage.offsetWidth, 10) / 2);\\n      var y = average(pageYs) - (this.customDragImageY || parseInt(this.dragImage.offsetHeight, 10) / 2);\\n      this.translateDragImage(x, y);\\n\\n      this.synthesizeEnterLeave(event);\\n      this.synthesizeOver(event);\\n    },\\n    // We use translate instead of top/left because of sub-pixel rendering and for the hope of better performance\\n    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/\\n    translateDragImage: function(x, y) {\\n      var translate = \\\"translate(\\\" + x + \\\"px,\\\" + y + \\\"px) \\\";\\n\\n      if (this.dragImageWebKitTransform !== null) {\\n        this.dragImage.style[\\\"-webkit-transform\\\"] = translate + this.dragImageWebKitTransform;\\n      }\\n      if (this.dragImageTransform !== null) {\\n        this.dragImage.style.transform = translate + this.dragImageTransform;\\n      }\\n    },\\n    synthesizeEnterLeave: function(event) {\\n      var target = elementFromTouchEvent(this.el,event)\\n      if (target != this.lastEnter) {\\n        if (this.lastEnter) {\\n          this.dispatchLeave(event);\\n        }\\n        this.lastEnter = target;\\n        if (this.lastEnter) {\\n          this.dispatchEnter(event);\\n        }\\n      }\\n    },\\n    synthesizeOver: function(event) {\\n      this.lastMoveEvent = event;\\n      if(this.lastEnter && !this.dragOverTimer) {\\n        this.dragOverTimer = setInterval(this.dispatchOver.bind(this), DRAG_OVER_EMIT_FREQ);\\n      }\\n    },\\n    clearDragOverTimer: function() {\\n      if(this.dragOverTimer) {\\n        clearInterval(this.dragOverTimer);\\n        this.dragOverTimer = null;\\n      }\\n    },\\n    dragend: function(event) {\\n\\n      // we'll dispatch drop if there's a target, then dragEnd.\\n      // drop comes first http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#drag-and-drop-processing-model\\n      log(\\\"dragend\\\");\\n\\n      if (this.lastEnter) {\\n        this.dispatchLeave(event);\\n      }\\n\\n      var target = elementFromTouchEvent(this.el,event)\\n      if (target) {\\n        log(\\\"found drop target \\\" + target.tagName);\\n        this.dispatchDrop(target, event);\\n      } else {\\n        log(\\\"no drop target\\\");\\n      }\\n\\n      var dragendEvt = doc.createEvent(\\\"Event\\\");\\n      dragendEvt.initEvent(\\\"dragend\\\", true, true);\\n      this.el.dispatchEvent(dragendEvt);\\n      this.clearDragOverTimer();\\n    },\\n    dispatchDrop: function(target, event) {\\n      var dropEvt = doc.createEvent(\\\"Event\\\");\\n      dropEvt.initEvent(\\\"drop\\\", true, true);\\n\\n      var touch = event.changedTouches[0];\\n      var x = touch[coordinateSystemForElementFromPoint + 'X'];\\n      var y = touch[coordinateSystemForElementFromPoint + 'Y'];\\n\\n      var targetOffset = getOffset(target);\\n\\n      dropEvt.offsetX = x - targetOffset.x;\\n      dropEvt.offsetY = y - targetOffset.y;\\n\\n      dropEvt.dataTransfer = {\\n        types: this.dragDataTypes,\\n        getData: function(type) {\\n          return this.dragData[type];\\n        }.bind(this),\\n        dropEffect: \\\"move\\\"\\n      };\\n      dropEvt.preventDefault = function() {\\n        // https://www.w3.org/Bugs/Public/show_bug.cgi?id=14638 - if we don't cancel it, we'll snap back\\n      }.bind(this);\\n\\n      once(doc, \\\"drop\\\", function() {\\n        log(\\\"drop event not canceled\\\");\\n      },this);\\n\\n      target.dispatchEvent(dropEvt);\\n    },\\n    dispatchEnter: function(event) {\\n\\n      var enterEvt = doc.createEvent(\\\"Event\\\");\\n      enterEvt.initEvent(\\\"dragenter\\\", true, true);\\n      enterEvt.dataTransfer = {\\n        types: this.dragDataTypes,\\n        getData: function(type) {\\n          return this.dragData[type];\\n        }.bind(this)\\n      };\\n\\n      var touch = event.changedTouches[0];\\n      enterEvt.pageX = touch.pageX;\\n      enterEvt.pageY = touch.pageY;\\n      enterEvt.clientX = touch.clientX;\\n      enterEvt.clientY = touch.clientY;\\n\\n      this.lastEnter.dispatchEvent(enterEvt);\\n    },\\n    dispatchOver: function() {\\n\\n      var overEvt = doc.createEvent(\\\"Event\\\");\\n      overEvt.initEvent(\\\"dragover\\\", true, true);\\n      overEvt.dataTransfer = {\\n        types: this.dragDataTypes,\\n        getData: function(type) {\\n          return this.dragData[type];\\n        }.bind(this)\\n      };\\n\\n      var touch = this.lastMoveEvent.changedTouches[0];\\n      overEvt.pageX = touch.pageX;\\n      overEvt.pageY = touch.pageY;\\n      overEvt.clientX = touch.clientX;\\n      overEvt.clientY = touch.clientY;\\n\\n      this.lastEnter.dispatchEvent(overEvt);\\n    },\\n    dispatchLeave: function(event) {\\n\\n      var leaveEvt = doc.createEvent(\\\"Event\\\");\\n      leaveEvt.initEvent(\\\"dragleave\\\", true, true);\\n      leaveEvt.dataTransfer = {\\n        types: this.dragDataTypes,\\n        getData: function(type) {\\n          return this.dragData[type];\\n        }.bind(this)\\n      };\\n\\n      var touch = event.changedTouches[0];\\n      leaveEvt.pageX = touch.pageX;\\n      leaveEvt.pageY = touch.pageY;\\n      leaveEvt.clientX = touch.clientX;\\n      leaveEvt.clientY = touch.clientY;\\n\\n      this.lastEnter.dispatchEvent(leaveEvt);\\n      this.lastEnter = null;\\n      this.clearDragOverTimer();\\n    },\\n    dispatchDragStart: function() {\\n      var evt = doc.createEvent(\\\"Event\\\");\\n      evt.initEvent(\\\"dragstart\\\", true, true);\\n      evt.dataTransfer = {\\n        setData: function(type, val) {\\n          this.dragData[type] = val;\\n          if (this.dragDataTypes.indexOf(type) == -1) {\\n            this.dragDataTypes[this.dragDataTypes.length] = type;\\n          }\\n          return val;\\n        }.bind(this),\\n        setDragImage: function(el, x, y){\\n          this.customDragImage = el;\\n          this.customDragImageX = x\\n          this.customDragImageY = y\\n        }.bind(this),\\n        dropEffect: \\\"move\\\"\\n      };\\n      return this.el.dispatchEvent(evt);\\n    },\\n    createDragImage: function() {\\n      if (this.customDragImage) {\\n        this.dragImage = this.customDragImage.cloneNode(true);\\n        duplicateStyle(this.customDragImage, this.dragImage);\\n      } else {\\n        this.dragImage = this.el.cloneNode(true);\\n        duplicateStyle(this.el, this.dragImage);\\n      }\\n      this.dragImage.style.opacity = \\\"0.5\\\";\\n      this.dragImage.style.position = \\\"absolute\\\";\\n      this.dragImage.style.left = \\\"0px\\\";\\n      this.dragImage.style.top = \\\"0px\\\";\\n      this.dragImage.style.zIndex = \\\"999999\\\";\\n\\n      var transform = this.dragImage.style.transform;\\n      if (typeof transform !== \\\"undefined\\\") {\\n        this.dragImageTransform = \\\"\\\";\\n        if (transform != \\\"none\\\") {\\n          this.dragImageTransform = transform.replace(/translate\\\\(\\\\D*\\\\d+[^,]*,\\\\D*\\\\d+[^,]*\\\\)\\\\s*/g, '');\\n        }\\n      }\\n\\n      var webkitTransform = this.dragImage.style[\\\"-webkit-transform\\\"];\\n      if (typeof webkitTransform !== \\\"undefined\\\") {\\n        this.dragImageWebKitTransform = \\\"\\\";\\n        if (webkitTransform != \\\"none\\\") {\\n          this.dragImageWebKitTransform = webkitTransform.replace(/translate\\\\(\\\\D*\\\\d+[^,]*,\\\\D*\\\\d+[^,]*\\\\)\\\\s*/g, '');\\n        }\\n      }\\n\\n      this.translateDragImage(-9999, -9999);\\n\\n      doc.body.appendChild(this.dragImage);\\n    }\\n  };\\n\\n  // delayed touch start event\\n  function touchstartDelay(delay) {\\n    return function(evt){\\n      var el = evt.target;\\n\\n      do {\\n        if (elementIsDraggable(el)) {\\n          var heldItem = function() {\\n            end.off();\\n            cancel.off();\\n            scroll.off();\\n            touchstart(evt);\\n          };\\n\\n          var onReleasedItem = function() {\\n            end.off();\\n            cancel.off();\\n            scroll.off();\\n            clearTimeout(timer);\\n          };\\n\\n          var timer = setTimeout(heldItem, delay);\\n\\n          var end = onEvt(el, 'touchend', onReleasedItem, this);\\n          var cancel = onEvt(el, 'touchcancel', onReleasedItem, this);\\n          var scroll = onEvt(window, 'scroll', onReleasedItem, this);\\n          break;\\n        }\\n      } while ((el = el.parentNode) && el !== doc.body);\\n    };\\n  };\\n\\n  // event listeners\\n  function touchstart(evt) {\\n    var el = evt.target;\\n    do {\\n      if (elementIsDraggable(el)) {\\n        handleTouchStartOnAnchor(evt, el);\\n\\n        evt.preventDefault();\\n        new DragDrop(evt,el);\\n        break;\\n      }\\n    } while((el = el.parentNode) && el !== doc.body);\\n  }\\n\\n  function elementIsDraggable(el){\\n    // if an element is not draggable either explicitly or implicitly we can exit immediately\\n    if(!el.draggable) return false;\\n\\n    // if an element has been explicitly set to be draggable we're good to go\\n    if(el.hasAttribute(\\\"draggable\\\")) return true;\\n\\n    // otherwise we investigate the implicit option\\n    return (!config.requireExplicitDraggable);\\n  }\\n\\n  function elementIsAnchor(el){\\n    return el.tagName.toLowerCase() == \\\"a\\\";\\n  }\\n\\n  function handleTouchStartOnAnchor(evt, el){\\n    // If draggable isn't explicitly set for anchors, then simulate a click event.\\n    // Otherwise plain old vanilla links will stop working.\\n    // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Touch_events#Handling_clicks\\n    if (!el.hasAttribute(\\\"draggable\\\") && elementIsAnchor(el) && config.simulateAnchorClick) {\\n      var clickEvt = document.createEvent(\\\"MouseEvents\\\");\\n      clickEvt.initMouseEvent(\\\"click\\\", true, true, el.ownerDocument.defaultView, 1,\\n        evt.screenX, evt.screenY, evt.clientX, evt.clientY,\\n        evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, 0, null);\\n      el.dispatchEvent(clickEvt);\\n      log(\\\"Simulating click to anchor\\\");\\n    }\\n  }\\n\\n  // DOM helpers\\n  function elementFromTouchEvent(el,event) {\\n    var touch = event.changedTouches[0];\\n    var target = doc.elementFromPoint(\\n      touch[coordinateSystemForElementFromPoint + \\\"X\\\"],\\n      touch[coordinateSystemForElementFromPoint + \\\"Y\\\"]\\n    );\\n    return target;\\n  }\\n\\n  //calculate the offset position of an element (relative to the window, not the document)\\n  function getOffset(el) {\\n    var rect = el.getBoundingClientRect();\\n    return {\\n      \\\"x\\\": rect.left,\\n      \\\"y\\\": rect.top\\n    };\\n  }\\n\\n  function onEvt(el, event, handler, context) {\\n    if(context) {\\n      handler = handler.bind(context);\\n    }\\n    el.addEventListener(event, handler, {passive:false});\\n    return {\\n      off: function() {\\n        return el.removeEventListener(event, handler, {passive:false});\\n      }\\n    };\\n  }\\n\\n  function once(el, event, handler, context) {\\n    if(context) {\\n      handler = handler.bind(context);\\n    }\\n    function listener(evt) {\\n      handler(evt);\\n      return el.removeEventListener(event,listener);\\n    }\\n    return el.addEventListener(event,listener);\\n  }\\n\\n  // duplicateStyle expects dstNode to be a clone of srcNode\\n  function duplicateStyle(srcNode, dstNode) {\\n    // Is this node an element?\\n    if (srcNode.nodeType == 1) {\\n      // Remove any potential conflict attributes\\n      dstNode.removeAttribute(\\\"id\\\");\\n      dstNode.removeAttribute(\\\"class\\\");\\n      dstNode.removeAttribute(\\\"style\\\");\\n      dstNode.removeAttribute(\\\"draggable\\\");\\n\\n      // Clone the style\\n      var cs = window.getComputedStyle(srcNode);\\n      for (var i = 0; i < cs.length; i++) {\\n        var csName = cs[i];\\n        dstNode.style.setProperty(csName, cs.getPropertyValue(csName), cs.getPropertyPriority(csName));\\n      }\\n\\n      // Pointer events as none makes the drag image transparent to document.elementFromPoint()\\n      dstNode.style.pointerEvents = \\\"none\\\";\\n    }\\n\\n    // Do the same for the children\\n    if (srcNode.hasChildNodes()) {\\n      for (var j = 0; j < srcNode.childNodes.length; j++) {\\n        duplicateStyle(srcNode.childNodes[j], dstNode.childNodes[j]);\\n      }\\n    }\\n  }\\n\\n  // general helpers\\n  function log(msg) {\\n    console.log(msg);\\n  }\\n\\n  function average(arr) {\\n    if (arr.length === 0) return 0;\\n    return arr.reduce((function(s, v) {\\n      return v + s;\\n    }), 0) / arr.length;\\n  }\\n\\n  function noop() {}\\n\\n  main();\\n\\n};\\n\\nif (typeof module === 'object' && typeof module.exports === 'object') {\\n  module.exports = _exposeIosHtml5DragDropShim;\\n} else if (typeof window !== 'undefined') {\\n  _exposeIosHtml5DragDropShim(window.iosDragDropShim);\\n}\\n})(document);\",\"type\":\"application/javascript\",\"title\":\"$:/plugins/tiddlywiki/mobiledragdrop/ios-drag-drop.js\"},\"$:/plugins/tiddlywiki/mobiledragdrop/license\":{\"text\":\"Copyright (c) 2013 Tim Ruffles\\n\\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \\\"Software\\\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\\n\\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\\n\\nTHE SOFTWARE IS PROVIDED \\\"AS IS\\\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\\n\",\"type\":\"text/plain\",\"title\":\"$:/plugins/tiddlywiki/mobiledragdrop/license\"},\"$:/plugins/tiddlywiki/mobiledragdrop/rawmarkup\":{\"title\":\"$:/plugins/tiddlywiki/mobiledragdrop/rawmarkup\",\"tags\":\"$:/tags/RawMarkupWikified\",\"text\":\"`<script>\\nvar iosDragDropShim = { enableEnterLeave: true, holdToDrag: 300 };`\\n{{$:/plugins/tiddlywiki/mobiledragdrop/ios-drag-drop.js}}\\n`</script>`\\n\"},\"$:/plugins/tiddlywiki/mobiledragdrop/readme\":{\"title\":\"$:/plugins/tiddlywiki/mobiledragdrop/readme\",\"text\":\"This plugin provides a \\\"shim\\\" that enables HTML 5 compatible drag and drop operations on mobile browsers, including iOS and Android. The shim was created by Tim Ruffles and is published at https://github.com/timruffles/ios-html5-drag-drop-shim.\\n\\nAfter installing the plugin it is necessary to save the HTML file a second time before it will be fully enabled.\\n\"},\"$:/plugins/tiddlywiki/mobiledragdrop/startup.js\":{\"title\":\"$:/plugins/tiddlywiki/mobiledragdrop/startup.js\",\"text\":\"/*\\\\\\ntitle: $:/plugins/tiddlywiki/mobiledragdrop/startup.js\\ntype: application/javascript\\nmodule-type: startup\\n\\nStartup initialisation\\n\\n\\\\*/\\n(function(){\\n\\n/*jslint node: true, browser: true */\\n/*global $tw: false */\\n\\\"use strict\\\";\\n\\n// Export name and synchronous status\\nexports.name = \\\"mobiledragdrop\\\";\\nexports.platforms = [\\\"browser\\\"];\\nexports.after = [\\\"startup\\\"];\\nexports.synchronous = true;\\n\\nexports.startup = function() {\\n\\twindow.addEventListener(\\\"touchmove\\\", function() {});\\n};\\n\\n})();\\n\",\"type\":\"application/javascript\",\"module-type\":\"startup\"}}}"});