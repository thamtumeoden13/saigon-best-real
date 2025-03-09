"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { z, ZodType } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/lib/constants'
import ImageUpload from './ImageUpload'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP"
}

const AuthForm = <T extends FieldValues>({ type, schema, defaultValues, onSubmit }: Props<T>) => {

  const router = useRouter()

  const isSignin = type === "SIGN_IN" ? true : false

  const form: UseFormReturn<T> = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      console.log('success')
      toast.success('Success', {
        description: isSignin
          ? 'You have successfully signed in.'
          : 'You have successfully signed up.'
      })
      router.push("/");
    } else {
      console.log('error')
      toast.error(`Error ${isSignin ? "signing in" : "signing up"}`, {
        description: result.error ?? "An error occurred"
      })
    }
  }

  return (
    <div className='flex flex-col gap-4'>

      <h1 className='text-2xl font-semibold text-white'>
        {isSignin ? "Welcome back to BookWise" : "Create your library account"}
      </h1>

      <p className='text-light-100'>
        {isSignin ? "access the vast collection of resources, and stay updated" : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"

        >

          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                  <FormControl>
                    {field.name == 'universityCard'
                      ? (<ImageUpload onFileChange={field.onChange} />)
                      : (
                        <Input
                          required
                          type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                          {...field}
                          className='form-input'
                        />
                      )}


                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className='form-btn'>
            {isSignin ? "Sign in" : "Sign-up"}
          </Button>
        </form>
      </Form>

      <p className='text-center text-base font-medium'>
        {isSignin ? "New to BookWise?" : "Already have an account?"}
        <Link
          href={isSignin ? "/sign-up" : "/sign-in"}
          className='font-bold text-primary'
        >
          {isSignin ? " Create an account" : " Sign-in"}
        </Link>
      </p>
    </div>
  )
}

export default AuthForm