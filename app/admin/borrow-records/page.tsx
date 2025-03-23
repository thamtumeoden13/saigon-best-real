"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowDown, ArrowUpDown, Check, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"

type BookRequest = {
  id: string
  bookTitle: string
  bookCover: string
  userName: string
  userEmail: string
  userAvatar?: string
  status: "Borrowed" | "Returned" | "Late Return"
  borrowedDate: string
  returnDate: string
  dueDate: string
}

export default function BorrowBookRequests() {
  const [requests, setRequests] = useState<BookRequest[]>([
    {
      id: "1",
      bookTitle: "The Great Reclamation: A Novel by",
      bookCover: "/placeholder.svg?height=60&width=45",
      userName: "Darrell Steward",
      userEmail: "steward@gmail.com",
      userAvatar: "/placeholder.svg?height=40&width=40",
      status: "Borrowed",
      borrowedDate: "Dec 19 2023",
      returnDate: "Dec 29 2023",
      dueDate: "Dec 31 2023",
    },
    {
      id: "2",
      bookTitle: "Inside Evil: Inside Evil Series, Book 1",
      bookCover: "/placeholder.svg?height=60&width=45",
      userName: "Marc Atenson",
      userEmail: "marcinee@mial.com",
      userAvatar: "/placeholder.svg?height=40&width=40",
      status: "Late Return",
      borrowedDate: "Dec 21 2024",
      returnDate: "Jan 17 2024",
      dueDate: "Jan 12 2024",
    },
    {
      id: "3",
      bookTitle: "Jayne Castle - People in Glass Houses",
      bookCover: "/placeholder.svg?height=60&width=45",
      userName: "Susan Drake",
      userEmail: "contact@susandrake.io",
      userAvatar: "",
      status: "Returned",
      borrowedDate: "Dec 31 2023",
      returnDate: "Jan 15 2023",
      dueDate: "Jan 25 2023",
    },
    {
      id: "4",
      bookTitle: "The Great Reclamation: A Novel by",
      bookCover: "/placeholder.svg?height=60&width=45",
      userName: "David Smith",
      userEmail: "davide@yahoo.com",
      userAvatar: "/placeholder.svg?height=40&width=40",
      status: "Borrowed",
      borrowedDate: "Dec 19 2023",
      returnDate: "Dec 29 2023",
      dueDate: "Dec 31 2023",
    },
  ])

  const handleStatusChange = (requestId: string, newStatus: "Borrowed" | "Returned" | "Late Return") => {
    setRequests((prevRequests) =>
      prevRequests.map((request) => (request.id === requestId ? { ...request, status: newStatus } : request)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Borrowed":
        return "text-indigo-600 bg-indigo-50"
      case "Returned":
        return "text-blue-600 bg-blue-50"
      case "Late Return":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="w-full bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Borrow Book Requests</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center mr-4">
            <Avatar className="h-8 w-8 border">
              <AvatarFallback className="bg-indigo-100 text-indigo-600">R</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border -ml-2">
              <AvatarFallback className="bg-green-100 text-green-600">A</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border -ml-2">
              <AvatarFallback className="bg-yellow-100 text-yellow-600">Y</AvatarFallback>
            </Avatar>
          </div>
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
              <TableHead className="w-[250px]">Book</TableHead>
              <TableHead className="w-[250px]">User Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Borrowed date</TableHead>
              <TableHead>Return date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={request.bookCover || "/placeholder.svg"}
                      alt={request.bookTitle}
                      width={45}
                      height={60}
                      className="rounded-sm object-cover"
                    />
                    <span className="font-medium line-clamp-1">{request.bookTitle}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      {request.userAvatar ? (
                        <AvatarImage src={request.userAvatar} alt={request.userName} />
                      ) : (
                        <AvatarFallback className="bg-blue-100 text-blue-500">
                          {request.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{request.userName}</span>
                      <span className="text-sm text-muted-foreground">{request.userEmail}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className={`px-4 py-1 h-auto font-medium ${getStatusColor(request.status)}`}
                      >
                        {request.status}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[180px]">
                      <DropdownMenuRadioGroup
                        value={request.status}
                        onValueChange={(value) =>
                          handleStatusChange(request.id, value as "Borrowed" | "Returned" | "Late Return")
                        }
                      >
                        <DropdownMenuRadioItem value="Borrowed" className="text-indigo-600">
                          Borrowed
                          {request.status === "Borrowed" && <Check className="ml-auto h-4 w-4" />}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Returned" className="text-blue-600">
                          Returned
                          {request.status === "Returned" && <Check className="ml-auto h-4 w-4" />}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Late Return" className="text-red-600">
                          Late Return
                          {request.status === "Late Return" && <Check className="ml-auto h-4 w-4" />}
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>{request.borrowedDate}</TableCell>
                <TableCell>{request.returnDate}</TableCell>
                <TableCell>{request.dueDate}</TableCell>
                <TableCell>
                  <Button variant="link" className="text-blue-500 p-0 h-auto flex items-center">
                    <FileText className="mr-1 h-4 w-4" />
                    Generate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

