import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.title}>Admin Panel</h2>
        <ul style={styles.menu}>
          <li style={styles.menuItem} onClick={() => navigate('/admin/productadmin')}>Sản phẩm</li>
          <li style={styles.menuItem} onClick={() => navigate('/admin/categories')}>Danh mục</li>
          <li style={styles.menuItem} onClick={() => navigate('/admin/users')}>Người dùng</li>
          <li style={styles.menuItem} onClick={() => navigate('/admin/order')}>Đơn hàng</li>
          <li style={styles.menuItem} onClick={() => navigate('/admin/orderdetail')}>Chi tiết đơn hàng</li>
          <li style={{ ...styles.menuItem, ...styles.logout }} onClick={handleLogout}>Đăng xuất</li>
        </ul>
      </div>
      {/* <div style={styles.content}>
        <h1 style={styles.heading}>🎉 Chào mừng đến Dashboard Admin</h1>
        <p style={styles.subtext}>Chọn menu bên trái để quản lý dữ liệu.</p>
      </div> */}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: "'Segoe UI', sans-serif",
    background: 'linear-gradient(to right, #e3f2fd, #fce4ec)',
  },
  sidebar: {
    width: '240px',
    background: 'linear-gradient(to bottom, #2196f3, #e91e63)',
    color: 'white',
    padding: '25px 20px',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '22px',
    marginBottom: '25px',
    borderBottom: '2px solid rgba(255,255,255,0.4)',
    paddingBottom: '10px',
    textAlign: 'center',
  },
  menu: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  menuItem: {
    margin: '15px 0',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  logout: {
    color: '#ffebee',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  content: {
    flex: 1,
    padding: '60px',
    background: 'rgba(255, 255, 255, 0.8)',
    borderTopLeftRadius: '30px',
    borderBottomLeftRadius: '30px',
    boxShadow: '-5px 0 20px rgba(0, 0, 0, 0.05)',
  },
  heading: {
    fontSize: '30px',
    color: '#1a237e',
  },
  subtext: {
    fontSize: '18px',
    color: '#880e4f',
  },
};

export default AdminDashboard;
