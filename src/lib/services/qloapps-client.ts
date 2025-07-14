// project/src/lib/services/qloapps-client.ts
import { QloResponse } from '../types/api';

export class QloAppsClient {
  private baseUrl = '/api/test-qloapps';

  async get(endpoint: string): Promise<QloResponse<any>> {
    console.log(`🌐 Calling API: ${endpoint}`);
    
    try {
      const url = `${this.baseUrl}?endpoint=${endpoint}`;
      console.log(`📤 Request URL:`, url);
      
      const response = await fetch(url);
      const result = await response.json();
      
      console.log(`📨 Raw response:`, result);
      
      if (result.success) {
        return {
          success: true,
          data: result.data,
          message: result.message || 'Success',
          endpoint: endpoint
        };
      } else {
        return {
          success: false,
          data: null,
          message: result.error || result.message || 'API call failed',
          endpoint: endpoint
        };
      }
      
    } catch (error) {
      console.error(`❌ API Error for ${endpoint}:`, error);
      
      return {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : 'Network error',
        endpoint: endpoint
      };
    }
  }
}

// Export instance để dùng chung
export const qloClient = new QloAppsClient();