import { type HackerHouseEvent } from "#/lib/model"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
// import { RegistrationCard } from "./registration-card"
import { GhostIcon, TextIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { getUserInitials } from "#/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

export function EventBottomSection({ event }: { event: HackerHouseEvent }) {
  const approvedHackers = event.attributes.applies?.data.filter(
    (x) => x.attributes.status === "approved"
  )

  return (
    <div className="mt-4 flex flex-col gap-4 md:flex-row">
      <div className="flex flex-1 flex-col gap-4">
        {/* <RegistrationCard event={event} /> */}

        <Card>
          <div className="flex flex-col">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2">
                <TextIcon /> About
              </CardTitle>
            </CardHeader>

            <CardContent style={{ wordBreak: "break-word" }}>
              {event.attributes.introduce ?? 'This event has no description'}
            </CardContent>
          </div>
        </Card>
      </div>

      <div className="flex flex-col md:w-[320px]">
        <Card>
          <div className="flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="inline-flex items-center gap-2">
                <GhostIcon /> People
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-4">
              <h4 className="font-medium">
                {approvedHackers?.length ?? 0} Hackers
              </h4>

              {!!approvedHackers?.length && (
                <div className="mt-2 flex gap-2">
                  {approvedHackers.map((hacker) => (
                    <div
                      className="flex max-w-[3rem] flex-col gap-2"
                      key={`hacker-col ${hacker.id}`}
                    >
                      <Tooltip>
                        <TooltipTrigger className="cursor-default">
                          <Avatar className="h-6 w-6 text-xs">
                            {/* <AvatarImage
                                src={
                                  hacker.attributes.image?.data.attributes
                                    .formats.thumbnail?.url
                                }
                                alt={`@${hacker.attributes.username}`}
                              /> */}
                            <AvatarFallback>
                              {getUserInitials(hacker.attributes.name)}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{hacker.attributes.name}</p>
                        </TooltipContent>
                      </Tooltip>

                      <p className="truncate text-xs text-gray-600">
                        {hacker.attributes.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  )
}
