!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ohm=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var ohm = _dereq_('../src/main.js');
ohm._ohmGrammarFactory =
(function(ohm, optNamespace) {
  var b = ohm._builder();
  b.setName('Ohm');
  b.setRuleDescription(undefined); b.define('Grammars', b.many(b.app('Grammar'), 0));
  b.setRuleDescription(undefined); b.define('Grammar', b.seq(b.bind(b.app('ident'), 'n'), b.bind(b.opt(b.app('SuperGrammar')), 's'), b.prim('{'), b.bind(b.many(b.app('Rule'), 0), 'rs'), b.prim('}')));
  b.inline('SuperGrammar_qualified', b.seq(b.prim('<:'), b.bind(b.app('ident'), 'ns'), b.prim('.'), b.bind(b.app('ident'), 'n')));
  b.inline('SuperGrammar_unqualified', b.seq(b.prim('<:'), b.bind(b.app('ident'), 'n')));
  b.setRuleDescription(undefined); b.define('SuperGrammar', b.alt(b.app('SuperGrammar_qualified'), b.app('SuperGrammar_unqualified')));
  b.inline('Rule_define', b.seq(b.bind(b.app('ident'), 'n'), b.bind(b.opt(b.app('ruleDescr')), 'd'), b.prim('='), b.bind(b.app('Alt'), 'b')));
  b.inline('Rule_override', b.seq(b.bind(b.app('ident'), 'n'), b.prim(':='), b.bind(b.app('Alt'), 'b')));
  b.inline('Rule_extend', b.seq(b.bind(b.app('ident'), 'n'), b.prim('+='), b.bind(b.app('Alt'), 'b')));
  b.setRuleDescription(undefined); b.define('Rule', b.alt(b.app('Rule_define'), b.app('Rule_override'), b.app('Rule_extend')));
  b.inline('Alt_rec', b.seq(b.bind(b.app('Term'), 'x'), b.prim('|'), b.bind(b.app('Alt'), 'y')));
  b.setRuleDescription(undefined); b.define('Alt', b.alt(b.app('Alt_rec'), b.app('Term')));
  b.inline('Term_inline', b.seq(b.bind(b.app('Seq'), 'x'), b.prim('{'), b.bind(b.app('name'), 'n'), b.prim('}')));
  b.setRuleDescription(undefined); b.define('Term', b.alt(b.app('Term_inline'), b.app('Seq')));
  b.setRuleDescription(undefined); b.define('Seq', b.many(b.app('Factor'), 0));
  b.inline('Factor_bind', b.seq(b.bind(b.app('Iter'), 'x'), b.prim(':'), b.bind(b.app('ident'), 'n')));
  b.setRuleDescription(undefined); b.define('Factor', b.alt(b.app('Factor_bind'), b.app('Iter')));
  b.inline('Iter_star', b.seq(b.bind(b.app('Pred'), 'x'), b.prim('*')));
  b.inline('Iter_plus', b.seq(b.bind(b.app('Pred'), 'x'), b.prim('+')));
  b.inline('Iter_opt', b.seq(b.bind(b.app('Pred'), 'x'), b.prim('?')));
  b.setRuleDescription(undefined); b.define('Iter', b.alt(b.app('Iter_star'), b.app('Iter_plus'), b.app('Iter_opt'), b.app('Pred')));
  b.inline('Pred_not', b.seq(b.prim('~'), b.bind(b.app('Base'), 'x')));
  b.inline('Pred_lookahead', b.seq(b.prim('&'), b.bind(b.app('Base'), 'x')));
  b.setRuleDescription(undefined); b.define('Pred', b.alt(b.app('Pred_not'), b.app('Pred_lookahead'), b.app('Base')));
  b.inline('Base_application', b.seq(b.bind(b.app('ident'), 'ruleName'), b.not(b.alt(b.seq(b.opt(b.app('ruleDescr')), b.prim('=')), b.prim(':='), b.prim('+=')))));
  b.inline('Base_prim', b.alt(b.app('keyword'), b.app('string'), b.app('regExp'), b.app('number')));
  b.inline('Base_lst', b.seq(b.prim('['), b.bind(b.app('Alt'), 'x'), b.prim(']')));
  b.inline('Base_str', b.seq(b.prim('"'), b.bind(b.app('Alt'), 'x'), b.prim('"')));
  b.inline('Base_paren', b.seq(b.prim('('), b.bind(b.app('Alt'), 'x'), b.prim(')')));
  b.inline('Base_obj', b.seq(b.prim('{'), b.bind(b.opt(b.prim('...')), 'lenient'), b.prim('}')));
  b.inline('Base_objWithProps', b.seq(b.prim('{'), b.bind(b.app('Props'), 'ps'), b.bind(b.opt(b.seq(b.prim(','), b.prim('...'))), 'lenient'), b.prim('}')));
  b.setRuleDescription(undefined); b.define('Base', b.alt(b.app('Base_application'), b.app('Base_prim'), b.app('Base_lst'), b.app('Base_str'), b.app('Base_paren'), b.app('Base_obj'), b.app('Base_objWithProps')));
  b.setRuleDescription(undefined); b.define('Prop', b.seq(b.bind(b.alt(b.app('name'), b.app('string')), 'n'), b.prim(':'), b.bind(b.app('Base'), 'p')));
  b.inline('Props_rec', b.seq(b.bind(b.app('Prop'), 'p'), b.prim(','), b.bind(b.app('Props'), 'ps')));
  b.inline('Props_base', b.bind(b.app('Prop'), 'p'));
  b.setRuleDescription(undefined); b.define('Props', b.alt(b.app('Props_rec'), b.app('Props_base')));
  b.setRuleDescription(' rule description for use in error messages'); b.define('ruleDescr', b.seq(b.prim('--'), b.bind(b.app('ruleDescrText'), 't'), b.prim('\n')));
  b.setRuleDescription(undefined); b.define('ruleDescrText', b.many(b.seq(b.not(b.prim('\n')), b.app('_')), 0));
  b.inline('space_singleLine', b.seq(b.prim('//'), b.many(b.seq(b.not(b.prim('\n')), b.app('_')), 0), b.prim('\n')));
  b.inline('space_multiLine', b.seq(b.prim('/*'), b.many(b.seq(b.not(b.prim('*/')), b.app('_')), 0), b.prim('*/')));
  b.extend('space', b.alt(b.app('space_singleLine'), b.app('space_multiLine')));
  b.setRuleDescription(' name'); b.define('name', b.seq(b.app('nameFirst'), b.many(b.app('nameRest'), 0)));
  b.setRuleDescription(undefined); b.define('nameFirst', b.alt(b.prim('_'), b.app('letter')));
  b.setRuleDescription(undefined); b.define('nameRest', b.alt(b.prim('_'), b.app('alnum')));
  b.setRuleDescription(' identifier'); b.define('ident', b.seq(b.not(b.app('keyword')), b.bind(b.app('name'), 'n')));
  b.inline('keyword_undefined', b.seq(b.prim('undefined'), b.not(b.app('nameRest'))));
  b.inline('keyword_null', b.seq(b.prim('null'), b.not(b.app('nameRest'))));
  b.inline('keyword_true', b.seq(b.prim('true'), b.not(b.app('nameRest'))));
  b.inline('keyword_false', b.seq(b.prim('false'), b.not(b.app('nameRest'))));
  b.setRuleDescription(undefined); b.define('keyword', b.alt(b.app('keyword_undefined'), b.app('keyword_null'), b.app('keyword_true'), b.app('keyword_false')));
  b.setRuleDescription(' string literal'); b.define('string', b.seq(b.prim("'"), b.bind(b.many(b.app('sChar'), 0), 'cs'), b.prim("'")));
  b.setRuleDescription(undefined); b.define('sChar', b.alt(b.seq(b.prim('\\x'), b.app('hexDigit'), b.app('hexDigit')), b.seq(b.prim('\\u'), b.app('hexDigit'), b.app('hexDigit'), b.app('hexDigit'), b.app('hexDigit')), b.seq(b.prim('\\'), b.app('_')), b.seq(b.not(b.prim("'")), b.not(b.prim('\n')), b.app('_'))));
  b.setRuleDescription(' regular expression'); b.define('regExp', b.seq(b.prim('/'), b.bind(b.app('reCharClass'), 'e'), b.prim('/')));
  b.setRuleDescription(undefined); b.define('reCharClass', b.seq(b.prim('['), b.many(b.alt(b.prim('\\]'), b.seq(b.not(b.prim(']')), b.app('_'))), 0), b.prim(']')));
  b.setRuleDescription(' number'); b.define('number', b.seq(b.opt(b.prim('-')), b.many(b.app('digit'), 1)));
  return b.build(optNamespace);
});

},{"../src/main.js":17}],2:[function(_dereq_,module,exports){
exports.objectUtils = _dereq_('./objectUtils.js')
exports.stringUtils = _dereq_('./stringUtils.js')
exports.equals = _dereq_('./equals.js')
exports.browser = _dereq_('./browser.js')

},{"./browser.js":3,"./equals.js":4,"./objectUtils.js":5,"./stringUtils.js":6}],3:[function(_dereq_,module,exports){
var thisModule = exports

// --------------------------------------------------------------------
// Logging
// --------------------------------------------------------------------

var subscribed = {}

exports.log = function(subject /* , ... */) {
  if (!subscribed[subject])
    return
  arguments[0] = '[' + subject + ']'
  console.log.apply(console, arguments)
}

exports.subscribe = function(subject) {
  subscribed[subject] = true
}

exports.unsubscribe = function(subject) {
  delete showing[subject]
}

// --------------------------------------------------------------------
// Asserts, errors, etc.
// --------------------------------------------------------------------

exports.error = function(/* arg1, arg2, ... */) {
  var args = Array.prototype.slice.call(arguments)
  console.error.apply(console, args)
  throw 'error: ' + args.join(' ')
}

exports.sanityCheck = function(name, condition) {
  if (!condition)
    thisModule.error('failed sanity check:', name)
}

// --------------------------------------------------------------------
// DOM utils
// --------------------------------------------------------------------

exports.prettyPrintNode = function(node, endNode, endOffset) {
  if (node instanceof Text) {
    if (node === endNode)
      return 'text{' + node.data.substr(0, endOffset) + '|' + node.data.substr(endOffset) + '}'
    else
      return 'text{' + node.data + '}'
  }

  var parts = [node.tagName, '{']
  for (var idx = 0; idx < node.childNodes.length; idx++) {
    if (node === endNode && endOffset == idx)
      parts.push('|')
    parts.push(thisModule.prettyPrintNode(node.childNodes.item(idx), endNode, endOffset))
  }
  if (node === endNode && endOffset == node.childNodes.length)
    parts.push('|')
  parts.push('}')
  return parts.join('')
}


},{}],4:[function(_dereq_,module,exports){
// Helpers

function doubleEquals(x, y) {
  return x == y
}

function tripleEquals(x, y) {
  return x === y
}

function isPrimitive(x) {
  var type = typeof x
  return type !== 'object'
}

function equals(x, y, deep, eqFn) {
  if (isPrimitive(x))
    return eqFn(x, y)
  for (var p in x)
    if (deep && !equals(x[p], y[p], deep, eqFn) ||
        !deep && !eqFn(x[p], y[p]))
      return false
  for (var p in y)
    if (y[p] !== undefined &&
        x[p] === undefined)
      return false
  return true
}

function haveSameContentsInAnyOrder(arr1, arr2, deep, eqFn) {
  if (!arr1 instanceof Array || !arr2 instanceof Array ||
      arr1.length !== arr2.length)
    return false
  for (var idx = 0; idx < arr1.length; idx++) {
    var x = arr1[idx]
    var foundX = arr2.some(function(y) {
      return equals(x, y, deep, eqFn)
    })
    if (!foundX)
      return false
  }
  return true
}

// Public methods

exports.equals = function(x, y) {
  return equals(x, y, false, doubleEquals)
}

exports.deepEquals = function(x, y) {
  return equals(x, y, true, doubleEquals)
}

exports.strictEquals = function(x, y) {
  return equals(x, y, false, tripleEquals)
}

exports.strictDeepEquals = function(x, y) {
  return equals(x, y, true, tripleEquals)
}

exports.haveSameContentsInAnyOrder = function(arr1, arr2) {
  return haveSameContentsInAnyOrder(arr1, arr2, true, doubleEquals)
}


},{}],5:[function(_dereq_,module,exports){
var thisModule = exports

exports.objectThatDelegatesTo = function(obj, optProperties) {
  function cons() {}
  cons.prototype = obj
  var ans = new cons()
  if (optProperties)
    thisModule.keysAndValuesDo(optProperties, function(k, v) {
      ans[k] = v
    })
  return ans
}

exports.formals = function(func) {
  return func.
    toString().
    match(/\((.*?)\)/)[0].
    replace(/ /g, '').
    slice(1, -1).
    split(',').
    filter(function(moduleName) { return moduleName != '' })
}

exports.keysDo = function(object, fn) {
  for (var p in object)
    if (object.hasOwnProperty(p))
      fn(p)
}

exports.valuesDo = function(object, fn) {
  thisModule.keysDo(object, function(p) { fn(object[p]) })
}

exports.keysAndValuesDo = function(object, fn) {
  thisModule.keysDo(object, function(p) { fn(p, object[p]) })
}

exports.keysIterator = function(object) {
  return function(fn) { self.keysDo(object, fn) }
}

exports.valuesIterator = function(object) {
  return function(fn) { self.valuesDo(object, fn) }
}

exports.keysAndValuesIterator = function(object) {
  return function(fn) { self.keysAndValuesDo(object, fn) }
}

exports.values = function(object) {
  var ans = []
  thisModule.keysDo(object, function(p) { ans.push(object[p]) })
  return ans
}

function StringBuffer() {
  this.strings = []
  this.lengthSoFar = 0
}

StringBuffer.prototype = {
  nextPutAll: function(s) {
    this.strings.push(s)
    this.lengthSoFar += s.length
  },

  contents: function()  {
    return this.strings.join('')
  }
}

exports.stringBuffer = function() {
  return new StringBuffer()
}

function ColumnStringBuffer() {
  this.lines = []
  this.newLine()
}

ColumnStringBuffer.prototype = {
  nextPutAll: function(s) {
    this.currentColumn().push(s)
  },

  contents: function() {
    // Convert columns from lists of strings to strings, and record column lengths
    var columnLengths = []
    this.lines.forEach(function(line) {
      for (var colIdx = 0; colIdx < line.length; colIdx++) {
        var column = line[colIdx]
        line[colIdx] = column.join('')
        if (columnLengths[colIdx] === undefined || columnLengths[colIdx] < line[colIdx].length)
          columnLengths[colIdx] = line[colIdx].length
      }
    })

    var sb = thisModule.stringBuffer()
    this.lines.forEach(function(line) {
      for (var colIdx = 0; colIdx < line.length; colIdx++) {
        var column = line[colIdx]
        sb.nextPutAll(column)
        var numSpaces = columnLengths[colIdx] - column.length
        while (numSpaces-- > 0)
          sb.nextPutAll(' ')
      }
      sb.nextPutAll('\n')
    })
    return sb.contents()
  },

  newLine: function() {
    this.lines.push([])
    this.newColumn()
  },

  newColumn: function() {
    this.currentLine().push([])
  },

  currentColumn: function() {
    var line = this.currentLine()
    return line[line.length - 1]
  },

  currentLine: function() {
    return this.lines[this.lines.length - 1]
  }
}

exports.columnStringBuffer = function() {
  return new ColumnStringBuffer()
}


},{}],6:[function(_dereq_,module,exports){
var objectUtils = _dereq_('./objectUtils.js')
var thisModule = exports

// Helpers

function pad(numberAsString, len) {
  var zeros = []
  for (var idx = 0; idx < numberAsString.length - len; idx++)
    zeros.push('0')
  return zeros.join('') + numberAsString
}

var escapeStringFor = {}
for (var c = 0; c < 128; c++)
  escapeStringFor[c] = String.fromCharCode(c)
escapeStringFor["'".charCodeAt(0)]  = "\\'"
escapeStringFor['"'.charCodeAt(0)]  = '\\"'
escapeStringFor['\\'.charCodeAt(0)] = '\\\\'
escapeStringFor['\b'.charCodeAt(0)] = '\\b'
escapeStringFor['\f'.charCodeAt(0)] = '\\f'
escapeStringFor['\n'.charCodeAt(0)] = '\\n'
escapeStringFor['\r'.charCodeAt(0)] = '\\r'
escapeStringFor['\t'.charCodeAt(0)] = '\\t'
escapeStringFor['\v'.charCodeAt(0)] = '\\v'

// Public methods

exports.escapeChar = function(c, optDelim) {
  var charCode = c.charCodeAt(0)
  if ((c == '"' || c == "'") && optDelim && c !== optDelim)
    return c
  else if (charCode < 128)
    return escapeStringFor[charCode]
  else if (128 <= charCode && charCode < 256)
    return '\\x' + pad(charCode.toString(16), 2)
  else
    return '\\u' + pad(charCode.toString(16), 4)
}

exports.unescapeChar = function(s) {
  if (s.charAt(0) == '\\')
    switch (s.charAt(1)) {
      case 'b':  return '\b'
      case 'f':  return '\f'
      case 'n':  return '\n'
      case 'r':  return '\r'
      case 't':  return '\t'
      case 'v':  return '\v'
      case 'x':  return String.fromCharCode(parseInt(s.substring(2, 4), 16))
      case 'u':  return String.fromCharCode(parseInt(s.substring(2, 6), 16))
      default:   return s.charAt(1)
    }
  else
    return s
}

function printOn(x, ws) {
  if (x instanceof Array) {
    ws.nextPutAll('[')
    for (var idx = 0; idx < x.length; idx++) {
      if (idx > 0)
        ws.nextPutAll(', ')
      printOn(x[idx], ws)
    }
    ws.nextPutAll(']')
  } else if (typeof x === 'string') {
    var hasSingleQuotes = x.indexOf("'") >= 0
    var hasDoubleQuotes = x.indexOf('"') >= 0
    var delim = hasSingleQuotes && !hasDoubleQuotes ? '"' : "'"
    ws.nextPutAll(delim)
    for (var idx = 0; idx < x.length; idx++)
      ws.nextPutAll(thisModule.escapeChar(x[idx], delim))
    ws.nextPutAll(delim)
  } else if (x === null) {
    ws.nextPutAll('null')
  } else if (typeof x === 'object' && !(x instanceof RegExp)) {
    ws.nextPutAll('{')
    var first = true
    objectUtils.keysAndValuesDo(x, function(k, v) {
      if (first)
        first = false
      else
        ws.nextPutAll(', ')
      printOn(k, ws)
      ws.nextPutAll(': ')
      printOn(v, ws)
    })
    ws.nextPutAll('}')
  } else
    ws.nextPutAll('' + x)
}

exports.printString = function(obj) {
  var ws = objectUtils.stringBuffer()
  printOn(obj, ws)
  return ws.contents()
}


},{"./objectUtils.js":5}],7:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Grammar = _dereq_('./Grammar.js');
var decls = _dereq_('./decls.js');
var pexprs = _dereq_('./pexprs.js');

var awlib = _dereq_('awlib');
var objectThatDelegatesTo = awlib.objectUtils.objectThatDelegatesTo;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Builder() {
  this.init();
}

Builder.prototype = {
  init: function() {
    this.name = undefined;
    this.superGrammar = Grammar.prototype;
    this.ruleDecls = [];
  },

  setName: function(name) {
    this.name = name;
  },

  setSuperGrammar: function(grammar) {
    this.superGrammar = grammar;
  },

  setRuleDescription: function(text) {
    this.ruleDescription = text;
  },

  define: function(ruleName, body) {
    this.ruleDecls.push(new decls.Define(ruleName, body, this.superGrammar, this.ruleDescription));
    this.ruleDescription = undefined;
  },

  override: function(ruleName, body) {
    this.ruleDecls.push(new decls.Override(ruleName, body, this.superGrammar));
  },

  inline: function(ruleName, body) {
    this.ruleDecls.push(new decls.Inline(ruleName, body, this.superGrammar));
    return this.app(ruleName);
  },

  extend: function(ruleName, body) {
    this.ruleDecls.push(new decls.Extend(ruleName, body, this.superGrammar));
  },

  build: function(optNamespace) {
    var superGrammar = this.superGrammar;
    var ruleDict = objectThatDelegatesTo(superGrammar.ruleDict);
    this.ruleDecls.forEach(function(ruleDecl) {
      ruleDecl.performChecks();
      ruleDecl.install(ruleDict);
    });

    var grammar = new Grammar(ruleDict);
    grammar.superGrammar = superGrammar;
    grammar.ruleDecls = this.ruleDecls;
    if (this.name) {
      grammar.name = this.name;
      if (optNamespace) {
        grammar.namespaceName = optNamespace.name;
        optNamespace.install(this.name, grammar);
      }
    }
    this.init();
    return grammar;
  },

  prim: function(x) { return pexprs.makePrim(x); },
  alt: function(/* term1, term1, ... */) {
    var terms = [];
    for (var idx = 0; idx < arguments.length; idx++) {
      var arg = arguments[idx];
      if (arg instanceof pexprs.Alt) {
        terms = terms.concat(arg.terms);
      } else {
        terms.push(arg);
      }
    }
    return terms.length === 1 ? terms[0] : new pexprs.Alt(terms);
  },
  seq: function(/* factor1, factor2, ... */) {
    var factors = [];
    for (var idx = 0; idx < arguments.length; idx++) {
      var arg = arguments[idx];
      if (arg instanceof pexprs.Seq) {
        factors = factors.concat(arg.factors);
      } else {
        factors.push(arg);
      }
    }
    return factors.length === 1 ? factors[0] : new pexprs.Seq(factors);
  },
  bind: function(expr, name) { return new pexprs.Bind(expr, name); },
  many: function(expr, minNumMatches) { return new pexprs.Many(expr, minNumMatches); },
  opt: function(expr) { return new pexprs.Opt(expr); },
  not: function(expr) { return new pexprs.Not(expr); },
  la: function(expr) { return new pexprs.Lookahead(expr); },
  str: function(expr) { return new pexprs.Str(expr); },
  lst: function(expr) { return new pexprs.List(expr); },
  obj: function(properties, isLenient) { return new pexprs.Obj(properties, !!isLenient); },
  app: function(ruleName) { return new pexprs.Apply(ruleName); }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Builder;


},{"./Grammar.js":8,"./decls.js":15,"./pexprs.js":27,"awlib":2}],8:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var errors = _dereq_('./errors.js');
var InputStream = _dereq_('./InputStream.js');
var MatchFailure = _dereq_('./MatchFailure.js');
var pexprs = _dereq_('./pexprs.js');
var skipSpaces = _dereq_('./skipSpaces.js');

var awlib = _dereq_('awlib');
var browser = awlib.browser;
var keysDo = awlib.objectUtils.keysDo;
var valuesDo = awlib.objectUtils.valuesDo;
var formals = awlib.objectUtils.formals;
var makeStringBuffer = awlib.objectUtils.stringBuffer;
var makeColumnStringBuffer = awlib.objectUtils.columnStringBuffer;
var printString = awlib.stringUtils.printString;
var equals = awlib.equals.equals;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Grammar(ruleDict) {
  this.ruleDict = ruleDict;
}

Grammar.prototype = {
  ruleDict: new (function() {
    this._ = pexprs.anything;
    this.end = new pexprs.Not(pexprs.anything);
    this.space = pexprs.makePrim(/[\s]/);
    this.space.description = 'space';
    this.spaces = new pexprs.Alt([
        new pexprs.Seq([new pexprs.Apply('spaces'), new pexprs.Apply('space')]),
        new pexprs.Seq([])]);
    this.alnum = pexprs.makePrim(/[0-9a-zA-Z]/);
    this.space.description = 'alpha-numeric character';
    this.letter = pexprs.makePrim(/[a-zA-Z]/);
    this.letter.description = 'letter';
    this.lower = pexprs.makePrim(/[a-z]/);
    this.lower.description = 'lower-case letter';
    this.upper = pexprs.makePrim(/[A-Z]/);
    this.upper.description = 'upper-case letter';
    this.digit = pexprs.makePrim(/[0-9]/);
    this.digit.description = 'digit';
    this.hexDigit = pexprs.makePrim(/[0-9a-fA-F]/);
    this.hexDigit.description = 'hexadecimal digit';
  })(),

  match: function(obj, startRule, optThrowOnFail) {
    return this.matchContents([obj], startRule, optThrowOnFail);
  },

  matchContents: function(obj, startRule, optThrowOnFail) {
    var inputStream = InputStream.newFor(obj);
    var thunk = new pexprs.Apply(startRule).eval(optThrowOnFail, undefined, this.ruleDict, inputStream, undefined);

    var succeeded;
    if (thunk === common.fail) {
      succeeded = false;
    } else {
      // This match only succeeded if the start rule consumed all of the input.
      if (common.isSyntactic(startRule)) {
        skipSpaces(this.ruleDict, inputStream);
      }
      succeeded = pexprs.end.eval(optThrowOnFail, false, this.ruleDict, inputStream, undefined) !== common.fail;
    }

    if (succeeded) {
      var assertSemanticActionNamesMatch = this.assertSemanticActionNamesMatch.bind(this);
      var ans = function(actionDict) {
        assertSemanticActionNamesMatch(actionDict);
        return thunk.force(actionDict, {});
      };
      ans.toString = function() { return '[ohm thunk]'; };
      return ans;
    } else if (optThrowOnFail) {
      throw new MatchFailure(inputStream, this.ruleDict);
    } else {
      return false;
    }
  },

  assertSemanticActionNamesMatch: function(actionDict) {
    var self = this;
    var ruleDict = this.ruleDict;
    var ok = true;
    keysDo(ruleDict, function(ruleName) {
      if (actionDict[ruleName] === undefined) {
        return;
      }
      var actual = formals(actionDict[ruleName]).sort();
      var expected = self.semanticActionArgNames(ruleName);
      if (!equals(actual, expected)) {
        ok = false;
        console.log('semantic action for rule', ruleName, 'has the wrong argument names');
        console.log('  expected', expected);
        console.log('    actual', actual);
      }
    });
    if (!ok) {
      browser.error('one or more semantic actions have the wrong argument names -- see console for details');
    }
  },

  semanticActionArgNames: function(ruleName) {
    if (this.superGrammar && this.superGrammar.ruleDict[ruleName]) {
      return this.superGrammar.semanticActionArgNames(ruleName);
    } else {
      var body = this.ruleDict[ruleName];
      var names = body.getBindingNames();
      return names.length > 0 || body.producesValue() ? ['env'] : [];
    }
  },

  toRecipe: function() {
    var ws = makeStringBuffer();
    ws.nextPutAll('(function(ohm, optNamespace) {\n');
    ws.nextPutAll('  var b = ohm._builder();\n');
    ws.nextPutAll('  b.setName('); ws.nextPutAll(printString(this.name)); ws.nextPutAll(');\n');
    if (this.superGrammar.name && this.superGrammar.namespaceName) {
      ws.nextPutAll('  b.setSuperGrammar(ohm.namespace(');
      ws.nextPutAll(printString(this.superGrammar.namespaceName));
      ws.nextPutAll(').getGrammar(');
      ws.nextPutAll(printString(this.superGrammar.name));
      ws.nextPutAll('));\n');
    }
    for (var idx = 0; idx < this.ruleDecls.length; idx++) {
      ws.nextPutAll('  ');
      this.ruleDecls[idx].outputRecipe(ws);
      ws.nextPutAll(';\n');
    }
    ws.nextPutAll('  return b.build(optNamespace);\n');
    ws.nextPutAll('});');
    return ws.contents();
  },

  toSemanticActionTemplate: function(/* entryPoint1, entryPoint2, ... */) {
    var entryPoints = arguments.length > 0 ? arguments : Object.keys(this.ruleDict);
    var rulesToBeIncluded = this.rulesThatNeedSemanticAction(entryPoints);
    
    // TODO: add the super-grammar's templates at the right place, e.g., a case for AddExpr_plus should appear next to
    // other cases of AddExpr.

    var self = this;
    var buffer = makeColumnStringBuffer();
    buffer.nextPutAll('{');

    var first = true;
    for (var ruleName in rulesToBeIncluded) {
      var body = this.ruleDict[ruleName];
      if (first) {
        first = false;
      } else {
        buffer.nextPutAll(',');
      }
      buffer.newLine();
      buffer.nextPutAll('  ');
      buffer.newColumn();
      self.addSemanticActionTemplate(ruleName, body, buffer);
    }

    buffer.newLine();
    buffer.nextPutAll('}');
    return buffer.contents();
  },

  addSemanticActionTemplate: function(ruleName, body, buffer) {
    buffer.nextPutAll(ruleName);
    buffer.nextPutAll(': ');
    buffer.newColumn();
    buffer.nextPutAll('function(');
    buffer.nextPutAll(this.semanticActionArgNames(ruleName).join(', '));
    buffer.nextPutAll(') ');
    buffer.newColumn();
    buffer.nextPutAll('{');

    var envProperties = body.getBindingNames();
    if (envProperties.length === 0 && body.producesValue()) {
      envProperties = ['value'];
    }
    if (envProperties.length > 0) {
      buffer.nextPutAll(' /* ');
      buffer.nextPutAll(envProperties.join(', '));
      buffer.nextPutAll(' */ ');
    }
    buffer.nextPutAll('}');
  },

  rulesThatNeedSemanticAction: function(entryPoints) {
    var self = this;
    function getBody(ruleName) {
      if (self.ruleDict[ruleName] === undefined) {
        throw new errors.UndeclaredRuleError(ruleName, self.name);
      } else {
        return self.ruleDict[ruleName];
      }
    }

    var rules = {};
    for (var idx = 0; idx < entryPoints.length; idx++) {
      var ruleName = entryPoints[idx];
      getBody(ruleName);  // to make sure the rule exists
      rules[ruleName] = true;
    }

    var done = false;
    while (!done) {
      done = true;
      for (var ruleName in rules) {
        var addedNewRule = getBody(ruleName).addRulesThatNeedSemanticAction(rules, true);
        done &= !addedNewRule;
      }
    }

    return rules;
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Grammar;


},{"./InputStream.js":9,"./MatchFailure.js":11,"./common.js":14,"./errors.js":16,"./pexprs.js":27,"./skipSpaces.js":28,"awlib":2}],9:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var PosInfo = _dereq_('./PosInfo.js');
var Grammar = _dereq_('./Grammar.js');

var awlib = _dereq_('awlib');
var objectThatDelegatesTo = awlib.objectUtils.objectThatDelegatesTo;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function InputStream() {
  throw 'InputStream cannot be instantiated -- it\'s abstract';
}

InputStream.newFor = function(obj) {
  if (typeof obj === 'string') {
    return new StringInputStream(obj);
  } else if (obj instanceof Array) {
    return new ListInputStream(obj);
  } else {
    throw 'cannot make input stream for ' + obj;
  }
};

InputStream.prototype = {
  init: function(source) {
    this.source = source;
    this.pos = 0;
    this.posInfos = [];
    this.failures = null;
    this.failuresPos = -1;
  },

  recordFailure: function(pos, expr) {
    if (pos > this.failuresPos) {
      this.failures = {expr: expr, next: null};
      this.failuresPos = pos;
    } else if (pos === this.failuresPos) {
      this.failures = {expr: expr, next: this.failures};
    }
  },

  getCurrentPosInfo: function() {
    var currPos = this.pos;
    var posInfo = this.posInfos[currPos];
    return posInfo || (this.posInfos[currPos] = new PosInfo(currPos));
  },

  atEnd: function() {
    return this.pos === this.source.length;
  },

  next: function() {
    if (this.atEnd()) {
      return common.fail;
    } else {
      return this.source[this.pos++];
    }
  },

  matchExactly: function(x) {
    return this.next() === x ? true : common.fail;
  },

  interval: function(startIdx, endIdx) {
    return this.source.slice(startIdx, endIdx);
  },

  getFailuresPos: function() {
    return this.failuresPos;
  }
};

function StringInputStream(source) {
  this.init(source);
}

StringInputStream.prototype = objectThatDelegatesTo(InputStream.prototype, {
  matchString: function(s) {
    for (var idx = 0; idx < s.length; idx++) {
      if (this.matchExactly(s[idx]) === common.fail) {
        return common.fail;
      }
    }
    return true;
  },

  matchRegExp: function(e) {
    // IMPORTANT: e must be a non-global, one-character expression, e.g., /./ and /[0-9]/
    var c = this.next();
    return c !== common.fail && e.test(c) ? true : common.fail;
  }
});

function ListInputStream(source) {
  this.init(source);
}

