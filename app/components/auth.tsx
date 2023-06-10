'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import{ supabaseClient }from '../../utils/supabase'
import useStore from '../../store'

export default function Auth() {
  const { loginUser } = useStore()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const login = async () => {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      })
      setEmail('')
      setPassword('')
      error ? alert(error.message): router.push('/auth/todo-crud')
  }

  const signUp = async () => {
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
    })
    setEmail('')
    setPassword('');
    error && alert(error.message)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    isLogin ? await login() : await signUp();
  }

  const signOut= ()=> {
      supabaseClient.auth.signOut()
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p>{loginUser.email}</p>
      <ArrowRightOnRectangleIcon
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className="my-6 flex justify-center text-sm">
          <button
            type="submit"
            className=" rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </div>
      </form>
      <p
        onClick={() => setIsLogin(!isLogin)}
        className="cursor-pointer font-medium hover:text-indigo-500"
      >
        change mode ?
      </p>
    </div>
  )
}
