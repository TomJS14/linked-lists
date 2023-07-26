/** @format */

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null; // reference to the next node in the list
  }
}

class LinkedList {
  constructor() {
    this.head = null; //ref the first node in the list
    this.length = 0; //keep track of the number of elements in the list
  }
  /* methods in the class go here*/

  //Add a new node to the end of the list
  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.nextNode) {
        current = current.nextNode;
      }
      current.nextNode = newNode;
    }
    this.length++;
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.nextNode = this.head;
    this.head = newNode;
    this.length++;
  }

  size() {
    return this.length;
  }

  //Get the first node
  listHead() {
    return this.head.value;
  }

  //get the final element
  tail() {
    let current = this.head;
    while (current.nextNode) {
      current = current.nextNode;
    }
    return current;
  }

  //return the node at the given index [0 indexed]
  at(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Invalid index");
    }
    let current = this.head;
    let currentIndex = 0;
    while (currentIndex < index) {
      current = current.nextNode;
      currentIndex++;
    }
    return current;
  }

  //Remove the last node from the list
  pop() {
    if (!this.head) {
      return null; //empty list, return
    }
    if (!this.head.nextNode) {
      //If this is the only node in the list
      this.head = null;
      this.length--;
      return;
    }
    let current = this.head;
    let previous = null;
    while (current.nextNode) {
      //while there is a next node...
      previous = current; //the previous element gets saved here
      current = current.nextNode; //update current element to the next one
    }
    previous.nextNode = null;
    this.length--;
  }

  //Check if list contains the given value
  contains(n) {
    let current = this.head;
    while (current.nextNode) {
      current = current.nextNode;
      if (current.value == n) {
        return true;
      }
    }
    return false;
  }

  //Find and return a given value if it exists
  find(n) {
    let current = this.head;
    let currentIndex = 0;

    if (current.value == n) {
      //if it's the 1st element in list, return it
      return current;
    }

    while (current.nextNode) {
      //otherwise, check the rest of the list
      current = current.nextNode;
      currentIndex++;
      if (current.value == n) {
        return current;
      }
    }
    return `${n} not found`;
  }

  //Return the list as a string in format ( value ) -> ( value ) -> ... null
  toString() {
    if (!this.head) {
      return "List is empty";
    }

    let string = "";
    let current = this.head;

    while (current) {
      string += ` ( ${current.value} ) `;
      if (current.nextNode) {
        string += " -> ";
      } else {
        string += "-> null";
      }
      current = current.nextNode;
    }
    return string;
  }

  //Insert given value at given index and update list
  insertAt(n, index) {
    let current = this.head;
    let previous = null;
    let currentIndex = 0;
    const newNode = new Node(n);

    if (index < 0 || index > this.length) {
      throw new Error("Invalid index");
    }

    if (index === 0) {
      //if this is the 1st in the list
      newNode.nextNode = this.head; //the existing element becomes the next node for the new node
      this.head = newNode; //the new element becomes the first node
    } else {
      while (currentIndex < index) {
        previous = current; //save the current node as previous as we move to the next
        current = current.nextNode; //set the next node as the current
        currentIndex++; //increment the index count
      }
      //Once the specified index has been reached
      newNode.nextNode = current; //set the nextNode of the new inserted element to this node
      previous.nextNode = newNode; //set the next node pointer of the previous element to this new inserted element
    }
    this.length++;
  }

  //remove node at given index and update list
  removeAt(index) {
    let current = this.head;
    let previous = null;
    let after = null;
    let currentIndex = 0;

    if (index < 0 || index > this.length) {
      throw new Error("Invalid index");
    }

    if (!this.head.nextNode) {
      //if only element in list, remove
      this.head = null;
      this.length--;
      return;
    }

    if (index === 0) {
      //if index is 0
      this.head = current.nextNode;
      this.length--;
    } else {
      while (currentIndex < index) {
        previous = current;
        current = current.nextNode;
        currentIndex++;
      }
      current = current.nextNode;
      previous.nextNode = current;
      this.length--;
    }
  }
}

/* USAGE */

const myLinkedList = new LinkedList(); //Initialise a new list
myLinkedList.append(40); //40
myLinkedList.append(50); //40 -> 50
myLinkedList.append(60); //40 -> 50 -> 60
myLinkedList.append(80); //40 -> 50 -> 60 -> 80
myLinkedList.append(90); //40 -> 50 -> 60 -> 80 -> 90

myLinkedList.toString(); //( 40 ) -> ( 50 ) -> ( 60 ) -> ( 80 ) -> ( 90 )
myLinkedList.insertAt(987, 4); //40 -> 50 -> 60 -> 80 -> 987 -> 90
myLinkedList.removeAt(2); //40 -> 50 -> 80 -> 987 -> 90
myLinkedList.prepend(4); //4 -> 40 -> 50 -> 80 -> 987 -> 90
myLinkedList.size(); // 6
myLinkedList.listHead(); // 4
myLinkedList.tail(); // {value: 90, nextNode: null}
myLinkedList.at(3); // {value: 80, nextNode: {...987}}
myLinkedList.pop(); // 4 -> 40 -> 50 -> 80 -> 987
myLinkedList.contains(40); // true
myLinkedList.find(30); // "Not found"
myLinkedList.insertAt(100, 3); // 4 -> 40 -> 50 ->  100 -> 80 -> 987;
myLinkedList.removeAt(3); // 4 -> 40 -> 50 -> 80 -> 987;
