// import Request from "builtin-request"
// const request = new Request()
import axios from "axios"

/* -------------------------------------------------------------------------- */
/*                              External Domains                              */
/* -------------------------------------------------------------------------- */
// import userDomain from "./user"
const userDomain = {
  getUserList: async (): Promise<Record<string, any>> => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get("http://localhost:3000/v1/user")
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  },
}

export default {
  userDomain,
}
