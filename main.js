import HashMap from "./hashmap.js";

function testHashMap() {
    const hashMap = new HashMap();

    // Test set()
    hashMap.set("apple", "red");
    hashMap.set("banana", "yellow");
    hashMap.set("cherry", "red");

    // Test get()
    console.log(hashMap.get("apple")); // Should output "red"
    console.log(hashMap.get("banana")); // Should output "yellow"

    // Test has()
    console.log(hashMap.has("apple")); // Should output true
    console.log(hashMap.has("grape")); // Should output false

    // Test remove()
    hashMap.remove("banana");
    console.log(hashMap.has("banana")); // Should output false

    // Test length()
    console.log(hashMap.length()); // Should output 2

    // Test keys()
    console.log(hashMap.keys()); // Should output ["apple", "cherry"]

    // Test values()
    console.log(hashMap.values()); // Should output ["red", "red"]

    // Test entries()
    console.log(hashMap.entries()); // Should output [["apple", "red"], ["cherry", "red"]]

    // Test clear()
    hashMap.clear();
    console.log(hashMap.length()); // Should output 0
}

testHashMap();