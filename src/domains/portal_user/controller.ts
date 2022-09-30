// ─── MODULES ─────────────────────────────────────────────────────────────────
import Controller from "../../base/Controller"
import { Request, Response } from "express"
import { addMetaData } from "../../common/helpers/addMetaData.helper"
import { service } from "./module"
import { IControllerResponse } from "../../common/interfaces/response.interface"

class PortalUserController extends Controller {
  /**
   * Get all portal_users
   */
  public async list(req: Request, res: Response): IControllerResponse {
    return await service
      .list(req.body)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Get current portal_user by token.id in res.locals.tokenData.id
   */
  public async profile(req: Request, res: Response): IControllerResponse {
    return await service
      .profile(res.locals.tokenData.id)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Create new portal_user if req.body.id not found or Update existing portal_user if found req.body.id
   */
  public async upsert(req: Request, res: Response): IControllerResponse {
    return await service
      .upsert(req.body)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Archive portal_user and set is_archive = true and archived_at = NOW()
   */
  public async archive(req: Request, res: Response): IControllerResponse {
    const { id } = req.body
    return await service
      .archive(id)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Restore portal_user and set is_archive = false and archived_at = null
   */
  public async restore(req: Request, res: Response): IControllerResponse {
    const { id } = req.body
    return await service
      .restore(id)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Toggle user is_admin
   */
  public async toggle(req: Request, res: Response): IControllerResponse {
    const { id } = req.body
    return await service
      .toggle(id)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Permanently delete portal_user
   */
  public async delete(req: Request, res: Response): IControllerResponse {
    const { id } = req.body
    return await service
      .delete(id)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  public async login(req: Request, res: Response): IControllerResponse {
    const { email, password, reseller_id } = req.body
    return await service
      .login({ email, password, reseller_id })
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Refresh token if secret is valid
   * You should send valid token by type refresh and secret that created using
   * crypto-js encoded string `${user.id}--${user.email}`
   */
  public async refreshToken(req: Request, res: Response): IControllerResponse {
    const { refresh_token, secret } = req.body
    return await service
      .refreshToken({ refresh_token, secret })
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Forgot password send email to user that contain change password link
   */
  public async forgotPassword(req: Request, res: Response): IControllerResponse {
    const { email } = req.body
    return await service
      .forgotPassword(email)
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }

  /**
   * Reset password get secret and new password
   * Secret should created by forgot password and frontend get and send it to me
   * Secret is crypto-js encoded string `${user.id}--${user.email}`
   */
  public async resetPassword(req: Request, res: Response): IControllerResponse {
    const { secret, password } = req.body
    return await service
      .resetPassword({ secret, password })
      .then((result) => addMetaData(req, res, { ...result }))
      .catch((err) => addMetaData(req, res, { ...err }))
  }
}

export default new PortalUserController()
