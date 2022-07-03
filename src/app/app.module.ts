import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { NodesComponent } from './nodes/nodes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ResultComponent } from './result/result.component';
import {MatInputModule} from '@angular/material/input';

export class DemoMaterialModule {}
@NgModule({
  declarations: [
    AppComponent,
    NodesComponent,
    ResultComponent,
    
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
