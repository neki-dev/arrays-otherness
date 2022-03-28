## Synchronization current array by target array
Allows to get matching, missing and exess items of an current array based on target array

.

* ### Install

```sh
npm i contrast-arrays
```

* ### Usage

```js
const contrast = require('contrast-arrays');

const currentArray = [
    {a: 10, b: 'm1', id: 31},
    {a: 10, b: 'b2', id: 32},
    {a: 10, b: 'c3', id: 33},
];

const targetArray = [
    {a: 20, b: 'n1', id: 41},
    {a: 20, b: 'b2', id: 32},
    {a: 20, b: 'b3', id: 33},
];

// Function of matching arrays items
const matchFn = (targetItem, currentItem) => 
    (targetItem.id === currentItem.id);

contrast(currentArray, targetArray, matchFn)
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