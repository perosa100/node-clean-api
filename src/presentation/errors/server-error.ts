export class ServerError extends Error {
  constructor () {
    super('Interval server error, again')
    this.name = 'ServerError'
  }
}