ListInputStream.prototype = objectThatDelegatesTo(InputStream.prototype, {
  matchString: function(s) {
    return this.matchExactly(s);
  },

  matchRegExp: function(e) {
    return this.matchExactly(e);
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = InputStream;


},{"./Grammar.js":8,"./PosInfo.js":13,"./common.js":14,"awlib":2}],10:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var InputStream = _dereq_('./InputStream.js');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Interval(source, startIdx, endIdx) {
  this.source = source;
  this.startIdx = startIdx;
  this.endIdx = endIdx;
}

Object.defineProperties(Interval.prototype, {
  'contents': {
    get: function() {
      if (this._contents === undefined) {
        this._contents = InputStream.newFor(this.source).interval(this.startIdx, this.endIdx);
      }
      return this._contents;
    },
    enumerable: true
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Interval;


},{"./InputStream.js":9}],11:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');

var awlib = _dereq_('awlib');
var makeStringBuffer = awlib.objectUtils.stringBuffer;
var printString = awlib.stringUtils.printString;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function toErrorInfo(pos, str) {
  var lineNum = 1;
  var colNum = 1;

  var currPos = 0;
  var lineStartPos = 0;

  while (currPos < pos) {
    var c = str.charAt(currPos++);
    if (c === '\n') {
      lineNum++;
      colNum = 1;
      lineStartPos = currPos;
    } else if (c !== '\r') {
      colNum++;
    }
  }

  var lineEndPos = str.indexOf('\n', lineStartPos);
  if (lineEndPos < 0) {
    lineEndPos = str.length;
  }

  return {
    lineNum: lineNum,
    colNum: colNum,
    line: str.substr(lineStartPos, lineEndPos - lineStartPos)
  };
}

function MatchFailure(inputStream, ruleDict) {
  this.inputStream = inputStream;
  this.ruleDict = ruleDict;
}

MatchFailure.prototype.getPos = function() {
  return this.inputStream.failuresPos;
};

MatchFailure.prototype.toString = function() {
 if (typeof this.inputStream.source !== 'string') {
    return 'error at position ' + this.getPos();
  } else {
    var text = makeStringBuffer();
    var errorInfo = toErrorInfo(this.getPos(), this.inputStream.source);
    text.nextPutAll(this.getLineAndColText());
    text.nextPutAll(': expected ');
    text.nextPutAll(this.getExpectedText());
    return text.contents();
  }
};

MatchFailure.prototype.getExtendedErrorMessage = function() {
 if (typeof this.inputStream.source !== 'string') {
    return 'error at position ' + this.getPos();
  } else {
    var text = makeStringBuffer();
    var errorInfo = toErrorInfo(this.getPos(), this.inputStream.source);
    var lineAndColText = this.getLineAndColText() + ': ';
    text.nextPutAll(lineAndColText);
    text.nextPutAll(errorInfo.line);
    text.nextPutAll('\n');
    for (var idx = 1; idx < lineAndColText.length + errorInfo.colNum; idx++) {
      text.nextPutAll(' ');
    }
    text.nextPutAll('^');
  }
  text.nextPutAll('\nExpected: ');
  text.nextPutAll(this.getExpectedText());
  return text.contents();
};

MatchFailure.prototype.printExtendedErrorMessage = function() {
  console.log(this.getExtendedErrorMessage());
};

MatchFailure.prototype.getLineAndColText = function() {
  var errorInfo = toErrorInfo(this.getPos(), this.inputStream.source);
  return 'Line ' + errorInfo.lineNum + ', col ' + errorInfo.colNum;
};

MatchFailure.prototype.getExpectedText = function() {
  var text = makeStringBuffer();
  var expected = this.getExpectedExprs();
  for (var idx = 0; idx < expected.length; idx++) {
    if (idx > 0) {
      if (idx === expected.length - 1) {
        text.nextPutAll(expected.length > 2 ? ', or ' : ' or ');
      } else {
        text.nextPutAll(', ');
      }
    }
    text.nextPutAll(expected[idx]);
  }
  return text.contents();
};

MatchFailure.prototype.getExpectedExprs = function() {
  var expected = {};
  for (var failure = this.inputStream.failures; failure !== null; failure = failure.next) {
    expected[failure.expr.toExpected(this.ruleDict)] = true;
  }
  return Object.keys(expected).reverse();
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = MatchFailure;


},{"./common.js":14,"awlib":2}],12:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var ohm = _dereq_('./main.js');
var errors = _dereq_('./errors.js');

var awlib = _dereq_('awlib');
var browser = awlib.browser;

// --------------------------------------------------------------------
// Namespaces
// --------------------------------------------------------------------

function Namespace(name) {
  this.name = name;
  this.grammars = {};
}

Namespace.prototype = {
  install: function(name, grammar) {
    if (this.grammars[name]) {
      throw new errors.DuplicateGrammarDeclarationError(name, this.name);
    } else {
      this.grammars[name] = grammar;
    }
    return this;
  },

  getGrammar: function(name) {
    if (this.grammars[name]) {
      return this.grammars[name];
    } else {
      throw new errors.UndeclaredGrammarError(name, this.name);
    }
  },

  loadGrammarsFromScriptElement: function(element) {
    browser.sanityCheck('script tag\'s type attribute must be "text/ohm-js"', element.type === 'text/ohm-js');
    ohm.makeGrammars(element.innerHTML, this);
    return this;
  },

  make: function(recipe) {
    return recipe(ohm, this);
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Namespace;


},{"./errors.js":16,"./main.js":17,"awlib":2}],13:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function PosInfo() {
  this.ruleStack = [];
  this.activeRules = {};  // redundant (could be generated from ruleStack) but useful for performance reasons
  this.memo = {};
}

PosInfo.prototype = {
  isActive: function(ruleName) {
    return this.activeRules[ruleName];
  },

  enter: function(ruleName) {
    this.ruleStack.push(ruleName);
    this.activeRules[ruleName] = true;
  },

  exit: function(ruleName) {
    this.ruleStack.pop();
    this.activeRules[ruleName] = false;
  },

  shouldUseMemoizedResult: function(memoRec) {
    var involvedRules = memoRec.involvedRules;
    for (var ruleName in involvedRules) {
      if (involvedRules[ruleName] && this.activeRules[ruleName]) {
        return false;
      }
    }
    return true;
  },

  getCurrentLeftRecursion: function() {
    return this.leftRecursionStack ? this.leftRecursionStack[this.leftRecursionStack.length - 1] : undefined;
  },

  startLeftRecursion: function(ruleName) {
    if (!this.leftRecursionStack) {
      this.leftRecursionStack = [];
    }
    this.leftRecursionStack.push({name: ruleName, value: common.fail, pos: -1, involvedRules: {}});
    this.updateInvolvedRules();
  },

  endLeftRecursion: function(ruleName) {
    this.leftRecursionStack.pop();
  },

  updateInvolvedRules: function() {
    var currentLeftRecursion = this.getCurrentLeftRecursion();
    var involvedRules = currentLeftRecursion.involvedRules;
    var lrRuleName = currentLeftRecursion.name;
    var idx = this.ruleStack.length - 1;
    while (true) {
      var ruleName = this.ruleStack[idx--];
      if (ruleName === lrRuleName) {
        break;
      }
      involvedRules[ruleName] = true;
    }
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = PosInfo;


},{"./common.js":14}],14:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.abstract = function() {
  throw 'this method is abstract!';
};

exports.getDuplicates = function(array) {
  var duplicates = [];
  for (var idx = 0; idx < array.length; idx++) {
    var x = array[idx];
    if (array.lastIndexOf(x) !== idx && duplicates.indexOf(x) < 0) {
      duplicates.push(x);
    }
  }
  return duplicates;
};

exports.fail = {};

exports.isSyntactic = function(ruleName) {
  var firstChar = ruleName[0];
  return 'A' <= firstChar && firstChar <= 'Z';
};


},{}],15:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');
var errors = _dereq_('./errors.js');

var awlib = _dereq_('awlib');
var objectThatDelegatesTo = awlib.objectUtils.objectThatDelegatesTo;
var printString = awlib.stringUtils.printString;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function outputRecipe(decl, ws) {
  ws.nextPutAll('b.');
  ws.nextPutAll(decl.kind);
  ws.nextPutAll('(');
  ws.nextPutAll(printString(decl.name));
  ws.nextPutAll(', ');
  decl.body.outputRecipe(ws);
  ws.nextPutAll(')');
}

function RuleDecl() {
  throw 'RuleDecl cannot be instantiated -- it\'s abstract';
}

RuleDecl.prototype = {
  performChecks: common.abstract,

  performCommonChecks: function(name, body) {
    body.assertNoDuplicateBindings(name);
    body.assertNoUselessBindings(name);
    body.assertChoicesHaveUniformBindings(name);
  },

  install: common.abstract,

  outputRecipe: function(ws) { outputRecipe(this, ws); }
};

function Define(name, body, superGrammar, description) {
  this.name = name;
  this.body = body;
  this.superGrammar = superGrammar;
  this.description = description;
}

Define.prototype = objectThatDelegatesTo(RuleDecl.prototype, {
  kind: 'define',

  performChecks: function() {
    if (this.superGrammar.ruleDict[this.name]) {
      throw new errors.DuplicateRuleDeclarationError(this.name, this.superGrammar.name);
    }
    this.performCommonChecks(this.name, this.body);
  },

  outputRecipe: function(ws) {
    ws.nextPutAll('b.setRuleDescription(');
    ws.nextPutAll(printString(this.description));
    ws.nextPutAll('); ');
    outputRecipe(this, ws);
  },

  install: function(ruleDict) {
    this.body.description = this.description;
    ruleDict[this.name] = this.body;
  }
});

function Override(name, body, superGrammar) {
  this.name = name;
  this.body = body;
  this.superGrammar = superGrammar;
}

Override.prototype = objectThatDelegatesTo(RuleDecl.prototype, {
  kind: 'override',

  performChecks: function() {
    var overridden = this.superGrammar.ruleDict[this.name];
    if (!overridden) {
      throw new errors.UndeclaredRuleError(this.name, this.superGrammar.name);
    }
    if (overridden.getBindingNames().length === 0 && overridden.producesValue() && !this.body.producesValue()) {
      throw new errors.RuleMustProduceValueError(this.name, 'overriding');
    }
    this.performCommonChecks(this.name, this.body);
  },

  install: function(ruleDict) {
    this.body.description = this.superGrammar.ruleDict[this.name].description;
    ruleDict[this.name] = this.body;
  }
});

function Inline(name, body, superGrammar) {
  this.name = name;
  this.body = body;
  this.superGrammar = superGrammar;
}

Inline.prototype = objectThatDelegatesTo(RuleDecl.prototype, {
  kind: 'inline',

  performChecks: function() {
    // TODO: consider relaxing this check, e.g., make it ok to override an inline rule if the nesting rule is
    // an override. But only if the inline rule that's being overridden is nested inside the nesting rule that
    // we're overriding? Hopefully there's a much less complicated way to do this :)
    if (this.superGrammar.ruleDict[this.name]) {
      throw new errors.DuplicateRuleDeclarationError(this.name, this.superGrammar.name);
    }
    this.performCommonChecks(this.name, this.body);
  },

  install: function(ruleDict) {
    ruleDict[this.name] = this.body;
  }
});

function Extend(name, body, superGrammar) {
  this.name = name;
  this.base = superGrammar.ruleDict[name];
  if (!this.base) {
    throw new errors.UndeclaredRuleError(name, superGrammar.name);
  }
  this.body = body;
  this.extendedBody = new pexprs.ExtendAlt(this.body, this.base);
  this.superGrammar = superGrammar;
}

Extend.prototype = objectThatDelegatesTo(RuleDecl.prototype, {
  kind: 'extend',

  performChecks: function() {
    if (this.base.getBindingNames().length === 0 && this.base.producesValue() && !this.body.producesValue()) {
      throw new errors.RuleMustProduceValueError(this.name, 'extending');
    }
    this.performCommonChecks(this.name, this.extendedBody);
  },

  install: function(ruleDict) {
    this.extendedBody.description = this.superGrammar.ruleDict[this.name].description;
    ruleDict[this.name] = this.extendedBody;
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.RuleDecl = RuleDecl;
exports.Define = Define;
exports.Override = Override;
exports.Inline = Inline;
exports.Extend = Extend;


},{"./common.js":14,"./errors.js":16,"./pexprs.js":27,"awlib":2}],16:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

// ----------------- grammars -----------------

// Undeclarated grammar

exports.UndeclaredGrammarError = function(grammarName, optNamespaceName) {
  this.grammarName = grammarName;
  this.namespaceName = optNamespaceName;
};

exports.UndeclaredGrammarError.prototype.toString = function() {
  return this.namespaceName ?
    ['grammar', this.grammarName, 'is not declared in namespace', this.namespaceName].join(' ') :
    ['undeclared grammar', this.grammarName].join(' ');
};

// Duplicate grammar declaration

exports.DuplicateGrammarDeclarationError = function(grammarName, namespaceName) {
  this.grammarName = grammarName;
  this.namespaceName = namespaceName;
};

exports.DuplicateGrammarDeclarationError.prototype.toString = function() {
  return ['grammar', this.grammarName, 'is already declared in namespace', this.namespaceName].join(' ');
};

// ----------------- rules -----------------

// Undeclared rule

exports.UndeclaredRuleError = function(ruleName, optGrammarName) {
  this.ruleName = ruleName;
  this.grammarName = optGrammarName;
};

exports.UndeclaredRuleError.prototype.toString = function() {
  return this.grammarName ?
    ['rule', this.ruleName, 'is not declared in grammar', this.grammarName].join(' ') :
    ['undeclared rule', this.ruleName].join(' ');
};

// Duplicate rule declaration

exports.DuplicateRuleDeclarationError = function(ruleName, grammarName) {
  this.ruleName = ruleName;
  this.grammarName = grammarName;
};

exports.DuplicateRuleDeclarationError.prototype.toString = function() {
  return ['rule', this.ruleName, 'is already declared in grammar', this.grammarName].join(' ');
};

// Rule must produce value

exports.RuleMustProduceValueError = function(ruleName, why) {
  this.ruleName = ruleName;
  this.why = why;
};

exports.RuleMustProduceValueError.prototype.toString = function() {
  return [
    'rule', this.ruleName, 'must produce a value',
    'because the rule it is', this.why, 'also produces a value'
  ].join(' ');
};

// ----------------- bindings -----------------

// Inconsistent bindings

exports.InconsistentBindingsError = function(ruleName, expected, actual) {
  this.ruleName = ruleName;
  this.expected = expected;
  this.actual = actual;
};

exports.InconsistentBindingsError.prototype.toString = function() {
  return [
    'rule', this.ruleName, 'has inconsistent bindings.',
    'expected:', this.expected,
    'got:', this.actual
  ].join(' ');
};

// Duplicate bindings

exports.DuplicateBindingsError = function(ruleName, duplicates) {
  this.ruleName = ruleName;
  this.duplicates = duplicates;
};

exports.DuplicateBindingsError.prototype.toString = function() {
  return ['rule', this.ruleName, 'has duplicate bindings:', this.duplicates].join(' ');
};

// Useless bindings

exports.UselessBindingsError = function(ruleName, useless) {
  this.ruleName = ruleName;
  this.useless = useless;
};

exports.UselessBindingsError.prototype.toString = function() {
  return ['rule', this.ruleName, 'has useless bindings:', this.useless].join(' ');
};

// ----------------- properties -----------------

// Duplicate property names

exports.DuplicatePropertyNamesError = function(duplicates) {
  this.duplicates = duplicates;
};

exports.DuplicatePropertyNamesError.prototype.toString = function() {
  return ['object pattern has duplicate property names:', this.duplicates].join(' ');
};


},{}],17:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

_dereq_('../dist/ohm-grammar.js');

var Builder = _dereq_('./Builder.js');
var Namespace = _dereq_('./Namespace.js');
var MatchFailure = _dereq_('./MatchFailure.js');
var errors = _dereq_('./errors.js');

var awlib = _dereq_('awlib');
var unescapeChar = awlib.stringUtils.unescapeChar;

var thisModule = exports;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function makeGrammarActionDict(optNamespace) {
  var builder;
  return {
    space:                      function(env) {},
    space_multiLine:            function()    {},
    space_singleLine:           function()    {},

    ruleDescr:                  function(env) { builder.setRuleDescription(env.t); },
    ruleDescrText:              function(env) { return this.interval.contents; },

    name:                       function()    { return this.interval.contents; },
    nameFirst:                  function(env) {},
    nameRest:                   function(env) {},

    ident:                      function(env) { return env.n; },

    keyword:                    function(env) { return env.value; },
    keyword_undefined:          function()    { return undefined; },
    keyword_null:               function()    { return null; },
    keyword_true:               function()    { return true; },
    keyword_false:              function()    { return false; },

    string:                     function(env) {
                                  return env.cs.map(function(c) { return unescapeChar(c); }).join('');
                                },
    sChar:                      function()    { return this.interval.contents; },
    regExp:                     function(env) { return new RegExp(env.e); },
    reCharClass:                function()    { return this.interval.contents; },
    number:                     function()    { return parseInt(this.interval.contents); },

    Alt:                        function(env) { return env.value; },
    Alt_rec:                    function(env) { return builder.alt(env.x, env.y); },

    Term:                       function(env) { return env.value; },
    Term_inline:                function(env) { return builder.inline(builder.currentRuleName + '_' + env.n, env.x); },

    Seq:                        function(env) { return builder.seq.apply(builder, env.value); },

    Factor:                     function(env) { return env.value; },
    Factor_bind:                function(env) { return builder.bind(env.x, env.n); },

    Iter:                       function(env) { return env.value; },
    Iter_star:                  function(env) { return builder.many(env.x, 0); },
    Iter_plus:                  function(env) { return builder.many(env.x, 1); },
    Iter_opt:                   function(env) { return builder.opt(env.x); },

    Pred:                       function(env) { return env.value; },
    Pred_not:                   function(env) { return builder.not(env.x); },
    Pred_lookahead:             function(env) { return builder.la(env.x); },

    Base:                       function(env) { return env.value; },
    Base_undefined:             function()    { return builder.prim(undefined); },
    Base_null:                  function()    { return builder.prim(null); },
    Base_true:                  function()    { return builder.prim(true); },
    Base_false:                 function()    { return builder.prim(false); },
    Base_application:           function(env) { return builder.app(env.ruleName); },
    Base_prim:                  function(env) { return builder.prim(env.value); },
    Base_lst:                   function(env) { return builder.lst(env.x); },
    Base_str:                   function(env) { return builder.str(env.x); },
    Base_paren:                 function(env) { return env.x; },
    Base_obj:                   function(env) { return builder.obj([], env.lenient.length > 0); },
    Base_objWithProps:          function(env) { return builder.obj(env.ps, env.lenient.length > 0); },

    Props:                      function(env) { return env.value; },
    Props_base:                 function(env) { return [env.p]; },
    Props_rec:                  function(env) { return [env.p].concat(env.ps); },
    Prop:                       function(env) { return {name: env.n, pattern: env.p}; },

    Rule:                       function(env) { return env.value; },
    Rule_define:                function(env) {
                                  builder.currentRuleName = env.n;
                                  env.d;  // force evaluation
                                  return builder.define(env.n, env.b);
                                },
    Rule_override:              function(env) {
                                  builder.currentRuleName = env.n;
                                  env.d;  // force evaluation
                                  return builder.override(env.n, env.b);
                                },
    Rule_extend:                function(env) {
                                  builder.currentRuleName = env.n;
                                  env.d;  // force evaluation
                                  return builder.extend(env.n, env.b);
                                },

    SuperGrammar:               function(env) { builder.setSuperGrammar(env.value); },
    SuperGrammar_qualified:     function(env) { return thisModule.namespace(env.ns).getGrammar(env.n); },
    SuperGrammar_unqualified:   function(env) {
                                  if (optNamespace) {
                                    return optNamespace.getGrammar(env.n);
                                  } else {
                                    throw new errors.UndeclaredGrammarError(env.n);
                                  }
                                },

    Grammar:                    function(env) {
                                  builder = new Builder();
                                  builder.setName(env.n);
                                  env.s;  // force evaluation
                                  env.rs;  // force evaluation
                                  return builder.build(optNamespace);
                                },
    Grammars:                   function(env) { return env.value; }
  };
}

function compileAndLoad(source, whatItIs, optNamespace) {
  try {
    var thunk = thisModule._ohmGrammar.matchContents(source, whatItIs, true);
    return thunk(makeGrammarActionDict(optNamespace));
  } catch (e) {
    if (e instanceof MatchFailure) {
      console.log('\n' + e.getExtendedErrorMessage());
    }
    throw e;
  }
}

function makeGrammar(source, optNamespace) {
  return compileAndLoad(source, 'Grammar', optNamespace);
}

function makeGrammars(source, optNamespace) {
  return compileAndLoad(source, 'Grammars', optNamespace);
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

// Stuff that users should know about

var namespaces = {};
exports.namespace = function(name) {
  if (namespaces[name] === undefined) {
    namespaces[name] = new Namespace(name);
  }
  return namespaces[name];
};

exports.make = function(recipe) {
  return recipe(thisModule);
};

exports.makeGrammar = makeGrammar;
exports.makeGrammars = makeGrammars;

// Stuff that's only here for bootstrapping, testing, etc.

exports._builder = function() {
  return new Builder();
};

exports._makeGrammarActionDict = makeGrammarActionDict;

var ohmGrammar;
Object.defineProperty(exports, '_ohmGrammar', {
  get: function() {
    if (!ohmGrammar) {
      ohmGrammar = this._ohmGrammarFactory(this);
    }
    return ohmGrammar;
  }
});


},{"../dist/ohm-grammar.js":1,"./Builder.js":7,"./MatchFailure.js":11,"./Namespace.js":12,"./errors.js":16,"awlib":2}],18:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.addRulesThatNeedSemanticAction = common.abstract;

pexprs.anything.addRulesThatNeedSemanticAction = function() {
  // no-op
};

pexprs.end.addRulesThatNeedSemanticAction = function() {
  // no-op
};

pexprs.Prim.prototype.addRulesThatNeedSemanticAction = function() {
  // no-op
};

pexprs.Alt.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  var ans = false;
  for (var idx = 0; idx < this.terms.length; idx++) {
    var term = this.terms[idx];
    ans |= term.addRulesThatNeedSemanticAction(dict, valueRequired);
  }
  return ans;
};

pexprs.Seq.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  var ans = false;
  for (var idx = 0; idx < this.factors.length; idx++) {
    var factor = this.factors[idx];
    ans |= factor.addRulesThatNeedSemanticAction(dict, false);
  }
  return ans;
};

pexprs.Bind.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, true);
};

pexprs.Many.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, valueRequired);
};

pexprs.Opt.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, valueRequired);
};

pexprs.Not.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, false);
};

pexprs.Lookahead.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, valueRequired);
};

pexprs.Str.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, false);
};

pexprs.List.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, false);
};

pexprs.Obj.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, false);
};

pexprs.Apply.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  if (!valueRequired || dict[this.ruleName]) {
    return false;
  } else {
    return dict[this.ruleName] = true;
  }
};


},{"./common.js":14,"./pexprs.js":27}],19:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');
var errors = _dereq_('./errors.js');

var awlib = _dereq_('awlib');
var equals = awlib.equals.equals;

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertChoicesHaveUniformBindings = common.abstract;

pexprs.anything.assertChoicesHaveUniformBindings = function(ruleName) {
  // no-op
};

pexprs.end.assertChoicesHaveUniformBindings = function(ruleName) {
  // no-op
};

pexprs.Prim.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  if (this.terms.length === 0) {
    return;
  }
  var names = this.terms[0].getBindingNames();
  for (var idx = 0; idx < this.terms.length; idx++) {
    var term = this.terms[idx];
    term.assertChoicesHaveUniformBindings();
    var otherNames = term.getBindingNames();
    if (!equals(names, otherNames)) {
      throw new errors.InconsistentBindingsError(ruleName, names, otherNames);
    }
  }
};

pexprs.ExtendAlt.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  // Only has two terms, the second of which has the expected bindings.
  var names = this.terms[1].getBindingNames();
  var otherNames = this.terms[0].getBindingNames();
  if (!equals(names, otherNames)) {
    throw new errors.InconsistentBindingsError(ruleName, names, otherNames);
  }
};

pexprs.Seq.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertChoicesHaveUniformBindings(ruleName);
  }
};

pexprs.Bind.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  this.expr.assertChoicesHaveUniformBindings(ruleName);
};

pexprs.Many.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  this.expr.assertChoicesHaveUniformBindings(ruleName);
};

pexprs.Opt.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  this.expr.assertChoicesHaveUniformBindings(ruleName);
};

pexprs.Not.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  this.expr.assertChoicesHaveUniformBindings(ruleName);
};

pexprs.Lookahead.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  this.expr.assertChoicesHaveUniformBindings(ruleName);
};

pexprs.Str.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  this.expr.assertChoicesHaveUniformBindings(ruleName);
};

pexprs.List.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  this.expr.assertChoicesHaveUniformBindings(ruleName);
};

pexprs.Obj.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  for (var idx = 0; idx < this.properties.length; idx++) {
    this.properties[idx].pattern.assertChoicesHaveUniformBindings(ruleName);
  }
};

pexprs.Apply.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  // no-op
};


},{"./common.js":14,"./errors.js":16,"./pexprs.js":27,"awlib":2}],20:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');
var errors = _dereq_('./errors.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertNoDuplicateBindings = common.abstract;

pexprs.anything.assertNoDuplicateBindings = function(ruleName) {
  // no-op
};

pexprs.end.assertNoDuplicateBindings = function(ruleName) {
  // no-op
};

pexprs.Prim.prototype.assertNoDuplicateBindings = function(ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertNoDuplicateBindings = function(ruleName) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx].assertNoDuplicateBindings(ruleName);
  }
};

pexprs.Seq.prototype.assertNoDuplicateBindings = function(ruleName) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertNoDuplicateBindings(ruleName);
  }

  var duplicates = common.getDuplicates(this.getBindingNames());
  if (duplicates.length > 0) {
    throw new errors.DuplicateBindingsError(ruleName, duplicates);
  }
};

pexprs.Bind.prototype.assertNoDuplicateBindings = function(ruleName) {
  this.expr.assertNoDuplicateBindings(ruleName);
};

pexprs.Many.prototype.assertNoDuplicateBindings = function(ruleName) {
  this.expr.assertNoDuplicateBindings(ruleName);
};

pexprs.Opt.prototype.assertNoDuplicateBindings = function(ruleName) {
  this.expr.assertNoDuplicateBindings(ruleName);
};

pexprs.Not.prototype.assertNoDuplicateBindings = function(ruleName) {
  this.expr.assertNoDuplicateBindings(ruleName);
};

pexprs.Lookahead.prototype.assertNoDuplicateBindings = function(ruleName) {
  this.expr.assertNoDuplicateBindings(ruleName);
};

pexprs.Str.prototype.assertNoDuplicateBindings = function(ruleName) {
  this.expr.assertNoDuplicateBindings(ruleName);
};

pexprs.List.prototype.assertNoDuplicateBindings = function(ruleName) {
  this.expr.assertNoDuplicateBindings(ruleName);
};

pexprs.Obj.prototype.assertNoDuplicateBindings = function(ruleName) {
  for (var idx = 0; idx < this.properties.length; idx++) {
    this.properties[idx].pattern.assertNoDuplicateBindings(ruleName);
  }

  var duplicates = common.getDuplicates(this.getBindingNames());
  if (duplicates.length > 0) {
    throw new errors.DuplicateBindingsError(ruleName, duplicates);
  }
};

pexprs.Apply.prototype.assertNoDuplicateBindings = function(ruleName) {
  // no-op
};


},{"./common.js":14,"./errors.js":16,"./pexprs.js":27}],21:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');
var errors = _dereq_('./errors.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

function assertNoBindings(ruleName, expr) {
  var bindings = expr.getBindingNames();
  if (bindings.length > 0) {
    throw new errors.UselessBindingsError(ruleName, bindings);
  }
}

pexprs.PExpr.prototype.assertNoUselessBindings = common.abstract;

pexprs.anything.assertNoUselessBindings = function(ruleName) {
  // no-op
};

pexprs.end.assertNoUselessBindings = function(ruleName) {
  // no-op
};

pexprs.Prim.prototype.assertNoUselessBindings = function(ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertNoUselessBindings = function(ruleName) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx].assertNoUselessBindings(ruleName);
  }
};

pexprs.Seq.prototype.assertNoUselessBindings = function(ruleName) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertNoUselessBindings(ruleName);
  }
};

pexprs.Bind.prototype.assertNoUselessBindings = function(ruleName) {
  this.expr.assertNoUselessBindings(ruleName);
};

pexprs.Many.prototype.assertNoUselessBindings = function(ruleName) {
  this.expr.assertNoUselessBindings(ruleName);
  assertNoBindings(ruleName, this.expr);
};

pexprs.Opt.prototype.assertNoUselessBindings = function(ruleName) {
  this.expr.assertNoUselessBindings(ruleName);
  assertNoBindings(ruleName, this.expr);
};

pexprs.Not.prototype.assertNoUselessBindings = function(ruleName) {
  this.expr.assertNoUselessBindings(ruleName);
  assertNoBindings(ruleName, this.expr);
};

pexprs.Lookahead.prototype.assertNoUselessBindings = function(ruleName) {
  this.expr.assertNoUselessBindings(ruleName);
};

pexprs.Str.prototype.assertNoUselessBindings = function(ruleName) {
  this.expr.assertNoUselessBindings(ruleName);
};

pexprs.List.prototype.assertNoUselessBindings = function(ruleName) {
  this.expr.assertNoUselessBindings(ruleName);
};

pexprs.Obj.prototype.assertNoUselessBindings = function(ruleName) {
  for (var idx = 0; idx < this.properties.length; idx++) {
    this.properties[idx].pattern.assertNoUselessBindings(ruleName);
  }
};

pexprs.Apply.prototype.assertNoUselessBindings = function(ruleName) {
  // no-op
};


},{"./common.js":14,"./errors.js":16,"./pexprs.js":27}],22:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var errors = _dereq_('./errors.js');
var thunks = _dereq_('./thunks.js');
var pexprs = _dereq_('./pexprs.js');
var skipSpaces = _dereq_('./skipSpaces.js');
var InputStream = _dereq_('./InputStream.js');

var awlib = _dereq_('awlib');
var browser = awlib.browser;

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.eval = common.abstract;

pexprs.anything.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  if (syntactic) {
    skipSpaces(ruleDict, inputStream);
  }
  var origPos = inputStream.pos;
  var value = inputStream.next();
  if (value === common.fail) {
    if (recordFailures) {
      inputStream.recordFailure(origPos, this);
    }
    return common.fail;
  } else {
    return new thunks.ValueThunk(value);
  }
};

pexprs.end.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  if (syntactic) {
    skipSpaces(ruleDict, inputStream);
  }
  if (inputStream.atEnd()) {
    return thunks.valuelessThunk;
  } else {
    if (recordFailures) {
      inputStream.recordFailure(inputStream.pos, this);
    }
    return common.fail;
  }
};

pexprs.Prim.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  if (syntactic) {
    skipSpaces(ruleDict, inputStream);
  }
  var origPos = inputStream.pos;
  if (this.match(inputStream) === common.fail) {
    if (recordFailures) {
      inputStream.recordFailure(origPos, this);
    }
    return common.fail;
  } else {
    return new thunks.ValueThunk(this.obj);
  }
};

pexprs.Prim.prototype.match = function(inputStream) {
  return inputStream.matchExactly(this.obj);
};

pexprs.StringPrim.prototype.match = function(inputStream) {
  return inputStream.matchString(this.obj);
};

pexprs.RegExpPrim.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  if (syntactic) {
    skipSpaces(ruleDict, inputStream);
  }
  var origPos = inputStream.pos;
  if (inputStream.matchRegExp(this.obj) === common.fail) {
    if (recordFailures) {
      inputStream.recordFailure(origPos, this);
    }
    return common.fail;
  } else {
    return new thunks.ValueThunk(inputStream.source[origPos]);
  }
};

pexprs.Alt.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  var origPos = inputStream.pos;
  var origNumBindings = bindings.length;
  for (var idx = 0; idx < this.terms.length; idx++) {
    if (syntactic) {
      skipSpaces(ruleDict, inputStream);
    }
    var value = this.terms[idx].eval(recordFailures, syntactic, ruleDict, inputStream, bindings);
    if (value !== common.fail) {
      return value;
    } else {
      inputStream.pos = origPos;
      // Note: while the following assignment could be done unconditionally, only doing it when necessary is
      // better for performance. This is b/c assigning to an array's length property is more expensive than a
      // typical assignment.
      if (bindings.length > origNumBindings) {
        bindings.length = origNumBindings;
      }
    }
  }
  return common.fail;
};

pexprs.Seq.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    if (syntactic) {
      skipSpaces(ruleDict, inputStream);
    }
    var factor = this.factors[idx];
    var value = factor.eval(recordFailures, syntactic, ruleDict, inputStream, bindings);
    if (value === common.fail) {
      return common.fail;
    }
  }
  return thunks.valuelessThunk;
};

pexprs.Bind.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  var value = this.expr.eval(recordFailures, syntactic, ruleDict, inputStream, bindings);
  if (value !== common.fail) {
    bindings.push(this.name, value);
  }
  return value;
};

pexprs.Many.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  var matches = [];
  while (true) {
    var backtrackPos = inputStream.pos;
    var value = this.expr.eval(recordFailures, syntactic, ruleDict, inputStream, []);
    if (value === common.fail) {
      inputStream.pos = backtrackPos;
      break;
    } else {
      matches.push(value);
    }
  }
  return matches.length < this.minNumMatches ?  common.fail : new thunks.ListThunk(matches);
};

pexprs.Opt.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  var origPos = inputStream.pos;
  var value = this.expr.eval(recordFailures, syntactic, ruleDict, inputStream, []);
  if (value === common.fail) {
    inputStream.pos = origPos;
    return new thunks.ListThunk([]);
  } else {
    return new thunks.ListThunk([value]);
  }
};

pexprs.Not.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  var origPos = inputStream.pos;
  var value = this.expr.eval(false, syntactic, ruleDict, inputStream, []);
  if (value !== common.fail) {
    if (recordFailures) {
      inputStream.recordFailure(origPos, this);
    }
    return common.fail;
  } else {
    inputStream.pos = origPos;
    return thunks.valuelessThunk;
  }
};

pexprs.Lookahead.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  var origPos = inputStream.pos;
  var value = this.expr.eval(recordFailures, syntactic, ruleDict, inputStream, []);
  if (value !== common.fail) {
    inputStream.pos = origPos;
  }
  return value;
};

pexprs.Str.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  if (syntactic) {
    skipSpaces(ruleDict, inputStream);
  }
  var string = inputStream.next();
  if (typeof string === 'string') {
    var stringInputStream = InputStream.newFor(string);
    var value = this.expr.eval(recordFailures, syntactic, ruleDict, stringInputStream, bindings);
    return value !== common.fail && stringInputStream.atEnd() ?  new thunks.ValueThunk(string) : common.fail;
  } else {
    return common.fail;
  }
};

pexprs.List.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  if (syntactic) {
    skipSpaces(ruleDict, inputStream);
  }
  var list = inputStream.next();
  if (list instanceof Array) {
    var listInputStream = InputStream.newFor(list);
    var value = this.expr.eval(recordFailures, syntactic, ruleDict, listInputStream, bindings);
    return value !== common.fail && listInputStream.atEnd() ?  new thunks.ValueThunk(list) : common.fail;
  } else {
    return common.fail;
  }
};

pexprs.Obj.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  if (syntactic) {
    skipSpaces(ruleDict, inputStream);
  }
  var obj = inputStream.next();
  if (obj !== common.fail && obj && (typeof obj === 'object' || typeof obj === 'function')) {
    var numOwnPropertiesMatched = 0;
    for (var idx = 0; idx < this.properties.length; idx++) {
      var property = this.properties[idx];
      var value = obj[property.name];
      var valueInputStream = InputStream.newFor([value]);
      var matched =
          property.pattern.eval(recordFailures, syntactic, ruleDict, valueInputStream, bindings) !== common.fail &&
          valueInputStream.atEnd();
      if (!matched) {
        return common.fail;
      }
      if (obj.hasOwnProperty(property.name)) {
        numOwnPropertiesMatched++;
      }
    }
    return this.isLenient || numOwnPropertiesMatched === Object.keys(obj).length ?
        new thunks.ValueThunk(obj) :
        common.fail;
  } else {
    return common.fail;
  }
};

