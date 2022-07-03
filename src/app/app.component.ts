import { Component, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { NodesComponent } from './nodes/nodes.component';
import { ResultComponent } from './result/result.component';
import { Nodes, Edges, Degree } from './SharedClasses.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(NodesComponent)
  NodesComponent: NodesComponent | undefined;
  @ViewChild(ResultComponent)
  ResultComponent: ResultComponent | undefined;
  fileUploaded!: File;
  storeData: string | ArrayBuffer | null | undefined;

  jsonDataNodes: any;
  jsonDataEdges: any;
  worksheetNodes: XLSX.WorkSheet | undefined;
  worksheeEdges: XLSX.WorkSheet | undefined;
  arrayOfNewNodes: Array<Nodes> = new Array<Nodes>();;
  arrayOfNewEdges: Array<Edges> = new Array<Edges>();;
  dataSource: any;
  title = 'network-nodes';
  NodesNumbers: number = 0;
  EdgesNumbers: number = 0;
  EdgesCount: Array<Degree> = new Array<Degree>();
  AvgDegree: number = 0;
  AvgWDegree: number = 0;
  Density: number = 0;
  tabs = ['Nodes', 'Result'];
  selected: number = 0;

  onFileChange(event: any) {
    this.fileUploaded = event.files[0];
    this.readExcel();
  }
  readExcel() {
    let readFile = new FileReader();
    readFile.onload = (e) => {
      this.storeData = readFile.result;
      var data = new Uint8Array(<ArrayBuffer>this.storeData);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary", cellDates: true, cellNF: false, cellText: false });
      var first_sheet_name = workbook.SheetNames[0];
      var sec_sheet_name = workbook.SheetNames[1];
      this.worksheetNodes = workbook.Sheets[first_sheet_name];
      this.worksheeEdges = workbook.Sheets[sec_sheet_name];

      this.jsonDataNodes = XLSX.utils.sheet_to_json(this.worksheetNodes);
      this.jsonDataEdges = XLSX.utils.sheet_to_json(this.worksheeEdges);

      this.jsonDataNodes = JSON.stringify(this.jsonDataNodes);
      this.jsonDataEdges = JSON.stringify(this.jsonDataEdges);
      this.importData();
    }
    readFile.readAsArrayBuffer(this.fileUploaded);
  }
  importData() {
    this.arrayOfNewNodes = JSON.parse(this.jsonDataNodes);
    this.arrayOfNewNodes.map(elm => elm.Id = Number(elm.Id));
    this.arrayOfNewEdges = JSON.parse(this.jsonDataEdges);
    this.arrayOfNewEdges.map(elm => {
      elm.Source = Number(elm.Source);
      elm.Target = Number(elm.Target);
    });
    this.NodesComponent?.FillData(this.arrayOfNewNodes);
  }
  FinalResult() {
    this.ResultComponent?.FinalResult(this.arrayOfNewEdges, this.arrayOfNewNodes);
  }

}
