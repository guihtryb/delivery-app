import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import deliveryContext from '../context/deliveryContext';

const NEGATIVE_ONE = -1;

function ProductCard({ name, productId, price, imgSrc }) {
  const [quantity, setQuantity] = useState(0);
  const imgDatatest = `customer_products__img-card-bg-image-${productId}`;
  const priceDatatest = `customer_products__element-card-price-${productId}`;
  const nameDatatest = `customer_products__element-card-title-${productId}`;
  const menosDatatest = `customer_products__button-card-rm-item-${productId}`;
  const maisDatatest = `customer_products__button-card-add-item-${productId}`;
  const quantityDatatest = `customer_products__input-card-quantity-${productId}`;
  const {
    updateCartProducts,
  } = useContext(deliveryContext);

  const priceParse = (priceToParse) => priceToParse.replace('.', ',');

  const handleButtonClick = ({ target: { innerText } }) => {
    const opValue = innerText === '-' ? NEGATIVE_ONE : 1;
    if (quantity === 0 && opValue === NEGATIVE_ONE) return;
    setQuantity(quantity + opValue);

    updateCartProducts({
      name,
      price,
      productId,
      quantity: quantity + opValue,
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
      productId,
      quantity: productQuantity,
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
          onChange={ handleChange }
          value={ quantity }
          type="number"
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
  productId: PropTypes.number.isRequired,
};
