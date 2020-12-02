import React, { useState, useRef, useEffect } from 'react';
import { TextField } from '@material-ui/core';

export default function PriceInput({
  label='Preço',
  priceValue,
  setPriceValue,
}) {
  const [ priceInputPosition, setPriceInputPosition] = useState(0);
  const priceInputRef = useRef(null);

  function handlePriceChange(event) {
    const position = event.target.selectionStart;
    let formatedPrice = event.target.value;
    
    // define for wrong cursor position when (value >= 100) 
    if(position > 2)
      setPriceInputPosition(position);
    else
      setPriceInputPosition(4);

    // Remove separação de centena e troca ',' por '.'
    formatedPrice = formatedPrice.replace(/\./g, '');
    formatedPrice = formatedPrice.replace(/,/g, '.');

    // keep only numbers and 1 dot
    formatedPrice = formatedPrice.replace(/[^0-9\.]|\.(?=\.)/g, '');

    // erase a zero when finds 3 number for cents
    formatedPrice = formatedPrice.replace(/0(?=([1-9]{0,2})$)/g, '');

    // add a dot before last two number with no dot finded 
    const dotNotfinded = formatedPrice.indexOf('.') === -1;
    if(dotNotfinded) {
      let arrayPrice = formatedPrice.split('');
      arrayPrice.push(arrayPrice[arrayPrice.length - 1]);
      arrayPrice[arrayPrice.length - 2] = arrayPrice[arrayPrice.length - 3];
      arrayPrice[arrayPrice.length - 3] = '.';
      formatedPrice = arrayPrice.join('');
    }
    
    if(formatedPrice)
      setPriceValue(formatedPrice);
    else
      setPriceValue(0);
  }

  useEffect(() => {
    priceInputRef.current.selectionStart = priceInputPosition;
    priceInputRef.current.selectionEnd = priceInputPosition;
  }, [ priceInputPosition ])
  
  return (
    <TextField
      type='text'
      label={label}
      value={ 
        parseFloat(priceValue) !== 0 ?
          parseFloat(priceValue).toLocaleString(
            'pt-br',
            {style:'currency', currency:'brl'}
          )
        : ''
      }
      inputProps = {{
        ref: priceInputRef
      }}
      onChange={ handlePriceChange }
    />
  );
}
