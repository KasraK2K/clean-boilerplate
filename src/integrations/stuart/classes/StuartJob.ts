import Stuart from "./Stuart"
import { IStuartJob } from ".."

class StuartJob {
  constructor(public superThis: Stuart) {}

  public jobCreation = async (job: IStuartJob): Promise<Record<string, any>> => {
    return new Promise(async (resolve, reject) => {
      await this.superThis.httpClient
        .performPost(this.superThis.endpointGen("jobs"), JSON.stringify({ job }))
        .then((response: Record<string, any>) => {
          if (response.statusCode >= 400) return reject(response)
          else return resolve(response.body)
        })
        .catch((err: Record<string, any>) => reject(err))
    })
  }

  public jobPricing = async (job: IStuartJob): Promise<Record<string, any>> => {
    return new Promise(async (resolve, reject) => {
      await this.superThis.httpClient
        .performPost(this.superThis.endpointGen("jobs/pricing"), JSON.stringify({ job }))
        .then((response: Record<string, any>) => {
          if (response.statusCode >= 400) return reject(response)
          else return resolve(response.body)
        })
        .catch((err: Record<string, any>) => reject(err))
    })
  }

  /**
   * @response: { valid: boolean }
   */
  public jobValidation = async (job: IStuartJob): Promise<Record<string, any>> => {
    return new Promise(async (resolve, reject) => {
      await this.superThis.httpClient
        .performPost(this.superThis.endpointGen("jobs/validate"), JSON.stringify({ job }))
        .then((response: Record<string, any>) => {
          if (response.statusCode >= 400) return reject(response)
          else return resolve(response.body)
        })
        .catch((err: Record<string, any>) => reject(err))
    })
  }

  public phoneValidate = async (phone?: string): Promise<Record<string, any>> => {
    const job = {
      pickup_at: new Date(Date.now() + 1800).toISOString(),
      pickups: [{ address: "32 Coombe Ln, Raynes Park, London SW20 0LA" }],
      dropoffs: [{ address: "23 Ethelbert Rd, London SW20 8QD", package_type: "medium", contact: { phone } }],
    }
    return new Promise(async (resolve, reject) => {
      await this.superThis.job
        .jobValidation(job)
        .then((response: Record<string, any>) => {
          if (response.statusCode >= 400 && response.body.error === "PHONE_INVALID") return reject({ valid: false })
          else return resolve(response.body)
        })
        .catch((err: Record<string, any>) => reject(err))
    })
  }
}

export default StuartJob
