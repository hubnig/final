import React from 'react';
import emptyCart from '../assets/image/empty-cart.png';
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>Корзина пустая 😕</h2>
          <p>
            Вероятней всего, вы не добавляли ещё игры в корзину.
            <br />
            Для того, чтобы добавить игру, перейди на главную страницу.
          </p>
          <img src={emptyCart} alt="Empty cart" />
          <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
