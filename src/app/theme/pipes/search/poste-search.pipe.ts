import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'PosteSearchPipe', pure: false })
export class PosteSearchPipe implements PipeTransform {
    transform(value, args?): Array<any> {
        const searchText = new RegExp(args, 'ig');
        if (value) {
            return value.filter(poste => {
                if (poste.nom) {
                    return poste.nom.search(searchText) !== -1;
                } else {
                    return poste.nom.search(searchText) !== -1;
                }
            });
        }
    }
}