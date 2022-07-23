import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import deliveryContext from '../context/deliveryContext';
import ProductCartCard from '../components/ProductCartCard';
import InputsText from '../components/InputsText';
import Button from '../components/Button';
import InputsSelect from '../components/InputSelect';
import Navbar from '../components/Navbar';

const arrayLint = [
  'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total', 'Remover Item'];

function Checkout({ history }) {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState(0);
  const [sellerName, setSellerName] = useState('Fulana Pereira');

  const {
    cartProducts,
    totalPrice,
  } = useContext(deliveryContext);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'address') {
      setDeliveryAddress(value);
    } else if (name === 'options') {
      setSellerName(value);
    } else {
      setDeliveryNumber(value);
    }
  };

  const handleClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const { token } = user;

    axios({
      method: 'POST',
      url: 'http://localhost:3001/sales',
      data: {
        totalPrice,
        sellerName,
        deliveryAddress,
        deliveryNumber,
        status: 'Pendente',
      },
      headers: {
        Authorization: token,
      },
    });

    // O SET ORDERS SELECTED É INTERESSANTE MANTER, POIS ELE SERVE PARA DEIXAR SALVO O PEDIDO QUE VC CLICOU, E RENDERIZAR NA PAGINA DE
    // DETALHES
    // setOrdersSelected(obj);
    history.push('/customer/orders');
  };

  return (
    <div className="cart-page flex-column">
      <Navbar />
      <main>
        <label htmlFor="table-checkout">
          Finalizar pedido
          <table name="table-checkout">
            <thead>
              {
                arrayLint.map((x) => <th key={ `th-${x}` }>{ x }</th>)
              }
            </thead>
            <tbody>
              {
                cartProducts.map((product, index) => (<ProductCartCard
                  key={ product.name }
                  name={ product.name }
                  price={ product.price }
                  quantity={ product.quantity }
                  index={ index + 1 }
                  remove
                />))
              }
            </tbody>
          </table>
          <h1
            data-testid="customer_checkout__element-order-total-price"
            className="primary total-price"
          >
            { `Total: R$${totalPrice}` }
          </h1>
        </label>
      </main>
      <section className="flex-column inputs-section">
        <InputsSelect
          dataTestId="customer_checkout__select-seller"
          name="P. Vendedora Responsável"
          callBack={ handleChange }
          stateName="options"
          options={ ['Fulana Pereira'] }
        />
        <InputsText
          dataTestId="customer_checkout__input-address"
          name="Endereço"
          callBack={ handleChange }
          stateName="address"
        />
        <InputsText
          dataTestId="customer_checkout__input-address"
          name="Número"
          callBack={ handleChange }
          stateName="numero"
        />
        <Button
          dataTestId="customer_checkout__button-submit-order"
          name="FINALIZAR PEDIDO"
          importanceClass="primary"
          callBack={ handleClick }
          disabled={ false }
        />
      </section>
    </div>
  );
}

export default Checkout;

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
