namespace PhamThuyhang_2122110351.Model
{
    public class Order
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public DateTime OrderDate { get; set; }

        // Navigation
        public List<OrderDetail> OrderDetails { get; set; }
    }

}
