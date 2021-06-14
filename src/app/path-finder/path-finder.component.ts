import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-path-finder',
  templateUrl: './path-finder.component.html',
  styleUrls: ['./path-finder.component.css']
})
export class PathFinderComponent implements OnInit {

  constructor() { }
  @ViewChild('canvas', { static: true })


  animDelay;
  startNodeColor;
  endNodeColor;
  shapedimension;
  lineWidth;

  shapes; //2d array of square nodes
  canvas = null;
  ctxGrid = null;

  drawWall = true;
  eraseWall = false;
  changeStartNode = false;
  changeEndNode = false;

  disableButtons = false;

  startImage;
  noPath;


  ngOnInit(): void {
    this.shapes = new Array(95);
    for (let i = 0; i < this.shapes.length; i++) { this.shapes[i] = new Array(40) };
    this.canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
    this.ctxGrid = this.canvas.getContext('2d');

    this.ctxGrid.canvas.height = 520;
    this.ctxGrid.canvas.width = 1235;
    this.ctxGrid.canvas.style.imageRendering = 'auto';//default
    this.ctxGrid.translate(0.5, 0.5);
    this.ctxGrid.imageSmoothingEnabled = false;
    this.resetGrid();
  }

  async resetGrid() {

    this.ctxGrid.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctxGrid.lineWidth = this.lineWidth;
    this.ctxGrid.fillStyle = "000000";

    this.animDelay = 15;
    this.startNodeColor = "#FF3600";
    this.endNodeColor = "#00AB5C";
    this.shapedimension = 13;
    this.lineWidth = 0.05;

    //grid with rectangles
    for (let i = 0; i < this.shapes.length; i++) {
      for (let j = 0; j < this.shapes[i].length; j++) {
        //variables
        let x = i * this.shapedimension;
        let y = j * this.shapedimension;
        let type = "";
        let visited = false;

        //a* algorithm info
        let F = 100000;
        let G = 100000;
        let H = 100000;
        let cameFrom = undefined;
        //maze stuff
        //neighbouring nodes
        let neighbors = new Array();

        if (i == 4 && j == 4) {

          this.ctxGrid.fillStyle = this.startNodeColor;

          type = "Start"
          //draw it
          this.ctxGrid.strokeRect(x, y, this.shapedimension, this.shapedimension);

          this.ctxGrid.fillStyle = this.startNodeColor;

          this.ctxGrid.fillRect(x, y, this.shapedimension, this.shapedimension);

        }

        else if (i == (this.canvas.width / this.shapedimension - 5) && j == (this.canvas.height / this.shapedimension - 5)) {
          this.ctxGrid.fillStyle = this.endNodeColor;

          type = "End"
          //draw it
          this.ctxGrid.strokeRect(x, y, this.shapedimension, this.shapedimension);
          this.ctxGrid.fillRect(x, y, this.shapedimension, this.shapedimension);
        }

        else {
          //push the default square info
          type = "";
          this.ctxGrid.fillStyle = "#000000"
          //draw it
          this.ctxGrid.strokeRect(x, y, this.shapedimension, this.shapedimension);
        }
        this.shapes[i][j] = { x, y, i, j, type, F, G, H, neighbors, cameFrom, visited };  //x and y are grid coordinates, and i j is the index in array the square object is in, and type is the type of the node, FGH is a* related info

      }
    }

  }

}
