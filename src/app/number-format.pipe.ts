import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1000000) {
      return parseInt((value / 1000000).toString(),10) + 'M';
    } else if (value >= 1000) {
      return parseInt((value / 1000).toString(),10) + 'K';
    } else {
      return value.toString();
    }
  }
}
