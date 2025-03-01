
type TranslationKey = 
  | 'appName'
  | 'home'
  | 'search'
  | 'post'
  | 'favorites'
  | 'profile'
  | 'searchPlaceholder'
  | 'featuredListings'
  | 'recentListings'
  | 'viewAll'
  | 'chooseRegion'
  | 'contactUs'
  | 'notifications'
  | 'addStory'
  | 'popularSearches'
  | 'warningMessage'
  | 'share'
  | 'report'
  | 'likes'
  | 'contactSeller'
  | 'description'
  | 'sellerInfo'
  | 'sellerRating'
  | 'location'
  | 'price'
  | 'category'
  | 'categories'
  | 'regions';

export const translations: Record<'ar' | 'en', Record<TranslationKey, string>> = {
  ar: {
    appName: 'منتجك',
    home: 'الرئيسية',
    search: 'بحث',
    post: 'إضافة إعلان',
    favorites: 'المفضلة',
    profile: 'حسابي',
    searchPlaceholder: 'ابحث عن منتجات...',
    featuredListings: 'الإعلانات المميزة',
    recentListings: 'أحدث الإعلانات',
    viewAll: 'عرض الكل',
    chooseRegion: 'اختر المنطقة',
    contactUs: 'تواصل معنا',
    notifications: 'الإشعارات',
    addStory: 'أضف قصتك',
    popularSearches: 'عمليات البحث الشائعة',
    warningMessage: 'تحذير: يفضل إجراء التعاملات في أماكن عامة وآمنة. منصة منتجك غير مسؤولة عن أي مخاطر قد يتعرض لها البائع أو المشتري.',
    share: 'مشاركة',
    report: 'الإبلاغ عن هذا الإعلان',
    likes: 'إعجابات',
    contactSeller: 'التواصل مع البائع',
    description: 'الوصف',
    sellerInfo: 'معلومات البائع',
    sellerRating: 'تقييم البائع',
    location: 'الموقع',
    price: 'السعر',
    category: 'الفئة',
    categories: 'الفئات',
    regions: 'المناطق'
  },
  en: {
    appName: 'Your Product',
    home: 'Home',
    search: 'Search',
    post: 'Post Ad',
    favorites: 'Favorites',
    profile: 'My Account',
    searchPlaceholder: 'Search for products...',
    featuredListings: 'Featured Listings',
    recentListings: 'Recent Listings',
    viewAll: 'View All',
    chooseRegion: 'Choose Region',
    contactUs: 'Contact Us',
    notifications: 'Notifications',
    addStory: 'Add Your Story',
    popularSearches: 'Popular Searches',
    warningMessage: 'Warning: Transactions should be conducted in public and safe places. Your Product platform is not responsible for any risks that the seller or buyer may be exposed to.',
    share: 'Share',
    report: 'Report this listing',
    likes: 'Likes',
    contactSeller: 'Contact Seller',
    description: 'Description',
    sellerInfo: 'Seller Information',
    sellerRating: 'Seller Rating',
    location: 'Location',
    price: 'Price',
    category: 'Category',
    categories: 'Categories',
    regions: 'Regions'
  }
};

export const regionTranslations: Record<string, { ar: string; en: string }> = {
  'دمشق': { ar: 'دمشق', en: 'Damascus' },
  'حلب': { ar: 'حلب', en: 'Aleppo' },
  'حمص': { ar: 'حمص', en: 'Homs' },
  'حماه': { ar: 'حماه', en: 'Hama' },
  'اللاذقية': { ar: 'اللاذقية', en: 'Latakia' },
  'طرطوس': { ar: 'طرطوس', en: 'Tartus' },
  'درعا': { ar: 'درعا', en: 'Daraa' },
  'السويداء': { ar: 'السويداء', en: 'Suwayda' },
  'القنيطرة': { ar: 'القنيطرة', en: 'Quneitra' },
  'ريف دمشق': { ar: 'ريف دمشق', en: 'Rural Damascus' }
};

export const categoryTranslations: Record<string, { ar: string; en: string }> = {
  'سيارات': { ar: 'سيارات', en: 'Vehicles' },
  'عقارات': { ar: 'عقارات', en: 'Real Estate' },
  'تقنية': { ar: 'تقنية', en: 'Technology' },
  'خدمات': { ar: 'خدمات', en: 'Services' },
  'أثاث': { ar: 'أثاث', en: 'Furniture' },
  'ملابس': { ar: 'ملابس', en: 'Clothing' },
  'أجهزة منزلية': { ar: 'أجهزة منزلية', en: 'Home Appliances' },
  'طعام': { ar: 'طعام', en: 'Food' },
  'ألعاب': { ar: 'ألعاب', en: 'Games' },
  'وظائف': { ar: 'وظائف', en: 'Jobs' },
  'يدويات': { ar: 'يدويات', en: 'Handmade' }
};
