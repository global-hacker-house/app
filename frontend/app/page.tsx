import { HackerHouseEvents } from "#/components/hacker-house-events"
import { HackerHouses } from "#/components/hacker-houses"
import { SiteHeader } from "#/components/site-header"
import { fetchAPI } from "#/lib/fetch-api"
import type { HackerHouseEvent, HackerHouse, MediaData } from "#/lib/model"
import React from "react"

interface ApiOrganization {
  id: number
  attributes: {
    title: string
    description?: string
    logo: {
      data: MediaData
    }
  }
}

const getHackerHouses = async () => {
  const res = await fetchAPI<ApiOrganization[]>("/organizations?populate=*")
  return {
    ...res,
    data: res.data?.map(
      (x) =>
        ({
          title: x.attributes.title as string,
          description: x.attributes.description as string,
          id: x.id,
          avatar: x.attributes.logo.data?.attributes.formats.thumbnail?.url,
        }) satisfies HackerHouse
    ),
  }
}

const getHackerHouseEvents = async () => {
  return await fetchAPI<HackerHouseEvent[]>("/events?populate=*")
}

export default async function Home() {
  const { data: houses } = await getHackerHouses()
  const { data: events } = await getHackerHouseEvents()

  return (
    <>
      <SiteHeader />
      <main className="container">
        <div className="flex min-h-screen flex-col space-y-12 py-12">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Hacker House
              </h2>
            </div>
            <HackerHouses data={houses} />
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between">
              <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Hacker House Events
              </h2>
            </div>
            <HackerHouseEvents data={events} />
          </div>
        </div>
      </main>
    </>
  )
}