pexprs.Apply.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  var ruleName = this.ruleName;
  var origPosInfo = inputStream.getCurrentPosInfo();
  var memoRec = origPosInfo.memo[ruleName];
  if (memoRec && origPosInfo.shouldUseMemoizedResult(memoRec)) {
    inputStream.pos = memoRec.pos;
    return memoRec.value;
  } else if (origPosInfo.isActive(ruleName)) {
    var currentLR = origPosInfo.getCurrentLeftRecursion();
    if (currentLR && currentLR.name === ruleName) {
      origPosInfo.updateInvolvedRules();
      inputStream.pos = currentLR.pos;
      return currentLR.value;
    } else {
      origPosInfo.startLeftRecursion(ruleName);
      return common.fail;
    }
  } else {
    var body = ruleDict[ruleName]
    if (!body) {
      throw new errors.UndeclaredRuleError(ruleName);
    }
    if (body.description && common.isSyntactic(ruleName)) {
      skipSpaces(ruleDict, inputStream);
    }
    var origPos = inputStream.pos;
    origPosInfo.enter(ruleName);
    var rf = recordFailures && !body.description;
    var value = this.evalOnce(body, rf, syntactic, ruleDict, inputStream);
    var currentLR = origPosInfo.getCurrentLeftRecursion();
    if (currentLR) {
      if (currentLR.name === ruleName) {
        value = this.handleLeftRecursion(body, rf, syntactic, ruleDict, inputStream, origPos, currentLR, value);
        origPosInfo.memo[ruleName] =
          {pos: inputStream.pos, value: value, involvedRules: currentLR.involvedRules};
        origPosInfo.endLeftRecursion(ruleName);
      } else if (!currentLR.involvedRules[ruleName]) {
        // Only memoize if this rule is not involved in the current left recursion
        origPosInfo.memo[ruleName] = {pos: inputStream.pos, value: value};
      }
    } else {
      origPosInfo.memo[ruleName] = {pos: inputStream.pos, value: value};
    }
    origPosInfo.exit(ruleName);
    if (value === common.fail && recordFailures && body.description) {
      inputStream.recordFailure(origPos, this);
    }
    return value;
  }
};

pexprs.Apply.prototype.evalOnce = function(expr, recordFailures, syntactic, ruleDict, inputStream) {
  var origPos = inputStream.pos;
  var bindings = [];

  // Save inputStream's info about the current rule application
  var oldRuleName = inputStream.currentRuleName;
  var oldRuleIsSyntactic = syntactic;
  var oldApplyPos = inputStream.currentApplyPos;

  // Set inputStream's info about the current rule application
  inputStream.currentRuleName = this.ruleName;
  syntactic = common.isSyntactic(this.ruleName);
  inputStream.currentApplyPos = origPos;

  var value = expr.eval(recordFailures, syntactic, ruleDict, inputStream, bindings);

  // Restore inputStream's info about the old rule application
  inputStream.currentRuleName = oldRuleName;
  syntactic = oldRuleIsSyntactic;
  inputStream.currentApplyPos = oldApplyPos;

  if (value === common.fail) {
    return common.fail;
  } else {
    return new thunks.RuleThunk(this.ruleName, inputStream.source, origPos, inputStream.pos, value, bindings);
  }
};

pexprs.Apply.prototype.handleLeftRecursion = function(body, recordFailures, syntactic, ruleDict, inputStream, origPos, currentLR, seedValue) {
  var value = seedValue;
  if (seedValue !== common.fail) {
    currentLR.value = seedValue;
    currentLR.pos = inputStream.pos;
    while (true) {
      inputStream.pos = origPos;
      value = this.evalOnce(body, recordFailures, syntactic, ruleDict, inputStream);
      if (value !== common.fail && inputStream.pos > currentLR.pos) {
        currentLR.value = value;
        currentLR.pos = inputStream.pos;
      } else {
        value = currentLR.value;
        inputStream.pos = currentLR.pos;
        break;
      }
    }
  }
  return value;
};


},{"./InputStream.js":9,"./common.js":14,"./errors.js":16,"./pexprs.js":27,"./skipSpaces.js":28,"./thunks.js":29,"awlib":2}],23:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.getBindingNames = function() {
  return [];
};

pexprs.Alt.prototype.getBindingNames = function() {
  // This is ok b/c all terms must have the same bindings -- this property is checked by the Grammar constructor.
  return this.terms.length === 0 ? [] : this.terms[0].getBindingNames();
};

pexprs.Seq.prototype.getBindingNames = function() {
  var names = [];
  for (var idx = 0; idx < this.factors.length; idx++) {
    names = names.concat(this.factors[idx].getBindingNames());
  }
  return names.sort();
};

pexprs.Bind.prototype.getBindingNames = function() {
  return [this.name];
};

pexprs.Lookahead.prototype.getBindingNames = function() {
  return this.expr.getBindingNames();
};

pexprs.Str.prototype.getBindingNames = function() {
  return this.expr.getBindingNames();
};

pexprs.List.prototype.getBindingNames = function() {
  return this.expr.getBindingNames();
};

pexprs.Obj.prototype.getBindingNames = function() {
  var names = [];
  for (var idx = 0; idx < this.properties.length; idx++) {
    names = names.concat(this.properties[idx].pattern.getBindingNames());
  }
  return names.sort();
};


},{"./pexprs.js":27}],24:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');

var awlib = _dereq_('awlib');
var printString = awlib.stringUtils.printString;

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.outputRecipe = common.abstract;

pexprs.anything.outputRecipe = function(ws) {
  // no-op
};

pexprs.end.outputRecipe = function(ws) {
  // no-op
};

pexprs.Prim.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.prim(');
  ws.nextPutAll(printString(this.obj));
  ws.nextPutAll(')');
};

pexprs.Alt.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.alt(');
  for (var idx = 0; idx < this.terms.length; idx++) {
    if (idx > 0) {
      ws.nextPutAll(', ');
    }
    this.terms[idx].outputRecipe(ws);
  }
  ws.nextPutAll(')');
};

pexprs.Seq.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.seq(');
  for (var idx = 0; idx < this.factors.length; idx++) {
    if (idx > 0) {
      ws.nextPutAll(', ');
    }
    this.factors[idx].outputRecipe(ws);
  }
  ws.nextPutAll(')');
};

pexprs.Bind.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.bind(');
  this.expr.outputRecipe(ws);
  ws.nextPutAll(', ');
  ws.nextPutAll(printString(this.name));
  ws.nextPutAll(')');
};

pexprs.Many.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.many(');
  this.expr.outputRecipe(ws);
  ws.nextPutAll(', ');
  ws.nextPutAll(this.minNumMatches);
  ws.nextPutAll(')');
};

pexprs.Opt.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.opt(');
  this.expr.outputRecipe(ws);
  ws.nextPutAll(')');
};

pexprs.Not.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.not(');
  this.expr.outputRecipe(ws);
  ws.nextPutAll(')');
};

pexprs.Lookahead.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.la(');
  this.expr.outputRecipe(ws);
  ws.nextPutAll(')');
};

pexprs.Str.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.str(');
  this.expr.outputRecipe(ws);
  ws.nextPutAll(')');
};

pexprs.List.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.lst(');
  this.expr.outputRecipe(ws);
  ws.nextPutAll(')');
};

pexprs.Obj.prototype.outputRecipe = function(ws) {
  function outputPropertyRecipe(prop) {
    ws.nextPutAll('{name: ');
    ws.nextPutAll(printString(prop.name));
    ws.nextPutAll(', pattern: ');
    prop.pattern.outputRecipe(ws);
    ws.nextPutAll('}');
  }

  ws.nextPutAll('b.obj([');
  for (var idx = 0; idx < this.properties.length; idx++) {
    if (idx > 0) {
      ws.nextPutAll(', ');
    }
    outputPropertyRecipe(this.properties[idx]);
  }
  ws.nextPutAll('], ');
  ws.nextPutAll(printString(!!this.isLenient));
  ws.nextPutAll(')');
};

pexprs.Apply.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.app(');
  ws.nextPutAll(printString(this.ruleName));
  ws.nextPutAll(')');
};


},{"./common.js":14,"./pexprs.js":27,"awlib":2}],25:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.producesValue = function() {
  return true;
};

pexprs.Alt.prototype.producesValue = function() {
  for (var idx = 0; idx < this.terms.length; idx++) {
    if (!this.terms[idx].producesValue()) {
      return false;
    }
  }
  return true;
}

pexprs.Seq.prototype.producesValue = function() {
  return false;
};

pexprs.Not.prototype.producesValue = function() {
  return false;
};


},{"./pexprs.js":27}],26:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');

var awlib = _dereq_('awlib');
var printString = awlib.stringUtils.printString;
var makeStringBuffer = awlib.objectUtils.stringBuffer;

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.toExpected = function(ruleDict) {
  return undefined;
};

pexprs.anything.toExpected = function(ruleDict) {
  return "any object";
};

pexprs.end.toExpected = function(ruleDict) {
  return "end of input";
};

pexprs.Prim.prototype.toExpected = function(ruleDict) {
  return printString(this.obj);
};

pexprs.Not.prototype.toExpected = function(ruleDict) {
  return "no " + this.expr.toExpected();
};

// TODO: think about Str, List, and Obj

pexprs.Apply.prototype.toExpected = function(ruleDict) {
  var description = ruleDict[this.ruleName].description;
  if (description) {
    return description;
  } else {
    var article = /^[aeiouAEIOU]/.test(this.ruleName) ? "an" : "a";
    return article + " " + this.ruleName;
  }
};


},{"./common.js":14,"./pexprs.js":27,"awlib":2}],27:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var errors = _dereq_('./errors.js');

var awlib = _dereq_('awlib');
var objectThatDelegatesTo = awlib.objectUtils.objectThatDelegatesTo;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// General stuff

function PExpr() {
  throw 'PExpr cannot be instantiated -- it\'s abstract';
}

// Anything

var anything = objectThatDelegatesTo(PExpr.prototype);

// End

var end = objectThatDelegatesTo(PExpr.prototype);

// Primitives

function Prim(obj) {
  this.obj = obj;
}

Prim.prototype = objectThatDelegatesTo(PExpr.prototype);

function StringPrim(obj) {
  this.obj = obj;
}

StringPrim.prototype = objectThatDelegatesTo(Prim.prototype);

function RegExpPrim(obj) {
  this.obj = obj;
}

RegExpPrim.prototype = objectThatDelegatesTo(Prim.prototype);

// Alternation

function Alt(terms) {
  this.terms = terms;
}

Alt.prototype = objectThatDelegatesTo(PExpr.prototype);

// ExtendAlt is an implementation detail of rule extension

function ExtendAlt(extensions, base) {
  this.terms = [extensions, base];
}

ExtendAlt.prototype = objectThatDelegatesTo(Alt.prototype);

// Sequences

function Seq(factors) {
  this.factors = factors;
}

Seq.prototype = objectThatDelegatesTo(PExpr.prototype);

// Bindings

function Bind(expr, name) {
  this.expr = expr;
  this.name = name;
}

Bind.prototype = objectThatDelegatesTo(PExpr.prototype);

// Iterators and optionals

function Many(expr, minNumMatches) {
  this.expr = expr;
  this.minNumMatches = minNumMatches;
}

Many.prototype = objectThatDelegatesTo(PExpr.prototype);

function Opt(expr) {
  this.expr = expr;
}

Opt.prototype = objectThatDelegatesTo(PExpr.prototype);

// Predicates

function Not(expr) {
  this.expr = expr;
}

Not.prototype = objectThatDelegatesTo(PExpr.prototype);

function Lookahead(expr) {
  this.expr = expr;
}

Lookahead.prototype = objectThatDelegatesTo(PExpr.prototype);

// String decomposition

function Str(expr) {
  this.expr = expr;
}

Str.prototype = objectThatDelegatesTo(PExpr.prototype);

// List decomposition

function List(expr) {
  this.expr = expr;
}

List.prototype = objectThatDelegatesTo(PExpr.prototype);

// Object decomposition

function Obj(properties, isLenient) {
  var names = properties.map(function(property) { return property.name; });
  var duplicates = common.getDuplicates(names);
  if (duplicates.length > 0) {
    throw new errors.DuplicatePropertyNamesError(duplicates);
  } else {
    this.properties = properties;
    this.isLenient = isLenient;
  }
}

Obj.prototype = objectThatDelegatesTo(PExpr.prototype);

// Rule application

function Apply(ruleName) {
  this.ruleName = ruleName;
}

Apply.prototype = objectThatDelegatesTo(PExpr.prototype);

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.makePrim = function(obj) {
  if (typeof obj === 'string' && obj.length !== 1) {
    return new StringPrim(obj);
  }
  else if (obj instanceof RegExp) {
    return new RegExpPrim(obj);
  } else {
    return new Prim(obj);
  }
};

exports.PExpr = PExpr;
exports.anything = anything;
exports.end = end;
exports.Prim = Prim;
exports.StringPrim = StringPrim;
exports.RegExpPrim = RegExpPrim;
exports.Alt = Alt;
exports.ExtendAlt = ExtendAlt;
exports.Seq = Seq;
exports.Bind = Bind;
exports.Many = Many;
exports.Opt = Opt;
exports.Not = Not;
exports.Lookahead = Lookahead;
exports.Str = Str;
exports.List = List;
exports.Obj = Obj;
exports.Apply = Apply;

// --------------------------------------------------------------------
// Extensions
// --------------------------------------------------------------------

_dereq_('./pexprs-addRulesThatNeedSemanticAction.js');
_dereq_('./pexprs-assertNoDuplicateBindings.js');
_dereq_('./pexprs-assertNoUselessBindings.js');
_dereq_('./pexprs-assertChoicesHaveUniformBindings.js');
_dereq_('./pexprs-getBindingNames.js');
_dereq_('./pexprs-eval.js');
_dereq_('./pexprs-outputRecipe.js');
_dereq_('./pexprs-producesValue.js');
_dereq_('./pexprs-toExpected.js');


},{"./common.js":14,"./errors.js":16,"./pexprs-addRulesThatNeedSemanticAction.js":18,"./pexprs-assertChoicesHaveUniformBindings.js":19,"./pexprs-assertNoDuplicateBindings.js":20,"./pexprs-assertNoUselessBindings.js":21,"./pexprs-eval.js":22,"./pexprs-getBindingNames.js":23,"./pexprs-outputRecipe.js":24,"./pexprs-producesValue.js":25,"./pexprs-toExpected.js":26,"awlib":2}],28:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function skipSpaces(ruleDict, inputStream) {
  while (true) {
    var origPos = inputStream.pos;
    if (ruleDict.space.eval(false, false, ruleDict, inputStream, []) === common.fail) {
      inputStream.pos = origPos;
      break;
    }
  }
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = skipSpaces;


},{"./common.js":14,"./pexprs.js":27}],29:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Interval = _dereq_('./Interval.js');

var awlib = _dereq_('awlib');
var browser = awlib.browser
var objectThatDelegatesTo = awlib.objectUtils.objectThatDelegatesTo;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Thunk() {
  throw 'Thunk cannot be instantiated -- it\'s abstract';
}

var nextThunkId = 0;
Thunk.prototype = {
  init: function() {
    this.id = nextThunkId++;
  }
};

function RuleThunk(ruleName, source, startIdx, endIdx, value, bindings) {
  this.init();
  this.ruleName = ruleName;
  this.source = source;
  this.startIdx = startIdx;
  this.endIdx = endIdx;
  this.value = value;
  this.bindings = bindings;
}

RuleThunk.prototype = objectThatDelegatesTo(Thunk.prototype, {
  force: function(actionDict, memo) {
    if (!memo.hasOwnProperty(this.id)) {
      var action = this.lookupAction(actionDict);
      var addlInfo = this.createAddlInfo();
      var env = this.makeEnv(actionDict, memo);
      memo[this.id] = action.call(addlInfo, env);
    }
    return memo[this.id];
  },

  lookupAction: function(actionDict) {
    var ruleName = this.ruleName;
    var action = actionDict[ruleName];
    if (action === undefined && actionDict._default !== undefined) {
      action = function(env) {
        return actionDict._default.call(this, ruleName, env);
      };
    }
    return action || browser.error('missing semantic action for', ruleName);
  },

  createAddlInfo: function() {
    return {
      interval: new Interval(this.source, this.startIdx, this.endIdx)
    };
  },

  makeEnv: function(actionDict, memo) {
    var bindings = this.bindings.length === 0 ? ['value', this.value] : this.bindings;
    var env = {};
    for (var idx = 0; idx < bindings.length; idx += 2) {
      var name = bindings[idx];
      var thunk = bindings[idx + 1];
      this.addBinding(env, name, thunk, actionDict, memo);
    }
    return env;
  },

  addBinding: function(env, name, value, actionDict, memo) {
    Object.defineProperty(env, name, {
      get: function() {
        if (value instanceof Thunk) {
          value = value.force(actionDict, memo);
        }
        return value;
      },
      enumerable: true
    });
  }
});

function ListThunk(thunks) {
  this.init();
  this.thunks = thunks;
}

ListThunk.prototype = objectThatDelegatesTo(Thunk.prototype, {
  force: function(actionDict, memo) {
    if (!memo.hasOwnProperty(this.id)) {
      memo[this.id] = this.thunks.map(function(thunk) { return thunk.force(actionDict, memo); });
    }
    return memo[this.id];
  }
});

function ValueThunk(value) {
  this.value = value;
}

