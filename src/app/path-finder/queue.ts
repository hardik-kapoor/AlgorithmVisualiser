export class Queue{
    queue=[];

    isempty(){
        if(this.queue.length===0)
            return true;
        else
            return false;
    }
    front(){
        return this.queue[0];
    }
    push(elem:number[]){
        this.queue.push(elem);
    }
    pop(){
        this.queue.shift();
    }
    size(){
        return this.queue.length;
    }
}  