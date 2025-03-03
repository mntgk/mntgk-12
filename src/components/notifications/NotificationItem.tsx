
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export interface NotificationType {
  id: number;
  type: string;
  title: { ar: string; en: string };
  content: { ar: string; en: string };
  time: { ar: string; en: string };
  read: boolean;
  icon: React.ReactNode;
}

interface NotificationItemProps {
  notification: NotificationType;
  onDelete: (id: number) => void;
  onMarkAsRead: (id: number) => void;
}

export function NotificationItem({ notification, onDelete, onMarkAsRead }: NotificationItemProps) {
  const { language } = useLanguage();
  
  return (
    <div
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
              onClick={() => onDelete(notification.id)}
            >
              {language === 'ar' ? 'حذف' : 'Delete'}
            </Button>
            {!notification.read && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-xs"
                onClick={() => onMarkAsRead(notification.id)}
              >
                {language === 'ar' ? 'تعليم كمقروء' : 'Mark as read'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
