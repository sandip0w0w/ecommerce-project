import React from 'react'

function LetterBox() {
    const onSubmitHandler = (e) => {
        e.preventDefault();
    }
  return (
    <div className="flex flex-col items-center justify-center my-20 text-center">
            <p className="font-semibold text-base font-consolas">Subscribe now & get 20% off</p>
            <p className="font-normal text-[11px] text-gray-400 my-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>

            <form onSubmit={onSubmitHandler} className = 'w-full sm:w-1/2 flex items-center gap-4 mx-auto my-6 border pl-3'>
                <input type = 'email' className='w-full sm:flex-1 outline-none border-gray-400 text-xs' placeholder='Enter your email id' />
                <button className="bg-black text-white px-10 py-4 font-light text-[9px]">SUBSCRIBE</button>
            </form>
                
        
    </div>
  )
}

export default LetterBox