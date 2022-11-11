import React, { useEffect } from "react";
import { Modal, Backdrop, TextField, InputAdornment, Autocomplete, Button, Stack, Divider, Box, Typography } from '@mui/material'
import FileUpload from "../../components/FileUpload";
import { displayMessage } from '../../utils/messages'
import { useState } from 'react'
import { useBrand } from "../../views/merchant/customhooks/index"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function EditProductModal({ open, handleClose, liftedProductData }) {
    const parsedProductData = {
        sku: liftedProductData.sku,
        name: liftedProductData.name,
        description: liftedProductData.description,
        quantity: liftedProductData.quantity,
        price: liftedProductData.price,
        brand: liftedProductData.brand,
        image: liftedProductData.image,
        merchant: "636458aacdca6561d00fe6e4"
    }

    const [productData, setProductData] = useState(parsedProductData)
    const { brandData } = useBrand()
    useEffect(() => {
        console.log(parsedProductData)
        setProductData(parsedProductData)
    }, [parsedProductData.sku])

    const handleProductDataChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value })
    }

    const handleBrandAutoComplete = (event, newValue) => {
        setProductData({ ...productData, brand: newValue.id })
    }
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box sx={style}>
                    <Typography variant="h4" gutterBottom>Update Product</Typography>
                    <Stack spacing={3} sx={{ marginTop: '20px' }}>
                        <Stack direction="row" spacing={2}>
                            <TextField required label="SKU" name="sku" variant="outlined"
                                InputProps={{ startAdornment: <InputAdornment position="start">{productData.sku}</InputAdornment>, }} onChange={handleProductDataChange} />
                            <TextField required label="Name" name="name" variant="outlined"
                                InputProps={{ startAdornment: <InputAdornment position="start">{productData.name}</InputAdornment>, }} onChange={handleProductDataChange} />
                        </Stack>
                        <TextField required multiline maxRows={3} label="Description" name="description" variant="outlined"
                            InputProps={{ startAdornment: <InputAdornment position="start">{productData.description}</InputAdornment>, }} onChange={handleProductDataChange} />
                        <Stack direction="row" spacing={2}>
                            <TextField required type="number" label="Quantity" name="quantity" variant="outlined"
                                InputProps={{ startAdornment: <InputAdornment position="start">{productData.quantity}</InputAdornment>, }} onChange={handleProductDataChange} />
                            <TextField required type="number" label="Price" name="price"
                                InputProps={{ startAdornment: <InputAdornment position="start">${productData.price}</InputAdornment>, }} onChange={handleProductDataChange} />
                        </Stack>
                        <Autocomplete required freeSolo options={brandData} renderInput={(params) => <TextField {...params} label="Brand" />} onChange={handleBrandAutoComplete} />
                        <div><p>Image Upload</p>
                            <FileUpload
                                callback={(imageURL) => {
                                    displayMessage("Image Uploaded Successfully")
                                    setProductData({ ...productData, image: imageURL })
                                }}
                                fileName={productData.brand + productData.name + productData.sku}
                                folderPath="merchantProductsImages/"
                            /></div>
                        <Divider variant="middle" />
                        <Button variant="contained" color="success">Update Product</Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}