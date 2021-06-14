import { Component, OnInit, ViewChild } from '@angular/core';

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
    
  }  

  randomGrid()
  {
    this.ctxGrid.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let i=0;i<this.canvas.width;i+=this.sz1)
    {
      for(let j=0;j<this.canvas.height;j+=this.sz1)
      {
        this.ctxGrid.strokeRect(i,j,this.sz1,this.sz1);
        let x=Math.random();
        if(x<0.3)
          this.ctxGrid.fillRect(i+1,j+1,this.sz1-2,this.sz1-2);
      }
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
          this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
          this.arr[r][c]=1;
        }
      }
    }.bind(this))

    document.body.onmouseup=()=>{
      this.isDrawing=false;
    } 
  }

}
