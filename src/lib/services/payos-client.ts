// PayOS Client Service for Hotel Booking Payment Integration

interface PayOSConfig {
  clientId: string;
  apiKey: string;
  checksumKey: string;
  partnerCode: string;
  returnUrl: string;
  cancelUrl: string;
}

interface PaymentItem {
  name: string;
  quantity: number;
  price: number;
}

interface PaymentData {
  orderCode: string;
  amount: number;
  description: string;
  items: PaymentItem[];
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerAddress?: string;
}

interface PayOSResponse {
  error: number;
  message: string;
  data?: {
    bin: string;
    accountNumber: string;
    accountName: string;
    amount: number;
    description: string;
    orderCode: string;
    currency: string;
    paymentLinkId: string;
    status: string;
    checkoutUrl: string;
    qrCode: string;
  };
}

class PayOSClient {
  private config: PayOSConfig;

  constructor(config: PayOSConfig) {
    this.config = config;
  }

  // Generate unique order code
  private generateOrderCode(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `HB${timestamp}${random}`;
  }

  // Create payment link
  async createPaymentLink(data: PaymentData): Promise<PayOSResponse> {
    try {
      const paymentData = {
        orderCode: data.orderCode || this.generateOrderCode(),
        amount: data.amount,
        description: data.description,
        items: data.items,
        buyerName: data.buyerName,
        buyerEmail: data.buyerEmail,
        buyerPhone: data.buyerPhone,
        buyerAddress: data.buyerAddress,
        returnUrl: this.config.returnUrl,
        cancelUrl: this.config.cancelUrl,
      };

      // In production, this would be an actual API call to PayOS
      // For demo purposes, we'll simulate the response
      const response = await this.simulatePayOSAPI(paymentData);
      
      return response;
    } catch (error) {
      console.error('PayOS createPaymentLink error:', error);
      throw new Error('Failed to create payment link');
    }
  }

  // Check payment status
  async getPaymentLinkInformation(orderCode: string): Promise<PayOSResponse> {
    try {
      // In production, this would be an actual API call to PayOS
      const response = await this.simulatePaymentStatus(orderCode);
      return response;
    } catch (error) {
      console.error('PayOS getPaymentLinkInformation error:', error);
      throw new Error('Failed to get payment information');
    }
  }

  // Cancel payment
  async cancelPaymentLink(orderCode: string): Promise<PayOSResponse> {
    try {
      // In production, this would be an actual API call to PayOS
      const response = await this.simulateCancelPayment(orderCode);
      return response;
    } catch (error) {
      console.error('PayOS cancelPaymentLink error:', error);
      throw new Error('Failed to cancel payment');
    }
  }

  // Verify webhook signature (for payment status updates)
  verifyPaymentWebhookData(webhookData: any, signature: string): boolean {
    // In production, implement actual signature verification
    // using HMAC-SHA256 with checksumKey
    return true;
  }

  // Simulate PayOS API for demo purposes
  private async simulatePayOSAPI(paymentData: any): Promise<PayOSResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock successful response
    return {
      error: 0,
      message: "Success",
      data: {
        bin: "970422",
        accountNumber: "1234567890",
        accountName: "TUAN CHAU RESORT",
        amount: paymentData.amount,
        description: paymentData.description,
        orderCode: paymentData.orderCode,
        currency: "VND",
        paymentLinkId: `link_${paymentData.orderCode}`,
        status: "PENDING",
        checkoutUrl: `https://pay.payos.vn/web/${paymentData.orderCode}`,
        qrCode: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`
      }
    };
  }

  private async simulatePaymentStatus(orderCode: string): Promise<PayOSResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate different payment statuses
    const statuses = ['PENDING', 'PAID', 'CANCELLED', 'EXPIRED'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      error: 0,
      message: "Success",
      data: {
        bin: "970422",
        accountNumber: "1234567890",
        accountName: "TUAN CHAU RESORT",
        amount: 1500000,
        description: "Hotel booking payment",
        orderCode: orderCode,
        currency: "VND",
        paymentLinkId: `link_${orderCode}`,
        status: randomStatus,
        checkoutUrl: `https://pay.payos.vn/web/${orderCode}`,
        qrCode: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`
      }
    };
  }

  private async simulateCancelPayment(orderCode: string): Promise<PayOSResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      error: 0,
      message: "Payment cancelled successfully",
      data: {
        bin: "970422",
        accountNumber: "1234567890",
        accountName: "TUAN CHAU RESORT",
        amount: 0,
        description: "Payment cancelled",
        orderCode: orderCode,
        currency: "VND",
        paymentLinkId: `link_${orderCode}`,
        status: "CANCELLED",
        checkoutUrl: "",
        qrCode: ""
      }
    };
  }
}

// PayOS service instance
export const createPayOSClient = (config: PayOSConfig): PayOSClient => {
  return new PayOSClient(config);
};

// Default config for demo
export const defaultPayOSConfig: PayOSConfig = {
  clientId: process.env.PAYOS_CLIENT_ID || 'demo_client_id',
  apiKey: process.env.PAYOS_API_KEY || 'demo_api_key',
  checksumKey: process.env.PAYOS_CHECKSUM_KEY || 'demo_checksum_key',
  partnerCode: process.env.PAYOS_PARTNER_CODE || 'demo_partner',
  returnUrl: process.env.NEXT_PUBLIC_BASE_URL + '/booking/confirmation' || 'http://localhost:3000/vi/booking/confirmation',
  cancelUrl: process.env.NEXT_PUBLIC_BASE_URL + '/booking' || 'http://localhost:3000/vi/booking'
};

// Utility functions
export const formatPaymentItems = (bookingData: any): PaymentItem[] => {
  const items: PaymentItem[] = [];

  // Room charges
  if (bookingData.room) {
    items.push({
      name: `${bookingData.room.name} x ${bookingData.nights} đêm`,
      quantity: bookingData.guests?.rooms || 1,
      price: bookingData.room.price * (bookingData.nights || 1)
    });
  }

  // Taxes and fees
  const subtotal = bookingData.subtotal || 0;
  const taxes = subtotal * 0.1;
  const serviceFee = subtotal * 0.05;

  if (taxes > 0) {
    items.push({
      name: "Thuế VAT (10%)",
      quantity: 1,
      price: taxes
    });
  }

  if (serviceFee > 0) {
    items.push({
      name: "Phí dịch vụ (5%)",
      quantity: 1,
      price: serviceFee
    });
  }

  return items;
};

export const createPaymentDescription = (bookingData: any): string => {
  const hotelName = bookingData.hotel?.name || 'Tuần Châu Resort';
  const roomName = bookingData.room?.name || 'Phòng';
  const checkIn = bookingData.checkIn ? new Date(bookingData.checkIn).toLocaleDateString('vi-VN') : '';
  const checkOut = bookingData.checkOut ? new Date(bookingData.checkOut).toLocaleDateString('vi-VN') : '';
  
  return `Thanh toán booking ${hotelName} - ${roomName} (${checkIn} - ${checkOut})`;
};

// Export types
export type { PayOSConfig, PaymentData, PaymentItem, PayOSResponse }; 