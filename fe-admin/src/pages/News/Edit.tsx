import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

import TextArea from 'antd/es/input/TextArea'

import { useEffect, useRef } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import TitlePage from '@/components/TitlePage/TitlePage'
import { Button, Form, Input, Skeleton, Select, notification, Spin } from 'antd'
import { useUpdateTintucMutation, useGetTintucByIdQuery } from '@/api/news'
import { container, formats } from '@/utils/ReactQuill'

type FieldType = {
  tieude: string
  noidung: string
  trang_thai: string
  image: Array<string>
}
const SuaTinTuc = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [updateTintucs] = useUpdateTintucMutation()
  const { data, isLoading, refetch } = useGetTintucByIdQuery(id || '')
  const [form] = Form.useForm()
  const reactQuillRef = useRef<ReactQuill>(null)

  useEffect(() => {
    form.setFieldsValue({
      tieude: data?.tieude,
      noidung: data?.noidung,
      trang_thai: data?.trang_thai
    })
  }, [data, form])
  const onFinish = async (values: any) => {
    try {
      const updateTintuc = await updateTintucs({ ...values, image: [...data?.image!], _id: id }).unwrap()
      navigate('/admin/news')
      notification.success({
        message: 'Cập nhật thành công',
        // description: `The Role ${updateTintuc.tieude} has been updated.`,
        duration: 2
      })
      refetch()
    } catch (error) {
      console.error('Error updating Role:', error)
      notification.error({
        message: 'Cập nhập thất bại',
        description: 'Đã xảy ra lỗi khi cập nhật Vai trò.',
        duration: 2
      })
    }
  }
  if (isLoading) {
    return (
      <div className='flex justify-center items-center'>
        <Spin />
      </div>
    )
  }
  return (
    <div>
      <header className='mb-4'>
        <TitlePage title='Sửa tin tức' />
      </header>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          initialValues={data}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className='w-[90%] mx-auto'
          onFinish={onFinish}
          layout='vertical'
        >
          <Form.Item<FieldType>
            label='Tiêu đề'
            name='tieude'
            rules={[
              { required: true, message: 'Vui lòng nhập tiêu đề !' },
              { min: 3, message: 'Tiêu đề ít nhất 3 ký tự' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label='Nội dung'
            name='noidung'
            rules={[
              { required: true, message: 'Vui lòng nhập nội dung!' },
              { min: 10, message: 'Nội dung ít nhất 10 ký tự' }
            ]}
          >
            {/* <TextArea rows={6} /> */}
            <ReactQuill
              className='h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'
              ref={reactQuillRef}
              theme='snow'
              placeholder='Start writing...'
              modules={{
                toolbar: {
                  container: container
                },
                clipboard: {
                  matchVisual: false
                }
              }}
              formats={formats}
            />
          </Form.Item>
          <Form.Item label='Trạng thái' name='trang_thai'>
            <Select>
              <Select.Option value='active'>Công khai</Select.Option>
              <Select.Option value='deactive'>Riêng tư</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType='submit' className='mx-4'>
              {isLoading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Sửa'}
            </Button>
            <Button className='ml-2 text-blue-500' onClick={() => navigate('/admin/tintuc')}>
              Quay lại
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}

export default SuaTinTuc
