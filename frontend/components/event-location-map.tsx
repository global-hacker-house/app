"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { type HackerHouseEvent } from "#/lib/model"
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { GhostIcon, MapIcon, MapPinIcon } from "lucide-react"

const AMAP_KEY = process.env.NEXT_PUBLIC_AMAP_KEY!

export function EventLocationMap({
  event,
}: {
  event: HackerHouseEvent | null
}) {
  const [geoPoi, setGeoPoi] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const address = event?.attributes?.address

  useEffect(() => {
    setMounted(true)

    if (!address) {
      return
    }

    ;(async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://restapi.amap.com/v5/place/text?keywords=${address}&key=${AMAP_KEY}`
        )
        const { pois } = await res.json()
        if (pois?.[0]) {
          setGeoPoi(pois[0].location)
        }
      } catch {}
      setLoading(false)
    })()
  }, [address])

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="inline-flex items-center gap-2">
          <MapPinIcon className="h-4 w-4" /> Location
        </CardTitle>
      </CardHeader>

      {!!geoPoi ? (
        <Image
          src={`https://restapi.amap.com/v3/staticmap?location=${geoPoi}&zoom=12&key=${AMAP_KEY}`}
          alt={`Address location of ${event?.attributes.title}`}
          width={0}
          height={200}
          sizes="100vw"
          className="w-full"
        />
      ) : loading ? (
        <div className="bg-muted-foreground h-[200px] w-full animate-pulse" />
      ) : (
        null
      )}

      <CardFooter className="mt-3 font-medium">{event?.attributes.address}</CardFooter>
    </Card>
  )
}
