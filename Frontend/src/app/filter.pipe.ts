import { ComponentFactoryResolver, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value : any[], filterString: string, propName:string, propName1:string): any[] {
    const result:any =[];
    if(!value || filterString==='' || propName ==='' || propName1 ===''){
      return value;
    }

    value.forEach((a:any)=>{
      if(a[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(a);
      }
     else if(a[propName1].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(a);
      }     
    });
    return result;
  }


}
