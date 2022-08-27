import Request from "builtin-request"
import { IPromiseResponseObject } from "../../common/interfaces/response"
const request = new Request()

/* -------------------------------------------------------------------------- */
/*                              External Domains                              */
/* -------------------------------------------------------------------------- */
// import userDomain from "../user"
const userDomainOptions = {
  hostname: "http://localhost:3000/v1",
  method: "GET",
}
const userDomain = {
  getUserList: (): IPromiseResponseObject => {
    return request.execute({ ...userDomainOptions, path: "/user" })
  },
}

export default {
  userDomain,
}
