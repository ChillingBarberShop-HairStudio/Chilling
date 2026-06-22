---
name: chilling-landing-page-builder
description: Use this skill to build the first standalone landing page and booking UI for Chilling Barber Shop before connecting it to the PC/APK/iOS order management system.
---

# Chilling Landing Page Builder Skill

## When to use

Use this skill when building or editing:

- Chilling Barber Shop landing page.
- Public booking form.
- Service picker.
- Staff/barber selector.
- Booking time-slot UI.
- Pricing summary panel.
- Responsive mobile/tablet/desktop layout.
- Motion effects, image reveal effects, sticky header, call/map/Facebook CTA.
- Frontend-only booking payload ready for future backend integration.

## Product context

This is phase 1 of a larger system:

- Future PC app, Android APK, and iOS app will manage orders, appointments, revenue reports, cash flow, customers, staff, debt, inventory, cash cards, points, and branches.
- Current task only builds the public landing page and booking form.
- Do not build the PC app, APK, iOS app, local database, Telegram bot, or backend in this phase unless explicitly requested.
- The booking form must prepare a clean booking payload for future Local API integration.

## Hard rules

- Do not use Google Sheet.
- Do not use GAS.
- Do not use Supabase.
- Do not use Firebase.
- Do not expose Telegram Bot Token in frontend.
- Do not call Telegram directly from frontend.
- Do not hard-code backend secrets.
- Do not create fake database logic.
- Do not create overly heavy animations that lag on weak phones.
- All UI must be responsive and mobile-first.
- Vietnamese text must use full accents.
- Keep code clean, typed, reusable, and easy to connect to backend later.

## Preferred stack

Use this default stack unless the repository already has a different chosen stack:

```txt
Vite
Vue 3
TypeScript
Tailwind CSS
Vue Router
Pinia
Lucide icons
Motion library: @vueuse/motion or GSAP only if needed
```

If using React instead, keep the same architecture and UX rules.

## Asset rules

Expected public asset folders:

```txt
public/
  logo.PNG
  panel.PNG
  landing/
    anh1.*
    anh2.*
    anh2-1.*
    anh2-2.*
    anh2-3.*
    anh2-4.*
    anh2-5.*
  sample/
    *.jpg
    *.png
    *.webp
```

Rules:

- Use `logo.PNG` in the header and booking summary card.
- Use `panel.PNG` in the center header area with barbershop-pole inspired rotating/looping visual effect.
- Use images inside `landing/` for hero/showcase sections.
- Use images inside `sample/` for finished-hair gallery.
- If an expected image is missing, render a beautiful placeholder and add a clear TODO comment.
- Optimize images with `loading="lazy"` except above-the-fold hero image.
- Use object-fit cover and avoid layout shift.

## UI taste rules

Design direction:

- Premium barber studio landing page.
- Modern, clean, cinematic, high-conversion.
- Smooth but not noisy.
- Strong visual hierarchy.
- Sticky header.
- Elegant cards.
- Large tap targets on mobile.
- Booking form must feel like Easysalon-style flow, but visually cleaner and more branded.

Style tokens:

```txt
Background: #f4f6f8, #ffffff, dark accent sections
Text primary: #111827
Text secondary: #6b7280
Primary blue: #1687ff
Accent gold: #d4a84f
Success: #10b981
Danger: #ef4444
Border: #e5e7eb
Radius: 16px / 20px / 24px
Spacing: 8px system
```

## Required interaction behavior

Header:

- Sticky at top when scrolling.
- Left: logo.PNG.
- Middle: panel.PNG with subtle barbershop pole/rotating-inspired animation.
- Right:
  - Phone: `032 796 9930`
  - Address: `Đường D13-5A, KCN Bàu Bàng, Xã Lai Uyên, Huyện Bàu Bàng, Bình Dương`
  - Facebook icon/link.
- Phone click opens tel link with clean phone number: `tel:0327969930`.
- Address click opens Google Maps search/directions link.
- Facebook click opens: `https://www.facebook.com/chillingbarbershop?locale=vi_VN`.

Landing sections:

- Section 1: hero image `landing/anh1`.
- Section 2: studio/pro service showcase with 5 images: 1 large image and 4 small images from `anh2`, `anh2-1`, `anh2-2`, `anh2-3`, `anh2-4`, `anh2-5`.
- Section 3: service/experience highlights.
- Section 4: sample finished works gallery from `sample/`.
- Section 5: booking form.

Motion:

- Use smooth scroll reveal.
- Use subtle slide/fade reveal for images.
- Use hover lift for cards.
- Avoid excessive animation.
- Respect reduced motion preference.

## Booking form required fields

Required customer fields:

```txt
Số điện thoại *
Họ và tên *
Tổng số khách
Chọn chi nhánh *
Ngày đặt lịch *
Dịch vụ *
Khách
Chọn khung giờ dịch vụ *
Ghi chú optional
```

Default branch:

```txt
Đường D13-5A - KCN Bàu Bàng - Lai Uyên - Bàu Bàng - Bình Dương
```

Opening hours:

```txt
09:00 - 20:00
```

Time slots:

```txt
09:00
09:30
10:00
10:30
11:00
11:30
12:00
12:30
13:00
13:30
14:00
14:30
15:00
15:30
16:00
16:30
17:00
17:30
18:00
18:30
19:00
19:30
20:00
```

## Service catalog

Represent service catalog as typed data, not hard-coded inside template markup.

### Group 1 - Đặt lịch cắt tóc tại đây

```ts
{
  groupName: "1/. Đặt Lịch Cắt Tóc Tại Đây",
  services: [
    {
      name: "Thợ cắt (được quyền yêu cầu)",
      price: 70000,
      durationMinutes: 35,
      staffRole: "barber",
      staffOptions: ["Thông"]
    },
    {
      name: "Chủ quán cắt",
      price: 100000,
      durationMinutes: 45,
      staffRole: "owner",
      staffOptions: ["Boss Linh"]
    }
  ]
}
```

