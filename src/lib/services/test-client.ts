// project/src/lib/services/test-client.ts
import { qloClient } from './qloapps-client';

export async function testBasicClient() {
  console.log('🧪 Testing QLOapps Client v1...');
  console.log('================================');
  
  // Test 1: Room types
  console.log('\n📋 Test 1: Room Types');
  const roomsResult = await qloClient.get('room_types');
  console.log('Result:', roomsResult);
  
  // Test 2: Customers  
  console.log('\n👥 Test 2: Customers');
  const customersResult = await qloClient.get('customers');
  console.log('Result:', customersResult);
  
  // Test 3: Invalid endpoint
  console.log('\n❌ Test 3: Invalid Endpoint');
  const invalidResult = await qloClient.get('invalid_endpoint');
  console.log('Result:', invalidResult);
  
  console.log('\n✅ Testing complete!');
}