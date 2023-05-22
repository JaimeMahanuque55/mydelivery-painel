import { Category } from "@/types/Category";
import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Product } from "@/types/Product";

const tmpProduct: Product = {
  id: 999,
  image: 'https://saopaulosecreto.com/wp-content/uploads/2022/10/Get-Burger-1024x683.jpg',
  category: {
    id: 99,
    name: 'Burgers'
  },
  name: 'Burgao Mau',
  price: 100,
  description: 'Melhor hamburguer da cidade'
}

export const api = {
  login: async (email: string, password: string): Promise<{ error: string, token?: string }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (email !== 'burguer@gmail.com') {
          resolve({
            error: 'E-mail e/ou senha estao incorrectos'
          });
        } else {
          resolve({
            error: '',
            token: '123'
          });
        }
      }, 1000);
    });
  },

  forgotPassword: async (email: string): Promise<{ error: string }> => {

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ error: '' });
      }, 1000);
    })
  },
  redefinePassword: async (password: string, token: string): Promise<{ error: string }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ error: '' });
      }, 1000);
    })
  },
  getOrders: async (): Promise<Order[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const orders: Order[] = [];
        const statuses: OrderStatus[] = ['preparing', 'sent', 'delivered']

        // TODO: requests array

        for (let i = 0; i < 6; i++) {
          orders.push({
            id: parseInt('12' + i),
            status: statuses[Math.floor(Math.random() * 3)],
            orderDate: '2023-05-04 18:30',
            userId: '1',
            userName: 'James',
            shippingAddress: {
              id: 99,
              cep: '11133334',
              address: 'Q.15',
              number: '1200',
              neighborhood: 'Liberdade',
              city: 'Matola',
              state: 'MP',
              complement: 'yes'
            },
            shippingPrice: 12,
            paymentType: 'money',
            changeValue: 0,
            cupom: 'BLA',
            cupomDiscount: 2,
            products: [
              { qt: 2, product: tmpProduct },
              { qt: 3, product: { ...tmpProduct, id: 888, name: 'Burgao doce' } }
            ],
            subtotal: 99,
            total: 120
          });
        }
        resolve(orders);
      }, 1000);
    });
  },
  changeOrderStatus: async (id: number, newStatus: OrderStatus) => {
    return true;
  },
  getCategories: async (): Promise<Category[]> => {
    const list: Category[] = [
      { id: 99, name: 'Burguers' },
      { id: 98, name: 'Refrigerantes' },
      { id: 97, name: 'Doces' },
    ];
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(list)
      }, 200);
    })
  },
  getProducts: async (): Promise<Product[]> => {
    const list: Product[] = [
      { ...tmpProduct, id: 123 },
      { ...tmpProduct, id: 124 },
      { ...tmpProduct, id: 125 },
      { ...tmpProduct, id: 126 },
      { ...tmpProduct, id: 127 },
      { ...tmpProduct, id: 128 },
      { ...tmpProduct, id: 129 },
      { ...tmpProduct, id: 130 },
    ];
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(list)
      }, 200);
    })
  }

}