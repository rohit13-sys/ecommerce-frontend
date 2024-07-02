// @ts-ignore
import String from "$GLOBAL$";

export class Country {
  id: String | undefined
  code: String | undefined
  name: String | undefined


  constructor(id: String | undefined, code: String | undefined, name: String | undefined) {
    this.id = id;
    this.code = code;
    this.name = name;
  }
}
