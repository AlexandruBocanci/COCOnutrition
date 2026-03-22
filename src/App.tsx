import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BrandPage from './pages/BrandPage'
import SalePage from './pages/SalePage'
import SearchPage from './pages/SearchPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="category/:category" element={<CategoryPage />} />
        <Route path="category/:category/:subcategory" element={<CategoryPage />} />
        <Route path="category/:category/:subcategory/:subsubcategory" element={<CategoryPage />} />
        <Route path="product/:slug" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="brand/:brand" element={<BrandPage />} />
        <Route path="sale" element={<SalePage />} />
        <Route path="sale/:saleType" element={<SalePage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
    </Routes>
  )
}
