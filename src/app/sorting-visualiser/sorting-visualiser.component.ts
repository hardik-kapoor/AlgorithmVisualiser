import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting-visualiser',
  templateUrl: './sorting-visualiser.component.html',
  styleUrls: ['./sorting-visualiser.component.css']
})
export class SortingVisualiserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  arr:number[]=[5,2,1,3,4];
  isChecking:number[]=[];   //checking these
  isSwapping:number[]=[];   //swapping these
  isDone:number[]=[];     //in final position
  isPart:number[]=[];     //is partition one
  arrfixed:number[]=[...this.arr];



  //didnt make extra js files.

  resetarray()
  {
    this.arr=[...this.arrfixed];
    this.reset();
  }


  reset()
  {
    this.isChecking=[];
    this.isSwapping=[];
    this.isDone=[]; 
    this.isPart=[];
  }

  shuffleArray()
  {
    let currind=this.arr.length;
    while(currind!==0)
    {
      let randind=Math.floor(Math.random()*currind);
      if(currind===randind)
        randind--;
      currind--;
      [this.arr[currind],this.arr[randind]]=[this.arr[randind],this.arr[currind]];
    }
  }

  createRandomArray(len:number){
    this.arr=[];
    for(let i=0;i<len;i++)
    {
      this.arr.push(i+1);
    }
    this.shuffleArray();
  }

  currentColor(ind:number)
  {
    if(this.isDone.includes(ind))
      return {"border-left": '10px solid #ADD8E6'};
    else if(this.isSwapping.includes(ind))
      return {"border-left": '10px solid #FF4500'};
    else if(this.isChecking.includes(ind))
      return {"border-left": '10px solid #7CFC00'};
    else
      return {"border-left": '10px solid #2F4F4F'};
  }

  //fun1
    async bubbleSort(){
      this.reset();
      for(let i=0;i<this.arr.length;i++)
      {
        for(let j=0;j<this.arr.length-1-i;j++)
        {
          this.isChecking=[];
          this.isChecking.push(j);
          this.isChecking.push(j+1);
          await new Promise(resolve => setTimeout(resolve, 250));
          if(this.arr[j]>this.arr[j+1])
          {
            this.isSwapping.push(j);
            this.isSwapping.push(j+1);
            [this.arr[j],this.arr[j+1]]=[this.arr[j+1],this.arr[j]];
            await new Promise(resolve => setTimeout(resolve, 250));
            this.isSwapping=[];
          }
        }
        this.isDone.push(this.arr.length-i-1);
      }
    }
    
    async partition(lo:number,hi:number)
    {
      let ind:number=Math.random()*(hi+1-lo)+lo;
      this.isSwapping=[];
      this.isChecking.push()
      let i=(lo-1);

      for()
      return ind;
    }

    async quicksort(lo:number,hi:number)
    {
      if(lo<hi)
      {
        let part=this.partition(lo,hi).resolve(ind);
        
        this.quicksort(lo,part-1);
        this.quicksort(part+1,hi);
      }
    }
  //

  //fun2
  
  //

}
