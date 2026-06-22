# Plan.md - Chilling Barber Shop Landing Page + Booking UI

> Phase 1: Build the public landing page and booking form first. The PC app, Android APK, iOS app, database, and Telegram system will be connected in later phases.

---

## 1. Project Goal

Build a premium public landing page for **Chilling Barber Shop / ChillingHairStudio** with:

- High-conversion advertising landing page.
- Smooth image animations and scroll reveal.
- Sticky header with logo, animated center panel, phone, address, and Facebook link.
- Service showcase sections using images from project folders.
- Finished work gallery using images from `sample/`.
- Full booking form like the reference screenshots.
- Live right-side booking summary card.
- Clean booking payload ready for future backend integration.

Future system scope, not implemented in this phase:

- PC app for order management.
- Android APK.
- iOS app.
- Local SQLite database.
- Telegram notification.
- Revenue, cash flow, debt, staff, customer, inventory, points, and branch reports.

---

## 2. Codex Skill To Use

Create this skill before coding:

```txt
.codex/skills/chilling-landing-page-builder/SKILL.md
```

Use the skill file content from this pack:

```txt
.codex/skills/chilling-landing-page-builder/SKILL.md
```

Codex must read and follow that skill for all landing page work.

---

## 3. Recommended Stack

Use:

```txt
Vite
Vue 3
TypeScript
Tailwind CSS
Vue Router
Pinia
Lucide icons
@vueuse/motion or lightweight CSS animations
```

Do not use backend/database in phase 1.

Do not use:

```txt
Google Sheet
GAS
Supabase
Firebase
Telegram direct frontend call
Cloud database
```

---

## 4. Expected Project Structure

```txt
chilling-landing/
│
├── public/
│   ├── logo.PNG
│   ├── panel.PNG
│   ├── Ani.PNG
│   ├── landing/
│   │   ├── anh1.*
│   │   ├── anh2.*
│   │   ├── anh2-1.*
│   │   ├── anh2-2.*
│   │   ├── anh2-3.*
│   │   ├── anh2-4.*
│   │   └── anh2-5.*
│   │
│   └── sample/
│       └── *.*
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.vue
│   │   │   └── AppFooter.vue
│   │   ├── landing/
│   │   │   ├── HeroSection.vue
│   │   │   ├── StudioShowcase.vue
│   │   │   ├── ServiceHighlights.vue
│   │   │   ├── SampleGallery.vue
│   │   │   └── BookingSection.vue
│   │   ├── booking/
│   │   │   ├── BookingForm.vue
│   │   │   ├── ServicePicker.vue
│   │   │   ├── TimeSlotGrid.vue
│   │   │   ├── BookingSummaryCard.vue
│   │   │   └── BookingSuccessModal.vue
│   │   └── ui/
│   │       ├── BaseButton.vue
│   │       ├── BaseInput.vue
│   │       ├── BaseSelect.vue
│   │       ├── BaseCard.vue
│   │       └── StatusBadge.vue
│   │
│   ├── data/
│   │   ├── serviceCatalog.ts
│   │   ├── branchData.ts
│   │   └── timeSlots.ts
│   │
│   ├── api/
│   │   └── bookingApi.ts
│   │
│   ├── types/
│   │   └── booking.ts
│   │
│   ├── utils/
│   │   ├── formatCurrency.ts
│   │   ├── phone.ts
│   │   └── validation.ts
│   │
│   ├── pages/
│   │   └── LandingPage.vue
│   │
│   ├── App.vue
│   ├── main.ts
│   └── style.css
│
├── docs/
│   └── references/
│       ├── ref-01-mobile-report-menu.png
│       ├── ref-02-mobile-revenue-menu.png
│       ├── ref-03-mobile-revenue-detail.png
│       ├── ref-04-booking-form-dropdown.png
│       └── ref-05-booking-form-full.png
│
├── package.json
└── README.md
```

---

## 5. Reference Screenshots

These screenshots are included for Codex visual understanding.

