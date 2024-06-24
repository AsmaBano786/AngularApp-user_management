import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MultiselectDropdownComponent } from './components/multiselect-dropdown/multiselect-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ShowPageRecordsComponent } from './components/show-page-records/show-page-records.component';
import { SearchPipe } from './pipe/search.pipe';
import { SortPipePipe } from './pipe/sort-pipe.pipe';

@NgModule({
  declarations: [
    LeftPanelComponent,
    HeaderNavComponent,
    FooterComponent,
    MultiselectDropdownComponent,
    PaginationComponent,
    ShowPageRecordsComponent,
    SearchPipe,
    SortPipePipe,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderNavComponent,
    LeftPanelComponent,
    FooterComponent,
    MultiselectDropdownComponent,
    PaginationComponent,
    ShowPageRecordsComponent,
    SearchPipe,
    SortPipePipe
  ]
})
export class SharedModule { }
