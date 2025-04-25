import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/Api'; // Adjust the import path as necessary
import Navbar from '../../components/Navbar';
import '../../css/ProductDetail.css'; // Đảm bảo bạn đã tạo file CSS này
import Footer from '../../components/Footer';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State để quản lý modal

  useEffect(() => {
    api.get(`/Product/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleImageClick = () => {
    setIsModalOpen(true); // Mở modal khi nhấn vào ảnh
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Đóng modal
  };

  return (
    <div>
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail-header">
          <h2>{product.name}</h2>
          <img
            src={`http://localhost:5001/api/Product/image/${product.image}`}
            alt={product.name}
            onClick={handleImageClick} // Thêm sự kiện click vào ảnh
            style={{ cursor: 'pointer', maxWidth: '100%', borderRadius: '8px' }}
          />
        </div>
        <div className="product-detail-description">
          <p>{product.description}</p>
        </div>
        <div className="product-detail-price">
          Giá: {product.price} VNĐ
        </div>
        <div className="product-detail-icons">
          <i className="fas fa-heart" title="Yêu thích"></i>
          <i className="fas fa-shopping-cart" title="Thêm vào giỏ hàng"></i>
          <i className="fas fa-share-alt" title="Chia sẻ"></i>
        </div>
      </div>

      {/* Modal hiển thị ảnh lớn */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`http://localhost:5001/api/Product/image/${product.image}`}
              alt={product.name}
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
            <button className="close-modal-btn" onClick={handleCloseModal}>
              Đóng
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductDetail;
