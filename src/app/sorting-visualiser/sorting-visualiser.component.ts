import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting-visualiser',
  templateUrl: './sorting-visualiser.component.html',
  styleUrls: ['./sorting-visualiser.component.css']
})
export class SortingVisualiserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createRandomArray(20);
  }

  arr:number[]=[5,2,1,3,4,1];
  isChecking:number[]=[];   //checking these
  isSwapping:number[]=[];   //swapping these
  isDone:number[]=[];     //in final position
  arrfixed:number[]=[...this.arr];

  dur:number=250;         //duration
  max_val:number=-1;

  //temp
  part:number=-1;


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
  }

  reset2()
  {
    this.isChecking=[];
    this.isSwapping=[];
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
    this.arrfixed=[...this.arr];
    this.max_val = Math.max(...this.arr);
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
          await new Promise(resolve => setTimeout(resolve, this.dur));
          if(this.arr[j]>this.arr[j+1])
          {
            this.isSwapping.push(j);
            this.isSwapping.push(j+1);
            [this.arr[j],this.arr[j+1]]=[this.arr[j+1],this.arr[j]];
            await new Promise(resolve => setTimeout(resolve, this.dur));
            this.isSwapping=[];
          }
        }
        this.isDone.push(this.arr.length-i-1);
      }
    }

    async partition(lo:number,hi:number)
    {
      let ind:number=Math.floor(Math.random()*(hi+1-lo)+lo);
      
      this.isSwapping=[];
      this.isSwapping.push(ind);
      this.isSwapping.push(hi);
      [this.arr[ind],this.arr[hi]]=[this.arr[hi],this.arr[ind]];
      await new Promise(resolve => setTimeout(resolve, this.dur));
      this.isSwapping=[];

      let i:number=lo;
      for(let j=lo;j<hi;j++)
      {
        this.isChecking=[];
        this.isChecking.push(j);
        this.isChecking.push(hi);
        await new Promise(resolve => setTimeout(resolve, this.dur));
        if(this.arr[j]<=this.arr[hi])
        {
          this.isSwapping=[];
          this.isSwapping.push(j);
          this.isSwapping.push(i);
          [this.arr[i],this.arr[j]]=[this.arr[j],this.arr[i]];
          i++;
          await new Promise(resolve => setTimeout(resolve, this.dur));
          this.isSwapping=[];
        }
      }
      this.isSwapping=[];
      this.isSwapping.push(i);
      this.isSwapping.push(hi);
      [this.arr[i],this.arr[hi]]=[this.arr[hi],this.arr[i]];
      await new Promise(resolve => setTimeout(resolve, this.dur));
      this.part=i;
      this.reset2();
    }

    async quicksort(lo:number,hi:number)
    {
      if(lo===hi)
      {
        this.isDone.push(this.part);
        return;
      }
      if(lo<hi)
      {
        //this.partition(lo,hi);
        await new Promise(resolve => {setTimeout(() => {resolve(this.partition(lo,hi));}, 0);});

        this.isDone.push(this.part);

        await new Promise(resolve => {setTimeout(() => {resolve(this.quicksort(lo,this.part-1));}, 0);});
        
        for(let i=lo;i<=this.part+1;i++)
          this.isDone.push(i);

        await new Promise(resolve => {setTimeout(() => {resolve(this.quicksort(this.part+1,hi));}, 0);});

        for(let i=this.part+1;i<=hi;i++)
          this.isDone.push(i);
      }
    }

    async quicks()
    {
      this.reset();
      this.quicksort(0,this.arr.length-1);
    }
    
    async insertionsort(){
      this.reset();
      for(let i=1;i<this.arr.length;i++)
      {
        for(let j=i-1;j>=0;j--)
        {
          this.isChecking=[];
          this.isChecking.push(j+1);
          this.isChecking.push(j);
          await new Promise(resolve => setTimeout(resolve, this.dur));
          if(this.arr[j]>this.arr[j+1])
          {
            this.isChecking=[];
            this.isSwapping=[];
            this.isSwapping.push(j);
            this.isSwapping.push(j+1);
            [this.arr[j],this.arr[j+1]]=[this.arr[j+1],this.arr[j]];
            await new Promise(resolve => setTimeout(resolve, this.dur));
            this.isChecking=[];
            this.isSwapping=[];
          }
          else{
            break;
          }
        }
      }
      for(let i=0;i<this.arr.length;i++)
        this.isDone.push(i);
    }

  //


  //fun2
  
  //

}
