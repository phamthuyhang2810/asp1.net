


namespace PhamThuyhang_2122110351.Model
{
    public class Category
    {
        public int Id { get; set; }  // Khóa chính
        public string Name { get; set; }  // Tên danh mục
        public string Description { get; set; } // Mô tả danh mục


        // Navigation
        // Bỏ Required ở đây hoặc khởi tạo mặc định
        public ICollection<Product>? Products { get; set; } = new List<Product>();
    }
}
