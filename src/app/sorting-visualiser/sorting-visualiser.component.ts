import { isGeneratedFile } from '@angular/compiler/src/aot/util';
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

  arr:number[]=[5,2,1,5,3,2,4,5,6,3,5,1];
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
    this.arrfixed=[...this.arr];
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

      //for()
      return ind;
    }

    async quicksort(lo:number,hi:number)
    {
      if(lo<hi)
      {
        //let part=this.partition(lo,hi).resolve(ind);
        
        //this.quicksort(lo,part-1);
       // this.quicksort(part+1,hi);
      }
    }
  //

  
  //fun2
  async mergesort(lo:number, hi:number)
  {
    console.log(lo,hi);
    
    if(lo===hi)
      return ;
    let mid:number=Math.floor((lo+hi)/2);
    await new Promise(resolve => {setTimeout(() => {resolve(this.mergesort(lo,mid));}, 100);});
    await new Promise(resolve => {setTimeout(() => {resolve(this.mergesort(mid+1,hi ));}, 100);});

    let pt1=lo;
    let pt2=mid+1,cnt=0;
    this.isChecking=[];
    this.isSwapping=[];
    this.isDone=[];
    while(pt1<=mid && pt2<=hi)
    {
      
      this.isChecking=[];
      this.isSwapping=[];
      this.isChecking.push(pt1);
      this.isChecking.push(pt2);

      await new Promise(resolve => setTimeout(resolve, 1000));
      if(this.arr[pt1]<=this.arr[pt2])
      {
        this.isChecking=[];
        this.isSwapping=[];
        this.isSwapping.push(pt1);
        this.isChecking.push(pt2);    
        pt1++;
        await new Promise(resolve => setTimeout(resolve, 1000));
        if(lo==0&&hi==this.arr.length-1)
        {
          this.isDone.push(pt1-1);
          this.isSwapping=[];
          this.isChecking=[];
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      else
      {
        this.isChecking=[];
        this.isSwapping=[];
        this.isChecking.push(pt1);
        this.isSwapping.push(pt2);
        await new Promise(resolve => setTimeout(resolve, 1000));
        let id=pt2;
        let val=this.arr[pt2];
        while(id!=pt1)
        {
          this.arr[id]=this.arr[id-1];
          id--;
        }
      
        this.arr[id]=val;

        pt1++;
        pt2++;
        mid++;
        if(lo===0&&hi===this.arr.length-1)
        {
          this.isDone.push(pt1-1);
          this.isSwapping=[];
          this.isChecking=[];
          await new Promise(resolve => setTimeout(resolve, 1000));
        }        
      }
      this.isSwapping=[];
      this.isChecking=[];
      
      
    }
    if(lo===0&& this.arr.length-1===hi)
    {    
      let i:number=0;
      while(i<=this.arr.length-1)
      {
        if(!this.isDone.includes(i))
          this.isDone.push(i);
        i++;
      }
    }
  }

}
