import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Bot } from "lucide-react";
import Link from "next/link";
import AccessibilityButton from "@/components/ui/accessibility-button";

export default function Help() {
  return (
    // h-screen makes this background fill the entire screen
    <div className="h-screen bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c]">
      <div className="container mx-auto py-20">
        <h1 className="text-white text-5xl font-bold my-6">How can we help you?</h1>
        <div className="py-2 bg-white rounded-xl">
          <div className="px-2">
            <input type="text" placeholder="describe your issue ..."></input>
          </div>
        </div>
      </div>
      <AccessibilityButton />
    </div>
  );
}
