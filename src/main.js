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
//  Last Modified time: 2018-02-02 18:47:35 by {{last_modified_by}}
//  Description: tinyEmiter
//
// //////////////////////////////////////////////////////////////////////////////

export default class Emiter {
  constructor() {
    this.MAPS = {};
  }

  on(eid, elistener, context) {
    if (context) { elistener.__this = context }
    if (eid && elistener) {
      const stub = this.MAPS[eid];
      if (!stub) {
        this.MAPS[eid] = [elistener];
        return
      }

      stub.push(elistener);
    }
  }

  once(eid, elistener, context) {
    if (context) { elistener.__this = context }
    elistener.__once = true;
    this.on(eid, elistener);
  }

  has(eid) {
    if (eid) {
      const stub = this.MAPS[eid];
      return stub && stub.length;
    }
    return 0;
  }

  off(eid, elistener) {
    if (eid) {
      const stub = this.MAPS[eid];
      if (stub) {
        if (elistener) {
          return stub.splice(stub.indexOf(elistener), 1);
        }
        console.warn(`**EVENT CODE ID is ${eid}, its all listeners will be removed.**`)
        stub.length = 0;
      }
    } else {
      this.MAPS = {};
      console.warn('**EVENT CODE ID is empty, all listeners will be removed.**')
    }
  }

  emit(eid, data) {
    if (eid) {
      const onceElisteners = [];
      // eid=* broadcast
      const asteriskStub = this.MAPS['*'];
      if (asteriskStub && asteriskStub.length) {
        asteriskStub.forEach((elistener) => {
          elistener.call(elistener.__this, eid, data);
          if (elistener.__once) onceElisteners.push(elistener);
        })
      }

      // eid= normal
      const stub = this.MAPS[eid];
      if (stub && stub.length) {
        stub.forEach((elistener) => {
          elistener.call(elistener.__this, data);
          if (elistener.__once) onceElisteners.push(elistener);
        });
      }

      // once
      if (onceElisteners.length) {
        onceElisteners.forEach((elistener) => {
          this.off(eid, elistener);
        })
      }
    }
  }
}
