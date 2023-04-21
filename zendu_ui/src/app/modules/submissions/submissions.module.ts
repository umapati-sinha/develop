import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmissionsRoutingModule } from './submissions-routing.module';
import { SubmissionsComponent } from './submissions.component';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { TableDataService } from 'src/app/service/tableDataService';
import { PaginatorModule } from 'primeng/paginator';
import { ExportService } from 'src/app/service/exportService';

@NgModule({
  declarations: [
    SubmissionsComponent
  ],
  imports: [
    CommonModule,
    SubmissionsRoutingModule,
    DropdownModule,
    TableModule,
    FormsModule,
    CalendarModule,
    SelectButtonModule,
    TagModule,
    PaginatorModule
  ],
  providers: [TableDataService, ExportService]
})
export class SubmissionsModule { }
