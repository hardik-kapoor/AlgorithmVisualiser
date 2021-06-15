import { Component, OnInit, ViewChild } from '@angular/core';
import { Queue } from './queue';
import {Stack} from './stack';

@Component({
  selector: 'app-path-finder',
  templateUrl: './path-finder.component.html',
  styleUrls: ['./path-finder.component.css']
})
export class PathFinderComponent implements OnInit {

  constructor() { }
  @ViewChild('canvas', { static: true })

  canvas;
  ctxGrid;
  sz1:number=20;
  isDrawing:boolean=false;
  arr;  
  src;
  des;
  walltype = 1;
  dx=[1,-1,0,0];
  dy=[0,0,1,-1];

  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
    this.ctxGrid = this.canvas.getContext('2d');
    this.ctxGrid.canvas.height = 500;
    this.ctxGrid.canvas.width = 1000;
    this.ctxGrid.strokeStyle = "#808588";
    this.arr=new Array(Math.floor(this.ctxGrid.canvas.height/this.sz1)+5).fill(new Array(Math.floor(this.ctxGrid.canvas.height/this.sz1)+5));
    for(let i=0;i<this.arr.length;i++)
      for(let j=0;j<this.arr[i].length;j++)
        this.arr[i][j]=0;
    this.resetGrid();
    this.src=[10,10];
    this.des=[20,30];
    this.ctxGrid.fillStyle='green';
    this.ctxGrid.fillRect(this.src[1]*20+1,this.src[0]*20+1,this.sz1-2,this.sz1-2);
    this.arr[this.src[0]][this.src[1]]=2;
    this.arr[this.des[0]][this.des[1]]=3;
    this.ctxGrid.fillStyle='red';
    this.ctxGrid.fillRect(this.des[1]*20+1,this.des[0]*20+1,this.sz1-2,this.sz1-2);
    this.ctxGrid.fillStyle='black';
    this.makeWalls();
    this.randomGrid();
  }

  resetGrid() 
  {
    this.ctxGrid.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let i=0;i<this.canvas.width;i+=this.sz1)
    {
      for(let j=0;j<this.canvas.height;j+=this.sz1)
      {
        this.ctxGrid.strokeRect(i,j,this.sz1,this.sz1);
      }
    }
    this.src=[10,10];
    this.des=[20,30];
    this.ctxGrid.fillStyle='green';
    this.ctxGrid.fillRect(this.src[1]*20+1,this.src[0]*20+1,this.sz1-2,this.sz1-2);
    this.arr[this.src[0]][this.src[1]]=2;
    this.arr[this.des[0]][this.des[1]]=3;
    this.ctxGrid.fillStyle='red';
    this.ctxGrid.fillRect(this.des[1]*20+1,this.des[0]*20+1,this.sz1-2,this.sz1-2);
    this.ctxGrid.fillStyle='black';
  }  

  randomGrid()
  {
    for(let i=0;i<this.canvas.width;i+=this.sz1)
    {
      for(let j=0;j<this.canvas.height;j+=this.sz1)
      {
        this.ctxGrid.strokeRect(i,j,this.sz1,this.sz1);
        let x=Math.random();
        if(x<0.3&&this.arr[j/20][i/20]!==2&&this.arr[j/20][i/20]!==3)
        {
          this.ctxGrid.fillRect(i+1,j+1,this.sz1-2,this.sz1-2);
          this.arr[j/20][i/20]=1;
        }
      }
    }    
  }

  drawWalls(ind:number[]){
    let cx=ind[1]/20,cy=ind[0]/20;
    if(this.arr[ind[0]][ind[1]]===0)
    {
      
      this.ctxGrid.fillStyle = 'white';
      this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
    }
    else if(this.arr[ind[0]][ind[1]]===1)
    {
      this.ctxGrid.fillStyle = 'black';
      this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
    }
    else if(this.arr[ind[0]][ind[1]]===2)
    {
      this.ctxGrid.fillStyle = 'blue';
      this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
    }
    else if(this.arr[ind[0]][ind[1]]===3)
    {
      this.ctxGrid.fillStyle = 'red';
      this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
    }
    else if(this.arr[ind[0]][ind[1]]===4)
    {
      this.ctxGrid.fillStyle = 'green';
      this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
    }
    else if(this.arr[ind[0]][ind[1]]===5)
    {
      this.ctxGrid.fillStyle = 'purple';
      this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
    }
  }

  makeWalls()
  {
    
    document.body.onmousedown=()=>{
      this.isDrawing=true;
    }
    this.canvas.addEventListener('mousemove', function (e) {
      if(this.isDrawing){
        const rect = this.canvas.getBoundingClientRect();
        let cx = e.clientX - rect.left;
        let cy = e.clientY - rect.top;

        cx=(Math.floor(cx/20))*20;
        cy=(Math.floor(cy/20))*20;
        let r=Math.floor(cy/20);
        let c=Math.floor(cx/20);
        if(!((r===this.src[0]&&c===this.src[1])||(r===this.des[0]&&c===this.des[1]))){
          if(this.walltype === 0){
            this.arr[r][c] = 0;
            this.ctxGrid.fillStyle = 'white';
            this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
          }
          else{
            this.ctxGrid.fillStyle = 'black';
            this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
            this.arr[r][c]=1;
            
          }
        }
      }
    }.bind(this))

    this.canvas.addEventListener('mouseup', function (e) {
      if(this.isDrawing){
        const rect = this.canvas.getBoundingClientRect();
        let cx = e.clientX - rect.left;
        let cy = e.clientY - rect.top;

        cx=(Math.floor(cx/20))*20;
        cy=(Math.floor(cy/20))*20;
        let r=Math.floor(cy/20);
        let c=Math.floor(cx/20);
        if(!((r===this.src[0]&&c===this.src[1])||(r===this.des[0]&&c===this.des[1]))){
          if(this.walltype===0){
            this.arr[r][c] = 0;
            this.ctxGrid.fillStyle = 'white';
            this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
            console.log('done');
          }
          else{
            this.ctxGrid.fillStyle = 'black';
            this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
            this.arr[r][c]=1;
            
          }
        }
      }
    }.bind(this))

    document.body.onmouseup=()=>{
      this.isDrawing=false;
    } 
  }

  //fun1
    async bfs(){
      let q=new Queue();
      q.push(this.src);
      let flag=false;
      let xs=this.ctxGrid.canvas.height/this.sz1,ys=this.ctxGrid.canvas.height/this.sz1;
      let pararr=new Array(Math.floor(xs))
                .fill(new Array(Math.floor(ys))
                .fill(new Array(2)));
      for(let i=0;i<xs;i++)
        for(let j=0;j<ys;j++)
          pararr[i][j]=[-1,-1];
      while(!(q.isempty()))
      {
        let now=q.front();
        q.pop();
        let i=now[1],j=now[0];
        for(let ind=0;ind<4;ind++)
        {
          let ni=i+this.dx[ind],nj=j+this.dy[ind];
          if(ni<0||ni>=xs||nj<0||nj>=ys||this.arr[nj][ni]===1)
            continue;
          if(pararr[nj][ni]!==[-1,-1])
            continue;
          pararr[nj][ni]=[j,i];
          q.push([nj,ni]);
          if(ni===this.des[0]&&nj===this.des[1])
          {
            flag=true;
            break;
          }
        }
        if(flag)
          break;
      }
    }
  //

  //fun2

  //

}
