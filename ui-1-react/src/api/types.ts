export type Headers = Record<string, string | undefined>

export interface RequestProps {
  route: string,
  params?: Record<string, string | number>,
  headers?: Headers,
}

export interface GeneralRequestProps extends RequestProps {
  method?: 'get' | 'post'
}