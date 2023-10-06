import { Events } from "#/components/events"
import { Sidebar } from "#/components/sidebar"
import { SiteHeader } from "#/components/site-header"
import { fetchAPI } from "#/lib/fetch-api"
import type { HackerHouseEvent, EventTag } from "#/lib/model"
import QueryString from "qs"
import React from "react"

interface HomeProps {
  searchParams: {
    tag?: string
  }
}

export default async function Home({ searchParams: { tag } }: HomeProps) {
  const query = QueryString.stringify(
    {
      populate: "*",
      filters: {
        event_tags: {
          title: {
            $containsi: tag,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )
  const { data: events } = await fetchAPI<HackerHouseEvent[]>(
    `/events?${query}`
  )
  const { data: eventTags } = await fetchAPI<EventTag[]>("/event-tags")

  return (
    <>
      <SiteHeader />
      <main className="ghh-container">
        <div className="flex min-h-screen flex-row-reverse gap-6 py-12">
          <Sidebar tag={tag} tags={eventTags} />

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex justify-between">
              <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Events
              </h2>
            </div>
            <Events data={events} />
          </div>
        </div>
      </main>
    </>
  )
}
