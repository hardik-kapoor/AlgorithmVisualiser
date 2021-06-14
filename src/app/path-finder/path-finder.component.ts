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


  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
    this.ctxGrid = this.canvas.getContext('2d');
    this.ctxGrid.canvas.height = 500;
    this.ctxGrid.canvas.width = 1000;
    this.ctxGrid.strokeStyle = "#808588";
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
          this.ctxGrid.fillRect(i+1,j+1,this.sz1-1,this.sz1-1);
      }
    }    
  }

  makeWalls()
  {
    this.canvas.addEventListener('mousedown', function (e) {
      const rect = this.canvas.getBoundingClientRect();

      let cx = e.clientX - rect.left;
      let cy = e.clientY - rect.top;
      
      this.ctxGrid.fillRect(cx,cy,this.sz1-1,this.sz1-1);
      console.log("Hello");
    }.bind(this))  
      
  }

}
