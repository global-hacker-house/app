import React from "react"
import Script from "next/script"

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID

export function Analytics() {
  return (
    <div>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
      />
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GTAG_ID}');
      `}
      </Script>
    </div>
  )
}
