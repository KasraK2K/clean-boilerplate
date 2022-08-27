export interface IMailGunData {
  from?: string
  to: string[]
  subject: string
  text: string
  html: string
}
