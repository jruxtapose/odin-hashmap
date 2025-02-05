import Node from "./node.js";

export default class HashMap {
  constructor(loadFactor, capacity) {
    this.capacity = capacity || 16;
    this.bucketsArray = new Array(this.capacity).fill(null);
    this.loadFactor = loadFactor || 0.75;
    this.occupied = 0;
  }

  hash(key) {
    if (key === '') return 1;
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
    console.log(`Upgrading capacity.`);
    this.capacity *= 2;
    console.log(`Capacity upgraded. ${oldCapacity} -> ${this.capacity}`);
    console.log("Recreating array:");
    this.bucketsArray = new Array(this.capacity).fill(null);
    oldArray.forEach((bucket) => {
      if (bucket !== null) {
        this.set(bucket.key, bucket.value);
      }
    });
    console.log("Array recreated.");
  }

  bucketValidate(bucket) {
    if (bucket < 0 || bucket > this.capacity - 1) {
      throw new Error("Trying to access index out of bounds.");
    }
  }

  set(key, value) {
    // Create hashcode for key
    const bucket = this.hash(key);
    this.bucketValidate(bucket);
    const newNode = new Node(key, value);
    // Check
    if (this.occupied / this.capacity >= this.loadFactor) this.resize();
    if (this.bucketsArray[bucket] === null) {
      this.bucketsArray[bucket] = newNode;
      this.occupied++;
      console.log(`Bucket created. Key: ${key}, Value: ${value}`);
    } else {
      if (!this.isDuplicate(key, value) && !this.has(key)) {
        let current = this.bucketsArray[bucket];
        while (current.next !== null) {
          current = current.next;
        }
        current.next = newNode;
        console.log(
          `Bucket updated. Added to bucket. Key: ${key}, Value: ${value}`
        );
      } else if (!this.isDuplicate(key, value) && this.has(key)) {
        let current = this.bucketsArray[bucket];
        while (current !== null) {
          if (current.key === key) {
            console.log(`Value updated. ${current.value} -> ${value}`)
            return current.value = value;
          }
          current = current.next;
        }
      } else if (this.isDuplicate(key, value)) {
        throw new Error("Key, value pair already exists.");
      }
    }
  }

  // iterates through a bucket to check for a duplicate key,value pair.
  isDuplicate(key, value) {
    const bucket = this.hash(key);
    if (this.has(key)) {
      let current = this.bucketsArray[bucket];
      while (current !== null) {
        if (current.key === key && current.value === value) {
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }

  get(key) {
    const bucket = this.hash(key);
    this.bucketValidate(bucket);
    let current = this.bucketsArray[bucket];
    while (current !== null) {
      if (current.key === key) return current.value;
      current = current.next;
    }
    console.error('Key does not exist');
    return null;
  }

  has(key) {
    const bucket = this.hash(key);
    this.bucketValidate(bucket);
    let current = this.bucketsArray[bucket];
    if(current !== null){
      while (current !== null) {
        if (current.key === key) return true;
        current = current.next;
      }
    }
    return false;
  }

  remove(key) {
    const bucket = this.hash(key);
    this.bucketValidate(bucket);
    let current = this.bucketsArray[bucket];
    let previous = null;
    while (current !== null) {
      if (current.key === key) {
        if (previous === null && current.next !== null) {
          return this.bucketsArray[bucket] = current.next;
        } else if (previous !== null && current.next !== null) {
          return previous.next = current.next;
        } else if (previous !== null && current.next === null) {
          return previous.next = null;
        } else if (previous === null && current.next === null) {
          this.occupied--
          return this.bucketsArray[bucket] = null;
        }
        current = current.next;
      } 
    }
    throw new Error ('Key does not exist')
  }

  length() {
    return this.occupied;
  }

  clear() {
    if (this.occupied === 0) {
      console.error("Hashmap is already empty");
    } else {
      this.bucketsArray = new Array(this.capacity).fill(null);
      this.occupied = 0;
      console.log(`Hashmap cleared`);
    }
  }

  keys() {
    if (this.occupied !== 0) {
      const keysArray = [];
      this.bucketsArray.forEach((bucket) => {
        if (bucket !== null) {
          let current = bucket;
          while (current !== null) {
            keysArray.push(current.key);
            current = current.next;
          }
        }
      });
      return keysArray;
    } else {
      console.error("No keys exist in hashmap");
      return [];
    }
  }

  values() {
    if (this.occupied !== 0) {
      const valuesArray = [];
      this.bucketsArray.forEach((bucket) => {
        if (bucket !== null) {
          let current = bucket;
          while (current !== null) {
            valuesArray.push(current.value);
            current = current.next;
          }
        }
      });
      return valuesArray;
    } else {
      console.error("No values exist in hashmap");
      return [];
    }
  }

  entries() {
    if (this.occupied !== 0) {
      const entriesArray = [];
      this.bucketsArray.forEach((bucket) => {
        if (bucket !== null) {
          let current = bucket;
          while (current !== null) {
            entriesArray.push([current.key, current.value]);
            current = current.next;
          }
        }
      });
      return entriesArray;
    }
    console.error("No entries exist in hashmap");
    return [];
  }
}
