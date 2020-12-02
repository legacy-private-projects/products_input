import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Fab } from '@material-ui/core';
import { AddRounded, Delete } from '@material-ui/icons';

import './global.css';

function App() {
  const [ products, setProducts ] = useState([]);

  function createNewProduct() {
    setProducts([...setProducts, {
      _id: Math.random(),
      title: '',
      purchasePrice: null,
    }])
  }

  function deleteProduct(productId) {
    const remaningProducts = products.filter( product => {
      if(product._id !== productId)
        return product;
    });

    setProducts(remaningProducts);
  }

  useEffect(() => {
    setProducts([
      {
        _id: Math.random(),
        title: 'some title',
        purchasePrice: 18,
      },
      {
        _id: Math.random(),
        title: 'some title',
        purchasePrice: 18,
      },
      {
        _id: Math.random(),
        title: 'some title',
        purchasePrice: 18,
      },
      {
        _id: Math.random(),
        title: 'some title',
        purchasePrice: 18,
      }
    ])
  }, []);
  
  return (
    <div className='App'>
      <header>
        <h1>
          Média
        </h1>
      </header>
      <main>
        {products.map(product => (
          <div key={product._id} className='product'>
            <h2> {product.title} </h2>
            <TextField
              type='text'
              label='Preço de compra'
              value={null}
            />

            <IconButton onClick={ product => deleteProduct(product._id) } >
              <Delete />
            </IconButton>
          </div>
        ))}

        <Fab onClick={createNewProduct}>
          <AddRounded />
        </Fab>
      </main>
    </div>
  );
}

export default App;
