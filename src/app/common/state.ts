// @ts-ignore
import String from "$GLOBAL$";

export class State {
  id:String | undefined
  name:String | undefined


  constructor(id: String | undefined, name: String | undefined) {
    this.id = id;
    this.name = name;
  }
}
