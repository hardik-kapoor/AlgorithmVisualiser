import { Component, OnInit } from '@angular/core';
import {faPlayCircle , faUndo , faRandom , faTachometerAlt , faSitemap , faSearch} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-searching-visualiser',
  templateUrl: './searching-visualiser.component.html',
  styleUrls: ['./searching-visualiser.component.css']
})
export class SearchingVisualiserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createRandomArray();
  }

    //Icons start here
    _start=faPlayCircle;
    _reset=faUndo;
    _shuffle=faRandom;
    _anim=faTachometerAlt;
    _chosen=faSitemap;
    _search=faSearch;

    //Icons end here

  arr:number[]=[];          //array
  max_val:number=-1;        //maximum val
  dur:number=500;             //duration
  isFound:number[]=[];      //is found
  isChecking:number[]=[];   //is checking
  isChecked:number[]=[];    //is checked
  num:number=-1;    //number to be found
  size:number = 20;
  arrHash:number[]=[];
  whichSort:string="Linear Search";

  whichOne(){
    if(this.whichSort==="Linear Search")
      this.linearSearch();
    else if(this.whichSort==="Exponential Search")
      this.exponentialSearch();
    else if(this.whichSort==="Binary Search")
      this.binarySearch(0,this.arr.length-1);
    else
      this.jumpSearch();
  }

  change(whichNow:string)
  {
    this.reset();
    this.whichSort=whichNow;
    if(this.whichSort!=="Linear Search")
    {
      this.arr.sort((a,b)=>{return a-b});
    }
    else
      this.arr=[...this.arrHash];
  }

  reset()
  {
    this.isFound=[];
    this.isChecked=[];
    this.isChecking=[];
  }

  setSpeed(event)
  {
    this.dur = 605 - event.value;
  }

  setSize(event)
  {
    this.size = event.value;
    this.createRandomArray();
  }

  currentColor(ind:number)
  {
    if(this.isFound.includes(ind))
      return {"background-color": '#ADD8E6', "width": String(Math.min(33,(650/this.arr.length)))+"px" , "color": '#343a40'};
    else if(this.isChecking.includes(ind))
      return {"background-color":'#76ba1b' , "width": String(Math.min(33,(650/this.arr.length)))+"px", "color": 'white'};
    else if(this.isChecked.includes(ind))
      return {"background-color":'#dc3545' , "width": String(Math.min(33,(650/this.arr.length)))+"px" , "color": 'white'};
    else
      return {"background-color": 'rgb(255,255,255,0.7)' , "width": String(Math.min(33,(650/this.arr.length)))+"px" , "color": 'black'};
  }

  createRandomArray()
  {
    this.reset();
    this.arr=[];
    let mnval=25,mxval=500;
    for(let i=0;i<this.size;i++)
    {
      this.arr.push(Math.floor(Math.random()*(mxval-mnval+1)+mnval));
    }
    this.num=Math.floor(Math.random()*(this.arr.length-1));
    this.num=this.arr[this.num];
    this.arrHash=[...this.arr];
    if(this.whichSort!=="Linear Search")
      this.arr.sort((a,b)=>{return a-b});
    this.max_val = Math.max(...this.arr);
  }

  //fun1
    async linearSearch()
    {
      this.reset();
      for(let i=0;i<this.arr.length;i++)
      {
        this.isChecking.push(i);
        await new Promise(resolve => setTimeout(resolve, this.dur));
        if(this.arr[i]===this.num)
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

    async jumpSearch()
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
        if(this.arr[i]>=this.num)
        {
          mx=i;
          break;
        }
      }
      for(let i=mx;i>=Math.max(mx-jump,0);i--)
      {
        this.isChecking=[];
        this.isChecking.push(i);
        await new Promise(resolve => setTimeout(resolve, this.dur));
        this.isChecked.push(i);
        await new Promise(resolve => setTimeout(resolve, this.dur));
        if(this.arr[i]===this.num)
        {
          this.isFound.push(i);
          await new Promise(resolve => setTimeout(resolve, this.dur));
          break;
        }
      }
    }

  //


  //fun2
    async binarySearch(lo:number, hi:number)
    {
      let mid:number=Math.floor((lo+hi)/2);
      this.isChecking=[];
      this.isChecking.push(mid);
      await new Promise(resolve => setTimeout(resolve, this.dur));
      if(this.arr[mid]==this.num)
      {
        this.isChecking=[];
        this.isFound.push(mid);
        await new Promise(resolve => setTimeout(resolve, this.dur));
      }
      else if(this.arr[mid]>this.num)
      {
        this.isChecking=[];
        this.isChecked.push(mid);
        await new Promise(resolve => {setTimeout(() => {resolve(this.binarySearch(lo,mid-1));}, );});
      }
      else
      {
        this.isChecking=[];
        this.isChecked.push(mid);
        await new Promise(resolve => {setTimeout(() => {resolve(this.binarySearch(mid+1,hi));}, );});
      }
    }

    async exponentialSearch()
    {
      this.isChecking=[];
      this.isChecked=[];
      this.isChecking.push(0);
      await new Promise(resolve => setTimeout(resolve, this.dur));
      if(this.arr[0]==this.num)
      {
        this.isChecking=[];
        this.isFound.push(0);
        await new Promise(resolve => setTimeout(resolve, this.dur));
      }
      else
      {
        this.isChecking=[];
        this.isChecked.push(0);
        await new Promise(resolve => setTimeout(resolve, this.dur));
        let i:number=1;
        while(i<this.arr.length&&this.arr[i]<=this.num)
        {

          this.isChecking=[];
          this.isChecking.push(i);
          await new Promise(resolve => setTimeout(resolve, this.dur));
          this.isChecking=[];
          this.isChecked.push(i);
          i=i*2;
          await new Promise(resolve => setTimeout(resolve, this.dur));
        }
        let lo:number=Math.floor(i/2);
        let hi:number=Math.min(i,this.arr.length-1);
        this.isChecked.push(hi);
        await new Promise(resolve => setTimeout(resolve, this.dur));
        this.isChecking=[];
        await new Promise(resolve => {setTimeout(() => {resolve(this.binarySearch(lo,hi));}, );});

      }
    }


  //
}
