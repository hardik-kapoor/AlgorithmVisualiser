import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-path-finder',
  templateUrl: './path-finder.component.html',
  styleUrls: ['./path-finder.component.css']
})
export class PathFinderComponent implements OnInit {

  constructor() { }
  @ViewChild('canvas', { static: true })

  shapes;
  canvas;
  ctxGrid;


  ngOnInit(): void {
    this.shapes = new Array(95);
    for (let i = 0; i < this.shapes.length; i++) { this.shapes[i] = new Array(40) };
    this.canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
    this.ctxGrid = this.canvas.getContext('2d');

    this.ctxGrid.canvas.height = 520;
    this.ctxGrid.canvas.width = 1235;
    this.resetGrid();
  }

  resetGrid() {

    this.ctxGrid.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let sz1=25;
    for(let i=0;i<this.canvas.width;i+=sz1)
    {
      for(let j=0;j<this.canvas.width;j+=sz1)
      {
        this.ctxGrid.strokeRect(i,j,sz1,sz1);
      }
    }
    
  }

}
