(function() {
  'use strict';

  var __ = {
    assigner: '=',

    delimiter: '&',

    encode: function(value) {
      return encodeURIComponent(value);
    },

    decode: function(value) {
      return decodeURIComponent(value);
    },

    each: function(obj, iterator, context) {
      var keys = Object.keys(obj);
      keys.forEach(function(key, index, list) {
        iterator.call(context, obj[key], key, list);
      }, context);
    },

    map: function(obj, iterator, context) {
      var arr = [];
      this.each(obj, function(value, key, list) {
        arr.push(iterator.call(context, value, key, list));
      });
      return arr;
    },

    extend: function(base, obj) {
      this.each(obj, function(value, key) {
        base[key] = value;
      });
      return base;
    },

    reduce: function(obj, iterator, memo, context) {
      this.each(obj, function(value, key, list) {
        memo = iterator.call(context, memo, value, key, list);
      });
      return memo;
    },

    hash: function(str) {
      if (arguments.length === 1) {
        location.hash = str;
      } else {
        return location.hash.substr(1);
      }
    }
  };

  var earl = {};

  earl.serial = function(obj) {
    return __.map(obj, function(value, key) {
      return [__.encode(key), __.encode(value)].join(__.assigner);
    }).join(__.delimiter);
  };

  earl.deserial = function(str) {
    var pairs = str.split(__.delimiter);
    if (pairs.length === 1 && pairs[0] === "") {
      return {};
    }
    return __.reduce(pairs, function(obj, pair) {
      var split = pair.split(__.assigner, 2),
          key = split[0],
          value = split[1];
      obj[__.decode(key)] = __.decode(value);
      return obj;
    }, {});
  };

  earl.anchor = function() {
    var obj = this.deserial(__.hash());
    if (arguments.length === 0) {
      return obj;
    } else if (arguments.length === 2) {
      obj[arguments[0]] = arguments[1];
      __.hash(this.serial(obj));
    } else if (typeof arguments[0] === "string") {
      return obj[arguments[0]];
    } else {
      __.extend(obj, arguments[0]);
      __.hash(this.serial(obj));
    }
  };

  earl.rmanchor = function() {
    var obj = this.deserial(__.hash());
    if (arguments.length === 0) {
      obj = {};
    } else {
      delete obj[arguments[0]];
    }
    __.hash(this.serial(obj));
  };

  window.earl = earl;
})();
