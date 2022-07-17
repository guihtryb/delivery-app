import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from '../context/deliveryContext';
import ProductCartCard from '../components/ProductCartCard';
import InputsText from '../components/InputsText';
import Button from '../components/Button';

const arrayLint = [
  'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total', 'Remover Item'];

function Checkout({ history }) {
  const [adress, setAdress] = useState('');
  const [numero, setNumero] = useState(0);

  const {
    cartProducts,
    totalPrice,
    setOrders,
    orders,
  } = useContext(deliveryContext);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'adress') {
      setAdress(value);
    } else {
      setNumero(value);
    }
  };

  const handleClick = () => {
    // AQUI DEVERIA FAZER O POST PARA A API BOTANDO UM NOVO PEDIDO
    const obj = cartProducts;
    obj.adress = adress;
    obj.numero = numero;
    setOrders([...orders, obj]);
    history.push('/customer/orders');
  };

  return (
    <div className="cart-page flex-column">
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
            <h1
              data-testid="customer_checkout__element-order-total-price"
              className="primary total-price"
            >
              { `Total: R$${totalPrice}` }
            </h1>
          </table>
        </label>
      </main>
      <section>
        <InputsText
          dataTestId="customer_checkout__input-address"
          name="Endereço"
          callBack={ handleChange }
          stateName="adress"
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
