//======================================================================================================
//
//  ##   ##   ####  #####  #####           ####   #####   ##     ##  ##     ##  #####   ####  ######
//  ##   ##  ##     ##     ##  ##         ##     ##   ##  ####   ##  ####   ##  ##     ##       ##
//  ##   ##   ###   #####  #####          ##     ##   ##  ##  ## ##  ##  ## ##  #####  ##       ##
//  ##   ##     ##  ##     ##  ##         ##     ##   ##  ##    ###  ##    ###  ##     ##       ##
//   #####   ####   #####  ##   ##         ####   #####   ##     ##  ##     ##  #####   ####    ##
//
//======================================================================================================

import axios from "axios"
import { IDefaultArgs } from "../../common/interfaces/general.interface"

/* -------------------------------------------------------------------------- */
/*                                 User Domain                                */
/* -------------------------------------------------------------------------- */
import connectUser from "../user/user.module"
export default connectUser
/* -------------------------------------------------------------------------- */

// class ConnectUser {
//   public async getUserList(args: IDefaultArgs = {}): Promise<Record<string, any>> {
//     return new Promise(async (resolve, reject) => {
//       await axios
//         .post(`${process.env.USER_DOMAIN}/list`)
//         .then((response) => resolve(response.data))
//         .catch((error) => reject(error))
//     })
//   }

//   public async addUser(args: IDefaultArgs = {}): Promise<Record<string, any>> {
//     return new Promise(async (resolve, reject) => {
//       await axios
//         .post(`${process.env.USER_DOMAIN}/create`)
//         .then((response) => resolve(response.data))
//         .catch((error) => reject(error))
//     })
//   }
// }

// export default new ConnectUser()
