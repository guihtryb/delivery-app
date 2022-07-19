import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import deliveryContext from '../context/deliveryContext';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';

const buttonDatatest = 'customer_products__button-cart';

function ProductsPage({ history }) {
  // QUANDO A REQUISIÇAO A API FOR FEITA CORRETAMENTE, MUDAR O PRODUCTSMock para a resposta da api
  const [products, setProducts] = useState([]);
  const { totalPrice } = useContext(deliveryContext);
  console.log(products);

  const fetchProductsApi = () => {
    // ISSO AQUI DEVE SER CHAMADO DENTRO DO USE EFFECT, PARA SER CHAMADO QUANDO CARREGAR A PAGINA
    axios.get('http://localhost:3001/products').then((response) => {
      setProducts(response.data);
    });
  };

  useEffect(() => {
    fetchProductsApi();
  }, []);

  return (
    <>
      <Navbar userName="Lucca" userRole="customer" />
      <div className="products-page flex-column">
        <main>
          {
            products.map((x) => {
            // ESSES NOMES PODEM NAO SER OS CERTOS DA RESPOSTA DA API, MAS SAO UMA BASE OBVIA DO QUE É NECEESARIO
              const { name, price, id, urlImg } = x;
              return (<ProductCard
                key={ `${name}-${id}` }
                name={ name }
                imgSrc={ urlImg }
                productId={ id }
                price={ price }
              />);
            })
          }
        </main>
        <button
          type="button"
          data-testid={ buttonDatatest }
          className="primary see-car-button"
          onClick={ () => { history.push('/customer/checkout'); } }
        >
          Ver carrinho: R$
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            { totalPrice }
          </span>
        </button>
      </div>
    </>
  );
}

export default ProductsPage;

ProductsPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
