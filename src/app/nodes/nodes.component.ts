import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Nodes } from '../SharedClasses.module';
@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css']
})
export class NodesComponent implements OnInit {
  @Input() parent: any;
  private paginator!: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  arrayOfNewNodes: Array<Nodes> = new Array<Nodes>();;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  constructor() { }
  displayedColumns: string[] = ['Id', 'name'];

  ngOnInit(): void {

  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }
  FillData(arrayOfNewNodes: any) {
    this.arrayOfNewNodes = arrayOfNewNodes;
    this.dataSource = new MatTableDataSource(this.arrayOfNewNodes);;
    this.dataSource.paginator = this.paginator;
    this.parent.FinalResult();
  }
  applyFilter(event: any ) {
    const target = event.target ;
    const filterValue=target?.value;

    this.dataSource.filterPredicate = function (record,filterValue) {
      if(record.Label && record.Id)
      return record.Label.includes(filterValue) || record.Id.includes(filterValue);
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
