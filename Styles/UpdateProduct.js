import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../components/Auth'; // Your authentication context
import { useParams, useHistory } from 'react-router-dom'; // You may need to install react-router-dom

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

function UpdateProduct() {
  const classes = useStyles();
  const { user } = useAuth();
  const { productId } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    // Fetch existing product data based on productId
    // You should implement a function to retrieve product data from Firestore here
    // Set the product state with the fetched data
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle product update logic here
    // You should implement a function to update the product in Firestore here
    // Redirect to the product details page after successful update
    history.push(`/products/${productId}`);
  };

  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography variant="h5">Update Product</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Category"
            variant="outlined"
            name="category"
            value={product.category}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Price"
            variant="outlined"
            name="price"
            type="number"
            value={product.price}
            onChange={handleInputChange}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            name="quantity"
            type="number"
            value={product.quantity}
            onChange={handleInputChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default UpdateProduct;
