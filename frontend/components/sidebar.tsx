"use client"

import React, { useState } from "react"
import { Card } from "./ui/card"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { type EventTag } from "#/lib/model"
import { cn } from "#/lib/utils"

export interface SidebarProps {
  tags: EventTag[]
  tag?: string
}

const ALL_TAG = "all"

export function Sidebar({ tags, tag }: SidebarProps) {
  const [selectedTag, setSelectedTag] = useState(tag ?? ALL_TAG)
  const handleTagChange = (x: string) => {
    setSelectedTag(x)
    const url = new URL(location.href)
    // TODO: Clear search params
    if (x === ALL_TAG) {
      location.href = url.origin
      return
    }

    if (url.searchParams.get("tag")) {
      url.searchParams.delete("tag")
    }
    url.searchParams.append("tag", x)
    location.href = url.href
  }

  return (
    <div className="sticky top-0 max-h-screen px-4">
      <div className="w-[260px]">
        <Card>
          <div className="px-4 py-2">
            <b className="font-bold">Filter</b>
          </div>
          <hr />
          <div className="flex flex-col p-4">
            <RadioGroup defaultValue={tag ?? ALL_TAG} onValueChange={handleTagChange}>
              <div className="group flex cursor-pointer items-center justify-between">
                <Label
                  htmlFor={ALL_TAG}
                  className={cn(
                    "hover:text-primary flex-1 cursor-pointer text-base font-normal transition-colors",
                    selectedTag === ALL_TAG ? "text-primary" : "text-gray-400"
                  )}
                >
                  All Events
                </Label>
                <RadioGroupItem
                  value={ALL_TAG}
                  id={ALL_TAG}
                  className="group-hover:border-primary"
                  checked={selectedTag === ALL_TAG}
                />
              </div>
              {!!tags?.length &&
                tags.map((x) => (
                  <div
                    className="group flex cursor-pointer items-center justify-between"
                    key={x.id}
                  >
                    <Label
                      htmlFor={x.id.toString()}
                      className={cn(
                        "hover:text-primary flex-1 cursor-pointer text-base font-normal transition-colors",
                        selectedTag === x.attributes.title
                          ? "text-primary"
                          : "text-gray-400"
                      )}
                    >
                      {x.attributes.title}
                    </Label>
                    <RadioGroupItem
                      value={x.attributes.title}
                      id={x.id.toString()}
                      className="group-hover:border-primary"
                    />
                  </div>
                ))}
            </RadioGroup>
          </div>
        </Card>
      </div>
    </div>
  )
}
