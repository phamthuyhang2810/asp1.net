import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/Api'; // Import API service
import AdminDashboard from '../../components/AdminDashboard';
import { useNavigate } from 'react-router-dom';

const OrderDetailAdmin = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [orderDetails, setOrderDetails] = useState([]);
  const [newDetail, setNewDetail] = useState({ productId: '', quantity: '', unitPrice: '' });
  const [editingDetail, setEditingDetail] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const navigate = useNavigate();

  // Lấy danh sách chi tiết đơn hàng
  useEffect(() => {
    api.get(`/orderdetail`) // Gọi API với ID
      .then((response) => {
        console.log('Dữ liệu chi tiết đơn hàng:', response.data); // Log dữ liệu trả về
        setOrderDetails(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách chi tiết đơn hàng:', error);
      });
  }, [id]);

  const handleViewDetail = (detailId) => {
    const detail = orderDetails.find((item) => item.id === detailId);
    setSelectedDetail(detail); // Lưu thông tin chi tiết vào state
  };

  // Đóng modal
  const handleCloseDetail = () => {
    setSelectedDetail(null);
  };

  // Thêm chi tiết đơn hàng
  const handleAddDetail = () => {
    if (newDetail.productId && newDetail.quantity && newDetail.unitPrice) {
      api.post(`/api/orderdetail`, newDetail)
        .then((response) => {
          setOrderDetails([...orderDetails, response.data]); // Thêm chi tiết mới vào danh sách
          setNewDetail({ productId: '', quantity: '', unitPrice: '' });
          setShowAddForm(false); // Đóng form thêm
        })
        .catch((error) => {
          console.error('Lỗi khi thêm chi tiết đơn hàng:', error);
        });
    } else {
      alert('Vui lòng điền đầy đủ thông tin chi tiết đơn hàng!');
    }
  };

  // Sửa chi tiết đơn hàng
  const handleEditDetail = (detail) => {
    setEditingDetail(detail);
    setShowEditForm(true);
  };

  const handleSaveEdit = () => {
    api.put(`/orderdetail/${editingDetail.id}`, editingDetail)
      .then(() => {
        setOrderDetails(orderDetails.map((detail) =>
          detail.id === editingDetail.id ? editingDetail : detail
        ));
        setEditingDetail(null);
        setShowEditForm(false); // Đóng form sửa
      })
      .catch((error) => {
        console.error('Lỗi khi chỉnh sửa chi tiết đơn hàng:', error);
      });
  };

  // Xóa chi tiết đơn hàng
  const handleDeleteDetail = (detailId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa chi tiết đơn hàng này?')) {
      api.delete(`/orderdetail/${id}`)
        .then(() => {
          setOrderDetails(orderDetails.filter((detail) => detail.id !== id)); // Xóa chi tiết khỏi danh sách
        })
        .catch((error) => {
          console.error('Lỗi khi xóa chi tiết đơn hàng:', error);
        });
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminDashboard />
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        <h1>Chi tiết đơn hàng</h1>
        <button style={styles.addButton} onClick={() => setShowAddForm(true)}>Thêm chi tiết</button>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>ID Sản phẩm</th>
              <th style={styles.th}>Số lượng</th>
              <th style={styles.th}>Đơn giá</th>
              <th style={styles.th}>Tổng</th>
              <th style={styles.th}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.length > 0 ? (
              orderDetails.map((item, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                  <td style={styles.td}>{item.id}</td>
                  <td style={styles.td}>{item.productId}</td>
                  <td style={styles.td}>{item.quantity}</td>
                  <td style={styles.td}>{item.unitPrice?.toLocaleString()} VNĐ</td>
                  <td style={styles.td}>{(item.quantity * item.unitPrice)?.toLocaleString()} VNĐ</td>
                  <td style={styles.td}>
                    <button style={styles.editButton} onClick={() => handleEditDetail(item)}>Sửa</button>
                    <button style={styles.deleteButton} onClick={() => handleDeleteDetail(item.id)}>Xóa</button>
                    <button style={styles.detailButton} onClick={() => handleViewDetail(item.id)}>Xem chi tiết</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>Không có chi tiết đơn hàng nào.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Form thêm chi tiết */}
        {showAddForm && (
          <div style={styles.modal}>
            <h2>Thêm chi tiết đơn hàng</h2>
            <input
              type="text"
              placeholder="ID Sản phẩm"
              value={newDetail.productId}
              onChange={(e) => setNewDetail({ ...newDetail, productId: e.target.value })}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Số lượng"
              value={newDetail.quantity}
              onChange={(e) => setNewDetail({ ...newDetail, quantity: e.target.value })}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Đơn giá"
              value={newDetail.unitPrice}
              onChange={(e) => setNewDetail({ ...newDetail, unitPrice: e.target.value })}
              style={styles.input}
            />
            <button style={styles.saveButton} onClick={handleAddDetail}>Lưu</button>
            <button style={styles.cancelButton} onClick={() => setShowAddForm(false)}>Hủy</button>
          </div>
        )}

        {/* Form chỉnh sửa chi tiết */}
        {showEditForm && editingDetail && (
          <div style={styles.modal}>
            <h2>Chỉnh sửa chi tiết đơn hàng</h2>
            <input
              type="text"
              value={editingDetail.productId}
              onChange={(e) => setEditingDetail({ ...editingDetail, productId: e.target.value })}
              style={styles.input}
              placeholder="ID Sản phẩm"
            />
            <input
              type="number"
              value={editingDetail.quantity}
              onChange={(e) => setEditingDetail({ ...editingDetail, quantity: e.target.value })}
              style={styles.input}
              placeholder="Số lượng"
            />
            <input
              type="number"
              value={editingDetail.unitPrice}
              onChange={(e) => setEditingDetail({ ...editingDetail, unitPrice: e.target.value })}
              style={styles.input}
              placeholder="Đơn giá"
            />
            <button style={styles.saveButton} onClick={handleSaveEdit}>Lưu</button>
            <button style={styles.cancelButton} onClick={() => setShowEditForm(false)}>Hủy</button>
          </div>
        )}

        {selectedDetail && (
          <div style={styles.modal}>
            <h2>Chi tiết đơn hàng</h2>
            <p><strong>ID:</strong> {selectedDetail.id}</p>
            <p><strong>ID Đơn hàng:</strong> {selectedDetail.orderId}</p>
            <p><strong>ID Sản phẩm:</strong> {selectedDetail.productId}</p>
            <p><strong>Tên sản phẩm:</strong> {selectedDetail.product?.name}</p>
            <p><strong>Số lượng:</strong> {selectedDetail.quantity}</p>
            <p><strong>Đơn giá:</strong> {selectedDetail.unitPrice?.toLocaleString()} VNĐ</p>
            <p><strong>Tổng:</strong> {(selectedDetail.quantity * selectedDetail.unitPrice)?.toLocaleString()} VNĐ</p>
            <p><strong>Mô tả sản phẩm:</strong> {selectedDetail.product?.description}</p>
            <img
              src={`http://localhost:5001/api/Product/image/${selectedDetail.product?.image}`}
              alt={selectedDetail.product?.name}
              style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
              }}
            />
            <button style={styles.cancelButton} onClick={handleCloseDetail}>Đóng</button>
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
  detailButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginLeft: '5px',
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

export default OrderDetailAdmin;