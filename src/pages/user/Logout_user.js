import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem('user');
    alert('Bạn đã đăng xuất thành công!');
    // Chuyển hướng về trang đăng nhập
    navigate('/loginuser');
  }, [navigate]);

  return null; // Không cần giao diện cho trang này
};

export default LogoutUser;