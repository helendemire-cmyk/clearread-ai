# ClearRead AI (MVP)

Metni disleksi dostu biçimde göstermek ve isteğe bağlı AI ile sadeleştirmek için tek sayfalık bir araç. Ayrıntılı kapsam için `prd.md` dosyasına bakın.

## Gereksinimler

- [Node.js](https://nodejs.org/) (LTS önerilir)

## Simplify (Gemini) — yerel geliştirme

Anahtar **yalnızca sunucuda** tutulur; tarayıcıya gönderilmez.

1. [Google AI Studio](https://aistudio.google.com/apikey) üzerinden bir API anahtarı alın.
2. Proje kökünde `.env` oluşturun (`.env.example` dosyasına bakın):

   ```bash
   GEMINI_API_KEY=buraya_anahtariniz
   ```

3. `npm run dev` ile çalıştırın. İstekler `POST /api/simplify` üzerinden gider (Vite geliştirme sunucusu bu yolu sunucu tarafında işler).

Üretimde (ör. Vercel) `GEMINI_API_KEY` ortam değişkenini proje ayarlarından ekleyin; `api/simplify.js` sunucusuz fonksiyon olarak çalışır.

## Çalıştırma

Proje klasöründe:

```bash
npm install
npm run dev
```

Tarayıcıda gösterilen adresi açın (genelde `http://localhost:5173`).

## Derleme

```bash
npm run build
npm run preview
```

`npm run preview` yalnızca statik önizlemedir; `/api/simplify` bu modda yoktur. Tam deneme için `npm run dev` veya Vercel önizlemesi kullanın.

## MVP kapsamı

- Metin girişi ve canlı çıktı
- Görsel okuma modu (font, aralık, kontrast)
- Bionic reading (aç/kapat)
- Simplify (AI; anahtar güvenli şekilde, başarısızlıkta uygulama çalışmaya devam eder)

Kapsam dışı: PDF yükleme, giriş, veritabanı, metin seslendirme, özetleme.
