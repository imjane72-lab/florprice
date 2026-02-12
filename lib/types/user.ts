export type UserRole = "wholesaler" | "retailer";

export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessNumber: string;
  role: UserRole;
  phone: string;
  address: string;
  profileImage?: string;
  isVerified: boolean;
  createdAt: string;
}
