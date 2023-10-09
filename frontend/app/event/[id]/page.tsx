import { EventBottomSection } from "#/components/event-bottom-section"
import { EventTopCard } from "#/components/event-top-card"
import { fetchAPI } from "#/lib/fetch-api"
import { type Organization, type HackerHouseEvent } from "#/lib/model"

interface EventPageProps {
  params?: { id: string }
}

const getEvent = async (id?: string) => {
  return fetchAPI<HackerHouseEvent>(`/events/${id}?populate=*`)
}

export default async function EventPage({ params }: EventPageProps) {
  const { data: event } = await getEvent(params?.id)
  const { data: organization = null } = event
    ? await fetchAPI<Organization>(
        `/organizations/${event?.attributes?.organization?.data?.id}?populate=*`
      )
    : {}

  if (!event) {
    // Not found
    return null
  }

  return (
    <main className="container">
      <div className="mx-auto max-w-[960px]">
        <EventTopCard event={event} organization={organization} />
        <EventBottomSection event={event} organization={organization} />
      </div>
    </main>
  )
}
