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
//  Last Modified time: 2016-11-17 15:21:03
//  Description: tinyEmiter
//
// //////////////////////////////////////////////////////////////////////////////

export default class Emiter {
  constructor() {
    this.MAPS = {};
  }
  on(eid, elistener) {
    if (eid && elistener) {
      let stub = this.MAPS[eid];
      if (!stub) {
        return this.MAPS[eid] = [elistener];
      }
      stub.push(elistener);
    }
  }
  off(eid, elistener) {
    if (eid) {
      let stub = this.MAPS[eid];
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
  emit(eid, data) {
    if (eid) {
      //eid=* broadcast
      let asteriskStub = this.MAPS['*'];
      if (asteriskStub && asteriskStub.length) {
        asteriskStub.forEach(function (elistener) {
          elistener(eid, data);
        })
      }

      // eid= normal
      let stub = this.MAPS[eid];
      if (stub && stub.length) {
        stub.forEach(function (elistener) {
          elistener(data);
        });
      }
    }
  }
}

