import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ScholarshipForm.css';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productImage: '',
    productCatagory: '',
    productDescription: '',
    royaltyEarning: 16, // Default value
    email: '',
  });

  const [errors, setErrors] = useState({
    productName: '',
    productImage: '',
    productCatagory: '',
    productDescription: '',
    email: '',
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
    if (!formData.productImage) {
      isValid = false;
      newErrors.productImage = 'Product image URL is required';
    }
    if (!formData.productCatagory) {
      isValid = false;
      newErrors.productCatagory = 'Product category is required';
    }
    if (!formData.productDescription) {
      isValid = false;
      newErrors.productDescription = 'Product description is required';
    }
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!formData.email) {
      isValid = false;
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      isValid = false;
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('/api/products', formData);
        console.log('Form Data Submitted:', response.data);
        toast.success('Form submitted successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Failed to submit the form.');
      }
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h1>Product Registration Form</h1>
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
            <label>Product Image URL:</label>
            <input
              type="text"
              name="productImage"
              value={formData.productImage}
              onChange={handleChange}
              required
            />
            {errors.productImage && <span className="error">{errors.productImage}</span>}
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
            <label>Royalty Earning:</label>
            <input
              type="number"
              name="royaltyEarning"
              value={formData.royaltyEarning}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Regex pattern for email validation
              title="Please enter a valid email address (e.g., example@example.com)"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProductForm;
