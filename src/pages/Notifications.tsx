
import { useState } from "react";
import { Bell, User, Calendar, ShoppingBag, MessageCircle, Heart, Settings, Filter } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Switch
} from "@/components/ui/switch";

const notificationsData = [
  {
    id: 1,
    type: "message",
    title: { ar: "رسالة جديدة", en: "New Message" },
    content: { 
      ar: "أرسل لك محمد رسالة حول إعلان الشقة", 
      en: "Mohammed sent you a message about the apartment listing" 
    },
    time: { ar: "منذ 5 دقائق", en: "5 minutes ago" },
    read: false,
    icon: <MessageCircle className="h-5 w-5 text-blue-500" />
  },
  {
    id: 2,
    type: "like",
    title: { ar: "إعجاب بإعلانك", en: "Like on your listing" },
    content: { 
      ar: "أعجب أحمد بإعلانك عن السيارة المستعملة", 
      en: "Ahmed liked your used car listing" 
    },
    time: { ar: "منذ 30 دقيقة", en: "30 minutes ago" },
    read: false,
    icon: <Heart className="h-5 w-5 text-red-500" />
  },
  {
    id: 3,
    type: "system",
    title: { ar: "تحديث النظام", en: "System Update" },
    content: { 
      ar: "تم تحديث سياسة الخصوصية، يرجى الاطلاع عليها", 
      en: "The privacy policy has been updated, please review it" 
    },
    time: { ar: "منذ ساعتين", en: "2 hours ago" },
    read: true,
    icon: <Bell className="h-5 w-5 text-yellow-500" />
  },
  {
    id: 4,
    type: "order",
    title: { ar: "طلب تواصل جديد", en: "New Contact Request" },
    content: { 
      ar: "يرغب سامر في التواصل معك بخصوص الكمبيوتر", 
      en: "Samer wants to contact you about the computer" 
    },
    time: { ar: "منذ 3 ساعات", en: "3 hours ago" },
    read: true,
    icon: <ShoppingBag className="h-5 w-5 text-green-500" />
  },
  {
    id: 5,
    type: "profile",
    title: { ar: "تذكير", en: "Reminder" },
    content: { 
      ar: "لم تقم بتحديث معلومات حسابك منذ فترة", 
      en: "You haven't updated your account information in a while" 
    },
    time: { ar: "منذ يوم", en: "1 day ago" },
    read: true,
    icon: <User className="h-5 w-5 text-gray-500" />
  },
  {
    id: 6,
    type: "event",
    title: { ar: "عرض ترويجي", en: "Promotional Offer" },
    content: { 
      ar: "عروض مميزة اليوم على الإعلانات المدفوعة بخصم 50%", 
      en: "Special offers today on paid ads with 50% discount" 
    },
    time: { ar: "منذ يومين", en: "2 days ago" },
    read: true,
    icon: <Calendar className="h-5 w-5 text-purple-500" />
  },
  // إضافة إشعارات جديدة للإعلانات التي تطابق تفضيلات المستخدم
  {
    id: 7,
    type: "ads",
    title: { ar: "إعلان جديد يطابق اهتماماتك", en: "New Ad Matching Your Interests" },
    content: { 
      ar: "تم إضافة إعلان جديد عن سيارة مرسيدس موديل 2022", 
      en: "A new Mercedes 2022 model car ad was added" 
    },
    time: { ar: "الآن", en: "Just now" },
    read: false,
    icon: <Bell className="h-5 w-5 text-blue-500" />
  },
  {
    id: 8,
    type: "comment",
    title: { ar: "تعليق جديد", en: "New Comment" },
    content: { 
      ar: "علق سمير على إعلانك للهاتف المحمول", 
      en: "Samir commented on your mobile phone listing" 
    },
    time: { ar: "منذ 10 دقائق", en: "10 minutes ago" },
    read: false,
    icon: <MessageCircle className="h-5 w-5 text-green-500" />
  }
];

