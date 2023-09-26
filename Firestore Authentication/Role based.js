import { useEffect, useState } from 'react';
import { useAuth } from '../components/Auth'; 
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function ProductDetail({ productId }) {
  const { user } = useAuth();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!user) {
        return;
      }

      const db = getFirestore();
      const productRef = doc(db, 'products', productId);

      try {
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();

          if (user.role === 'admin') {
            setProduct(productData);
          } else if (user.role === 'staff') {
            setProduct({
              name: productData.name,
              category: productData.category,
            });
          }
        } else {
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [user, productId]);
  return (
    <div>
      {product ? (
        <div>
          <h2>{product.name}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
