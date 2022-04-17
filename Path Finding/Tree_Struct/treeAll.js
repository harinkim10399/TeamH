class tree  {

    constructor (root) {
        this.root = root;
        this.nodes = [];
        //added
        this.nodes.push(root);
    }

    insert ( node ) {    
        //changed    
        //nodes.push(node);
        this.nodes.push(node);
    }

}

class node {

    constructor (x, y, prev) {
        this.prev = prev;
        this.x = x;
        this.y = y;
    }

    incomingEdge() {
        return this.prev;
    }

    getX() {
        return this.x;
    }

    getY () {
        return this.y;
    }


}

export {tree, node} 

