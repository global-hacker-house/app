"use client"

import { type HackerHouseEvent } from "#/lib/model"
import React, { type MouseEvent, useState, type SetStateAction } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { TicketIcon } from "lucide-react"
import { type GitHubUser, LOCAL_JWT_KEY, LOCAL_USER_KEY } from "#/lib/session"
// @ts-expect-error typing errors
import { useLocalStorage } from "@react-hooks-library/core"
import { ReloadIcon } from "@radix-ui/react-icons"
import { getStrapiURL } from "#/lib/api-helpers"
import ky from "ky"
import { UserAvatar } from "./user-avatar"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

export function RegistrationCard({ event }: { event: HackerHouseEvent }) {
  const [user] = useLocalStorage(LOCAL_USER_KEY) as [
    GitHubUser,
    SetStateAction<GitHubUser>,
  ]
  const [jwt] = useLocalStorage(LOCAL_JWT_KEY)
  const apply = event.attributes.applies?.data.find(
    (x) => x.attributes.email === user?.email
  )
  const isWaiting = apply?.attributes.status === "waiting"
  const isApproved = apply?.attributes.status === "approved"
  const hasUserRegistered = !!apply
  const [isLoading, setIsLoading] = useState(false)

  // Form data
  const [introduction, setIntroduction] = useState<string>()

  if (isLoading) {
    return (
      <Card>
        <div className="flex flex-col">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2">
              <TicketIcon /> Registration
            </CardTitle>
          </CardHeader>

          <CardContent className="flex items-center gap-2">
            <ReloadIcon className="h-4 w-4 animate-spin" />
            <p>Sending application...</p>
          </CardContent>
        </div>
      </Card>
    )
  }

  if (hasUserRegistered) {
    return (
      <Card>
        <div className="flex flex-col">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2">
              <UserAvatar user={user} />
              <h4>{user.username},</h4>
              <h4 className="text-orange-400">{isWaiting ? 'is waiting' : isApproved ? 'Wala Pah!' : "I'm sorry" }</h4>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex items-center gap-2">
            <h4 className="text-lg">
              {isWaiting
                ? "Waiting for confirmation, check your email for any further updates."
                : isApproved
                ? "You've been approved to this event!"
                : "Sorry you've been rejected by this event~TAT~"}
            </h4>
          </CardContent>
        </div>
      </Card>
    )
  }

  if (!user) {
    return (
      <Card>
        <div className="flex flex-col">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2">
              <TicketIcon /> Registration
            </CardTitle>
          </CardHeader>

          <CardContent className="flex items-center gap-2">
            <div className="text-red-500">
              Please login to start your registration!
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  const handleRegistration = async (e: MouseEvent) => {
    e.preventDefault()

    if (!user || !jwt || hasUserRegistered || !event) {
      return
    }

    setIsLoading(true)
    try {
      // Create event profile
      const response = await ky.post(getStrapiURL("/api/applies"), {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        json: {
          data: {
            // TODO: instead of sending raw user info, we grap those data in the backend instead
            event: event.id,
            user: user.id,
            name: user.username,
            introduction,
            email: user.email,
          },
        },
      })

      if (response.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card>
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-2">
            <TicketIcon /> Registration
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <p>Join this event for fun!</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button isLoading={isLoading}>Apply</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Your Profile</DialogTitle>

                <DialogDescription>
                  Fill in your profile so we can know you better.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="username"
                    value={user.username}
                    className="col-span-3"
                  />
                </div>

                {/* <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Email <span className="text-gray-600">(optional)</span>
                  </Label>
                  <Input
                    id="email"
                    placeholder={user.email ? `default to ${user.email}` : 'your email address'}
                    value={email}
                    className="col-span-3"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div> */}

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Introduction
                  </Label>
                  <Textarea
                    id="introduction"
                    placeholder="Introduce yourself"
                    value={introduction}
                    className="col-span-3"
                    onChange={(e) => setIntroduction(e.target.value)}
                  />
                </div>
              </div>

              <DialogDescription>
                We will send you the confirmation email after reviewing your
                profile.
              </DialogDescription>
              <DialogFooter>
                <Button onClick={handleRegistration} type="submit">
                  Apply
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </div>
    </Card>
  )
}
