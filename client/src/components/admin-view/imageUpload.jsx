import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL

function ProductImageUpload({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState }) {

    const inputRef = useRef(null)

    function handleImageFileChange(event) {
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0]
        if (selectedFile) setImageFile(selectedFile)

    }

    function handleDragOver(event) {

        event.preventDefault()
    }

    function handleDrop(event) {
        event.preventDefault()
        const droppedFile = event.dataTransfer.files?.[0]
        if (droppedFile) setImageFile(droppedFile)
    }

    function handleRemoveImage() {
        setImageFile(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }


    async function uploadImageToCloudinary() {
        setImageLoadingState(true)
        const data = new FormData()
        data.append('my_file', imageFile)
        const response = await axios.post(`${BACKEND_URL}/api/admin/products/upload-image`, data)
        console.log(response.data);

        if (response?.data?.success) {
            setUploadedImageUrl(response.data.result.url)
            setImageLoadingState(false)
        }

    }

    useEffect(() => {
        if (imageFile !== null) uploadImageToCloudinary()
    }, [imageFile])


    return (
        <div className='w-full max-w-md mx-auto mt-4'>
            <Label className='text-lg  font-semibold mb-2 block'>
                Upload Image
            </Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4 '>
                <Input id='image-upload' className='hidden' type='file' ref={inputRef} onChange={handleImageFileChange} />
                {
                    !imageFile ? <Label htmlFor='image-upload' className='flex flex-col items-center justify-center h-32 cursor-pointer ' >
                        <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
                        <span>Drag and drop or click to upload image</span>
                    </Label> : <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <FileIcon className='w-8 h-8 text-primary mr-2' />
                        </div>
                        <p className='text-sm font-medium'>{imageFile.name}</p>
                        <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage}>
                            <XIcon className='w-4 h-4' />
                            <span className='sr-only'>Remove File</span>
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductImageUpload