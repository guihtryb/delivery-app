import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from '../context/deliveryContext';
import ProductCartCard from '../components/ProductCartCard';
import InputsText from '../components/InputsText';
import Button from '../components/Button';
import InputsSelect from '../components/InputSelect';
import Navbar from '../components/Navbar';
import salesService from '../services/sales';

const tableColumns = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
  'Remover Item',
];

function Checkout({ history }) {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState(0);
  const [sellerName, setSellerName] = useState('Fulana Pereira');
  const [saleId, setSaleId] = useState(0);

  const {
    cartProducts,
    totalPrice,
    sellersOptions,
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

    const data = {
      totalPrice,
      sellerName,
      deliveryAddress,
      deliveryNumber,
      status: 'Pendente',
    };
    // cartProducts,

    const headers = {
      Authorization: token,
    };

    const registerSale = async () => {
      const newsaleId = await salesService.createSale(data, headers);

      setSaleId(newsaleId);
    };

    registerSale();

    // axios.post('http://localhost:3001/sales', {
    //   data: {
    //     totalPrice,
    //     sellerName,
    //     deliveryAddress,
    //     // cartProducts
    //     // db -> cartProducts.forEach((product) => saleProducts.create(productId, quantity))
    //     deliveryNumber,
    //     status: 'Pendente',
    //   },
    //   headers: {
    //     Authorization: token,
    //   },
    // })
    //   .then((res) => setSaleId(res.data.id));
  };

  const redirectToOrderDetails = (id) => history.push(`/customer/orders/${id}`);

  if (saleId) redirectToOrderDetails(saleId);

  return (
    <div className="cart-page flex-column">
      <Navbar />
      <main>
        <label htmlFor="table-checkout">
          Finalizar pedido
          <table name="table-checkout">
            <thead>
              {
                tableColumns.map((column) => <th key={ `th-${column}` }>{ column }</th>)
              }
            </thead>
            <tbody>
              {
                cartProducts.map((product, index) => (<ProductCartCard
                  key={ product.name }
                  name={ product.name }
                  price={ product.price }
                  quantity={ product.quantityProduct }
                  index={ index }
                  remove
                />))
              }
            </tbody>
          </table>
          <h1
            data-testid="customer_checkout__element-order-total-price"
            className="primary total-price"
          >
            { totalPrice.replace('.', ',') }
          </h1>
        </label>
      </main>
      <section className="flex-column inputs-section">
        <InputsSelect
          dataTestId="customer_checkout__select-seller"
          name="P. Vendedora Responsável"
          callBack={ handleChange }
          stateName="options"
          sellerName={ sellerName }
          options={ sellersOptions }
        />
        <InputsText
          dataTestId="customer_checkout__input-address"
          name="Endereço"
          callBack={ handleChange }
          stateName="address"
        />
        <InputsText
          dataTestId="customer_checkout__input-addressNumber"
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
