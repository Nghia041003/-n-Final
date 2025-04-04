import { Badge, Image } from '.'

import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { MdOutlineLabelImportant } from 'react-icons/md'
import { Button, message } from 'antd'
import { BsCartPlus } from 'react-icons/bs'
import { useAppDispatch } from '@/store'
import { addProductToCart } from '@/store/slices/cart.slice'

export const Product = (props: {
  _id: string
  img: string
  productName: string
  price: number
  color?: string
  badge: boolean
  des: string
  oldPrice?: number
  size: string
  maxQuantity: number
}) => {
  const dispatch = useAppDispatch()
  const handleAddToCart = () => {
    // console.log('Add to cart', props.productName)

    const data = {
      _id: props._id,
      nameProduct: props.productName,
      // nameSize: sizeSelected.nameSize,
      quantity: 1,
      nameColor: props.size,
      price: props.price,
      image: props.img,
      maxQuantity: props.maxQuantity
    }

    dispatch(addProductToCart(data))
    message.success('Thêm sản phẩm vào giỏ hàng thành công!')
  }

  return (
    <div className='relative flex flex-col flex-1 w-full h-full group'>
      <div className='relative flex-1 overflow-y-hidden shadow max-w-80 max-h-80'>
        <div>
          <Image className='w-[320px] object-cover h-[320px]' imgSrc={props.img} />
        </div>
        <div className='absolute top-6 left-1 md:left-8'>{props.badge && <Badge text='New' />}</div>
        <div className='w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700'>
          <ul className='flex flex-col items-end justify-center w-full h-full gap-2 px-2 border-l border-r font-titleFont'>
            <span
              onClick={handleAddToCart}
              // to={`/product/${props._id}`}
              className='text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full'
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </span>
            <Link
              to={`/product/${props._id}`}
              className='text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full'
            >
              View Details
              <span className='text-lg'>
                <MdOutlineLabelImportant />
              </span>
            </Link>
          </ul>
        </div>
      </div>
      <div className='max-w-80 py-6 flex flex-col gap border-[1px] border-t-0 px-4'>
        <div className='flex flex-col flex-1 font-titleFont'>
          <h2 className='text-lg font-bold cursor-pointer  line-clamp-1' title={props.productName}>
            {props.productName}
          </h2>
          <p className='text-primeColor font-medium text-[14px]'>{props.price.toLocaleString()}đ</p>
        </div>
        {props.oldPrice && (
          <div className='text-xs'>
            <span className='truncate text-[#718096]  line-through'>{props.oldPrice.toLocaleString()}đ</span>
            <span className='ml-2 font-medium text-[#39a26a]'>
              Tiết kiệm {(props.oldPrice - props.price).toLocaleString()}đ
            </span>
          </div>
        )}
        <div className='mt-auto'>
          <p className='text-[#767676] text-[14px]'>{props.color}</p>
        </div>
        {/* <Link to={`/product/${props._id}`}> */}
        <Button
          onClick={handleAddToCart}
          className='rounded-full flex items-center justify-center font-medium bg-primeColor/25 text-primeColor hover:!bg-transparent hover:!text-primeColor hover:!border-primeColor mt-5 w-full'
          size='large'
          icon={<BsCartPlus />}
        >
          <span>Buy</span>
        </Button>
        {/* </Link> */}
      </div>
    </div>
  )
}
