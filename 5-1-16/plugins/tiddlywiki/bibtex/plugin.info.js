$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/bibtex","description":"BibTeX importer","author":"Henrik Muehe and Mikola Lysenko, adapted by Jeremy Ruston","plugin-type":"plugin","list":"readme license","version":"5.1.16","dependents":"","type":"application/json","text":"{\"tiddlers\":{\"$:/plugins/tiddlywiki/excel-utils/deserializer.js\":{\"title\":\"$:/plugins/tiddlywiki/excel-utils/deserializer.js\",\"text\":\"/*\\\\\\ntitle: $:/plugins/tiddlywiki/excel-utils/deserializer.js\\ntype: application/javascript\\nmodule-type: tiddlerdeserializer\\n\\nXLSX file deserializer\\n\\n\\\\*/\\n(function(){\\n\\n/*jslint node: true, browser: true */\\n/*global $tw: false */\\n\\\"use strict\\\";\\n\\nvar bibtexParse = require(\\\"$:/plugins/tiddlywiki/bibtex/bibtexParse.js\\\");\\n\\n/*\\nParse an XLSX file into tiddlers\\n*/\\nexports[\\\"application/x-bibtex\\\"] = function(text,fields) {\\n\\tvar data,\\n\\t\\tresults = [];\\n\\t// Parse the text\\n\\ttry {\\n\\t\\tdata = bibtexParse.toJSON(text)\\n\\t} catch(ex) {\\n\\t\\tdata = ex.toString();\\n\\t}\\n\\tif(typeof data === \\\"string\\\") {\\n\\t\\treturn [{\\n\\t\\t\\ttitle: \\\"BibTeX import error: \\\" + data,\\n\\t\\t}];\\n\\t}\\n\\t// Convert each entry\\n\\t$tw.utils.each(data,function(entry) {\\n\\t\\tvar fields = {\\n\\t\\t\\ttitle: entry.citationKey,\\n\\t\\t\\t\\\"bibtex-entry-type\\\": entry.entryType\\n\\t\\t};\\n\\t\\t$tw.utils.each(entry.entryTags,function(value,name) {\\n\\t\\t\\tfields[\\\"bibtex-\\\" + name] = value;\\n\\t\\t});\\n\\t\\tresults.push(fields);\\n\\t});\\n\\t// Return the output tiddlers\\n\\treturn results;\\n};\\n\\n})();\\n\",\"type\":\"application/javascript\",\"module-type\":\"tiddlerdeserializer\"},\"$:/plugins/tiddlywiki/bibtex/readme\":{\"title\":\"$:/plugins/tiddlywiki/bibtex/readme\",\"text\":\"The BibTeX plugin provides a deserializer that can convert bibliographic entries in `.bib` files into individual tiddlers.\\n\\nYou can use it in the browser by dragging and dropping a `.bib` file into the TiddlyWiki window. Under Node.js, use the `--load` command to load a `.bib` file.\\n\\nThe conversion is as follows:\\n\\n* `title` comes from citationKey\\n* `bibtex-entry-type` comes from entryType\\n* all `entryTags` are assigned to fields with the prefix `bibtex-`\\n\\nThe BibTeX plugin is based on the library [[bibtexParseJs by Henrik Muehe and Mikola Lysenko|https://github.com/ORCID/bibtexParseJs]].\\n\"},\"$:/plugins/tiddlywiki/bibtex/bibtexParse.js\":{\"text\":\"/* start bibtexParse 0.0.22 */\\n\\n//Original work by Henrik Muehe (c) 2010\\n//\\n//CommonJS port by Mikola Lysenko 2013\\n//\\n//Port to Browser lib by ORCID / RCPETERS\\n//\\n//Issues:\\n//no comment handling within strings\\n//no string concatenation\\n//no variable values yet\\n//Grammar implemented here:\\n//bibtex -> (string | preamble | comment | entry)*;\\n//string -> '@STRING' '{' key_equals_value '}';\\n//preamble -> '@PREAMBLE' '{' value '}';\\n//comment -> '@COMMENT' '{' value '}';\\n//entry -> '@' key '{' key ',' key_value_list '}';\\n//key_value_list -> key_equals_value (',' key_equals_value)*;\\n//key_equals_value -> key '=' value;\\n//value -> value_quotes | value_braces | key;\\n//value_quotes -> '\\\"' .*? '\\\"'; // not quite\\n//value_braces -> '{' .*? '\\\"'; // not quite\\n(function(exports) {\\n\\n    function BibtexParser() {\\n        \\n        this.months = [\\\"jan\\\", \\\"feb\\\", \\\"mar\\\", \\\"apr\\\", \\\"may\\\", \\\"jun\\\", \\\"jul\\\", \\\"aug\\\", \\\"sep\\\", \\\"oct\\\", \\\"nov\\\", \\\"dec\\\"];\\n        this.notKey = [',','{','}',' ','='];\\n        this.pos = 0;\\n        this.input = \\\"\\\";\\n        this.entries = new Array();\\n\\n        this.currentEntry = \\\"\\\";\\n\\n        this.setInput = function(t) {\\n            this.input = t;\\n        };\\n\\n        this.getEntries = function() {\\n            return this.entries;\\n        };\\n\\n        this.isWhitespace = function(s) {\\n            return (s == ' ' || s == '\\\\r' || s == '\\\\t' || s == '\\\\n');\\n        };\\n\\n        this.match = function(s, canCommentOut) {\\n            if (canCommentOut == undefined || canCommentOut == null)\\n                canCommentOut = true;\\n            this.skipWhitespace(canCommentOut);\\n            if (this.input.substring(this.pos, this.pos + s.length) == s) {\\n                this.pos += s.length;\\n            } else {\\n                throw \\\"Token mismatch, expected \\\" + s + \\\", found \\\"\\n                        + this.input.substring(this.pos);\\n            };\\n            this.skipWhitespace(canCommentOut);\\n        };\\n\\n        this.tryMatch = function(s, canCommentOut) {\\n            if (canCommentOut == undefined || canCommentOut == null)\\n                canCommentOut = true;\\n            this.skipWhitespace(canCommentOut);\\n            if (this.input.substring(this.pos, this.pos + s.length) == s) {\\n                return true;\\n            } else {\\n                return false;\\n            };\\n            this.skipWhitespace(canCommentOut);\\n        };\\n\\n        /* when search for a match all text can be ignored, not just white space */\\n        this.matchAt = function() {\\n            while (this.input.length > this.pos && this.input[this.pos] != '@') {\\n                this.pos++;\\n            };\\n\\n            if (this.input[this.pos] == '@') {\\n                return true;\\n            };\\n            return false;\\n        };\\n\\n        this.skipWhitespace = function(canCommentOut) {\\n            while (this.isWhitespace(this.input[this.pos])) {\\n                this.pos++;\\n            };\\n            if (this.input[this.pos] == \\\"%\\\" && canCommentOut == true) {\\n                while (this.input[this.pos] != \\\"\\\\n\\\") {\\n                    this.pos++;\\n                };\\n                this.skipWhitespace(canCommentOut);\\n            };\\n        };\\n\\n        this.value_braces = function() {\\n            var bracecount = 0;\\n            this.match(\\\"{\\\", false);\\n            var start = this.pos;\\n            var escaped = false;\\n            while (true) {\\n                if (!escaped) {\\n                    if (this.input[this.pos] == '}') {\\n                        if (bracecount > 0) {\\n                            bracecount--;\\n                        } else {\\n                            var end = this.pos;\\n                            this.match(\\\"}\\\", false);\\n                            return this.input.substring(start, end);\\n                        };\\n                    } else if (this.input[this.pos] == '{') {\\n                        bracecount++;\\n                    } else if (this.pos >= this.input.length - 1) {\\n                        throw \\\"Unterminated value\\\";\\n                    };\\n                };\\n                if (this.input[this.pos] == '\\\\\\\\' && escaped == false)\\n                    escaped = true;\\n                else\\n                    escaped = false;\\n                this.pos++;\\n            };\\n        };\\n\\n        this.value_comment = function() {\\n            var str = '';\\n            var brcktCnt = 0;\\n            while (!(this.tryMatch(\\\"}\\\", false) && brcktCnt == 0)) {\\n                str = str + this.input[this.pos];\\n                if (this.input[this.pos] == '{')\\n                    brcktCnt++;\\n                if (this.input[this.pos] == '}')\\n                    brcktCnt--;\\n                if (this.pos >= this.input.length - 1) {\\n                    throw \\\"Unterminated value:\\\" + this.input.substring(start);\\n                };\\n                this.pos++;\\n            };\\n            return str;\\n        };\\n\\n        this.value_quotes = function() {\\n            this.match('\\\"', false);\\n            var start = this.pos;\\n            var escaped = false;\\n            while (true) {\\n                if (!escaped) {\\n                    if (this.input[this.pos] == '\\\"') {\\n                        var end = this.pos;\\n                        this.match('\\\"', false);\\n                        return this.input.substring(start, end);\\n                    } else if (this.pos >= this.input.length - 1) {\\n                        throw \\\"Unterminated value:\\\" + this.input.substring(start);\\n                    };\\n                }\\n                if (this.input[this.pos] == '\\\\\\\\' && escaped == false)\\n                    escaped = true;\\n                else\\n                    escaped = false;\\n                this.pos++;\\n            };\\n        };\\n\\n        this.single_value = function() {\\n            var start = this.pos;\\n            if (this.tryMatch(\\\"{\\\")) {\\n                return this.value_braces();\\n            } else if (this.tryMatch('\\\"')) {\\n                return this.value_quotes();\\n            } else {\\n                var k = this.key();\\n                if (k.match(\\\"^[0-9]+$\\\"))\\n                    return k;\\n                else if (this.months.indexOf(k.toLowerCase()) >= 0)\\n                    return k.toLowerCase();\\n                else\\n                    throw \\\"Value expected:\\\" + this.input.substring(start) + ' for key: ' + k;\\n            \\n            };\\n        };\\n\\n        this.value = function() {\\n            var values = [];\\n            values.push(this.single_value());\\n            while (this.tryMatch(\\\"#\\\")) {\\n                this.match(\\\"#\\\");\\n                values.push(this.single_value());\\n            };\\n            return values.join(\\\"\\\");\\n        };\\n\\n        this.key = function(optional) {\\n            var start = this.pos;\\n            while (true) {\\n                if (this.pos >= this.input.length) {\\n                    throw \\\"Runaway key\\\";\\n                };\\n                                // а-яА-Я is Cyrillic\\n                //console.log(this.input[this.pos]);\\n                if (this.notKey.indexOf(this.input[this.pos]) >= 0) {\\n                    if (optional && this.input[this.pos] != ',') {\\n                        this.pos = start;\\n                        return null;\\n                    };\\n                    return this.input.substring(start, this.pos);\\n                } else {\\n                    this.pos++;\\n                    \\n                };\\n            };\\n        };\\n\\n        this.key_equals_value = function() {\\n            var key = this.key();\\n            if (this.tryMatch(\\\"=\\\")) {\\n                this.match(\\\"=\\\");\\n                var val = this.value();\\n                return [ key, val ];\\n            } else {\\n                throw \\\"... = value expected, equals sign missing:\\\"\\n                        + this.input.substring(this.pos);\\n            };\\n        };\\n\\n        this.key_value_list = function() {\\n            var kv = this.key_equals_value();\\n            this.currentEntry['entryTags'] = {};\\n            this.currentEntry['entryTags'][kv[0]] = kv[1];\\n            while (this.tryMatch(\\\",\\\")) {\\n                this.match(\\\",\\\");\\n                // fixes problems with commas at the end of a list\\n                if (this.tryMatch(\\\"}\\\")) {\\n                    break;\\n                }\\n                ;\\n                kv = this.key_equals_value();\\n                this.currentEntry['entryTags'][kv[0]] = kv[1];\\n            };\\n        };\\n\\n        this.entry_body = function(d) {\\n            this.currentEntry = {};\\n            this.currentEntry['citationKey'] = this.key(true);\\n            this.currentEntry['entryType'] = d.substring(1);\\n            if (this.currentEntry['citationKey'] != null) {            \\n                this.match(\\\",\\\");\\n            }\\n            this.key_value_list();\\n            this.entries.push(this.currentEntry);\\n        };\\n\\n        this.directive = function() {\\n            this.match(\\\"@\\\");\\n            return \\\"@\\\" + this.key();\\n        };\\n\\n        this.preamble = function() {\\n            this.currentEntry = {};\\n            this.currentEntry['entryType'] = 'PREAMBLE';\\n            this.currentEntry['entry'] = this.value_comment();\\n            this.entries.push(this.currentEntry);\\n        };\\n\\n        this.comment = function() {\\n            this.currentEntry = {};\\n            this.currentEntry['entryType'] = 'COMMENT';\\n            this.currentEntry['entry'] = this.value_comment();\\n            this.entries.push(this.currentEntry);\\n        };\\n\\n        this.entry = function(d) {\\n            this.entry_body(d);\\n        };\\n\\n        this.alernativeCitationKey = function () {\\n            this.entries.forEach(function (entry) {\\n                if (!entry.citationKey && entry.entryTags) {\\n                    entry.citationKey = '';\\n                    if (entry.entryTags.author) {\\n                        entry.citationKey += entry.entryTags.author.split(',')[0] += ', ';\\n                    }\\n                    entry.citationKey += entry.entryTags.year;\\n                }\\n            });\\n        }\\n\\n        this.bibtex = function() {\\n            while (this.matchAt()) {\\n                var d = this.directive();\\n                this.match(\\\"{\\\");\\n                if (d == \\\"@STRING\\\") {\\n                    this.string();\\n                } else if (d == \\\"@PREAMBLE\\\") {\\n                    this.preamble();\\n                } else if (d == \\\"@COMMENT\\\") {\\n                    this.comment();\\n                } else {\\n                    this.entry(d);\\n                }\\n                this.match(\\\"}\\\");\\n            };\\n\\n            this.alernativeCitationKey();\\n        };\\n    };\\n    \\n    exports.toJSON = function(bibtex) {\\n        var b = new BibtexParser();\\n        b.setInput(bibtex);\\n        b.bibtex();\\n        return b.entries;\\n    };\\n\\n    /* added during hackathon don't hate on me */\\n    exports.toBibtex = function(json) {\\n        var out = '';\\n        for ( var i in json) {\\n            out += \\\"@\\\" + json[i].entryType;\\n            out += '{';\\n            if (json[i].citationKey)\\n                out += json[i].citationKey + ', ';\\n            if (json[i].entry)\\n                out += json[i].entry ;\\n            if (json[i].entryTags) {\\n                var tags = '';\\n                for (var jdx in json[i].entryTags) {\\n                    if (tags.length != 0)\\n                        tags += ', ';\\n                    tags += jdx + '= {' + json[i].entryTags[jdx] + '}';\\n                }\\n                out += tags;\\n            }\\n            out += '}\\\\n\\\\n';\\n        }\\n        return out;\\n        \\n    };\\n\\n})(typeof exports === 'undefined' ? this['bibtexParse'] = {} : exports);\\n\\n/* end bibtexParse */\\n\",\"type\":\"application/javascript\",\"title\":\"$:/plugins/tiddlywiki/bibtex/bibtexParse.js\",\"module-type\":\"library\"},\"$:/plugins/tiddlywiki/bibtex/license\":{\"text\":\"\\nThe MIT License (MIT)\\nCopyright (c) 2013 ORCID, Inc.\\n\\nCopyright (c) 2010 Henrik Muehe\\n\\nPermission is hereby granted, free of charge, to any person obtaining a copy\\nof this software and associated documentation files (the \\\"Software\\\"), to deal\\nin the Software without restriction, including without limitation the rights\\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\\ncopies of the Software, and to permit persons to whom the Software is\\nfurnished to do so, subject to the following conditions:\\n\\nThe above copyright notice and this permission notice shall be included in\\nall copies or substantial portions of the Software.\\n\\nTHE SOFTWARE IS PROVIDED \\\"AS IS\\\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\\nTHE SOFTWARE.\\n\",\"type\":\"text/plain\",\"title\":\"$:/plugins/tiddlywiki/bibtex/license\"}}}"});