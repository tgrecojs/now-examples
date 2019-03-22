https://medium.com/@drboolean/monoidal-contravariant-functors-are-actually-useful-1032211045c4

## Immutable.js Notes


* Locking for multithreading is no longer a problem: as data cannot change, no locks are needed to synchronize multiple threads.
* Persistence (another key concept explored below) becomes easier.
* Copying becomes a constant-time operation: copying is simply a matter of creating a new reference to the existing instance of a data structure.
* Value comparisons can be optimized in certain cases: when the runtime or compiler can make sure during loading or compiling that a certain instance is only equal when pointing to the same reference, deep value comparisons can become reference comparisons.
     * This is known as interning and is normally only available for data available at compile or load time. This optimization can also be performed manually (as is done with React and Angular, explained in the aside section at the end).

**In JS, `String`s are immutable**

#### `Object.freeze`
* A call to Object.freeze marks all properties as immutable. 
    * `Object.freeze` is **shallow**

```js
const deepFreeze = obj => {
    let propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(name => {
        let prop = obj[name];

        if(typeof prop == 'object' && prop !== null) {
            deepFreeze(prop)
        }
    });
    return Object.freeze(obj)
};
```

### Referential Transparency
* The result of combining side-effect free functions with purity.


### Persistence
* Refers to keeping older version of a data structure
* Performing a full copy on whole data structure is sub-optimal.
    * To combat these, we **only copy the data (and parts of data structure) that changed**
* Partially persistent
    * data structures are those which support modifications on its newest version and read-only operations on all previous versions of the data. 
* Fully Persistent
    * data structures allow reading and writing on all versions of the data. 
* **Partially persistent data structures favor garbage collection**'


### Lazy Evaluation
* Immutable data helps because lazy operations can be constructed being certain data will not change. 
* Unnecessary values need not be computed.
* Lazy evaluation may also allow for infinite data structures.
    *  For instance a sequence from 1 to infinity can be safely expressed if lazy evaluation is supported.
* **Issues with Lazy Eval**
    1. the exact point at which any expression gets evaluated and a computation performed stops being obvious.'
    2. space-leaks: leaks that result from storing the necessary data to perform a given computation in the future. Certain lazy constructs can make this data grow unbounded, which may result in problems.

```js
Immutable.Range(1, Infinity)
    .skip(1000)
    .map(n => -n)
    .filter(n => n % 2 === 0)
    .take(2)
    .reduce((r, n) => r * n, 1);
```

## Mutation: *The escape hatch*
* For all the advantages immutability can provide, **certain operations and algorithms are only efficient when mutation is available.** 

```js
var list1 = Immutable.List.of(1,2,3);
var list2 = list1.withMutations(function (list) {
    list.push(4).push(5).push(6);
});
```


#### Algorithmic Considerations
* **Immutable data structures have different run-time characteristics than mutable data structures**. 
    * immutable data structures usually have good runtime characteristics when taking persistence requirements in consideration.
* **Amoritized Analysis**
    * considers data structures as a group of operations
    *  **Data structures with good amortized times may display occasional worst-time behavior while remaining much better in the general case.**
