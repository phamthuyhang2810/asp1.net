import React, { useState, useEffect } from 'react';
import api from '../../services/Api'; // Import API service
import AdminDashboard from '../../components/AdminDashboard';

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', description: '', categoryId: '', imageFile: null });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/product')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      });
  }, []);

  useEffect(() => {
    api.get('/Category') // Đảm bảo endpoint chính xác
      .then((response) => {
        setCategories(response.data); // Lưu danh mục vào state
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh mục:', error);
      });
  }, []);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.categoryId && newProduct.image) {
      const productData = {
        ...newProduct,
      };
  
      api.post('/product', productData)
        .then((response) => {
          console.log('Thêm sản phẩm thành công:', response.data);
          setProducts([...products, response.data]); // Thêm sản phẩm mới vào danh sách
          setNewProduct({ name: '', price: '', image: '', description: '', categoryId: '' });
          setShowAddForm(false); // Đóng form thêm
        })
        .catch((error) => {
          console.error('Lỗi khi thêm sản phẩm:', error);
          alert('Không thể thêm sản phẩm. Vui lòng kiểm tra lại.');
        });
    } else {
      alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
    }
  };
  

  const handleDeleteProduct = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      api.delete(`/product/${id}`)
        .then(() => {
          setProducts(products.filter((product) => product.id !== id));
        })
        .catch((error) => {
          console.error('Lỗi khi xóa sản phẩm:', error);
        });
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowEditForm(true);
  };

  const handleSaveEdit = () => {
    if (editingProduct.imageFile) {
      // Upload ảnh trước nếu có file mới
      const formData = new FormData();
      formData.append('file', editingProduct.imageFile);
      formData.append('productId', editingProduct.id);

      api.post('/product/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((uploadResponse) => {
          // Sau khi upload ảnh thành công, cập nhật sản phẩm
          const updatedProduct = {
            ...editingProduct,
            image: uploadResponse.data.image, // URL ảnh từ server
          };

          return api.put(`/product/${editingProduct.id}`, updatedProduct);
        })
        .then(() => {
          api.get('/product')
            .then((response) => {
              setProducts(response.data);
              setEditingProduct(null);
              setShowEditForm(false);
            })
            .catch((error) => {
              console.error('Lỗi khi tải lại danh sách sản phẩm:', error);
            });
        })
        .catch((error) => {
          console.error('Lỗi khi chỉnh sửa sản phẩm:', error);
        });
    } else {
      // Nếu không có file mới, chỉ cập nhật sản phẩm
      api.put(`/product/${editingProduct.id}`, editingProduct)
        .then(() => {
          api.get('/product')
            .then((response) => {
              setProducts(response.data);
              setEditingProduct(null);
              setShowEditForm(false);
            })
            .catch((error) => {
              console.error('Lỗi khi tải lại danh sách sản phẩm:', error);
            });
        })
        .catch((error) => {
          console.error('Lỗi khi chỉnh sửa sản phẩm:', error);
        });
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminDashboard /> {/* Thêm Dashboard */}
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        <h1>Quản lý sản phẩm</h1>
        <button style={styles.addButton} onClick={() => setShowAddForm(true)}>Thêm sản phẩm</button>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Hình ảnh</th>
              <th style={styles.th}>Tên sản phẩm</th>
              <th style={styles.th}>Giá</th>
              <th style={styles.th}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <td style={styles.td}>{product.id}</td>
                <td style={styles.td}>
                  <img
                    src={`http://localhost:5001/api/Product/image/${product.image}`}
                    alt={product.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                    onError={(e) => {
                      e.target.onerror = null; // Ngăn lỗi lặp lại
                      e.target.src = 'https://via.placeholder.com/100x100?text=No+Image'; // Hiển thị ảnh mặc định nếu lỗi
                    }}
                  />
                </td>
                <td style={styles.td}>{product.name}</td>
                <td style={styles.td}>{product.price} VNĐ</td>
                <td style={styles.td}>
                  <button style={styles.editButton} onClick={() => handleEditProduct(product)}>Sửa</button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Form thêm sản phẩm */}
        {showAddForm && (
          <div style={styles.modal}>
            <h2>Thêm sản phẩm</h2>
            <input
              type="text"
              placeholder="Tên sản phẩm"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Giá sản phẩm"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="URL hình ảnh"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              style={styles.input}
            />
            <textarea
              placeholder="Mô tả sản phẩm"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              style={styles.textarea}
            />
            <select
              value={newProduct.categoryId}
              onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
              style={styles.input}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button style={styles.saveButton} onClick={handleAddProduct}>Lưu</button>
            <button style={styles.cancelButton} onClick={() => setShowAddForm(false)}>Hủy</button>
          </div>
        )}

        {/* Form chỉnh sửa sản phẩm */}
        {showEditForm && editingProduct && (
          <div style={styles.modal}>
            <h2>Chỉnh sửa sản phẩm</h2>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              style={styles.input}
              placeholder="Tên sản phẩm"
            />
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
              style={styles.input}
              placeholder="Giá sản phẩm"
            />
            {editingProduct.image && (
              <div style={{ marginBottom: '10px' }}>
                <img
                  src={`http://localhost:5001/api/Product/image/${editingProduct.image}`}
                  alt={editingProduct.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEditingProduct({ ...editingProduct, imageFile: e.target.files[0] })}
              style={styles.input}
            />
            <textarea
              value={editingProduct.description}
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
              style={styles.textarea}
              placeholder="Mô tả sản phẩm"
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
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    padding: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  th: {
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '10px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#fff',
  },
  editButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    marginRight: '5px',
    borderRadius: '4px',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  addButton: {
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    marginBottom: '20px',
    borderRadius: '4px',
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
    width: '400px',
  },
  input: {
    display: 'block',
    marginBottom: '10px',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    display: 'block',
    marginBottom: '10px',
    padding: '10px',
    width: '100%',
    height: '80px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    marginRight: '10px',
    borderRadius: '4px',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default ProductAdmin;
