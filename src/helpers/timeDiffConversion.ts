export const timeDiff = (dateString: string) => {

    const now: any = Date.now()
    const old: any = new Date(dateString)

    const diffInMs = now - old

    const diffInHrs = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    const diffInMins = Math.floor(diffInMs / (1000 * 60))

    if (diffInMins < 1) {
        return `Just Now`
    }
    else if (diffInMins < 60) {
        return `${diffInMins}m ago`
    }
    else if (diffInHrs < 24) {
        return `${diffInHrs}hr ago`
    }
    else if (diffInDays <= 30) {
        return `${diffInDays}d ago`
    }
    else {
        return old.toLocaleDateString("en-in", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
    }
}