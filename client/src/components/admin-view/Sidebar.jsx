import { adminSidebarMenuItems } from '@/config'
import { Shield } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'


function MenuItems({ setOpen }) {


  const navigate = useNavigate()

  return <nav className='mt-8 flex flex-col gap-2'>
    {
      adminSidebarMenuItems.map((menuItem =>
        <div key={menuItem.id} onClick={() => {
          navigate(menuItem.path)
          setOpen ? setOpen(false) : null
        }} className='flex items-center cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground text-xl gap-2 rounded-md px-3 py-2'>
          {menuItem.icons}
          <span>
            {menuItem.label}
          </span>
        </div>
      ))
    }

  </nav>
}


function AdminSidebar({ open, setOpen }) {

  const navigate = useNavigate()

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>

        <SheetContent side='left' className='w-64 '>
          <div children='flex flex-col h-full'>
            <SheetHeader className='border-b'>
              <SheetTitle className='flex gap-2 mt-6 mb-5'>
                <Shield size={30} />
                <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>

        </SheetContent>

      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={() => navigate('/admin/dashboard')} className='flex items-center gap-2 cursor-pointer'>
          <Shield size={30} />
          <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  )
}

export default AdminSidebar