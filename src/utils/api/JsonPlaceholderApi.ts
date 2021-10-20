import {BaseApi} from "./BaseApi";

export class JsonPlaceholderApi extends BaseApi {
  constructor() {
    super('https://jsonplaceholder.typicode.com');
  }
}