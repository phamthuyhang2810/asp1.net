import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Checkoutsuccess.css'; // Đảm bảo bạn tạo file CSS này

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout-success-container">
      <div className="success-message">
        <h1>🎉 Thanh toán thành công! 🎉</h1>
        <p>Cảm ơn bạn đã mua sắm tại ShopBluePink 💖💙</p>
        <button className="back-to-home-btn" onClick={() => navigate('/')}>
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;