import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const { userId, amount } = await req.json();
    
    if (!userId || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Static user details since DB is not connected
    const firstName = "Awoke";
    const lastName = "Mulu";
    const email = "awokemulu@gmail.com";

    const TEXT_REF = `tx-${Date.now()}`;
    const CALLBACK_URL = `http://localhost:3000/api/payment/verify?textRef=${TEXT_REF}&userId=${userId}&amount=${amount}`;

    const CHAPA_API_KEY = process.env.CHAPA_AUTH;
    const CHAPA_URL = 'https://api.chapa.co/v1/transaction/initialize';

    const config = {
      headers: {
        Authorization: `Bearer ${CHAPA_API_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    const data = {
      amount,
      currency: 'ETB',
      email: email,
      first_name: firstName,
      last_name: lastName,
      tx_ref: TEXT_REF,
      callback_url: CALLBACK_URL,
    };

    const response = await axios.post(CHAPA_URL, data, config);
    
    return NextResponse.json({ checkout_url: response.data.data.checkout_url }, { status: 200 });

  } catch (error) {
    console.error('Chapa Payment Error:', error);
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const TEXT_REF = searchParams.get('textRef');
    const userId = searchParams.get('userId');
    const amount = parseFloat(searchParams.get('amount'));

    if (!TEXT_REF || !userId || isNaN(amount)) {
      return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
    }

    const CHAPA_API_KEY = process.env.CHAPA_AUTH;
    const VERIFY_URL = `https://api.chapa.co/v1/transaction/verify/${TEXT_REF}`;

    const config = {
      headers: {
        Authorization: `Bearer ${CHAPA_API_KEY}`,
      },
    };

    const response = await axios.get(VERIFY_URL, config);

    return NextResponse.json({ message: 'Payment verified successfully' }, { status: 200 });

  } catch (error) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
