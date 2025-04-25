import React from 'react';
import '../css/Footer.css'; // Nhớ import file CSS

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>Về chúng tôi</h2>
          <p>
            Shop Hằng chuyên cung cấp các sản phẩm thời trang chất lượng cao, phong cách hiện đại và giá cả phải chăng.
          </p>
        </div>

        <div className="footer-section">
          <h2>Liên hệ</h2>
          <p>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
          <p>Điện thoại: 0909 123 456</p>
          <p>Email: shop@hang.vn</p>
        </div>

        <div className="footer-section">
          <h2>Theo dõi chúng tôi</h2>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">TikTok</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Hằng Shop. All rights reserved.
      </div>
    </footer>
  );
}