const Notifications = () => {
  const { language, t } = useLanguage();
  const [notifications, setNotifications] = useState(notificationsData);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [preferences, setPreferences] = useState({
    messages: true,
    likes: true,
    system: true,
    orders: true,
    newListings: true,
    events: true,
    comments: true,
    adsMatching: true
  });

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    toast.success(language === 'ar' ? "تم تعليم جميع الإشعارات كمقروءة" : "All notifications marked as read");
  };

  const deleteNotification = (id: number) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    toast.success(language === 'ar' ? "تم حذف الإشعار" : "Notification deleted");
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    toast.success(language === 'ar' ? "تم حذف جميع الإشعارات" : "All notifications deleted");
  };

  const toggleNotificationPreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success(
      language === 'ar' 
        ? `تم ${preferences[key] ? 'إيقاف' : 'تفعيل'} إشعارات ${getPreferenceName(key, language)}` 
        : `${getPreferenceName(key, language)} notifications ${preferences[key] ? 'disabled' : 'enabled'}`
    );
  };

  const getPreferenceName = (key: string, lang: 'ar' | 'en') => {
    const names: Record<string, {ar: string, en: string}> = {
      messages: {ar: "الرسائل", en: "Messages"},
      likes: {ar: "الإعجابات", en: "Likes"},
      system: {ar: "تحديثات النظام", en: "System Updates"},
      orders: {ar: "طلبات التواصل", en: "Contact Requests"},
      newListings: {ar: "الإعلانات الجديدة", en: "New Listings"},
      events: {ar: "العروض والفعاليات", en: "Offers & Events"},
      comments: {ar: "التعليقات", en: "Comments"},
      adsMatching: {ar: "الإعلانات المطابقة للاهتمامات", en: "Ads Matching Interests"}
    };
    return names[key]?.[lang] || key;
  };

  const filterNotifications = (type: string) => {
    if (filters.includes(type)) {
      setFilters(filters.filter(t => t !== type));
    } else {
      setFilters([...filters, type]);
    }
  };

  const filteredNotifications = filters.length > 0
    ? notifications.filter(notification => filters.includes(notification.type))
    : notifications;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{language === 'ar' ? 'الإشعارات' : 'Notifications'}</h1>
          <div className="flex gap-2">
            <Sheet open={preferencesOpen} onOpenChange={setPreferencesOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>{language === 'ar' ? 'تفضيلات الإشعارات' : 'Notification Preferences'}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={language === 'ar' ? "right" : "left"}>
                <SheetHeader>
                  <SheetTitle>{language === 'ar' ? 'تفضيلات الإشعارات' : 'Notification Preferences'}</SheetTitle>
                  <SheetDescription>
                    {language === 'ar' 
                      ? 'قم بتخصيص نوع الإشعارات التي ترغب في تلقيها' 
                      : 'Customize the types of notifications you want to receive'}
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span>{language === 'ar' ? 'الرسائل' : 'Messages'}</span>
                    <Switch 
                      checked={preferences.messages} 
                      onCheckedChange={() => toggleNotificationPreference('messages')} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'ar' ? 'الإعجابات' : 'Likes'}</span>
                    <Switch 
                      checked={preferences.likes} 
                      onCheckedChange={() => toggleNotificationPreference('likes')} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'ar' ? 'تحديثات النظام' : 'System Updates'}</span>
                    <Switch 
                      checked={preferences.system} 
                      onCheckedChange={() => toggleNotificationPreference('system')} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'ar' ? 'طلبات التواصل' : 'Contact Requests'}</span>
                    <Switch 
                      checked={preferences.orders} 
                      onCheckedChange={() => toggleNotificationPreference('orders')} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'ar' ? 'الإعلانات الجديدة' : 'New Listings'}</span>
                    <Switch 
                      checked={preferences.newListings} 
                      onCheckedChange={() => toggleNotificationPreference('newListings')} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'ar' ? 'العروض والفعاليات' : 'Offers & Events'}</span>
                    <Switch 
                      checked={preferences.events} 
                      onCheckedChange={() => toggleNotificationPreference('events')} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'ar' ? 'التعليقات' : 'Comments'}</span>
                    <Switch 
                      checked={preferences.comments} 
                      onCheckedChange={() => toggleNotificationPreference('comments')} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'ar' ? 'الإعلانات المطابقة للاهتمامات' : 'Ads Matching Interests'}</span>
                    <Switch 
                      checked={preferences.adsMatching} 
                      onCheckedChange={() => toggleNotificationPreference('adsMatching')} 
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              showFeedback
              feedbackMessage={language === 'ar' ? "تم تعليم الكل كمقروء" : "All marked as read"}
            >
              {language === 'ar' ? 'تعليم الكل كمقروء' : 'Mark all as read'}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-destructive hover:text-destructive"
              onClick={deleteAllNotifications}
              showFeedback
              feedbackMessage={language === 'ar' ? "تم حذف جميع الإشعارات" : "All notifications deleted"}
            >
              {language === 'ar' ? 'حذف الكل' : 'Delete all'}
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            variant={filters.length === 0 ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilters([])}
          >
            {language === 'ar' ? 'الكل' : 'All'}
          </Button>
          <Button 
            variant={filters.includes('message') ? "default" : "outline"} 
            size="sm"
            onClick={() => filterNotifications('message')}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'رسائل' : 'Messages'}
          </Button>
          <Button 
            variant={filters.includes('like') ? "default" : "outline"} 
            size="sm"
            onClick={() => filterNotifications('like')}
          >
            <Heart className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'إعجابات' : 'Likes'}
          </Button>
          <Button 
            variant={filters.includes('order') ? "default" : "outline"} 
            size="sm"
            onClick={() => filterNotifications('order')}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'طلبات' : 'Requests'}
          </Button>
          <Button 
            variant={filters.includes('system') ? "default" : "outline"} 
            size="sm"
            onClick={() => filterNotifications('system')}
          >
            <Bell className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'النظام' : 'System'}
          </Button>
          <Button 
            variant={filters.includes('comment') ? "default" : "outline"} 
            size="sm"
            onClick={() => filterNotifications('comment')}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'تعليقات' : 'Comments'}
          </Button>
          <Button 
            variant={filters.includes('ads') ? "default" : "outline"} 
            size="sm"
            onClick={() => filterNotifications('ads')}
          >
            <Bell className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'إعلانات مطابقة' : 'Matching Ads'}
          </Button>
        </div>
        
        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
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
                    <h3 className={`font-semibold ${!notification.read ? "text-primary" : ""}`}>
                      {notification.title[language]}
                    </h3>
                    <span className="text-xs text-muted-foreground">{notification.time[language]}</span>
                  </div>
                  <p className="mt-1 text-sm">{notification.content[language]}</p>
                  <div className="mt-2 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 text-xs"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      {language === 'ar' ? 'حذف' : 'Delete'}
                    </Button>
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-xs"
                        onClick={() => {
                          const updatedNotifications = notifications.map(n => 
                            n.id === notification.id ? {...n, read: true} : n
                          );
                          setNotifications(updatedNotifications);
                        }}
                      >
                        {language === 'ar' ? 'تعليم كمقروء' : 'Mark as read'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredNotifications.length === 0 && (
          <div className="text-center py-16">
            <Bell className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="mt-4 text-xl font-bold">
              {language === 'ar' ? 'لا توجد إشعارات' : 'No notifications'}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {language === 'ar' 
                ? 'سيتم إعلامك هنا عند وجود إشعارات جديدة' 
                : 'You will be notified here when there are new notifications'}
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Notifications;
