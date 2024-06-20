import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "MailSearch",
})
export class MailSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    const searchText = new RegExp(args, "ig");
    if (value) {
      //console.log(value);
      return value.filter((mail) => {
        if (mail.senderMail || mail.subject) {
          if (
            mail.senderMail.search(searchText) !== -1 ||
            mail.subject.search(searchText) !== -1
          ) {
            return true;
          }
          //return true;
        }
      });
    }
  }
}
