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

  arr:number[]=[5,3,2,1,4];
  isChecking:number[]=[];   //checking these
  isSwapping:number[]=[];   //swapping these
  isDone:number[]=[];     //in final position

  //didnt make extra js files.

  reset()
  {
    this.isChecking=[];
    this.isSwapping=[];
    this.isDone=[]; 
  }

  shuffleArray()
  {
    let currind=this.arr.length;
    while(0!==currind)
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
          await new Promise(resolve => setTimeout(resolve, 500));
          if(this.arr[j]>this.arr[j+1])
          {
            this.isSwapping.push(j);
            this.isSwapping.push(j+1);
            [this.arr[j],this.arr[j+1]]=[this.arr[j+1],this.arr[j]];
            await new Promise(resolve => setTimeout(resolve, 500));
            this.isSwapping=[];
          }
        }
        this.isDone.push(this.arr.length-i-1);
      }
    }

  //

  //fun2
  
  //

}