### Group 2 - Uốn - Ép Side - Tẩy - Nhuộm

```ts
{
  groupName: "2. UỐN - ÉP SIDE - TẨY - NHUỘM",
  services: [
    {
      name: "Nhuộm màu thời trang (Free cắt)",
      price: 400000,
      durationMinutes: 180,
      staffRole: "barber",
      staffOptions: ["Nam", "Thông"]
    },
    {
      name: "Nhuộm màu cơ bản (Free cắt)",
      price: 300000,
      durationMinutes: 120,
      staffRole: "barber",
      staffOptions: ["Nam", "Thông"]
    },
    {
      name: "Uốn tóc trending (Free cắt)",
      price: 450000,
      durationMinutes: 120,
      staffRole: "barber",
      staffOptions: ["Nam", "Thông"]
    },
    {
      name: "Uốn tóc cơ bản (Free cắt)",
      price: 300000,
      durationMinutes: 90,
      staffRole: "barber",
      staffOptions: ["Nam", "Thông"]
    }
  ]
}
```

### Group 3 - Dịch vụ thư giãn

```ts
{
  groupName: "3. Dịch Vụ Thư Giãn",
  services: [
    {
      name: "Massage mặt, cổ, vai gáy",
      price: 100000,
      durationMinutes: 120,
      staffRole: "mixed",
      staffOptions: ["Hương", "Thông", "Nam"]
    },
    {
      name: "Gội đầu (Shampoo)",
      price: 60000,
      durationMinutes: 15,
      staffRole: "mixed",
      staffOptions: ["Hương", "Thông", "Nam"]
    },
    {
      name: "Massage mặt",
      price: 20000,
      durationMinutes: 15,
      staffRole: "mixed",
      staffOptions: ["Hương", "Thông", "Nam"]
    }
  ]
}
```

### Group 4 - Dịch vụ riêng lẻ

```ts
{
  groupName: "4. Dịch Vụ Riêng Lẻ",
  services: [
    {
      name: "Đánh mắt",
      price: 50000,
      durationMinutes: 20,
      staffRole: "mixed",
      staffOptions: ["Hương", "Thông"]
    },
    {
      name: "Cắt móng tay, chân",
      price: 100000,
      durationMinutes: 20,
      staffRole: "mixed",
      staffOptions: ["Hương", "Thông"]
    },
    {
      name: "Nhổ tóc bạc",
      price: 50000,
      durationMinutes: 30,
      staffRole: "mixed",
      staffOptions: ["Hương", "Thông"]
    },
    {
      name: "Xông mặt hút mụn",
      price: 50000,
      durationMinutes: 15,
      staffRole: "skinner",
      staffOptions: ["Hương"]
    },
    {
      name: "Se lỗ ghèn",
      price: 80000,
      durationMinutes: 20,
      staffRole: "skinner",
      staffOptions: ["Hương"]
    },
    {
      name: "Nặn mụn",
      price: 50000,
      durationMinutes: 30,
      staffRole: "skinner",
      staffOptions: ["Hương"]
    }
  ]
}
```

## Booking summary card

After the user fills/selects enough information, show a right-side summary panel on desktop and sticky bottom/accordion summary on mobile.

Header:

```txt
logo.PNG
Chilling Barber Shop
Hotline: 0327969930
Giờ mở cửa: 09:00 - 20:00
```

Summary content example:

```txt
Dịch vụ (1)
Tên dịch vụ
1 x 50,000đ

Tạm tính
50,000đ

Giảm giá
0đ

Thời gian dự kiến
30 phút

Tổng tiền
50,000đ
```

Rules:

- Recalculate total price when service changes.
- Recalculate total duration when service changes or services are added.
- Support “Thêm dịch vụ”.
- Support optional notes toggle: “Hiện ghi chú”.
- The submit button must be disabled until all required fields are valid.

## Booking consent text

Show above the booking button:

```txt
Với việc nhấn nút "Đặt lịch" đồng nghĩa bạn đã đồng ý với Chính sách bảo vệ dữ liệu cá nhân của ChillingHairStudio.
```

## Booking button

Text:

```txt
Đặt lịch
```

On click:

- Validate all required fields.
- Build clean booking payload.
- In phase 1, show success modal/page and print payload to console.
- Prepare `bookingApi.ts` with future API function but do not hard-code backend.
- Do not directly call Telegram.

Payload shape:

```ts
type BookingPayload = {
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

## Reference screenshots

Use the screenshots in `docs/references/` only as visual/UI references:

- `ref-01-mobile-report-menu.png`: future mobile app report menu style.
- `ref-02-mobile-revenue-menu.png`: future mobile report submenu style.
- `ref-03-mobile-revenue-detail.png`: future revenue KPI/table style.
- `ref-04-booking-form-dropdown.png`: booking form dropdown/slot reference.
- `ref-05-booking-form-full.png`: full desktop booking form and right summary panel reference.

Do not copy UI blindly. Use them to understand spacing, card structure, list rows, right-side summary card, and form behavior.

## Completion checklist

Before finalizing:

- Header is sticky.
- Phone opens call link.
- Address opens map.
- Facebook link works.
- Hero and landing images render.
- Showcase image grid renders.
- Sample gallery renders.
- Booking form validates required fields.
- Services, prices, duration, staff options are correct.
- Add service works.
- Summary panel calculates correctly.
- Time slots render and can be selected.
- Booking submit creates valid payload.
- Mobile layout is clean.
- Desktop layout is clean.
- No secret/token in frontend.
- No backend dependency required for phase 1.
- Build passes.
