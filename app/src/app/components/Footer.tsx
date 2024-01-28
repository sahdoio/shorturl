import React from "react"
import Link from "next/link"

const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 w-full bg-blue-500">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-center items-center h-full">
          <ul className="flex gap-x-6 text-white">
            <li>
              <Link href="https://sahdo.io" className="hover:text-gray-300 font-bold">
                Sahdo.io
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
