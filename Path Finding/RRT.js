import {tree, node} from "/Tree_Struct/treeAll.js";

class RRT {

    constructor (start, goal, step_size, collision_resolution, goal_resolution, goal_biasing, environment_boundaries) {
        // start -> starting coordinates of player
        this.start = start;
        // goal -> premade node on front end (this will change later to just using cartesian coordinats)
        this.goal = goal;
        // step_size -> size of step taken with each iteration of movement (straight number / integer)
        this.step_size = step_size;
        // collision_resultion -> may be removed later, for now just place 0
        this.collision_resolution = collision_resolution;
        // goal_resolution -> distance from the goal required to say the boal has been reached
        this.goal_resolution = goal_resolution;
        // goal_biasing -> number between 0-1 (double) that makes path add node towards the goal
        this.goal_biasing = goal_biasing;
        // environment_boundaries -> bounderies of the environment the algorithm uses to select
        // random point to return to the front end
        this.environment_boundaries = environment_boundaries;
        // Basic creation and initialization of new tree
        this.T = new tree(new node(start[0], start[1], null));
    }

    // uses pathagorian theorem to find distance
    // inputs:
    // p -> passed randomly generated point on canvas
    // n -> nearest found node to point
    distance(p, n) {
        return Math.sqrt( Math.pow(p[0]-n.getX(), 2) + Math.pow(p[1]-n.getY(), 2) );
    }
    
    // find nearest node to new node using distance calculations
    // inputs:
    // p -> passed randomly generated point on canvas
    // T -> tree the nodes are in
    findNearest(p, T) {
        min_dist = 0;
        let n = T.nodes[0];

        for ( let i = 0; i < T.nodes.length; i++ ) {
            let d = distance(p, T.nodes[i]);

            if ( min_dist > d || min_dist == 0 ) {
                min_dist = d;
                n.push(T.nodes[i]);
            }
        }

        return n;
    }

    // takes "step" towards randomly selected position
    // inputs:
    // p -> passed randomly generated point on canvas
    // T -> tree the nodes are in
    // step -> step_size given by constructor
    step(p, T, step) {
        let n = this.findNearest(p, T);
        let d = this.distance(p, n);
        let direction = [(p[0] - n.getX())/d + step, (p[1] - n.getY())/d] + step;

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

    // firs step in algorithm process
    // selects random point, creates and returns node for collision evalution

    randomCheck () {

        let sample;
        
        if ( Math.random() < this.goal_biasing ) {
            sample = [this.goal.getX(), this.goal.getY()];
        } else {
            sample = this.sampleRandom();
        }

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
        
        if ( this.distance(left, right) < this.goal_resolution ) {
            return extractPath(T, new_node);
        }

        return "again";

    }



}