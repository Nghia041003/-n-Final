import { Pagination, ProductBanner, ShopSideNav } from '.'
import { useEffect, useState } from 'react'

import { Breadcrumbs } from '@/components'
import { IProduct } from '@/types'
import { useGetProductsQuery } from '@/store'
import { useSearchParams } from 'react-router-dom'

const ShopPage = () => {
  const { data: productData } = useGetProductsQuery()
  const [products, setProducts] = useState<IProduct[]>(productData?.products || [])
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const itemsPerPageFromBanner = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage)
  }

  const [searchParams] = useSearchParams()
  const searchParamsCategory = searchParams.get('category')

  useEffect(() => {
    if (productData) {
      setProducts(productData.products)
    }
  }, [productData])

  useEffect(() => {
    if (searchParamsCategory && productData) {
      handleFilterCategory(searchParamsCategory)
    }
  }, [searchParamsCategory, productData])

  if (!productData) return <></>

  const handleFilterCategory = (categoryId: string) => {
    const { products } = productData
    const filteredProducts = products.filter((product) => product.categoryId === categoryId)
    setProducts(filteredProducts)
    // console.log(filteredProducts)

    // console.log('runn', categoryId)
  }

  const handleFilterPrice = (priceStart: number, priceLow: number) => {
    const { products } = productData
    const filteredProducts = products.filter(
      (product) =>
        product.price >= priceStart && product.price <= priceLow && product.categoryId === searchParamsCategory
    )
    setProducts(filteredProducts)
  }

  return (
    <div className='px-4 mx-auto max-w-container'>
      <Breadcrumbs title='Products' />

      <div className='flex w-full h-full gap-10 pb-20'>
        <div className='w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full'>
          <ShopSideNav onFilterCategory={handleFilterCategory} onFilterPrice={handleFilterPrice} />
        </div>
        <div className='w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10'>
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          <Pagination itemsPerPage={itemsPerPage} products={products} />
        </div>
      </div>
    </div>
  )
}

export default ShopPage
