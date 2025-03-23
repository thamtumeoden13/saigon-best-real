"use client"

import { useState } from "react"
import { ArrowDown, ArrowUpDown, Eye, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ApproveAccountDialog, DenyAccountDialog } from "@/components/ui/confirmation-dialogs"

type RegistrationRequest = {
  id: string
  name: string
  email: string
  dateJoined: string
  universityIdNo: string
  avatarUrl?: string
}

export default function AccountRegistrationRequests() {
  const [requests, setRequests] = useState<RegistrationRequest[]>([
    {
      id: "1",
      name: "Darrell Steward",
      email: "darrellsteward@gmail.com",
      dateJoined: "Dec 19 2023",
      universityIdNo: "90324423789",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Marc Atenson",
      email: "marcinee@mial.com",
      dateJoined: "Dec 19 2023",
      universityIdNo: "45641243423",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Susan Drake",
      email: "contact@susandrake.io",
      dateJoined: "Dec 19 2023",
      universityIdNo: "78318342289",
    },
  ])

  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<RegistrationRequest | null>(null)
  const [denyDialogOpen, setDenyDialogOpen] = useState(false)
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)

  const handleApproveAccount = () => {
    if (selectedRequestId) {
      // In a real app, you would call an API to approve the account
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== selectedRequestId))
      setApproveDialogOpen(false)
      setSelectedRequestId(null)
      setSelectedUser(null)
    }
  }

  const handleRejectAccount = () => {
    if (selectedRequestId) {
      // In a real app, you would call an API to reject the account
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== selectedRequestId))
      setDenyDialogOpen(false)
      setSelectedRequestId(null)
      setSelectedUser(null)
    }
  }

  const openApproveDialog = (request: RegistrationRequest) => {
    setSelectedRequestId(request.id)
    setSelectedUser(request)
    setApproveDialogOpen(true)
  }

  const openDenyDialog = (request: RegistrationRequest) => {
    setSelectedRequestId(request.id)
    setSelectedUser(request)
    setDenyDialogOpen(true)
  }

  return (
    <div className="w-full bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Account Registration Requests</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-700">
            Oldest to Recent
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead>University ID No</TableHead>
              <TableHead>University ID Card</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      {request.avatarUrl ? (
                        <AvatarImage src={request.avatarUrl} alt={request.name} />
                      ) : (
                        <AvatarFallback className="bg-blue-100 text-blue-500">
                          {request.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{request.name}</span>
                      <span className="text-sm text-muted-foreground">{request.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{request.dateJoined}</TableCell>
                <TableCell>{request.universityIdNo}</TableCell>
                <TableCell>
                  <Button variant="link" className="text-blue-500 p-0 h-auto flex items-center">
                    <Eye className="mr-1 h-4 w-4" />
                    View ID Card
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="bg-green-50 text-green-600 border-green-100 hover:bg-green-100 hover:text-green-700"
                      onClick={() => openApproveDialog(request)}
                    >
                      Approve Account
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 h-8 w-8 rounded-full border border-red-100"
                      onClick={() => openDenyDialog(request)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {requests.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No pending registration requests.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      <DenyAccountDialog
        open={denyDialogOpen}
        onOpenChange={setDenyDialogOpen}
        onConfirm={handleRejectAccount}
        studentName={selectedUser?.name}
      />

      <ApproveAccountDialog
        open={approveDialogOpen}
        onOpenChange={setApproveDialogOpen}
        onConfirm={handleApproveAccount}
        studentName={selectedUser?.name}
        avatars={[
          { initials: "R", color: "indigo" },
          { initials: "Y", color: "green" },
        ]}
      />
    </div>
  )
}

