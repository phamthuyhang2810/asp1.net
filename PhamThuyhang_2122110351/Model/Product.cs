using PhamThuyhang_2122110351.Model;



    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }

        // 🆕 Các cột mới
        public string Description { get; set; }

        // Khóa ngoại
        public int CategoryId { get; set; }

    // Navigation property
    // Navigation property
    public Category? Category { get; set; }



}

