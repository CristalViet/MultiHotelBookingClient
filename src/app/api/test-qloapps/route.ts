import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Lấy endpoint từ query parameters
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint') || 'customers';

    // Kiểm tra environment variables
    const apiUrl = process.env.NEXT_PUBLIC_QLOAPPS_API_URL;
    const apiKey = process.env.QLOAPPS_API_KEY;
    const apiFormat = process.env.NEXT_PUBLIC_API_FORMAT;

    if (!apiUrl || !apiKey) {
      return NextResponse.json(
        { 
          error: 'Missing environment variables',
          details: {
            NEXT_PUBLIC_QLOAPPS_API_URL: !!apiUrl,
            QLOAPPS_API_KEY: !!apiKey,
            NEXT_PUBLIC_API_FORMAT: !!apiFormat
          }
        },
        { status: 500 }
      );
    }

    // Cấu hình cho từng endpoint
    const endpointConfig: Record<string, { limit?: number; additional?: string }> = {
      customers: { limit: 5 },
      room_types: { limit: 20 },
      hotel_rooms: { limit: 50 },
      bookings: { limit: 10 },
      orders: { limit: 10 },
      countries: { limit: 50 },
      currencies: { limit: 20 }
    };

    const config = endpointConfig[endpoint] || { limit: 5 };
    
    // Tạo URL với parameters
    let testUrl = `${apiUrl}/${endpoint}?output_format=${apiFormat}`;
    if (config.limit) {
      testUrl += `&limit=${config.limit}`;
    }
    if (config.additional) {
      testUrl += `&${config.additional}`;
    }
    
    // Setup Basic Auth
    const credentials = btoa(`${apiKey}:`);
    const headers = {
      'Authorization': `Basic ${credentials}`,
      'Accept': 'application/json'
    };

    console.log(`Testing qloapps API endpoint: ${endpoint}`, testUrl);

    const response = await fetch(testUrl, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      return NextResponse.json(
        { 
          error: `qloapps API error: ${response.status} ${response.statusText}`,
          details: {
            endpoint: endpoint,
            status: response.status,
            statusText: response.statusText,
            url: testUrl,
            responseHeaders: Object.fromEntries(response.headers.entries())
          }
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Thêm thông tin summary cho rooms
    let summary = {};
    if (endpoint === 'room_types' && data.room_types) {
      summary = {
        totalRoomTypes: data.room_types.length,
        roomTypesPreview: data.room_types.slice(0, 3).map((rt: any) => ({
          id: rt.id,
          name: rt.name,
          price: rt.price
        }))
      };
    } else if (endpoint === 'hotel_rooms' && data.hotel_rooms) {
      summary = {
        totalRooms: data.hotel_rooms.length,
        roomsPreview: data.hotel_rooms.slice(0, 3).map((room: any) => ({
          id: room.id,
          room_number: room.room_number,
          room_type_id: room.room_type_id
        }))
      };
    } else if (endpoint === 'customers' && data.customers) {
      summary = {
        totalCustomers: data.customers.length
      };
    } else if (endpoint === 'bookings' && data.bookings) {
      summary = {
        totalBookings: data.bookings.length
      };
    }

    return NextResponse.json({
      success: true,
      message: `Successfully fetched ${endpoint} data!`,
      endpoint: endpoint,
      summary: summary,
      data: data,
      config: {
        apiUrl: apiUrl,
        apiFormat: apiFormat,
        endpoint: `/${endpoint}`,
        requestUrl: testUrl,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('qloapps API test error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to connect to qloapps API',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// Optional: POST method để test tạo dữ liệu
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint = 'customers', data } = body;
    
    const apiUrl = process.env.NEXT_PUBLIC_QLOAPPS_API_URL;
    const apiKey = process.env.QLOAPPS_API_KEY;

    if (!apiUrl || !apiKey) {
      return NextResponse.json(
        { error: 'Missing environment variables' },
        { status: 500 }
      );
    }

    // Convert data to XML format (qloapps requires XML for POST)
    const convertToXML = (obj: any, resourceName: string) => {
      let xml = `<${resourceName}>`;
      Object.keys(obj).forEach(key => {
        if (obj[key] !== undefined && obj[key] !== null) {
          xml += `<${key}>${obj[key]}</${key}>`;
        }
      });
      xml += `</${resourceName}>`;
      return xml;
    };

    const credentials = btoa(`${apiKey}:`);
    const headers = {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/xml',
      'Accept': 'application/json'
    };

    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: 'POST',
      headers: headers,
      body: convertToXML(data, endpoint.slice(0, -1)) // Remove 's' from endpoint
    });

    const result = await response.json();

    return NextResponse.json({
      success: response.ok,
      message: response.ok ? 'Data created successfully' : 'Failed to create data',
      endpoint: endpoint,
      status: response.status,
      data: result
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'POST request failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 