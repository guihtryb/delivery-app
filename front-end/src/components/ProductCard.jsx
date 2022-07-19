import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import deliveryContext from '../context/deliveryContext';

function ProductCard({ name, productId, price, imgSrc }) {
  const [quantity, setQuantity] = useState(0);

  const {
    setCartProducts,
    cartProducts,
  } = useContext(deliveryContext);

  const handleButtonClick = ({ target: { innerText } }) => {
    // AUMENTA OU DIMINUI A QUANTIDADE
    const aux = quantity;
    if (innerText === '-' && quantity > 0) {
      setQuantity(aux - 1);
    } else if (innerText === '+') {
      setQuantity(aux + 1);
    }
  };

  useEffect(() => {
    if (quantity) {
      const obj = {
        name,
        price,
        productId,
        quantity,
      };
      // isso aqui basicamente cria um outro elemento no array, que representa o produto selecionado, sua quantidade, preço
      // id e nome, e esse filtro é pra nao deixar duplicatas, meio ganbiarra, se alguem pensar algum jeito melhor, fique a vontade
      // mas funciona perfeitamente
      setCartProducts([...cartProducts.filter((x) => x.name !== name), obj]);
    }
  }, [quantity]);

  const imgDatatest = `customer_products__img-card-bg-image-${productId}`;
  const priceDatatest = `customer_products__element-card-price-${productId}`;
  const nameDatatest = `customer_products__element-card-title-${productId}`;
  const menosDatatest = `customer_products__button-card-rm-item-${productId}`;
  const maisDatatest = `customer_products__button-card-add-item-${productId}`;
  return (
    <div
      className="product-card flex-column"
    >
      <p data-testid={ priceDatatest } className="price">{ `R$${price}` }</p>
      <img src={ imgSrc } alt={ `product-${name}` } data-testid={ imgDatatest } />
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
        {
          quantity
        }
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
  price: PropTypes.number.isRequired,
  productId: PropTypes.number.isRequired,
};
