import { ValidatorFn, FormControl } from '@angular/forms';

export class FileValidator {
    static fileTypeValidator(type: string[]) {
        return function(control: FormControl) {
          // return (control: AbstractControl): { [key: string]: any } | null => {
          const file = control.value;
          var existValue: boolean = false;
          if (file) {
      
            var path = file.replace(/^.*[\\\/]/, "");
      
            const extension = path.split(".")[1].toUpperCase();
            for (var i = 0; i < type.length; i++) {
              let typeFile = type[i].toUpperCase();
              if (typeFile === extension.toUpperCase()) {
                existValue = true;
              }
            }
            if (existValue == true) {
              return null;
            } else {
              return {
                  fileTypeValidator: true
              };
            }
          }
          return null;
        };
    }

    static fileSizeValidator(file: File,maxfilesize: number) {
        return function(control: FormControl) {
        // return (control: AbstractControl): { [key: string]: any } | null => {
        const filectrl = control.value;
        if (filectrl) {
            //var path = filectrl.replace(/^.*[\\\/]/, "");
            const fileSize = file.size;
            const fileSizeInKB = Math.round(fileSize / 1024);
    
            if (fileSizeInKB >= maxfilesize) {
            return {
                fileSizeValidator: true
            };
            } else {
            return null;
            }
        }
        return null;
        };
    }
}