import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millisecondeToDate',
  // standalone: false
})
export class MillisecondeToDatePipe implements PipeTransform {
  transform(value: number): Date | null {
    if (value) {
      return new Date(value);
    }
    return null;
  }
}
