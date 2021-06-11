import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-searching-visualiser',
  templateUrl: './searching-visualiser.component.html',
  styleUrls: ['./searching-visualiser.component.css']
})
export class SearchingVisualiserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  arr:number[]=[];
  max_val:number=-1;
  dur:number=0;
  size:number=this.arr.length;
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
      return {"background-color": '#ADD8E6', "width": String(Math.min(33,(650/this.size)))+"px" , "color": '#343a40'};
    else if(this.isChecking.includes(ind))
      return {"background-color":'#dc3545' , "width": String(Math.min(33,(650/this.size)))+"px" , "color": 'white'};
    else if(this.isChecked.includes(ind))
      return {"background-color":'#76ba1b' , "width": String(Math.min(33,(650/this.size)))+"px", "color": 'white'};
    else
      return {"background-color": '#343a40' , "width": String(Math.min(33,(650/this.size)))+"px" , "color": 'white'};
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
  }

  //fun1
    async linearSearch(num:number)
    {
      for(let i=0;i<this.arr.length;i++)
      {
      }
    }
  //
  

  //fun2
  //
}
