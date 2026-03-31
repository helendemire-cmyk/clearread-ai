# ClearRead AI - MVP Geliştirme Görev Listesi (FINAL)

Bu plan, `prd.md` kapsamına göre 2-3 günde tamamlanabilecek sade ve güvenli bir yol haritasıdır. Amaç: çalışan, stabil ve jüriye net değer gösteren bir MVP üretmek.

---

## Kurulum

* **Proje dosyalarını hazırla**
  `index.html`, `styles.css`, `app.js` dosyalarını oluştur. Uygulama tarayıcıda hatasız açılmalı.

* **Repo dokümanlarını oluştur**
  Şu dosyalar repoda olmalı:
  `idea.md`, `prd.md`, `tasks.md`, `user-flow.md`, `tech-stack.md`
  Eksik varsa boş şablon olarak ekle.

* **README.md oluştur**
  Projenin amacı, nasıl çalıştırılacağı ve MVP kapsamı kısa ve sade şekilde yazılsın.

---

## UI (Çalışan En Basit Sürüm)

* **Sayfa layout oluştur**
  Sol panel (girdi), sağ panel (çıktı) olacak şekilde yerleşimi kur.

* **Metin giriş alanı ekle**
  Sol panelde büyük bir textarea oluştur. Kullanıcı metin yapıştırabilmeli.

* **Çıktı paneli oluştur**
  Sağ panelde metnin gösterileceği alanı ekle.

* **Canlı çıktı bağlantısını kur**
  Sol paneldeki metin değiştiğinde sağ panelde anında görünmeli.
  👉 Bu, MVP’nin ilk çalışan hali.

* **Temel butonları ekle**

  * Bionic Reading toggle
  * Simplify butonu
    (Şimdilik sadece görünmeleri yeterli)

---

## Visual Reading

* **Dyslexia font uygula**
  Çıktı paneline OpenDyslexic veya benzeri font uygula.

* **Satır aralığını artır**
  Metni daha rahat okunacak şekilde genişlet.

* **Arka planı yumuşat**
  Açık bej/krem ton kullan.

* **Kontrastı ayarla**
  Metin net okunmalı (koyu gri / siyah).

---

## Bionic Reading

* **Bionic algoritmasını yaz**
  Kelimelerin ilk %40-50 kısmını bold yap.

* **Test et**
  Kısa ve uzun metinlerde düzgün çalışıyor mu kontrol et.

* **Toggle bağla**
  Aç/kapat ile görünüm değişmeli.

* **Edge case düzeltmeleri yap**
  Sayılar, kısa kelimeler, noktalama düzgün çalışmalı.

---

## AI Simplify

* **AI davranışını tanımla**
  Amaç:

  * uzun cümleleri böl
  * zor kelimeleri basitleştir
  * anlamı koru
    ❌ özetleme yapma

* **API key güvenliğini kur**
  `.env` veya backend kullan
  ❌ frontend içine key yazma

* **Simplify butonunu bağla**
  Butona basınca AI çağrısı yapılsın ve sonuç gösterilsin.

* **Loading durumu ekle**
  "İşleniyor..." mesajı göster.

* **Hata durumu ekle**
  Basit kullanıcı mesajı göster.

* **Bionic ile uyumlu çalıştır**
  Simplify sonrası bionic açıksa tekrar uygula.

* **Fallback ekle (KRİTİK)**
  AI çalışmazsa uygulama çökmesin
  👉 sadece visual + bionic çalışmaya devam etsin

---

## Test

* **Ana akışı test et**
  Yapıştır → canlı çıktı → visual → bionic → simplify

* **3 farklı metinle test et**
  kısa / orta / uzun

* **Performans gözlemle**
  hedef: ~2-3 saniye (zorunlu değil, referans)

* **Scope dışı kontrol yap**
  ❌ PDF
  ❌ login
  ❌ database
  ❌ text-to-speech

---

## Deploy

* **Çalışan sürümü yedekle (KRİTİK)**
  Deploy öncesi çalışan versiyonu commit et.

* **GitHub repo oluştur**
  Projeyi repoya bağla.

* **Push et**
  Tüm dosyalar GitHub’da görünmeli.

* **Deploy platformu seç**
  Netlify veya Vercel kullan.

* **Ortam değişkenlerini ekle**
  API key’i platform ayarlarından gir.

* **Canlı linki test et**
  Tüm akış çalışıyor mu kontrol et.

---

## MVP Tamamlanma Kontrol Listesi

* [ ] Metin giriş ve canlı çıktı çalışıyor
* [ ] Visual reading uygulanmış
* [ ] Bionic reading düzgün çalışıyor
* [ ] AI simplify çalışıyor
* [ ] AI olmasa da uygulama çalışıyor (fallback)
* [ ] API key güvenli
* [ ] README ve dokümanlar tamam
* [ ] GitHub repo düzgün
* [ ] Deploy edilmiş canlı link var
* [ ] Scope dışı özellik yok

---

## Stratejik Not

Bu proje:

* sadece AI değil
* bir "okuma deneyimi" ürünüdür

Kazandıran şey:
👉 Görsel dönüşüm + deneyim + sadelik
