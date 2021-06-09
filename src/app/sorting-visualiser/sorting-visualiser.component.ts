import { ThrowStmt } from '@angular/compiler';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import {faPlayCircle , faUndo , faRandom} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sorting-visualiser',
  templateUrl: './sorting-visualiser.component.html',
  styleUrls: ['./sorting-visualiser.component.css']
})
export class SortingVisualiserComponent implements OnInit {

  //Icons start here
  _start=faPlayCircle;
  _reset=faUndo;
  _shuffle=faRandom;

  //Icons end here
  constructor() { }

  ngOnInit(): void {
    this.createRandomArray(20);
  }

  arr:number[]=[5,2,1,3,4,1];
  isChecking:number[]=[];   //checking these
  isSwapping:number[]=[];   //swapping these
  isDone:number[]=[];     //in final position
  isChild:number[]=[];    //for better visualisation of heap sort
  arrfixed:number[]=[...this.arr];
  whichSort:string="";

  dur:number=250;         //duration
  max_val:number=-1;

  //temp
  part:number=-1;


  //didnt make extra js files.


  change(now:string){
    this.whichSort=now;
  }

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
    this.isChild=[];
  }

  reset2()
  {
    this.isChecking=[];
    this.isSwapping=[];
  }

  selectsort()
  {
    if(this.whichSort==="quicksort")
      this.quicksort();
    else if(this.whichSort==="mergesort")
      this.mergesort(0,this.arr.length-1);
    else if(this.whichSort==="insertionsort")
      this.insertionsort();
    else if(this.whichSort==="bubblesort")
      this.bubbleSort();
    else if(this.whichSort==="selectionsort")
      this.selectionsort();
    else if(this.whichSort==="heapsort")
      this.heapsort();
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
    this.reset();
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
    else if(this.isChild.includes(ind))
      return {"border-left": '10px solid #B4933F'};
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

    async quicks(lo:number,hi:number)
    {
      if(lo===hi)
      {
        this.isDone.push(lo);
        return;
      }
      if(lo<hi)
      {
        //this.partition(lo,hi);
        await new Promise(resolve => {setTimeout(() => {resolve(this.partition(lo,hi));}, 0);});

        this.isDone.push(this.part);

        await new Promise(resolve => {setTimeout(() => {resolve(this.quicks(lo,this.part-1));}, 0);});
        

        await new Promise(resolve => {setTimeout(() => {resolve(this.quicks(this.part+1,hi));}, 0);});

      }
    }

    async quicksort()
    {
      this.reset();
      this.quicks(0,this.arr.length-1);
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

    async selectionsort()
    {
      this.reset();
      for(let i=0;i<this.arr.length-1;i++)
      {
        let mn=this.arr[i],ind=i;
        for(let j=i+1;j<this.arr.length;j++)
        {
          this.isChecking=[];
          this.isChecking.push(ind);
          this.isChecking.push(j);
          this.isSwapping=[];
          this.isSwapping.push(ind);
          await new Promise(resolve => setTimeout(resolve, this.dur));
          if(this.arr[j]<mn)
          {
            this.isChecking=[];
            mn=this.arr[j];
            ind=j;
          }
          this.isSwapping=[];
          this.isSwapping.push(ind);
          await new Promise(resolve => setTimeout(resolve, this.dur));
        }
        this.isSwapping=[];
        this.isChild=[];
        this.isChecking=[];
        this.isChild.push(i);
        this.isChild.push(ind);
        await new Promise(resolve => setTimeout(resolve, this.dur));
        [this.arr[i],this.arr[ind]]=[this.arr[ind],this.arr[i]];
        this.isDone.push(i);
        this.isChild=[];
        await new Promise(resolve => setTimeout(resolve, this.dur));
        this.reset2();
      }
      this.isDone.push(this.arr.length-1);
    }
  //


  //fun2
  async mergesort(lo:number, hi:number)
  {
    console.log(lo,hi);
    
    if(lo===hi)
      return ;
    let mid:number=Math.floor((lo+hi)/2);
    await new Promise(resolve => {setTimeout(() => {resolve(this.mergesort(lo,mid));}, 0);});
    await new Promise(resolve => {setTimeout(() => {resolve(this.mergesort(mid+1,hi ));}, 0);});

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

      await new Promise(resolve => setTimeout(resolve, this.dur));
      if(this.arr[pt1]<=this.arr[pt2])
      {
        this.isChecking=[];
        this.isSwapping=[];
        this.isSwapping.push(pt1);
        this.isChecking.push(pt2);    
        pt1++;
        await new Promise(resolve => setTimeout(resolve, this.dur));
        if(lo==0&&hi==this.arr.length-1)
        {
          this.isDone.push(pt1-1);
          this.isSwapping=[];
          this.isChecking=[];
          await new Promise(resolve => setTimeout(resolve, this.dur));
        }
      }
      else
      {
        this.isChecking=[];
        this.isSwapping=[];
        this.isChecking.push(pt1);
        this.isSwapping.push(pt2);
        await new Promise(resolve => setTimeout(resolve, this.dur));
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
          await new Promise(resolve => setTimeout(resolve, this.dur));
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

  async heapify(i:number, n:number)
  {
    this.isChecking=[];
    this.isSwapping=[];
    this.isChild=[];
    this.isChecking.push(i);
    let maxid=i;
    let lc=2*i+1;
    let rc=2*i+2;
    this.isChild.push(lc);
    this.isChild.push(rc);
    await new Promise(resolve => setTimeout(resolve, this.dur));
    if(lc<n && this.arr[lc]>this.arr[maxid])
      maxid=lc;
    if(rc<n && this.arr[rc]>this.arr[maxid])
      maxid=rc;
    if(maxid!=i)
    { 
      this.isChecking=[];
      this.isChild=[];
      this.isSwapping=[];
      this.isSwapping.push(i);
      this.isSwapping.push(maxid);
      await new Promise(resolve => setTimeout(resolve, this.dur));
      [this.arr[i],this.arr[maxid]]=[this.arr[maxid],this.arr[i]];
      await new Promise(resolve => {setTimeout(() => {resolve(this.heapify(maxid,n));}, );});
    }  
    this.isChecking=[];
  }


  async heapsort(){
    let n=this.arr.length;
    let i=(Math.floor(n/2))-1;
    while(i>=0)
    {
      await new Promise(resolve => {setTimeout(() => {resolve(this.heapify(i,n));}, );});
      i--;
    }
    this.isChecking=[];
    this.isChild=[];
    this.isSwapping=[];
    this.isDone=[];
    i =n-1;
    let tlen=n;
    while(i>0)
    {
      this.isSwapping=[];
      this.isSwapping.push(i);
      this.isSwapping.push(0);
      await new Promise(resolve => setTimeout(resolve, this.dur));
      this.isSwapping=[];
      [this.arr[i],this.arr[0]]=[this.arr[0],this.arr[i]];
      this.isDone.push(i);
      await new Promise(resolve => setTimeout(resolve, this.dur));
      i--;
      tlen--;
      await new Promise(resolve => {setTimeout(() => {resolve(this.heapify(0, tlen));}, );});
      
    }
    this.isDone.push(0);

  }


  //
}
