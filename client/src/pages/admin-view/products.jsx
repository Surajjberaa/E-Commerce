import ProductImageUpload from '@/components/admin-view/imageUpload'
import AdminProductTile from '@/components/admin-view/Product-tile'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { SheetContent, SheetHeader, Sheet, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice'
import { data } from 'autoprefixer'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: ''
}

function AdminProducts() {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const { productList } = useSelector(state => state.adminProducts)
  const dispatch = useDispatch()
  const { toast } = useToast()

  function onSubmit(event) {

    event.preventDefault()

    currentEditedId !== null ? dispatch(editProduct({
      id: currentEditedId,
      formData
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts())
        setOpenCreateProductsDialog(false)
        setCurrentEditedId(null)
        setFormData(initialFormData)
        toast({
          title: "Product edited successfully"
        })
      }
    })
      : dispatch(addNewProduct({
        ...formData,
        image: uploadedImageUrl
      })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts())
          setOpenCreateProductsDialog(false)
          setImageFile(null);
          setFormData(initialFormData)
          toast({
            title: "Product added successfully"
          })
        }

      })
  }

  function handleDelete(getCurrentProductId) {
    // console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts())
        setFormData(initialFormData)
        toast({
          title: "Product deleted successfully",
          variant: 'destructive'
        })
      }
    })

  }

  function isFormValid() {
    return Object.keys(formData).map(key => formData[key] !== '').every(item => item)
  }

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  // console.log(productList, uploadedImageUrl, 'productList');


  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end '>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4 '>
        {
          productList && productList.length > 0 ?
            productList.toReversed().map(productItem => <AdminProductTile product={productItem} setCurrentEditedId={setCurrentEditedId} setOpenCreateProductsDialog={setOpenCreateProductsDialog} setFormData={setFormData} handleDelete={handleDelete} />) : null
        }
      </div>
      <Sheet open={openCreateProductsDialog} onOpenChange={() => {
        setOpenCreateProductsDialog(false)
        setCurrentEditedId(null)
        setFormData(initialFormData)
        setImageFile(null)
      }}>

        <SheetContent side='right' className='overflow-auto '>
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId !== null ? 'Edit Product' : 'Add New Product'
              }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState} isEditMode={currentEditedId !== null} />
          <div className='py-6'>
            <CommonForm onSubmit={onSubmit} formControls={addProductFormElements} formData={formData} setFormData={setFormData} isBtnDisabled={!isFormValid()} buttonText={
              currentEditedId !== null ? 'Edit' : 'Add'
            } />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts