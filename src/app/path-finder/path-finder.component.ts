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
  xs;
  ys;
  pararr;
  dur=10;
  isFound=false;
  walltype = 1;
  dx=[1,-1,0,0];
  dy=[0,0,1,-1];

  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
    this.ctxGrid = this.canvas.getContext('2d');
    this.ctxGrid.canvas.height = 500;
    this.ctxGrid.canvas.width = 1000;
    this.ctxGrid.strokeStyle = "#808588";
    this.xs=this.ctxGrid.canvas.width/this.sz1,this.ys=this.ctxGrid.canvas.height/this.sz1
    this.arr=[];
    for(let i=0;i<this.ys;i++){
      let temp=[];
      for(let j=0;j<this.xs;j++){}
        temp.push(0);
      this.arr.push(temp);
    }
    this.resetGrid();
    this.src=[10,10];
    this.des=[20,30];
    this.arr[this.src[0]][this.src[1]]=2;
    this.drawWalls(this.src);
    this.arr[this.des[0]][this.des[1]]=3;
    this.drawWalls(this.des);
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
    this.arr[this.src[0]][this.src[1]]=2;
    this.drawWalls(this.src);
    this.arr[this.des[0]][this.des[1]]=3;
    this.drawWalls(this.des);
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
          this.arr[j/20][i/20]=1;
          this.drawWalls([j/20,i/20]);
        }
      }
    }    
  }

  drawWalls(ind:number[]){
    let cx=ind[1]*20,cy=ind[0]*20;
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
      this.ctxGrid.fillStyle = 'green';
      this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
    }
    else if(this.arr[ind[0]][ind[1]]===3)
    {
      this.ctxGrid.fillStyle = 'red';
      this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
    }
    else if(this.arr[ind[0]][ind[1]]===4)
    {
      this.ctxGrid.fillStyle = 'blue';
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
            this.drawWalls([r,c]);
          }
          else{
            this.arr[r][c]=1;
            this.drawWalls([r,c]);
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
            this.drawWalls([r,c]);
          }
          else{
            this.arr[r][c]=1;
            this.drawWalls([r,c]);
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
      let xs=this.xs,ys=this.ys;
      this.pararr=[];
      let vis=[];
      for(let i=0;i<ys;i++)
      {
        let temp=[];
        let temp2=[];
        for(let j=0;j<xs;j++){
          temp.push([-1,-1]);
          temp2.push(0);
        }
        this.pararr.push(temp);
        vis.push(temp2);
      }
      vis[10][10]=1;
      while(!(q.isempty()))
      {
        let now=q.front();
        q.pop();
        let i=now[0],j=now[1];
        for(let ind=0;ind<4;ind++)
        {
          let ni=i+this.dx[ind],nj=j+this.dy[ind];
          if(ni<0||ni>=ys||nj<0||nj>=xs||this.arr[ni][nj]===1)
            continue;
          if(vis[ni][nj]===1)
            continue;
          if(ni===this.des[0]&&nj===this.des[1])
          {
            this.pararr[ni][nj]=[i,j];
            vis[ni][nj]=1;
            this.isFound=true;
            break;
          }
          this.arr[ni][nj]=4;
          this.drawWalls([ni,nj]);
          await new Promise(resolve => setTimeout(resolve, this.dur));
          this.pararr[ni][nj]=[i,j];
          vis[ni][nj]=1;
          q.push([ni,nj]);
        }
        if(this.isFound)
          break;
      }
      let nowi=this.des[0],nowj=this.des[1];
      while(this.pararr[nowi][nowj]!==[10,10])
      {
        console.log(this.pararr[nowi][nowj]);
        let nowit=this.pararr[nowi][nowj][0];
        let nowjt=this.pararr[nowi][nowj][1];
        this.arr[nowit][nowjt]=5;
        this.drawWalls([nowit,nowjt]);
        await new Promise(resolve => setTimeout(resolve, this.dur));
        nowi=nowit;
        nowj=nowjt;
      }
    }
  //

  //fun2
    async dfs()
    {
      this.pararr=[];
      for(let i=0;i<this.ys;i++)
      {
        let temp=[];
        for(let j=0;j<this.xs;j++){
          temp.push([-1,-1]);
        }
        this.pararr.push(temp);
      }
      this.isFound=false;
      this.pararr[this.src[0]][this.src[1]]=[-2,-2];     
      await new Promise(resolve => {setTimeout(() => {resolve(this._dfs(this.src));}, );});
    }

    async _dfs(root:number[])
    {
    
      if(this.isFound===true)
        return;
      let x:number=root[0],y=root[1];
      console.log([x,y]);
      
      for(let ind=0; ind<4; ind++)
      {
        let tx=x+this.dx[ind], ty=y+this.dy[ind];
        console.log([tx,ty]);
        if(tx<0||tx>=this.ys||ty<0||ty>=this.xs||this.arr[tx][ty]===1)
          continue;
        if(this.pararr[tx][ty][0]!==-1&& this.pararr[tx][ty][1]!==-1)
          continue;
        this.arr[tx][ty]=4;
        this.drawWalls([tx,ty]);
        await new Promise(resolve => setTimeout(resolve, this.dur));
        this.pararr[tx][ty]=[x,y];
        if(this.des[0]===tx&& this.des[1]===ty)
        {
          this.isFound=true;
          console.log("Hello");
          return;
        }
        await new Promise(resolve => {setTimeout(() => {resolve(this._dfs([tx,ty]));}, );});
      }
    }
  //

}
