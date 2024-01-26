export interface LoggedUser {
  id: number
  name?: string
  email: string
}

export interface AuthorizerUc {
  isAuthorized: (accessToken: string) => Promise<LoggedUser | boolean>
}
