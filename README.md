## Arrays otherness
[![Npm package version](https://badgen.net/npm/v/arrays-otherness)](https://npmjs.com/package/arrays-otherness)
[![Small size](https://badge-size.herokuapp.com/neki-dev/arrays-otherness/master/dist/index.js)](https://github.com/neki-dev/arrays-otherness/blob/master/dist/index.js)
[![Testing](https://github.com/neki-dev/arrays-otherness/actions/workflows/test.yml/badge.svg)](https://github.com/neki-dev/arrays-otherness/actions/workflows/test.yml)
[![Building](https://github.com/neki-dev/arrays-otherness/actions/workflows/build.yml/badge.svg)](https://github.com/neki-dev/arrays-otherness/actions/workflows/build.yml)

Get and handle a matching, missing and excess items of an array based on target array

.

* ### Install

```sh
npm i arrays-otherness
```

* ### Usage

```js
arraysOtherness<T>(
    // Array for checking
    currentArray: T[], 
    // Etalon array
    targetArray: T[], 
    // Function of matching arrays items
    matchFn: (res) => boolean
): {
    // Execute callback if items in two arrays
    match: (callback: (res) => void) => this,
    // Execute callback if target item missing in current array
    missing: (callback: (res) => void) => this,
    // Execute callback if current item is excess in target array
    excess: (callback: (res) => void) => this,
}
```

* ### Example

```js
const arraysOtherness = require('arrays-otherness');

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

arraysOtherness(currentArray, targetArray, ({ current, target }) => (current.id === target.id))
    .match(({ target, current }) => {
        console.log('matched =', target, 'and', current);
    })
    .missing(({ target }) => {
        console.log('to create =', target);
    })
    .excess(({ current }) => {
        console.log('to delele =', current);
    });
```