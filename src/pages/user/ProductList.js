import React, { useEffect, useState } from 'react';
import api from '../../services/Api'; // Đảm bảo đúng đường dẫn
import { Link } from 'react-router-dom';
import '../../css/ProductList.css'; // Đảm bảo bạn đã tạo file CSS này
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ProductList = ({ handleAddToCart, handleAddToFavorites }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // Lưu danh mục được chọn

  // Lấy danh sách danh mục khi component được mount
  useEffect(() => {
    api.get('/Category')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Lỗi API danh mục:', err));
  }, []);

  // Lấy danh sách sản phẩm theo danh mục
  useEffect(() => {
    const endpoint = selectedCategory
      ? `/product/category/${selectedCategory}` // Đường dẫn API mới
      : '/Product'; // Nếu không chọn danh mục, lấy tất cả sản phẩm
    console.log('Gọi API:', endpoint); // Log URL API để kiểm tra
    api.get(endpoint)
      .then((res) => {
        console.log('Dữ liệu sản phẩm:', res.data); // Log dữ liệu trả về
        setProducts(res.data);
      })
      .catch((err) => console.error('Lỗi API sản phẩm:', err));
  }, [selectedCategory]);

  const handleAddToCartWithAlert = (product) => {
    handleAddToCart(product);
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const handleAddToFavoritesWithAlert = (product) => {
    handleAddToFavorites(product);
    alert(`Đã thêm "${product.name}" vào danh sách yêu thích!`);
  };

  return (
    <div className="product-page" style={{ paddingTop: '80px' }}>
      <Navbar />
      <h2 className="title">💙 Danh sách sản phẩm 💖</h2>

      {/* Dropdown chọn danh mục */}
      <div className="category-filter">
        <label htmlFor="category">Chọn danh mục:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Tất cả</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {products && products.length > 0 ? (
          products.map((p) => (
            <div key={p.id} className="product-card">
              <img
                src={`http://localhost:5001/api/Product/image/${p.image}`}
                alt={p.name}
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null; // Ngăn lỗi lặp lại
                  e.target.src = 'https://via.placeholder.com/200x150?text=No+Image'; // Hiển thị ảnh mặc định nếu lỗi
                }}
              />
              <h3 className="product-name">{p.name}</h3>
              <p className="product-price">{p.price?.toLocaleString()} VNĐ</p>
              <Link to={`/product/${p.id}`} className="detail-link">
                Xem chi tiết
              </Link>
              <div className="product-actions">
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCartWithAlert(p)}
                >
                  Thêm vào giỏ hàng
                </button>
                <button
                  className="add-to-favorites-btn"
                  onClick={() => handleAddToFavoritesWithAlert(p)}
                >
                  Thêm vào yêu thích
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào trong danh mục này.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
