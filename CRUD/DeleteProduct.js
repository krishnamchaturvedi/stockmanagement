import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/firestore';
import styles from '../styles/DeleteProduct.module.css';

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const router = useRouter();
  const firebaseConfig = {
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('products')
      .get()
      .then((querySnapshot) => {
        const productData = [];
        querySnapshot.forEach((doc) => {
          productData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productData);
      });
  }, []);

  const handleProductDelete = () => {
    if (!selectedProductId) return;

    const db = firebase.firestore();

    db.collection('products')
      .doc(selectedProductId)
      .delete()
      .then(() => {
        setProducts(products.filter((product) => product.id !== selectedProductId));
        setSelectedProductId(null);
      })
      .catch((error) => {
        console.error('Error deleting product: ', error);
      });
  };

  return (
    <div className={styles.container}>
      <h2>Delete Product</h2>
      <div className={styles.productList}>
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              className={selectedProductId === product.id ? styles.selected : ''}
              onClick={() => setSelectedProductId(product.id)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleProductDelete} disabled={!selectedProductId}>
        Delete
      </button>
      <button onClick={() => router.push('/')}>Go Back</button>
    </div>
  );
};

export default DeleteProduct;
