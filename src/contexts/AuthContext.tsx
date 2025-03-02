
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
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// استخدام localStorage لتخزين المستخدم
const LOCAL_STORAGE_KEY = 'montajak_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // تحميل بيانات المستخدم من localStorage عند بدء التطبيق
  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // محاكاة طلب API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // في التطبيق الحقيقي، يجب التحقق من صحة بيانات الاعتماد من الخادم
      // هنا نستخدم بيانات ثابتة للتجربة
      
      // تحقق إذا كان البريد الإلكتروني هو admin@example.com وكلمة المرور هي password
      if (email === 'admin@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'أحمد السوري',
          email: 'admin@example.com',
          username: '@ahmed',
          location: 'دمشق، سوريا',
          joinDate: 'انضم في يناير 2023',
          avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop'
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockUser));
        
        toast.success('تم تسجيل الدخول بنجاح');
        return true;
      } else {
        toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('حدث خطأ أثناء تسجيل الدخول');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    try {
      // محاكاة طلب API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // في التطبيق الحقيقي، يجب إرسال بيانات التسجيل إلى الخادم
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        phone,
        username: '@' + name.split(' ')[0].toLowerCase(),
        location: 'سوريا',
        joinDate: `انضم في ${new Date().toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' })}`,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`
      };

      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
      
      toast.success('تم إنشاء الحساب بنجاح');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('حدث خطأ أثناء إنشاء الحساب');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    toast.success('تم تسجيل الخروج بنجاح');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUser));
      toast.success('تم تحديث الملف الشخصي بنجاح');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      register, 
      logout,
      updateProfile
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
