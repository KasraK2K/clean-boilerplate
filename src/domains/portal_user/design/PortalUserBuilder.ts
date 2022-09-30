class PortalUserBuilder {
  constructor(private portal_user: Record<string, any> = {}) {}

  public setName(name: string): this {
    this.portal_user.name = name
    return this
  }

  public setEmail(email: string): this {
    this.portal_user.email = email
    return this
  }

  public build() {
    return this.portal_user
  }
}
