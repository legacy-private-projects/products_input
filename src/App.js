import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Fab } from '@material-ui/core';
import { AddRounded, Delete } from '@material-ui/icons';

import './global.css';

function App() {
  const [ products, setProducts ] = useState([]);

  function createNewProduct() {
    setProducts([...products, {
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

  function updatePrice(index, value) {
    let productsCopy = [...products];
    console.log('index = ')
    console.log(index);
    productsCopy[index].purchasePrice = value;
    setProducts(productsCopy);
  }

  function updateTitle(index, value) {
    let productsCopy = [...products];
    productsCopy[index].title = value;
    setProducts(productsCopy);
    console.log('index = ')
    console.log(index);
  }
  
  return (
    <div className='App'>
      <header>
        <h1>
          Média
        </h1>
      </header>
      <main>
        {products.map((product, index) => (
          <div key={product._id} className='product'>
            <TextField
              type='text'
              label='Nome do produto'
              value={products[index].title}
              onChange={(event ) => updateTitle(index, event.target.value)}
            />
            
            <TextField
              type='text'
              label='Preço de compra'
              value={products[index].purchasePrice}
              onChange={(event ) => updatePrice(index, event.target.value)}
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
