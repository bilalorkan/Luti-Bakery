# Luti Bakery 🍪

El yapımı cookie'ler için e-ticaret sitesi — her sabah taze, soğuk zincirle kapınızda.

## Teknolojiler

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- Zustand (sepet, localStorage kalıcılığı)
- Framer Motion (scroll showcase ve geçişler)

## Geliştirme

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresinden siteyi açın.

## Özellikler

- **Pinned scroll showcase** — ana sayfada her scroll adımında tek cookie odakta, panel başına zemin rengi değişir
- 4 imza cookie: Klasik, Black Cocoa, Red Velvet, Fıstık Ezmeli
- Sepet drawer + 4 adımlı checkout (adres → kargo → ödeme → onay)
- Yüzen ada navigasyon, bordo marka paleti, Giaza Stencil logo tipografisi
- Sizden Gelenler (müşteri yorumları) sayfası

> Ödeme şu an arayüz seviyesinde (mock). Gerçek ödeme altyapısı (Stripe/iyzico) backend fazında bağlanacak.

## Yol Haritası

- [ ] Backend: sipariş API'si + veritabanı
- [ ] Ödeme entegrasyonu
- [ ] Gerçek ürün fotoğrafları
- [ ] Admin paneli
