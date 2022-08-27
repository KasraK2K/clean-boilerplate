import Stuart from "./Stuart"
import { AddressTypeEnum } from ".."

class StuartAddress {
  constructor(public superThis: Stuart) {}

  /**
   * @response: { success: boolean }
   */
  public validate = async (
    address: string,
    type: AddressTypeEnum = AddressTypeEnum.PICKING,
    phone?: string
  ): Promise<Record<string, any>> => {
    return new Promise(async (resolve, reject) => {
      let addressQuery = `?address=${address}&type=${type}`
      if (phone) addressQuery += `&phone=${phone}`

      await this.superThis.httpClient
        .performGet(this.superThis.endpointGen("addresses/validate") + addressQuery)
        .then((response: Record<string, any>) => {
          if (response.statusCode >= 400) return reject(response)
          else return resolve(response.body)
        })
        .catch((err: Record<string, any>) => reject(err))
    })
  }

  public addressValidate = async (
    address: string,
    type: AddressTypeEnum = AddressTypeEnum.PICKING,
    phone?: string
  ): Promise<Record<string, any>> => {
    return new Promise(async (resolve, reject) => {
      let addressQuery = `?address=${address}&type=${type}`
      if (phone) addressQuery += `&phone=${phone}`

      await this.superThis.httpClient
        .performGet(this.superThis.endpointGen("addresses/validate") + addressQuery)
        .then((response: Record<string, any>) => {
          if (response.statusCode >= 400) return reject(response)
          else return resolve(response.body)
        })
        .catch((err: Record<string, any>) => reject(err))
    })
  }
}

export default StuartAddress
