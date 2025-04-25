import React, { useState, useEffect } from 'react';
import api from '../../services/Api'; // Import API service
import AdminDashboard from '../../components/AdminDashboard';


const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const [newCategory, setNewCategory] = useState({ name: '', description: '' }); // Danh mục mới
  const [editingCategory, setEditingCategory] = useState(null); // Danh mục đang chỉnh sửa
  const [showAddForm, setShowAddForm] = useState(false); // Hiển thị form thêm
  const [showEditForm, setShowEditForm] = useState(false); // Hiển thị form sửa

  // Gọi API để lấy danh sách danh mục
  useEffect(() => {
    api.get('/Category')
      .then((response) => {
        setCategories(response.data); // Lưu danh mục vào state
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh mục:', error);
      });
  }, []);

  // Xử lý thêm danh mục
  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description) {
      api.post('/Category', newCategory)
        .then((response) => {
          setCategories([...categories, response.data]); // Thêm danh mục mới vào danh sách
          setNewCategory({ name: '', description: '' });
          setShowAddForm(false); // Đóng form thêm
        })
        .catch((error) => {
          console.error('Lỗi khi thêm danh mục:', error);
        });
    } else {
      alert('Vui lòng điền đầy đủ thông tin danh mục!');
    }
  };

  // Xử lý xóa danh mục
  const handleDeleteCategory = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      api.delete(`/Category/${id}`)
        .then(() => {
          setCategories(categories.filter((category) => category.id !== id)); // Xóa danh mục khỏi danh sách
        })
        .catch((error) => {
          console.error('Lỗi khi xóa danh mục:', error);
        });
    }
  };

  // Xử lý chỉnh sửa danh mục
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowEditForm(true); // Hiển thị form sửa
  };

  // Lưu danh mục sau khi chỉnh sửa
  const handleSaveEdit = () => {
    api.put(`/Category/${editingCategory.id}`, editingCategory)
      .then(() => {
        // Gọi lại API để lấy danh sách danh mục mới nhất
        api.get('/Category')
          .then((response) => {
            setCategories(response.data); // Cập nhật danh sách danh mục
            setEditingCategory(null);
            setShowEditForm(false); // Đóng form sửa
          })
          .catch((error) => {
            console.error('Lỗi khi tải lại danh sách danh mục:', error);
          });
      })
      .catch((error) => {
        console.error('Lỗi khi chỉnh sửa danh mục:', error);
      });
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminDashboard /> {/* Thêm Dashboard */}
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        <h1>Quản lý danh mục</h1>
        <button style={styles.addButton} onClick={() => setShowAddForm(true)}>Thêm danh mục</button>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Tên danh mục</th>
              <th style={styles.th}>Mô tả</th>
              <th style={styles.th}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <td style={styles.td}>{category.id}</td>
                <td style={styles.td}>{category.name}</td>
                <td style={styles.td}>{category.description}</td>
                <td style={styles.td}>
                  <button style={styles.editButton} onClick={() => handleEditCategory(category)}>Sửa</button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteCategory(category.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Form thêm danh mục */}
        {showAddForm && (
          <div style={styles.modal}>
            <h2>Thêm danh mục</h2>
            <input
              type="text"
              placeholder="Tên danh mục"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              style={styles.input}
            />
            <textarea
              placeholder="Mô tả danh mục"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              style={styles.textarea}
            />
            <button style={styles.saveButton} onClick={handleAddCategory}>Lưu</button>
            <button style={styles.cancelButton} onClick={() => setShowAddForm(false)}>Hủy</button>
          </div>
        )}

        {/* Form chỉnh sửa danh mục */}
        {showEditForm && editingCategory && (
          <div style={styles.modal}>
            <h2>Chỉnh sửa danh mục</h2>
            <input
              type="text"
              value={editingCategory.name}
              onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
              style={styles.input}
            />
            <textarea
              value={editingCategory.description}
              onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
              style={styles.textarea}
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
  textarea: {
    display: 'block',
    marginBottom: '10px',
    padding: '10px',
    width: '100%',
    height: '80px',
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

export default CategoryAdmin;