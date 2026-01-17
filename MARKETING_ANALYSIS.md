# 📊 Բիզնես և Մարկետինգ Անալիտիկա - Վերլուծություն և Առաջարկություններ

## 🎯 Նախագծի Նկարագրություն

**Torgomyan.Studio** - Վեբ-ստուդիա, որը մասնագիտացված է վեբ-կայքերի, վեբ-հավելվածների և թվային լուծումների մշակման մեջ:

---

## ✅ ԻՆՉ Է ԱՐՎԱԾ (Ընթացիկ Վիճակ)

### 1. **SEO Օպտիմիզացիա** ⭐⭐⭐⭐⭐

- ✅ **Structured Data (Schema.org)** - լավ իրականացված
  - WebSite schema
  - Service schema
  - BlogPosting schema
  - FAQPage schema
  - WebApplication schema
- ✅ **Meta tags** - կան բոլոր էջերում
- ✅ **Sitemap.xml** - դինամիկ գեներացիա
- ✅ **Robots.txt** - կոնֆիգուրացված
- ✅ **Canonical URLs** - սահմանված
- ⚠️ **OpenGraph tags** - մասնակի (գլխավոր layout-ում comment-ված է)

### 2. **Կոնվերսիայի Մեխանիզմներ** ⭐⭐⭐⭐

- ✅ **Exit-Intent Popup** - լավ իրականացված
  - localStorage tracking
  - 24 ժամվա cooldown
  - Telegram/WhatsApp կապեր
- ✅ **Scroll-Triggered Popup** - շատ լավ
  - 70% scroll threshold
  - Ժամանակավոր զեղչ (10 րոպե, 20%)
  - Timer countdown
- ✅ **Floating Call Button** - մշտական հասանելիություն
  - Telegram, WhatsApp, Phone
- ✅ **Recent Notifications** - սոցիալական ապացույց
  - Իրական ժամանակի ծանուցումներ
  - "X-ը պատվիրեց Y" ֆորմատ
  - 30 վայրկյանանոց interval

### 3. **Լիդ Գրավման Ձևեր** ⭐⭐⭐⭐

- ✅ **Կալկուլյատոր** - շատ լավ
  - AI հարցեր
  - Գնագոյացում
  - Մուլտի-ստեպ ֆորմ
- ✅ **Contact Form** - լավ
  - Ժամանակացույցով զանգ
  - Զեղչի համակարգ
- ✅ **Chat Inquiry** - բազմաթիվ կետերում

### 4. **Տեխնիկական Հիմք** ⭐⭐⭐⭐

- ✅ Next.js 16 (SSR/SSG)
- ✅ TypeScript
- ✅ Database tracking (Prisma)
- ✅ Admin panel

---

## ❌ ԻՆՉ Է ԲԱՑԱԾԱԿՎԱԾ (Կրիտիկական Բացեր)

### 1. **Անալիտիկա - ԿՐԻՏԻԿԱԿԱՆ** ❌❌❌

- ❌ **Google Analytics** - ԲԱՑԱԾԱԿՎԱԾ
- ❌ **Yandex Metrika** - ԲԱՑԱԾԱԿՎԱԾ
- ❌ **Facebook Pixel** - ԲԱՑԱԾԱԿՎԱԾ
- ❌ **Conversion Tracking** - ԲԱՑԱԾԱԿՎԱԾ
- ❌ **Event Tracking** - ԲԱՑԱԾԱԿՎԱԾ
  - Form submissions
  - Button clicks
  - Popup interactions
  - Calculator usage
- ❌ **E-commerce Tracking** - ԲԱՑԱԾԱԿՎԱԾ
- ❌ **User Behavior Analytics** - ԲԱՑԱԾԱԿՎԱԾ
  - Hotjar/Yandex Session Replay
  - Heatmaps
  - Scroll depth
  - Click tracking

### 2. **Մարկետինգային Ավտոմատացում** ❌❌

- ❌ **Email Marketing** - ԲԱՑԱԾԱԿՎԱԾ
  - Newsletter subscription
  - Drip campaigns
  - Abandoned calculator follow-up
  - Welcome sequences
