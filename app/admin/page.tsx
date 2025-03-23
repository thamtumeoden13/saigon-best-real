"use client"
import Image from "next/image"
import { Search, Plus, Calendar, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-slate-50">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600 font-medium">Borrowed Books</h3>
              <div className="flex items-center text-amber-500">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span>2</span>
              </div>
            </div>
            <p className="text-3xl font-bold">145</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600 font-medium">Total Users</h3>
              <div className="flex items-center text-green-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>4</span>
              </div>
            </div>
            <p className="text-3xl font-bold">317</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600 font-medium">Total Books</h3>
              <div className="flex items-center text-green-500">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>2</span>
              </div>
            </div>
            <p className="text-3xl font-bold">163</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Borrow Requests */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Borrow Requests</h2>
            <Button variant="link" className="text-indigo-600">
              View all
            </Button>
          </div>
          <Card className="bg-white">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
              <div className="mb-4">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="No requests"
                  width={100}
                  height={100}
                  className="opacity-30"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Pending Book Requests</h3>
              <p className="text-gray-500 text-sm">
                There are no borrow book requests awaiting your review at this time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recently Added Books */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recently Added Books</h2>
            <Button variant="link" className="text-indigo-600">
              View all
            </Button>
          </div>
          <Card className="bg-white">
            <CardContent className="p-6">
              <Button variant="outline" className="w-full mb-6 text-gray-600 border-dashed border-2">
                <Plus className="h-4 w-4 mr-2" />
                Add New Book
              </Button>

              <div className="space-y-4">
                {[
                  {
                    title: "The Great Reclamation: A Novel by Rachel Heng",
                    author: "Rachel Heng",
                    genre: "Strategic, Fantasy",
                    date: "12/01/24",
                    cover: "/placeholder.svg?height=60&width=45",
                  },
                  {
                    title: "Inside Evil: Inside Evil Series, Book 1",
                    author: "Rachel Heng",
                    genre: "Strategic, Fantasy",
                    date: "12/01/24",
                    cover: "/placeholder.svg?height=60&width=45",
                  },
                  {
                    title: "Jayne Castle - People in Glass Houses",
                    author: "Rachel Heng",
                    genre: "Strategic, Fantasy",
                    date: "12/01/24",
                    cover: "/placeholder.svg?height=60&width=45",
                  },
                  {
                    title: "The Great Reclamation: A Novel by Rachel Heng",
                    author: "Rachel Heng",
                    genre: "Strategic, Fantasy",
                    date: "12/01/24",
                    cover: "/placeholder.svg?height=60&width=45",
                  },
                  {
                    title: "Inside Evil: Inside Evil Series, Book 1",
                    author: "Rachel Heng",
                    genre: "Strategic, Fantasy",
                    date: "12/01/24",
                    cover: "/placeholder.svg?height=60&width=45",
                  },
                  {
                    title: "Jayne Castle - People in Glass Houses",
                    author: "Rachel Heng",
                    genre: "Strategic, Fantasy",
                    date: "12/01/24",
                    cover: "/placeholder.svg?height=60&width=45",
                  },
                ].map((book, index) => (
                  <div key={index} className="flex gap-3">
                    <Image
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      width={45}
                      height={60}
                      className="rounded-sm object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{book.title}</h4>
                      <p className="text-sm text-gray-600">
                        By {book.author} • {book.genre}
                      </p>
                      <div className="flex items-center text-gray-500 text-xs mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {book.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Account Requests */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Account Requests</h2>
          <Button variant="link" className="text-indigo-600">
            View all
          </Button>
        </div>
        <Card className="bg-white">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
            <div className="mb-4">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="No requests"
                width={100}
                height={100}
                className="opacity-30"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Pending Account Requests</h3>
            <p className="text-gray-500 text-sm">There are currently no account requests awaiting approval.</p>
          </CardContent>
        </Card>
      </div>

      {/* User Avatar */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 md:left-auto md:right-16 md:transform-none">
        <Avatar className="h-12 w-12 border-2 border-white shadow-md">
          <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Adrian" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

