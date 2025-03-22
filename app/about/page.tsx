import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Bot } from "lucide-react"
import Link from "next/link"

export default function About() {
    return (
      <div className="justify-center content-center">
      <section className="flex-col justify-center content-center bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c]">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-6xl font-bold tracking-tight text-white">About Us</h1>
              <h2 className="text-3xl font-medium">Shop Smarter, Checkout Faster!</h2>
              <p className="text-lg max-w-md">
                Our team is dedicated to making your checkout experience as easy as possible. We are passionate developers from the <a>University of Western Ontaio</a>.
              </p>
              <p className="text-lg max-w-md">
                Meet the team below!
              </p>
            </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="grid grid-rows-1 grid-cols-1 container items-center mx-auto px-4 py-16 bg-[#c8c2f0] rounded-lg">
              <div className="grid grid-rows1 grid-cols-2">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="justify-center text-3xl font-bold tracking-tight text-white">
                    Maximus Slabon
                  </h1>
                  <p className="items-center justify-center flex felx-col">
                    My name is Maximus. I am a third year computer science student at UWO. I enjoy running role playing games and programming.
                  </p>

                  <div className="my-5 items-center flex flex-col justify-center">
                    <p className="my-2">My primary responsiblities have been:</p>

                    <ul className="list-disc">
                      <li>
                        Authentication using <a className="text-blue-800">firebase</a> and  <a className=" text-purple-800 decoration-purple-400">NextJS</a>  state management
                      </li>
                      <li>
                        Development of general webpages
                      </li>
                      <li>
                        Development of login + signup pages
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="justify-center items-center flex flex-col">
                  <Image
                    src="/maximus.webp"
                    alt="Maximus"
                    width={300}
                    height={400}
                    className="object-scale-down overflow-hidden rounded-lg drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
      </div>

      </section>

      </div>
    )
}