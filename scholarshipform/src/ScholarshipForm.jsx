import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ScholarshipForm.css';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productCatagory: '',
    price: '',
    colour:[],
    productDescription: '',
    discountedPrice: '',
    productCode: '',
  });

  const [errors, setErrors] = useState({
    productName: '',
    productCatagory: '',
    price: '',
    colour:"",
    productDescription: '',
    discountedPrice: '',
    productCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '', // Clear error message when user starts typing
    });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.productName) {
      isValid = false;
      newErrors.productName = 'Product name is required';
    }
    if (!formData.productCatagory) {
      isValid = false;
      newErrors.productCatagory = 'Product category is required';
    }
    if (!formData.price) {
      isValid = false;
      newErrors.price = 'Price is required';
    }
 
    if (!formData.productDescription) {
      isValid = false;
      newErrors.productDescription = 'Product description is required';
    }
 
 
    if (!formData.discountedPrice) {
      isValid = false;
      newErrors.discountedPrice = 'Discounted price is required';
    }
    if (!formData.productCode) {
      isValid = false;
      newErrors.productCode = 'Product code is required';
    }

    setErrors(newErrors);
    return isValid;
  };

  // let stringcolur =JSON.stringify(formData.colour)
  // formData.colour = stringcolur
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formdata",formData)
    
    if (validateForm()) {
      try {
        const response = await axios.post('https://server-dot-aatman-studio.el.r.appspot.com/AddProduct/1', formData,
        {
          "Content-Type": "multipart/form-data",
        });
        console.log('Form Data Submitted:', response.data);
        toast.success('Form submitted successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Failed to submit the form.');
      }
    }
  };

  return (
    <div className="form-wrapper h-100 ">
      <div className="form-container mt-3 mb-5">
        <h1 className="text-start ms-5">Product Registration Form</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name:</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
            {errors.productName && <span className="error">{errors.productName}</span>}
          </div>
          <div className="form-group">
            <label>Product Category:</label>
            <input
              type="text"
              name="productCatagory"
              value={formData.productCatagory}
              onChange={handleChange}
              required
            />
            {errors.productCatagory && <span className="error">{errors.productCatagory}</span>}
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            {errors.price && <span className="error">{errors.price}</span>}
          </div>
          <div className="form-group">
            <label>colour:</label>
            <input
              type="text"
              name="colour"
              value={formData.colour}
              onChange={handleChange}
              required
            />
            {errors.colour && <span className="error">{errors.colour}</span>}
          </div>
        
          <div className="form-group">
            <label>Product Description:</label>
            <input
              type="text"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              required
            />
            {errors.productDescription && <span className="error">{errors.productDescription}</span>}
          </div>
          
          <div className="form-group">
            <label>Discounted Price:</label>
            <input
              type="number"
              name="discountedPrice"
              value={formData.discountedPrice}
              onChange={handleChange}
              required
            />
            {errors.discountedPrice && <span className="error">{errors.discountedPrice}</span>}
          </div>
          <div className="form-group">
            <label>Product Code:</label>
            <input
              type="text"
              name="productCode"
              value={formData.productCode}
              onChange={handleChange}
              required
            />
            {errors.productCode && <span className="error">{errors.productCode}</span>}
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProductForm;
