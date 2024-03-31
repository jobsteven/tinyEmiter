# ehive

a tiny ehive util, very easy to understand and use in browser and node.

## usage

```javascript
import ehive from 'ehive'

// general methods
ehive.on(
  'start',
  function external_fun(start_data) => {
    console.log(start_data, this)
  },
  this
)

ehive.on('end', (end_data) => {
  console.log(end_data)
})

ehive.on('*', (data) => {
  console.log('all events will be passed into listener also.')
})

ehive.once('app_init', (data) => {
  console.log('init');
})

ehive.off('eventid', elistener) // specific elistener for eid
ehive.off('start') // all elisteners for eid
ehive.off() // all elistener

// bonus, it's very usefull for debugging or handle events wholely.
ehive.has('app_start')

```
