import  { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ScholarshipForm.css';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productCatagory: '',
    price: '',
    colour: [''],
    productDescription: '',
    size: [''],
    tags: [''],
    discountedPrice: '',
    productCode: '',
    productImage: null,
  });

  const [errors, setErrors] = useState({
    productName: '',
    productCatagory: '',
    price: '',
    colour: '',
    productDescription: '',
    size: '',
    tags: '',
    discountedPrice: '',
    productCode: '',
    productImage: '',
  });

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;
    if (field) {
      const updatedArray = [...formData[field]];
      updatedArray[index] = value;
      setFormData({
        ...formData,
        [field]: updatedArray,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors({
      ...errors,
      [name]: '', 
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      productImage: e.target.files[0],
    });
  };

  const handleAddField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ''],
    });
  };

  const handleRemoveField = (index, field) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: updatedArray,
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
    if (formData.colour.some((colour) => !colour)) {
      isValid = false;
      newErrors.colour = 'All colour fields are required';
    }
    if (!formData.productDescription) {
      isValid = false;
      newErrors.productDescription = 'Product description is required';
    }
    if (formData.size.some((size) => !size)) {
      isValid = false;
      newErrors.size = 'All size fields are required';
    }
    if (formData.tags.some((tag) => !tag)) {
      isValid = false;
      newErrors.tags = 'All tag fields are required';
    }
    if (!formData.discountedPrice) {
      isValid = false;
      newErrors.discountedPrice = 'Discounted price is required';
    }
    if (!formData.productCode) {
      isValid = false;
      newErrors.productCode = 'Product code is required';
    }
    if (!formData.productImage) {
      isValid = false;
      newErrors.productImage = 'Product image is required';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = new FormData();
        for (const key in formData) {
          if (Array.isArray(formData[key])) {
            data.append(key, JSON.stringify(formData[key]));
          } else {
            data.append(key, formData[key]);
          }
        }

        const response = await axios.post('https://server-dot-aatman-studio.el.r.appspot.com/AddProduct/:AdminId', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
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
            <label>Colours:</label>
            {formData.colour.map((colour, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={colour}
                  onChange={(e) => handleChange(e, index, 'colour')}
                  required
                />
                {index > 0 && (
                  <button type="button" onClick={() => handleRemoveField(index, 'colour')}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('colour')}>
              Add Colour
            </button>
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
            <label>Sizes:</label>
            {formData.size.map((size, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => handleChange(e, index, 'size')}
                  required
                />
                {index > 0 && (
                  <button type="button" onClick={() => handleRemoveField(index, 'size')}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('size')}>
              Add Size
            </button>
            {errors.size && <span className="error">{errors.size}</span>}
          </div>
          <div className="form-group">
            <label>Tags:</label>
            {formData.tags.map((tag, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleChange(e, index, 'tags')}
                  required
                />
                {index > 0 && (
                  <button type="button" onClick={() => handleRemoveField(index, 'tags')}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('tags')}>
              Add Tag
            </button>
            {errors.tags && <span className="error">{errors.tags}</span>}
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
          <div className="form-group">
            <label>Product Image:</label>
            <input
              type="file"
              name="productImage"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            {errors.productImage && <span className="error">{errors.productImage}</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProductForm;
