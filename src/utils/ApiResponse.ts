class ApiResponse {
    public status: number
    public data: any
    public message: string
    constructor(status: number, data: any, message: string) {
        this.status = status
        this.data = data
        this.message = message
    }
}

export { ApiResponse }