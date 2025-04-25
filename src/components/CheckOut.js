import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const CheckOut = ({ cartItems }) => {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán!');
    } else {
      alert('Thanh toán thành công!');
      navigate('/checkout-success'); // Chuyển hướng đến trang thanh toán thành công
    }
  };

  return (
    <div className="checkout-page" style={{ paddingTop: '80px' }}>
      <Navbar />
      <h2 className="title">💳 Thanh toán</h2>
      <div className="checkout-details">
        <h3>Thông tin đơn hàng:</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x {item.price?.toLocaleString()} VNĐ
            </li>
          ))}
        </ul>
        <h3>Tổng tiền: {totalPrice.toLocaleString()} VNĐ</h3>
        <button
          className="confirm-btn"
          onClick={handleCheckout}
        >
          Xác nhận thanh toán
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CheckOut;