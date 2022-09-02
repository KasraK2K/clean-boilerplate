export interface IDefaultArgs {
  [key: string]: any
}

export interface IPagination {
  limit: number
  page: number
  filter?: IFilter
}

export interface IFilter {
  where?: { field: string; operator: string; value: string }[]
  group?: string[]
  order?: string[]
  is_asc?: boolean
  limit?: number
  page?: number
}
