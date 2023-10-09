import React from "react"
import Image from "next/image"
import { format } from "date-fns"
import { getStrapiURL } from "#/lib/api-helpers"
import { getUserInitials } from "#/lib/utils"
import { type Organization, type HackerHouseEvent } from "#/lib/model"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { CalenderCard } from "./ui/calender-card"
import { Card } from "./ui/card"
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip"

export function EventTopCard({
  event,
  organization,
}: {
  event: HackerHouseEvent
  organization?: Organization | null
}) {
  const hasCover = !!event.attributes.post?.data?.[0]?.attributes?.url

  return (
    <Card className="col-span-4 rounded-xl bg-card text-card-foreground">
      <div className="flex flex-col space-y-1.5 p-2">
        <div className="relative flex w-full shrink items-center justify-center rounded-md bg-gray-200 py-[25%]">
          {hasCover ? (
            <Image
              src={getStrapiURL(event.attributes.post!.data[0].attributes.url)}
              className="w-full"
              layout="fill"
              objectFit="contain"
              alt={`Cover of ${event.attributes.title}`}
            />
          ) : (
            <Avatar>
              <AvatarFallback className="bg-gray-500 text-white">
                {getUserInitials(event.attributes.title)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className="p-4">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            {event.attributes.title}
          </h2>
          {!!organization && (
            <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger className="cursor-default">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={getStrapiURL(
                        organization.attributes.logo?.data?.attributes.formats
                          .thumbnail?.url
                      )}
                      alt={`@${organization.attributes.title}`}
                    />
                    <AvatarFallback className="text-xs">
                      {getUserInitials(organization.attributes.title)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{organization.attributes.title}</p>
                </TooltipContent>
              </Tooltip>

              <p className="text-gray-500">
                Hosted by {organization.attributes.title}
              </p>
            </div>
          )}

          <div className="mt-6 flex">
            <div className="flex items-center space-x-4">
              <CalenderCard />
              <div className="flex flex-col">
                <p className="font-medium">
                  {format(
                    new Date(event.attributes.start_time),
                    "EEEE, MMMM d"
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(
                    new Date(event.attributes.start_time),
                    "yyyy MMM dd, p"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