ValueThunk.prototype = objectThatDelegatesTo(Thunk.prototype, {
  force: function(actionDict, memo) {
    return this.value;
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.RuleThunk = RuleThunk;
exports.ListThunk = ListThunk;
exports.ValueThunk = ValueThunk;
exports.valuelessThunk = new ValueThunk(undefined);


},{"./Interval.js":10,"awlib":2}]},{},[17])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9kaXN0L29obS1ncmFtbWFyLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9ub2RlX21vZHVsZXMvYXdsaWIvc3JjL2F3bGliLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9ub2RlX21vZHVsZXMvYXdsaWIvc3JjL2Jyb3dzZXIuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL25vZGVfbW9kdWxlcy9hd2xpYi9zcmMvZXF1YWxzLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9ub2RlX21vZHVsZXMvYXdsaWIvc3JjL29iamVjdFV0aWxzLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9ub2RlX21vZHVsZXMvYXdsaWIvc3JjL3N0cmluZ1V0aWxzLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvQnVpbGRlci5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vc3JjL0dyYW1tYXIuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL3NyYy9JbnB1dFN0cmVhbS5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vc3JjL0ludGVydmFsLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvTWF0Y2hGYWlsdXJlLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvTmFtZXNwYWNlLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvUG9zSW5mby5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vc3JjL2NvbW1vbi5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vc3JjL2RlY2xzLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvZXJyb3JzLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvbWFpbi5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vc3JjL3BleHBycy1hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24uanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL3NyYy9wZXhwcnMtYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL3NyYy9wZXhwcnMtYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncy5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vc3JjL3BleHBycy1hc3NlcnROb1VzZWxlc3NCaW5kaW5ncy5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vc3JjL3BleHBycy1ldmFsLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvcGV4cHJzLWdldEJpbmRpbmdOYW1lcy5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vc3JjL3BleHBycy1vdXRwdXRSZWNpcGUuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL3NyYy9wZXhwcnMtcHJvZHVjZXNWYWx1ZS5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vc3JjL3BleHBycy10b0V4cGVjdGVkLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvcGV4cHJzLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvc2tpcFNwYWNlcy5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vc3JjL3RodW5rcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIG9obSA9IHJlcXVpcmUoJy4uL3NyYy9tYWluLmpzJyk7XG5vaG0uX29obUdyYW1tYXJGYWN0b3J5ID1cbihmdW5jdGlvbihvaG0sIG9wdE5hbWVzcGFjZSkge1xuICB2YXIgYiA9IG9obS5fYnVpbGRlcigpO1xuICBiLnNldE5hbWUoJ09obScpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnR3JhbW1hcnMnLCBiLm1hbnkoYi5hcHAoJ0dyYW1tYXInKSwgMCkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnR3JhbW1hcicsIGIuc2VxKGIuYmluZChiLmFwcCgnaWRlbnQnKSwgJ24nKSwgYi5iaW5kKGIub3B0KGIuYXBwKCdTdXBlckdyYW1tYXInKSksICdzJyksIGIucHJpbSgneycpLCBiLmJpbmQoYi5tYW55KGIuYXBwKCdSdWxlJyksIDApLCAncnMnKSwgYi5wcmltKCd9JykpKTtcbiAgYi5pbmxpbmUoJ1N1cGVyR3JhbW1hcl9xdWFsaWZpZWQnLCBiLnNlcShiLnByaW0oJzw6JyksIGIuYmluZChiLmFwcCgnaWRlbnQnKSwgJ25zJyksIGIucHJpbSgnLicpLCBiLmJpbmQoYi5hcHAoJ2lkZW50JyksICduJykpKTtcbiAgYi5pbmxpbmUoJ1N1cGVyR3JhbW1hcl91bnF1YWxpZmllZCcsIGIuc2VxKGIucHJpbSgnPDonKSwgYi5iaW5kKGIuYXBwKCdpZGVudCcpLCAnbicpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCdTdXBlckdyYW1tYXInLCBiLmFsdChiLmFwcCgnU3VwZXJHcmFtbWFyX3F1YWxpZmllZCcpLCBiLmFwcCgnU3VwZXJHcmFtbWFyX3VucXVhbGlmaWVkJykpKTtcbiAgYi5pbmxpbmUoJ1J1bGVfZGVmaW5lJywgYi5zZXEoYi5iaW5kKGIuYXBwKCdpZGVudCcpLCAnbicpLCBiLmJpbmQoYi5vcHQoYi5hcHAoJ3J1bGVEZXNjcicpKSwgJ2QnKSwgYi5wcmltKCc9JyksIGIuYmluZChiLmFwcCgnQWx0JyksICdiJykpKTtcbiAgYi5pbmxpbmUoJ1J1bGVfb3ZlcnJpZGUnLCBiLnNlcShiLmJpbmQoYi5hcHAoJ2lkZW50JyksICduJyksIGIucHJpbSgnOj0nKSwgYi5iaW5kKGIuYXBwKCdBbHQnKSwgJ2InKSkpO1xuICBiLmlubGluZSgnUnVsZV9leHRlbmQnLCBiLnNlcShiLmJpbmQoYi5hcHAoJ2lkZW50JyksICduJyksIGIucHJpbSgnKz0nKSwgYi5iaW5kKGIuYXBwKCdBbHQnKSwgJ2InKSkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnUnVsZScsIGIuYWx0KGIuYXBwKCdSdWxlX2RlZmluZScpLCBiLmFwcCgnUnVsZV9vdmVycmlkZScpLCBiLmFwcCgnUnVsZV9leHRlbmQnKSkpO1xuICBiLmlubGluZSgnQWx0X3JlYycsIGIuc2VxKGIuYmluZChiLmFwcCgnVGVybScpLCAneCcpLCBiLnByaW0oJ3wnKSwgYi5iaW5kKGIuYXBwKCdBbHQnKSwgJ3knKSkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnQWx0JywgYi5hbHQoYi5hcHAoJ0FsdF9yZWMnKSwgYi5hcHAoJ1Rlcm0nKSkpO1xuICBiLmlubGluZSgnVGVybV9pbmxpbmUnLCBiLnNlcShiLmJpbmQoYi5hcHAoJ1NlcScpLCAneCcpLCBiLnByaW0oJ3snKSwgYi5iaW5kKGIuYXBwKCduYW1lJyksICduJyksIGIucHJpbSgnfScpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCdUZXJtJywgYi5hbHQoYi5hcHAoJ1Rlcm1faW5saW5lJyksIGIuYXBwKCdTZXEnKSkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnU2VxJywgYi5tYW55KGIuYXBwKCdGYWN0b3InKSwgMCkpO1xuICBiLmlubGluZSgnRmFjdG9yX2JpbmQnLCBiLnNlcShiLmJpbmQoYi5hcHAoJ0l0ZXInKSwgJ3gnKSwgYi5wcmltKCc6JyksIGIuYmluZChiLmFwcCgnaWRlbnQnKSwgJ24nKSkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnRmFjdG9yJywgYi5hbHQoYi5hcHAoJ0ZhY3Rvcl9iaW5kJyksIGIuYXBwKCdJdGVyJykpKTtcbiAgYi5pbmxpbmUoJ0l0ZXJfc3RhcicsIGIuc2VxKGIuYmluZChiLmFwcCgnUHJlZCcpLCAneCcpLCBiLnByaW0oJyonKSkpO1xuICBiLmlubGluZSgnSXRlcl9wbHVzJywgYi5zZXEoYi5iaW5kKGIuYXBwKCdQcmVkJyksICd4JyksIGIucHJpbSgnKycpKSk7XG4gIGIuaW5saW5lKCdJdGVyX29wdCcsIGIuc2VxKGIuYmluZChiLmFwcCgnUHJlZCcpLCAneCcpLCBiLnByaW0oJz8nKSkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnSXRlcicsIGIuYWx0KGIuYXBwKCdJdGVyX3N0YXInKSwgYi5hcHAoJ0l0ZXJfcGx1cycpLCBiLmFwcCgnSXRlcl9vcHQnKSwgYi5hcHAoJ1ByZWQnKSkpO1xuICBiLmlubGluZSgnUHJlZF9ub3QnLCBiLnNlcShiLnByaW0oJ34nKSwgYi5iaW5kKGIuYXBwKCdCYXNlJyksICd4JykpKTtcbiAgYi5pbmxpbmUoJ1ByZWRfbG9va2FoZWFkJywgYi5zZXEoYi5wcmltKCcmJyksIGIuYmluZChiLmFwcCgnQmFzZScpLCAneCcpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCdQcmVkJywgYi5hbHQoYi5hcHAoJ1ByZWRfbm90JyksIGIuYXBwKCdQcmVkX2xvb2thaGVhZCcpLCBiLmFwcCgnQmFzZScpKSk7XG4gIGIuaW5saW5lKCdCYXNlX2FwcGxpY2F0aW9uJywgYi5zZXEoYi5iaW5kKGIuYXBwKCdpZGVudCcpLCAncnVsZU5hbWUnKSwgYi5ub3QoYi5hbHQoYi5zZXEoYi5vcHQoYi5hcHAoJ3J1bGVEZXNjcicpKSwgYi5wcmltKCc9JykpLCBiLnByaW0oJzo9JyksIGIucHJpbSgnKz0nKSkpKSk7XG4gIGIuaW5saW5lKCdCYXNlX3ByaW0nLCBiLmFsdChiLmFwcCgna2V5d29yZCcpLCBiLmFwcCgnc3RyaW5nJyksIGIuYXBwKCdyZWdFeHAnKSwgYi5hcHAoJ251bWJlcicpKSk7XG4gIGIuaW5saW5lKCdCYXNlX2xzdCcsIGIuc2VxKGIucHJpbSgnWycpLCBiLmJpbmQoYi5hcHAoJ0FsdCcpLCAneCcpLCBiLnByaW0oJ10nKSkpO1xuICBiLmlubGluZSgnQmFzZV9zdHInLCBiLnNlcShiLnByaW0oJ1wiJyksIGIuYmluZChiLmFwcCgnQWx0JyksICd4JyksIGIucHJpbSgnXCInKSkpO1xuICBiLmlubGluZSgnQmFzZV9wYXJlbicsIGIuc2VxKGIucHJpbSgnKCcpLCBiLmJpbmQoYi5hcHAoJ0FsdCcpLCAneCcpLCBiLnByaW0oJyknKSkpO1xuICBiLmlubGluZSgnQmFzZV9vYmonLCBiLnNlcShiLnByaW0oJ3snKSwgYi5iaW5kKGIub3B0KGIucHJpbSgnLi4uJykpLCAnbGVuaWVudCcpLCBiLnByaW0oJ30nKSkpO1xuICBiLmlubGluZSgnQmFzZV9vYmpXaXRoUHJvcHMnLCBiLnNlcShiLnByaW0oJ3snKSwgYi5iaW5kKGIuYXBwKCdQcm9wcycpLCAncHMnKSwgYi5iaW5kKGIub3B0KGIuc2VxKGIucHJpbSgnLCcpLCBiLnByaW0oJy4uLicpKSksICdsZW5pZW50JyksIGIucHJpbSgnfScpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCdCYXNlJywgYi5hbHQoYi5hcHAoJ0Jhc2VfYXBwbGljYXRpb24nKSwgYi5hcHAoJ0Jhc2VfcHJpbScpLCBiLmFwcCgnQmFzZV9sc3QnKSwgYi5hcHAoJ0Jhc2Vfc3RyJyksIGIuYXBwKCdCYXNlX3BhcmVuJyksIGIuYXBwKCdCYXNlX29iaicpLCBiLmFwcCgnQmFzZV9vYmpXaXRoUHJvcHMnKSkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnUHJvcCcsIGIuc2VxKGIuYmluZChiLmFsdChiLmFwcCgnbmFtZScpLCBiLmFwcCgnc3RyaW5nJykpLCAnbicpLCBiLnByaW0oJzonKSwgYi5iaW5kKGIuYXBwKCdCYXNlJyksICdwJykpKTtcbiAgYi5pbmxpbmUoJ1Byb3BzX3JlYycsIGIuc2VxKGIuYmluZChiLmFwcCgnUHJvcCcpLCAncCcpLCBiLnByaW0oJywnKSwgYi5iaW5kKGIuYXBwKCdQcm9wcycpLCAncHMnKSkpO1xuICBiLmlubGluZSgnUHJvcHNfYmFzZScsIGIuYmluZChiLmFwcCgnUHJvcCcpLCAncCcpKTtcbiAgYi5zZXRSdWxlRGVzY3JpcHRpb24odW5kZWZpbmVkKTsgYi5kZWZpbmUoJ1Byb3BzJywgYi5hbHQoYi5hcHAoJ1Byb3BzX3JlYycpLCBiLmFwcCgnUHJvcHNfYmFzZScpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKCcgcnVsZSBkZXNjcmlwdGlvbiBmb3IgdXNlIGluIGVycm9yIG1lc3NhZ2VzJyk7IGIuZGVmaW5lKCdydWxlRGVzY3InLCBiLnNlcShiLnByaW0oJy0tJyksIGIuYmluZChiLmFwcCgncnVsZURlc2NyVGV4dCcpLCAndCcpLCBiLnByaW0oJ1xcbicpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCdydWxlRGVzY3JUZXh0JywgYi5tYW55KGIuc2VxKGIubm90KGIucHJpbSgnXFxuJykpLCBiLmFwcCgnXycpKSwgMCkpO1xuICBiLmlubGluZSgnc3BhY2Vfc2luZ2xlTGluZScsIGIuc2VxKGIucHJpbSgnLy8nKSwgYi5tYW55KGIuc2VxKGIubm90KGIucHJpbSgnXFxuJykpLCBiLmFwcCgnXycpKSwgMCksIGIucHJpbSgnXFxuJykpKTtcbiAgYi5pbmxpbmUoJ3NwYWNlX211bHRpTGluZScsIGIuc2VxKGIucHJpbSgnLyonKSwgYi5tYW55KGIuc2VxKGIubm90KGIucHJpbSgnKi8nKSksIGIuYXBwKCdfJykpLCAwKSwgYi5wcmltKCcqLycpKSk7XG4gIGIuZXh0ZW5kKCdzcGFjZScsIGIuYWx0KGIuYXBwKCdzcGFjZV9zaW5nbGVMaW5lJyksIGIuYXBwKCdzcGFjZV9tdWx0aUxpbmUnKSkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbignIG5hbWUnKTsgYi5kZWZpbmUoJ25hbWUnLCBiLnNlcShiLmFwcCgnbmFtZUZpcnN0JyksIGIubWFueShiLmFwcCgnbmFtZVJlc3QnKSwgMCkpKTtcbiAgYi5zZXRSdWxlRGVzY3JpcHRpb24odW5kZWZpbmVkKTsgYi5kZWZpbmUoJ25hbWVGaXJzdCcsIGIuYWx0KGIucHJpbSgnXycpLCBiLmFwcCgnbGV0dGVyJykpKTtcbiAgYi5zZXRSdWxlRGVzY3JpcHRpb24odW5kZWZpbmVkKTsgYi5kZWZpbmUoJ25hbWVSZXN0JywgYi5hbHQoYi5wcmltKCdfJyksIGIuYXBwKCdhbG51bScpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKCcgaWRlbnRpZmllcicpOyBiLmRlZmluZSgnaWRlbnQnLCBiLnNlcShiLm5vdChiLmFwcCgna2V5d29yZCcpKSwgYi5iaW5kKGIuYXBwKCduYW1lJyksICduJykpKTtcbiAgYi5pbmxpbmUoJ2tleXdvcmRfdW5kZWZpbmVkJywgYi5zZXEoYi5wcmltKCd1bmRlZmluZWQnKSwgYi5ub3QoYi5hcHAoJ25hbWVSZXN0JykpKSk7XG4gIGIuaW5saW5lKCdrZXl3b3JkX251bGwnLCBiLnNlcShiLnByaW0oJ251bGwnKSwgYi5ub3QoYi5hcHAoJ25hbWVSZXN0JykpKSk7XG4gIGIuaW5saW5lKCdrZXl3b3JkX3RydWUnLCBiLnNlcShiLnByaW0oJ3RydWUnKSwgYi5ub3QoYi5hcHAoJ25hbWVSZXN0JykpKSk7XG4gIGIuaW5saW5lKCdrZXl3b3JkX2ZhbHNlJywgYi5zZXEoYi5wcmltKCdmYWxzZScpLCBiLm5vdChiLmFwcCgnbmFtZVJlc3QnKSkpKTtcbiAgYi5zZXRSdWxlRGVzY3JpcHRpb24odW5kZWZpbmVkKTsgYi5kZWZpbmUoJ2tleXdvcmQnLCBiLmFsdChiLmFwcCgna2V5d29yZF91bmRlZmluZWQnKSwgYi5hcHAoJ2tleXdvcmRfbnVsbCcpLCBiLmFwcCgna2V5d29yZF90cnVlJyksIGIuYXBwKCdrZXl3b3JkX2ZhbHNlJykpKTtcbiAgYi5zZXRSdWxlRGVzY3JpcHRpb24oJyBzdHJpbmcgbGl0ZXJhbCcpOyBiLmRlZmluZSgnc3RyaW5nJywgYi5zZXEoYi5wcmltKFwiJ1wiKSwgYi5iaW5kKGIubWFueShiLmFwcCgnc0NoYXInKSwgMCksICdjcycpLCBiLnByaW0oXCInXCIpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCdzQ2hhcicsIGIuYWx0KGIuc2VxKGIucHJpbSgnXFxcXHgnKSwgYi5hcHAoJ2hleERpZ2l0JyksIGIuYXBwKCdoZXhEaWdpdCcpKSwgYi5zZXEoYi5wcmltKCdcXFxcdScpLCBiLmFwcCgnaGV4RGlnaXQnKSwgYi5hcHAoJ2hleERpZ2l0JyksIGIuYXBwKCdoZXhEaWdpdCcpLCBiLmFwcCgnaGV4RGlnaXQnKSksIGIuc2VxKGIucHJpbSgnXFxcXCcpLCBiLmFwcCgnXycpKSwgYi5zZXEoYi5ub3QoYi5wcmltKFwiJ1wiKSksIGIubm90KGIucHJpbSgnXFxuJykpLCBiLmFwcCgnXycpKSkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbignIHJlZ3VsYXIgZXhwcmVzc2lvbicpOyBiLmRlZmluZSgncmVnRXhwJywgYi5zZXEoYi5wcmltKCcvJyksIGIuYmluZChiLmFwcCgncmVDaGFyQ2xhc3MnKSwgJ2UnKSwgYi5wcmltKCcvJykpKTtcbiAgYi5zZXRSdWxlRGVzY3JpcHRpb24odW5kZWZpbmVkKTsgYi5kZWZpbmUoJ3JlQ2hhckNsYXNzJywgYi5zZXEoYi5wcmltKCdbJyksIGIubWFueShiLmFsdChiLnByaW0oJ1xcXFxdJyksIGIuc2VxKGIubm90KGIucHJpbSgnXScpKSwgYi5hcHAoJ18nKSkpLCAwKSwgYi5wcmltKCddJykpKTtcbiAgYi5zZXRSdWxlRGVzY3JpcHRpb24oJyBudW1iZXInKTsgYi5kZWZpbmUoJ251bWJlcicsIGIuc2VxKGIub3B0KGIucHJpbSgnLScpKSwgYi5tYW55KGIuYXBwKCdkaWdpdCcpLCAxKSkpO1xuICByZXR1cm4gYi5idWlsZChvcHROYW1lc3BhY2UpO1xufSk7XG4iLCJleHBvcnRzLm9iamVjdFV0aWxzID0gcmVxdWlyZSgnLi9vYmplY3RVdGlscy5qcycpXG5leHBvcnRzLnN0cmluZ1V0aWxzID0gcmVxdWlyZSgnLi9zdHJpbmdVdGlscy5qcycpXG5leHBvcnRzLmVxdWFscyA9IHJlcXVpcmUoJy4vZXF1YWxzLmpzJylcbmV4cG9ydHMuYnJvd3NlciA9IHJlcXVpcmUoJy4vYnJvd3Nlci5qcycpXG4iLCJ2YXIgdGhpc01vZHVsZSA9IGV4cG9ydHNcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIExvZ2dpbmdcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBzdWJzY3JpYmVkID0ge31cblxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbihzdWJqZWN0IC8qICwgLi4uICovKSB7XG4gIGlmICghc3Vic2NyaWJlZFtzdWJqZWN0XSlcbiAgICByZXR1cm5cbiAgYXJndW1lbnRzWzBdID0gJ1snICsgc3ViamVjdCArICddJ1xuICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpXG59XG5cbmV4cG9ydHMuc3Vic2NyaWJlID0gZnVuY3Rpb24oc3ViamVjdCkge1xuICBzdWJzY3JpYmVkW3N1YmplY3RdID0gdHJ1ZVxufVxuXG5leHBvcnRzLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24oc3ViamVjdCkge1xuICBkZWxldGUgc2hvd2luZ1tzdWJqZWN0XVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQXNzZXJ0cywgZXJyb3JzLCBldGMuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnRzLmVycm9yID0gZnVuY3Rpb24oLyogYXJnMSwgYXJnMiwgLi4uICovKSB7XG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIGFyZ3MpXG4gIHRocm93ICdlcnJvcjogJyArIGFyZ3Muam9pbignICcpXG59XG5cbmV4cG9ydHMuc2FuaXR5Q2hlY2sgPSBmdW5jdGlvbihuYW1lLCBjb25kaXRpb24pIHtcbiAgaWYgKCFjb25kaXRpb24pXG4gICAgdGhpc01vZHVsZS5lcnJvcignZmFpbGVkIHNhbml0eSBjaGVjazonLCBuYW1lKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRE9NIHV0aWxzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnRzLnByZXR0eVByaW50Tm9kZSA9IGZ1bmN0aW9uKG5vZGUsIGVuZE5vZGUsIGVuZE9mZnNldCkge1xuICBpZiAobm9kZSBpbnN0YW5jZW9mIFRleHQpIHtcbiAgICBpZiAobm9kZSA9PT0gZW5kTm9kZSlcbiAgICAgIHJldHVybiAndGV4dHsnICsgbm9kZS5kYXRhLnN1YnN0cigwLCBlbmRPZmZzZXQpICsgJ3wnICsgbm9kZS5kYXRhLnN1YnN0cihlbmRPZmZzZXQpICsgJ30nXG4gICAgZWxzZVxuICAgICAgcmV0dXJuICd0ZXh0eycgKyBub2RlLmRhdGEgKyAnfSdcbiAgfVxuXG4gIHZhciBwYXJ0cyA9IFtub2RlLnRhZ05hbWUsICd7J11cbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICBpZiAobm9kZSA9PT0gZW5kTm9kZSAmJiBlbmRPZmZzZXQgPT0gaWR4KVxuICAgICAgcGFydHMucHVzaCgnfCcpXG4gICAgcGFydHMucHVzaCh0aGlzTW9kdWxlLnByZXR0eVByaW50Tm9kZShub2RlLmNoaWxkTm9kZXMuaXRlbShpZHgpLCBlbmROb2RlLCBlbmRPZmZzZXQpKVxuICB9XG4gIGlmIChub2RlID09PSBlbmROb2RlICYmIGVuZE9mZnNldCA9PSBub2RlLmNoaWxkTm9kZXMubGVuZ3RoKVxuICAgIHBhcnRzLnB1c2goJ3wnKVxuICBwYXJ0cy5wdXNoKCd9JylcbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG5cbiIsIi8vIEhlbHBlcnNcblxuZnVuY3Rpb24gZG91YmxlRXF1YWxzKHgsIHkpIHtcbiAgcmV0dXJuIHggPT0geVxufVxuXG5mdW5jdGlvbiB0cmlwbGVFcXVhbHMoeCwgeSkge1xuICByZXR1cm4geCA9PT0geVxufVxuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZSh4KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHhcbiAgcmV0dXJuIHR5cGUgIT09ICdvYmplY3QnXG59XG5cbmZ1bmN0aW9uIGVxdWFscyh4LCB5LCBkZWVwLCBlcUZuKSB7XG4gIGlmIChpc1ByaW1pdGl2ZSh4KSlcbiAgICByZXR1cm4gZXFGbih4LCB5KVxuICBmb3IgKHZhciBwIGluIHgpXG4gICAgaWYgKGRlZXAgJiYgIWVxdWFscyh4W3BdLCB5W3BdLCBkZWVwLCBlcUZuKSB8fFxuICAgICAgICAhZGVlcCAmJiAhZXFGbih4W3BdLCB5W3BdKSlcbiAgICAgIHJldHVybiBmYWxzZVxuICBmb3IgKHZhciBwIGluIHkpXG4gICAgaWYgKHlbcF0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB4W3BdID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gaGF2ZVNhbWVDb250ZW50c0luQW55T3JkZXIoYXJyMSwgYXJyMiwgZGVlcCwgZXFGbikge1xuICBpZiAoIWFycjEgaW5zdGFuY2VvZiBBcnJheSB8fCAhYXJyMiBpbnN0YW5jZW9mIEFycmF5IHx8XG4gICAgICBhcnIxLmxlbmd0aCAhPT0gYXJyMi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlXG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFycjEubGVuZ3RoOyBpZHgrKykge1xuICAgIHZhciB4ID0gYXJyMVtpZHhdXG4gICAgdmFyIGZvdW5kWCA9IGFycjIuc29tZShmdW5jdGlvbih5KSB7XG4gICAgICByZXR1cm4gZXF1YWxzKHgsIHksIGRlZXAsIGVxRm4pXG4gICAgfSlcbiAgICBpZiAoIWZvdW5kWClcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbi8vIFB1YmxpYyBtZXRob2RzXG5cbmV4cG9ydHMuZXF1YWxzID0gZnVuY3Rpb24oeCwgeSkge1xuICByZXR1cm4gZXF1YWxzKHgsIHksIGZhbHNlLCBkb3VibGVFcXVhbHMpXG59XG5cbmV4cG9ydHMuZGVlcEVxdWFscyA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgcmV0dXJuIGVxdWFscyh4LCB5LCB0cnVlLCBkb3VibGVFcXVhbHMpXG59XG5cbmV4cG9ydHMuc3RyaWN0RXF1YWxzID0gZnVuY3Rpb24oeCwgeSkge1xuICByZXR1cm4gZXF1YWxzKHgsIHksIGZhbHNlLCB0cmlwbGVFcXVhbHMpXG59XG5cbmV4cG9ydHMuc3RyaWN0RGVlcEVxdWFscyA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgcmV0dXJuIGVxdWFscyh4LCB5LCB0cnVlLCB0cmlwbGVFcXVhbHMpXG59XG5cbmV4cG9ydHMuaGF2ZVNhbWVDb250ZW50c0luQW55T3JkZXIgPSBmdW5jdGlvbihhcnIxLCBhcnIyKSB7XG4gIHJldHVybiBoYXZlU2FtZUNvbnRlbnRzSW5BbnlPcmRlcihhcnIxLCBhcnIyLCB0cnVlLCBkb3VibGVFcXVhbHMpXG59XG5cbiIsInZhciB0aGlzTW9kdWxlID0gZXhwb3J0c1xuXG5leHBvcnRzLm9iamVjdFRoYXREZWxlZ2F0ZXNUbyA9IGZ1bmN0aW9uKG9iaiwgb3B0UHJvcGVydGllcykge1xuICBmdW5jdGlvbiBjb25zKCkge31cbiAgY29ucy5wcm90b3R5cGUgPSBvYmpcbiAgdmFyIGFucyA9IG5ldyBjb25zKClcbiAgaWYgKG9wdFByb3BlcnRpZXMpXG4gICAgdGhpc01vZHVsZS5rZXlzQW5kVmFsdWVzRG8ob3B0UHJvcGVydGllcywgZnVuY3Rpb24oaywgdikge1xuICAgICAgYW5zW2tdID0gdlxuICAgIH0pXG4gIHJldHVybiBhbnNcbn1cblxuZXhwb3J0cy5mb3JtYWxzID0gZnVuY3Rpb24oZnVuYykge1xuICByZXR1cm4gZnVuYy5cbiAgICB0b1N0cmluZygpLlxuICAgIG1hdGNoKC9cXCgoLio/KVxcKS8pWzBdLlxuICAgIHJlcGxhY2UoLyAvZywgJycpLlxuICAgIHNsaWNlKDEsIC0xKS5cbiAgICBzcGxpdCgnLCcpLlxuICAgIGZpbHRlcihmdW5jdGlvbihtb2R1bGVOYW1lKSB7IHJldHVybiBtb2R1bGVOYW1lICE9ICcnIH0pXG59XG5cbmV4cG9ydHMua2V5c0RvID0gZnVuY3Rpb24ob2JqZWN0LCBmbikge1xuICBmb3IgKHZhciBwIGluIG9iamVjdClcbiAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KHApKVxuICAgICAgZm4ocClcbn1cblxuZXhwb3J0cy52YWx1ZXNEbyA9IGZ1bmN0aW9uKG9iamVjdCwgZm4pIHtcbiAgdGhpc01vZHVsZS5rZXlzRG8ob2JqZWN0LCBmdW5jdGlvbihwKSB7IGZuKG9iamVjdFtwXSkgfSlcbn1cblxuZXhwb3J0cy5rZXlzQW5kVmFsdWVzRG8gPSBmdW5jdGlvbihvYmplY3QsIGZuKSB7XG4gIHRoaXNNb2R1bGUua2V5c0RvKG9iamVjdCwgZnVuY3Rpb24ocCkgeyBmbihwLCBvYmplY3RbcF0pIH0pXG59XG5cbmV4cG9ydHMua2V5c0l0ZXJhdG9yID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHJldHVybiBmdW5jdGlvbihmbikgeyBzZWxmLmtleXNEbyhvYmplY3QsIGZuKSB9XG59XG5cbmV4cG9ydHMudmFsdWVzSXRlcmF0b3IgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGZuKSB7IHNlbGYudmFsdWVzRG8ob2JqZWN0LCBmbikgfVxufVxuXG5leHBvcnRzLmtleXNBbmRWYWx1ZXNJdGVyYXRvciA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24oZm4pIHsgc2VsZi5rZXlzQW5kVmFsdWVzRG8ob2JqZWN0LCBmbikgfVxufVxuXG5leHBvcnRzLnZhbHVlcyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICB2YXIgYW5zID0gW11cbiAgdGhpc01vZHVsZS5rZXlzRG8ob2JqZWN0LCBmdW5jdGlvbihwKSB7IGFucy5wdXNoKG9iamVjdFtwXSkgfSlcbiAgcmV0dXJuIGFuc1xufVxuXG5mdW5jdGlvbiBTdHJpbmdCdWZmZXIoKSB7XG4gIHRoaXMuc3RyaW5ncyA9IFtdXG4gIHRoaXMubGVuZ3RoU29GYXIgPSAwXG59XG5cblN0cmluZ0J1ZmZlci5wcm90b3R5cGUgPSB7XG4gIG5leHRQdXRBbGw6IGZ1bmN0aW9uKHMpIHtcbiAgICB0aGlzLnN0cmluZ3MucHVzaChzKVxuICAgIHRoaXMubGVuZ3RoU29GYXIgKz0gcy5sZW5ndGhcbiAgfSxcblxuICBjb250ZW50czogZnVuY3Rpb24oKSAge1xuICAgIHJldHVybiB0aGlzLnN0cmluZ3Muam9pbignJylcbiAgfVxufVxuXG5leHBvcnRzLnN0cmluZ0J1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFN0cmluZ0J1ZmZlcigpXG59XG5cbmZ1bmN0aW9uIENvbHVtblN0cmluZ0J1ZmZlcigpIHtcbiAgdGhpcy5saW5lcyA9IFtdXG4gIHRoaXMubmV3TGluZSgpXG59XG5cbkNvbHVtblN0cmluZ0J1ZmZlci5wcm90b3R5cGUgPSB7XG4gIG5leHRQdXRBbGw6IGZ1bmN0aW9uKHMpIHtcbiAgICB0aGlzLmN1cnJlbnRDb2x1bW4oKS5wdXNoKHMpXG4gIH0sXG5cbiAgY29udGVudHM6IGZ1bmN0aW9uKCkge1xuICAgIC8vIENvbnZlcnQgY29sdW1ucyBmcm9tIGxpc3RzIG9mIHN0cmluZ3MgdG8gc3RyaW5ncywgYW5kIHJlY29yZCBjb2x1bW4gbGVuZ3Roc1xuICAgIHZhciBjb2x1bW5MZW5ndGhzID0gW11cbiAgICB0aGlzLmxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgZm9yICh2YXIgY29sSWR4ID0gMDsgY29sSWR4IDwgbGluZS5sZW5ndGg7IGNvbElkeCsrKSB7XG4gICAgICAgIHZhciBjb2x1bW4gPSBsaW5lW2NvbElkeF1cbiAgICAgICAgbGluZVtjb2xJZHhdID0gY29sdW1uLmpvaW4oJycpXG4gICAgICAgIGlmIChjb2x1bW5MZW5ndGhzW2NvbElkeF0gPT09IHVuZGVmaW5lZCB8fCBjb2x1bW5MZW5ndGhzW2NvbElkeF0gPCBsaW5lW2NvbElkeF0ubGVuZ3RoKVxuICAgICAgICAgIGNvbHVtbkxlbmd0aHNbY29sSWR4XSA9IGxpbmVbY29sSWR4XS5sZW5ndGhcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdmFyIHNiID0gdGhpc01vZHVsZS5zdHJpbmdCdWZmZXIoKVxuICAgIHRoaXMubGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgICBmb3IgKHZhciBjb2xJZHggPSAwOyBjb2xJZHggPCBsaW5lLmxlbmd0aDsgY29sSWR4KyspIHtcbiAgICAgICAgdmFyIGNvbHVtbiA9IGxpbmVbY29sSWR4XVxuICAgICAgICBzYi5uZXh0UHV0QWxsKGNvbHVtbilcbiAgICAgICAgdmFyIG51bVNwYWNlcyA9IGNvbHVtbkxlbmd0aHNbY29sSWR4XSAtIGNvbHVtbi5sZW5ndGhcbiAgICAgICAgd2hpbGUgKG51bVNwYWNlcy0tID4gMClcbiAgICAgICAgICBzYi5uZXh0UHV0QWxsKCcgJylcbiAgICAgIH1cbiAgICAgIHNiLm5leHRQdXRBbGwoJ1xcbicpXG4gICAgfSlcbiAgICByZXR1cm4gc2IuY29udGVudHMoKVxuICB9LFxuXG4gIG5ld0xpbmU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGluZXMucHVzaChbXSlcbiAgICB0aGlzLm5ld0NvbHVtbigpXG4gIH0sXG5cbiAgbmV3Q29sdW1uOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmN1cnJlbnRMaW5lKCkucHVzaChbXSlcbiAgfSxcblxuICBjdXJyZW50Q29sdW1uOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGluZSA9IHRoaXMuY3VycmVudExpbmUoKVxuICAgIHJldHVybiBsaW5lW2xpbmUubGVuZ3RoIC0gMV1cbiAgfSxcblxuICBjdXJyZW50TGluZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubGluZXNbdGhpcy5saW5lcy5sZW5ndGggLSAxXVxuICB9XG59XG5cbmV4cG9ydHMuY29sdW1uU3RyaW5nQnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgQ29sdW1uU3RyaW5nQnVmZmVyKClcbn1cblxuIiwidmFyIG9iamVjdFV0aWxzID0gcmVxdWlyZSgnLi9vYmplY3RVdGlscy5qcycpXG52YXIgdGhpc01vZHVsZSA9IGV4cG9ydHNcblxuLy8gSGVscGVyc1xuXG5mdW5jdGlvbiBwYWQobnVtYmVyQXNTdHJpbmcsIGxlbikge1xuICB2YXIgemVyb3MgPSBbXVxuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBudW1iZXJBc1N0cmluZy5sZW5ndGggLSBsZW47IGlkeCsrKVxuICAgIHplcm9zLnB1c2goJzAnKVxuICByZXR1cm4gemVyb3Muam9pbignJykgKyBudW1iZXJBc1N0cmluZ1xufVxuXG52YXIgZXNjYXBlU3RyaW5nRm9yID0ge31cbmZvciAodmFyIGMgPSAwOyBjIDwgMTI4OyBjKyspXG4gIGVzY2FwZVN0cmluZ0ZvcltjXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoYylcbmVzY2FwZVN0cmluZ0ZvcltcIidcIi5jaGFyQ29kZUF0KDApXSAgPSBcIlxcXFwnXCJcbmVzY2FwZVN0cmluZ0ZvclsnXCInLmNoYXJDb2RlQXQoMCldICA9ICdcXFxcXCInXG5lc2NhcGVTdHJpbmdGb3JbJ1xcXFwnLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxcXFxcJ1xuZXNjYXBlU3RyaW5nRm9yWydcXGInLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxiJ1xuZXNjYXBlU3RyaW5nRm9yWydcXGYnLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxmJ1xuZXNjYXBlU3RyaW5nRm9yWydcXG4nLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxuJ1xuZXNjYXBlU3RyaW5nRm9yWydcXHInLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxyJ1xuZXNjYXBlU3RyaW5nRm9yWydcXHQnLmNoYXJDb2RlQXQoMCldID0gJ1xcXFx0J1xuZXNjYXBlU3RyaW5nRm9yWydcXHYnLmNoYXJDb2RlQXQoMCldID0gJ1xcXFx2J1xuXG4vLyBQdWJsaWMgbWV0aG9kc1xuXG5leHBvcnRzLmVzY2FwZUNoYXIgPSBmdW5jdGlvbihjLCBvcHREZWxpbSkge1xuICB2YXIgY2hhckNvZGUgPSBjLmNoYXJDb2RlQXQoMClcbiAgaWYgKChjID09ICdcIicgfHwgYyA9PSBcIidcIikgJiYgb3B0RGVsaW0gJiYgYyAhPT0gb3B0RGVsaW0pXG4gICAgcmV0dXJuIGNcbiAgZWxzZSBpZiAoY2hhckNvZGUgPCAxMjgpXG4gICAgcmV0dXJuIGVzY2FwZVN0cmluZ0ZvcltjaGFyQ29kZV1cbiAgZWxzZSBpZiAoMTI4IDw9IGNoYXJDb2RlICYmIGNoYXJDb2RlIDwgMjU2KVxuICAgIHJldHVybiAnXFxcXHgnICsgcGFkKGNoYXJDb2RlLnRvU3RyaW5nKDE2KSwgMilcbiAgZWxzZVxuICAgIHJldHVybiAnXFxcXHUnICsgcGFkKGNoYXJDb2RlLnRvU3RyaW5nKDE2KSwgNClcbn1cblxuZXhwb3J0cy51bmVzY2FwZUNoYXIgPSBmdW5jdGlvbihzKSB7XG4gIGlmIChzLmNoYXJBdCgwKSA9PSAnXFxcXCcpXG4gICAgc3dpdGNoIChzLmNoYXJBdCgxKSkge1xuICAgICAgY2FzZSAnYic6ICByZXR1cm4gJ1xcYidcbiAgICAgIGNhc2UgJ2YnOiAgcmV0dXJuICdcXGYnXG4gICAgICBjYXNlICduJzogIHJldHVybiAnXFxuJ1xuICAgICAgY2FzZSAncic6ICByZXR1cm4gJ1xccidcbiAgICAgIGNhc2UgJ3QnOiAgcmV0dXJuICdcXHQnXG4gICAgICBjYXNlICd2JzogIHJldHVybiAnXFx2J1xuICAgICAgY2FzZSAneCc6ICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChzLnN1YnN0cmluZygyLCA0KSwgMTYpKVxuICAgICAgY2FzZSAndSc6ICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChzLnN1YnN0cmluZygyLCA2KSwgMTYpKVxuICAgICAgZGVmYXVsdDogICByZXR1cm4gcy5jaGFyQXQoMSlcbiAgICB9XG4gIGVsc2VcbiAgICByZXR1cm4gc1xufVxuXG5mdW5jdGlvbiBwcmludE9uKHgsIHdzKSB7XG4gIGlmICh4IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICB3cy5uZXh0UHV0QWxsKCdbJylcbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB4Lmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIGlmIChpZHggPiAwKVxuICAgICAgICB3cy5uZXh0UHV0QWxsKCcsICcpXG4gICAgICBwcmludE9uKHhbaWR4XSwgd3MpXG4gICAgfVxuICAgIHdzLm5leHRQdXRBbGwoJ10nKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB4ID09PSAnc3RyaW5nJykge1xuICAgIHZhciBoYXNTaW5nbGVRdW90ZXMgPSB4LmluZGV4T2YoXCInXCIpID49IDBcbiAgICB2YXIgaGFzRG91YmxlUXVvdGVzID0geC5pbmRleE9mKCdcIicpID49IDBcbiAgICB2YXIgZGVsaW0gPSBoYXNTaW5nbGVRdW90ZXMgJiYgIWhhc0RvdWJsZVF1b3RlcyA/ICdcIicgOiBcIidcIlxuICAgIHdzLm5leHRQdXRBbGwoZGVsaW0pXG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgeC5sZW5ndGg7IGlkeCsrKVxuICAgICAgd3MubmV4dFB1dEFsbCh0aGlzTW9kdWxlLmVzY2FwZUNoYXIoeFtpZHhdLCBkZWxpbSkpXG4gICAgd3MubmV4dFB1dEFsbChkZWxpbSlcbiAgfSBlbHNlIGlmICh4ID09PSBudWxsKSB7XG4gICAgd3MubmV4dFB1dEFsbCgnbnVsbCcpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHggPT09ICdvYmplY3QnICYmICEoeCBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICB3cy5uZXh0UHV0QWxsKCd7JylcbiAgICB2YXIgZmlyc3QgPSB0cnVlXG4gICAgb2JqZWN0VXRpbHMua2V5c0FuZFZhbHVlc0RvKHgsIGZ1bmN0aW9uKGssIHYpIHtcbiAgICAgIGlmIChmaXJzdClcbiAgICAgICAgZmlyc3QgPSBmYWxzZVxuICAgICAgZWxzZVxuICAgICAgICB3cy5uZXh0UHV0QWxsKCcsICcpXG4gICAgICBwcmludE9uKGssIHdzKVxuICAgICAgd3MubmV4dFB1dEFsbCgnOiAnKVxuICAgICAgcHJpbnRPbih2LCB3cylcbiAgICB9KVxuICAgIHdzLm5leHRQdXRBbGwoJ30nKVxuICB9IGVsc2VcbiAgICB3cy5uZXh0UHV0QWxsKCcnICsgeClcbn1cblxuZXhwb3J0cy5wcmludFN0cmluZyA9IGZ1bmN0aW9uKG9iaikge1xuICB2YXIgd3MgPSBvYmplY3RVdGlscy5zdHJpbmdCdWZmZXIoKVxuICBwcmludE9uKG9iaiwgd3MpXG4gIHJldHVybiB3cy5jb250ZW50cygpXG59XG5cbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgR3JhbW1hciA9IHJlcXVpcmUoJy4vR3JhbW1hci5qcycpO1xudmFyIGRlY2xzID0gcmVxdWlyZSgnLi9kZWNscy5qcycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzLmpzJyk7XG5cbnZhciBhd2xpYiA9IHJlcXVpcmUoJ2F3bGliJyk7XG52YXIgb2JqZWN0VGhhdERlbGVnYXRlc1RvID0gYXdsaWIub2JqZWN0VXRpbHMub2JqZWN0VGhhdERlbGVnYXRlc1RvO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gQnVpbGRlcigpIHtcbiAgdGhpcy5pbml0KCk7XG59XG5cbkJ1aWxkZXIucHJvdG90eXBlID0ge1xuICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLm5hbWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zdXBlckdyYW1tYXIgPSBHcmFtbWFyLnByb3RvdHlwZTtcbiAgICB0aGlzLnJ1bGVEZWNscyA9IFtdO1xuICB9LFxuXG4gIHNldE5hbWU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9LFxuXG4gIHNldFN1cGVyR3JhbW1hcjogZnVuY3Rpb24oZ3JhbW1hcikge1xuICAgIHRoaXMuc3VwZXJHcmFtbWFyID0gZ3JhbW1hcjtcbiAgfSxcblxuICBzZXRSdWxlRGVzY3JpcHRpb246IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB0aGlzLnJ1bGVEZXNjcmlwdGlvbiA9IHRleHQ7XG4gIH0sXG5cbiAgZGVmaW5lOiBmdW5jdGlvbihydWxlTmFtZSwgYm9keSkge1xuICAgIHRoaXMucnVsZURlY2xzLnB1c2gobmV3IGRlY2xzLkRlZmluZShydWxlTmFtZSwgYm9keSwgdGhpcy5zdXBlckdyYW1tYXIsIHRoaXMucnVsZURlc2NyaXB0aW9uKSk7XG4gICAgdGhpcy5ydWxlRGVzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gIH0sXG5cbiAgb3ZlcnJpZGU6IGZ1bmN0aW9uKHJ1bGVOYW1lLCBib2R5KSB7XG4gICAgdGhpcy5ydWxlRGVjbHMucHVzaChuZXcgZGVjbHMuT3ZlcnJpZGUocnVsZU5hbWUsIGJvZHksIHRoaXMuc3VwZXJHcmFtbWFyKSk7XG4gIH0sXG5cbiAgaW5saW5lOiBmdW5jdGlvbihydWxlTmFtZSwgYm9keSkge1xuICAgIHRoaXMucnVsZURlY2xzLnB1c2gobmV3IGRlY2xzLklubGluZShydWxlTmFtZSwgYm9keSwgdGhpcy5zdXBlckdyYW1tYXIpKTtcbiAgICByZXR1cm4gdGhpcy5hcHAocnVsZU5hbWUpO1xuICB9LFxuXG4gIGV4dGVuZDogZnVuY3Rpb24ocnVsZU5hbWUsIGJvZHkpIHtcbiAgICB0aGlzLnJ1bGVEZWNscy5wdXNoKG5ldyBkZWNscy5FeHRlbmQocnVsZU5hbWUsIGJvZHksIHRoaXMuc3VwZXJHcmFtbWFyKSk7XG4gIH0sXG5cbiAgYnVpbGQ6IGZ1bmN0aW9uKG9wdE5hbWVzcGFjZSkge1xuICAgIHZhciBzdXBlckdyYW1tYXIgPSB0aGlzLnN1cGVyR3JhbW1hcjtcbiAgICB2YXIgcnVsZURpY3QgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oc3VwZXJHcmFtbWFyLnJ1bGVEaWN0KTtcbiAgICB0aGlzLnJ1bGVEZWNscy5mb3JFYWNoKGZ1bmN0aW9uKHJ1bGVEZWNsKSB7XG4gICAgICBydWxlRGVjbC5wZXJmb3JtQ2hlY2tzKCk7XG4gICAgICBydWxlRGVjbC5pbnN0YWxsKHJ1bGVEaWN0KTtcbiAgICB9KTtcblxuICAgIHZhciBncmFtbWFyID0gbmV3IEdyYW1tYXIocnVsZURpY3QpO1xuICAgIGdyYW1tYXIuc3VwZXJHcmFtbWFyID0gc3VwZXJHcmFtbWFyO1xuICAgIGdyYW1tYXIucnVsZURlY2xzID0gdGhpcy5ydWxlRGVjbHM7XG4gICAgaWYgKHRoaXMubmFtZSkge1xuICAgICAgZ3JhbW1hci5uYW1lID0gdGhpcy5uYW1lO1xuICAgICAgaWYgKG9wdE5hbWVzcGFjZSkge1xuICAgICAgICBncmFtbWFyLm5hbWVzcGFjZU5hbWUgPSBvcHROYW1lc3BhY2UubmFtZTtcbiAgICAgICAgb3B0TmFtZXNwYWNlLmluc3RhbGwodGhpcy5uYW1lLCBncmFtbWFyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pbml0KCk7XG4gICAgcmV0dXJuIGdyYW1tYXI7XG4gIH0sXG5cbiAgcHJpbTogZnVuY3Rpb24oeCkgeyByZXR1cm4gcGV4cHJzLm1ha2VQcmltKHgpOyB9LFxuICBhbHQ6IGZ1bmN0aW9uKC8qIHRlcm0xLCB0ZXJtMSwgLi4uICovKSB7XG4gICAgdmFyIHRlcm1zID0gW107XG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaWR4XTtcbiAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBwZXhwcnMuQWx0KSB7XG4gICAgICAgIHRlcm1zID0gdGVybXMuY29uY2F0KGFyZy50ZXJtcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXJtcy5wdXNoKGFyZyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0ZXJtcy5sZW5ndGggPT09IDEgPyB0ZXJtc1swXSA6IG5ldyBwZXhwcnMuQWx0KHRlcm1zKTtcbiAgfSxcbiAgc2VxOiBmdW5jdGlvbigvKiBmYWN0b3IxLCBmYWN0b3IyLCAuLi4gKi8pIHtcbiAgICB2YXIgZmFjdG9ycyA9IFtdO1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2lkeF07XG4gICAgICBpZiAoYXJnIGluc3RhbmNlb2YgcGV4cHJzLlNlcSkge1xuICAgICAgICBmYWN0b3JzID0gZmFjdG9ycy5jb25jYXQoYXJnLmZhY3RvcnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFjdG9ycy5wdXNoKGFyZyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWN0b3JzLmxlbmd0aCA9PT0gMSA/IGZhY3RvcnNbMF0gOiBuZXcgcGV4cHJzLlNlcShmYWN0b3JzKTtcbiAgfSxcbiAgYmluZDogZnVuY3Rpb24oZXhwciwgbmFtZSkgeyByZXR1cm4gbmV3IHBleHBycy5CaW5kKGV4cHIsIG5hbWUpOyB9LFxuICBtYW55OiBmdW5jdGlvbihleHByLCBtaW5OdW1NYXRjaGVzKSB7IHJldHVybiBuZXcgcGV4cHJzLk1hbnkoZXhwciwgbWluTnVtTWF0Y2hlcyk7IH0sXG4gIG9wdDogZnVuY3Rpb24oZXhwcikgeyByZXR1cm4gbmV3IHBleHBycy5PcHQoZXhwcik7IH0sXG4gIG5vdDogZnVuY3Rpb24oZXhwcikgeyByZXR1cm4gbmV3IHBleHBycy5Ob3QoZXhwcik7IH0sXG4gIGxhOiBmdW5jdGlvbihleHByKSB7IHJldHVybiBuZXcgcGV4cHJzLkxvb2thaGVhZChleHByKTsgfSxcbiAgc3RyOiBmdW5jdGlvbihleHByKSB7IHJldHVybiBuZXcgcGV4cHJzLlN0cihleHByKTsgfSxcbiAgbHN0OiBmdW5jdGlvbihleHByKSB7IHJldHVybiBuZXcgcGV4cHJzLkxpc3QoZXhwcik7IH0sXG4gIG9iajogZnVuY3Rpb24ocHJvcGVydGllcywgaXNMZW5pZW50KSB7IHJldHVybiBuZXcgcGV4cHJzLk9iaihwcm9wZXJ0aWVzLCAhIWlzTGVuaWVudCk7IH0sXG4gIGFwcDogZnVuY3Rpb24ocnVsZU5hbWUpIHsgcmV0dXJuIG5ldyBwZXhwcnMuQXBwbHkocnVsZU5hbWUpOyB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBCdWlsZGVyO1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMuanMnKTtcbnZhciBJbnB1dFN0cmVhbSA9IHJlcXVpcmUoJy4vSW5wdXRTdHJlYW0uanMnKTtcbnZhciBNYXRjaEZhaWx1cmUgPSByZXF1aXJlKCcuL01hdGNoRmFpbHVyZS5qcycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzLmpzJyk7XG52YXIgc2tpcFNwYWNlcyA9IHJlcXVpcmUoJy4vc2tpcFNwYWNlcy5qcycpO1xuXG52YXIgYXdsaWIgPSByZXF1aXJlKCdhd2xpYicpO1xudmFyIGJyb3dzZXIgPSBhd2xpYi5icm93c2VyO1xudmFyIGtleXNEbyA9IGF3bGliLm9iamVjdFV0aWxzLmtleXNEbztcbnZhciB2YWx1ZXNEbyA9IGF3bGliLm9iamVjdFV0aWxzLnZhbHVlc0RvO1xudmFyIGZvcm1hbHMgPSBhd2xpYi5vYmplY3RVdGlscy5mb3JtYWxzO1xudmFyIG1ha2VTdHJpbmdCdWZmZXIgPSBhd2xpYi5vYmplY3RVdGlscy5zdHJpbmdCdWZmZXI7XG52YXIgbWFrZUNvbHVtblN0cmluZ0J1ZmZlciA9IGF3bGliLm9iamVjdFV0aWxzLmNvbHVtblN0cmluZ0J1ZmZlcjtcbnZhciBwcmludFN0cmluZyA9IGF3bGliLnN0cmluZ1V0aWxzLnByaW50U3RyaW5nO1xudmFyIGVxdWFscyA9IGF3bGliLmVxdWFscy5lcXVhbHM7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBHcmFtbWFyKHJ1bGVEaWN0KSB7XG4gIHRoaXMucnVsZURpY3QgPSBydWxlRGljdDtcbn1cblxuR3JhbW1hci5wcm90b3R5cGUgPSB7XG4gIHJ1bGVEaWN0OiBuZXcgKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuXyA9IHBleHBycy5hbnl0aGluZztcbiAgICB0aGlzLmVuZCA9IG5ldyBwZXhwcnMuTm90KHBleHBycy5hbnl0aGluZyk7XG4gICAgdGhpcy5zcGFjZSA9IHBleHBycy5tYWtlUHJpbSgvW1xcc10vKTtcbiAgICB0aGlzLnNwYWNlLmRlc2NyaXB0aW9uID0gJ3NwYWNlJztcbiAgICB0aGlzLnNwYWNlcyA9IG5ldyBwZXhwcnMuQWx0KFtcbiAgICAgICAgbmV3IHBleHBycy5TZXEoW25ldyBwZXhwcnMuQXBwbHkoJ3NwYWNlcycpLCBuZXcgcGV4cHJzLkFwcGx5KCdzcGFjZScpXSksXG4gICAgICAgIG5ldyBwZXhwcnMuU2VxKFtdKV0pO1xuICAgIHRoaXMuYWxudW0gPSBwZXhwcnMubWFrZVByaW0oL1swLTlhLXpBLVpdLyk7XG4gICAgdGhpcy5zcGFjZS5kZXNjcmlwdGlvbiA9ICdhbHBoYS1udW1lcmljIGNoYXJhY3Rlcic7XG4gICAgdGhpcy5sZXR0ZXIgPSBwZXhwcnMubWFrZVByaW0oL1thLXpBLVpdLyk7XG4gICAgdGhpcy5sZXR0ZXIuZGVzY3JpcHRpb24gPSAnbGV0dGVyJztcbiAgICB0aGlzLmxvd2VyID0gcGV4cHJzLm1ha2VQcmltKC9bYS16XS8pO1xuICAgIHRoaXMubG93ZXIuZGVzY3JpcHRpb24gPSAnbG93ZXItY2FzZSBsZXR0ZXInO1xuICAgIHRoaXMudXBwZXIgPSBwZXhwcnMubWFrZVByaW0oL1tBLVpdLyk7XG4gICAgdGhpcy51cHBlci5kZXNjcmlwdGlvbiA9ICd1cHBlci1jYXNlIGxldHRlcic7XG4gICAgdGhpcy5kaWdpdCA9IHBleHBycy5tYWtlUHJpbSgvWzAtOV0vKTtcbiAgICB0aGlzLmRpZ2l0LmRlc2NyaXB0aW9uID0gJ2RpZ2l0JztcbiAgICB0aGlzLmhleERpZ2l0ID0gcGV4cHJzLm1ha2VQcmltKC9bMC05YS1mQS1GXS8pO1xuICAgIHRoaXMuaGV4RGlnaXQuZGVzY3JpcHRpb24gPSAnaGV4YWRlY2ltYWwgZGlnaXQnO1xuICB9KSgpLFxuXG4gIG1hdGNoOiBmdW5jdGlvbihvYmosIHN0YXJ0UnVsZSwgb3B0VGhyb3dPbkZhaWwpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRjaENvbnRlbnRzKFtvYmpdLCBzdGFydFJ1bGUsIG9wdFRocm93T25GYWlsKTtcbiAgfSxcblxuICBtYXRjaENvbnRlbnRzOiBmdW5jdGlvbihvYmosIHN0YXJ0UnVsZSwgb3B0VGhyb3dPbkZhaWwpIHtcbiAgICB2YXIgaW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5uZXdGb3Iob2JqKTtcbiAgICB2YXIgdGh1bmsgPSBuZXcgcGV4cHJzLkFwcGx5KHN0YXJ0UnVsZSkuZXZhbChvcHRUaHJvd09uRmFpbCwgdW5kZWZpbmVkLCB0aGlzLnJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgdW5kZWZpbmVkKTtcblxuICAgIHZhciBzdWNjZWVkZWQ7XG4gICAgaWYgKHRodW5rID09PSBjb21tb24uZmFpbCkge1xuICAgICAgc3VjY2VlZGVkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoaXMgbWF0Y2ggb25seSBzdWNjZWVkZWQgaWYgdGhlIHN0YXJ0IHJ1bGUgY29uc3VtZWQgYWxsIG9mIHRoZSBpbnB1dC5cbiAgICAgIGlmIChjb21tb24uaXNTeW50YWN0aWMoc3RhcnRSdWxlKSkge1xuICAgICAgICBza2lwU3BhY2VzKHRoaXMucnVsZURpY3QsIGlucHV0U3RyZWFtKTtcbiAgICAgIH1cbiAgICAgIHN1Y2NlZWRlZCA9IHBleHBycy5lbmQuZXZhbChvcHRUaHJvd09uRmFpbCwgZmFsc2UsIHRoaXMucnVsZURpY3QsIGlucHV0U3RyZWFtLCB1bmRlZmluZWQpICE9PSBjb21tb24uZmFpbDtcbiAgICB9XG5cbiAgICBpZiAoc3VjY2VlZGVkKSB7XG4gICAgICB2YXIgYXNzZXJ0U2VtYW50aWNBY3Rpb25OYW1lc01hdGNoID0gdGhpcy5hc3NlcnRTZW1hbnRpY0FjdGlvbk5hbWVzTWF0Y2guYmluZCh0aGlzKTtcbiAgICAgIHZhciBhbnMgPSBmdW5jdGlvbihhY3Rpb25EaWN0KSB7XG4gICAgICAgIGFzc2VydFNlbWFudGljQWN0aW9uTmFtZXNNYXRjaChhY3Rpb25EaWN0KTtcbiAgICAgICAgcmV0dXJuIHRodW5rLmZvcmNlKGFjdGlvbkRpY3QsIHt9KTtcbiAgICAgIH07XG4gICAgICBhbnMudG9TdHJpbmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICdbb2htIHRodW5rXSc7IH07XG4gICAgICByZXR1cm4gYW5zO1xuICAgIH0gZWxzZSBpZiAob3B0VGhyb3dPbkZhaWwpIHtcbiAgICAgIHRocm93IG5ldyBNYXRjaEZhaWx1cmUoaW5wdXRTdHJlYW0sIHRoaXMucnVsZURpY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LFxuXG4gIGFzc2VydFNlbWFudGljQWN0aW9uTmFtZXNNYXRjaDogZnVuY3Rpb24oYWN0aW9uRGljdCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcnVsZURpY3QgPSB0aGlzLnJ1bGVEaWN0O1xuICAgIHZhciBvayA9IHRydWU7XG4gICAga2V5c0RvKHJ1bGVEaWN0LCBmdW5jdGlvbihydWxlTmFtZSkge1xuICAgICAgaWYgKGFjdGlvbkRpY3RbcnVsZU5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGFjdHVhbCA9IGZvcm1hbHMoYWN0aW9uRGljdFtydWxlTmFtZV0pLnNvcnQoKTtcbiAgICAgIHZhciBleHBlY3RlZCA9IHNlbGYuc2VtYW50aWNBY3Rpb25BcmdOYW1lcyhydWxlTmFtZSk7XG4gICAgICBpZiAoIWVxdWFscyhhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgICAgICBvayA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZygnc2VtYW50aWMgYWN0aW9uIGZvciBydWxlJywgcnVsZU5hbWUsICdoYXMgdGhlIHdyb25nIGFyZ3VtZW50IG5hbWVzJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCcgIGV4cGVjdGVkJywgZXhwZWN0ZWQpO1xuICAgICAgICBjb25zb2xlLmxvZygnICAgIGFjdHVhbCcsIGFjdHVhbCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFvaykge1xuICAgICAgYnJvd3Nlci5lcnJvcignb25lIG9yIG1vcmUgc2VtYW50aWMgYWN0aW9ucyBoYXZlIHRoZSB3cm9uZyBhcmd1bWVudCBuYW1lcyAtLSBzZWUgY29uc29sZSBmb3IgZGV0YWlscycpO1xuICAgIH1cbiAgfSxcblxuICBzZW1hbnRpY0FjdGlvbkFyZ05hbWVzOiBmdW5jdGlvbihydWxlTmFtZSkge1xuICAgIGlmICh0aGlzLnN1cGVyR3JhbW1hciAmJiB0aGlzLnN1cGVyR3JhbW1hci5ydWxlRGljdFtydWxlTmFtZV0pIHtcbiAgICAgIHJldHVybiB0aGlzLnN1cGVyR3JhbW1hci5zZW1hbnRpY0FjdGlvbkFyZ05hbWVzKHJ1bGVOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGJvZHkgPSB0aGlzLnJ1bGVEaWN0W3J1bGVOYW1lXTtcbiAgICAgIHZhciBuYW1lcyA9IGJvZHkuZ2V0QmluZGluZ05hbWVzKCk7XG4gICAgICByZXR1cm4gbmFtZXMubGVuZ3RoID4gMCB8fCBib2R5LnByb2R1Y2VzVmFsdWUoKSA/IFsnZW52J10gOiBbXTtcbiAgICB9XG4gIH0sXG5cbiAgdG9SZWNpcGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB3cyA9IG1ha2VTdHJpbmdCdWZmZXIoKTtcbiAgICB3cy5uZXh0UHV0QWxsKCcoZnVuY3Rpb24ob2htLCBvcHROYW1lc3BhY2UpIHtcXG4nKTtcbiAgICB3cy5uZXh0UHV0QWxsKCcgIHZhciBiID0gb2htLl9idWlsZGVyKCk7XFxuJyk7XG4gICAgd3MubmV4dFB1dEFsbCgnICBiLnNldE5hbWUoJyk7IHdzLm5leHRQdXRBbGwocHJpbnRTdHJpbmcodGhpcy5uYW1lKSk7IHdzLm5leHRQdXRBbGwoJyk7XFxuJyk7XG4gICAgaWYgKHRoaXMuc3VwZXJHcmFtbWFyLm5hbWUgJiYgdGhpcy5zdXBlckdyYW1tYXIubmFtZXNwYWNlTmFtZSkge1xuICAgICAgd3MubmV4dFB1dEFsbCgnICBiLnNldFN1cGVyR3JhbW1hcihvaG0ubmFtZXNwYWNlKCcpO1xuICAgICAgd3MubmV4dFB1dEFsbChwcmludFN0cmluZyh0aGlzLnN1cGVyR3JhbW1hci5uYW1lc3BhY2VOYW1lKSk7XG4gICAgICB3cy5uZXh0UHV0QWxsKCcpLmdldEdyYW1tYXIoJyk7XG4gICAgICB3cy5uZXh0UHV0QWxsKHByaW50U3RyaW5nKHRoaXMuc3VwZXJHcmFtbWFyLm5hbWUpKTtcbiAgICAgIHdzLm5leHRQdXRBbGwoJykpO1xcbicpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnJ1bGVEZWNscy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICB3cy5uZXh0UHV0QWxsKCcgICcpO1xuICAgICAgdGhpcy5ydWxlRGVjbHNbaWR4XS5vdXRwdXRSZWNpcGUod3MpO1xuICAgICAgd3MubmV4dFB1dEFsbCgnO1xcbicpO1xuICAgIH1cbiAgICB3cy5uZXh0UHV0QWxsKCcgIHJldHVybiBiLmJ1aWxkKG9wdE5hbWVzcGFjZSk7XFxuJyk7XG4gICAgd3MubmV4dFB1dEFsbCgnfSk7Jyk7XG4gICAgcmV0dXJuIHdzLmNvbnRlbnRzKCk7XG4gIH0sXG5cbiAgdG9TZW1hbnRpY0FjdGlvblRlbXBsYXRlOiBmdW5jdGlvbigvKiBlbnRyeVBvaW50MSwgZW50cnlQb2ludDIsIC4uLiAqLykge1xuICAgIHZhciBlbnRyeVBvaW50cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzIDogT2JqZWN0LmtleXModGhpcy5ydWxlRGljdCk7XG4gICAgdmFyIHJ1bGVzVG9CZUluY2x1ZGVkID0gdGhpcy5ydWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24oZW50cnlQb2ludHMpO1xuICAgIFxuICAgIC8vIFRPRE86IGFkZCB0aGUgc3VwZXItZ3JhbW1hcidzIHRlbXBsYXRlcyBhdCB0aGUgcmlnaHQgcGxhY2UsIGUuZy4sIGEgY2FzZSBmb3IgQWRkRXhwcl9wbHVzIHNob3VsZCBhcHBlYXIgbmV4dCB0b1xuICAgIC8vIG90aGVyIGNhc2VzIG9mIEFkZEV4cHIuXG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJ1ZmZlciA9IG1ha2VDb2x1bW5TdHJpbmdCdWZmZXIoKTtcbiAgICBidWZmZXIubmV4dFB1dEFsbCgneycpO1xuXG4gICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICBmb3IgKHZhciBydWxlTmFtZSBpbiBydWxlc1RvQmVJbmNsdWRlZCkge1xuICAgICAgdmFyIGJvZHkgPSB0aGlzLnJ1bGVEaWN0W3J1bGVOYW1lXTtcbiAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmZmVyLm5leHRQdXRBbGwoJywnKTtcbiAgICAgIH1cbiAgICAgIGJ1ZmZlci5uZXdMaW5lKCk7XG4gICAgICBidWZmZXIubmV4dFB1dEFsbCgnICAnKTtcbiAgICAgIGJ1ZmZlci5uZXdDb2x1bW4oKTtcbiAgICAgIHNlbGYuYWRkU2VtYW50aWNBY3Rpb25UZW1wbGF0ZShydWxlTmFtZSwgYm9keSwgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBidWZmZXIubmV3TGluZSgpO1xuICAgIGJ1ZmZlci5uZXh0UHV0QWxsKCd9Jyk7XG4gICAgcmV0dXJuIGJ1ZmZlci5jb250ZW50cygpO1xuICB9LFxuXG4gIGFkZFNlbWFudGljQWN0aW9uVGVtcGxhdGU6IGZ1bmN0aW9uKHJ1bGVOYW1lLCBib2R5LCBidWZmZXIpIHtcbiAgICBidWZmZXIubmV4dFB1dEFsbChydWxlTmFtZSk7XG4gICAgYnVmZmVyLm5leHRQdXRBbGwoJzogJyk7XG4gICAgYnVmZmVyLm5ld0NvbHVtbigpO1xuICAgIGJ1ZmZlci5uZXh0UHV0QWxsKCdmdW5jdGlvbignKTtcbiAgICBidWZmZXIubmV4dFB1dEFsbCh0aGlzLnNlbWFudGljQWN0aW9uQXJnTmFtZXMocnVsZU5hbWUpLmpvaW4oJywgJykpO1xuICAgIGJ1ZmZlci5uZXh0UHV0QWxsKCcpICcpO1xuICAgIGJ1ZmZlci5uZXdDb2x1bW4oKTtcbiAgICBidWZmZXIubmV4dFB1dEFsbCgneycpO1xuXG4gICAgdmFyIGVudlByb3BlcnRpZXMgPSBib2R5LmdldEJpbmRpbmdOYW1lcygpO1xuICAgIGlmIChlbnZQcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMCAmJiBib2R5LnByb2R1Y2VzVmFsdWUoKSkge1xuICAgICAgZW52UHJvcGVydGllcyA9IFsndmFsdWUnXTtcbiAgICB9XG4gICAgaWYgKGVudlByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xuICAgICAgYnVmZmVyLm5leHRQdXRBbGwoJyAvKiAnKTtcbiAgICAgIGJ1ZmZlci5uZXh0UHV0QWxsKGVudlByb3BlcnRpZXMuam9pbignLCAnKSk7XG4gICAgICBidWZmZXIubmV4dFB1dEFsbCgnICovICcpO1xuICAgIH1cbiAgICBidWZmZXIubmV4dFB1dEFsbCgnfScpO1xuICB9LFxuXG4gIHJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbjogZnVuY3Rpb24oZW50cnlQb2ludHMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZnVuY3Rpb24gZ2V0Qm9keShydWxlTmFtZSkge1xuICAgICAgaWYgKHNlbGYucnVsZURpY3RbcnVsZU5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5VbmRlY2xhcmVkUnVsZUVycm9yKHJ1bGVOYW1lLCBzZWxmLm5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGYucnVsZURpY3RbcnVsZU5hbWVdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBydWxlcyA9IHt9O1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGVudHJ5UG9pbnRzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIHZhciBydWxlTmFtZSA9IGVudHJ5UG9pbnRzW2lkeF07XG4gICAgICBnZXRCb2R5KHJ1bGVOYW1lKTsgIC8vIHRvIG1ha2Ugc3VyZSB0aGUgcnVsZSBleGlzdHNcbiAgICAgIHJ1bGVzW3J1bGVOYW1lXSA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgZm9yICh2YXIgcnVsZU5hbWUgaW4gcnVsZXMpIHtcbiAgICAgICAgdmFyIGFkZGVkTmV3UnVsZSA9IGdldEJvZHkocnVsZU5hbWUpLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbihydWxlcywgdHJ1ZSk7XG4gICAgICAgIGRvbmUgJj0gIWFkZGVkTmV3UnVsZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcnVsZXM7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyYW1tYXI7XG5cbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKTtcbnZhciBQb3NJbmZvID0gcmVxdWlyZSgnLi9Qb3NJbmZvLmpzJyk7XG52YXIgR3JhbW1hciA9IHJlcXVpcmUoJy4vR3JhbW1hci5qcycpO1xuXG52YXIgYXdsaWIgPSByZXF1aXJlKCdhd2xpYicpO1xudmFyIG9iamVjdFRoYXREZWxlZ2F0ZXNUbyA9IGF3bGliLm9iamVjdFV0aWxzLm9iamVjdFRoYXREZWxlZ2F0ZXNUbztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIElucHV0U3RyZWFtKCkge1xuICB0aHJvdyAnSW5wdXRTdHJlYW0gY2Fubm90IGJlIGluc3RhbnRpYXRlZCAtLSBpdFxcJ3MgYWJzdHJhY3QnO1xufVxuXG5JbnB1dFN0cmVhbS5uZXdGb3IgPSBmdW5jdGlvbihvYmopIHtcbiAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG5ldyBTdHJpbmdJbnB1dFN0cmVhbShvYmopO1xuICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuIG5ldyBMaXN0SW5wdXRTdHJlYW0ob2JqKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyAnY2Fubm90IG1ha2UgaW5wdXQgc3RyZWFtIGZvciAnICsgb2JqO1xuICB9XG59O1xuXG5JbnB1dFN0cmVhbS5wcm90b3R5cGUgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgIHRoaXMucG9zID0gMDtcbiAgICB0aGlzLnBvc0luZm9zID0gW107XG4gICAgdGhpcy5mYWlsdXJlcyA9IG51bGw7XG4gICAgdGhpcy5mYWlsdXJlc1BvcyA9IC0xO1xuICB9LFxuXG4gIHJlY29yZEZhaWx1cmU6IGZ1bmN0aW9uKHBvcywgZXhwcikge1xuICAgIGlmIChwb3MgPiB0aGlzLmZhaWx1cmVzUG9zKSB7XG4gICAgICB0aGlzLmZhaWx1cmVzID0ge2V4cHI6IGV4cHIsIG5leHQ6IG51bGx9O1xuICAgICAgdGhpcy5mYWlsdXJlc1BvcyA9IHBvcztcbiAgICB9IGVsc2UgaWYgKHBvcyA9PT0gdGhpcy5mYWlsdXJlc1Bvcykge1xuICAgICAgdGhpcy5mYWlsdXJlcyA9IHtleHByOiBleHByLCBuZXh0OiB0aGlzLmZhaWx1cmVzfTtcbiAgICB9XG4gIH0sXG5cbiAgZ2V0Q3VycmVudFBvc0luZm86IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyUG9zID0gdGhpcy5wb3M7XG4gICAgdmFyIHBvc0luZm8gPSB0aGlzLnBvc0luZm9zW2N1cnJQb3NdO1xuICAgIHJldHVybiBwb3NJbmZvIHx8ICh0aGlzLnBvc0luZm9zW2N1cnJQb3NdID0gbmV3IFBvc0luZm8oY3VyclBvcykpO1xuICB9LFxuXG4gIGF0RW5kOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wb3MgPT09IHRoaXMuc291cmNlLmxlbmd0aDtcbiAgfSxcblxuICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5hdEVuZCgpKSB7XG4gICAgICByZXR1cm4gY29tbW9uLmZhaWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnNvdXJjZVt0aGlzLnBvcysrXTtcbiAgICB9XG4gIH0sXG5cbiAgbWF0Y2hFeGFjdGx5OiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHRoaXMubmV4dCgpID09PSB4ID8gdHJ1ZSA6IGNvbW1vbi5mYWlsO1xuICB9LFxuXG4gIGludGVydmFsOiBmdW5jdGlvbihzdGFydElkeCwgZW5kSWR4KSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0SWR4LCBlbmRJZHgpO1xuICB9LFxuXG4gIGdldEZhaWx1cmVzUG9zOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5mYWlsdXJlc1BvcztcbiAgfVxufTtcblxuZnVuY3Rpb24gU3RyaW5nSW5wdXRTdHJlYW0oc291cmNlKSB7XG4gIHRoaXMuaW5pdChzb3VyY2UpO1xufVxuXG5TdHJpbmdJbnB1dFN0cmVhbS5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oSW5wdXRTdHJlYW0ucHJvdG90eXBlLCB7XG4gIG1hdGNoU3RyaW5nOiBmdW5jdGlvbihzKSB7XG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBpZiAodGhpcy5tYXRjaEV4YWN0bHkoc1tpZHhdKSA9PT0gY29tbW9uLmZhaWwpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1vbi5mYWlsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuICBtYXRjaFJlZ0V4cDogZnVuY3Rpb24oZSkge1xuICAgIC8vIElNUE9SVEFOVDogZSBtdXN0IGJlIGEgbm9uLWdsb2JhbCwgb25lLWNoYXJhY3RlciBleHByZXNzaW9uLCBlLmcuLCAvLi8gYW5kIC9bMC05XS9cbiAgICB2YXIgYyA9IHRoaXMubmV4dCgpO1xuICAgIHJldHVybiBjICE9PSBjb21tb24uZmFpbCAmJiBlLnRlc3QoYykgPyB0cnVlIDogY29tbW9uLmZhaWw7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBMaXN0SW5wdXRTdHJlYW0oc291cmNlKSB7XG4gIHRoaXMuaW5pdChzb3VyY2UpO1xufVxuXG5MaXN0SW5wdXRTdHJlYW0ucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKElucHV0U3RyZWFtLnByb3RvdHlwZSwge1xuICBtYXRjaFN0cmluZzogZnVuY3Rpb24ocykge1xuICAgIHJldHVybiB0aGlzLm1hdGNoRXhhY3RseShzKTtcbiAgfSxcblxuICBtYXRjaFJlZ0V4cDogZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiB0aGlzLm1hdGNoRXhhY3RseShlKTtcbiAgfVxufSk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0U3RyZWFtO1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIElucHV0U3RyZWFtID0gcmVxdWlyZSgnLi9JbnB1dFN0cmVhbS5qcycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gSW50ZXJ2YWwoc291cmNlLCBzdGFydElkeCwgZW5kSWR4KSB7XG4gIHRoaXMuc291cmNlID0gc291cmNlO1xuICB0aGlzLnN0YXJ0SWR4ID0gc3RhcnRJZHg7XG4gIHRoaXMuZW5kSWR4ID0gZW5kSWR4O1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhJbnRlcnZhbC5wcm90b3R5cGUsIHtcbiAgJ2NvbnRlbnRzJzoge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5fY29udGVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9jb250ZW50cyA9IElucHV0U3RyZWFtLm5ld0Zvcih0aGlzLnNvdXJjZSkuaW50ZXJ2YWwodGhpcy5zdGFydElkeCwgdGhpcy5lbmRJZHgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRzO1xuICAgIH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9XG59KTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJ2YWw7XG5cbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKTtcblxudmFyIGF3bGliID0gcmVxdWlyZSgnYXdsaWInKTtcbnZhciBtYWtlU3RyaW5nQnVmZmVyID0gYXdsaWIub2JqZWN0VXRpbHMuc3RyaW5nQnVmZmVyO1xudmFyIHByaW50U3RyaW5nID0gYXdsaWIuc3RyaW5nVXRpbHMucHJpbnRTdHJpbmc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiB0b0Vycm9ySW5mbyhwb3MsIHN0cikge1xuICB2YXIgbGluZU51bSA9IDE7XG4gIHZhciBjb2xOdW0gPSAxO1xuXG4gIHZhciBjdXJyUG9zID0gMDtcbiAgdmFyIGxpbmVTdGFydFBvcyA9IDA7XG5cbiAgd2hpbGUgKGN1cnJQb3MgPCBwb3MpIHtcbiAgICB2YXIgYyA9IHN0ci5jaGFyQXQoY3VyclBvcysrKTtcbiAgICBpZiAoYyA9PT0gJ1xcbicpIHtcbiAgICAgIGxpbmVOdW0rKztcbiAgICAgIGNvbE51bSA9IDE7XG4gICAgICBsaW5lU3RhcnRQb3MgPSBjdXJyUG9zO1xuICAgIH0gZWxzZSBpZiAoYyAhPT0gJ1xccicpIHtcbiAgICAgIGNvbE51bSsrO1xuICAgIH1cbiAgfVxuXG4gIHZhciBsaW5lRW5kUG9zID0gc3RyLmluZGV4T2YoJ1xcbicsIGxpbmVTdGFydFBvcyk7XG4gIGlmIChsaW5lRW5kUG9zIDwgMCkge1xuICAgIGxpbmVFbmRQb3MgPSBzdHIubGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsaW5lTnVtOiBsaW5lTnVtLFxuICAgIGNvbE51bTogY29sTnVtLFxuICAgIGxpbmU6IHN0ci5zdWJzdHIobGluZVN0YXJ0UG9zLCBsaW5lRW5kUG9zIC0gbGluZVN0YXJ0UG9zKVxuICB9O1xufVxuXG5mdW5jdGlvbiBNYXRjaEZhaWx1cmUoaW5wdXRTdHJlYW0sIHJ1bGVEaWN0KSB7XG4gIHRoaXMuaW5wdXRTdHJlYW0gPSBpbnB1dFN0cmVhbTtcbiAgdGhpcy5ydWxlRGljdCA9IHJ1bGVEaWN0O1xufVxuXG5NYXRjaEZhaWx1cmUucHJvdG90eXBlLmdldFBvcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5pbnB1dFN0cmVhbS5mYWlsdXJlc1Bvcztcbn07XG5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiBpZiAodHlwZW9mIHRoaXMuaW5wdXRTdHJlYW0uc291cmNlICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAnZXJyb3IgYXQgcG9zaXRpb24gJyArIHRoaXMuZ2V0UG9zKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRleHQgPSBtYWtlU3RyaW5nQnVmZmVyKCk7XG4gICAgdmFyIGVycm9ySW5mbyA9IHRvRXJyb3JJbmZvKHRoaXMuZ2V0UG9zKCksIHRoaXMuaW5wdXRTdHJlYW0uc291cmNlKTtcbiAgICB0ZXh0Lm5leHRQdXRBbGwodGhpcy5nZXRMaW5lQW5kQ29sVGV4dCgpKTtcbiAgICB0ZXh0Lm5leHRQdXRBbGwoJzogZXhwZWN0ZWQgJyk7XG4gICAgdGV4dC5uZXh0UHV0QWxsKHRoaXMuZ2V0RXhwZWN0ZWRUZXh0KCkpO1xuICAgIHJldHVybiB0ZXh0LmNvbnRlbnRzKCk7XG4gIH1cbn07XG5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUuZ2V0RXh0ZW5kZWRFcnJvck1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiBpZiAodHlwZW9mIHRoaXMuaW5wdXRTdHJlYW0uc291cmNlICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAnZXJyb3IgYXQgcG9zaXRpb24gJyArIHRoaXMuZ2V0UG9zKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRleHQgPSBtYWtlU3RyaW5nQnVmZmVyKCk7XG4gICAgdmFyIGVycm9ySW5mbyA9IHRvRXJyb3JJbmZvKHRoaXMuZ2V0UG9zKCksIHRoaXMuaW5wdXRTdHJlYW0uc291cmNlKTtcbiAgICB2YXIgbGluZUFuZENvbFRleHQgPSB0aGlzLmdldExpbmVBbmRDb2xUZXh0KCkgKyAnOiAnO1xuICAgIHRleHQubmV4dFB1dEFsbChsaW5lQW5kQ29sVGV4dCk7XG4gICAgdGV4dC5uZXh0UHV0QWxsKGVycm9ySW5mby5saW5lKTtcbiAgICB0ZXh0Lm5leHRQdXRBbGwoJ1xcbicpO1xuICAgIGZvciAodmFyIGlkeCA9IDE7IGlkeCA8IGxpbmVBbmRDb2xUZXh0Lmxlbmd0aCArIGVycm9ySW5mby5jb2xOdW07IGlkeCsrKSB7XG4gICAgICB0ZXh0Lm5leHRQdXRBbGwoJyAnKTtcbiAgICB9XG4gICAgdGV4dC5uZXh0UHV0QWxsKCdeJyk7XG4gIH1cbiAgdGV4dC5uZXh0UHV0QWxsKCdcXG5FeHBlY3RlZDogJyk7XG4gIHRleHQubmV4dFB1dEFsbCh0aGlzLmdldEV4cGVjdGVkVGV4dCgpKTtcbiAgcmV0dXJuIHRleHQuY29udGVudHMoKTtcbn07XG5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUucHJpbnRFeHRlbmRlZEVycm9yTWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZyh0aGlzLmdldEV4dGVuZGVkRXJyb3JNZXNzYWdlKCkpO1xufTtcblxuTWF0Y2hGYWlsdXJlLnByb3RvdHlwZS5nZXRMaW5lQW5kQ29sVGV4dCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZXJyb3JJbmZvID0gdG9FcnJvckluZm8odGhpcy5nZXRQb3MoKSwgdGhpcy5pbnB1dFN0cmVhbS5zb3VyY2UpO1xuICByZXR1cm4gJ0xpbmUgJyArIGVycm9ySW5mby5saW5lTnVtICsgJywgY29sICcgKyBlcnJvckluZm8uY29sTnVtO1xufTtcblxuTWF0Y2hGYWlsdXJlLnByb3RvdHlwZS5nZXRFeHBlY3RlZFRleHQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRleHQgPSBtYWtlU3RyaW5nQnVmZmVyKCk7XG4gIHZhciBleHBlY3RlZCA9IHRoaXMuZ2V0RXhwZWN0ZWRFeHBycygpO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBleHBlY3RlZC5sZW5ndGg7IGlkeCsrKSB7XG4gICAgaWYgKGlkeCA+IDApIHtcbiAgICAgIGlmIChpZHggPT09IGV4cGVjdGVkLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGV4dC5uZXh0UHV0QWxsKGV4cGVjdGVkLmxlbmd0aCA+IDIgPyAnLCBvciAnIDogJyBvciAnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQubmV4dFB1dEFsbCgnLCAnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGV4dC5uZXh0UHV0QWxsKGV4cGVjdGVkW2lkeF0pO1xuICB9XG4gIHJldHVybiB0ZXh0LmNvbnRlbnRzKCk7XG59O1xuXG5NYXRjaEZhaWx1cmUucHJvdG90eXBlLmdldEV4cGVjdGVkRXhwcnMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGV4cGVjdGVkID0ge307XG4gIGZvciAodmFyIGZhaWx1cmUgPSB0aGlzLmlucHV0U3RyZWFtLmZhaWx1cmVzOyBmYWlsdXJlICE9PSBudWxsOyBmYWlsdXJlID0gZmFpbHVyZS5uZXh0KSB7XG4gICAgZXhwZWN0ZWRbZmFpbHVyZS5leHByLnRvRXhwZWN0ZWQodGhpcy5ydWxlRGljdCldID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gT2JqZWN0LmtleXMoZXhwZWN0ZWQpLnJldmVyc2UoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGNoRmFpbHVyZTtcblxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBvaG0gPSByZXF1aXJlKCcuL21haW4uanMnKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycy5qcycpO1xuXG52YXIgYXdsaWIgPSByZXF1aXJlKCdhd2xpYicpO1xudmFyIGJyb3dzZXIgPSBhd2xpYi5icm93c2VyO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTmFtZXNwYWNlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gTmFtZXNwYWNlKG5hbWUpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5ncmFtbWFycyA9IHt9O1xufVxuXG5OYW1lc3BhY2UucHJvdG90eXBlID0ge1xuICBpbnN0YWxsOiBmdW5jdGlvbihuYW1lLCBncmFtbWFyKSB7XG4gICAgaWYgKHRoaXMuZ3JhbW1hcnNbbmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuRHVwbGljYXRlR3JhbW1hckRlY2xhcmF0aW9uRXJyb3IobmFtZSwgdGhpcy5uYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ncmFtbWFyc1tuYW1lXSA9IGdyYW1tYXI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGdldEdyYW1tYXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBpZiAodGhpcy5ncmFtbWFyc1tuYW1lXSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ3JhbW1hcnNbbmFtZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuVW5kZWNsYXJlZEdyYW1tYXJFcnJvcihuYW1lLCB0aGlzLm5hbWUpO1xuICAgIH1cbiAgfSxcblxuICBsb2FkR3JhbW1hcnNGcm9tU2NyaXB0RWxlbWVudDogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIGJyb3dzZXIuc2FuaXR5Q2hlY2soJ3NjcmlwdCB0YWdcXCdzIHR5cGUgYXR0cmlidXRlIG11c3QgYmUgXCJ0ZXh0L29obS1qc1wiJywgZWxlbWVudC50eXBlID09PSAndGV4dC9vaG0tanMnKTtcbiAgICBvaG0ubWFrZUdyYW1tYXJzKGVsZW1lbnQuaW5uZXJIVE1MLCB0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBtYWtlOiBmdW5jdGlvbihyZWNpcGUpIHtcbiAgICByZXR1cm4gcmVjaXBlKG9obSwgdGhpcyk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5hbWVzcGFjZTtcblxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gUG9zSW5mbygpIHtcbiAgdGhpcy5ydWxlU3RhY2sgPSBbXTtcbiAgdGhpcy5hY3RpdmVSdWxlcyA9IHt9OyAgLy8gcmVkdW5kYW50IChjb3VsZCBiZSBnZW5lcmF0ZWQgZnJvbSBydWxlU3RhY2spIGJ1dCB1c2VmdWwgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnNcbiAgdGhpcy5tZW1vID0ge307XG59XG5cblBvc0luZm8ucHJvdG90eXBlID0ge1xuICBpc0FjdGl2ZTogZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVSdWxlc1tydWxlTmFtZV07XG4gIH0sXG5cbiAgZW50ZXI6IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gICAgdGhpcy5ydWxlU3RhY2sucHVzaChydWxlTmFtZSk7XG4gICAgdGhpcy5hY3RpdmVSdWxlc1tydWxlTmFtZV0gPSB0cnVlO1xuICB9LFxuXG4gIGV4aXQ6IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gICAgdGhpcy5ydWxlU3RhY2sucG9wKCk7XG4gICAgdGhpcy5hY3RpdmVSdWxlc1tydWxlTmFtZV0gPSBmYWxzZTtcbiAgfSxcblxuICBzaG91bGRVc2VNZW1vaXplZFJlc3VsdDogZnVuY3Rpb24obWVtb1JlYykge1xuICAgIHZhciBpbnZvbHZlZFJ1bGVzID0gbWVtb1JlYy5pbnZvbHZlZFJ1bGVzO1xuICAgIGZvciAodmFyIHJ1bGVOYW1lIGluIGludm9sdmVkUnVsZXMpIHtcbiAgICAgIGlmIChpbnZvbHZlZFJ1bGVzW3J1bGVOYW1lXSAmJiB0aGlzLmFjdGl2ZVJ1bGVzW3J1bGVOYW1lXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIGdldEN1cnJlbnRMZWZ0UmVjdXJzaW9uOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0UmVjdXJzaW9uU3RhY2sgPyB0aGlzLmxlZnRSZWN1cnNpb25TdGFja1t0aGlzLmxlZnRSZWN1cnNpb25TdGFjay5sZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcbiAgfSxcblxuICBzdGFydExlZnRSZWN1cnNpb246IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gICAgaWYgKCF0aGlzLmxlZnRSZWN1cnNpb25TdGFjaykge1xuICAgICAgdGhpcy5sZWZ0UmVjdXJzaW9uU3RhY2sgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5sZWZ0UmVjdXJzaW9uU3RhY2sucHVzaCh7bmFtZTogcnVsZU5hbWUsIHZhbHVlOiBjb21tb24uZmFpbCwgcG9zOiAtMSwgaW52b2x2ZWRSdWxlczoge319KTtcbiAgICB0aGlzLnVwZGF0ZUludm9sdmVkUnVsZXMoKTtcbiAgfSxcblxuICBlbmRMZWZ0UmVjdXJzaW9uOiBmdW5jdGlvbihydWxlTmFtZSkge1xuICAgIHRoaXMubGVmdFJlY3Vyc2lvblN0YWNrLnBvcCgpO1xuICB9LFxuXG4gIHVwZGF0ZUludm9sdmVkUnVsZXM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyZW50TGVmdFJlY3Vyc2lvbiA9IHRoaXMuZ2V0Q3VycmVudExlZnRSZWN1cnNpb24oKTtcbiAgICB2YXIgaW52b2x2ZWRSdWxlcyA9IGN1cnJlbnRMZWZ0UmVjdXJzaW9uLmludm9sdmVkUnVsZXM7XG4gICAgdmFyIGxyUnVsZU5hbWUgPSBjdXJyZW50TGVmdFJlY3Vyc2lvbi5uYW1lO1xuICAgIHZhciBpZHggPSB0aGlzLnJ1bGVTdGFjay5sZW5ndGggLSAxO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB2YXIgcnVsZU5hbWUgPSB0aGlzLnJ1bGVTdGFja1tpZHgtLV07XG4gICAgICBpZiAocnVsZU5hbWUgPT09IGxyUnVsZU5hbWUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpbnZvbHZlZFJ1bGVzW3J1bGVOYW1lXSA9IHRydWU7XG4gICAgfVxuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBQb3NJbmZvO1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0cy5hYnN0cmFjdCA9IGZ1bmN0aW9uKCkge1xuICB0aHJvdyAndGhpcyBtZXRob2QgaXMgYWJzdHJhY3QhJztcbn07XG5cbmV4cG9ydHMuZ2V0RHVwbGljYXRlcyA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gIHZhciBkdXBsaWNhdGVzID0gW107XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFycmF5Lmxlbmd0aDsgaWR4KyspIHtcbiAgICB2YXIgeCA9IGFycmF5W2lkeF07XG4gICAgaWYgKGFycmF5Lmxhc3RJbmRleE9mKHgpICE9PSBpZHggJiYgZHVwbGljYXRlcy5pbmRleE9mKHgpIDwgMCkge1xuICAgICAgZHVwbGljYXRlcy5wdXNoKHgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZHVwbGljYXRlcztcbn07XG5cbmV4cG9ydHMuZmFpbCA9IHt9O1xuXG5leHBvcnRzLmlzU3ludGFjdGljID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdmFyIGZpcnN0Q2hhciA9IHJ1bGVOYW1lWzBdO1xuICByZXR1cm4gJ0EnIDw9IGZpcnN0Q2hhciAmJiBmaXJzdENoYXIgPD0gJ1onO1xufTtcblxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzLmpzJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMuanMnKTtcblxudmFyIGF3bGliID0gcmVxdWlyZSgnYXdsaWInKTtcbnZhciBvYmplY3RUaGF0RGVsZWdhdGVzVG8gPSBhd2xpYi5vYmplY3RVdGlscy5vYmplY3RUaGF0RGVsZWdhdGVzVG87XG52YXIgcHJpbnRTdHJpbmcgPSBhd2xpYi5zdHJpbmdVdGlscy5wcmludFN0cmluZztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIG91dHB1dFJlY2lwZShkZWNsLCB3cykge1xuICB3cy5uZXh0UHV0QWxsKCdiLicpO1xuICB3cy5uZXh0UHV0QWxsKGRlY2wua2luZCk7XG4gIHdzLm5leHRQdXRBbGwoJygnKTtcbiAgd3MubmV4dFB1dEFsbChwcmludFN0cmluZyhkZWNsLm5hbWUpKTtcbiAgd3MubmV4dFB1dEFsbCgnLCAnKTtcbiAgZGVjbC5ib2R5Lm91dHB1dFJlY2lwZSh3cyk7XG4gIHdzLm5leHRQdXRBbGwoJyknKTtcbn1cblxuZnVuY3Rpb24gUnVsZURlY2woKSB7XG4gIHRocm93ICdSdWxlRGVjbCBjYW5ub3QgYmUgaW5zdGFudGlhdGVkIC0tIGl0XFwncyBhYnN0cmFjdCc7XG59XG5cblJ1bGVEZWNsLnByb3RvdHlwZSA9IHtcbiAgcGVyZm9ybUNoZWNrczogY29tbW9uLmFic3RyYWN0LFxuXG4gIHBlcmZvcm1Db21tb25DaGVja3M6IGZ1bmN0aW9uKG5hbWUsIGJvZHkpIHtcbiAgICBib2R5LmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MobmFtZSk7XG4gICAgYm9keS5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyhuYW1lKTtcbiAgICBib2R5LmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzKG5hbWUpO1xuICB9LFxuXG4gIGluc3RhbGw6IGNvbW1vbi5hYnN0cmFjdCxcblxuICBvdXRwdXRSZWNpcGU6IGZ1bmN0aW9uKHdzKSB7IG91dHB1dFJlY2lwZSh0aGlzLCB3cyk7IH1cbn07XG5cbmZ1bmN0aW9uIERlZmluZShuYW1lLCBib2R5LCBzdXBlckdyYW1tYXIsIGRlc2NyaXB0aW9uKSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuYm9keSA9IGJvZHk7XG4gIHRoaXMuc3VwZXJHcmFtbWFyID0gc3VwZXJHcmFtbWFyO1xuICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG59XG5cbkRlZmluZS5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oUnVsZURlY2wucHJvdG90eXBlLCB7XG4gIGtpbmQ6ICdkZWZpbmUnLFxuXG4gIHBlcmZvcm1DaGVja3M6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnN1cGVyR3JhbW1hci5ydWxlRGljdFt0aGlzLm5hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLkR1cGxpY2F0ZVJ1bGVEZWNsYXJhdGlvbkVycm9yKHRoaXMubmFtZSwgdGhpcy5zdXBlckdyYW1tYXIubmFtZSk7XG4gICAgfVxuICAgIHRoaXMucGVyZm9ybUNvbW1vbkNoZWNrcyh0aGlzLm5hbWUsIHRoaXMuYm9keSk7XG4gIH0sXG5cbiAgb3V0cHV0UmVjaXBlOiBmdW5jdGlvbih3cykge1xuICAgIHdzLm5leHRQdXRBbGwoJ2Iuc2V0UnVsZURlc2NyaXB0aW9uKCcpO1xuICAgIHdzLm5leHRQdXRBbGwocHJpbnRTdHJpbmcodGhpcy5kZXNjcmlwdGlvbikpO1xuICAgIHdzLm5leHRQdXRBbGwoJyk7ICcpO1xuICAgIG91dHB1dFJlY2lwZSh0aGlzLCB3cyk7XG4gIH0sXG5cbiAgaW5zdGFsbDogZnVuY3Rpb24ocnVsZURpY3QpIHtcbiAgICB0aGlzLmJvZHkuZGVzY3JpcHRpb24gPSB0aGlzLmRlc2NyaXB0aW9uO1xuICAgIHJ1bGVEaWN0W3RoaXMubmFtZV0gPSB0aGlzLmJvZHk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBPdmVycmlkZShuYW1lLCBib2R5LCBzdXBlckdyYW1tYXIpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5ib2R5ID0gYm9keTtcbiAgdGhpcy5zdXBlckdyYW1tYXIgPSBzdXBlckdyYW1tYXI7XG59XG5cbk92ZXJyaWRlLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhSdWxlRGVjbC5wcm90b3R5cGUsIHtcbiAga2luZDogJ292ZXJyaWRlJyxcblxuICBwZXJmb3JtQ2hlY2tzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3ZlcnJpZGRlbiA9IHRoaXMuc3VwZXJHcmFtbWFyLnJ1bGVEaWN0W3RoaXMubmFtZV07XG4gICAgaWYgKCFvdmVycmlkZGVuKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLlVuZGVjbGFyZWRSdWxlRXJyb3IodGhpcy5uYW1lLCB0aGlzLnN1cGVyR3JhbW1hci5uYW1lKTtcbiAgICB9XG4gICAgaWYgKG92ZXJyaWRkZW4uZ2V0QmluZGluZ05hbWVzKCkubGVuZ3RoID09PSAwICYmIG92ZXJyaWRkZW4ucHJvZHVjZXNWYWx1ZSgpICYmICF0aGlzLmJvZHkucHJvZHVjZXNWYWx1ZSgpKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLlJ1bGVNdXN0UHJvZHVjZVZhbHVlRXJyb3IodGhpcy5uYW1lLCAnb3ZlcnJpZGluZycpO1xuICAgIH1cbiAgICB0aGlzLnBlcmZvcm1Db21tb25DaGVja3ModGhpcy5uYW1lLCB0aGlzLmJvZHkpO1xuICB9LFxuXG4gIGluc3RhbGw6IGZ1bmN0aW9uKHJ1bGVEaWN0KSB7XG4gICAgdGhpcy5ib2R5LmRlc2NyaXB0aW9uID0gdGhpcy5zdXBlckdyYW1tYXIucnVsZURpY3RbdGhpcy5uYW1lXS5kZXNjcmlwdGlvbjtcbiAgICBydWxlRGljdFt0aGlzLm5hbWVdID0gdGhpcy5ib2R5O1xuICB9XG59KTtcblxuZnVuY3Rpb24gSW5saW5lKG5hbWUsIGJvZHksIHN1cGVyR3JhbW1hcikge1xuICB0aGlzLm5hbWUgPSBuYW1lO1xuICB0aGlzLmJvZHkgPSBib2R5O1xuICB0aGlzLnN1cGVyR3JhbW1hciA9IHN1cGVyR3JhbW1hcjtcbn1cblxuSW5saW5lLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhSdWxlRGVjbC5wcm90b3R5cGUsIHtcbiAga2luZDogJ2lubGluZScsXG5cbiAgcGVyZm9ybUNoZWNrczogZnVuY3Rpb24oKSB7XG4gICAgLy8gVE9ETzogY29uc2lkZXIgcmVsYXhpbmcgdGhpcyBjaGVjaywgZS5nLiwgbWFrZSBpdCBvayB0byBvdmVycmlkZSBhbiBpbmxpbmUgcnVsZSBpZiB0aGUgbmVzdGluZyBydWxlIGlzXG4gICAgLy8gYW4gb3ZlcnJpZGUuIEJ1dCBvbmx5IGlmIHRoZSBpbmxpbmUgcnVsZSB0aGF0J3MgYmVpbmcgb3ZlcnJpZGRlbiBpcyBuZXN0ZWQgaW5zaWRlIHRoZSBuZXN0aW5nIHJ1bGUgdGhhdFxuICAgIC8vIHdlJ3JlIG92ZXJyaWRpbmc/IEhvcGVmdWxseSB0aGVyZSdzIGEgbXVjaCBsZXNzIGNvbXBsaWNhdGVkIHdheSB0byBkbyB0aGlzIDopXG4gICAgaWYgKHRoaXMuc3VwZXJHcmFtbWFyLnJ1bGVEaWN0W3RoaXMubmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuRHVwbGljYXRlUnVsZURlY2xhcmF0aW9uRXJyb3IodGhpcy5uYW1lLCB0aGlzLnN1cGVyR3JhbW1hci5uYW1lKTtcbiAgICB9XG4gICAgdGhpcy5wZXJmb3JtQ29tbW9uQ2hlY2tzKHRoaXMubmFtZSwgdGhpcy5ib2R5KTtcbiAgfSxcblxuICBpbnN0YWxsOiBmdW5jdGlvbihydWxlRGljdCkge1xuICAgIHJ1bGVEaWN0W3RoaXMubmFtZV0gPSB0aGlzLmJvZHk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBFeHRlbmQobmFtZSwgYm9keSwgc3VwZXJHcmFtbWFyKSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuYmFzZSA9IHN1cGVyR3JhbW1hci5ydWxlRGljdFtuYW1lXTtcbiAgaWYgKCF0aGlzLmJhc2UpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLlVuZGVjbGFyZWRSdWxlRXJyb3IobmFtZSwgc3VwZXJHcmFtbWFyLm5hbWUpO1xuICB9XG4gIHRoaXMuYm9keSA9IGJvZHk7XG4gIHRoaXMuZXh0ZW5kZWRCb2R5ID0gbmV3IHBleHBycy5FeHRlbmRBbHQodGhpcy5ib2R5LCB0aGlzLmJhc2UpO1xuICB0aGlzLnN1cGVyR3JhbW1hciA9IHN1cGVyR3JhbW1hcjtcbn1cblxuRXh0ZW5kLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhSdWxlRGVjbC5wcm90b3R5cGUsIHtcbiAga2luZDogJ2V4dGVuZCcsXG5cbiAgcGVyZm9ybUNoZWNrczogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuYmFzZS5nZXRCaW5kaW5nTmFtZXMoKS5sZW5ndGggPT09IDAgJiYgdGhpcy5iYXNlLnByb2R1Y2VzVmFsdWUoKSAmJiAhdGhpcy5ib2R5LnByb2R1Y2VzVmFsdWUoKSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5SdWxlTXVzdFByb2R1Y2VWYWx1ZUVycm9yKHRoaXMubmFtZSwgJ2V4dGVuZGluZycpO1xuICAgIH1cbiAgICB0aGlzLnBlcmZvcm1Db21tb25DaGVja3ModGhpcy5uYW1lLCB0aGlzLmV4dGVuZGVkQm9keSk7XG4gIH0sXG5cbiAgaW5zdGFsbDogZnVuY3Rpb24ocnVsZURpY3QpIHtcbiAgICB0aGlzLmV4dGVuZGVkQm9keS5kZXNjcmlwdGlvbiA9IHRoaXMuc3VwZXJHcmFtbWFyLnJ1bGVEaWN0W3RoaXMubmFtZV0uZGVzY3JpcHRpb247XG4gICAgcnVsZURpY3RbdGhpcy5uYW1lXSA9IHRoaXMuZXh0ZW5kZWRCb2R5O1xuICB9XG59KTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydHMuUnVsZURlY2wgPSBSdWxlRGVjbDtcbmV4cG9ydHMuRGVmaW5lID0gRGVmaW5lO1xuZXhwb3J0cy5PdmVycmlkZSA9IE92ZXJyaWRlO1xuZXhwb3J0cy5JbmxpbmUgPSBJbmxpbmU7XG5leHBvcnRzLkV4dGVuZCA9IEV4dGVuZDtcblxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIGdyYW1tYXJzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFVuZGVjbGFyYXRlZCBncmFtbWFyXG5cbmV4cG9ydHMuVW5kZWNsYXJlZEdyYW1tYXJFcnJvciA9IGZ1bmN0aW9uKGdyYW1tYXJOYW1lLCBvcHROYW1lc3BhY2VOYW1lKSB7XG4gIHRoaXMuZ3JhbW1hck5hbWUgPSBncmFtbWFyTmFtZTtcbiAgdGhpcy5uYW1lc3BhY2VOYW1lID0gb3B0TmFtZXNwYWNlTmFtZTtcbn07XG5cbmV4cG9ydHMuVW5kZWNsYXJlZEdyYW1tYXJFcnJvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubmFtZXNwYWNlTmFtZSA/XG4gICAgWydncmFtbWFyJywgdGhpcy5ncmFtbWFyTmFtZSwgJ2lzIG5vdCBkZWNsYXJlZCBpbiBuYW1lc3BhY2UnLCB0aGlzLm5hbWVzcGFjZU5hbWVdLmpvaW4oJyAnKSA6XG4gICAgWyd1bmRlY2xhcmVkIGdyYW1tYXInLCB0aGlzLmdyYW1tYXJOYW1lXS5qb2luKCcgJyk7XG59O1xuXG4vLyBEdXBsaWNhdGUgZ3JhbW1hciBkZWNsYXJhdGlvblxuXG5leHBvcnRzLkR1cGxpY2F0ZUdyYW1tYXJEZWNsYXJhdGlvbkVycm9yID0gZnVuY3Rpb24oZ3JhbW1hck5hbWUsIG5hbWVzcGFjZU5hbWUpIHtcbiAgdGhpcy5ncmFtbWFyTmFtZSA9IGdyYW1tYXJOYW1lO1xuICB0aGlzLm5hbWVzcGFjZU5hbWUgPSBuYW1lc3BhY2VOYW1lO1xufTtcblxuZXhwb3J0cy5EdXBsaWNhdGVHcmFtbWFyRGVjbGFyYXRpb25FcnJvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFsnZ3JhbW1hcicsIHRoaXMuZ3JhbW1hck5hbWUsICdpcyBhbHJlYWR5IGRlY2xhcmVkIGluIG5hbWVzcGFjZScsIHRoaXMubmFtZXNwYWNlTmFtZV0uam9pbignICcpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gcnVsZXMgLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gVW5kZWNsYXJlZCBydWxlXG5cbmV4cG9ydHMuVW5kZWNsYXJlZFJ1bGVFcnJvciA9IGZ1bmN0aW9uKHJ1bGVOYW1lLCBvcHRHcmFtbWFyTmFtZSkge1xuICB0aGlzLnJ1bGVOYW1lID0gcnVsZU5hbWU7XG4gIHRoaXMuZ3JhbW1hck5hbWUgPSBvcHRHcmFtbWFyTmFtZTtcbn07XG5cbmV4cG9ydHMuVW5kZWNsYXJlZFJ1bGVFcnJvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZ3JhbW1hck5hbWUgP1xuICAgIFsncnVsZScsIHRoaXMucnVsZU5hbWUsICdpcyBub3QgZGVjbGFyZWQgaW4gZ3JhbW1hcicsIHRoaXMuZ3JhbW1hck5hbWVdLmpvaW4oJyAnKSA6XG4gICAgWyd1bmRlY2xhcmVkIHJ1bGUnLCB0aGlzLnJ1bGVOYW1lXS5qb2luKCcgJyk7XG59O1xuXG4vLyBEdXBsaWNhdGUgcnVsZSBkZWNsYXJhdGlvblxuXG5leHBvcnRzLkR1cGxpY2F0ZVJ1bGVEZWNsYXJhdGlvbkVycm9yID0gZnVuY3Rpb24ocnVsZU5hbWUsIGdyYW1tYXJOYW1lKSB7XG4gIHRoaXMucnVsZU5hbWUgPSBydWxlTmFtZTtcbiAgdGhpcy5ncmFtbWFyTmFtZSA9IGdyYW1tYXJOYW1lO1xufTtcblxuZXhwb3J0cy5EdXBsaWNhdGVSdWxlRGVjbGFyYXRpb25FcnJvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFsncnVsZScsIHRoaXMucnVsZU5hbWUsICdpcyBhbHJlYWR5IGRlY2xhcmVkIGluIGdyYW1tYXInLCB0aGlzLmdyYW1tYXJOYW1lXS5qb2luKCcgJyk7XG59O1xuXG4vLyBSdWxlIG11c3QgcHJvZHVjZSB2YWx1ZVxuXG5leHBvcnRzLlJ1bGVNdXN0UHJvZHVjZVZhbHVlRXJyb3IgPSBmdW5jdGlvbihydWxlTmFtZSwgd2h5KSB7XG4gIHRoaXMucnVsZU5hbWUgPSBydWxlTmFtZTtcbiAgdGhpcy53aHkgPSB3aHk7XG59O1xuXG5leHBvcnRzLlJ1bGVNdXN0UHJvZHVjZVZhbHVlRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBbXG4gICAgJ3J1bGUnLCB0aGlzLnJ1bGVOYW1lLCAnbXVzdCBwcm9kdWNlIGEgdmFsdWUnLFxuICAgICdiZWNhdXNlIHRoZSBydWxlIGl0IGlzJywgdGhpcy53aHksICdhbHNvIHByb2R1Y2VzIGEgdmFsdWUnXG4gIF0uam9pbignICcpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gYmluZGluZ3MgLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gSW5jb25zaXN0ZW50IGJpbmRpbmdzXG5cbmV4cG9ydHMuSW5jb25zaXN0ZW50QmluZGluZ3NFcnJvciA9IGZ1bmN0aW9uKHJ1bGVOYW1lLCBleHBlY3RlZCwgYWN0dWFsKSB7XG4gIHRoaXMucnVsZU5hbWUgPSBydWxlTmFtZTtcbiAgdGhpcy5leHBlY3RlZCA9IGV4cGVjdGVkO1xuICB0aGlzLmFjdHVhbCA9IGFjdHVhbDtcbn07XG5cbmV4cG9ydHMuSW5jb25zaXN0ZW50QmluZGluZ3NFcnJvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFtcbiAgICAncnVsZScsIHRoaXMucnVsZU5hbWUsICdoYXMgaW5jb25zaXN0ZW50IGJpbmRpbmdzLicsXG4gICAgJ2V4cGVjdGVkOicsIHRoaXMuZXhwZWN0ZWQsXG4gICAgJ2dvdDonLCB0aGlzLmFjdHVhbFxuICBdLmpvaW4oJyAnKTtcbn07XG5cbi8vIER1cGxpY2F0ZSBiaW5kaW5nc1xuXG5leHBvcnRzLkR1cGxpY2F0ZUJpbmRpbmdzRXJyb3IgPSBmdW5jdGlvbihydWxlTmFtZSwgZHVwbGljYXRlcykge1xuICB0aGlzLnJ1bGVOYW1lID0gcnVsZU5hbWU7XG4gIHRoaXMuZHVwbGljYXRlcyA9IGR1cGxpY2F0ZXM7XG59O1xuXG5leHBvcnRzLkR1cGxpY2F0ZUJpbmRpbmdzRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBbJ3J1bGUnLCB0aGlzLnJ1bGVOYW1lLCAnaGFzIGR1cGxpY2F0ZSBiaW5kaW5nczonLCB0aGlzLmR1cGxpY2F0ZXNdLmpvaW4oJyAnKTtcbn07XG5cbi8vIFVzZWxlc3MgYmluZGluZ3NcblxuZXhwb3J0cy5Vc2VsZXNzQmluZGluZ3NFcnJvciA9IGZ1bmN0aW9uKHJ1bGVOYW1lLCB1c2VsZXNzKSB7XG4gIHRoaXMucnVsZU5hbWUgPSBydWxlTmFtZTtcbiAgdGhpcy51c2VsZXNzID0gdXNlbGVzcztcbn07XG5cbmV4cG9ydHMuVXNlbGVzc0JpbmRpbmdzRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBbJ3J1bGUnLCB0aGlzLnJ1bGVOYW1lLCAnaGFzIHVzZWxlc3MgYmluZGluZ3M6JywgdGhpcy51c2VsZXNzXS5qb2luKCcgJyk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBwcm9wZXJ0aWVzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIER1cGxpY2F0ZSBwcm9wZXJ0eSBuYW1lc1xuXG5leHBvcnRzLkR1cGxpY2F0ZVByb3BlcnR5TmFtZXNFcnJvciA9IGZ1bmN0aW9uKGR1cGxpY2F0ZXMpIHtcbiAgdGhpcy5kdXBsaWNhdGVzID0gZHVwbGljYXRlcztcbn07XG5cbmV4cG9ydHMuRHVwbGljYXRlUHJvcGVydHlOYW1lc0Vycm9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gWydvYmplY3QgcGF0dGVybiBoYXMgZHVwbGljYXRlIHByb3BlcnR5IG5hbWVzOicsIHRoaXMuZHVwbGljYXRlc10uam9pbignICcpO1xufTtcblxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnJlcXVpcmUoJy4uL2Rpc3Qvb2htLWdyYW1tYXIuanMnKTtcblxudmFyIEJ1aWxkZXIgPSByZXF1aXJlKCcuL0J1aWxkZXIuanMnKTtcbnZhciBOYW1lc3BhY2UgPSByZXF1aXJlKCcuL05hbWVzcGFjZS5qcycpO1xudmFyIE1hdGNoRmFpbHVyZSA9IHJlcXVpcmUoJy4vTWF0Y2hGYWlsdXJlLmpzJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMuanMnKTtcblxudmFyIGF3bGliID0gcmVxdWlyZSgnYXdsaWInKTtcbnZhciB1bmVzY2FwZUNoYXIgPSBhd2xpYi5zdHJpbmdVdGlscy51bmVzY2FwZUNoYXI7XG5cbnZhciB0aGlzTW9kdWxlID0gZXhwb3J0cztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIG1ha2VHcmFtbWFyQWN0aW9uRGljdChvcHROYW1lc3BhY2UpIHtcbiAgdmFyIGJ1aWxkZXI7XG4gIHJldHVybiB7XG4gICAgc3BhY2U6ICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVudikge30sXG4gICAgc3BhY2VfbXVsdGlMaW5lOiAgICAgICAgICAgIGZ1bmN0aW9uKCkgICAge30sXG4gICAgc3BhY2Vfc2luZ2xlTGluZTogICAgICAgICAgIGZ1bmN0aW9uKCkgICAge30sXG5cbiAgICBydWxlRGVzY3I6ICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7IGJ1aWxkZXIuc2V0UnVsZURlc2NyaXB0aW9uKGVudi50KTsgfSxcbiAgICBydWxlRGVzY3JUZXh0OiAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7IHJldHVybiB0aGlzLmludGVydmFsLmNvbnRlbnRzOyB9LFxuXG4gICAgbmFtZTogICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkgICAgeyByZXR1cm4gdGhpcy5pbnRlcnZhbC5jb250ZW50czsgfSxcbiAgICBuYW1lRmlyc3Q6ICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7fSxcbiAgICBuYW1lUmVzdDogICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7fSxcblxuICAgIGlkZW50OiAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihlbnYpIHsgcmV0dXJuIGVudi5uOyB9LFxuXG4gICAga2V5d29yZDogICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVudikgeyByZXR1cm4gZW52LnZhbHVlOyB9LFxuICAgIGtleXdvcmRfdW5kZWZpbmVkOiAgICAgICAgICBmdW5jdGlvbigpICAgIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcbiAgICBrZXl3b3JkX251bGw6ICAgICAgICAgICAgICAgZnVuY3Rpb24oKSAgICB7IHJldHVybiBudWxsOyB9LFxuICAgIGtleXdvcmRfdHJ1ZTogICAgICAgICAgICAgICBmdW5jdGlvbigpICAgIHsgcmV0dXJuIHRydWU7IH0sXG4gICAga2V5d29yZF9mYWxzZTogICAgICAgICAgICAgIGZ1bmN0aW9uKCkgICAgeyByZXR1cm4gZmFsc2U7IH0sXG5cbiAgICBzdHJpbmc6ICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVudi5jcy5tYXAoZnVuY3Rpb24oYykgeyByZXR1cm4gdW5lc2NhcGVDaGFyKGMpOyB9KS5qb2luKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICBzQ2hhcjogICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSAgICB7IHJldHVybiB0aGlzLmludGVydmFsLmNvbnRlbnRzOyB9LFxuICAgIHJlZ0V4cDogICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihlbnYpIHsgcmV0dXJuIG5ldyBSZWdFeHAoZW52LmUpOyB9LFxuICAgIHJlQ2hhckNsYXNzOiAgICAgICAgICAgICAgICBmdW5jdGlvbigpICAgIHsgcmV0dXJuIHRoaXMuaW50ZXJ2YWwuY29udGVudHM7IH0sXG4gICAgbnVtYmVyOiAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkgICAgeyByZXR1cm4gcGFyc2VJbnQodGhpcy5pbnRlcnZhbC5jb250ZW50cyk7IH0sXG5cbiAgICBBbHQ6ICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7IHJldHVybiBlbnYudmFsdWU7IH0sXG4gICAgQWx0X3JlYzogICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVudikgeyByZXR1cm4gYnVpbGRlci5hbHQoZW52LngsIGVudi55KTsgfSxcblxuICAgIFRlcm06ICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihlbnYpIHsgcmV0dXJuIGVudi52YWx1ZTsgfSxcbiAgICBUZXJtX2lubGluZTogICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7IHJldHVybiBidWlsZGVyLmlubGluZShidWlsZGVyLmN1cnJlbnRSdWxlTmFtZSArICdfJyArIGVudi5uLCBlbnYueCk7IH0sXG5cbiAgICBTZXE6ICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7IHJldHVybiBidWlsZGVyLnNlcS5hcHBseShidWlsZGVyLCBlbnYudmFsdWUpOyB9LFxuXG4gICAgRmFjdG9yOiAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVudikgeyByZXR1cm4gZW52LnZhbHVlOyB9LFxuICAgIEZhY3Rvcl9iaW5kOiAgICAgICAgICAgICAgICBmdW5jdGlvbihlbnYpIHsgcmV0dXJuIGJ1aWxkZXIuYmluZChlbnYueCwgZW52Lm4pOyB9LFxuXG4gICAgSXRlcjogICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVudikgeyByZXR1cm4gZW52LnZhbHVlOyB9LFxuICAgIEl0ZXJfc3RhcjogICAgICAgICAgICAgICAgICBmdW5jdGlvbihlbnYpIHsgcmV0dXJuIGJ1aWxkZXIubWFueShlbnYueCwgMCk7IH0sXG4gICAgSXRlcl9wbHVzOiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVudikgeyByZXR1cm4gYnVpbGRlci5tYW55KGVudi54LCAxKTsgfSxcbiAgICBJdGVyX29wdDogICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7IHJldHVybiBidWlsZGVyLm9wdChlbnYueCk7IH0sXG5cbiAgICBQcmVkOiAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7IHJldHVybiBlbnYudmFsdWU7IH0sXG4gICAgUHJlZF9ub3Q6ICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVudikgeyByZXR1cm4gYnVpbGRlci5ub3QoZW52LngpOyB9LFxuICAgIFByZWRfbG9va2FoZWFkOiAgICAgICAgICAgICBmdW5jdGlvbihlbnYpIHsgcmV0dXJuIGJ1aWxkZXIubGEoZW52LngpOyB9LFxuXG4gICAgQmFzZTogICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVudikgeyByZXR1cm4gZW52LnZhbHVlOyB9LFxuICAgIEJhc2VfdW5kZWZpbmVkOiAgICAgICAgICAgICBmdW5jdGlvbigpICAgIHsgcmV0dXJuIGJ1aWxkZXIucHJpbSh1bmRlZmluZWQpOyB9LFxuICAgIEJhc2VfbnVsbDogICAgICAgICAgICAgICAgICBmdW5jdGlvbigpICAgIHsgcmV0dXJuIGJ1aWxkZXIucHJpbShudWxsKTsgfSxcbiAgICBCYXNlX3RydWU6ICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSAgICB7IHJldHVybiBidWlsZGVyLnByaW0odHJ1ZSk7IH0sXG4gICAgQmFzZV9mYWxzZTogICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkgICAgeyByZXR1cm4gYnVpbGRlci5wcmltKGZhbHNlKTsgfSxcbiAgICBCYXNlX2FwcGxpY2F0aW9uOiAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7IHJldHVybiBidWlsZGVyLmFwcChlbnYucnVsZU5hbWUpOyB9LFxuICAgIEJhc2VfcHJpbTogICAgICAgICAgICAgICAgICBmdW5jdGlvbihlbnYpIHsgcmV0dXJuIGJ1aWxkZXIucHJpbShlbnYudmFsdWUpOyB9LFxuICAgIEJhc2VfbHN0OiAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihlbnYpIHsgcmV0dXJuIGJ1aWxkZXIubHN0KGVudi54KTsgfSxcbiAgICBCYXNlX3N0cjogICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7IHJldHVybiBidWlsZGVyLnN0cihlbnYueCk7IH0sXG4gICAgQmFzZV9wYXJlbjogICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVudikgeyByZXR1cm4gZW52Lng7IH0sXG4gICAgQmFzZV9vYmo6ICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVudikgeyByZXR1cm4gYnVpbGRlci5vYmooW10sIGVudi5sZW5pZW50Lmxlbmd0aCA+IDApOyB9LFxuICAgIEJhc2Vfb2JqV2l0aFByb3BzOiAgICAgICAgICBmdW5jdGlvbihlbnYpIHsgcmV0dXJuIGJ1aWxkZXIub2JqKGVudi5wcywgZW52LmxlbmllbnQubGVuZ3RoID4gMCk7IH0sXG5cbiAgICBQcm9wczogICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7IHJldHVybiBlbnYudmFsdWU7IH0sXG4gICAgUHJvcHNfYmFzZTogICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVudikgeyByZXR1cm4gW2Vudi5wXTsgfSxcbiAgICBQcm9wc19yZWM6ICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7IHJldHVybiBbZW52LnBdLmNvbmNhdChlbnYucHMpOyB9LFxuICAgIFByb3A6ICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihlbnYpIHsgcmV0dXJuIHtuYW1lOiBlbnYubiwgcGF0dGVybjogZW52LnB9OyB9LFxuXG4gICAgUnVsZTogICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVudikgeyByZXR1cm4gZW52LnZhbHVlOyB9LFxuICAgIFJ1bGVfZGVmaW5lOiAgICAgICAgICAgICAgICBmdW5jdGlvbihlbnYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZGVyLmN1cnJlbnRSdWxlTmFtZSA9IGVudi5uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kOyAgLy8gZm9yY2UgZXZhbHVhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBidWlsZGVyLmRlZmluZShlbnYubiwgZW52LmIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgIFJ1bGVfb3ZlcnJpZGU6ICAgICAgICAgICAgICBmdW5jdGlvbihlbnYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZGVyLmN1cnJlbnRSdWxlTmFtZSA9IGVudi5uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kOyAgLy8gZm9yY2UgZXZhbHVhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBidWlsZGVyLm92ZXJyaWRlKGVudi5uLCBlbnYuYik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgUnVsZV9leHRlbmQ6ICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVudikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkZXIuY3VycmVudFJ1bGVOYW1lID0gZW52Lm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW52LmQ7ICAvLyBmb3JjZSBldmFsdWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkZXIuZXh0ZW5kKGVudi5uLCBlbnYuYik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICBTdXBlckdyYW1tYXI6ICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7IGJ1aWxkZXIuc2V0U3VwZXJHcmFtbWFyKGVudi52YWx1ZSk7IH0sXG4gICAgU3VwZXJHcmFtbWFyX3F1YWxpZmllZDogICAgIGZ1bmN0aW9uKGVudikgeyByZXR1cm4gdGhpc01vZHVsZS5uYW1lc3BhY2UoZW52Lm5zKS5nZXRHcmFtbWFyKGVudi5uKTsgfSxcbiAgICBTdXBlckdyYW1tYXJfdW5xdWFsaWZpZWQ6ICAgZnVuY3Rpb24oZW52KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdE5hbWVzcGFjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdE5hbWVzcGFjZS5nZXRHcmFtbWFyKGVudi5uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5VbmRlY2xhcmVkR3JhbW1hckVycm9yKGVudi5uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICBHcmFtbWFyOiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRlciA9IG5ldyBCdWlsZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRlci5zZXROYW1lKGVudi5uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnYuczsgIC8vIGZvcmNlIGV2YWx1YXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnYucnM7ICAvLyBmb3JjZSBldmFsdWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkZXIuYnVpbGQob3B0TmFtZXNwYWNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICBHcmFtbWFyczogICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZW52KSB7IHJldHVybiBlbnYudmFsdWU7IH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY29tcGlsZUFuZExvYWQoc291cmNlLCB3aGF0SXRJcywgb3B0TmFtZXNwYWNlKSB7XG4gIHRyeSB7XG4gICAgdmFyIHRodW5rID0gdGhpc01vZHVsZS5fb2htR3JhbW1hci5tYXRjaENvbnRlbnRzKHNvdXJjZSwgd2hhdEl0SXMsIHRydWUpO1xuICAgIHJldHVybiB0aHVuayhtYWtlR3JhbW1hckFjdGlvbkRpY3Qob3B0TmFtZXNwYWNlKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIE1hdGNoRmFpbHVyZSkge1xuICAgICAgY29uc29sZS5sb2coJ1xcbicgKyBlLmdldEV4dGVuZGVkRXJyb3JNZXNzYWdlKCkpO1xuICAgIH1cbiAgICB0aHJvdyBlO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VHcmFtbWFyKHNvdXJjZSwgb3B0TmFtZXNwYWNlKSB7XG4gIHJldHVybiBjb21waWxlQW5kTG9hZChzb3VyY2UsICdHcmFtbWFyJywgb3B0TmFtZXNwYWNlKTtcbn1cblxuZnVuY3Rpb24gbWFrZUdyYW1tYXJzKHNvdXJjZSwgb3B0TmFtZXNwYWNlKSB7XG4gIHJldHVybiBjb21waWxlQW5kTG9hZChzb3VyY2UsICdHcmFtbWFycycsIG9wdE5hbWVzcGFjZSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBTdHVmZiB0aGF0IHVzZXJzIHNob3VsZCBrbm93IGFib3V0XG5cbnZhciBuYW1lc3BhY2VzID0ge307XG5leHBvcnRzLm5hbWVzcGFjZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgaWYgKG5hbWVzcGFjZXNbbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgIG5hbWVzcGFjZXNbbmFtZV0gPSBuZXcgTmFtZXNwYWNlKG5hbWUpO1xuICB9XG4gIHJldHVybiBuYW1lc3BhY2VzW25hbWVdO1xufTtcblxuZXhwb3J0cy5tYWtlID0gZnVuY3Rpb24ocmVjaXBlKSB7XG4gIHJldHVybiByZWNpcGUodGhpc01vZHVsZSk7XG59O1xuXG5leHBvcnRzLm1ha2VHcmFtbWFyID0gbWFrZUdyYW1tYXI7XG5leHBvcnRzLm1ha2VHcmFtbWFycyA9IG1ha2VHcmFtbWFycztcblxuLy8gU3R1ZmYgdGhhdCdzIG9ubHkgaGVyZSBmb3IgYm9vdHN0cmFwcGluZywgdGVzdGluZywgZXRjLlxuXG5leHBvcnRzLl9idWlsZGVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgQnVpbGRlcigpO1xufTtcblxuZXhwb3J0cy5fbWFrZUdyYW1tYXJBY3Rpb25EaWN0ID0gbWFrZUdyYW1tYXJBY3Rpb25EaWN0O1xuXG52YXIgb2htR3JhbW1hcjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX29obUdyYW1tYXInLCB7XG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFvaG1HcmFtbWFyKSB7XG4gICAgICBvaG1HcmFtbWFyID0gdGhpcy5fb2htR3JhbW1hckZhY3RvcnkodGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBvaG1HcmFtbWFyO1xuICB9XG59KTtcblxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzLmpzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGNvbW1vbi5hYnN0cmFjdDtcblxucGV4cHJzLmFueXRoaW5nLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLmVuZC5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5QcmltLnByb3RvdHlwZS5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGZ1bmN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpIHtcbiAgdmFyIGFucyA9IGZhbHNlO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnRlcm1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICB2YXIgdGVybSA9IHRoaXMudGVybXNbaWR4XTtcbiAgICBhbnMgfD0gdGVybS5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCk7XG4gIH1cbiAgcmV0dXJuIGFucztcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGZ1bmN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpIHtcbiAgdmFyIGFucyA9IGZhbHNlO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIHZhciBmYWN0b3IgPSB0aGlzLmZhY3RvcnNbaWR4XTtcbiAgICBhbnMgfD0gZmFjdG9yLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbihkaWN0LCBmYWxzZSk7XG4gIH1cbiAgcmV0dXJuIGFucztcbn07XG5cbnBleHBycy5CaW5kLnByb3RvdHlwZS5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24gPSBmdW5jdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uKGRpY3QsIHRydWUpO1xufTtcblxucGV4cHJzLk1hbnkucHJvdG90eXBlLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGZ1bmN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCk7XG59O1xuXG5wZXhwcnMuT3B0LnByb3RvdHlwZS5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24gPSBmdW5jdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uID0gZnVuY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCkge1xuICByZXR1cm4gdGhpcy5leHByLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbihkaWN0LCBmYWxzZSk7XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24gPSBmdW5jdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpO1xufTtcblxucGV4cHJzLlN0ci5wcm90b3R5cGUuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uID0gZnVuY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCkge1xuICByZXR1cm4gdGhpcy5leHByLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbihkaWN0LCBmYWxzZSk7XG59O1xuXG5wZXhwcnMuTGlzdC5wcm90b3R5cGUuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uID0gZnVuY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCkge1xuICByZXR1cm4gdGhpcy5leHByLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbihkaWN0LCBmYWxzZSk7XG59O1xuXG5wZXhwcnMuT2JqLnByb3RvdHlwZS5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24gPSBmdW5jdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uKGRpY3QsIGZhbHNlKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uID0gZnVuY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCkge1xuICBpZiAoIXZhbHVlUmVxdWlyZWQgfHwgZGljdFt0aGlzLnJ1bGVOYW1lXSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGljdFt0aGlzLnJ1bGVOYW1lXSA9IHRydWU7XG4gIH1cbn07XG5cbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycy5qcycpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzLmpzJyk7XG5cbnZhciBhd2xpYiA9IHJlcXVpcmUoJ2F3bGliJyk7XG52YXIgZXF1YWxzID0gYXdsaWIuZXF1YWxzLmVxdWFscztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MgPSBjb21tb24uYWJzdHJhY3Q7XG5cbnBleHBycy5hbnl0aGluZy5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1CaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuZW5kLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5QcmltLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1CaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1CaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIGlmICh0aGlzLnRlcm1zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZXMgPSB0aGlzLnRlcm1zWzBdLmdldEJpbmRpbmdOYW1lcygpO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnRlcm1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICB2YXIgdGVybSA9IHRoaXMudGVybXNbaWR4XTtcbiAgICB0ZXJtLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzKCk7XG4gICAgdmFyIG90aGVyTmFtZXMgPSB0ZXJtLmdldEJpbmRpbmdOYW1lcygpO1xuICAgIGlmICghZXF1YWxzKG5hbWVzLCBvdGhlck5hbWVzKSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5JbmNvbnNpc3RlbnRCaW5kaW5nc0Vycm9yKHJ1bGVOYW1lLCBuYW1lcywgb3RoZXJOYW1lcyk7XG4gICAgfVxuICB9XG59O1xuXG5wZXhwcnMuRXh0ZW5kQWx0LnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1CaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIE9ubHkgaGFzIHR3byB0ZXJtcywgdGhlIHNlY29uZCBvZiB3aGljaCBoYXMgdGhlIGV4cGVjdGVkIGJpbmRpbmdzLlxuICB2YXIgbmFtZXMgPSB0aGlzLnRlcm1zWzFdLmdldEJpbmRpbmdOYW1lcygpO1xuICB2YXIgb3RoZXJOYW1lcyA9IHRoaXMudGVybXNbMF0uZ2V0QmluZGluZ05hbWVzKCk7XG4gIGlmICghZXF1YWxzKG5hbWVzLCBvdGhlck5hbWVzKSkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuSW5jb25zaXN0ZW50QmluZGluZ3NFcnJvcihydWxlTmFtZSwgbmFtZXMsIG90aGVyTmFtZXMpO1xuICB9XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1CaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuZmFjdG9ycy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy5mYWN0b3JzW2lkeF0uYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MocnVsZU5hbWUpO1xuICB9XG59O1xuXG5wZXhwcnMuQmluZC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MocnVsZU5hbWUpO1xufTtcblxucGV4cHJzLk1hbnkucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5PcHQucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5Ob3QucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5TdHIucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5MaXN0LnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1CaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1CaW5kaW5ncyhydWxlTmFtZSk7XG59O1xuXG5wZXhwcnMuT2JqLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1CaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcGVydGllcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzW2lkeF0ucGF0dGVybi5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1CaW5kaW5ncyhydWxlTmFtZSk7XG4gIH1cbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcFxufTtcblxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzLmpzJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMuanMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyA9IGNvbW1vbi5hYnN0cmFjdDtcblxucGV4cHJzLmFueXRoaW5nLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLmVuZC5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5QcmltLnByb3RvdHlwZS5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnRlcm1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzLnRlcm1zW2lkeF0uYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyhydWxlTmFtZSk7XG4gIH1cbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXMuZmFjdG9yc1tpZHhdLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MocnVsZU5hbWUpO1xuICB9XG5cbiAgdmFyIGR1cGxpY2F0ZXMgPSBjb21tb24uZ2V0RHVwbGljYXRlcyh0aGlzLmdldEJpbmRpbmdOYW1lcygpKTtcbiAgaWYgKGR1cGxpY2F0ZXMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRHVwbGljYXRlQmluZGluZ3NFcnJvcihydWxlTmFtZSwgZHVwbGljYXRlcyk7XG4gIH1cbn07XG5cbnBleHBycy5CaW5kLnByb3RvdHlwZS5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MocnVsZU5hbWUpO1xufTtcblxucGV4cHJzLk1hbnkucHJvdG90eXBlLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyhydWxlTmFtZSk7XG59O1xuXG5wZXhwcnMuT3B0LnByb3RvdHlwZS5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MocnVsZU5hbWUpO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyhydWxlTmFtZSk7XG59O1xuXG5wZXhwcnMuU3RyLnByb3RvdHlwZS5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MocnVsZU5hbWUpO1xufTtcblxucGV4cHJzLkxpc3QucHJvdG90eXBlLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyhydWxlTmFtZSk7XG59O1xuXG5wZXhwcnMuT2JqLnByb3RvdHlwZS5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzLnByb3BlcnRpZXNbaWR4XS5wYXR0ZXJuLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MocnVsZU5hbWUpO1xuICB9XG5cbiAgdmFyIGR1cGxpY2F0ZXMgPSBjb21tb24uZ2V0RHVwbGljYXRlcyh0aGlzLmdldEJpbmRpbmdOYW1lcygpKTtcbiAgaWYgKGR1cGxpY2F0ZXMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRHVwbGljYXRlQmluZGluZ3NFcnJvcihydWxlTmFtZSwgZHVwbGljYXRlcyk7XG4gIH1cbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIG5vLW9wXG59O1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMuanMnKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycy5qcycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gYXNzZXJ0Tm9CaW5kaW5ncyhydWxlTmFtZSwgZXhwcikge1xuICB2YXIgYmluZGluZ3MgPSBleHByLmdldEJpbmRpbmdOYW1lcygpO1xuICBpZiAoYmluZGluZ3MubGVuZ3RoID4gMCkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuVXNlbGVzc0JpbmRpbmdzRXJyb3IocnVsZU5hbWUsIGJpbmRpbmdzKTtcbiAgfVxufVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzID0gY29tbW9uLmFic3RyYWN0O1xuXG5wZXhwcnMuYW55dGhpbmcuYXNzZXJ0Tm9Vc2VsZXNzQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLmVuZC5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuUHJpbS5wcm90b3R5cGUuYXNzZXJ0Tm9Vc2VsZXNzQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuYXNzZXJ0Tm9Vc2VsZXNzQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnRlcm1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzLnRlcm1zW2lkeF0uYXNzZXJ0Tm9Vc2VsZXNzQmluZGluZ3MocnVsZU5hbWUpO1xuICB9XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuZmFjdG9ycy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy5mYWN0b3JzW2lkeF0uYXNzZXJ0Tm9Vc2VsZXNzQmluZGluZ3MocnVsZU5hbWUpO1xuICB9XG59O1xuXG5wZXhwcnMuQmluZC5wcm90b3R5cGUuYXNzZXJ0Tm9Vc2VsZXNzQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0Tm9Vc2VsZXNzQmluZGluZ3MocnVsZU5hbWUpO1xufTtcblxucGV4cHJzLk1hbnkucHJvdG90eXBlLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzKHJ1bGVOYW1lKTtcbiAgYXNzZXJ0Tm9CaW5kaW5ncyhydWxlTmFtZSwgdGhpcy5leHByKTtcbn07XG5cbnBleHBycy5PcHQucHJvdG90eXBlLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzKHJ1bGVOYW1lKTtcbiAgYXNzZXJ0Tm9CaW5kaW5ncyhydWxlTmFtZSwgdGhpcy5leHByKTtcbn07XG5cbnBleHBycy5Ob3QucHJvdG90eXBlLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzKHJ1bGVOYW1lKTtcbiAgYXNzZXJ0Tm9CaW5kaW5ncyhydWxlTmFtZSwgdGhpcy5leHByKTtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5TdHIucHJvdG90eXBlLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5MaXN0LnByb3RvdHlwZS5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyhydWxlTmFtZSk7XG59O1xuXG5wZXhwcnMuT2JqLnByb3RvdHlwZS5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcGVydGllcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzW2lkeF0ucGF0dGVybi5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyhydWxlTmFtZSk7XG4gIH1cbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuYXNzZXJ0Tm9Vc2VsZXNzQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcFxufTtcblxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzLmpzJyk7XG52YXIgdGh1bmtzID0gcmVxdWlyZSgnLi90aHVua3MuanMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycy5qcycpO1xudmFyIHNraXBTcGFjZXMgPSByZXF1aXJlKCcuL3NraXBTcGFjZXMuanMnKTtcbnZhciBJbnB1dFN0cmVhbSA9IHJlcXVpcmUoJy4vSW5wdXRTdHJlYW0uanMnKTtcblxudmFyIGF3bGliID0gcmVxdWlyZSgnYXdsaWInKTtcbnZhciBicm93c2VyID0gYXdsaWIuYnJvd3NlcjtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuZXZhbCA9IGNvbW1vbi5hYnN0cmFjdDtcblxucGV4cHJzLmFueXRoaW5nLmV2YWwgPSBmdW5jdGlvbihyZWNvcmRGYWlsdXJlcywgc3ludGFjdGljLCBydWxlRGljdCwgaW5wdXRTdHJlYW0sIGJpbmRpbmdzKSB7XG4gIGlmIChzeW50YWN0aWMpIHtcbiAgICBza2lwU3BhY2VzKHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSk7XG4gIH1cbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHZhciB2YWx1ZSA9IGlucHV0U3RyZWFtLm5leHQoKTtcbiAgaWYgKHZhbHVlID09PSBjb21tb24uZmFpbCkge1xuICAgIGlmIChyZWNvcmRGYWlsdXJlcykge1xuICAgICAgaW5wdXRTdHJlYW0ucmVjb3JkRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbW1vbi5mYWlsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgdGh1bmtzLlZhbHVlVGh1bmsodmFsdWUpO1xuICB9XG59O1xuXG5wZXhwcnMuZW5kLmV2YWwgPSBmdW5jdGlvbihyZWNvcmRGYWlsdXJlcywgc3ludGFjdGljLCBydWxlRGljdCwgaW5wdXRTdHJlYW0sIGJpbmRpbmdzKSB7XG4gIGlmIChzeW50YWN0aWMpIHtcbiAgICBza2lwU3BhY2VzKHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSk7XG4gIH1cbiAgaWYgKGlucHV0U3RyZWFtLmF0RW5kKCkpIHtcbiAgICByZXR1cm4gdGh1bmtzLnZhbHVlbGVzc1RodW5rO1xuICB9IGVsc2Uge1xuICAgIGlmIChyZWNvcmRGYWlsdXJlcykge1xuICAgICAgaW5wdXRTdHJlYW0ucmVjb3JkRmFpbHVyZShpbnB1dFN0cmVhbS5wb3MsIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gY29tbW9uLmZhaWw7XG4gIH1cbn07XG5cbnBleHBycy5QcmltLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24ocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncykge1xuICBpZiAoc3ludGFjdGljKSB7XG4gICAgc2tpcFNwYWNlcyhydWxlRGljdCwgaW5wdXRTdHJlYW0pO1xuICB9XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICBpZiAodGhpcy5tYXRjaChpbnB1dFN0cmVhbSkgPT09IGNvbW1vbi5mYWlsKSB7XG4gICAgaWYgKHJlY29yZEZhaWx1cmVzKSB7XG4gICAgICBpbnB1dFN0cmVhbS5yZWNvcmRGYWlsdXJlKG9yaWdQb3MsIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gY29tbW9uLmZhaWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyB0aHVua3MuVmFsdWVUaHVuayh0aGlzLm9iaik7XG4gIH1cbn07XG5cbnBleHBycy5QcmltLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uKGlucHV0U3RyZWFtKSB7XG4gIHJldHVybiBpbnB1dFN0cmVhbS5tYXRjaEV4YWN0bHkodGhpcy5vYmopO1xufTtcblxucGV4cHJzLlN0cmluZ1ByaW0ucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24oaW5wdXRTdHJlYW0pIHtcbiAgcmV0dXJuIGlucHV0U3RyZWFtLm1hdGNoU3RyaW5nKHRoaXMub2JqKTtcbn07XG5cbnBleHBycy5SZWdFeHBQcmltLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24ocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncykge1xuICBpZiAoc3ludGFjdGljKSB7XG4gICAgc2tpcFNwYWNlcyhydWxlRGljdCwgaW5wdXRTdHJlYW0pO1xuICB9XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICBpZiAoaW5wdXRTdHJlYW0ubWF0Y2hSZWdFeHAodGhpcy5vYmopID09PSBjb21tb24uZmFpbCkge1xuICAgIGlmIChyZWNvcmRGYWlsdXJlcykge1xuICAgICAgaW5wdXRTdHJlYW0ucmVjb3JkRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbW1vbi5mYWlsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgdGh1bmtzLlZhbHVlVGh1bmsoaW5wdXRTdHJlYW0uc291cmNlW29yaWdQb3NdKTtcbiAgfVxufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgYmluZGluZ3MpIHtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHZhciBvcmlnTnVtQmluZGluZ3MgPSBiaW5kaW5ncy5sZW5ndGg7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMudGVybXMubGVuZ3RoOyBpZHgrKykge1xuICAgIGlmIChzeW50YWN0aWMpIHtcbiAgICAgIHNraXBTcGFjZXMocnVsZURpY3QsIGlucHV0U3RyZWFtKTtcbiAgICB9XG4gICAgdmFyIHZhbHVlID0gdGhpcy50ZXJtc1tpZHhdLmV2YWwocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncyk7XG4gICAgaWYgKHZhbHVlICE9PSBjb21tb24uZmFpbCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICAgICAgLy8gTm90ZTogd2hpbGUgdGhlIGZvbGxvd2luZyBhc3NpZ25tZW50IGNvdWxkIGJlIGRvbmUgdW5jb25kaXRpb25hbGx5LCBvbmx5IGRvaW5nIGl0IHdoZW4gbmVjZXNzYXJ5IGlzXG4gICAgICAvLyBiZXR0ZXIgZm9yIHBlcmZvcm1hbmNlLiBUaGlzIGlzIGIvYyBhc3NpZ25pbmcgdG8gYW4gYXJyYXkncyBsZW5ndGggcHJvcGVydHkgaXMgbW9yZSBleHBlbnNpdmUgdGhhbiBhXG4gICAgICAvLyB0eXBpY2FsIGFzc2lnbm1lbnQuXG4gICAgICBpZiAoYmluZGluZ3MubGVuZ3RoID4gb3JpZ051bUJpbmRpbmdzKSB7XG4gICAgICAgIGJpbmRpbmdzLmxlbmd0aCA9IG9yaWdOdW1CaW5kaW5ncztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbW1vbi5mYWlsO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgYmluZGluZ3MpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5mYWN0b3JzLmxlbmd0aDsgaWR4KyspIHtcbiAgICBpZiAoc3ludGFjdGljKSB7XG4gICAgICBza2lwU3BhY2VzKHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSk7XG4gICAgfVxuICAgIHZhciBmYWN0b3IgPSB0aGlzLmZhY3RvcnNbaWR4XTtcbiAgICB2YXIgdmFsdWUgPSBmYWN0b3IuZXZhbChyZWNvcmRGYWlsdXJlcywgc3ludGFjdGljLCBydWxlRGljdCwgaW5wdXRTdHJlYW0sIGJpbmRpbmdzKTtcbiAgICBpZiAodmFsdWUgPT09IGNvbW1vbi5mYWlsKSB7XG4gICAgICByZXR1cm4gY29tbW9uLmZhaWw7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aHVua3MudmFsdWVsZXNzVGh1bms7XG59O1xuXG5wZXhwcnMuQmluZC5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgYmluZGluZ3MpIHtcbiAgdmFyIHZhbHVlID0gdGhpcy5leHByLmV2YWwocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncyk7XG4gIGlmICh2YWx1ZSAhPT0gY29tbW9uLmZhaWwpIHtcbiAgICBiaW5kaW5ncy5wdXNoKHRoaXMubmFtZSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbnBleHBycy5NYW55LnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24ocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncykge1xuICB2YXIgbWF0Y2hlcyA9IFtdO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIHZhciBiYWNrdHJhY2tQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gICAgdmFyIHZhbHVlID0gdGhpcy5leHByLmV2YWwocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBbXSk7XG4gICAgaWYgKHZhbHVlID09PSBjb21tb24uZmFpbCkge1xuICAgICAgaW5wdXRTdHJlYW0ucG9zID0gYmFja3RyYWNrUG9zO1xuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGNoZXMucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXRjaGVzLmxlbmd0aCA8IHRoaXMubWluTnVtTWF0Y2hlcyA/ICBjb21tb24uZmFpbCA6IG5ldyB0aHVua3MuTGlzdFRodW5rKG1hdGNoZXMpO1xufTtcblxucGV4cHJzLk9wdC5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgYmluZGluZ3MpIHtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHZhciB2YWx1ZSA9IHRoaXMuZXhwci5ldmFsKHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgW10pO1xuICBpZiAodmFsdWUgPT09IGNvbW1vbi5mYWlsKSB7XG4gICAgaW5wdXRTdHJlYW0ucG9zID0gb3JpZ1BvcztcbiAgICByZXR1cm4gbmV3IHRodW5rcy5MaXN0VGh1bmsoW10pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgdGh1bmtzLkxpc3RUaHVuayhbdmFsdWVdKTtcbiAgfVxufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgYmluZGluZ3MpIHtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHZhciB2YWx1ZSA9IHRoaXMuZXhwci5ldmFsKGZhbHNlLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgW10pO1xuICBpZiAodmFsdWUgIT09IGNvbW1vbi5mYWlsKSB7XG4gICAgaWYgKHJlY29yZEZhaWx1cmVzKSB7XG4gICAgICBpbnB1dFN0cmVhbS5yZWNvcmRGYWlsdXJlKG9yaWdQb3MsIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gY29tbW9uLmZhaWw7XG4gIH0gZWxzZSB7XG4gICAgaW5wdXRTdHJlYW0ucG9zID0gb3JpZ1BvcztcbiAgICByZXR1cm4gdGh1bmtzLnZhbHVlbGVzc1RodW5rO1xuICB9XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24ocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncykge1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIHZhbHVlID0gdGhpcy5leHByLmV2YWwocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBbXSk7XG4gIGlmICh2YWx1ZSAhPT0gY29tbW9uLmZhaWwpIHtcbiAgICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbnBleHBycy5TdHIucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihyZWNvcmRGYWlsdXJlcywgc3ludGFjdGljLCBydWxlRGljdCwgaW5wdXRTdHJlYW0sIGJpbmRpbmdzKSB7XG4gIGlmIChzeW50YWN0aWMpIHtcbiAgICBza2lwU3BhY2VzKHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSk7XG4gIH1cbiAgdmFyIHN0cmluZyA9IGlucHV0U3RyZWFtLm5leHQoKTtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIHN0cmluZ0lucHV0U3RyZWFtID0gSW5wdXRTdHJlYW0ubmV3Rm9yKHN0cmluZyk7XG4gICAgdmFyIHZhbHVlID0gdGhpcy5leHByLmV2YWwocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIHN0cmluZ0lucHV0U3RyZWFtLCBiaW5kaW5ncyk7XG4gICAgcmV0dXJuIHZhbHVlICE9PSBjb21tb24uZmFpbCAmJiBzdHJpbmdJbnB1dFN0cmVhbS5hdEVuZCgpID8gIG5ldyB0aHVua3MuVmFsdWVUaHVuayhzdHJpbmcpIDogY29tbW9uLmZhaWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbW1vbi5mYWlsO1xuICB9XG59O1xuXG5wZXhwcnMuTGlzdC5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgYmluZGluZ3MpIHtcbiAgaWYgKHN5bnRhY3RpYykge1xuICAgIHNraXBTcGFjZXMocnVsZURpY3QsIGlucHV0U3RyZWFtKTtcbiAgfVxuICB2YXIgbGlzdCA9IGlucHV0U3RyZWFtLm5leHQoKTtcbiAgaWYgKGxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHZhciBsaXN0SW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5uZXdGb3IobGlzdCk7XG4gICAgdmFyIHZhbHVlID0gdGhpcy5leHByLmV2YWwocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGxpc3RJbnB1dFN0cmVhbSwgYmluZGluZ3MpO1xuICAgIHJldHVybiB2YWx1ZSAhPT0gY29tbW9uLmZhaWwgJiYgbGlzdElucHV0U3RyZWFtLmF0RW5kKCkgPyAgbmV3IHRodW5rcy5WYWx1ZVRodW5rKGxpc3QpIDogY29tbW9uLmZhaWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbW1vbi5mYWlsO1xuICB9XG59O1xuXG5wZXhwcnMuT2JqLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24ocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncykge1xuICBpZiAoc3ludGFjdGljKSB7XG4gICAgc2tpcFNwYWNlcyhydWxlRGljdCwgaW5wdXRTdHJlYW0pO1xuICB9XG4gIHZhciBvYmogPSBpbnB1dFN0cmVhbS5uZXh0KCk7XG4gIGlmIChvYmogIT09IGNvbW1vbi5mYWlsICYmIG9iaiAmJiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB2YXIgbnVtT3duUHJvcGVydGllc01hdGNoZWQgPSAwO1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcGVydGllcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICB2YXIgcHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbaWR4XTtcbiAgICAgIHZhciB2YWx1ZSA9IG9ialtwcm9wZXJ0eS5uYW1lXTtcbiAgICAgIHZhciB2YWx1ZUlucHV0U3RyZWFtID0gSW5wdXRTdHJlYW0ubmV3Rm9yKFt2YWx1ZV0pO1xuICAgICAgdmFyIG1hdGNoZWQgPVxuICAgICAgICAgIHByb3BlcnR5LnBhdHRlcm4uZXZhbChyZWNvcmRGYWlsdXJlcywgc3ludGFjdGljLCBydWxlRGljdCwgdmFsdWVJbnB1dFN0cmVhbSwgYmluZGluZ3MpICE9PSBjb21tb24uZmFpbCAmJlxuICAgICAgICAgIHZhbHVlSW5wdXRTdHJlYW0uYXRFbmQoKTtcbiAgICAgIGlmICghbWF0Y2hlZCkge1xuICAgICAgICByZXR1cm4gY29tbW9uLmZhaWw7XG4gICAgICB9XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3BlcnR5Lm5hbWUpKSB7XG4gICAgICAgIG51bU93blByb3BlcnRpZXNNYXRjaGVkKys7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlzTGVuaWVudCB8fCBudW1Pd25Qcm9wZXJ0aWVzTWF0Y2hlZCA9PT0gT2JqZWN0LmtleXMob2JqKS5sZW5ndGggP1xuICAgICAgICBuZXcgdGh1bmtzLlZhbHVlVGh1bmsob2JqKSA6XG4gICAgICAgIGNvbW1vbi5mYWlsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb21tb24uZmFpbDtcbiAgfVxufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24ocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncykge1xuICB2YXIgcnVsZU5hbWUgPSB0aGlzLnJ1bGVOYW1lO1xuICB2YXIgb3JpZ1Bvc0luZm8gPSBpbnB1dFN0cmVhbS5nZXRDdXJyZW50UG9zSW5mbygpO1xuICB2YXIgbWVtb1JlYyA9IG9yaWdQb3NJbmZvLm1lbW9bcnVsZU5hbWVdO1xuICBpZiAobWVtb1JlYyAmJiBvcmlnUG9zSW5mby5zaG91bGRVc2VNZW1vaXplZFJlc3VsdChtZW1vUmVjKSkge1xuICAgIGlucHV0U3RyZWFtLnBvcyA9IG1lbW9SZWMucG9zO1xuICAgIHJldHVybiBtZW1vUmVjLnZhbHVlO1xuICB9IGVsc2UgaWYgKG9yaWdQb3NJbmZvLmlzQWN0aXZlKHJ1bGVOYW1lKSkge1xuICAgIHZhciBjdXJyZW50TFIgPSBvcmlnUG9zSW5mby5nZXRDdXJyZW50TGVmdFJlY3Vyc2lvbigpO1xuICAgIGlmIChjdXJyZW50TFIgJiYgY3VycmVudExSLm5hbWUgPT09IHJ1bGVOYW1lKSB7XG4gICAgICBvcmlnUG9zSW5mby51cGRhdGVJbnZvbHZlZFJ1bGVzKCk7XG4gICAgICBpbnB1dFN0cmVhbS5wb3MgPSBjdXJyZW50TFIucG9zO1xuICAgICAgcmV0dXJuIGN1cnJlbnRMUi52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3JpZ1Bvc0luZm8uc3RhcnRMZWZ0UmVjdXJzaW9uKHJ1bGVOYW1lKTtcbiAgICAgIHJldHVybiBjb21tb24uZmFpbDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJvZHkgPSBydWxlRGljdFtydWxlTmFtZV1cbiAgICBpZiAoIWJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuVW5kZWNsYXJlZFJ1bGVFcnJvcihydWxlTmFtZSk7XG4gICAgfVxuICAgIGlmIChib2R5LmRlc2NyaXB0aW9uICYmIGNvbW1vbi5pc1N5bnRhY3RpYyhydWxlTmFtZSkpIHtcbiAgICAgIHNraXBTcGFjZXMocnVsZURpY3QsIGlucHV0U3RyZWFtKTtcbiAgICB9XG4gICAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gICAgb3JpZ1Bvc0luZm8uZW50ZXIocnVsZU5hbWUpO1xuICAgIHZhciByZiA9IHJlY29yZEZhaWx1cmVzICYmICFib2R5LmRlc2NyaXB0aW9uO1xuICAgIHZhciB2YWx1ZSA9IHRoaXMuZXZhbE9uY2UoYm9keSwgcmYsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtKTtcbiAgICB2YXIgY3VycmVudExSID0gb3JpZ1Bvc0luZm8uZ2V0Q3VycmVudExlZnRSZWN1cnNpb24oKTtcbiAgICBpZiAoY3VycmVudExSKSB7XG4gICAgICBpZiAoY3VycmVudExSLm5hbWUgPT09IHJ1bGVOYW1lKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5oYW5kbGVMZWZ0UmVjdXJzaW9uKGJvZHksIHJmLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgb3JpZ1BvcywgY3VycmVudExSLCB2YWx1ZSk7XG4gICAgICAgIG9yaWdQb3NJbmZvLm1lbW9bcnVsZU5hbWVdID1cbiAgICAgICAgICB7cG9zOiBpbnB1dFN0cmVhbS5wb3MsIHZhbHVlOiB2YWx1ZSwgaW52b2x2ZWRSdWxlczogY3VycmVudExSLmludm9sdmVkUnVsZXN9O1xuICAgICAgICBvcmlnUG9zSW5mby5lbmRMZWZ0UmVjdXJzaW9uKHJ1bGVOYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAoIWN1cnJlbnRMUi5pbnZvbHZlZFJ1bGVzW3J1bGVOYW1lXSkge1xuICAgICAgICAvLyBPbmx5IG1lbW9pemUgaWYgdGhpcyBydWxlIGlzIG5vdCBpbnZvbHZlZCBpbiB0aGUgY3VycmVudCBsZWZ0IHJlY3Vyc2lvblxuICAgICAgICBvcmlnUG9zSW5mby5tZW1vW3J1bGVOYW1lXSA9IHtwb3M6IGlucHV0U3RyZWFtLnBvcywgdmFsdWU6IHZhbHVlfTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgb3JpZ1Bvc0luZm8ubWVtb1tydWxlTmFtZV0gPSB7cG9zOiBpbnB1dFN0cmVhbS5wb3MsIHZhbHVlOiB2YWx1ZX07XG4gICAgfVxuICAgIG9yaWdQb3NJbmZvLmV4aXQocnVsZU5hbWUpO1xuICAgIGlmICh2YWx1ZSA9PT0gY29tbW9uLmZhaWwgJiYgcmVjb3JkRmFpbHVyZXMgJiYgYm9keS5kZXNjcmlwdGlvbikge1xuICAgICAgaW5wdXRTdHJlYW0ucmVjb3JkRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmV2YWxPbmNlID0gZnVuY3Rpb24oZXhwciwgcmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtKSB7XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICB2YXIgYmluZGluZ3MgPSBbXTtcblxuICAvLyBTYXZlIGlucHV0U3RyZWFtJ3MgaW5mbyBhYm91dCB0aGUgY3VycmVudCBydWxlIGFwcGxpY2F0aW9uXG4gIHZhciBvbGRSdWxlTmFtZSA9IGlucHV0U3RyZWFtLmN1cnJlbnRSdWxlTmFtZTtcbiAgdmFyIG9sZFJ1bGVJc1N5bnRhY3RpYyA9IHN5bnRhY3RpYztcbiAgdmFyIG9sZEFwcGx5UG9zID0gaW5wdXRTdHJlYW0uY3VycmVudEFwcGx5UG9zO1xuXG4gIC8vIFNldCBpbnB1dFN0cmVhbSdzIGluZm8gYWJvdXQgdGhlIGN1cnJlbnQgcnVsZSBhcHBsaWNhdGlvblxuICBpbnB1dFN0cmVhbS5jdXJyZW50UnVsZU5hbWUgPSB0aGlzLnJ1bGVOYW1lO1xuICBzeW50YWN0aWMgPSBjb21tb24uaXNTeW50YWN0aWModGhpcy5ydWxlTmFtZSk7XG4gIGlucHV0U3RyZWFtLmN1cnJlbnRBcHBseVBvcyA9IG9yaWdQb3M7XG5cbiAgdmFyIHZhbHVlID0gZXhwci5ldmFsKHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgYmluZGluZ3MpO1xuXG4gIC8vIFJlc3RvcmUgaW5wdXRTdHJlYW0ncyBpbmZvIGFib3V0IHRoZSBvbGQgcnVsZSBhcHBsaWNhdGlvblxuICBpbnB1dFN0cmVhbS5jdXJyZW50UnVsZU5hbWUgPSBvbGRSdWxlTmFtZTtcbiAgc3ludGFjdGljID0gb2xkUnVsZUlzU3ludGFjdGljO1xuICBpbnB1dFN0cmVhbS5jdXJyZW50QXBwbHlQb3MgPSBvbGRBcHBseVBvcztcblxuICBpZiAodmFsdWUgPT09IGNvbW1vbi5mYWlsKSB7XG4gICAgcmV0dXJuIGNvbW1vbi5mYWlsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgdGh1bmtzLlJ1bGVUaHVuayh0aGlzLnJ1bGVOYW1lLCBpbnB1dFN0cmVhbS5zb3VyY2UsIG9yaWdQb3MsIGlucHV0U3RyZWFtLnBvcywgdmFsdWUsIGJpbmRpbmdzKTtcbiAgfVxufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5oYW5kbGVMZWZ0UmVjdXJzaW9uID0gZnVuY3Rpb24oYm9keSwgcmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBvcmlnUG9zLCBjdXJyZW50TFIsIHNlZWRWYWx1ZSkge1xuICB2YXIgdmFsdWUgPSBzZWVkVmFsdWU7XG4gIGlmIChzZWVkVmFsdWUgIT09IGNvbW1vbi5mYWlsKSB7XG4gICAgY3VycmVudExSLnZhbHVlID0gc2VlZFZhbHVlO1xuICAgIGN1cnJlbnRMUi5wb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlucHV0U3RyZWFtLnBvcyA9IG9yaWdQb3M7XG4gICAgICB2YWx1ZSA9IHRoaXMuZXZhbE9uY2UoYm9keSwgcmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtKTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gY29tbW9uLmZhaWwgJiYgaW5wdXRTdHJlYW0ucG9zID4gY3VycmVudExSLnBvcykge1xuICAgICAgICBjdXJyZW50TFIudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgY3VycmVudExSLnBvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gY3VycmVudExSLnZhbHVlO1xuICAgICAgICBpbnB1dFN0cmVhbS5wb3MgPSBjdXJyZW50TFIucG9zO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycy5qcycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5nZXRCaW5kaW5nTmFtZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFtdO1xufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuZ2V0QmluZGluZ05hbWVzID0gZnVuY3Rpb24oKSB7XG4gIC8vIFRoaXMgaXMgb2sgYi9jIGFsbCB0ZXJtcyBtdXN0IGhhdmUgdGhlIHNhbWUgYmluZGluZ3MgLS0gdGhpcyBwcm9wZXJ0eSBpcyBjaGVja2VkIGJ5IHRoZSBHcmFtbWFyIGNvbnN0cnVjdG9yLlxuICByZXR1cm4gdGhpcy50ZXJtcy5sZW5ndGggPT09IDAgPyBbXSA6IHRoaXMudGVybXNbMF0uZ2V0QmluZGluZ05hbWVzKCk7XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5nZXRCaW5kaW5nTmFtZXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG5hbWVzID0gW107XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuZmFjdG9ycy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgbmFtZXMgPSBuYW1lcy5jb25jYXQodGhpcy5mYWN0b3JzW2lkeF0uZ2V0QmluZGluZ05hbWVzKCkpO1xuICB9XG4gIHJldHVybiBuYW1lcy5zb3J0KCk7XG59O1xuXG5wZXhwcnMuQmluZC5wcm90b3R5cGUuZ2V0QmluZGluZ05hbWVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBbdGhpcy5uYW1lXTtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmdldEJpbmRpbmdOYW1lcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5leHByLmdldEJpbmRpbmdOYW1lcygpO1xufTtcblxucGV4cHJzLlN0ci5wcm90b3R5cGUuZ2V0QmluZGluZ05hbWVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuZ2V0QmluZGluZ05hbWVzKCk7XG59O1xuXG5wZXhwcnMuTGlzdC5wcm90b3R5cGUuZ2V0QmluZGluZ05hbWVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuZ2V0QmluZGluZ05hbWVzKCk7XG59O1xuXG5wZXhwcnMuT2JqLnByb3RvdHlwZS5nZXRCaW5kaW5nTmFtZXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG5hbWVzID0gW107XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcGVydGllcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgbmFtZXMgPSBuYW1lcy5jb25jYXQodGhpcy5wcm9wZXJ0aWVzW2lkeF0ucGF0dGVybi5nZXRCaW5kaW5nTmFtZXMoKSk7XG4gIH1cbiAgcmV0dXJuIG5hbWVzLnNvcnQoKTtcbn07XG5cbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycy5qcycpO1xuXG52YXIgYXdsaWIgPSByZXF1aXJlKCdhd2xpYicpO1xudmFyIHByaW50U3RyaW5nID0gYXdsaWIuc3RyaW5nVXRpbHMucHJpbnRTdHJpbmc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGNvbW1vbi5hYnN0cmFjdDtcblxucGV4cHJzLmFueXRoaW5nLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKHdzKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuZW5kLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKHdzKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuUHJpbS5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24od3MpIHtcbiAgd3MubmV4dFB1dEFsbCgnYi5wcmltKCcpO1xuICB3cy5uZXh0UHV0QWxsKHByaW50U3RyaW5nKHRoaXMub2JqKSk7XG4gIHdzLm5leHRQdXRBbGwoJyknKTtcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKHdzKSB7XG4gIHdzLm5leHRQdXRBbGwoJ2IuYWx0KCcpO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnRlcm1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICBpZiAoaWR4ID4gMCkge1xuICAgICAgd3MubmV4dFB1dEFsbCgnLCAnKTtcbiAgICB9XG4gICAgdGhpcy50ZXJtc1tpZHhdLm91dHB1dFJlY2lwZSh3cyk7XG4gIH1cbiAgd3MubmV4dFB1dEFsbCgnKScpO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24od3MpIHtcbiAgd3MubmV4dFB1dEFsbCgnYi5zZXEoJyk7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuZmFjdG9ycy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgaWYgKGlkeCA+IDApIHtcbiAgICAgIHdzLm5leHRQdXRBbGwoJywgJyk7XG4gICAgfVxuICAgIHRoaXMuZmFjdG9yc1tpZHhdLm91dHB1dFJlY2lwZSh3cyk7XG4gIH1cbiAgd3MubmV4dFB1dEFsbCgnKScpO1xufTtcblxucGV4cHJzLkJpbmQucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKHdzKSB7XG4gIHdzLm5leHRQdXRBbGwoJ2IuYmluZCgnKTtcbiAgdGhpcy5leHByLm91dHB1dFJlY2lwZSh3cyk7XG4gIHdzLm5leHRQdXRBbGwoJywgJyk7XG4gIHdzLm5leHRQdXRBbGwocHJpbnRTdHJpbmcodGhpcy5uYW1lKSk7XG4gIHdzLm5leHRQdXRBbGwoJyknKTtcbn07XG5cbnBleHBycy5NYW55LnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbih3cykge1xuICB3cy5uZXh0UHV0QWxsKCdiLm1hbnkoJyk7XG4gIHRoaXMuZXhwci5vdXRwdXRSZWNpcGUod3MpO1xuICB3cy5uZXh0UHV0QWxsKCcsICcpO1xuICB3cy5uZXh0UHV0QWxsKHRoaXMubWluTnVtTWF0Y2hlcyk7XG4gIHdzLm5leHRQdXRBbGwoJyknKTtcbn07XG5cbnBleHBycy5PcHQucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKHdzKSB7XG4gIHdzLm5leHRQdXRBbGwoJ2Iub3B0KCcpO1xuICB0aGlzLmV4cHIub3V0cHV0UmVjaXBlKHdzKTtcbiAgd3MubmV4dFB1dEFsbCgnKScpO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24od3MpIHtcbiAgd3MubmV4dFB1dEFsbCgnYi5ub3QoJyk7XG4gIHRoaXMuZXhwci5vdXRwdXRSZWNpcGUod3MpO1xuICB3cy5uZXh0UHV0QWxsKCcpJyk7XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbih3cykge1xuICB3cy5uZXh0UHV0QWxsKCdiLmxhKCcpO1xuICB0aGlzLmV4cHIub3V0cHV0UmVjaXBlKHdzKTtcbiAgd3MubmV4dFB1dEFsbCgnKScpO1xufTtcblxucGV4cHJzLlN0ci5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24od3MpIHtcbiAgd3MubmV4dFB1dEFsbCgnYi5zdHIoJyk7XG4gIHRoaXMuZXhwci5vdXRwdXRSZWNpcGUod3MpO1xuICB3cy5uZXh0UHV0QWxsKCcpJyk7XG59O1xuXG5wZXhwcnMuTGlzdC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24od3MpIHtcbiAgd3MubmV4dFB1dEFsbCgnYi5sc3QoJyk7XG4gIHRoaXMuZXhwci5vdXRwdXRSZWNpcGUod3MpO1xuICB3cy5uZXh0UHV0QWxsKCcpJyk7XG59O1xuXG5wZXhwcnMuT2JqLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbih3cykge1xuICBmdW5jdGlvbiBvdXRwdXRQcm9wZXJ0eVJlY2lwZShwcm9wKSB7XG4gICAgd3MubmV4dFB1dEFsbCgne25hbWU6ICcpO1xuICAgIHdzLm5leHRQdXRBbGwocHJpbnRTdHJpbmcocHJvcC5uYW1lKSk7XG4gICAgd3MubmV4dFB1dEFsbCgnLCBwYXR0ZXJuOiAnKTtcbiAgICBwcm9wLnBhdHRlcm4ub3V0cHV0UmVjaXBlKHdzKTtcbiAgICB3cy5uZXh0UHV0QWxsKCd9Jyk7XG4gIH1cblxuICB3cy5uZXh0UHV0QWxsKCdiLm9iaihbJyk7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcGVydGllcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgaWYgKGlkeCA+IDApIHtcbiAgICAgIHdzLm5leHRQdXRBbGwoJywgJyk7XG4gICAgfVxuICAgIG91dHB1dFByb3BlcnR5UmVjaXBlKHRoaXMucHJvcGVydGllc1tpZHhdKTtcbiAgfVxuICB3cy5uZXh0UHV0QWxsKCddLCAnKTtcbiAgd3MubmV4dFB1dEFsbChwcmludFN0cmluZyghIXRoaXMuaXNMZW5pZW50KSk7XG4gIHdzLm5leHRQdXRBbGwoJyknKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24od3MpIHtcbiAgd3MubmV4dFB1dEFsbCgnYi5hcHAoJyk7XG4gIHdzLm5leHRQdXRBbGwocHJpbnRTdHJpbmcodGhpcy5ydWxlTmFtZSkpO1xuICB3cy5uZXh0UHV0QWxsKCcpJyk7XG59O1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzLmpzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLnByb2R1Y2VzVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5wcm9kdWNlc1ZhbHVlID0gZnVuY3Rpb24oKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMudGVybXMubGVuZ3RoOyBpZHgrKykge1xuICAgIGlmICghdGhpcy50ZXJtc1tpZHhdLnByb2R1Y2VzVmFsdWUoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxucGV4cHJzLlNlcS5wcm90b3R5cGUucHJvZHVjZXNWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5wcm9kdWNlc1ZhbHVlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycy5qcycpO1xuXG52YXIgYXdsaWIgPSByZXF1aXJlKCdhd2xpYicpO1xudmFyIHByaW50U3RyaW5nID0gYXdsaWIuc3RyaW5nVXRpbHMucHJpbnRTdHJpbmc7XG52YXIgbWFrZVN0cmluZ0J1ZmZlciA9IGF3bGliLm9iamVjdFV0aWxzLnN0cmluZ0J1ZmZlcjtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUudG9FeHBlY3RlZCA9IGZ1bmN0aW9uKHJ1bGVEaWN0KSB7XG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5wZXhwcnMuYW55dGhpbmcudG9FeHBlY3RlZCA9IGZ1bmN0aW9uKHJ1bGVEaWN0KSB7XG4gIHJldHVybiBcImFueSBvYmplY3RcIjtcbn07XG5cbnBleHBycy5lbmQudG9FeHBlY3RlZCA9IGZ1bmN0aW9uKHJ1bGVEaWN0KSB7XG4gIHJldHVybiBcImVuZCBvZiBpbnB1dFwiO1xufTtcblxucGV4cHJzLlByaW0ucHJvdG90eXBlLnRvRXhwZWN0ZWQgPSBmdW5jdGlvbihydWxlRGljdCkge1xuICByZXR1cm4gcHJpbnRTdHJpbmcodGhpcy5vYmopO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUudG9FeHBlY3RlZCA9IGZ1bmN0aW9uKHJ1bGVEaWN0KSB7XG4gIHJldHVybiBcIm5vIFwiICsgdGhpcy5leHByLnRvRXhwZWN0ZWQoKTtcbn07XG5cbi8vIFRPRE86IHRoaW5rIGFib3V0IFN0ciwgTGlzdCwgYW5kIE9ialxuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLnRvRXhwZWN0ZWQgPSBmdW5jdGlvbihydWxlRGljdCkge1xuICB2YXIgZGVzY3JpcHRpb24gPSBydWxlRGljdFt0aGlzLnJ1bGVOYW1lXS5kZXNjcmlwdGlvbjtcbiAgaWYgKGRlc2NyaXB0aW9uKSB7XG4gICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICB9IGVsc2Uge1xuICAgIHZhciBhcnRpY2xlID0gL15bYWVpb3VBRUlPVV0vLnRlc3QodGhpcy5ydWxlTmFtZSkgPyBcImFuXCIgOiBcImFcIjtcbiAgICByZXR1cm4gYXJ0aWNsZSArIFwiIFwiICsgdGhpcy5ydWxlTmFtZTtcbiAgfVxufTtcblxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzLmpzJyk7XG5cbnZhciBhd2xpYiA9IHJlcXVpcmUoJ2F3bGliJyk7XG52YXIgb2JqZWN0VGhhdERlbGVnYXRlc1RvID0gYXdsaWIub2JqZWN0VXRpbHMub2JqZWN0VGhhdERlbGVnYXRlc1RvO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gR2VuZXJhbCBzdHVmZlxuXG5mdW5jdGlvbiBQRXhwcigpIHtcbiAgdGhyb3cgJ1BFeHByIGNhbm5vdCBiZSBpbnN0YW50aWF0ZWQgLS0gaXRcXCdzIGFic3RyYWN0Jztcbn1cblxuLy8gQW55dGhpbmdcblxudmFyIGFueXRoaW5nID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKFBFeHByLnByb3RvdHlwZSk7XG5cbi8vIEVuZFxuXG52YXIgZW5kID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKFBFeHByLnByb3RvdHlwZSk7XG5cbi8vIFByaW1pdGl2ZXNcblxuZnVuY3Rpb24gUHJpbShvYmopIHtcbiAgdGhpcy5vYmogPSBvYmo7XG59XG5cblByaW0ucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKFBFeHByLnByb3RvdHlwZSk7XG5cbmZ1bmN0aW9uIFN0cmluZ1ByaW0ob2JqKSB7XG4gIHRoaXMub2JqID0gb2JqO1xufVxuXG5TdHJpbmdQcmltLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhQcmltLnByb3RvdHlwZSk7XG5cbmZ1bmN0aW9uIFJlZ0V4cFByaW0ob2JqKSB7XG4gIHRoaXMub2JqID0gb2JqO1xufVxuXG5SZWdFeHBQcmltLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhQcmltLnByb3RvdHlwZSk7XG5cbi8vIEFsdGVybmF0aW9uXG5cbmZ1bmN0aW9uIEFsdCh0ZXJtcykge1xuICB0aGlzLnRlcm1zID0gdGVybXM7XG59XG5cbkFsdC5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oUEV4cHIucHJvdG90eXBlKTtcblxuLy8gRXh0ZW5kQWx0IGlzIGFuIGltcGxlbWVudGF0aW9uIGRldGFpbCBvZiBydWxlIGV4dGVuc2lvblxuXG5mdW5jdGlvbiBFeHRlbmRBbHQoZXh0ZW5zaW9ucywgYmFzZSkge1xuICB0aGlzLnRlcm1zID0gW2V4dGVuc2lvbnMsIGJhc2VdO1xufVxuXG5FeHRlbmRBbHQucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKEFsdC5wcm90b3R5cGUpO1xuXG4vLyBTZXF1ZW5jZXNcblxuZnVuY3Rpb24gU2VxKGZhY3RvcnMpIHtcbiAgdGhpcy5mYWN0b3JzID0gZmFjdG9ycztcbn1cblxuU2VxLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhQRXhwci5wcm90b3R5cGUpO1xuXG4vLyBCaW5kaW5nc1xuXG5mdW5jdGlvbiBCaW5kKGV4cHIsIG5hbWUpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbn1cblxuQmluZC5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oUEV4cHIucHJvdG90eXBlKTtcblxuLy8gSXRlcmF0b3JzIGFuZCBvcHRpb25hbHNcblxuZnVuY3Rpb24gTWFueShleHByLCBtaW5OdW1NYXRjaGVzKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG4gIHRoaXMubWluTnVtTWF0Y2hlcyA9IG1pbk51bU1hdGNoZXM7XG59XG5cbk1hbnkucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKFBFeHByLnByb3RvdHlwZSk7XG5cbmZ1bmN0aW9uIE9wdChleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5cbk9wdC5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oUEV4cHIucHJvdG90eXBlKTtcblxuLy8gUHJlZGljYXRlc1xuXG5mdW5jdGlvbiBOb3QoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuXG5Ob3QucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKFBFeHByLnByb3RvdHlwZSk7XG5cbmZ1bmN0aW9uIExvb2thaGVhZChleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5cbkxvb2thaGVhZC5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oUEV4cHIucHJvdG90eXBlKTtcblxuLy8gU3RyaW5nIGRlY29tcG9zaXRpb25cblxuZnVuY3Rpb24gU3RyKGV4cHIpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbn1cblxuU3RyLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhQRXhwci5wcm90b3R5cGUpO1xuXG4vLyBMaXN0IGRlY29tcG9zaXRpb25cblxuZnVuY3Rpb24gTGlzdChleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5cbkxpc3QucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKFBFeHByLnByb3RvdHlwZSk7XG5cbi8vIE9iamVjdCBkZWNvbXBvc2l0aW9uXG5cbmZ1bmN0aW9uIE9iaihwcm9wZXJ0aWVzLCBpc0xlbmllbnQpIHtcbiAgdmFyIG5hbWVzID0gcHJvcGVydGllcy5tYXAoZnVuY3Rpb24ocHJvcGVydHkpIHsgcmV0dXJuIHByb3BlcnR5Lm5hbWU7IH0pO1xuICB2YXIgZHVwbGljYXRlcyA9IGNvbW1vbi5nZXREdXBsaWNhdGVzKG5hbWVzKTtcbiAgaWYgKGR1cGxpY2F0ZXMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRHVwbGljYXRlUHJvcGVydHlOYW1lc0Vycm9yKGR1cGxpY2F0ZXMpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgdGhpcy5pc0xlbmllbnQgPSBpc0xlbmllbnQ7XG4gIH1cbn1cblxuT2JqLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhQRXhwci5wcm90b3R5cGUpO1xuXG4vLyBSdWxlIGFwcGxpY2F0aW9uXG5cbmZ1bmN0aW9uIEFwcGx5KHJ1bGVOYW1lKSB7XG4gIHRoaXMucnVsZU5hbWUgPSBydWxlTmFtZTtcbn1cblxuQXBwbHkucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKFBFeHByLnByb3RvdHlwZSk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnRzLm1ha2VQcmltID0gZnVuY3Rpb24ob2JqKSB7XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyAmJiBvYmoubGVuZ3RoICE9PSAxKSB7XG4gICAgcmV0dXJuIG5ldyBTdHJpbmdQcmltKG9iaik7XG4gIH1cbiAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHBQcmltKG9iaik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBQcmltKG9iaik7XG4gIH1cbn07XG5cbmV4cG9ydHMuUEV4cHIgPSBQRXhwcjtcbmV4cG9ydHMuYW55dGhpbmcgPSBhbnl0aGluZztcbmV4cG9ydHMuZW5kID0gZW5kO1xuZXhwb3J0cy5QcmltID0gUHJpbTtcbmV4cG9ydHMuU3RyaW5nUHJpbSA9IFN0cmluZ1ByaW07XG5leHBvcnRzLlJlZ0V4cFByaW0gPSBSZWdFeHBQcmltO1xuZXhwb3J0cy5BbHQgPSBBbHQ7XG5leHBvcnRzLkV4dGVuZEFsdCA9IEV4dGVuZEFsdDtcbmV4cG9ydHMuU2VxID0gU2VxO1xuZXhwb3J0cy5CaW5kID0gQmluZDtcbmV4cG9ydHMuTWFueSA9IE1hbnk7XG5leHBvcnRzLk9wdCA9IE9wdDtcbmV4cG9ydHMuTm90ID0gTm90O1xuZXhwb3J0cy5Mb29rYWhlYWQgPSBMb29rYWhlYWQ7XG5leHBvcnRzLlN0ciA9IFN0cjtcbmV4cG9ydHMuTGlzdCA9IExpc3Q7XG5leHBvcnRzLk9iaiA9IE9iajtcbmV4cG9ydHMuQXBwbHkgPSBBcHBseTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4dGVuc2lvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnJlcXVpcmUoJy4vcGV4cHJzLWFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbi5qcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncy5qcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtYXNzZXJ0Tm9Vc2VsZXNzQmluZGluZ3MuanMnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzLmpzJyk7XG5yZXF1aXJlKCcuL3BleHBycy1nZXRCaW5kaW5nTmFtZXMuanMnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWV2YWwuanMnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLW91dHB1dFJlY2lwZS5qcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtcHJvZHVjZXNWYWx1ZS5qcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtdG9FeHBlY3RlZC5qcycpO1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMuanMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHNraXBTcGFjZXMocnVsZURpY3QsIGlucHV0U3RyZWFtKSB7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gICAgaWYgKHJ1bGVEaWN0LnNwYWNlLmV2YWwoZmFsc2UsIGZhbHNlLCBydWxlRGljdCwgaW5wdXRTdHJlYW0sIFtdKSA9PT0gY29tbW9uLmZhaWwpIHtcbiAgICAgIGlucHV0U3RyZWFtLnBvcyA9IG9yaWdQb3M7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gc2tpcFNwYWNlcztcblxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBJbnRlcnZhbCA9IHJlcXVpcmUoJy4vSW50ZXJ2YWwuanMnKTtcblxudmFyIGF3bGliID0gcmVxdWlyZSgnYXdsaWInKTtcbnZhciBicm93c2VyID0gYXdsaWIuYnJvd3NlclxudmFyIG9iamVjdFRoYXREZWxlZ2F0ZXNUbyA9IGF3bGliLm9iamVjdFV0aWxzLm9iamVjdFRoYXREZWxlZ2F0ZXNUbztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIFRodW5rKCkge1xuICB0aHJvdyAnVGh1bmsgY2Fubm90IGJlIGluc3RhbnRpYXRlZCAtLSBpdFxcJ3MgYWJzdHJhY3QnO1xufVxuXG52YXIgbmV4dFRodW5rSWQgPSAwO1xuVGh1bmsucHJvdG90eXBlID0ge1xuICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmlkID0gbmV4dFRodW5rSWQrKztcbiAgfVxufTtcblxuZnVuY3Rpb24gUnVsZVRodW5rKHJ1bGVOYW1lLCBzb3VyY2UsIHN0YXJ0SWR4LCBlbmRJZHgsIHZhbHVlLCBiaW5kaW5ncykge1xuICB0aGlzLmluaXQoKTtcbiAgdGhpcy5ydWxlTmFtZSA9IHJ1bGVOYW1lO1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgdGhpcy5zdGFydElkeCA9IHN0YXJ0SWR4O1xuICB0aGlzLmVuZElkeCA9IGVuZElkeDtcbiAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB0aGlzLmJpbmRpbmdzID0gYmluZGluZ3M7XG59XG5cblJ1bGVUaHVuay5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oVGh1bmsucHJvdG90eXBlLCB7XG4gIGZvcmNlOiBmdW5jdGlvbihhY3Rpb25EaWN0LCBtZW1vKSB7XG4gICAgaWYgKCFtZW1vLmhhc093blByb3BlcnR5KHRoaXMuaWQpKSB7XG4gICAgICB2YXIgYWN0aW9uID0gdGhpcy5sb29rdXBBY3Rpb24oYWN0aW9uRGljdCk7XG4gICAgICB2YXIgYWRkbEluZm8gPSB0aGlzLmNyZWF0ZUFkZGxJbmZvKCk7XG4gICAgICB2YXIgZW52ID0gdGhpcy5tYWtlRW52KGFjdGlvbkRpY3QsIG1lbW8pO1xuICAgICAgbWVtb1t0aGlzLmlkXSA9IGFjdGlvbi5jYWxsKGFkZGxJbmZvLCBlbnYpO1xuICAgIH1cbiAgICByZXR1cm4gbWVtb1t0aGlzLmlkXTtcbiAgfSxcblxuICBsb29rdXBBY3Rpb246IGZ1bmN0aW9uKGFjdGlvbkRpY3QpIHtcbiAgICB2YXIgcnVsZU5hbWUgPSB0aGlzLnJ1bGVOYW1lO1xuICAgIHZhciBhY3Rpb24gPSBhY3Rpb25EaWN0W3J1bGVOYW1lXTtcbiAgICBpZiAoYWN0aW9uID09PSB1bmRlZmluZWQgJiYgYWN0aW9uRGljdC5fZGVmYXVsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhY3Rpb24gPSBmdW5jdGlvbihlbnYpIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbkRpY3QuX2RlZmF1bHQuY2FsbCh0aGlzLCBydWxlTmFtZSwgZW52KTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBhY3Rpb24gfHwgYnJvd3Nlci5lcnJvcignbWlzc2luZyBzZW1hbnRpYyBhY3Rpb24gZm9yJywgcnVsZU5hbWUpO1xuICB9LFxuXG4gIGNyZWF0ZUFkZGxJbmZvOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW50ZXJ2YWw6IG5ldyBJbnRlcnZhbCh0aGlzLnNvdXJjZSwgdGhpcy5zdGFydElkeCwgdGhpcy5lbmRJZHgpXG4gICAgfTtcbiAgfSxcblxuICBtYWtlRW52OiBmdW5jdGlvbihhY3Rpb25EaWN0LCBtZW1vKSB7XG4gICAgdmFyIGJpbmRpbmdzID0gdGhpcy5iaW5kaW5ncy5sZW5ndGggPT09IDAgPyBbJ3ZhbHVlJywgdGhpcy52YWx1ZV0gOiB0aGlzLmJpbmRpbmdzO1xuICAgIHZhciBlbnYgPSB7fTtcbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBiaW5kaW5ncy5sZW5ndGg7IGlkeCArPSAyKSB7XG4gICAgICB2YXIgbmFtZSA9IGJpbmRpbmdzW2lkeF07XG4gICAgICB2YXIgdGh1bmsgPSBiaW5kaW5nc1tpZHggKyAxXTtcbiAgICAgIHRoaXMuYWRkQmluZGluZyhlbnYsIG5hbWUsIHRodW5rLCBhY3Rpb25EaWN0LCBtZW1vKTtcbiAgICB9XG4gICAgcmV0dXJuIGVudjtcbiAgfSxcblxuICBhZGRCaW5kaW5nOiBmdW5jdGlvbihlbnYsIG5hbWUsIHZhbHVlLCBhY3Rpb25EaWN0LCBtZW1vKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudiwgbmFtZSwge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGh1bmspIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmZvcmNlKGFjdGlvbkRpY3QsIG1lbW8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBMaXN0VGh1bmsodGh1bmtzKSB7XG4gIHRoaXMuaW5pdCgpO1xuICB0aGlzLnRodW5rcyA9IHRodW5rcztcbn1cblxuTGlzdFRodW5rLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhUaHVuay5wcm90b3R5cGUsIHtcbiAgZm9yY2U6IGZ1bmN0aW9uKGFjdGlvbkRpY3QsIG1lbW8pIHtcbiAgICBpZiAoIW1lbW8uaGFzT3duUHJvcGVydHkodGhpcy5pZCkpIHtcbiAgICAgIG1lbW9bdGhpcy5pZF0gPSB0aGlzLnRodW5rcy5tYXAoZnVuY3Rpb24odGh1bmspIHsgcmV0dXJuIHRodW5rLmZvcmNlKGFjdGlvbkRpY3QsIG1lbW8pOyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG1lbW9bdGhpcy5pZF07XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBWYWx1ZVRodW5rKHZhbHVlKSB7XG4gIHRoaXMudmFsdWUgPSB2YWx1ZTtcbn1cblxuVmFsdWVUaHVuay5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oVGh1bmsucHJvdG90eXBlLCB7XG4gIGZvcmNlOiBmdW5jdGlvbihhY3Rpb25EaWN0LCBtZW1vKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cbn0pO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0cy5SdWxlVGh1bmsgPSBSdWxlVGh1bms7XG5leHBvcnRzLkxpc3RUaHVuayA9IExpc3RUaHVuaztcbmV4cG9ydHMuVmFsdWVUaHVuayA9IFZhbHVlVGh1bms7XG5leHBvcnRzLnZhbHVlbGVzc1RodW5rID0gbmV3IFZhbHVlVGh1bmsodW5kZWZpbmVkKTtcblxuIl19
(17)
});
