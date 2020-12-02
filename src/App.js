import React, { useState } from 'react';
import { TextField, IconButton, Fab } from '@material-ui/core';
import { AddRounded, Delete } from '@material-ui/icons';

import PriceInput from './components/PriceInput';
import './global.css';

function App() {
  const [ products, setProducts ] = useState([]);

  function createNewProduct() {
    setProducts([...products, {
      _id: Math.random(),
      title: '',
      purchasePrice: 0,
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

            <PriceInput
              label='Preço de compra'
              priceValue={products[index].purchasePrice}
              setPriceValue={ value => updatePrice(index, value)}
            />

            <IconButton onClick={ () => deleteProduct(product._id) } >
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
