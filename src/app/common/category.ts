import { Product } from "./product";

export class Category {

    constructor(public id:string,public categoryName:string,
        public products:Product[]){}

}
