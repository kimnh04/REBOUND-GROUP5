export interface CustomerInterface {
  Customer_ID: string;
  Customer_Name: string;
  Customer_Email: string;
  Customer_Phone: string;
  Customer_DOB: string;
  Customer_Address: string;
  Customer_Gender: "Male" | "Female" | "Other"; // Enum giống schema
  Customer_Registration_Date: string;
  Customer_Type: "New" | "Loyal" | "VIP"; // Enum giống schema
  totalOrders?: number; // Dữ liệu có thể có hoặc không
  selected?: boolean; // Biến boolean để chọn khách hàng
}