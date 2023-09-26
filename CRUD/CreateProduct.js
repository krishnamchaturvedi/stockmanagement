import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import db from './firebase';

function CreateProduct() {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productRef = collection(db, 'products');
      await addDoc(productRef, product);
      console.log('Product added successfully.');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };


  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProduct;
