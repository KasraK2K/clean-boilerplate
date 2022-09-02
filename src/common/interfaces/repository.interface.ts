export interface IExecuteQueryOptions {
  query: string
  parameters?: any[]
  omits?: string[]
}

export interface IExecuteOptions {
  omits?: string[]
}

export interface IQueryGenerator {
  query: string
  parameters: any[]
}
