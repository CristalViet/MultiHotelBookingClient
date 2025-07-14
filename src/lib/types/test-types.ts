// project/src/lib/types/test-types.ts
import { QloResponse } from './api';

// Test với string
const testStringResponse: QloResponse<string> = {
  success: true,
  data: "Hello World",
  message: "Test successful"
};

// Test với number array  
const testNumberResponse: QloResponse<number[]> = {
  success: true,
  data: [1, 2, 3],
  message: "Numbers loaded"
};

console.log('🧪 Types test:', testStringResponse, testNumberResponse);