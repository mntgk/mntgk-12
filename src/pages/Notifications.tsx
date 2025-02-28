
import { Bell, User, Calendar, ShoppingBag, MessageCircle, Heart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const notificationsData = [
  {
    id: 1,
    type: "message",
    title: "رسالة جديدة",
    content: "أرسل لك محمد رسالة حول إعلان الشقة",
    time: "منذ 5 دقائق",
    read: false,
    icon: <MessageCircle className="h-5 w-5 text-blue-500" />
  },
  {
    id: 2,
    type: "like",
    title: "إعجاب بإعلانك",
    content: "أعجب أحمد بإعلانك عن السيارة المستعملة",
    time: "منذ 30 دقيقة",
    read: false,
    icon: <Heart className="h-5 w-5 text-red-500" />
  },
  {
    id: 3,
    type: "system",
    title: "تحديث النظام",
    content: "تم تحديث سياسة الخصوصية، يرجى الاطلاع عليها",
    time: "منذ ساعتين",
    read: true,
    icon: <Bell className="h-5 w-5 text-yellow-500" />
  },
  {
    id: 4,
    type: "order",
    title: "طلب تواصل جديد",
    content: "يرغب سامر في التواصل معك بخصوص الكمبيوتر",
    time: "منذ 3 ساعات",
    read: true,
    icon: <ShoppingBag className="h-5 w-5 text-green-500" />
  },
  {
    id: 5,
    type: "profile",
    title: "تذكير",
    content: "لم تقم بتحديث معلومات حسابك منذ فترة",
    time: "منذ يوم",
    read: true,
    icon: <User className="h-5 w-5 text-gray-500" />
  },
  {
    id: 6,
    type: "event",
    title: "عرض ترويجي",
    content: "عروض مميزة اليوم على الإعلانات المدفوعة بخصم 50%",
    time: "منذ يومين",
    read: true,
    icon: <Calendar className="h-5 w-5 text-purple-500" />
  },
];

const Notifications = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">الإشعارات</h1>
          <Button variant="ghost" size="sm">
            تعليم الكل كمقروء
          </Button>
        </div>
        
        {/* Notifications List */}
        <div className="space-y-3">
          {notificationsData.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-xl border p-4 transition-all ${
                !notification.read ? "bg-primary/5 border-primary/20" : "bg-card"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 h-10 w-10 flex-shrink-0 rounded-full bg-muted flex items-center justify-center">
                  {notification.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${!notification.read ? "text-primary" : ""}`}>{notification.title}</h3>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="mt-1 text-sm">{notification.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {notificationsData.length === 0 && (
          <div className="text-center py-16">
            <Bell className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="mt-4 text-xl font-bold">لا توجد إشعارات</h2>
            <p className="mt-2 text-muted-foreground">سيتم إعلامك هنا عند وجود إشعارات جديدة</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Notifications;
