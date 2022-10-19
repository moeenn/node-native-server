export class Exception extends Error {
  public details: unknown
  public status: number

  constructor(message: string, details: unknown, status = 500) {
    super(message)

    this.details = details
    this.status = status
  }
}
