const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
        this.parentNodes = [];
        this.count = 0;
	}

	push(data, priority) {
		let newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
		return this;
	}

	pop() {
        if (this.parentNodes.length != 0) {
            let detachedRoot = this.detachRoot();
            this.restoreRootFromLastInsertedNode(detachedRoot);
            this.shiftNodeDown(this.root);
            return detachedRoot.data;
        }
        return {};
	}

	detachRoot() {
        let detachedRoot = this.root;
        if (this.parentNodes[0] == detachedRoot) this.parentNodes.shift();
        this.root = null;
        this.count--;
        return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
        if (this.parentNodes.length != 0) {
            this.root = this.parentNodes.pop();

            let oldParent = this.root.parent;


            // if (this.root.parent != detached) {
            //     this.parentNodes.unshift(this.root);
            // }
            //
            if (this.parentNodes.indexOf(oldParent) == -1 && oldParent != detached) {
                this.parentNodes.unshift(oldParent);
            }

            this.root.remove();

            if (detached.left) this.root.appendChild(detached.left);
            if (detached.right) this.root.appendChild(detached.right);
            if(!this.root.right) this.parentNodes.unshift(this.root);
        }
	}

	size() {
		return this.count;
	}

	isEmpty() {
		return this.size() == 0;
	}

	clear() {
        this.root = null;
        this.parentNodes = [];
        this.count = 0;
	}

	insertNode(node) {
		if (this.isEmpty()) {
		    this.root = node;
        } else {
		    this.parentNodes[0].appendChild(node);
            if (this.parentNodes[0].right) this.parentNodes.shift();
        }
        this.parentNodes.push(node);
		this.count ++;
	}

	shiftNodeUp(node) {
        if (!node.parent) {
		    this.root = node;
        } else if (node.priority > node.parent.priority) {
		    let from = this.parentNodes.indexOf(node),
                to = this.parentNodes.indexOf(node.parent);

		    this.parentNodes[from] = node.parent;
            this.parentNodes[to] = node;

		    node.swapWithParent();
		    this.shiftNodeUp(node);
        }
	}

	shiftNodeDown(node) {
	    if (node) {
	        let biggestNode = node;
            if (node.left && node.left.priority > biggestNode.priority) {
                biggestNode = node.left;
            }

            if (node.right && node.right.priority > biggestNode.priority) {
                biggestNode = node.right;
            }

            if (biggestNode == node) return;

            this.shiftNodeUp(biggestNode);
            this.shiftNodeDown(node);
        }
	}
}

module.exports = MaxHeap;
