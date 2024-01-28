import React from "react"
import Link from "next/link"

const Navbar: React.FC = () => {
  return (
    <>
      <div className="w-full h-20 bg-blue-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-center items-center h-full">
            <ul className="flex gap-x-6 text-white">
              <li>
                <Link href="/" className="hover:text-gray-300 font-bold">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/top" className="hover:text-gray-300 font-bold">
                  Top 100
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
