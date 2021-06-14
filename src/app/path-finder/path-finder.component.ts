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


  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
    this.ctxGrid = this.canvas.getContext('2d');

    this.resetGrid();
  }

  resetGrid() 
  {
    this.ctxGrid.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let sz1=20;
    for(let i=0;i<this.canvas.width;i+=sz1)
    {
      for(let j=0;j<this.canvas.height;j+=sz1)
      {
        this.ctxGrid.strokeRect(i,j,sz1,sz1);
      }
    }
  }

}