### 5.1 Future mobile report menu reference

![Mobile report menu](docs/references/ref-01-mobile-report-menu.png)

Use for future app visual direction: clean white cards, light gray background, list rows, simple icons, bottom navigation.

### 5.2 Future mobile revenue submenu reference

![Mobile revenue submenu](docs/references/ref-02-mobile-revenue-menu.png)

Use for future report navigation style.

### 5.3 Future revenue report detail reference

![Mobile revenue detail](docs/references/ref-03-mobile-revenue-detail.png)

Use for future KPI cards and report table style.

### 5.4 Booking form dropdown reference

![Booking form dropdown](docs/references/ref-04-booking-form-dropdown.png)

Use for booking form structure, service dropdowns, time slot grid, and right summary panel.

### 5.5 Full booking form reference

![Full booking form](docs/references/ref-05-booking-form-full.png)

Use for desktop booking form layout and right-side summary panel behavior.

---

## 6. Brand And Business Information

Brand:

```txt
Chilling Barber Shop
ChillingHairStudio
```

Phone:

```txt
032 796 9930
```

Phone link:

```txt
tel:0327969930
```

Address:

```txt
Đường D13-5A, KCN Bàu Bàng, Xã Lai Uyên, Huyện Bàu Bàng, Bình Dương
```

Facebook:

```txt
https://www.facebook.com/chillingbarbershop?locale=vi_VN
```

Opening hours:

```txt
09:00 - 20:00
```

Footer copyright:

```txt
© 2026 Engineered by Vinh | All rights reserved
```

---

## 7. Landing Page Layout

### 7.1 Sticky Header

Header layout:

```txt
Left: logo.PNG
Middle: panel.PNG with barbershop pole inspired animated visual
Right:
  - Phone: 032 796 9930
  - Address
  - Facebook logo/link
```

Requirements:

- Header must be sticky when scrolling.
- Phone click must open phone dialer using `tel:0327969930`.
- Address click must open Google Maps search/directions.
- Facebook icon click must open Facebook link.
- Header must collapse cleanly on mobile.
- On mobile, contact actions can become compact icon buttons.

Suggested map link:

```txt
https://www.google.com/maps/search/?api=1&query=Đường%20D13-5A%2C%20KCN%20Bàu%20Bàng%2C%20Xã%20Lai%20Uyên%2C%20Huyện%20Bàu%20Bàng%2C%20Bình%20Dương
```

### 7.2 Section 1 - Hero

Use:

```txt
public/landing/anh1.*
```

Purpose:

- First impression.
- Premium barber studio feel.
- Big CTA: “Đặt lịch ngay”.
- CTA scrolls to booking form.
- Add soft reveal animation.

Suggested copy:

```txt
Chilling Barber Shop
Nâng tầm phong cách tóc nam tại Bàu Bàng

Cắt tóc, uốn, nhuộm, thư giãn và chăm sóc diện mạo với đội ngũ barber chuyên nghiệp.
```

CTA:

```txt
Đặt lịch ngay
Xem dịch vụ
```

### 7.3 Section 2 - Studio Showcase

Use:

```txt
public/landing/anh2.*
public/landing/anh2-1.*
public/landing/anh2-2.*
public/landing/anh2-3.*
public/landing/anh2-4.*
public/landing/anh2-5.*
```

Layout:

- 1 large image.
- 4 small images.
- Smooth scroll reveal.
- Text about professional studio, barber skill, style consulting, customer experience.

Suggested copy:

```txt
Không gian barber chuyên nghiệp
Tư vấn kiểu tóc phù hợp khuôn mặt
Dịch vụ rõ giá - rõ thời gian - dễ đặt lịch
Trải nghiệm chỉn chu từ cắt, uốn, nhuộm đến thư giãn
```

### 7.4 Section 3 - Service Highlights

Create highlight cards:

```txt
Cắt tóc chuyên nghiệp
Uốn - ép side - tẩy - nhuộm
Dịch vụ thư giãn
Dịch vụ riêng lẻ
Đặt lịch nhanh
Theo dõi tổng tiền rõ ràng
```

