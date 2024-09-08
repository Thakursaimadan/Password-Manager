import React from 'react'

function Navbar() {
  return (
    <nav className='bg-blue-950 text-white'>
        <div className="mycontainer  flex justify-between items-center px-4 py-5 h-14">
            <div className='logo font-bold'>
                
                <span className="text-blue-500 text-2xl">&lt;</span>
                <span className="">Password-Manager</span>
                
                <span className="text-blue-500">/ &gt;</span>
                
            </div>
            <ul>
                <li className='flex gap-4'>
                    <a className='hover:font-bold' href="#">Home</a>
                    <a className='hover:font-bold' href="#">About</a>
                    <a className='hover:font-bold' href="#">Contact</a>
                </li>
            </ul>
        </div>
        
    </nav>
  )
}

export default Navbar