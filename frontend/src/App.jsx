import { useState } from 'react'
import './App.css'
import ProductCard from './components/productCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductCard name="laptop" price="10,000.00"/>
      <ProductCard name="watch" price="5,000.00"/>
      <ProductCard name="desktop" price="20,000.00"/>
    </>
  )
}

export default App
