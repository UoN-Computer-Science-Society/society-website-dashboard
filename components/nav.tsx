import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import MainNav from './main-nav'
import { ModeToggle } from './ui/theme-toggle'


const Navbar = async () => {
    return (
        <div className='border-b'>
            <div className='flex h-16 items-center px-4'>
                <p>UNM CSS Content Management System</p>
                <MainNav className='mx-12' />

                <div className='ml-auto flex items-center space-x-4 justify-end'>
                    <ModeToggle />
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>

        </div>
    )
}

export default Navbar