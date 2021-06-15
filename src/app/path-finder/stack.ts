export class Stack{
    stack=[];

    isempty(){
        if(this.stack.length===0)
            return true;
        else
            return false;
    }
    top(){
        return this.stack[this.stack.length-1];
    }
    push(elem:number[]){
        this.stack.push(elem);
    }
    pop(){
        this.stack.pop();
    }
}  