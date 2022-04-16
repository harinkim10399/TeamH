import {tree, node} from '../Path Finding/Tree_Struct/treeAll.js';
//import node from '../Path Finding/Tree_Struct/treeAll.js';
class RRT {

    constructor (start, goal, step_size, collision_resolution, goal_resolution, goal_biasing, obstacles, environment_boundaries) {
        this.start = start;
        this.goal = goal;
        this.step_size = step_size;
        //what do these 2 do
        this.collision_resolution = collision_resolution;
        this.goal_resolution = goal_resolution;

        this.goal_biasing = goal_biasing;
        //what does this do
        this.obstacles = obstacles;

        this.environment_boundaries = environment_boundaries;
        this.T = new tree();
        this.root = new node(start[0], start[1], null);
    }


    distance(p, q) {
        return Math.sqrt( Math.pow(p[0]-q[0], 2) + Math.pow(p[1]-q[1], 2) );
    }
    
    findNearest(p, T) {
        //this was originally just 
        //min_dist = 0;

        let min_dist = 0;
        //n is undefined here vvv
        let n = T.nodes[0];
        //so T.nodes.length is 0
        for ( let i = 0; i < T.nodes.length; i++ ) {
            let d = distance(p, T.nodes[i]);
            
            if ( min_dist > d || min_dist == 0 ) {
                min_dist = d;
                
                n.push(T.nodes[i]);
                
            }
        }
        //n is returning undefined
       
        return n;
        
    }

    step(p, T, step) {
        //n is undifined
        let n = this.findNearest(p, T);
        let d = this.distance(p, T);
        let direction = [(p[0] - n.x)/d + step, (p[1] - n.y)/d] + step;

        let new_n = new node(n.getX() + direction[0], n.getY() + direction[1], n);
        return new_n;

    }

    sampleRandom() {
        return [Math.random() * this.environment_boundaries[0], Math.random() * this.environment_boundaries[1]];
    }

    extractPath( node ) {
        let current_n = node;
        let path = [goal];

        while ( current_n != null ) {
            path.push(current_n);
            current_n = current_n.incomingEdge();
        }
    }

    // first step in algorithm process
    // selects random point, creates and returns node for collision evalution

    randomCheck () {

        let sample;
        let range = Math.random();
        if ( range < this.goal_biasing ) {
            sample = [this.goal.getX(), this.goal.getY()];
        } else {
            sample = this.sampleRandom();
        }
        //had to make this vvvv this.step to run
        let new_node = this.step(sample, this.T, this.step_size);

        return new_node;

    }

    // second steps if there is collision
    // severes node and is collected by garbage collection
    // returns basic string

    collide (n) {
        n.prev = null;
        return "again";
    }

    // second step if there is no collision
    // pass node from randomCheck
    // will return string if not finished and array of nodes [end -> start] if finished
    move(n) {
        
        this.T.insert(n);
        let left = [n.getX(), n.getY()];
        let right = [this.goal.getX(), this.goal.getY()];
        let compare = this.distance(left, right);
                    
        if ( compare[0] < this.goal_biasing && compare[1] < this.goal_biasing ) {
            return extractPath(T, new_node);
        }

        return "again";

    }



}
export default RRT;