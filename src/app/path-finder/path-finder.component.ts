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

  async makeWalls()
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
        this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
        this.arr[r][c]=1;
      }
    }.bind(this))

    document.body.onmouseup=()=>{
      this.isDrawing=false;
    } 
  }

}
