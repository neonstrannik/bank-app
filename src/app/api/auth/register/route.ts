import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Временное хранилище (в реальном приложении используйте базу данных)
const users: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone } = await request.json();

    // Валидация
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Пароль должен содержать не менее 6 символов' },
        { status: 400 }
      );
    }

    // Проверка, существует ли пользователь
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 409 }
      );
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 12);

    // Создание пользователя
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      createdAt: new Date()
    };

    users.push(user);

    // Создание JWT токена
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Возвращаем данные пользователя (без пароля)
    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone
    };

    return NextResponse.json({
      user: userResponse,
      token,
      message: 'Регистрация успешна!'
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}