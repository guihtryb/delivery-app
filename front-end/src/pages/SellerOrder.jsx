import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import salesService from '../services/sales';
import DetailsOrder from '../components/DetailsOrder';

function SellerOrder() {
  const [sellerOrder, setSellerOrder] = useState({});
  const { pathname } = useLocation();
  const urlParts = pathname.split('/');
  const orderId = urlParts[urlParts.length - 1];

  // obs: ESSA PAGINA SERA RENDERIZADA QUANDO A PESSOA USUARIA CONCLUIR UM PEDIDO NO CARRINHO, OU CLICAR EM UM PEDIDO
  // DA SUA LISTA DE PEDIDOS, ENTAO É PRECISO PASSAR PARA ESSA PAGINA O PEDIDO CORRETO A SER RENDERIZADO,
  // A LOGICA Q EU ESCOLHI AQUI, FOI SALVAR NO ESTADO GLOBAL O ULTIMO PEDIDO SELECIONADO, PARA ASSIM, QUANDO A GENTE ENTRAR
  // NA PAGINA DE DETAILS, SO RENDERIZAR ESSE PEDIDO SALVO GLOBALMENTE
  //

  useEffect(() => {
    const loadSellerOrders = async () => {
      const sellerOrdersData = await salesService.getBySaleId(orderId);
      setSellerOrder(sellerOrdersData);
    };

    loadSellerOrders();
  }, [orderId]);

  return (
    <div className="order-page flex-column">
      <Navbar />
      <DetailsOrder
        name="Fulana Pereira"
        pedidos={ [sellerOrder] } // wip - passar só objeto sale
        data={ sellerOrder.saleDate }
      />
    </div>
  );
}

export default SellerOrder;

SellerOrder.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
