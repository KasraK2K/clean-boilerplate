// ─── PACKAGES ────────────────────────────────────────────────────────────────
import { Request, Response, NextFunction } from "express"

// ─── MODULES ─────────────────────────────────────────────────────────────────
import Controller from "../../base/Controller"
import { service } from "./module"

class PortalUserController extends Controller {
  /**
   * Get all portal_users
   */
  public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    await super.handle(service.list, req.body, req, res, next)
  }

  /**
   * Get current portal_user by token.id in res.locals.tokenData.id
   */
  public async profile(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = res.locals.tokenData
    await super.handle(service.profile, id, req, res, next)
  }

  /**
   * Create new portal_user if req.body.id not found or Update existing portal_user if found req.body.id
   */
  public async upsert(req: Request, res: Response, next: NextFunction): Promise<void> {
    await super.handle(service.upsert, req.body, req, res, next)
  }

  /**
   * Archive portal_user and set is_archive = true and archived_at = NOW()
   */
  public async archive(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.body
    await super.handle(service.archive, id, req, res, next)
  }

  /**
   * Restore portal_user and set is_archive = false and archived_at = null
   */
  public async restore(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.body
    await super.handle(service.restore, id, req, res, next)
  }

  /**
   * Toggle portal_user is_admin
   */
  public async toggle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.body
    await super.handle(service.toggle, id, req, res, next)
  }

  /**
   * Permanently delete portal_user
   */
  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const args = req.body.id
    await super.handle(service.delete, args, req, res, next)
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password, reseller_id } = req.body
    await super.handle(service.login, { email, password, reseller_id }, req, res, next)
  }

  /**
   * Refresh token if secret is valid
   * You should send valid token by type refresh and secret that created using
   * crypto-js encoded string `${portal_user.id}--${portal_user.email}`
   */
  public async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { refresh_token, secret } = req.body
    await super.handle(service.login, { refresh_token, secret }, req, res, next)
  }

  /**
   * Forgot password send email to portal_user that contain change password link
   */
  public async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body
    await super.handle(service.forgotPassword, email, req, res, next)
  }

  /**
   * Reset password get secret and new password
   * Secret should created by forgot password and frontend get and send it to me
   * Secret is crypto-js encoded string `${portal_user.id}--${portal_user.email}`
   */
  public async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { secret, password } = req.body
    await super.handle(service.resetPassword, { secret, password }, req, res, next)
  }
}

export default new PortalUserController()
