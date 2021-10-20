export class BaseApi {
  private readonly baseUrl: RequestInfo
  private headers: Record<string, string> = {
    'Content-type': 'application/json; charset=UTF-8',
  }

  constructor(url: RequestInfo) {
    this.baseUrl = url
  }

  protected fetch<Res, Req = undefined>(url: string, method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET', options?: {
    body?: Req,
    headers?: Headers,
    queryParams?: Record<string, string | number | boolean>
  }): Promise<Res> {
    let urlWithParams: RequestInfo = this.baseUrl + url

    const reqOptions: RequestInit = {
      method,
      headers: this.headers,
    }

    if (options && options.body) {
      reqOptions.body = JSON.stringify(options.body)
    }

    if (options && options.queryParams) {
      urlWithParams += '?'
      Object.entries(options.queryParams).forEach(([key, value], i) => {
        urlWithParams += `${i > 0 ? '&' : ''}_${key}=${value}`
      })
    }

    return fetch(urlWithParams, reqOptions).then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`)
      }

      return response.json()
    })
  }
}