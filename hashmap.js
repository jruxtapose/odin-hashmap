import Node from "./node.js";

export default class HashMap {
  constructor(loadFactor, capacity) {
    this.capacity = capacity || 16;
    this.bucketsArray = new Array(this.capacity).fill(null);
    this.loadFactor = loadFactor || 0.75;
    this.occupied = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.capacity;
  }

  resize() {
    const oldArray = this.bucketsArray;
    const oldCapacity = this.capacity;
    this.capacity *= 2;
    this.bucketsArray = new Array(this.capacity).fill(null);
    oldArray.forEach((bucket) => {
      if (bucket !== null) {
        this.set(bucket.key, bucket.value);
      }
    });
    console.log(`Capacity upgraded. ${oldCapacity} -> ${this.capacity}`);
  }

  set(key, value) {
    // Create hashcode for key
    const bucket = this.hash(key);
    const newNode = new Node(key, value);
    // Check
    if (this.occupied / this.capacity >= this.loadFactor) this.resize();
    if (!this.has(key)) {
      this.bucketsArray[bucket] = newNode;
      this.occupied++;
      console.log(`Bucket created. Key: ${key}, Value: ${value}`);
    } else {
      const oldKey = this.bucketsArray[bucket].key;
      const oldValue = this.bucketsArray[bucket].value;
      if (oldKey === key && oldValue === value) {
        console.error("Existing node and new node are the same");
      } else {
        this.bucketsArray[bucket] = newNode;
        console.log(
          `Bucket updated. Key: ${oldKey} -> ${key} Value: ${oldValue} -> ${value}`
        );
      }
    }
  }

  get(key) {
    const bucket = this.hash(key);
    return this.bucketsArray[bucket] !== null
      ? this.bucketsArray[bucket].value
      : null;
  }

  has(key) {
    const bucket = this.hash(key);
    return this.bucketsArray[bucket] !== null;
  }

  remove(key) {
    const bucket = this.hash(key);
    if (this.bucketsArray[bucket] !== null) {
      const oldBucket = this.bucketsArray[bucket];
      this.bucketsArray[bucket] = null;
      this.occupied--;
      console.log(
        `Bucket removed. [${oldBucket.key}, ${oldBucket.value}] -> null`
      );
    } else {
      console.error(`'${key}' doesn't exist`);
    }
  }

  length() {
    return this.occupied;
  }

  clear() {
    if (this.occupied === 0) {
      console.error("Hashmap is already empty.");
    } else {
      this.bucketsArray = new Array(this.capacity).fill(null);
      this.occupied = 0;
      console.log(`Hashmap cleared.`);
    }
  }

  keys() {
    if (this.occupied !== 0) {
      const keysArray = [];
      this.bucketsArray.forEach((bucket) => {
        if (bucket !== null) keysArray.push(bucket.key);
      });
      return keysArray;
    } else {
      console.error("No keys exist in hashmap.");
      return [];
    }
  }

  values() {
    if (this.occupied !== 0) {
      const valuesArray = [];
      this.bucketsArray.forEach((bucket) => {
        if (bucket !== null) valuesArray.push(bucket.value);
      });
      return valuesArray;
    } else {
      console.error("No values exist in hashmap.");
      return [];
    }
  }

  entries() {
    if (this.occupied !== 0) {
      const entriesArray = [];
      this.bucketsArray.forEach((bucket) => {
        if (bucket !== null) entriesArray.push([bucket.key, bucket.value]);
      });
      return entriesArray;
    }
    console.error("No entries exist in hashmap.");
    return [];
  }
}
