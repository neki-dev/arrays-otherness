## Arrays otherness

Getting and handle matching, missing and exess items of an current array based on target array

.

* ### Install

```sh
npm i arrays-otherness
```

* ### Usage

```js
const otherness = require('arrays-otherness');

const currentArray = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Sam' },
    { id: 3, name: 'Nick' },
];

const targetArray = [
    { id: 1, name: 'Jonny' },
    { id: 3, name: 'Nick' },
    { id: 4, name: 'Lisa' },
    { id: 5, name: 'Frank' },
];

// Function of matching arrays items
const matchFn = (targetItem, currentItem) => 
    (targetItem.id === currentItem.id);

otherness(currentArray, targetArray, matchFn)
    .match((targetItem, currentItem) => {
        // If items in two arrays
        console.log('matched =', targetItem.id);
    })
    .missing((targetItem) => {
        // If target item missing in current array
        console.log('to create =', targetItem.id);
    })
    .excess((currentItem) => {
        // If current item is excess in target array
        console.log('to delele =', currentItem.id);
    });
```