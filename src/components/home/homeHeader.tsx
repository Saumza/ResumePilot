'use client'

import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import React from 'react'

export function HomeHeader() {

    const { data: session, status } = useSession()
    const user: User = session?.user as User

    return (
        <div>
            <h1 className="heading-1 text-foreground text-4xl font-semibold">What's Up, {status === "loading" ? "" : user.name}</h1>
            <p className="mt-2 text-muted">Here's what your current updates look.</p>
        </div>
    )
}

