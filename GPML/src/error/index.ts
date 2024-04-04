class ServerError extends Error {
        readonly status: number

    constructor( message: string , status : number ) {
        super(message)
        this.status = status
    }
}

export { ServerError }