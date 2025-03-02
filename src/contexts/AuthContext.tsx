
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  username: string;
  location: string;
  joinDate: string;
  avatar: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (emailOrPhone: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  updateAvatar: (imageFile: File) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// استخدام localStorage لتخزين المستخدم وقائمة المستخدمين
const USER_STORAGE_KEY = 'montajak_user';
const USERS_STORAGE_KEY = 'montajak_users';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // تحميل بيانات المستخدم من localStorage عند بدء التطبيق
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    
    // تهيئة قائمة المستخدمين إذا لم تكن موجودة
    if (!localStorage.getItem(USERS_STORAGE_KEY)) {
      const initialUsers = [
        {
          id: '1',
          name: 'أحمد السوري',
          email: 'admin@example.com',
          password: 'password',
          username: '@ahmed',
          location: 'دمشق، سوريا',
          joinDate: 'انضم في يناير 2023',
          avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop'
        }
      ];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
    }
  }, []);

  const login = async (emailOrPhone: string, password: string): Promise<boolean> => {
    try {
      // محاكاة طلب API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // قراءة قائمة المستخدمين من التخزين المحلي
      const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      
      // طباعة المستخدمين وبيانات الدخول للتصحيح
      console.log('Trying to login with:', { emailOrPhone, password });
      console.log('Available users:', users);
      
      // البحث عن المستخدم بواسطة البريد الإلكتروني أو رقم الهاتف وكلمة المرور
      const foundUser = users.find((u: any) => 
        (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password
      );
      
      console.log('Found user:', foundUser);
      
      if (foundUser) {
        // لا نريد تخزين كلمة المرور في حالة المستخدم
        const { password, ...userWithoutPassword } = foundUser;
        
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
        
        toast.success(
          'تم تسجيل الدخول بنجاح'
        );
        return true;
      } else {
        toast.error(
          'البريد الإلكتروني أو كلمة المرور غير صحيحة'
        );
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(
        'حدث خطأ أثناء تسجيل الدخول'
      );
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    try {
      // محاكاة طلب API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // قراءة قائمة المستخدمين من التخزين المحلي
      const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      
      // التحقق من وجود البريد الإلكتروني مسبقًا
      const existingUser = users.find((u: any) => u.email === email);
      
      if (existingUser) {
        toast.error(
          'البريد الإلكتروني مسجل مسبقًا'
        );
        return false;
      }

      // إنشاء مستخدم جديد
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        phone,
        password, // نحتفظ بكلمة المرور فقط في قائمة المستخدمين
        username: '@' + name.split(' ')[0].toLowerCase(),
        location: 'سوريا',
        joinDate: `انضم في ${new Date().toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' })}`,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`
      };

      // طباعة المستخدم الجديد للتصحيح
      console.log('Creating new user:', newUser);

      // إضافة المستخدم لقائمة المستخدمين
      users.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      // لا نريد تخزين كلمة المرور في حالة المستخدم النشط
      const { password: _, ...userWithoutPassword } = newUser;
      
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      
      toast.success(
        'تم إنشاء الحساب بنجاح'
      );
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(
        'حدث خطأ أثناء إنشاء الحساب'
      );
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(USER_STORAGE_KEY);
    toast.success('تم تسجيل الخروج بنجاح');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      
      // تحديث بيانات المستخدم في قائمة المستخدمين أيضًا
      const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, ...userData } : u
      );
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      
      toast.success('تم تحديث الملف الشخصي بنجاح');
    }
  };

  const updateAvatar = async (imageFile: File): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // تحويل الصورة إلى base64
      const imageUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });
      
      const updatedUser = { ...user, avatar: imageUrl };
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      
      // تحديث صورة المستخدم في قائمة المستخدمين أيضًا
      const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, avatar: imageUrl } : u
      );
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      
      toast.success('تم تحديث الصورة الشخصية بنجاح');
      return true;
    } catch (error) {
      console.error('Error updating avatar:', error);
      toast.error('حدث خطأ أثناء تحديث الصورة الشخصية');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      register, 
      logout,
      updateProfile,
      updateAvatar
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
