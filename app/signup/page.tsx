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
import {useState} from 'react'

import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'

export default function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
  
    const handleGoogle = (e: MouseEvent<HTMLButtonElement>) => {
      const provider = new GoogleAuthProvider();

      return signInWithPopup(auth, provider)
    }

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const handleSignup = async () => {
      try {
        const res = await createUserWithEmailAndPassword(email, password)
        console.log({res})
        setEmail('')
        setPassword('')
        setPassword2('')
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
              <h1 className="text-6xl font-white font-bold tracking-tight text-white">Sign up!</h1>
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
                    <div className="my-2">
                        <input 
                        type="password" 
                        placeholder="re-type password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}></input>
                    </div>
                    <Button onClick={handleSignup} className="bg-[#5c5a7c] hover:bg-[#4a4865]">
                      Create Account
                      </Button>
                </div>

                <div>
                  <button onClick={handleGoogle}>Sign up with google</button>
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