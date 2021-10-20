import {IUser} from "./types/IUser";
import {JsonPlaceholderApi} from "../../utils/api/JsonPlaceholderApi";

class UsersApi extends JsonPlaceholderApi {
  private readonly subUrl: string

  constructor(subUrl: string) {
    super()
    this.subUrl = subUrl
  }

  public getUsers(limit: number) {
    return this.fetch<IUser[]>(`${this.subUrl}`, 'GET', {queryParams: { limit }})
  }

  public getUser(id: number) {
    return this.fetch<IUser>(`${this.subUrl}/${id}`)
  }
}

const usersApi = new UsersApi('/users')

export default usersApi