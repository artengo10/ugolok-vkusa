import { NextRequest, NextResponse } from "next/server";
import { isBlacklisted, formatPhone } from "@/lib/validation";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    console.log("Order received:", orderData);

    const token = process.env.MAX_BOT_TOKEN;
    const chatId = process.env.MAX_CHAT_ID;

    console.log("Token exists:", !!token);
    console.log("Chat ID exists:", !!chatId);

    if (!token || !chatId) {
      console.error("Missing Max bot credentials");
      return NextResponse.json(
        { error: "Bot not configured" },
        { status: 500 }
      );
    }

    const formattedPhone = formatPhone(orderData.phone);
    if (isBlacklisted(formattedPhone)) {
      console.log("Blacklisted phone:", formattedPhone);
      return NextResponse.json({ error: "Order rejected" }, { status: 403 });
    }

    const message = `🛒 НОВЫЙ ЗАКАЗ

Клиент: ${orderData.name}
Телефон: ${orderData.phone}
Тип заказа: ${orderData.type === "delivery" ? "Доставка" : "Самовывоз"}

${orderData.type === "delivery"
  ? `Адрес: ${orderData.address}\nРайон: ${orderData.district}`
  : `Время самовывоза: ${orderData.pickupTime}`}

Товары:
${orderData.items
  .map((item: CartItem) => `• ${item.name} x${item.quantity} - ${item.price * item.quantity}₽`)
  .join("\n")}

Итого: ${orderData.total}₽
${orderData.prepayment > 0 ? `Предоплата: ${orderData.prepayment}₽\n` : ""}К оплате: ${orderData.finalTotal}₽

Время заказа: ${new Date().toLocaleString("ru-RU")}`;

    console.log("Sending to Max...");

    const response = await fetch("https://platform-api.max.ru/messages", {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: Number(chatId),
        text: message,
      }),
    });

    const responseData = await response.json();
    console.log("Max response:", responseData);

    if (!response.ok) {
      throw new Error(`Max API error: ${JSON.stringify(responseData)}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}
