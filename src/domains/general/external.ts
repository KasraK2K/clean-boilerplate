// import Request from "builtin-request"
// const request = new Request()
import { IPromiseResponseObject } from "../../common/interfaces/response"
import axios from "axios"

/* -------------------------------------------------------------------------- */
/*                              External Domains                              */
/* -------------------------------------------------------------------------- */
// import userDomain from "../user"
const userDomain = {
  getUserList: async (): IPromiseResponseObject => {
    return await axios
      .get("http://localhost:3000/v1/user")
      .then((response) => response.data)
      .catch((error) => error)
  },
}

export default {
  userDomain,
}
