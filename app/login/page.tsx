
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Bot } from "lucide-react"
import Link from "next/link"

export default function Login() {
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
                        <input type="text" placeholder="username"></input>
                    </div>
                    <div className="my-2">
                        <input type="password" placeholder="password"></input>
                    </div>
                </div>
                <div>
                    <p>
                        Don't have an account? Register today!
                    </p>
                    <Button className="bg-[#5c5a7c] hover:bg-[#4a4865]">SIGN UP</Button>
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