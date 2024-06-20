import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'employeSearchPipe', pure: false })
export class EmployeSearchPipe implements PipeTransform {
    transform(value, args?): Array<any> {
        const searchText = new RegExp(args, 'ig');
        if (value) {
            return value.filter(emp => {
                return emp.patronyme.search(searchText) !== -1;
            });
        }
    }
}