### 7.5 Section 4 - Finished Work Gallery

Use all images from:

```txt
public/sample/
```

Requirements:

- Masonry/grid style.
- Lazy loading.
- Smooth hover.
- Mobile 2-column grid.
- Desktop 3/4-column grid.
- If folder empty, show placeholder cards and TODO comment.

Title:

```txt
Mẫu thành phẩm
```

Subtitle:

```txt
Một số phong cách tóc và trải nghiệm hoàn thiện tại Chilling Barber Shop.
```

### 7.6 Section 5 - Booking Form

Build a full booking form with right summary panel.

Desktop:

```txt
Left: form
Right: sticky booking summary + promotion/brand panel optional
```

Mobile:

```txt
Form first
Summary becomes sticky bottom or collapsible card
```

---

## 8. Booking Form Fields

Required fields:

```txt
Số điện thoại *
Họ và tên *
Tổng số khách
Chọn chi nhánh *
Ngày đặt lịch *
Dịch vụ *
Khách
Chọn khung giờ dịch vụ *
```

Optional:

```txt
Ghi chú
```

Default branch:

```txt
Đường D13-5A - KCN Bàu Bàng - Lai Uyên - Bàu Bàng - Bình Dương
```

Consent text above submit:

```txt
Với việc nhấn nút "Đặt lịch" đồng nghĩa bạn đã đồng ý với Chính sách bảo vệ dữ liệu cá nhân của ChillingHairStudio.
```

Submit button:

```txt
Đặt lịch
```

---

## 9. Service Catalog

Create this as typed data in:

```txt
src/data/serviceCatalog.ts
```

### 9.1 Group 1

Group:

```txt
1/. Đặt Lịch Cắt Tóc Tại Đây
```

Services:

| Service | Price | Duration | Staff |
|---|---:|---:|---|
| Thợ cắt (được quyền yêu cầu) | 70,000đ | 35 phút | Thông |
| Chủ quán cắt | 100,000đ | 45 phút | Boss Linh |

### 9.2 Group 2

Group:

```txt
2. UỐN - ÉP SIDE - TẨY - NHUỘM
```

Services:

| Service | Price | Duration | Staff |
|---|---:|---:|---|
| Nhuộm màu thời trang (Free cắt) | 400,000đ | 180 phút | Nam, Thông |
| Nhuộm màu cơ bản (Free cắt) | 300,000đ | 120 phút | Nam, Thông |
| Uốn tóc trending (Free cắt) | 450,000đ | 120 phút | Nam, Thông |
| Uốn tóc cơ bản (Free cắt) | 300,000đ | 90 phút | Nam, Thông |

### 9.3 Group 3

Group:

```txt
3. Dịch Vụ Thư Giãn
```

Services:

| Service | Price | Duration | Staff |
|---|---:|---:|---|
| Massage mặt, cổ, vai gáy | 100,000đ | 120 phút | Hương, Thông, Nam |
| Gội đầu (Shampoo) | 60,000đ | 15 phút | Hương, Thông, Nam |
| Massage mặt | 20,000đ | 15 phút | Hương, Thông, Nam |

### 9.4 Group 4

Group:

```txt
4. Dịch Vụ Riêng Lẻ
```

Services:

| Service | Price | Duration | Staff |
|---|---:|---:|---|
| Đánh mắt | 50,000đ | 20 phút | Hương, Thông |
| Cắt móng tay, chân | 100,000đ | 20 phút | Hương, Thông |
| Nhổ tóc bạc | 50,000đ | 30 phút | Hương, Thông |
| Xông mặt hút mụn | 50,000đ | 15 phút | Hương |
| Se lỗ ghèn | 80,000đ | 20 phút | Hương |
| Nặn mụn | 50,000đ | 30 phút | Hương |

> Note: User input had a typo `50,d000đ`; normalize it to `50,000đ`.

---

## 10. Time Slots

