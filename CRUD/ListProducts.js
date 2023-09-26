import { useEffect, useState } from 'react';
import db from './firebase';
import Product from './Product';

function ListProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRef = collection(db, 'products');
        const querySnapshot = await getDocs(productRef);
        const productData = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const product = new Product(doc.id, data.name, data.category, data.description, data.price, data.quantity);
          productData.push(product);
        });

        setProducts(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListProducts;
