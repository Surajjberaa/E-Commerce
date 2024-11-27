import ProductFilter from '@/components/shopping-view/filter'
import ProductDetailsDialog from '@/components/shopping-view/product-details'
import ShoppingProductTile from '@/components/shopping-view/product-tile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

function createSearchParamsHelper(filterParams) {
  const queryParams = []

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',')

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }

  return queryParams.join('&')
}


function ShoppingListing() {

  const dispatch = useDispatch()
  const { productList, productDetails } = useSelector((state) => state.shoppingProducts)
  const { user } = useSelector((state) => state.auth)
  const [sort, setSort] = useState(null)
  const [filters, setFilters] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const { toast } = useToast()

  const categorySearchParams = searchParams.get('category')

  function handleSort(value) {
    setSort(value)
  }

  function handleFilter(getSectionId, getCurrentOption) {

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

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  function handleAddToCart(getCurrentProductId) {
    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
      console.log(data, 'data');
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id))
        toast({
          title: "Product added to cart successfully"
        })
      }
    })
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true)
  }, [productDetails])

  useEffect(() => {
    setSort('price-lowtohigh')
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  }, [categorySearchParams])

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filters])

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }))
    }
  }, [dispatch, filters, sort])


  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 '>
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
              productList.map((product) => (
                <ShoppingProductTile key={product._id} product={product} handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart} />
              )) : null
          }
        </div>
      </div>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
  )
}

export default ShoppingListing