Create in:

```txt
src/data/timeSlots.ts
```

Slots:

```ts
export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00"
]
```

Behavior:

- Click to select.
- Selected slot must have strong active style.
- Disabled slot style should be gray.
- For phase 1, all slots can be available unless manually disabled in sample code.

---

## 11. Booking Summary Panel

Summary panel appears after service selection and updates live.

Header:

```txt
logo.PNG
Chilling Barber Shop
Hotline: 0327969930
Giờ mở cửa: 09:00 - 20:00
```

Content example:

```txt
Dịch vụ (1)

Chủ quán Cắt
1 x 100,000đ

Tạm tính
100,000đ

Giảm giá
0đ

Thời gian dự kiến
45 phút

Tổng tiền
100,000đ
```

Rules:

- `subtotal = sum(service.price * quantity)`.
- `discount = 0` in phase 1.
- `totalAmount = subtotal - discount`.
- `totalDurationMinutes = sum(service.durationMinutes * quantity)`.
- Support multiple services via “Thêm dịch vụ”.
- If no service selected, show empty state.

---

## 12. Booking Payload

Create type:

```txt
src/types/booking.ts
```

Required payload:

```ts
export type BookingPayload = {
  customer: {
    phone: string
    fullName: string
    totalGuests: number
  }
  branch: {
    name: string
    address: string
  }
  appointment: {
    date: string
    timeSlot: string
  }
  services: Array<{
    groupName: string
    serviceName: string
    staffName: string
    price: number
    durationMinutes: number
    quantity: number
  }>
  subtotal: number
  discount: number
  totalAmount: number
  totalDurationMinutes: number
  note?: string
  source: "landing_page"
}
```

Phase 1 submit behavior:

- Validate.
- Build payload.
- Show success modal.
- Console log payload.
- Prepare `bookingApi.ts` for future integration.

Future API placeholder:

