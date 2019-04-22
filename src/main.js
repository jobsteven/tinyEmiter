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
//  Last Modified time: 2018-02-03 16:13:52 by {{last_modified_by}}
//  Description: tinyEmiter
//
// //////////////////////////////////////////////////////////////////////////////

export default class Emiter {
  constructor() {
    this.MAPS = {}
  }

  on(eid, elistener, context) {
    if (!(eid && elistener)) throw new Error('eid, elistener are required!')

    if (context) {
      elistener.__this = context
    }

    let stub = this.MAPS[eid]

    if (stub) {
      stub.push(elistener)
    } else {
      stub = [elistener]
      this.MAPS[eid] = stub
    }

    if (Object.entries(this.MAPS).length === 1 && this.onoff) this.onoff(true)
  }

  off(eid, elistener) {
    if (eid) {
      const stub = this.MAPS[eid]
      if (stub) {
        if (elistener) {
          stub.splice(stub.indexOf(elistener), 1)
        } else {
          console.warn(`**EVENT CODE ID is ${eid}, its all listeners will be removed.**`)
          stub.length = 0
        }

        if (stub.length === 0) delete this.MAPS[eid]
      }
    } else {
      console.warn('**EVENT CODE ID is empty, all listeners will be removed.**')
      this.MAPS = {}
    }

    if (Object.entries(this.MAPS).length === 0 && this.onoff) this.onoff()
  }

  has(eid) {
    if (eid) {
      const stub = this.MAPS[eid]
      return stub ? stub.length : 0
    }
    return 0
  }

  once(eid, elistener, context) {
    if (context) {
      elistener.__this = context
    }
    elistener.__once = true
    this.on(eid, elistener)
  }

  emit(eid, data) {
    if (eid) {
      const onceElisteners = []
      // eid=* broadcast
      const asteriskStub = this.MAPS['*']
      if (asteriskStub && asteriskStub.length) {
        asteriskStub.forEach(elistener => {
          elistener.call(elistener.__this, eid, data)
          if (elistener.__once) onceElisteners.push(elistener)
        })
      }

      // eid= normal
      const stub = this.MAPS[eid]
      if (stub && stub.length) {
        stub.forEach(elistener => {
          elistener.call(elistener.__this, data)
          if (elistener.__once) onceElisteners.push(elistener)
        })
      }

      // once
      if (onceElisteners.length) {
        onceElisteners.forEach(elistener => {
          this.off(eid, elistener)
        })
      }
    }
  }
}
