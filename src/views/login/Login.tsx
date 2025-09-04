'use client'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'

import type { LoginSchema } from './Login.types'
import { loginSchema } from './Login.schemas'
import Button from '@/components/ui/button'
import Form from '@/components/ui/form'
import FormFieldProviders from '@/contexts/formFieldProviders'
import FormItemProviders from '@/contexts/formItemsProviders'
import FormLabel from '@/components/ui/form/form-label'
import FormControl from '@/components/ui/form/form-control'
import FormMessage from '@/components/ui/form/form-message'
import Input from '@/components/ui/input'
import Card from '@/components/ui/card'
import CardHeader from '@/components/ui/card/card-header'
import CardTitle from '@/components/ui/card/card-title'
import CardDescription from '@/components/ui/card/card-description'

const Login = () => {
  const router = useRouter()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false
      })

      if (res?.error) {
        toast.error('Authentication failed. Please try again.')

        form.setError('username', { message: '' })
        form.setError('password', { message: '' })

        form.setFocus('username')

        return
      }

      if (res?.ok) {
        router.push('/dashboard')

        return
      }
    } catch (error) {
      toast.error('Authentication failed. Please try again.')

      form.setError('username', { message: '' })
      form.setError('password', { message: '' })

      form.setFocus('username')
    }
  }

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <Card>
            <CardHeader>
              <CardTitle className='text-center text-2xl font-semibold'>Welcome to Web Analytics!</CardTitle>
              <CardDescription className='text-center'>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='mt-6 w-full space-y-6' noValidate>
                {form.formState.errors.root && (
                  <div className='text-sm font-medium text-destructive'>{form.formState.errors.root.message}</div>
                )}
                <FormFieldProviders
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItemProviders>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Enter your username'
                          {...(form.formState.errors.username && {
                            error: true
                          })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItemProviders>
                  )}
                />
                <FormFieldProviders
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItemProviders>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Enter your password'
                          {...field}
                          {...(form.formState.errors.password && {
                            error: true
                          })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItemProviders>
                  )}
                />
                <Button type='submit' className='w-full'>
                  Submit
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login
