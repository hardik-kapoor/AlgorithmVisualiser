import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting-visualiser',
  templateUrl: './sorting-visualiser.component.html',
  styleUrls: ['./sorting-visualiser.component.css']
})
export class SortingVisualiserComponent implements OnInit {

  constructor() { }

  arr:number[]=[6,4,3,2,6,23,16];
  isChecking:number[]=[];
  isSwapping:number[]=[];
  isDone:number[]=[];

  ngOnInit(): void {
  }

}
