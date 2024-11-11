import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthRegister from './pages/auth/register'
import AuthLogin from './pages/auth/login'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminProducts from './pages/admin-view/products'
import AdminFeatures from './pages/admin-view/features'
import AdminOrders from './pages/admin-view/orders'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingCheckout from './pages/shopping-view/checkout'
import CheckAuth from './components/common/checkAuth'
import UnauthorisedPage from './pages/unauthorised-page'
import { useSelector } from 'react-redux'

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  return (
    <div className='flex flex-col overflow-hidden bg-white'>

      <h1 className='text-4xl text-center'>Header Component</h1>

      <Routes>
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegister />} />
        </Route>
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='features' element={<AdminFeatures />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='products' element={<AdminProducts />} />
        </Route>
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<ShoppingHome />} />
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='listing' element={<ShoppingListing />} />
        </Route>
        <Route path='*' element={<NotFound />} />
        <Route path='/unauthorised-page' element={<UnauthorisedPage />} />
      </Routes>

    </div>
  )
}

export default App
