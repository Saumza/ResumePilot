class ApiError extends Error {
    public status: number
    constructor(status: number, message: any) {
        super(message)
        this.status = status
    }
}

export { ApiError }