```ts
export async function submitBooking(payload: BookingPayload) {
  const apiUrl = import.meta.env.VITE_BOOKING_API_URL

  if (!apiUrl) {
    console.info("Booking API not configured. Phase 1 local preview payload:", payload)
    return {
      ok: true,
      mode: "preview",
      bookingCode: `PREVIEW-${Date.now()}`
    }
  }

  const response = await fetch(`${apiUrl}/api/public/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error("Không thể gửi lịch đặt. Vui lòng thử lại.")
  }

  return response.json()
}
```

---

## 13. Validation Rules

Phone:

- Required.
- Normalize spaces.
- Accept Vietnamese phone pattern.
- Output clean phone number.

Full name:

- Required.
- Minimum 2 characters.

Total guests:

- Default 1.
- Minimum 1.
- Maximum 10.

Date:

- Required.
- Do not allow past date.

Service:

- At least one valid service row.
- Each selected service needs group, service, and staff.

Time slot:

- Required.

Submit button:

- Disabled until valid.
- Show clear field error messages.

---

## 14. UI Behavior Details

### Add service

Button text:

```txt
Thêm dịch vụ
```

When clicked:

- Add new empty service row.
- Recalculate summary after selection.
- Allow remove service row.

### Notes

Show toggle:

```txt
Hiện ghi chú
```

When enabled:

- Show textarea.
- Save note into payload.

### Loading states

On submit:

- Button shows loading.
- Prevent double submit.

### Success modal

Show:

```txt
Đặt lịch thành công!
Cảm ơn anh/chị đã đặt lịch tại Chilling Barber Shop.
Mã đặt lịch: PREVIEW-xxxx
```

Buttons:

```txt
Đặt lịch mới
Gọi hotline
```

---

## 15. Motion And Animation Requirements

Required:

- Smooth scroll.
- Sticky header shadow appears after scroll.
- Hero image reveal.
- Section image slide-up/fade-in.
- Showcase cards stagger reveal.
- Booking summary gentle enter animation.
- Button hover/tap effect.
- Respect `prefers-reduced-motion`.

Do not:

- Use too many 3D effects.
- Use extremely heavy parallax.
- Use infinite animations that distract from booking.
- Make phone scroll lag.

---

## 16. Responsive Requirements

Desktop:

```txt
Max content width: 1180px - 1280px
Booking form: 2-column layout
Summary panel sticky right
Image showcase: editorial grid
```

Tablet:

```txt
Header compact
Booking form still readable
Summary can move below form
```

Mobile:

```txt
Single column
Large inputs
Large time-slot buttons
Summary collapsible or below form
Sticky CTA allowed
Header contact icons compact
```

Minimum tap target:

```txt
44px height
```

---

## 17. SEO And Meta

Set:

```txt
Title: Chilling Barber Shop - Đặt lịch cắt tóc Bàu Bàng
Description: Đặt lịch cắt tóc, uốn, nhuộm và dịch vụ thư giãn tại Chilling Barber Shop Bàu Bàng.
```

Add Open Graph placeholders using available images.

---

## 18. Accessibility

Requirements:

- Buttons have accessible names.
- Inputs have labels.
- Error messages readable.
- Keyboard focus visible.
- Color contrast acceptable.
- Images have alt text.
- Do not rely on color only for selected/disabled states.

---

## 19. Footer

Footer text:

```txt
© 2026 Engineered by Vinh | All rights reserved
```

Optional:

```txt
Chilling Barber Shop
Hotline: 032 796 9930
Địa chỉ: Đường D13-5A, KCN Bàu Bàng, Xã Lai Uyên, Huyện Bàu Bàng, Bình Dương
Facebook: https://www.facebook.com/chillingbarbershop?locale=vi_VN
```

---

## 20. Codex Implementation Order

Codex must implement in this order:

1. Create/verify Vite + Vue 3 + TypeScript + Tailwind project.
2. Create design tokens and base styles.
3. Create static data files:
   - `serviceCatalog.ts`
   - `branchData.ts`
   - `timeSlots.ts`
4. Create type definitions:
   - `booking.ts`
5. Create utility functions:
   - currency format
   - phone normalize
   - validation
6. Build header.
7. Build hero section.
8. Build studio showcase section.
9. Build service highlight section.
10. Build sample gallery section.
11. Build booking form.
12. Build summary card.
13. Build submit/success preview flow.
14. Add responsive polish.
15. Add motion polish.
16. Run build/typecheck.
17. Provide summary of changed files.

---

## 21. Acceptance Criteria

Landing page is acceptable only if:

- It builds successfully.
- It does not need backend to preview.
- It uses the correct brand info.
- It renders logo and images from expected folders.
- Sticky header works.
- Phone/map/Facebook links work.
- Booking form validates fields.
- Service prices and durations are correct.
- Staff options are correct.
- Time slots are correct.
- “Thêm dịch vụ” works.
- Summary panel calculates subtotal, discount, total, and duration correctly.
- Submit creates a clean payload.
- Mobile layout is clean.
- Desktop layout is visually close to the provided booking reference.
- Footer copyright is present.
- No secrets are exposed.

---

## 22. Prompt For Codex

Use this prompt after adding `Plan.md` and the skill:

```txt
Use .codex/skills/chilling-landing-page-builder/SKILL.md.

Read Plan.md carefully and build Phase 1 only: the Chilling Barber Shop public landing page and booking form.

Do not build backend, database, Telegram, PC app, APK, or iOS app yet.

Use Vite + Vue 3 + TypeScript + Tailwind CSS.

Implement:
- Sticky header with logo, panel animation, phone, address, and Facebook CTA.
- Hero section from public/landing/anh1.
- Studio showcase section using public/landing/anh2 and anh2-1..anh2-5.
- Service highlights.
- Finished work gallery from public/sample.
- Booking form with all required fields, service catalog, staff selector, time slots, add service, notes toggle, validation, and live summary card.
- Preview submit flow that creates BookingPayload and shows success modal.

Run typecheck/build and fix all errors.
Summarize changed files and how to preview.
```
