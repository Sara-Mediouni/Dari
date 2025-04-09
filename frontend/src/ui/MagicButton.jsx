import React from 'react'

const MagicButton = ({name}) => {
  return (
    <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px]">
    <span className="absolute inset-[-1000%]  bg-green900" />
    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-7 py-5  text-xl font-bold text-white backdrop-blur-3xl">
      {name}
    </span>
  </button>
  )
}

export default MagicButton