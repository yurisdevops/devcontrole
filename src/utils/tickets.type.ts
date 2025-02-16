export interface TicketProps {
  id: string;
  name: string;
  description: string;
  created_at: Date | null;
  updated_at: Date | null;
  userId: string | null;
  customerId: string | null;
  status: string;
}
