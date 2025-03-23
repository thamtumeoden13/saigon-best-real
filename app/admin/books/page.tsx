"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Book = {
  id: string
  title: string
  coverImage: string
  author: string
  genre: string
  dateCreated: string
}

const data: Book[] = [
  {
    id: "1",
    title: "The Great Reclamation: A Novel by",
    coverImage: "/placeholder.svg?height=60&width=45",
    author: "Rachel Heng",
    genre: "Strategic, Fantasy",
    dateCreated: "Dec 19 2023",
  },
  {
    id: "2",
    title: "Inside Evil: Inside Evil Series, Book 1",
    coverImage: "/placeholder.svg?height=60&width=45",
    author: "Rachel Heng",
    genre: "Strategic, Fantasy",
    dateCreated: "Dec 19 2023",
  },
  {
    id: "3",
    title: "Jayne Castle - People in Glass Houses",
    coverImage: "/placeholder.svg?height=60&width=45",
    author: "Rachel Heng",
    genre: "Strategic, Fantasy",
    dateCreated: "Dec 19 2023",
  },
  {
    id: "4",
    title: "The Great Reclamation: A Novel by",
    coverImage: "/placeholder.svg?height=60&width=45",
    author: "Rachel Heng",
    genre: "Strategic, Fantasy",
    dateCreated: "Dec 19 2023",
  },
  {
    id: "5",
    title: "Inside Evil: Inside Evil Series, Book 1",
    coverImage: "/placeholder.svg?height=60&width=45",
    author: "Rachel Heng",
    genre: "Strategic, Fantasy",
    dateCreated: "Dec 19 2023",
  },
  {
    id: "6",
    title: "Jayne Castle - People in Glass Houses",
    coverImage: "/placeholder.svg?height=60&width=45",
    author: "Rachel Heng",
    genre: "Strategic, Fantasy",
    dateCreated: "Dec 19 2023",
  },
  {
    id: "7",
    title: "The Great Reclamation: A Novel by",
    coverImage: "/placeholder.svg?height=60&width=45",
    author: "Rachel Heng",
    genre: "Strategic, Fantasy",
    dateCreated: "Dec 19 2023",
  },
]

export default function BooksTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [bookData, setBookData] = useState<Book[]>(data)

  const handleDeleteBook = (bookId: string) => {
    setBookData((prevData) => prevData.filter((book) => book.id !== bookId))
  }

  const columns: ColumnDef<Book>[] = [
    {
      accessorKey: "title",
      header: "Book Title",
      cell: ({ row }) => {
        const book = row.original

        return (
          <div className="flex items-center gap-3">
            <Image
              src={book.coverImage || "/placeholder.svg"}
              alt={book.title}
              width={45}
              height={60}
              className="rounded-sm object-cover"
            />
            <span className="font-medium">{book.title}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "genre",
      header: "Genre",
    },
    {
      accessorKey: "dateCreated",
      header: "Date Created",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const book = row.original

        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-blue-500 h-8 w-8" asChild>
              <Link href={`/admin/books/edit/${book.id}`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 h-8 w-8"
              onClick={() => handleDeleteBook(book.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: bookData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">All Books</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Button variant="ghost" size="sm">
              A-Z
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
            <Link href="/admin/books/new">
              <span className="flex items-center">
                <span className="mr-1">+</span> Create a New Book
              </span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-slate-50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

