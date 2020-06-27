export class ServerError extends Error {
  constructor (stack: string) {
    super('Interval server error, again')
    this.name = 'ServerError'
    this.stack = stack
  }
}
