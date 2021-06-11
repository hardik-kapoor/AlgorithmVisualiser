import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-searching-visualiser',
  templateUrl: './searching-visualiser.component.html',
  styleUrls: ['./searching-visualiser.component.css']
})
export class SearchingVisualiserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createRandomArray(20,1);
  }

  arr:number[]=[];
  max_val:number=-1;
  dur:number=0;
  isFound:number[]=[];
  isChecking:number[]=[];
  isChecked:number[]=[];


  reset()
  {
    this.isFound=[];
    this.isChecked=[];
    this.isChecking=[];
  }

  currentColor(ind:number)
  {
    if(this.isFound.includes(ind))
      return {"background-color": '#ADD8E6', "width": String(Math.min(33,(650/this.arr.length)))+"px" , "color": '#343a40'};
    else if(this.isChecking.includes(ind))
      return {"background-color":'#dc3545' , "width": String(Math.min(33,(650/this.arr.length)))+"px" , "color": 'white'};
    else if(this.isChecked.includes(ind))
      return {"background-color":'#76ba1b' , "width": String(Math.min(33,(650/this.arr.length)))+"px", "color": 'white'};
    else
      return {"background-color": '#343a40' , "width": String(Math.min(33,(650/this.arr.length)))+"px" , "color": 'white'};
  }

  createRandomArray(length,isSortReq)
  {
    this.arr=[];
    let mnval=10,mxval=500;
    for(let i=0;i<length;i++)
    {
      this.arr.push(Math.floor(Math.random()*(mxval-mnval+1)+mnval));
    }
    if(isSortReq)
      this.arr.sort((a,b)=>{return a-b});
    
      this.max_val = Math.max(...this.arr);
  }

  //fun1
    async linearSearch(num:number)
    {
      this.reset();
      for(let i=0;i<this.arr.length;i++)
      {
        this.isChecking.push(i);
        await new Promise(resolve => setTimeout(resolve, this.dur));
        if(this.arr[i]===num)
        {
          this.isFound.push(i);
          await new Promise(resolve => setTimeout(resolve, this.dur));
          break;
        }
        this.isChecked.push(i);
        this.isChecking=[];
        await new Promise(resolve => setTimeout(resolve, this.dur));
      }
    }

    async jumpSearch(num:number)
    {
      this.reset();
      let jump=Math.floor(Math.sqrt(this.arr.length));
      let mx=this.arr.length-1;
      for(let i=0;i<this.arr.length;i+=jump)
      {
        this.isChecking=[];
        this.isChecking.push(i);
        await new Promise(resolve => setTimeout(resolve, this.dur));
        this.isChecking=[];
        this.isChecked.push(i);
        await new Promise(resolve => setTimeout(resolve, this.dur));
        if(this.arr[i]>=num)
        {
          mx=i;
          break;
        }
      }
      for(let i=mx;i>=Math.max(mx-jump,0);i--)
      {
        this.isChecked.push(i);
        await new Promise(resolve => setTimeout(resolve, this.dur));
        if(this.arr[i]===num)
        {
          this.isFound.push(i);
          await new Promise(resolve => setTimeout(resolve, this.dur));
          break;
        }
      }
    }

  //
  

  //fun2
    async binarySearch(lo:number, hi:number, num:number)
    {
      let mid:number=Math.floor((lo+hi)/2);
      this.isChecking=[];
      this.isChecking.push(mid);
      await new Promise(resolve => setTimeout(resolve, this.dur));
      if(this.arr[mid]==num)
      {
        this.isChecking=[];
        this.isFound.push(mid);
        await new Promise(resolve => setTimeout(resolve, this.dur));
      }
      else if(this.arr[mid]>num)
      {
        this.isChecking=[];
        this.isChecked.push(mid);
        await new Promise(resolve => {setTimeout(() => {resolve(this.binarySearch(lo,mid-1,num));}, );});
      }
      else
      {
        this.isChecking=[];
        this.isChecked.push(mid);
        await new Promise(resolve => {setTimeout(() => {resolve(this.binarySearch(mid+1,hi,num));}, );});
      }
    }



  //
}
