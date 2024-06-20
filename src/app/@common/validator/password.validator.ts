import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('npwd').value; // to get value in input tag
        const confirmPassword = AC.get('cpwd').value; // to get value in input tag
        if (password !== confirmPassword) {
            // console.log('false');
            AC.get('cpwd').setErrors({ MatchPassword: true });
        } else {
            // console.log('true');
            return null;
        }
    }
}
