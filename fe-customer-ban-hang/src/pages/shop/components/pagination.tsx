import { Fragment, useState } from 'react'

import { IProduct } from '@/types'
import { Product } from '@/components/product'
import ReactPaginate from 'react-paginate'

interface PaginationProps {
  itemsPerPage: number
  products: IProduct[]
}

function Items({ currentItems }: { currentItems: IProduct[] }) {
  return (
    <Fragment>
      {currentItems.map((item) => (
        <div key={item._id} className='w-full h-full'>
          <Product
            _id={item._id as string}
            img={item.image[0]}
            productName={item.name}
            price={item.price}
            color={''}
            badge={true}
            des={item.description}
            size={item.listQuantityRemain[0].nameColor}
            maxQuantity={item.listQuantityRemain[0].quantity}
          />
        </div>
      ))}
    </Fragment>
  )
}

export const Pagination = ({ itemsPerPage, products }: PaginationProps) => {
  const [itemOffset, setItemOffset] = useState(0)
  const [itemStart, setItemStart] = useState(1)

  const endOffset = itemOffset + itemsPerPage
  const currentItems = products.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(products.length / itemsPerPage)

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % products.length
    setItemOffset(newOffset)
    setItemStart(newOffset)
  }

  return (
    <div>
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4 mdl:gap-4 lg:gap-10'>
        <Items currentItems={currentItems} />
      </div>
      <div className='flex flex-col items-center justify-center mdl:flex-row mdl:justify-between'>
        <ReactPaginate
          nextLabel=''
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=''
          pageLinkClassName='w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center'
          pageClassName='mr-6'
          containerClassName='flex text-base font-semibold font-titleFont py-10'
          activeClassName='bg-black text-white'
        />

        <p className='text-base font-normal text-lightText'>
          Products from {itemStart === 0 ? 1 : itemStart} to {endOffset} of {products.length}
        </p>
      </div>
    </div>
  )
}
