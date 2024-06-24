import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPipe'
})
export class SortPipePipe implements PipeTransform {

  transform(array: any[], propertyName: string, order: 'asc' | 'desc' = 'asc'): any[] {
    
    if (!array || !propertyName) {
      return array;
    }

    const sortedArray = array.slice(); 

    sortedArray.sort((a, b) => {
      const aValue = a[propertyName];
      const bValue = b[propertyName];

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    return sortedArray;
  }

}
