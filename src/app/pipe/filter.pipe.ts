import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (args == 'all' || args == 'Type')
      return value;
    return args
      ? value.filter(item => item.type.indexOf(args) !== -1)
      : value;
  }
}
