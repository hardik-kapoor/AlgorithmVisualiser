import { Component, OnInit, ViewChild } from '@angular/core';
import { Queue } from './queue';


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
  sz1:number=13;
  isDrawing:boolean=false;
  arr;
  src;
  des;
  xs;
  ys;
  pararr;
  tempsrc;
  tempdes;
  dur=1;
  isFound=false;
  walltype = 1;
  wallchecked = true;
  whichInd:number=4;
  wt:number=101;
  dx=[1,-1,0,0,1,1,-1,-1];
  dy=[0,0,1,-1,-1,1,-1,1];

  /*
  0->(weight)(is equal to 1)
  1->wall
  2->src
  3->des
  4->work in progess
  5->final path
  6->changing
  7-107->weight (is equal to weight - 5, or 2->102)
  */
  inf:number=100000000;

  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
    this.ctxGrid = this.canvas.getContext('2d');
    this.ctxGrid.canvas.height = 520;
    this.ctxGrid.canvas.width = 690;
    this.ctxGrid.strokeStyle = "#808588";
    this.xs=this.ctxGrid.canvas.width/this.sz1,this.ys=this.ctxGrid.canvas.height/this.sz1
    this.arr=[];
    for(let i=0;i<this.ys;i++){
      let temp=[];
      for(let j=0;j<this.xs;j++)
        temp.push(0);
      this.arr.push(temp);
    }
    this.src=[0,0];
    this.des=[this.ys-1,this.xs-1];
    this.tempsrc=[...this.src];
    this.tempdes=[...this.des];
    this.resetGrid();
    this.arr[this.src[0]][this.src[1]]=2;
    this.drawWalls(this.src);
    this.arr[this.des[0]][this.des[1]]=3;
    this.drawWalls(this.des);
    this.makeWalls();
  }

  changeWallWeight(event)
  {
    this.wt = event.value;
    console.log(this.wt/100);
    console.log('rgb(1,1,1,'+String(this.wt/101)+')');
    console.log('rgb(1,1,1,'+String((Math.round(this.wt)/101).toFixed(2))+')');
  }

  walltoggle(event){
    console.log(event)
    if(event.checked === true)this.walltype = 1;
    else this.walltype = 0;
  }

  chose(event){
    console.log(event);
  }

  resetGrid()
  {
    this.isFound=false;
    this.ctxGrid.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let i=0;i<this.canvas.width;i+=this.sz1)
    {
      for(let j=0;j<this.canvas.height;j+=this.sz1)
      {
        this.ctxGrid.strokeRect(i,j,this.sz1,this.sz1);
      }
    }
    this.arr=[];
    for(let i=0;i<this.ys;i++){
      let temp=[];
      for(let j=0;j<this.xs;j++)
        temp.push(0);
      this.arr.push(temp);
    }
    this.src=[...this.tempsrc];
    this.des=[...this.tempdes];
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
        if(x<0.3&&this.arr[j/this.sz1][i/this.sz1]!==2&&this.arr[j/this.sz1][i/this.sz1]!==3)
        {
          this.arr[j/this.sz1][i/this.sz1]=1;
          this.drawWalls([j/this.sz1,i/this.sz1]);
        }
      }
    }
  }

  drawWalls(ind:number[]){
    let cx=ind[1]*this.sz1,cy=ind[0]*this.sz1;
    if(this.arr[ind[0]][ind[1]]===0)
    {

      this.ctxGrid.fillStyle = 'white';
      this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
    }
    else if(this.arr[ind[0]][ind[1]]===1)
    {
      this.ctxGrid.fillStyle = 'white';
      this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
      this.ctxGrid.fillStyle = 'rgb(1,1,1,'+String((Math.round(this.wt)/101).toFixed(2))+')';
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
      this.ctxGrid.fillStyle = 'rgb(0,0,255,0.2)';
      this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
    }
    else if(this.arr[ind[0]][ind[1]]===5)
    {
      this.ctxGrid.fillStyle = 'purple';
      this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
    }
    else if(this.arr[ind[0]][ind[1]]===6)
    {
      this.ctxGrid.fillStyle = 'pink';
      this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
    }
    else{
      this.ctxGrid.fillStyle = 'white';
      this.ctxGrid.fillRect(cx+1,cy+1,this.sz1-2,this.sz1-2);
      this.ctxGrid.fillStyle = 'rgb(153,184,152,'+String((Math.round(this.wt)/101).toFixed(2))+')';
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

        cx=(Math.floor(cx/this.sz1))*this.sz1;
        cy=(Math.floor(cy/this.sz1))*this.sz1;
        let r=Math.floor(cy/this.sz1);
        let c=Math.floor(cx/this.sz1);
        let val=-1;
        if(this.wt===101)
          val=1;
        else
          val=this.wt+6;
        if(!((r===this.src[0]&&c===this.src[1])||(r===this.des[0]&&c===this.des[1]))){
          if(this.walltype === 0){
            this.arr[r][c] = 0;
            this.drawWalls([r,c]);
          }
          else{
            this.arr[r][c]=val;
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

        cx=(Math.floor(cx/this.sz1))*this.sz1;
        cy=(Math.floor(cy/this.sz1))*this.sz1;
        let r=Math.floor(cy/this.sz1);
        let c=Math.floor(cx/this.sz1);
        let val=-1;
        if(this.wt===101)
          val=1;
        else
          val=this.wt+6;
        if(!((r===this.src[0]&&c===this.src[1])||(r===this.des[0]&&c===this.des[1]))){
          if(this.walltype === 0){
            this.arr[r][c] = 0;
            this.drawWalls([r,c]);
          }
          else{
            this.arr[r][c]=val;
            this.drawWalls([r,c]);
          }
        }
      }
    }.bind(this))

    document.body.onmouseup=()=>{
      this.isDrawing=false;
    }
  }

  async backtrack()
  {
    let nowi=this.des[0],nowj=this.des[1];
    while(this.pararr[nowi][nowj][0]!=this.src[0]||this.pararr[nowi][nowj][1]!=this.src[1])
    {
      let nowit=this.pararr[nowi][nowj][0];
      let nowjt=this.pararr[nowi][nowj][1];
      this.arr[nowit][nowjt]=5;
      this.drawWalls([nowit,nowjt]);
      await new Promise(resolve => setTimeout(resolve, this.dur));
      nowi=nowit;
      nowj=nowjt;
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
      vis[this.src[0]][this.src[1]]=1;
      while(!(q.isempty()))
      {
        let now=q.front();
        q.pop();
        let i=now[0],j=now[1];
        for(let ind=0;ind<this.whichInd;ind++)
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
      await new Promise(resolve => {setTimeout(() => {resolve(this.backtrack());}, );});
    }

    async dijkstra(){
      let dis=[],done=[];
      this.pararr=[];
      for(let i=0;i<this.ys;i++)
      {
        let temp=[],temp2=[],temp3=[];
        for(let j=0;j<this.xs;j++)
        {
          temp.push(this.inf);
          temp2.push(0);
          temp3.push([-1,-1]);
        }
        dis.push(temp);
        done.push(temp2);
        this.pararr.push(temp3);
      }
      dis[this.src[0]][this.src[1]]=0;
      while(!this.isFound)
      {
        let now=[-1,-1],mn=this.inf;
        for(let i=0;i<this.ys;i++)
        {
          for(let j=0;j<this.xs;j++)
          {
            if(dis[i][j]<mn&&!done[i][j])
            {
              now=[i,j];
              mn=dis[i][j];
            }
          }
        }
        if(now[0]===-1)
          break;
        done[now[0]][now[1]]=1;
        if(this.arr[now[0]][now[1]]===3)
        {
          this.isFound=true;
          break;
        }
        if(this.arr[now[0]][now[1]]!==2&&this.arr[now[0]][now[1]]!==3)
        {
          this.arr[now[0]][now[1]]=4;
          this.drawWalls([now[0],now[1]]);
          await new Promise(resolve => setTimeout(resolve, this.dur));
        }
        for(let ind=0;ind<this.whichInd;ind++)
        {
          let ni=now[0]+this.dx[ind],nj=now[1]+this.dy[ind];
          if(ni<0||ni>=this.ys||nj<0||nj>=this.xs||this.arr[ni][nj]===1||done[ni][nj])
            continue;
          let vl:number=-1;
          if(this.arr[ni][nj]===3)
            vl=0;
          else if(this.arr[ni][nj]===0)
            vl=1;
          else
            vl=this.arr[ni][nj]-5;
          if(dis[ni][nj]>dis[now[0]][now[1]]+vl)
          {
            dis[ni][nj]=dis[now[0]][now[1]]+vl;
            this.pararr[ni][nj]=now;
          }
        }
      }
      if(this.isFound)
        this.backtrack();
    }

    //maze generation

    getBlocked(){
    }

    primsMazeAlgorithm(){
      let tempArr=[...this.arr];
      
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
      await new Promise(resolve => {setTimeout(() => {resolve(this.backtrack());}, );});
    }

    async _dfs(root:number[])
    {

      if(this.isFound===true)
        return ;
      let x:number=root[0],y=root[1];

      for(let ind=0; ind<this.whichInd; ind++)
      {
        let tx=x+this.dx[ind], ty=y+this.dy[ind];

        if(tx<0||tx>=this.ys||ty<0||ty>=this.xs||this.arr[tx][ty]===1||this.isFound)
          continue;
        if(this.pararr[tx][ty][0]!==-1&& this.pararr[tx][ty][1]!==-1)
          continue;
        if(this.des[0]===tx&& this.des[1]===ty)
        {
            this.isFound=true;
            this.pararr[tx][ty]=[x,y];
            return;
        }
        this.arr[tx][ty]=4;
        this.drawWalls([tx,ty]);
        await new Promise(resolve => setTimeout(resolve, this.dur));
        this.pararr[tx][ty]=[x,y];

        await new Promise(resolve => {setTimeout(() => {resolve(this._dfs([tx,ty]));}, );});
      }
    }

    async astar()
    {
      let dis=[],done=[],gvalue=[];
      this.pararr=[];
      for(let i=0;i<this.ys;i++)
      {
        let temp=[],temp2=[],temp3=[],temp4=[];
        for(let j=0;j<this.xs;j++)
        {
          temp.push(this.inf);
          temp2.push(0);
          temp3.push([-1,-1]);
          temp4.push(this.inf);
        }
        dis.push(temp);
        done.push(temp2);
        this.pararr.push(temp3);
        gvalue.push(temp4);
      }
      dis[this.src[0]][this.src[1]]=0;
      gvalue[this.src[0]][this.src[1]]=0;
      this.isFound=false;
      while(this.isFound===false)
      {
        let now=[-1,-1],mn=this.inf;
        for(let i=0;i<this.ys;i++)
        {
          for(let j=0;j<this.xs;j++)
          {
            if(dis[i][j]<mn&&!done[i][j])
            {
              now=[i,j];
              mn=dis[i][j];
            }
          }
        }
        if(now[0]===-1)
          break;
        done[now[0]][now[1]]=1;
        if(this.arr[now[0]][now[1]]===3)
        {
          this.isFound=true;
          break;
        }
        if(this.arr[now[0]][now[1]]!==2&&this.arr[now[0]][now[1]]!==3)
        {
          this.arr[now[0]][now[1]]=4;   //in progress
          this.drawWalls([now[0],now[1]]);
          await new Promise(resolve => setTimeout(resolve, this.dur));
        }
        for(let ind=0;ind<this.whichInd;ind++)
        {
          let ni=now[0]+this.dx[ind],nj=now[1]+this.dy[ind];

          if(ni<0||ni>=this.ys||nj<0||nj>=this.xs||this.arr[ni][nj]===1||done[ni][nj])
            continue;
          let gv:number=-1;
          if(this.arr[ni][nj]===3)
            gv=0;
          else if(this.arr[ni][nj]===0)
            gv=1;
          else
            gv=this.arr[ni][nj]-5;
          gv=dis[now[0]][now[1]]+gv;
          let hv:number=Math.abs(now[0]-ni)+Math.abs(now[1]-nj);
          let fv:number=gv+hv;
          if(dis[ni][nj]>fv)
          {
            dis[ni][nj]=fv;
            gvalue[ni][nj]=gv;
            this.pararr[ni][nj]=now;
          }

        }
        if(this.isFound)
          break;
      }
      if(this.isFound)
        this.backtrack();
    }



  //

}
