import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/Api'; // Import API service
import AdminDashboard from '../../components/AdminDashboard';

const OrderDetail = () => {
  const { id } = useParams(); // Lấy ID đơn hàng từ URL
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Gọi API để lấy chi tiết đơn hàng
    api.get(`/order/${id}`)
      .then((response) => {
        setOrderDetails(response.data); // Lưu dữ liệu từ API vào state
      })
      .catch((error) => {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
      });
  }, [id]);

  if (!orderDetails) {
    return <p>Đang tải chi tiết đơn hàng...</p>;
  }

  return (
    <div style={{ display: 'flex' }}>
      <AdminDashboard /> {/* Thêm Dashboard */}
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        <h1>Chi tiết đơn hàng</h1>
        <button style={styles.backButton} onClick={() => navigate('/admin/orders')}>
          Quay lại
        </button>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tên sản phẩm</th>
              <th style={styles.th}>Số lượng</th>
              <th style={styles.th}>Đơn giá</th>
              <th style={styles.th}>Tổng</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.orderDetails.map((item, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <td style={styles.td}>{item.productId}</td> {/* Hiển thị ID sản phẩm */}
                <td style={styles.td}>{item.quantity}</td>
                <td style={styles.td}>{item.unitPrice?.toLocaleString()} VNĐ</td>
                <td style={styles.td}>{(item.quantity * item.unitPrice)?.toLocaleString()} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.summary}>
          <p><strong>Ngày đặt hàng:</strong> {orderDetails.orderDate}</p>
          <p><strong>Tổng tiền:</strong> {orderDetails.orderDetails.reduce((total, item) => total + item.quantity * item.unitPrice, 0)?.toLocaleString()} VNĐ</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  th: {
    textAlign: 'left',
    padding: '10px',
    backgroundColor: '#1976d2',
    color: 'white',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  backButton: {
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  summary: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
};

export default OrderDetail;