- ❌ **CRM Integration** - ԲԱՑԱԾԱԿՎԱԾ
  - HubSpot, Salesforce, AmoCRM
- ❌ **Retargeting** - ԲԱՑԱԾԱԿՎԱԾ
  - Google Ads retargeting
  - Facebook/Instagram retargeting
- ❌ **Lead Scoring** - ԲԱՑԱԾԱԿՎԱԾ

### 3. **A/B Testing** ❌

- ❌ **Conversion Optimization Testing**
  - Popup variations
  - CTA button texts
  - Form fields
  - Pricing display

### 4. **Սոցիալական Մեդիա** ⚠️

- ⚠️ **Social Sharing** - մասնակի
  - OpenGraph tags կան, բայց անավարտ
  - Twitter Cards - բացակայում է
  - Social share buttons - բացակայում է

### 5. **Performance Monitoring** ⚠️

- ⚠️ **Core Web Vitals** - չի track-վում
- ⚠️ **Error Tracking** - բացակայում է (Sentry)

---

## 🚀 ԱՌԱՋԱՐԿՈՒԹՅՈՒՆՆԵՐ - Հաճախորդների Մաքսիմալ Ներգրավման Համար

### 🔥 ԿՐԻՏԻԿԱԿԱՆ (Անմիջապես)

#### 1. **Google Analytics 4 (GA4) Ինտեգրացիա**

```typescript
// src/app/layout.tsx - ավելացնել
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Track-ել:**

- Page views
- Form submissions (calculator, contact, chat)
- Button clicks (CTA buttons)
- Popup interactions (show, close, click)
- Calculator completions
- Video plays
- Scroll depth
- Time on page
- Exit pages

**Conversion Events:**

- `calculator_submission`
- `contact_form_submit`
- `scheduled_call`
- `popup_consultation_click`
- `phone_click`
- `telegram_click`
- `whatsapp_click`

#### 2. **Yandex Metrika Ինտեգրացիա**

```typescript
// Yandex Metrika - կարևոր Հայաստանի և Ռուսաստանի շուկայի համար
<script type="text/javascript">
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  ym(XXXXXX, "init", {clickmap:true,trackLinks:true,accurateTrackBounce:true});
</script>
```

#### 3. **Facebook Pixel**

```typescript
// Retargeting-ի համար
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'XXXXXXXXXXXXXXX');
  fbq('track', 'PageView');
</script>
```

#### 4. **Conversion Tracking - Event Implementation**

```typescript
// src/utils/analytics.ts - նոր ֆայլ
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Yandex Metrika
  if (window.ym) {
    window.ym(XXXXXX, 'reachGoal', eventName, params);
  }

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', eventName, params);
  }
};

// Օգտագործում
trackEvent('calculator_submission', {
  service_type: 'Лендинг',
  estimated_price: 25000,
  pages_count: 5,
});
```

**Կիրառել բոլոր կոնվերսիոն կետերում:**

- `src/components/common/calculator/calculator.tsx`
- `src/components/common/contact-us/contact-us.tsx`
- `src/components/common/exit-intent-popup/exit-intent-popup.tsx`
- `src/components/common/scroll-triggered-popup/scroll-triggered-popup.tsx`
- `src/components/common/floating-call-button/floating-call-button.tsx`

---

### 📈 ԲԱՑԱՐԿԱԿԱՆ (1-2 շաբաթ)

#### 5. **Enhanced OpenGraph & Twitter Cards**

```typescript
// src/app/layout.tsx - ակտիվացնել
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Torgomyan.Studio - Создаем сайты для вашего бизнеса',
    description:
      'Профессиональная разработка сайтов, веб-приложений и цифровых решений. Более 30 успешных проектов. Бесплатная консультация.',
    keywords: '...',
    openGraph: {
      title: 'Torgomyan.Studio - Создаем сайты для вашего бизнеса',
      description:
        'Профессиональная разработка сайтов, веб-приложений и цифровых решений',
      url: 'https://torgomyan-studio.am',
      siteName: 'Torgomyan.Studio',
      images: [
        {
          url: 'https://torgomyan-studio.am/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Torgomyan.Studio',
        },
      ],
      locale: 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Torgomyan.Studio - Создаем сайты для вашего бизнеса',
      description: 'Профессиональная разработка сайтов и веб-приложений',
      images: ['https://torgomyan-studio.am/images/twitter-card.jpg'],
    },
  };
}
```

#### 6. **Social Share Buttons**

```typescript
// Ավելացնել բոլոր բլոգային հոդվածներում
<div className="social-share">
  <button onClick={() => shareOnFacebook()}>Facebook</button>
  <button onClick={() => shareOnTelegram()}>Telegram</button>
  <button onClick={() => shareOnWhatsApp()}>WhatsApp</button>
  <button onClick={() => copyLink()}>Copy Link</button>
