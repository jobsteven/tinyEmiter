import E from '../src/main.js';

const e = new E
const f = function ecb() {
  console.log(this)
}
const thisobj = { a: 'av' }

const bindf = f.bind(thisobj)

e.once('CODE_ID', bindf)

setInterval(() => {
  e.emit('CODE_ID', Math.random() * 1000)
}, 1000)
