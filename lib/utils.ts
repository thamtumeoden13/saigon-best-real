import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(" ")
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase().slice(0, 2)
}