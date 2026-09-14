import React from 'react'

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="flex justify-center items-center border-t-2 border-gray-300 py-3">
      <p className = 'font-normal text-xs text-gray-600'>{`Copyright ${year} © Forever - All Right Reserved`}</p>
    </div>
  )
}

export default Footer