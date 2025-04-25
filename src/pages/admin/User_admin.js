import React, { useState, useEffect } from 'react';
import api from '../../services/Api'; // Import API service
import AdminDashboard from '../../components/AdminDashboard';


const UserAdmin = () => {
  const [users, setUsers] = useState([]); // Danh sách người dùng
  const [newUser, setNewUser] = useState({ username: '', password: '', email: '' }); // Người dùng mới
  const [editingUser, setEditingUser] = useState(null); // Người dùng đang chỉnh sửa
  const [showAddForm, setShowAddForm] = useState(false); // Hiển thị form thêm
  const [showEditForm, setShowEditForm] = useState(false); // Hiển thị form sửa

  // Gọi API để lấy danh sách người dùng
  useEffect(() => {
    api.get('/User')
      .then((response) => {
        setUsers(response.data); // Lưu danh sách người dùng vào state
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
      });
  }, []);

  // Xử lý thêm người dùng
  const handleAddUser = () => {
    if (newUser.username && newUser.password && newUser.email) {
      api.post('/User', newUser)
        .then((response) => {
          setUsers([...users, response.data]); // Thêm người dùng mới vào danh sách
          setNewUser({ username: '', password: '', email: '' });
          setShowAddForm(false); // Đóng form thêm
        })
        .catch((error) => {
          console.error('Lỗi khi thêm người dùng:', error);
        });
    } else {
      alert('Vui lòng điền đầy đủ thông tin người dùng!');
    }
  };

  // Xử lý xóa người dùng
  const handleDeleteUser = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      api.delete(`/User/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== id)); // Xóa người dùng khỏi danh sách
        })
        .catch((error) => {
          console.error('Lỗi khi xóa người dùng:', error);
        });
    }
  };

  // Xử lý chỉnh sửa người dùng
  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditForm(true); // Hiển thị form sửa
  };

  // Lưu người dùng sau khi chỉnh sửa
  const handleSaveEdit = () => {
    api.put(`/User/${editingUser.id}`, editingUser)
      .then(() => {
        // Gọi lại API để lấy danh sách người dùng mới nhất
        api.get('/User')
          .then((response) => {
            setUsers(response.data); // Cập nhật danh sách người dùng
            setEditingUser(null);
            setShowEditForm(false); // Đóng form sửa
          })
          .catch((error) => {
            console.error('Lỗi khi tải lại danh sách người dùng:', error);
          });
      })
      .catch((error) => {
        console.error('Lỗi khi chỉnh sửa người dùng:', error);
      });
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminDashboard /> {/* Thêm Dashboard */}
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        <h1>Quản lý người dùng</h1>
        <button style={styles.addButton} onClick={() => setShowAddForm(true)}>Thêm người dùng</button>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Tên người dùng</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.username}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>
                  <button style={styles.editButton} onClick={() => handleEditUser(user)}>Sửa</button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteUser(user.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Form thêm người dùng */}
        {showAddForm && (
          <div style={styles.modal}>
            <h2>Thêm người dùng</h2>
            <input
              type="text"
              placeholder="Tên người dùng"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              style={styles.input}
            />
            <button style={styles.saveButton} onClick={handleAddUser}>Lưu</button>
            <button style={styles.cancelButton} onClick={() => setShowAddForm(false)}>Hủy</button>
          </div>
        )}

        {/* Form chỉnh sửa người dùng */}
        {showEditForm && editingUser && (
          <div style={styles.modal}>
            <h2>Chỉnh sửa người dùng</h2>
            <input
              type="text"
              value={editingUser.username}
              onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
              style={styles.input}
            />
            <input
              type="password"
              value={editingUser.password}
              onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
              style={styles.input}
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              style={styles.input}
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

export default UserAdmin;