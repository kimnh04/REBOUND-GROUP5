export interface CustomerInterface {
  Customer_ID: string;
  Customer_Name: string;
  Customer_Email: string;
  Customer_Phone: string;
  totalOrders?: number; // Dữ liệu có thể có hoặc không
  selected?: boolean; // Biến boolean để chọn khách hàng
}
