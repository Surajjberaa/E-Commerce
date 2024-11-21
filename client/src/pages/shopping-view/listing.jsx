import ProductFilter from '@/components/shopping-view/filter'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { ArrowUpDownIcon } from 'lucide-react'
import React from 'react'

function ShoppingListing() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 '>
      <ProductFilter />
      <div className='bg-background w-full rounded-lg shadow-sm '>
        <div className='p-4 border-b flex item-center justify-between'>
          <h2 className='text-lg font-semibold'>
            All Products
          </h2>
          <div className='flex items-center gap-4'>
            <span className=' text-muted-foreground'>
              Showing 1 to 10 of 100 products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='flex items-center gap-2' variant='outline' size='sm'>
                  <ArrowUpDownIcon className='w-4 h-4' />
                  <span>
                    Sort By
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[200]'>
                <DropdownMenuRadioGroup>
                  {
                    sortOptions.map((option) => (
                      <DropdownMenuRadioItem key={option.id}>
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ShoppingListing