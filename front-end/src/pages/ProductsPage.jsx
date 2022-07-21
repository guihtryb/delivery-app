import React, { useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import deliveryContext from '../context/deliveryContext';
import ProductCard from '../components/ProductCard';
import { productsMock } from '../helpers/productsMock';
import Navbar from '../components/Navbar';

const buttonDatatest = 'customer_products__button-cart';

function ProductsPage({ history }) {
  // QUANDO A REQUISIÇAO A API FOR FEITA CORRETAMENTE, MUDAR O PRODUCTSMock para a resposta da api
  const [products, setProcuts] = useState(productsMock);
  const { totalPrice } = useContext(deliveryContext);

  const fetchProductsApi = () => {
    // ISSO AQUI DEVE SER CHAMADO DENTRO DO USE EFFECT, PARA SER CHAMADO QUANDO CARREGAR A PAGINA
    axios.get('https//:localhost:3001/products').then((x) => x.json()).then((res) => {
      console.log(res);
      setProcuts(res);
    });
  };

  // O FETCH SERA CHAMADO NO INICIO DO CODIGO PARA CONSUMIR A API E RECEBER OS PRODUTOS DE LA
  console.log(fetchProductsApi);

  return (
    <div className="products-page flex-column">
      <Navbar />
      <main>
        {
          products.map((x) => {
            // ESSES NOMES PODEM NAO SER OS CERTOS DA RESPOSTA DA API, MAS SAO UMA BASE OBVIA DO QUE É NECEESARIO
            const { name, price, id, img } = x;
            return (<ProductCard
              key={ `${name}-${id}` }
              name={ name }
              imgSrc={ img }
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
