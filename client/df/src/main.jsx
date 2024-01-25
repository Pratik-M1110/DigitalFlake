import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
import Login from './components/login/Login.jsx'
import Category from './components/Category/Category.jsx'
import AddCategory from './components/Category/AddCategory.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Products from './components/Products/Products.jsx'
import AddProduct from './components/Products/AddProduct.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element = {<Login/>}/>
      <Route path='home' element = {<Home/>}/>
      <Route path='category' element = {<Category/>}/>
      <Route path='addcategory' element = {<AddCategory/>}/>
      <Route path='products' element = {<Products/>}/>
      <Route path='addproduct' element = {<AddProduct/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
