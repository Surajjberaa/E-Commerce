import ProductFilter from '@/components/shopping-view/filter'
import ShoppingProductTile from '@/components/shopping-view/product-tile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllFilteredProducts } from '@/store/shop/products-slice'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function ShoppingListing() {

  const dispatch = useDispatch()
  const { productList } = useSelector((state) => state.shoppingProducts)
  const [sort, setSort] = useState(null)
  const [filters, setFilters] = useState({})

  function handleSort(value) {
    setSort(value)
  }

  function handleFilter(getSectionId, getCurrentOption) {
    // console.log(getSectionId, getCurrentOption);

    let copyFilter = { ...filters }
    const indexOfCurrentSection = Object.keys(copyFilter).indexOf(getSectionId)

    if (indexOfCurrentSection === -1) {
      copyFilter = {
        ...copyFilter,
        [getSectionId]: [getCurrentOption]
      }
    } else {
      const indexOfCurrentOption = copyFilter[getSectionId].indexOf(getCurrentOption)
      if (indexOfCurrentOption === -1) {
        copyFilter[getSectionId].push(getCurrentOption)
      } else {
        copyFilter[getSectionId].splice(indexOfCurrentOption, 1)
      }
    }
    setFilters(copyFilter)
    sessionStorage.setItem('filters', JSON.stringify(copyFilter))
  }


  useEffect(() => {
    setSort('price-lowtohigh')
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  }, [])

  useEffect(() => {

    dispatch(fetchAllFilteredProducts())
  }, [dispatch])

  console.log(filters, 'filters');



  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 '>
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className='bg-background w-full rounded-lg shadow-sm '>
        <div className='p-4 border-b flex item-center justify-between'>
          <h2 className='text-lg font-semibold'>
            All Products
          </h2>
          <div className='flex items-center gap-4'>
            <span className=' text-muted-foreground'>
              {productList?.length} products
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
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOptions.map((option) => (
                      <DropdownMenuRadioItem key={option.id} value={option.id}>
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {
            productList && productList.length > 0 ?
              productList.toReversed().map((product) => (
                <ShoppingProductTile key={product._id} product={product} />
              )) : null
          }
        </div>
      </div>
    </div>
  )
}

export default ShoppingListing