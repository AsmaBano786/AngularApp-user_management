import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() pageSize = 5;
  @Input() totalItems = 0;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pageSizes = [5, 10, 20, 50, 100,'All'];

  constructor() { }

  ngOnInit(): void {
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

  onPageSizeChange(): void {

    if ( String(this.pageSize) === 'All') {
      
      this.currentPage = 1; // Go to the first page when 'All' is selected
      this.pageSizeChange.emit(this.totalItems); // Emit totalItems as the pageSize
    }else{
    this.currentPage = 1; // Reset to the first page when a regular page size is selected
    this.pageChange.emit(1); // Go to the first page when the page size changes
    this.pageSizeChange.emit(this.pageSize);
  }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
    }
    return pages;
}

}
