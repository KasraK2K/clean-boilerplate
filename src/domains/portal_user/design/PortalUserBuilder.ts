class PortalUserBuilder {
  constructor(private user: Record<string, any> = {}) {}

  public setName(name: string): this {
    this.user.name = name
    return this
  }

  public setEmail(email: string): this {
    this.user.email = email
    return this
  }

  public build() {
    return this.user
  }
}
