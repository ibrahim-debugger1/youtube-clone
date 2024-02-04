import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDifference',
})
export class DateDifferencePipe implements PipeTransform {
  transform(publishedTime: string): string {
    let timestamp = new Date(publishedTime);
    let currentTime = new Date();

    const timeDifference = currentTime.getTime() - timestamp.getTime();

    const secondsDifference = Math.floor(timeDifference / 1000);
    const days = Math.floor(secondsDifference / (60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    const hours = Math.floor((secondsDifference % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((secondsDifference % (60 * 60)) / 60);
    const seconds = secondsDifference % 60;
    if (years) {
      return `${years} years ago`;
    } else if (months) {
      return `${months} months ago`;
    } else if (days) {
      return `${days} days ago`;
    } else if (hours) {
      return `${hours} hours ago`;
    } else if (minutes) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  }
}
