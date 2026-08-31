class PermanentError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "Permanent Error"
    }
}

export { PermanentError }