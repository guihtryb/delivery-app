import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from '../context/deliveryContext';
import ProductCartCard from '../components/ProductCartCard';
import InputsText from '../components/InputsText';
import Button from '../components/Button';
import InputsSelect from '../components/InputSelect';
import Navbar from '../components/Navbar';

const arrayLint = [
  'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total', 'Remover Item'];

function Checkout({ history }) {
  const [adress, setAdress] = useState('');
  const [numero, setNumero] = useState(0);
  // SETAR COMO VALOR INICIAL DO ARRAY DE PESSOAS VENDEDORAS
  const [seller, setSeller] = useState('walter White');

  const getDate = () => {
    const today = new Date();
    return `${today.getDate()}/${today.getMonth()}/${(today.getFullYear())}`;
  };

  const {
    cartProducts,
    totalPrice,
    setOrders,
    orders,
    setOrdersSelected,
  } = useContext(deliveryContext);

  console.log(cartProducts);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'adress') {
      setAdress(value);
    } else if (name === 'options') {
      setSeller(value);
    } else {
      setNumero(value);
    }
  };

  const handleClick = () => {
    // AQUI DEVERIA FAZER O POST PARA A API BOTANDO UM NOVO PEDIDO
    const obj = cartProducts;
    obj.adress = adress;
    obj.numero = numero;
    obj.seller = seller;
    obj.date = getDate();
    obj.orderTotalPrice = totalPrice;
    // AQUI JA CRIA O PEDIDO, COM O PREÇO TOTAL, ENDEREÇO E NUMERO.
    // O SET ORDERS BASICO, É UM ARRAY GLOBAL COM TODOS OS PEDIDOS Q A PESSOA USUARIA FEZ, MAS COM A API NAO É NECESSARIO MANTER ELE
    // MAS ATE ESTA TUDO FUNCIONANDO, DEIXEM ELE AQUI PARA TESTER AS APLICAÇOES DO FRONT
    setOrders([...orders, obj]);

    // O SET ORDERS SELECTED É INTERESSANTE MANTER, POIS ELE SERVE PARA DEIXAR SALVO O PEDIDO QUE VC CLICOU, E RENDERIZAR NA PAGINA DE
    // DETALHES
    setOrdersSelected(obj);
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
          options={ ['walter white', 'alcapone', 'rozana'] }
        />
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
