import { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft
} from 'react-icons/md';

import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import { api } from '../../services/api';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Container } from './styles';
import FavoriteProduct from '../FavoriteProduct';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  installmentPrice: string;
  labelTitle?: string | undefined;
  labelImage?: string | undefined;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
  newSumAmount: number;
}

export default function SwipeProducts() {

  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {

    const newSumAmount = {...sumAmount};
    newSumAmount[product.id] = product.amount;

    return newSumAmount;
  }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      // Chamada da API obtem vetor com todos os produtos
      const response = await api.get<Product[]>('products');

      const data = response.data.map(product =>({
        ...product,
        priceFormatted: formatPrice(product.price)
      }));

      console.log(data);

      setProducts(data);
    }

    loadProducts();

  }, []);

  function handleAddProduct(id: number) {
    // Adiciona produto ao carrinho pela Id
    addProduct(id);
  }

  return (
    <Container>
      <button className="prod_next"><MdKeyboardArrowRight size={30} /></button>
      <button className="prod_prev"><MdKeyboardArrowLeft size={30} /></button>
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 30
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20
          }
        }}
        slidesPerView={4}
        spaceBetween={20}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={{
          nextEl: ".prod_next",
          prevEl: ".prod_prev"
        }}
        pagination={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <img src={product.image} alt={product.title} title={product.title} loading="lazy" />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <span className="price-installment">{product.installmentPrice}</span>
            <button
              type="button"
              data-testid="add-product-button"
            onClick={() => handleAddProduct(product.id)}
            >
              <div className="cart-product-quantity" data-testid="cart-product-quantity">
                {cartItemsAmount[product.id] || 0}
              </div>

              <span>COMPRAR</span>
            </button>
            <div className="cart-product-favorite">
              <FavoriteProduct key={product.id} />
            </div>
            <div className="cart-product-label">
              <img src={product.labelImage} height={20} alt="" loading="lazy" title="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
