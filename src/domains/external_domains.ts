import axios from "axios"
import { IDefaultArgs } from "../common/interfaces/general.interface"

/* -------------------------------------------------------------------------- */
/*                                 User Domain                                */
/* -------------------------------------------------------------------------- */
// import userDomain from "./user"
const userDomain = {
  getUserList: async (args: IDefaultArgs = {}): Promise<Record<string, any>> => {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(`${process.env.USER_DOMAIN}/list`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  },

  addUser: async (args: IDefaultArgs = {}): Promise<Record<string, any>> => {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(`${process.env.USER_DOMAIN}/create`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  },
}

export default {
  userDomain,
}
