export class AppError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status

    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, AppError.prototype)
  }
}
