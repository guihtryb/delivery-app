import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import deliveryContext from '../context/deliveryContext';

function ProductCard({ name, id, price, imgSrc }) {
  const [quantityProduct, setQuantity] = useState(0);
  const imgDatatest = `customer_products__img-card-bg-image-${id}`;
  const priceDatatest = `customer_products__element-card-price-${id}`;
  const nameDatatest = `customer_products__element-card-title-${id}`;
  const menosDatatest = `customer_products__button-card-rm-item-${id}`;
  const maisDatatest = `customer_products__button-card-add-item-${id}`;
  const quantityDatatest = `customer_products__input-card-quantity-${id}`;
  const {
    updateCartProducts,
  } = useContext(deliveryContext);

  const priceParse = (priceToParse) => priceToParse.replace('.', ',');

  const handleButtonClick = ({ target: { innerText } }) => {
    let aux = quantityProduct;
    if (innerText === '-' && quantityProduct !== 0) {
      setQuantity(quantityProduct - 1);
      aux -= 1;
    } else if (innerText === '-' && quantityProduct === 0) {
      setQuantity(0);
    } else {
      aux += 1;
      setQuantity(quantityProduct + 1);
    }

    updateCartProducts({
      name,
      price,
      id,
      quantityProduct: aux,
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const productQuantity = Number(value);
    if (productQuantity <= 0) setQuantity(0);

    setQuantity(productQuantity);
    updateCartProducts({
      name,
      price,
      id,
      quantityProduct: productQuantity,
    });
  };

  return (
    <div
      className="product-card flex-column"
    >
      <p data-testid={ priceDatatest } className="price">{ priceParse(price) }</p>
      <img
        width="40"
        src={ imgSrc }
        alt={ `product-${name}` }
        data-testid={ imgDatatest }
      />
      <p data-testid={ nameDatatest }>
        {
          name
        }
      </p>

      <div className="add-button-products flex-row">
        <Button
          name="-"
          callBack={ handleButtonClick }
          dataTestId={ menosDatatest }
          importanceClass="primary"
          disabled={ false }
        />
        <input
          data-testid={ quantityDatatest }
          className={ `input-${id}` }
          onChange={ handleChange }
          value={ quantityProduct }
          type="text"
        />
        <Button
          name="+"
          callBack={ handleButtonClick }
          dataTestId={ maisDatatest }
          importanceClass="primary"
          disabled={ false }
        />
      </div>
    </div>
  );
}
export default ProductCard;

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
