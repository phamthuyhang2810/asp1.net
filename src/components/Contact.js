import React from 'react';
import Navbar from './Navbar'; // Import Navbar
import '../css/Contact.css'; // Import CSS
import Footer from './Footer';

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <h1 className="contact-title">Liên hệ với chúng tôi</h1>
        <p className="contact-description">
          Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào, vui lòng liên hệ với chúng tôi qua biểu mẫu dưới đây.
        </p>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Họ và tên</label>
            <input type="text" id="name" placeholder="Nhập họ và tên của bạn" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Nhập email của bạn" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Tin nhắn</label>
            <textarea id="message" rows="5" placeholder="Nhập tin nhắn của bạn"></textarea>
          </div>
          <button type="submit" className="contact-submit">Gửi</button>
        </form>
      </div>
      <Footer />
      
    </div>
  );
};

export default Contact;