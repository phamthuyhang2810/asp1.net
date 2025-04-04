namespace PhamThuyhang_2122110351.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }

        // 🆕 Các cột mới
        public string Description { get; set; }


    }
}
