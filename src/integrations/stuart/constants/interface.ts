import { StuartWebhookEvent, StuartWebhookType } from ".."

export interface IStuartDropoffs {
  package_type: string
  address: string
  comment?: string
  contact?: IContact
}

export interface IStuartPickups {
  address: string
  comment?: string
  contact?: IContact
}

export interface IContact {
  firstname?: string
  lastname?: string
  phone?: string
  email?: string
  company?: string
}

export interface IStuartJob {
  transport_type?: string
  pickup_at?: string
  pickups: IStuartPickups[]
  dropoffs: IStuartDropoffs[]
  assignment_code?: string
}

export interface IWebhookBody {
  event: StuartWebhookEvent
  type: StuartWebhookType
  data: Record<string, any>
}
