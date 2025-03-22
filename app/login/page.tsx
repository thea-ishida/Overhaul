'use client'
import Image from "next/image"
import { MouseEvent } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Bot } from "lucide-react"
import Link from "next/link"

// import the auth details
import {auth} from "../firebase/firebaseConfig"
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { redirect } from "next/dist/server/api-utils"
import {useState} from "react"

import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'

import {useRouter} from 'next/navigation'

export default function Login() {
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleGoogle = (e: MouseEvent<HTMLButtonElement>) => {
      const provider = new GoogleAuthProvider();

      try {
        const res =  signInWithPopup(auth, provider)
        console.log({res})
        setEmail('')
        setPassword('')

        router.push('/')
      } catch (e){
        console.error(e)
      }
    }

    const router = useRouter()

    const [signInUserWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    const handleLogin = async (e:MouseEvent<HTMLButtonElement>) => {
      try {
        const res = await signInUserWithEmailAndPassword(email, password)
        console.log({res})
        setEmail('')
        setPassword('')

        router.push('/')

      } catch (e){
        console.error(e)
      }
    }

    return (
      <div>
      <section className="relative bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c]">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-6xl font-white font-bold tracking-tight text-white">Log In</h1>
              <h2 className="text-3xl font-medium">Shop Smarter, Checkout Faster!</h2>
                <div className="flex-col">
                    <div className="my-2">
                        <input 
                        type="text" 
                        placeholder="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="my-2">
                        <input 
                        type="password" 
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <Button onClick={handleLogin}>Log in</Button>
                </div>
                <div>
                    <p>
                        Don't have an account? Register today!
                    </p>
                    <Link href={"/signup"}>
                      <Button className="bg-[#5c5a7c] hover:bg-[#4a4865]">SIGN UP</Button>
                    </Link>
                </div>
                <div>
                  <button onClick={handleGoogle}>Sign in with google</button>
                </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-[300px]">
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    )
}