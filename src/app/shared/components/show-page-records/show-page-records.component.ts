import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-show-page-records',
  templateUrl: './show-page-records.component.html',
  styleUrls: ['./show-page-records.component.css']
})
export class ShowPageRecordsComponent {
  @Input() currentPage = 1;
  @Input() pageSize :any= 5;
  @Input() totalItems = 0;
  displayPageSize: any;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pageSizes = [10, 20, 50,100,'All'];

  constructor() { }

  ngOnInit(): void {
    this.displayPageSize = this.pageSize;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  goToPage(page: number): void {
   
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      
      this.pageChange.emit(this.currentPage);
    }
  }

  // onPageSizeChange(): void {
  
  //   if ( String(this.pageSize) === 'All') {

  //     this.currentPage = 1; // Go to the first page when 'All' is selected
  //     this.pageSizeChange.emit(this.totalItems); // Emit totalItems as the pageSize
  //   }else{
  //     this.currentPage = 1; // Reset to the first page when a regular page size is selected
  //   this.pageChange.emit(1); // Go to the first page when the page size changes
  //   this.pageSizeChange.emit(this.pageSize);
  //   }
  // }

  onPageSizeChange(): void {
    console.log('Page size changed to:', this.displayPageSize);
    if (this.displayPageSize === 'All') {
      this.pageSize = this.totalItems;
      this.currentPage = 1;
      this.pageChange.emit(this.currentPage);
      this.pageSizeChange.emit(this.totalItems);
    } else {
      this.pageSize = Number(this.displayPageSize);
      this.currentPage = 1;
      this.pageChange.emit(this.currentPage);
      this.pageSizeChange.emit(this.pageSize);
    }
    console.log('Current page:', this.currentPage);
    console.log('Page size after change:', this.pageSize);
  }

}
