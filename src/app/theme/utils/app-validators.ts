import { UntypedFormGroup, UntypedFormControl, AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(control: UntypedFormControl): { [key: string]: any } {
    const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: UntypedFormGroup) => {
        const password = group.controls[passwordKey];
        const passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true })
        }
    }
}

export function duplicateEmail(myArray: any[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && (isNaN(control.value)) &&
            myArray.some(e => e.email.trim().toLocaleLowerCase() === control.value.trim().toLocaleLowerCase())) {
            return { 'duplicateEmail': true };
        }
        return null;

    };
}

