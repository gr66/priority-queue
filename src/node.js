class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
        if (!this.left) {
            this.left = node;
            node.parent = this;
        } else if (!this.right) {
            this.right = node;
            node.parent = this;
        }
	}

	removeChild(node) {
        if (node == this.left) {
            this.left = node.left;
            node.left = null;
            node.parent = null;
        } else if (node == this.right) {
            this.right = node.right;
            node.right = null;
            node.parent = null;
        } else {
            throw "Is not a child of this node";
        }
	}

	remove() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
	}

	swapWithParent() {
	    if (!this.parent) return;
	    let newParent = this,
            oldParent = newParent.parent,
            newLeft = newParent.left,
	        newRight = newParent.right,
            mainParent = oldParent.parent;

        if (mainParent) {

            if (oldParent.parent.left == oldParent) {
                oldParent.parent.left = this;
            } else {
                oldParent.parent.right = this;
            }
        }
        this.parent = mainParent;

        if (oldParent.left == this) {
	        this.left = oldParent;
	        this.right = oldParent.right;

	        if (oldParent.right) oldParent.right.parent = this;
        } else {
            this.left = oldParent.left;
            this.right = oldParent;
            if (oldParent.left) oldParent.left.parent = this;
        }

        if (newLeft) newLeft.parent = oldParent;
        if (newRight) newRight.parent = oldParent;

        oldParent.left = newLeft;
        oldParent.right = newRight;
        oldParent.parent = this;
 	}
}

module.exports = Node;
