import { Component, OnInit } from '@angular/core';
import { Nodes, Edges, Degree } from '../SharedClasses.module';
import { MatTableDataSource } from '@angular/material/table';
class Result {
  Name!: string;
  value!: number;
}
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  arrayOfNewNodes: Array<Nodes> = new Array<Nodes>();;
  arrayOfNewEdges: Array<Edges> = new Array<Edges>();;
  title = 'network-nodes';
  NodesNumbers: number = 0;
  EdgesNumbers: number = 0;
  EdgesCount: Array<Degree> = new Array<Degree>();
  AvgDegree: number = 0;
  AvgWDegree: number = 0;
  Density: number = 0;
  ResultArr: Array<Result> = new Array<Result>();

  displayedColumns: string[] = ['Id', 'name'];

  dataSource: MatTableDataSource<Result> = new MatTableDataSource<Result>();
  constructor() { }

  ngOnInit(): void {
  }
  
  FinalResult(arrayOfNewEdges:any, arrayOfNewNodes:any): void {
    try {
      this.arrayOfNewNodes = arrayOfNewNodes;
      this.arrayOfNewEdges = arrayOfNewEdges;
      this.arrayOfNewEdges.forEach(el => {
        if (this.EdgesCount.find(elm => (elm.Id?.Source == el.Source && elm.Id?.Target == el.Target)) == undefined)
          this.EdgesCount.push({ Id: el, Count: 1 });
        else {
          let newelm = this.EdgesCount.find(elm => (elm.Id?.Source == el.Source && elm.Id?.Target == el.Target));
          if (newelm) {
            let index = this.EdgesCount.indexOf(newelm);
            newelm.Count++;
            this.EdgesCount[index] = newelm;
          }
        }
      });

      this.NodesNumbers = this.arrayOfNewNodes.length;
      this.ResultArr.push({ Name: "Nodes", value: this.NodesNumbers });
      this.EdgesNumbers = this.EdgesCount.length;
      this.ResultArr.push({ Name: "Edges", value: this.EdgesNumbers });
      this.AvgDegree = this.EdgesNumbers / this.NodesNumbers;
      this.ResultArr.push({ Name: "AvgDegree", value: this.AvgDegree });
      this.AvgWDegree = 0;
      let Total = 0;
      this.EdgesCount.forEach(el => Total += el.Count);
      this.AvgWDegree = Total / this.NodesNumbers;
      this.ResultArr.push({ Name: "Avg. weighted Degree", value: this.AvgWDegree });
      this.Density = this.EdgesNumbers / (this.NodesNumbers * (this.NodesNumbers - 1));
      this.ResultArr.push({ Name: "Density", value: this.Density });
      this.dataSource = new MatTableDataSource(this.ResultArr);
    } catch (exception_var) {
      console.log(exception_var);
    }
  }
}
