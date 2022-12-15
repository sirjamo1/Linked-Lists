class LinkedList {
    constructor(head = null) {
        this.head = head;
    }
    // add to end of list
    append(value) {
        // if head node doesn't exist create new node class
        if (!this.head) {
            this.head = new Node(value);
            return this;
        }
        // head node does exist, find tail node, assign tail node .next with create new node class
        let tail = this.getTail();
        tail.next = new Node(value);
        return tail;
    }
    preAppend(value) {
        // if head node doesn't exist create new node class
        if (!this.head) {
            this.head = new Node(value);
            return this;
        }
        // head node does exist, assign prevHead with current node, assign current node with create new code using value and prevHead as .next
        const prevHead = this.head;
        this.head = new Node(value, prevHead);
    }
    size() {
        // set counter to current node, loop through until current node.next doesn't have value, each loop add 1 to nodeCount
        let nodeCount = 0;
        let counter = this.head;
        while (counter !== null) {
            nodeCount += 1;
            counter = counter.next;
        }
        return nodeCount;
    }
    getHead() {
        return this.head;
    }
    getTail() {
        //if head node doesn't exist, return null
        if (!this.head) return null;
        //head node does exist, assign tail to current head, and the repeatably assign tail to head.next until head.next doesn't have value
        let tail = this.head;
        while (tail.next !== null) {
            tail = tail.next;
        }
        return tail;
    }
    at(index) {
        //if head node doesn't exist, return null
        if (!this.head) return null;
        //head node does exist, assign counter to current head node, loop until supplied index value, each loop change counter to next node until last node, if node.next is null and i is still smaller then index return null
        let counter = this.head;
        for (let i = 0; i < index; i += 1) {
            if (counter.next === null && i < index) {
                return null;
            } else {
                counter = counter.next;
            }
        }
        return counter;
    }
    pop() {
        //if head node doesn't exist, return null
        if (!this.head) return null;
        //head exists but head.next doesn't, head = null
        if (!this.head.next) {
            this.head = null;
            return;
        }
        // head and head.next exist, get 1 node back from tail and assign node.next to null
        let pointerBeforeTail = this.at(this.size() - 2);
        pointerBeforeTail.next = null;
        return this.head;
    }
    contains(value) {
        //if head node doesn't exist, return null
        if (!this.head) return null;
        // head does exist, loop through, if it matches return true else false
        let counter = this.head;
        while (counter !== null) {
            if (value === counter.value) {
                return true;
            }
            counter = counter.next;
        }
        return false;
    }
    find(value) {
        //if head node doesn't exist, return null
        if (!this.head) return null;
        //head node does exist, loop through, add index's to list, if nothing matches return null
        let index = 0;
        let counter = this.head;
        let indexList = [];
        while (counter !== null) {
            index += 1;
            if (value === counter.value) {
                indexList.push(index);
            }
            counter = counter.next;
        }
        return !indexList.length ? null : indexList;
    }
    toString() {
        //if head node doesn't exist, return null
        if (!this.head) return "null";
        //head node does exist, loop through, adding more each loop, when node.next === null return the final node.value with counter.next value (null)
        let output = "";
        let counter = this.head;
        while (counter.next !== null) {
            output = `${output} ( ${counter.value} ) ->`;
            counter = counter.next;
        }
        return `${output} ( ${counter.value} ) -> ${counter.next}`;
    }
    insertAt(value, index) {
        //if head doesn't exist or index value === 0, run preAppend to put it at the front
        if (index === 0 || !this.head) return this.preAppend(value);
        // get node one index before index
        let currentNode = this.at(index - 1);
        //if node doesn't exist (index to high), run append, to put new node on end
        if (currentNode === null) return this.append(value);
        // if node does exist, temp save next node
        let nextNode = currentNode.next;
        //change currentNode.next to a new node with value and the saved nextNode
        currentNode.next = new Node(value, nextNode);
    }
    removeAt(index) {
        // if index is larger or === to size (not index) return message
        if (index >= this.size()) return console.log("No such index");
        // assign index at/before (can be same node if index = 0)
        let nodeBeforeIndex = this.at(index - 1);
        let nodeAtIndex = this.at(index);
        // if index doesn't === 0, assign NodeBeforeNode.next with nodeAtIndex.next (skipping node at index)
        if (index !== 0) return (nodeBeforeIndex.next = nodeAtIndex.next);
        // if there is only one node, change value to null
        if (nodeAtIndex.next === null) return (nodeAtIndex.value = null);
        // if node at index 0 assign node at index 1 to head node
        this.head = this.at(index + 1);
        return this.head;
    }
}

class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}
// Create new list class
let list = new LinkedList();

list.append(3);                 // 3 to end   (3)
list.append(5);                 // 5 to end   (3,5)
list.append(2);                 // 2 to end   (3,5,2)
list.append(5);                 // 5 to end   (3,5,2,5)
list.append(7);                 // 7 to end   (3,5,2,5,7)
list.preAppend(4);              // 4 to start (4,3,5,2,5,7)
list.preAppend(9);              // 9 to start (9,4,3,5,2,5,7)
console.log(list.size());       // 7
console.log(list.getHead());    // Node {value: 9, next: Node}
console.log(list.getTail());    // Node {value: 7, next: null}
console.log(list.at(3));        // Node {value: 5, next: Node}
console.log(list.at(7));        // null
list.pop();                     //            (9,4,3,5,2,5)
console.log(list.contains(5));  // true
console.log(list.contains(7));  // false
console.log(list.find(4));      // [2]
console.log(list.find(5));      // (2) [4, 6]
console.log(list.find(7));      // null
console.log(list.toString());   // ( 9 ) -> ( 4 ) -> ( 3 ) -> ( 5 ) -> ( 2 ) -> ( 5 ) -> null
list.insertAt(1, 3);            //            (9,4,3,1,5,2,5)
console.log(list.toString());   //  ( 9 ) -> ( 4 ) -> ( 3 ) -> ( 1 ) -> ( 5 ) -> ( 2 ) -> ( 5 ) -> null
list.removeAt(0);               //            (4,3,1,5,2,5)
console.log(list.toString());   // ( 4 ) -> ( 3 ) -> ( 1 ) -> ( 5 ) -> ( 2 ) -> ( 5 ) -> null
