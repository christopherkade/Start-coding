import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let type = args.type.toLowerCase();
    let tech = args.tech.toLowerCase();

    if (type === 'all' && tech === 'all')
      return value;
    if (type != 'all' && tech === 'all') {
      // Filtering by type
      return type
        ? value.filter(item => item.type.indexOf(type) !== -1)
        : value;
    } else if (type === 'all' && tech != 'all') {
      // Only filtering by tech
      return tech
        ? value.filter(item => item.tech.indexOf(tech) !== -1)
        : value;
    } else {
      // Filtering with both
      if (tech && type) {
        let doc = value.filter(item => item.tech.indexOf(tech) !== -1 && item.type.indexOf(type) !== -1);

        if (doc.length === 0) {
          // Nothing found
          // TODO: Display a message when nothing was found
        }
        return value.filter(item => item.tech.indexOf(tech) !== -1 && item.type.indexOf(type) !== -1);
      }
    }
  }
}
