$tw.preloadTiddler({"title":"$:/plugins/arlen22/server-sent-events","description":"Websocket server and client","author":"ArlenBeiler","core-version":">=5.0.0","list":"readme","version":"5.1.20","plugin-type":"plugin","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/core/modules/server/sse.js\":{\"title\":\"$:/core/modules/server/sse.js\",\"text\":\"/*\\\\\\ntitle: $:/core/modules/server/sse.js\\ntype: application/javascript\\nmodule-type: global\\n\\nAdds an EventEmitter class which may be used on both the server and client\\n\\n\\\\*/\\n\\n(function () {\\n\\n  /**\\n   * @type {ReturnType<handleConnection>[]}\\n   */\\n  var activeConnections = [];\\n\\n  var serverevents = { handleConnection, activeConnections, broadcastEvent }\\n\\n  function broadcastEvent(type, data) {\\n    if (typeof type !== \\\"string\\\") {\\n      throw new Error(\\\"type must be a string\\\");\\n    }\\n    if (typeof data !== \\\"string\\\" || data.indexOf(\\\"\\\\n\\\") !== -1) {\\n      throw new Error(\\\"data must be a single-line string\\\");\\n    }\\n    activeConnections.forEach(conn => {\\n      conn.sendEvent(type, data);\\n    })\\n  }\\n  serverevents.handleConnection = handleConnection;\\n  serverevents.activeConnections = activeConnections;\\n\\n  /**\\n   * \\n   * @param {import(\\\"http\\\").IncomingMessage} request \\n   * @param {import(\\\"http\\\").ServerResponse} response \\n   * @param {ServerState} state \\n   */\\n  function handleConnection(request, response, state) {\\n\\n    response.writeHead(200, {\\n      'Content-Type': 'text/event-stream',\\n      'Cache-Control': 'no-cache',\\n      'Connection': 'keep-alive'\\n    });\\n\\n    response.write(\\\"\\\\n\\\", \\\"utf8\\\");\\n\\n    var connection = { request, response, state, sendEvent };\\n\\n    activeConnections.push(connection);\\n\\n    this.request.on(\\\"close\\\", () => {\\n      let index = activeConnections.indexOf(conection);\\n      if (index !== -1) activeConnections.splice(index, 1);\\n    })\\n\\n    /**\\n     * @this {typeof connection}\\n     * @param {string} type The event type to send\\n     * @param {string} data The data to send, which must be a string with no newline characters\\n     */\\n    function sendEvent(type, data) {\\n      if (typeof type !== \\\"string\\\") {\\n        throw new Error(\\\"type must be a string\\\");\\n      }\\n      if (typeof data !== \\\"string\\\" || data.indexOf(\\\"\\\\n\\\") !== -1) {\\n        throw new Error(\\\"data must be a single-line string\\\");\\n      }\\n      this.response.write(\\\"event: \\\" + type + \\\"\\\\n\\\", \\\"utf8\\\");\\n      // this.response.write(\\\"id: \\\" + type + \\\"\\\\n\\\", \\\"utf8\\\");\\n      // this.response.write(\\\"retry: \\\" + type + \\\"\\\\n\\\", \\\"utf8\\\");\\n      this.response.write(\\\"data: \\\" + data + \\\"\\\\n\\\\n\\\", \\\"utf8\\\");\\n\\n    }\\n\\n    return connection;\\n\\n  }\\n\\n  exports.serverevents = serverevents;\\n})();\\n\\n\",\"type\":\"application/javascript\",\"module-type\":\"global\"},\"$:/core/modules/server/routes/get-events.js\":{\"title\":\"$:/core/modules/server/routes/get-events.js\",\"text\":\"/*\\\\\\ntitle: $:/core/modules/server/routes/get-events.js\\ntype: application/javascript\\nmodule-type: route\\n\\nmethod, path, handler, bodyType\\n\\ninterface Route {\\n  method: string;\\n  path: RegExp;\\n  handler: (request, response, state) => void;\\n  bodyFormat: \\\"stream\\\" | \\\"string\\\" | \\\"buffer\\\";\\n}\\n\\n\\\\*/\\n(function(){\\n\\nexports.method = \\\"GET\\\";\\n\\nexports.path = /^\\\\/events$/\\n\\nexports.handler = handler;\\n\\n/**\\n * \\n * @param {import(\\\"http\\\").IncomingMessage} request \\n * @param {import(\\\"http\\\").ServerResponse} response \\n * @param {ServerState} state \\n */\\nfunction handler(request, response, state){\\n  if (request.headers.accept && request.headers.accept === 'text/event-stream') {\\n    $tw.sse.handleConnection(request, response, state);\\n  } else {\\n    response.writeHead(404, {});\\n    response.end();\\n  }\\n}\\n\\nexports.bodyFormat = \\\"stream\\\";\\n\\n})();\\n\",\"type\":\"application/javascript\",\"module-type\":\"route\"}}}"});