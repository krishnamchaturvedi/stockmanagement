import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

function CreateProduct() {
  const classes = useStyles();
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
    // Handle form submission logic

    // Reset the form
    setProduct({
      name: '',
      category: '',
      description: '',
      price: 0,
      quantity: 0,
    });
  };

  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography variant="h5">Create Product</Typography>
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
            Create
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateProduct;
