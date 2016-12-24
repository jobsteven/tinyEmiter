'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// //////////////////////////////////////////////////////////////////////////////
//
//  Copyright (C) 2016-present  All Rights Reserved.
//  Licensed under the Apache License, Version 2.0 (the "License");
//  http://www.apache.org/licenses/LICENSE-2.0
//
//  Github Home: https://github.com/AlexWang1987
//  Author: AlexWang
//  Date: 2016-09-03 23:58:56
//  QQ Email: 1669499355@qq.com
//  Last Modified time: 2016-12-24 23:21:49
//  Description: tinyEmiter
//
// //////////////////////////////////////////////////////////////////////////////

var Emiter = function () {
  function Emiter() {
    _classCallCheck(this, Emiter);

    this.MAPS = {};
  }

  _createClass(Emiter, [{
    key: 'on',
    value: function on(eid, elistener) {
      if (eid && elistener) {
        var stub = this.MAPS[eid];
        if (!stub) {
          return this.MAPS[eid] = [elistener];
        }
        stub.push(elistener);
      }
    }
  }, {
    key: 'once',
    value: function once(eid, elistener) {
      elistener.__once = true;
      this.on(eid, elistener);
    }
  }, {
    key: 'has',
    value: function has(eid) {
      if (eid) {
        var stub = this.MAPS[eid];
        return stub && stub.length;
      }
      return 0;
    }
  }, {
    key: 'off',
    value: function off(eid, elistener) {
      if (eid) {
        var stub = this.MAPS[eid];
        if (stub) {
          if (elistener) {
            return stub.splice(stub.indexOf(elistener), 1);
          }
          stub.length = 0;
        }
      } else {
        this.MAPS = {};
      }
    }
  }, {
    key: 'emit',
    value: function emit(eid, data) {
      var _this = this;

      if (eid) {
        (function () {
          var onceElisteners = [];
          //eid=* broadcast
          var asteriskStub = _this.MAPS['*'];
          if (asteriskStub && asteriskStub.length) {
            asteriskStub.forEach(function (elistener) {
              elistener(eid, data);
              if (elistener['__once']) onceElisteners.push(elistener);
            });
          }

          // eid= normal
          var stub = _this.MAPS[eid];
          if (stub && stub.length) {
            stub.forEach(function (elistener) {
              elistener(data);
              if (elistener['__once']) onceElisteners.push(elistener);
            });
          }

          // once
          if (onceElisteners.length) {
            onceElisteners.forEach(function (elistener) {
              _this.off(eid, elistener);
            });
          }
        })();
      }
    }
  }]);

  return Emiter;
}();

exports.default = Emiter;
