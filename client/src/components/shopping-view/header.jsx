import { House, LogOut, Menu, ShoppingCart, User } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { logoutUser } from '@/store/auth-slice'

function MenuItems() {
  return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 w-full lg:flex-row'>
    {
      shoppingViewHeaderMenuItems.map(menuItem => <Link className='text-sm font-medium' key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
    }

  </nav>
}

function HeaderRightContent() {



  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleLogout() {
    dispatch(logoutUser())
  }

  return <div className='flex lg:items-center lg:flex-row flex-col justify-end gap-4'>
    <Button variant='outline' size='icon'>
      <ShoppingCart className='h-6 w-6 ' />
      <span className='sr-only'>User Cart</span>
    </Button>
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Avatar className='bg-black'>
          <AvatarFallback className='bg-black select-none text-white font-extrabold'>
            {user?.username?.[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' className='w-52 mr-4 bg-background select-none shadow-lg border p-2 rounded-2xl'>
        <DropdownMenuLabel>
          Logged in as {user?.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/shop/account')}>
          <User />
          <span className='ml-2'>
            Account
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLogout()}>
          <LogOut className='mr-2 h-4 w-4' />
          <span className=''>
            Logout
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>


  </div>
}

function ShoppingHeader() {


  const { isAuthenticated, user } = useSelector(state => state.auth)

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background '>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to='/shop/home' className='flex items-center gap-2 w-full'>
          <House className='h-6 w-6' />
          <span className='font-bold'>E-Commerce</span>
        </Link>
        <Sheet>
          <SheetTrigger >
            <Button variant='outline' size='icon' className='lg:hidden'>
              <Menu className='h-6 w-6' />
              <span className='sr-only'>
                Toggle header menu
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-full max-w-xs'>
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className='hidden lg:block'>
          <MenuItems />
        </div>
        <div className='lg:block right-0 hidden w-full '>
          {
            isAuthenticated ? <div >
              <HeaderRightContent />
            </div> : null
          }
        </div>
      </div>
    </header>
  )
}

export default ShoppingHeader