</div>
```

#### 7. **Email Marketing Integration**

- **Mailchimp/SendGrid/Unisender** - Newsletter subscription
- **Drip Campaigns:**
  - Welcome email (նոր բաժանորդ)
  - Abandoned calculator (3 օր հետո)
  - Blog post notifications
  - Special offers

#### 8. **Heatmaps & Session Recording**

- **Hotjar** կամ **Yandex Session Replay**
- Track user behavior
- Identify friction points
- Optimize conversion paths

---

### 🎯 ՄԵՐԵԼԱՅԻՆ (1 ամիս)

#### 9. **CRM Integration**

- **AmoCRM** կամ **HubSpot**
- Automatic lead creation
- Lead scoring
- Follow-up automation

#### 10. **A/B Testing Framework**

- **Google Optimize** կամ **VWO**
- Test:
  - Popup timing (70% vs 50% scroll)
  - CTA button colors/texts
  - Form field count
  - Discount percentages
  - Headlines

#### 11. **Advanced Analytics Dashboard**

- Custom dashboard admin panel-ում
- Real-time metrics:
  - Daily/weekly/monthly conversions
  - Conversion rate by source
  - Popular services
  - Average order value
  - Customer acquisition cost (CAC)
  - Lifetime value (LTV)

#### 12. **Retargeting Campaigns**

- Google Ads retargeting
- Facebook/Instagram retargeting
- Dynamic ads based on viewed services

#### 13. **Lead Magnets**

- Free resources:
  - "10 ошибок при создании сайта" PDF
  - Website audit checklist
  - Pricing guide
- Email capture forms

#### 14. **Chatbot Integration**

- **Intercom** կամ **Tawk.to**
- Automated responses
- Lead qualification
- 24/7 availability

---

### 💡 ԼՐԱՑՈՒՄԱՅԻՆ (2-3 ամիս)

#### 15. **Content Marketing Enhancement**

- SEO-optimized blog posts (ավելի շատ)
- Video content (YouTube)
- Case studies (детальные)
- Testimonials (video testimonials)

#### 16. **Referral Program**

- "Приведи друга - получи скидку"
- Tracking system
- Rewards

#### 17. **Loyalty Program**

- Points for:
  - Form submissions
  - Social shares
  - Reviews
  - Referrals

#### 18. **Advanced Personalization**

- Dynamic content based on:
  - Referral source
  - Previous visits
  - Service interest
  - Location

---

## 📊 ՄԵՏՐԻԿՆԵՐ - ԻՆՉ ՊԵՏՔ Է TRACK-ԵԼ

### **Traffic Metrics**

- Total visitors
- Unique visitors
- Page views
- Sessions
- Bounce rate
- Average session duration

### **Conversion Metrics**

- Conversion rate (%)
- Total conversions
- Cost per conversion (CPC)
- Conversion by source:
  - Organic search
  - Direct
  - Social media
  - Referral
  - Paid ads

### **Engagement Metrics**

- Scroll depth
- Time on page
- Pages per session
- Video play rate
- Calculator completion rate
- Form abandonment rate

### **Business Metrics**

- Leads generated
- Qualified leads
- Sales calls scheduled
- Projects started
- Revenue
- Customer acquisition cost (CAC)
- Lifetime value (LTV)
- ROI

---

## 🎯 ԿԱՐԳԱՎՈՐՄԱՆ ԱՌԱՋԱՐԿՈՒԹՅՈՒՆՆԵՐ

### **Priority 1 (Այս շաբաթ)**

1. ✅ Google Analytics 4 setup
2. ✅ Yandex Metrika setup
3. ✅ Facebook Pixel setup
4. ✅ Event tracking implementation
5. ✅ OpenGraph tags completion

### **Priority 2 (Առաջիկա 2 շաբաթ)**

6. ✅ Email marketing integration
7. ✅ Social share buttons
8. ✅ Heatmaps setup
9. ✅ Enhanced conversion tracking

### **Priority 3 (Առաջիկա 1 ամիս)**

10. ✅ CRM integration
11. ✅ A/B testing framework
12. ✅ Analytics dashboard
13. ✅ Retargeting setup

---

## 💰 ROI ԱՌԱԺԵՔՆԵՐ

### **Ընթացիկ վիճակ (առանց անալիտիկայի)**

- ❌ Չգիտեք, թե որտեղից են գալիս հաճախորդները
- ❌ Չգիտեք, թե որ էջերն են ավելի արդյունավետ
- ❌ Չկա conversion optimization
- ❌ Չկա retargeting

### **Առաջարկվող լուծումներից հետո**

- ✅ **+30-50% conversion rate** - A/B testing-ի շնորհիվ
- ✅ **+40-60% qualified leads** - retargeting-ի շնորհիվ
- ✅ **-20-30% customer acquisition cost** - optimization-ի շնորհիվ
- ✅ **+25-35% revenue** - email marketing-ի շնորհիվ

---

## 🔧 ՏԵԽՆԻԿԱԿԱՆ ԻՐԱԿԱՆԱՑՈՒՄ

### **1. Analytics Setup**

```bash
# Environment variables (.env)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_YANDEX_METRIKA_ID=XXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXXXXXXXXXXXXXX
```

### **2. Analytics Utility**

```typescript
// src/utils/analytics.ts
export const initAnalytics = () => {
  // GA4, Yandex, Facebook initialization
};

