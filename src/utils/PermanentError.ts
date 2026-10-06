import { UnrecoverableError } from "bullmq"

class PermanentError extends UnrecoverableError {  //unrecoverableError moves the task directly to the failed set without retrying! Basically discarding the task!
    constructor(message: string) {
        super(message)
        this.name = "Permanent Error"
    }
}

export { PermanentError }