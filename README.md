## Synchronization current array by target array
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

contrast(
    currentArray, 
    targetArray,
    // Function of matching arrays items
    (itemT, itemC) => (itemT.id === itemC.id)
).match((itemT, itemC) => {
    // If items in two arrays
    // itemT.id = 32
    // itemT.id = 33 
}).missing((itemT) => {
    // If target item missing in current array
    // itemT.id = 41
}).excess((itemC) => {
    // If current item is extra in target array
    // itemC.id = 31
});
```