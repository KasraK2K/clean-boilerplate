export interface ISmsBody {
  from?: string
  body: string
  to: string[]
}

export interface ISmsResponse {
  accountSid: string
  apiVersion: string
  body: string
  dateCreated: string
  dateSent: string
  dateUpdated: string
  direction: string
  errorCode: null
  errorMessage: null
  from: string
  messagingServiceSid: string
  numMedia: string
  numSegments: string
  price: null
  priceUnit: null
  sid: string
  status: string
  subresourceUris: {
    media: string
  }
  to: string
  uri: string
}

export interface ISmsError {
  status: number
  code: number
  moreInfo: string
}
