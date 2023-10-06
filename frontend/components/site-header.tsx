"use client"

import React from "react"
// import { UserMenu } from "./user-menu"
// import { GithubLoginButton } from "./github-login-button"
import Link from "next/link"
import { cn } from "#/lib/utils"
// import { LOCAL_USER_KEY } from "#/lib/session"
// import { useLocalStorage } from "@react-hooks-library/core"
// import { ConnectButton } from "@rainbow-me/rainbowkit"

export function SiteHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  // const [user] = useLocalStorage(LOCAL_USER_KEY)

  return (
    <header
      {...props}
      className={cn("z-40", "bg-transparent", props.className)}
    >
      <div className="container">
        <div className="flex h-20 items-center justify-between py-6">
          <Link href="/" className="text-lg font-semibold">
            Hacker House List
          </Link>
          {/* {user ? <UserMenu user={user} /> : <GithubLoginButton />} */}
        </div>
      </div>
    </header>
  )
}
