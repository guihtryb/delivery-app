// import React, { useContext, useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
// import deliveryContext from '../context/deliveryContext';
import DetailsOrder from '../components/DetailsOrder';
// import Navbar from '../components/Navbar';

// function CustomerOrder({ history }) {
function CustomerOrder() {
  // const { ordersSelected } = useContext(deliveryContext);
  const [order, setOrder] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  // obs: ESSA PAGINA SERA RENDERIZADA QUANDO A PESSOA USUARIA CONCLUIR UM PEDIDO NO CARRINHO, OU CLICAR EM UM PEDIDO
  // DA SUA LISTA DE PEDIDOS, ENTAO É PRECISO PASSAR PARA ESSA PAGINA O PEDIDO CORRETO A SER RENDERIZADO,
  // A LOGICA Q EU ESCOLHI AQUI, FOI SALVAR NO ESTADO GLOBAL O ULTIMO PEDIDO SELECIONADO, PARA ASSIM, QUANDO A GENTE ENTRAR
  // NA PAGINA DE DETAILS, SO RENDERIZAR ESSE PEDIDO SALVO GLOBALMENTE

  useEffect(() => {
    // const { token } = JSON.parse(localStorage.getItem('user'));
    const url = pathname.split('/');
    const id = url[url.length - 1];
    console.log(id);

    axios
      .get(`http://localhost:3001/sales/${id}`)
      .then((response) => {
        setOrder(response.data);
        setIsLoading(false);
        console.log(response.data);
        console.log('aqui');
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="order-page flex-column">
      {/* <Navbar /> */}
      { isLoading ? (<p>Loading</p>) : (
        <DetailsOrder
          name={ order.seller }
          pedidos={ order }
          data={ order.date }
        />
      )}
      {/* <DetailsOrder
        name={ ordersSelected.seller }
        pedidos={ ordersSelected }
        data={ ordersSelected.date }
      />   */}
    </div>
  );
}

export default CustomerOrder;

CustomerOrder.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