export const trackEvent = (eventName: string, params?: any) => {
  // Universal event tracking
};

export const trackConversion = (type: string, value?: number) => {
  // Conversion tracking
};
```

### **3. Component Integration**

```typescript
// Example: Calculator submission
const handleSubmit = async () => {
  // ... existing code ...

  // Track conversion
  trackEvent('calculator_submission', {
    service_type: formData.selectedService,
    estimated_price: estimatedPrice,
    pages_count: formData.pagesCount,
  });

  trackConversion('calculator', estimatedPrice);
};
```

---

## 📝 ԵԶՐԱԿԱՑՈՒԹՅՈՒՆ

### **Ընթացիկ Վիճակ**

Նախագիծը ունի **լավ տեխնիկական հիմք** և **կոնվերսիոն մեխանիզմներ**, բայց **բացակայում է անալիտիկան** և **մարկետինգային ավտոմատացումը**:

### **Կրիտիկական Բացեր**

1. ❌ **Չկա անալիտիկա** - չգիտեք, թե ինչ է աշխատում
2. ❌ **Չկա conversion tracking** - չգիտեք ROI
3. ❌ **Չկա retargeting** - կորցնում եք 95%+ visitors-ի

### **Առաջարկություն**

**Անմիջապես** սկսել GA4, Yandex Metrika, Facebook Pixel-ի ինտեգրացիան: Սա կտա **հիմնական տվյալներ** հաճախորդների վարքագծի մասին և կթույլատրի **data-driven decisions** կայացնել:

### **Ակնկալվող Արդյունք**

Իրականացումից հետո կարող եք սպասել:

- **+30-50% conversion rate**
- **+40-60% qualified leads**
- **-20-30% customer acquisition cost**
- **+25-35% revenue**

---

**Վերլուծությունը կատարվել է:** `2024-12-XX`  
**Նախագիծ:** Torgomyan.Studio  
**Վերլուծող:** AI Assistant
