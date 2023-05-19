"use client";

import { OrderItem } from "@/components/OrderItem";
import { api } from "@/libs/api";
import { dateFormat } from "@/libs/dateFormat";
import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Refresh, Search } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, InputAdornment, Skeleton, TextField, Typography } from "@mui/material";
import { KeyboardEvent, useEffect, useState } from "react";

const Page = () => {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [printOrder, setPrintOrder] = useState<Order | null>(null);

  const getOrders = async () => {
    setSearchInput('');
    setOrders([]);
    setLoading(true);
    const orderList: Order[] = await api.getOrders();
    setOrders(orderList);
    setLoading(false);
  }

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    setSearchInput('');
    setFilteredOrders(orders);
  }, [orders]);

  const handleSearchKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code.toLowerCase() === 'enter') {
      if (searchInput != '') {
        let newOrders: Order[] = [];

        for (let i in orders) {
          if (orders[i].id.toString() === searchInput) {
            newOrders.push(orders[i]);
          }
        }

        setFilteredOrders(newOrders)
      } else {
        setFilteredOrders(orders);
      }
    }
  }

  const handleChangeStatus = async (id: number, newStatus: OrderStatus) => {
    await api.changeOrderStatus(id, newStatus);
    getOrders();
  }

  const handlePrintAction = (order: Order) => {
    setPrintOrder(order);
    setTimeout(() => {
      if (window) window.print();
    }, 200);
  }

  return (
    <>
      <Box sx={{ my: 3, displayPrint: 'none' }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography component="h5" variant="h5" sx={{ color: '#555', mr: 5 }}>Pedidos</Typography>
            {loading && <CircularProgress size={24} />}
            {!loading &&
              < Button onClick={getOrders} size="small" sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
                <Refresh />
                <Typography
                  component="div"
                  sx={{ color: '#555', display: { xs: 'none', sm: 'block' } }}
                >
                  Actualizar
                </Typography>
              </Button>
            }

          </Box>

          <TextField
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyUp={handleSearchKey}
            placeholder="Pesquise um pedido"
            variant="standard"
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Box>

        <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 4 }}>
          {loading &&
            <>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
            </>
          }
          {!loading && filteredOrders.map((item, index) => (
            <Grid key={index} item xs={1}>
              <OrderItem
                item={item}
                onChangeStatus={handleChangeStatus}
                onPrint={handlePrintAction}
              />
            </Grid>
          ))

          }
        </Grid>
      </Box >
      <Box sx={{ display: 'none', displayPrint: 'block' }}>
        {printOrder &&
          <>
            <Typography component="h5" variant="h5">Pedido</Typography>
            <Box>ID: #{printOrder.id}</Box>
            <Box>Data do pedido: {dateFormat(printOrder.orderDate)}</Box>
            <Box>Cliente: {printOrder.userName}</Box>

            <Typography component="h5" variant="h5">Pagamento</Typography>
            <Box>Tipo de pagamento: {printOrder.paymentType === 'card' ? 'Cartao' : 'Dinheiro'}</Box>
            <Box>Subtotal: Mzn {printOrder.subtotal.toFixed(2)}</Box>
            <Box>Entrega: Mzn {printOrder.shippingPrice.toFixed(2)}</Box>
            {printOrder.cupomDiscount && <Box>Desconto: -Mzn {printOrder.cupomDiscount.toFixed(2)}</Box>}
            <Box>Total: Mzn {printOrder.total.toFixed(2)}</Box>

            <Typography component="h5" variant="h5">Endereco</Typography>
            <Box>Rua: {printOrder.shippingAddress.address}</Box>
            <Box>Numero: {printOrder.shippingAddress.number}</Box>
            <Box>Complemento: {printOrder.shippingAddress.complement}</Box>
            <Box>BI: {printOrder.shippingAddress.cep}</Box>
            <Box>Bairro: {printOrder.shippingAddress.neighborhood}</Box>
            <Box>Cidade: {printOrder.shippingAddress.city}</Box>
            <Box>Estado: {printOrder.shippingAddress.state}</Box>

            <Typography component="h5" variant="h5">Itens</Typography>
            {printOrder.products.map((item, index) => (
              <Box key={index}>
                {item.qt}x {item.product.name}
              </Box>
            ))}
          </>
        }
      </Box>
    </>
  )
}

export default Page;