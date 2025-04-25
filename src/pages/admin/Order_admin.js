import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../../services/Api'; // Import API service
import AdminDashboard from '../../components/AdminDashboard';

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ customerName: '', totalPrice: '', status: '' });
  const [editingOrder, setEditingOrder] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate(); // Khởi tạo navigate

  useEffect(() => {
    api.get('/order') // Gọi API để lấy danh sách đơn hàng
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      });
  }, []);

  // Thêm đơn hàng
  const handleAddOrder = () => {
    console.log('Dữ liệu gửi lên:', newOrder); // Kiểm tra dữ liệu trước khi gửi

    if (newOrder.customerName && newOrder.totalPrice && newOrder.status) {
      api.post('/order', newOrder)
        .then((response) => {
          console.log('Phản hồi từ server:', response.data); // Kiểm tra phản hồi từ server
          setOrders([...orders, response.data]); // Thêm đơn hàng mới vào danh sách
          setNewOrder({ customerName: '', totalPrice: '', status: '' });
          setShowAddForm(false); // Đóng form thêm
        })
        .catch((error) => {
          console.error('Lỗi khi thêm đơn hàng:', error);
        });
    } else {
      alert('Vui lòng điền đầy đủ thông tin đơn hàng!');
    }
  };

  // Sửa đơn hàng
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setShowEditForm(true);
  };

  const handleSaveEdit = () => {
    api.put(`/order/${editingOrder.id}`, editingOrder)
      .then(() => {
        api.get('/order') // Gọi lại API để lấy danh sách đơn hàng mới nhất
          .then((response) => {
            setOrders(response.data); // Cập nhật danh sách đơn hàng
            setEditingOrder(null);
            setShowEditForm(false); // Đóng form sửa
          })
          .catch((error) => {
            console.error('Lỗi khi tải lại danh sách đơn hàng:', error);
          });
      })
      .catch((error) => {
        console.error('Lỗi khi chỉnh sửa đơn hàng:', error);
      });
  };

  // Xóa đơn hàng
  const handleDeleteOrder = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      api.delete(`/order/${id}`)
        .then(() => {
          setOrders(orders.filter((order) => order.id !== id)); // Xóa đơn hàng khỏi danh sách
        })
        .catch((error) => {
          console.error('Lỗi khi xóa đơn hàng:', error);
        });
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminDashboard /> {/* Thêm Dashboard */}
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        <h1>Quản lý đơn hàng</h1>
        <button style={styles.addButton} onClick={() => setShowAddForm(true)}>Thêm đơn hàng</button>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Khách hàng</th>
              <th style={styles.th}>Tổng tiền</th>
              <th style={styles.th}>Trạng thái</th>
              <th style={styles.th}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <td style={styles.td}>{order.id}</td>
                <td style={styles.td}>{order.customerName}</td>
                <td style={styles.td}>{order.totalPrice?.toLocaleString()} VNĐ</td>
                <td style={styles.td}>{order.status}</td>
                <td style={styles.td}>
                  <button style={styles.detailButton} onClick={() => navigate(`/admin/orders/${order.id}`)}>
                    Xem chi tiết
                  </button>
                  <button style={styles.editButton} onClick={() => handleEditOrder(order)}>Sửa</button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteOrder(order.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Form thêm đơn hàng */}
        {showAddForm && (
          <div style={styles.modal}>
            <h2>Thêm đơn hàng</h2>
            <input
              type="text"
              placeholder="Tên khách hàng"
              value={newOrder.customerName}
              onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Tổng tiền"
              value={newOrder.totalPrice}
              onChange={(e) => setNewOrder({ ...newOrder, totalPrice: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Trạng thái"
              value={newOrder.status}
              onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
              style={styles.input}
            />
            <button style={styles.saveButton} onClick={handleAddOrder}>Lưu</button>
            <button style={styles.cancelButton} onClick={() => setShowAddForm(false)}>Hủy</button>
          </div>
        )}

        {/* Form chỉnh sửa đơn hàng */}
        {showEditForm && editingOrder && (
          <div style={styles.modal}>
            <h2>Chỉnh sửa đơn hàng</h2>
            <input
              type="text"
              value={editingOrder.customerName}
              onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
              style={styles.input}
              placeholder="Tên khách hàng"
            />
            <input
              type="text"
              value={editingOrder.status}
              onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
              style={styles.input}
              placeholder="Trạng thái"
            />
            <button style={styles.saveButton} onClick={handleSaveEdit}>Lưu</button>
            <button style={styles.cancelButton} onClick={() => setShowEditForm(false)}>Hủy</button>
          </div>
        )}
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
  addButton: {
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  detailButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  editButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    zIndex: 1000,
  },
  input: {
    display: 'block',
    marginBottom: '10px',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default OrderAdmin;