import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Bot } from "lucide-react";
import Link from "next/link";
import AccessibilityButton from "@/components/ui/accessibility-button";

export default function About() {
  return (
    <div className="justify-center content-center">
      <section className="bg-white text-black dark:bg-[#121212] dark:text-white transition-colors duration-300">
        <div>
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-6xl font-bold tracking-tight text-purple">About Us</h1>
                <h2 className="text-3xl font-medium">Shop Smarter, Checkout Faster!</h2>
                <p className="text-lg max-w-md">
                  Our team is dedicated to making your checkout experience as easy as possible. We are passionate developers from the <a>University of Western Ontaio</a>.
                </p>
                <p className="text-lg max-w-md">Meet the team below!</p>
              </div>
              <p className="text-lg max-w-md">SmartCart revolutionizes grocery shopping with AI-powered, accessible, and seamless checkout solutions — making every trip faster, easier, and smarter for all.</p>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-[300px]"></div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="grid grid-rows-1 grid-cols-1 container items-center mx-auto px-4 py-16 bg-[#c8c2f0] rounded-lg">
              <div className="grid grid-rows1 grid-cols-2">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="justify-center text-3xl font-bold tracking-tight text-white">Maximus Slabon</h1>
                  <p className="items-center justify-center flex felx-col">My name is Maximus. I am a third year computer science student at UWO. I enjoy running role playing games and programming.</p>

                  <div className="my-5 items-center flex flex-col justify-center">
                    <p className="my-2">My primary responsiblities have been:</p>

                    <ul className="list-disc">
                      <li>
                        Authentication using <a className="text-blue-800">firebase</a> and <a className=" text-purple-800 decoration-purple-400">NextJS</a> state management
                      </li>
                      <li>Development of general webpages</li>
                      <li>Development of login + signup pages</li>
                    </ul>
                  </div>
                </div>
                <div className="justify-center items-center flex flex-col">
                  <Image src="/maximus.webp" alt="Maximus" width={300} height={400} className="object-scale-down overflow-hidden rounded-lg drop-shadow-xl" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="grid grid-rows-1 grid-cols-1 container items-center mx-auto px-4 py-16 bg-[#c8c2f0] rounded-lg">
              <div className="grid grid-rows1 grid-cols-2">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="justify-center text-3xl font-bold tracking-tight text-white">Evan Salmon</h1>
                  <p className="items-center justify-center flex felx-col">My name is Evan. I am a second year computer science student at UWO. I enjoy Reading, hiking and programming.</p>

                  <div className="my-5 items-center flex flex-col justify-center">
                    <p className="my-2">My primary responsiblities have been:</p>

                    <ul className="list-disc">
                      <li>
                        AI image detection using <a className="text-orange-600">TensorFlow.js</a>
                      </li>
                      <li>Training a small machine learning model for image classification</li>
                      <li>Handling the styling and functionality of the checkout page</li>
                    </ul>
                  </div>
                </div>
                <div className="justify-center items-center flex flex-col">
                  <Image src="/headshot.jpg" alt="Evan" width={300} height={400} className="object-scale-down overflow-hidden rounded-lg drop-shadow-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="grid grid-rows-1 grid-cols-1 container items-center mx-auto px-4 py-16 bg-[#c8c2f0] rounded-lg">
            <div className="grid grid-rows1 grid-cols-2">
              <div className="flex flex-col justify-center items-center">
                <h1 className="justify-center text-3xl font-bold tracking-tight text-white">Julian Barua</h1>
                <p className="items-center justify-center flex felx-col">My name is Julian. I am a second year computer science student at UWO. I enjoy making music, video games, and low-level programming.</p>

                <div className="my-5 items-center flex flex-col justify-center">
                  <p className="my-2">My primary responsiblities have been:</p>

                  <ul className="list-disc">
                    <li>Git repository management (Merge conflicts and branch control)</li>
                    <li>Accessibility features (Text sizing)</li>
                    <li>Testing and code review of authentication and checkout pages</li>
                  </ul>
                </div>
              </div>
              <div className="justify-center items-center flex flex-col">
                <Image src="/julian.jpg" alt="Julian" width={300} height={300} className="object-scale-down overflow-hidden rounded-lg drop-shadow-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 bg-[#c8c2f0] rounded-lg">
          <h1 className="text-3xl font-bold tracking-tight">our name</h1>
          <div className="">
            <p>potential name containers for each of us to put our little summary and a photo</p>
            <Image src="/placeholder.svg?height=400&width=300" alt="Banana bundle" width={300} height={400} className="object-cover rounded-lg" />
          </div>
        </div>
        <AccessibilityButton />
      </section>
    </div>
  );
}
