"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Pencil, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookDetails() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-slate-50 min-h-screen">
      {/* Back Button */}
      <Link href="/admin/books" className="flex items-center text-gray-700 mb-6 hover:text-gray-900 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span>Go back</span>
      </Link>

      <div className="grid md:grid-cols-[350px_1fr] gap-8">
        {/* Book Cover Section */}
        <div className="bg-pink-50 rounded-lg p-6 flex items-center justify-center">
          <div className="relative w-[200px] h-[280px]">
            <Image
              src="/placeholder.svg?height=280&width=200"
              alt="Jayne Castle - People in Glass Houses"
              width={200}
              height={280}
              className="rounded-md shadow-md object-cover"
            />
          </div>
        </div>

        {/* Book Details Section */}
        <div className="space-y-6">
          <div className="flex items-center text-gray-600">
            <span>Created at:</span>
            <div className="flex items-center ml-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>12/01/24</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Jayne Castle - People in Glass Houses</h1>

          <div className="text-xl text-gray-700">By Jayne Ann Krentz</div>

          <div className="text-gray-600">Strategic, Fantasy</div>

          <Button className="bg-indigo-700 hover:bg-indigo-800 text-white w-full md:w-auto">
            <Pencil className="h-4 w-4 mr-2" /> Edit Book
          </Button>
        </div>
      </div>

      {/* Summary and Video Sections */}
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              People in Glass Houses by Jayne Castle (a pseudonym for Jayne Ann Krentz) is a science fiction romance set
              in a future world where people with psychic abilities live in harmony with advanced technology. The story
              follows the main characters, Harriet and Sam, who are drawn together under unusual circumstances.
            </p>
            <p>
              Harriet, a talented psychic, works for a company that offers psychic services in a futuristic society.
              When she finds herself tangled in a dangerous situation involving a mysterious conspiracy, she enlists the
              help of Sam, a former investigator with a dark past. As they uncover the secrets surrounding a glass
              house—a mysterious structure tied to their investigation—they must navigate their growing attraction while
              facing hidden dangers.
            </p>
            <p>
              The novel combines elements of mystery, suspense, and romance, with a focus on psychic abilities,
              futuristic technology, and the complexities of relationships. The title, "People in Glass Houses,"
              symbolizes the fragile nature of the world the characters inhabit and the vulnerabilities they face in
              their personal and professional lives.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Video</h2>
          <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-100">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Book video thumbnail"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-80 rounded-full p-4 cursor-pointer hover:bg-opacity-90 transition-all">
                <Play className="h-8 w-8 text-indigo-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

