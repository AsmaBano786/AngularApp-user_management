import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multiselect-dropdown',
  templateUrl: './multiselect-dropdown.component.html',
  styleUrls: ['./multiselect-dropdown.component.css']
})
export class MultiselectDropdownComponent implements OnInit {

  isDropdownOpen = false;
  @Input() selectAll: boolean = false;
  @Output() selectedItemNamesChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Input() label: string = 'Select'; // Default label is 'Select'

  @Input() items: any[] = [];
  @Input() selectedItems: any[] = [];
  @Output() selectedItemsChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() displayProperty: string = 'name'; 

  @Input() selectedItemNames: any[] = [];


  filteredItems: any[] = [];

  searchText: string = '';


  constructor(private el: ElementRef){}

  // Check if the click is outside the multiselect component
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    if (!this.el?.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  ngOnInit(): void {
    document.addEventListener('click', this.handleOutsideClick);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.searchText = "";
    this.filterItems();
  }


toggleItem(item: any,propertyName: string) {

  this.filterItems();

  const itemId = item[propertyName];
  const index = this.selectedItems.findIndex((x) => x[propertyName] === itemId);
  

  if (index !== -1) {
    // Item is already selected, so remove it
    this.selectedItems.splice(index, 1);
  } else {
    // Item is not selected, so add it
    this.selectedItems.push(item);
  }

  this.selectedItemNames = this.selectedItems.map((selectedItem) => selectedItem[propertyName]);

  this.selectedItemsChange.emit([...this.selectedItems]);
  this.selectedItemNamesChange.emit(this.selectedItemNames);
}

  isSelected(item: string): boolean {
    return this.selectedItems.includes(item);
  }

  removeItem(item: string) {
    this.selectedItems = this.selectedItems.filter((x) => x !== item);
  }

  toggleSelectAll(event: Event) {
    this.selectAll = (event.target as HTMLInputElement).checked;
  
    if (this.selectAll) {
      // Select all items
      this.selectedItems = [...this.items];
    } else {
      // Deselect all items
      this.selectedItems = [];
    }
  
    this.selectedItemsChange.emit(this.selectedItems);
  }

  areAllItemsSelected(): boolean {
    return this.selectedItems.length === this.items.length;
  }


  filterItems() {

    this.filteredItems = this.items?.filter(item => {
      const displayPropertyValue = String(item[this.displayProperty]);
  
      // Check if display property value is a string
      if (typeof displayPropertyValue === 'string') {
        return displayPropertyValue.toLowerCase().includes(this.searchText.toLowerCase());
      }
  
      return false;
    });

  }

  clearSearch(){
    this.isDropdownOpen = true;
    this.searchText = "";
  }

}
