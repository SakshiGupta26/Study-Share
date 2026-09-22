import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout} = useAuth();
  const navigate = useNavigate();

  const [browseOpen, setBrowseOpen] = useState(false);
  const [userOpen,setUserOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setUserOpen(false);
    navigate("/")
  }

  return (
    <nav className='sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <Link 
        to = "/"
        className="text-2xl font-bold text-white"
        >
          Study <span className='text-peach'>Share</span>
        </Link>
        <div className='hidden items-center gap-6 md:flex'>
          <div className='relative'>
            <button 
            onClick={() => setBrowseOpen(!browseOpen)}
            className='textgray-500 transition hover:text-white'
            >
              Browse ▾
            </button>
            {browseOpen && (
              <div className='absolute left-0 top-full mt-3 w-64 rounded-xl bg-white p-4 shadow-xl'>
                <p className='mb-2 text-sm font-semibold text-gray-500'>
                   By Semester
                </p>
                <div className='grid grid-cols-2 gap-2'>
                  {[1,2,3,4,5,6,7,8].map(())}
                </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </nav>
  )
}

export default Navbar
