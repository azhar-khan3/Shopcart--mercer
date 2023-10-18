import { AnalysisLanguage } from "@elastic/elasticsearch/lib/api/types";
import { Categories } from "./product.interface";


export class filterDto{
    category:Categories;
    search:string;
    range:string;
    sort:string
    min:number;
    max:number;
 
}