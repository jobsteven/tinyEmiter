# tinyEmiter

a tiny emiter util, very easy to understand and use in browser and node.

## usage

```
import Emiter from 'tinyEmiter';

let emiter = new Emiter();

// general methods
emiter.on('start',(start_data) => {
  console.log(start_data);
})
emiter.on('end',(end_data) => {
  console.log(end_data)
})

// params are optional, if eventid is unspecified, it will clear all listeners. if elistener is unspecified, it will clear all listeners associated with this eventid

emiter.off('eventid',elistener)

emiter.off('start');

// bonus, it's very usefull for debugging or handle events wholely.
emiter.on('*', (data) => {
  console.log('all events will be passed into listener also.');
})

```

