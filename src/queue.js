const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.maxSize == this.heap.size()) throw "Max size is reached!"
		this.heap.push(data, priority)
	}

	shift() {
		if (this.size() == 0) throw "Enpmty";
		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.size() == 0;
	}
}

module.exports = PriorityQueue;
