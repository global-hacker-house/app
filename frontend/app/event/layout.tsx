import { SiteHeader } from "#/components/site-header"
import { type PropsWithChildren } from "react"

export default function EventLayout({ children }: PropsWithChildren) {
  return (
    <>
      <SiteHeader className="bg-muted" />
      <div className="bg-muted min-h-screen">{children}</div>
    </>
  )
}
