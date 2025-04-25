import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Xử lý logout
      setIsLoggedIn(false);
      alert('Bạn đã đăng xuất!');
    } else {
      // Chuyển hướng đến trang login
      navigate('/login');
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>HangPinkShop</div>
      <ul style={styles.navLinks}>
        <li style={styles.link} onClick={() => navigate('/')}>Home</li>
        <li style={styles.link} onClick={() => navigate('/product')}>Products</li>
        <li style={styles.link} onClick={() => navigate('/contact')}>Contact</li>
        <li style={styles.link} onClick={() => navigate('/favorites')}>Yêu thích</li>
        <li style={styles.link} onClick={() => navigate('/cart')}>Giỏ hàng</li>
        <li style={styles.link} onClick={() => navigate('/loginuser')}>Đăng nhập</li>
        <li style={styles.link} onClick={() => navigate('/logout')}>Đăng xuất</li>
        <li style={styles.link} onClick={handleLoginLogout}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed', // Giữ cố định ở đầu trang
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
    background: 'linear-gradient(to right, #2196f3, #e91e63)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    zIndex: 1000, // Đảm bảo navbar luôn ở trên các thành phần khác
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  link: {
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'color 0.2s ease',
  },
};

export default Navbar;