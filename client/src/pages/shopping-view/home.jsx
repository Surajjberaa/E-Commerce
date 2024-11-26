import React, { useEffect, useState } from 'react'
import banner1 from '../../assets/banners/banner1.webp'
import banner2 from '../../assets/banners/banner2.webp'
import banner3 from '../../assets/banners/banner3.webp'
import nike from '../../assets/icons/nike.png'
import adidas from '../../assets/icons/adidas.png'
import hnm from '../../assets/icons/h&m.png'
import levis from '../../assets/icons/levis.png'
import puma from '../../assets/icons/puma.png'
import zara from '../../assets/icons/zara.png'
import { Button } from '@/components/ui/button'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightningIcon, FootprintsIcon, MagnetIcon, ShirtIcon, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingProductTile from '@/components/shopping-view/product-tile'
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'
import ProductDetailsDialog from '@/components/shopping-view/product-details'



const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightningIcon },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: FootprintsIcon },
]

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: nike },
  { id: "adidas", label: "Adidas", icon: adidas },
  { id: "puma", label: "Puma", icon: puma },
  { id: "levi", label: "Levi's", icon: levis },
  { id: "zara", label: "Zara", icon: zara },
  { id: "h&m", label: "H&M", icon: hnm },
]

function ShoppingHome() {

  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [banner1, banner2, banner3]
  const { productList, productDetails } = useSelector(state => state.shoppingProducts)
  const { user } = useSelector(state => state.auth)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem('filters')
    const currentFilter = {
      [section]: [getCurrentItem.id]
    }

    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate('/shop/listing')
  }

  function handleGetProductDetails(getCurrentProductId) {
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
    const timer = setInterval(() => {
      setCurrentSlide(previousSlide => (previousSlide + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }))
  }, [dispatch])

  // console.log(productList, 'productList');


  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <div className='relative w-full h-[600px] overflow-hidden'>

        {
          slides.map((slide, index) => (
            <img key={index} src={slide} alt='banner' className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'} `} />
          ))
        }
        <Button className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 text-gray-800 hover:text-white '
          onClick={() => setCurrentSlide(previousSlide => (previousSlide - 1 + slides.length) % slides.length)}
        >
          <ChevronLeftIcon className='w-4 h-4 ' />
        </Button>
        <Button className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 text-gray-800 hover:text-white '
          onClick={() => setCurrentSlide(previousSlide => (previousSlide + 1) % slides.length)}
        >
          <ChevronRightIcon className='w-4 h-4 ' />
        </Button>

      </div>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by Category</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {
              categoriesWithIcon.map((categoryItem) => (
                <Card onClick={() => handleNavigateToListingPage(categoryItem, 'category')} key={categoryItem.id} className='cursor-pointer hover:shadow-red-300 hover:transition-opacity duration-1000 shadow-lg'>
                  <CardContent className='flex flex-col items-center justify-center p-6 gap-2'>
                    <categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
                    <p className='text-lg font-bold text-gray-800'>{categoryItem.label}</p>
                  </CardContent>
                </Card>
              ))
            }

          </div>
        </div>
      </section>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by Brand</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {
              brandsWithIcon.map((brandItem) => (
                <Card onClick={() => handleNavigateToListingPage(brandItem, 'brand')} key={brandItem.id} className='cursor-pointer hover:shadow-red-300 hover:transition-opacity duration-1000 shadow-lg'>
                  <CardContent className='flex flex-col items-center justify-center p-6 gap-2'>
                    <img src={brandItem.icon} alt={brandItem.label} className='w-30 h-12 mb-4 text-primary' />
                    <p className='text-lg font-bold text-gray-800'>{brandItem.label}</p>
                  </CardContent>
                </Card>
              ))
            }

          </div>
        </div>
      </section>
      <section>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-8'>Featured Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              productList && productList.length > 0 ?
                productList.map((product) => (
                  <ShoppingProductTile key={product._id} product={product}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                  />
                )) : <p>No products found</p>
            }
          </div>
        </div>
      </section>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
  )
}

export default ShoppingHome