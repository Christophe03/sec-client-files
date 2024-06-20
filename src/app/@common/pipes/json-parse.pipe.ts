import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonParse',
  // standalone: true,
})
export class JsonParsePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error('Error parsing JSON string:', e);
      return null;
    }
  }
}
