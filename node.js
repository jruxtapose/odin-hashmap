export default class Node {
    constructor(key, value) {
        this.key = key || null;
        this.value = value || null;
        this.next = null
    }
}