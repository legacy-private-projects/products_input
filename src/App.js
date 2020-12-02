import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Fab } from '@material-ui/core';
import { AddRounded, Delete } from '@material-ui/icons';

import PriceInput from './components/PriceInput';
import './app.css';
import './global.css';

function App() {
  const [ products, setProducts ] = useState([]);
  const [ averagePrice, setAveragePrice ] = useState(0);

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
    productsCopy[index].purchasePrice = value;
    setProducts(productsCopy);
  }

  function updateTitle(index, value) {
    let productsCopy = [...products];
    productsCopy[index].title = value;
    setProducts(productsCopy);
  }

  useEffect(() => {
    let totalPrice = 0;
    products.forEach( product => {
      totalPrice += parseFloat(product.purchasePrice);
    });
    console.log(totalPrice)
    if (products.length > 0)
      setAveragePrice(totalPrice/products.length)
  }, [products]);
  
  return (
    <div className='App'>
      <header>
        <h1>
          Custo médio:
        </h1>

        <h2>
          {
            averagePrice.toLocaleString(
              'pt-br',
              {style:'currency', currency:'brl'}
            )
          }
        </h2>
      </header>
      <main>
        {products.map((product, index) => (
          <div key={product._id} className='product'>
            <section className='content' >
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
            </section>
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
