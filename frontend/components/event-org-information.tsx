import React from "react"
import Image from "next/image"
import {
  MailIcon,
  MailboxIcon,
  MailsIcon,
  SendIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react"
import { type Organization } from "#/lib/model"
import { getStrapiURL } from "#/lib/api-helpers"
import { Card, CardContent, CardDescription } from "./ui/card"
import { getUserInitials } from "#/lib/utils"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { IconMail, IconTelegram } from "./ui/icons"

export function EventOrgInformation({
  organization,
}: {
  organization: Organization | null
}) {
  if (!organization) {
    return null
  }

  const imageUrl =
    organization.attributes.logo.data.attributes.previewUrl ??
    organization.attributes.logo.data.attributes.url

  const hasAnySocialMedia =
    !!organization.attributes.telegram_url ||
    !!organization.attributes.mail ||
    !!organization.attributes.twitter_url

  return (
    <Card>
      <div className="flex flex-col">
        <CardContent className="pt-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              {!!imageUrl ? (
                <Image
                  src={getStrapiURL(imageUrl)}
                  className="aspect-square h-full rounded"
                  height={32}
                  width={32}
                  objectFit="fill"
                  alt={`Organization image for ${organization.attributes.title}`}
                />
              ) : (
                <Avatar>
                  <AvatarFallback className="bg-gray-500 text-white">
                    {getUserInitials(organization.attributes.title)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-xs text-gray-500">Hosted by</p>
                <div className="truncate font-medium">
                  {organization.attributes.title}
                </div>
              </div>
            </div>

            {!!organization.attributes.introduce && (
              <div>
                <CardDescription>
                  {organization.attributes.introduce}
                </CardDescription>
              </div>
            )}

            {hasAnySocialMedia && (
              <div className="mx-[-.375rem] -mt-2 flex items-center">
                {!!organization.attributes.mail && (
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href={`mailto:${organization.attributes.mail}`}
                        target="_blank"
                      >
                        <Button
                          variant="link"
                          size="icon-small"
                          className="hover:text-primary group text-gray-400 transition-colors"
                        >
                          <IconMail className="h-4 w-4" />
                        </Button>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{organization.attributes.mail}</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {!!organization.attributes.twitter_url && (
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href={organization.attributes.twitter_url}
                        target="_blank"
                      >
                        <Button
                          variant="link"
                          size="icon-small"
                          className="hover:text-primary text-gray-400 transition-colors"
                        >
                          <TwitterIcon
                            fill="currentColor"
                            className="h-4 w-4"
                          />
                        </Button>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{organization.attributes.twitter_url}</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {!!organization.attributes.telegram_url && (
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href={organization.attributes.telegram_url}
                        target="_blank"
                      >
                        <Button
                          variant="link"
                          size="icon-small"
                          className="hover:text-primary text-gray-400 transition-colors"
                        >
                          <IconTelegram className="h-4 w-4" />
                        </Button>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{organization.attributes.telegram_url}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
