import { type HackerHouseEvent } from "#/lib/model"
import Link from "next/link"
import React from "react"
import { format } from "date-fns"
import { MapPinIcon } from "lucide-react"

import { Card } from "./ui/card"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { getStrapiURL } from "#/lib/api-helpers"
import { getUserInitials } from "#/lib/utils"
import { Badge } from "./ui/badge"
import Image from "next/image"

interface EventsProps {
  data: HackerHouseEvent[]
}

export function Events({ data }: EventsProps) {
  return (
    <div className="mt-4 space-y-6">
      {data?.map((x) => {
        const hasCover = !!x.attributes.post?.data?.[0]?.attributes?.url

        return (
          <Card
            className="min-w-0 flex-1 border-transparent transition-all hover:border-border hover:shadow-sm"
            key={x.attributes.title}
          >
            <Link href={`/event/${x.id}`}>
              <div className="flex h-full flex-col space-y-4 p-4">
                <div className="flex flex-row-reverse gap-4">
                  <div className="pointer-events-none">
                    <div className="w-[200px]">
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-50/5 pb-[50%]">
                        {hasCover ? (
                          <Image
                            src={getStrapiURL(
                              x.attributes.post?.data?.[0].attributes.url
                            )}
                            sizes="(max-width: 450px) 360px, (max-width: 820px) 140px, (max-width: 1000px) 160px, 200px"
                            loading="lazy"
                            alt={`Cover image for ${x.attributes.title}`}
                            fetchPriority="auto"
                            objectFit="contain"
                            fill
                          />
                        ) : (
                          <Avatar>
                            <AvatarFallback className="bg-gray-500 text-white">
                              {getUserInitials(x.attributes.title)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <p className="text-slate-500">
                      {format(new Date(x.attributes.start_time), "yyyy MMM dd, p")}
                    </p>
                    <div className="text-xl">
                      <h3 className="inline break-words font-medium text-gray-900">
                        {x.attributes.title}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-500">
                        <p>{x.attributes.introduce ?? "no description"}</p>
                      </div>

                      {!!x.attributes.address && (
                        <div className="flex items-center gap-2 text-slate-500">
                          <MapPinIcon className="h-4 w-4" />{" "}
                          <p>{x.attributes.address}</p>
                        </div>
                      )}

                      {!!x.attributes.event_tags?.data?.length && (
                        <div className="flex gap-1 !pt-1">
                          {x.attributes.event_tags.data.map((x) => (
                            <Badge>{x.attributes.title}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        )
      })}
    </div>
  )
}
