import Stuart from "./Stuart"

class StuartHealth {
  constructor(public superThis: Stuart) {}

  /**
   *
   * @response { description: "Stuart API health", status: "pass" }
   */
  public check = async (): Promise<Record<string, any>> => {
    return new Promise(async (resolve, reject) => {
      await this.superThis.httpClient
        .performGet("/health", {})
        .then((response: Record<string, any>) => {
          if (response.statusCode >= 400) return reject(response)
          else return resolve(response.body)
        })
        .catch((err: Record<string, any>) => reject(err))
    })
  }
}

export default StuartHealth
