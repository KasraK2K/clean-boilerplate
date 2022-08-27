import { StuartJob, StuartAddress, StuartHealth } from ".."
const { Authenticator, Environment, HttpClient } = require("stuart-client-js")

class Stuart {
  private certificate = require("../certificate.json")
  private environment = process.env.NODE_ENV === "production" ? Environment.PRODUCTION() : Environment.SANDBOX()
  private auth = new Authenticator(this.environment, this.certificate.client_id, this.certificate.client_secret)

  public httpClient = new HttpClient(this.auth)

  public job = new StuartJob(this)
  public address = new StuartAddress(this)
  public health = new StuartHealth(this)

  public getStuartError = (err: Record<string, any>) => {
    const returnValue = { message: "", erors: [] }
    switch (err.error) {
      case "JOB_INVALID_DUPLICATED_ORDER_ID":
        Object.assign(returnValue, { message: "Provided order ID is already used", errors: err.data })
        break
    }
    return returnValue
  }

  public endpointGen = (apiString: string): string => `/${this.certificate.version}/${apiString}`
}

export default Stuart
