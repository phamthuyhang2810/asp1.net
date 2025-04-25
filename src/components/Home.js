import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import Navbar
import Footer from './Footer';
import Banner from './Banner';

const UserHomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <Navbar /> {/* Thêm Navbar */}
      <div style={styles.bannerWrapper}>
        <Banner />
      </div>
      <section style={styles.heroSection}>
        <h1 style={styles.heading}>Chào mừng đến với ShopBluePink 💖💙</h1>
        <p style={styles.subheading}>Khám phá các sản phẩm thời trang, phụ kiện cực xinh ✨</p>
        <button style={styles.ctaButton} onClick={() => navigate('/product')}>Xem Sản Phẩm</button>
      </section>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: '100vh',
    background: 'linear-gradient(to right, #e3f2fd, #fce4ec)',
    paddingTop: '80px', // Đẩy nội dung xuống dưới để không bị navbar che
  },
  bannerWrapper: {
    margin: 0, // Loại bỏ margin
    padding: 0, // Loại bỏ padding
  },
  heroSection: {
    textAlign: 'center',
    padding: '80px 20px',
  },
  heading: {
    fontSize: '36px',
    color: '#1a237e',
    marginBottom: '20px',
  },
  subheading: {
    fontSize: '20px',
    color: '#6a1b9a',
    marginBottom: '30px',
  },
  ctaButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
};

export default UserHomePage;
