## ⚡ Arrays otherness
[![Version](https://badgen.net/npm/v/arrays-otherness)](https://npmjs.com/package/arrays-otherness)
[![Small size](https://img.badgesize.io/neki-dev/arrays-otherness/master/dist/index.js)](https://github.com/neki-dev/arrays-otherness/blob/master/dist/index.js)
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
    originArray: T[], 
    // Etalon array
    targetArray: T[], 
    // Function of matching arrays items
    matchFn: (res) => boolean
): {
    // Execute callback if items in two arrays
    match: (callback: (res) => void) => this,
    // Execute callback if target item missing in origin array
    missing: (callback: (res) => void) => this,
    // Execute callback if origin item is excess in target array
    excess: (callback: (res) => void) => this,
}
```

* ### Example

```js
const arraysOtherness = require('arrays-otherness');

const originArray = [
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

arraysOtherness(originArray, targetArray, ({ origin, target }) => (origin.id === target.id))
    .match(({ target, origin }) => {
        console.log('matched =', target, 'and', origin);
        
        // matched = { id: 1, name: 'John' } and { id: 1, name: 'Jonny' }
        // matched = { id: 3, name: 'Nick' } and { id: 3, name: 'Nick' }
    })
    .missing(({ target }) => {
        console.log('to create =', target);

        // to create = { id: 4, name: 'Lisa' }
        // to create = { id: 5, name: 'Frank' }
    })
    .excess(({ origin }) => {
        console.log('to remove =', origin);

        // to remove = { id: 2, name: 'Sam' }
    });

```