# Media Management (FAZ 8.1–8.5)

Bu doküman, MotoCore web sitesindeki görsel ve video içeriklerinin **merkezi medya altyapısını** açıklar. Amaç: tasarım kodlarına minimum/dokunmadan medya dosyalarını değiştirebilmek, TR/EN alt metinlerini ve sıralamayı tek yerden yönetmek.

## 1. Genel mimari (tek medya sistemi)

- **Merkezi konfigürasyon:** `src/content/media.ts`
  - Tüm medya yolları (`src`, `poster`, altyazı yolları), TR/EN alt metinleri/etiketleri, önerilen oran/çözünürlük/format ve kullanım bilgisi burada tanımlıdır.
  - Bileşenler dosya yollarını kendi içinde sabit yazmaz; `siteMedia` (ve uyumluluk için korunan export’lar) üzerinden okur.
- **Statik dosyalar:** `public/` altında tutulur ve sitede `/images/...`, `/videos/...` yollarıyla servis edilir.
- **Placeholder davranışı:**
  - Görsel alanlarında `src` `undefined` veya boş bırakılırsa mevcut **placeholder** UI gösterilir (bozuk görsel/link üretilmez).
  - Video için `src` yoksa **video oynatıcı render edilmez**; mevcut placeholder/“medya bekleniyor” durumu korunur. `poster` opsiyoneldir.
- **Sıralama:** Dizilerdeki öğe sırası ekrandaki sırayı belirler (motosiklet detay galerisi, uygulama ekran görüntüleri vb.).

> Aynı işlev için ikinci bir medya sistemi eklenmedi; mevcut yapı `src/content/media.ts` üzerinde genişletildi (FAZ 8.4: `#gallery` motosiklet detay galerisine bağlandı; FAZ 8.5: gerçek uygulama ekran görüntüleri vitrini `#app-screenshots` ana sayfaya bağlandı, `siteMedia.appScreenshots` korunarak kullanıldı).

## 2. Klasör yapısı

Önerilen ve mevcut yapı (ilgili klasörler):

```text
public/
  images/
    hero/          # Hero desktop/mobile görselleri
    experience/    # 3D Experience vitrin görseli
    gallery/       # Motosiklet detay galerisi (motor detayı, özelleştirme vitrini vb.)
    app/           # Uygulama ekran görüntüleri (yeni/önerilen)
    screenshots/   # Mevcut klasör (korundu)
    brand/         # Mevcut klasör (korundu)
  videos/
    promo/         # Tanıtım videosu, poster, altyazı
```

Mevcut dosyalar silinmedi/taşınmadı; `experience/` ve `app/` klasörleri altyapı için eklendi.

## 3. Görsel/video ekleme ve değiştirme

### 3.1 Dosya adı sabit kalsın (en kolay yöntem)
`src/content/media.ts` içindeki `mediaPaths` ve alan yorumlarında önerilen/sabit dosya adları verilmiştir. **Aynı dosya adını ve yolu koruyarak** `public/` altındaki dosyayı yenisiyle değiştirirseniz, ilgili `src` zaten o yolu gösteriyorsa **sayfa koduna dokunmadan** yeni medya kullanılabilir.

> Not: Şu an çoğu `src` alanı güvenli başlangıç için `undefined` (placeholder açık). Dosyayı ekledikten sonra ilgili alanı `mediaPaths...` veya doğrudan string yola çevirmeniz gerekir (bkz. aşağıda). Dosya adını config’deki yol ile aynı tutarsanız ileride tekrar değiştirmelerde yalnızca dosyayı değiştirmeniz yeterli olur.

### 3.2 Yol/dosya adı değişecekse
1. Dosyayı uygun `public/...` klasörüne koyun.
2. `src/content/media.ts` içinde ilgili öğenin `src` (ve gerekirse `poster`, `captionsSrc`) alanını yeni yola güncelleyin. Örn: `src: "/images/hero/yeni-hero.webp"`.

### 3.3 Hangi dosyaları değiştirmek yeterli?
- **Sadece medya dosyasını değiştirmek:** `src` alanı zaten hedef dosya yolunu gösteriyorsa yeterli.
- **Yeni medya eklemek / yolu değiştirmek / sıralamak / TR-EN metin güncellemek:** `src/content/media.ts` (ve varsa statik dosya).
- **Bileşen tasarımı/düzeni:** Bu faz kapsamında değiştirilmez; normal geliştirme işidir.

## 4. Bölüm bazlı yönetim

### 4.1 Hero (desktop / mobile)
- **Config:** `siteMedia.hero.desktop` ve `siteMedia.hero.mobile` (`src/content/media.ts`)
- **Önerilen sabit yollar:** `/images/hero/hero-desktop.webp`, `/images/hero/hero-mobile.webp`
- **Davranış:** Desktop ve mobile için ayrı görsel tanımlanabilir. Her ikisi de varsa responsive görünüm (mobilde mobile, `sm+` genişlikte desktop) kullanılır; yalnızca biri tanımlıysa o gösterilir; ikisi de yoksa placeholder korunur.
- **Alt metin:** `alt.tr` / `alt.en`

### 4.2 3D Experience vitrin görseli
- **Config:** `siteMedia.experience.showcase`
- **Önerilen yol:** `/images/experience/experience-showcase.webp`
- **Davranış:** `src` tanımlıysa vitrin alanında görsel gösterilir; yoksa mevcut placeholder/not metni korunur.
- **Bileşen:** `src/components/sections/home/Experience3DSection.tsx` (config’i okur)

### 4.3 Motosiklet detay galerisi (FAZ 8.4, ana sayfa `#gallery`)
- **Config:** `siteMedia.motorcycleDetailGallery` (sıralı dizi)
- **Bileşen / anchor:** `src/components/sections/home/ScreenshotsGallery.tsx` (ana sayfa akışında render edilir, `id="gallery"` korunur)
- **UI metinleri:** `src/content/i18n/tr.ts` ve `en.ts` → `home.gallery` (başlık/açıklama, `placeholderLabel/placeholderDetail`, `imageAltPrefix`, `categories`)
- **Eşleştirme:** Kart etiketi/açıklaması öncelikle `home.gallery.categories` ile `id` üzerinden eşleşir; eşleşme yoksa config’deki `label`/`caption` kullanılır. Görsel alt metni config’teki `alt.tr/en` üzerinden alınır; yoksa `imageAltPrefix` + etiket kullanılır.
- **Öğeler ve önerilen yollar (`mediaPaths`):**
  - `motorcycle-overview` → `/images/gallery/motorcycle-detail.webp` (`detailMotorcycleOverview`)
  - `engine-detail` → `/images/gallery/engine-detail.webp` (`detailEngine`)
  - `customization-showcase` → `/images/gallery/customization-showcase.webp` (`detailCustomization`)
  - `mechanical-details` → `/images/gallery/mechanical-details.webp` (`detailMechanical`)
- **Davranış:** `src` `undefined`/boş ise kırık görsel oluşmadan premium placeholder gösterilir. Görsel eklendiğinde aynı düzen içinde gösterilir (Next/Image, uygun `sizes`, doğal oran/alan korunumu).
- **Sıralama:** `siteMedia.motorcycleDetailGallery` dizisindeki sırayı değiştirin. Yeni öğe ekleyecekseniz benzersiz `id`, `src`, TR/EN `alt/label/caption`, önerilen ölçüler ve `home.gallery.categories` kaydı ekleyin.

### 4.4 Uygulama ekran görüntüleri (FAZ 8.5, ana sayfa `#app-screenshots`)
- **Config:** `siteMedia.appScreenshots` (sıralı dizi) — merkezi config korunur; gerçek ekran görüntüleri geldiğinde aynı yapı üzerinden güncellenir.
- **Bileşen / anchor:** `src/components/sections/home/AppScreenshotsGallery.tsx` (`id="app-screenshots"`)
- **Ana sayfa konumu:** `src/components/sections/home/index.tsx` içinde **Promo Video** bölümünden sonra, **Permissions Preview / Final CTA** öncesinde render edilir. Motosiklet detay galerisi `#gallery` ayrı kalır.
- **UI metinleri:** `src/content/i18n/tr.ts` ve `en.ts` → `home.appScreenshots` (başlık/açıklama, `statusLabel/statusDetail`, `imageAltPrefix`, `categories`)
- **Önerilen yollar (`mediaPaths`):** `/images/app/screenshot-garage.webp`, `/images/app/screenshot-customization.webp`, `/images/app/screenshot-maintenance.webp`, `/images/app/screenshot-motorcycle-details.webp`, `/images/app/screenshot-community.webp`
- **Öğeler (korunan kategoriler):** `digital-garage`, `customization-3d`, `motorcycle-details`, `maintenance-tracking`, `community-shared-builds` (her biri 9:16 önerilir). Bunlar vitrin/planlama alanlarıdır; henüz doğrulanmamış özellikler “hazır” gibi sunulmaz.
- **Eşleştirme:** Kart etiketi/açıklaması öncelikle `home.appScreenshots.categories` ile `id` üzerinden eşleşir; eşleşme yoksa config’deki `label`/`caption` kullanılır. Görsel alt metni `imageAltPrefix` + etiket ile oluşturulur. `src` yoksa sahte UI/mockup/temsili ekran üretilmeden placeholder gösterilir.
- **Sıralama/ekleme:** `siteMedia.appScreenshots` dizisindeki sırayı değiştirin; yeni öğe ekleyecekseniz benzersiz `id`, `src`, TR/EN `label/caption`, önerilen ölçüler, `usedIn` ve `home.appScreenshots.categories` kaydı ekleyin.

### 4.5 Promo video ve poster
- **Config:** `siteMedia.promoVideo`
- **Önerilen yollar:** video `/videos/promo/motocore-promo.mp4`, poster `/videos/promo/motocore-promo-poster.webp`, altyazılar `/videos/promo/motocore-promo.tr.vtt`, `/videos/promo/motocore-promo.en.vtt`
- **Davranış:** `video.src` yoksa oynatıcı gösterilmez, placeholder korunur. Poster opsiyoneldir.
- **Altyazı:** `captionsSrc` ve `captionsLang` ayarlanabilir.
- **TR/EN metin:** `label.tr/en`, `posterAlt.tr/en` (erişim/etiket amaçlı); bölüm başlık ve durum metinleri i18n’de kalır.

## 5. TR/EN alt metinlerini düzenleme
- **Medya alt/erişim metinleri (görsel/video config):** `src/content/media.ts` içinde ilgili öğenin `alt`, `label`, `caption`, `posterAlt` alanlarının `tr` ve `en` değerlerini güncelleyin.
- **Motosiklet detay galerisi metinleri (başlık, açıklama, placeholder, kategori label/caption):** `src/content/i18n/tr.ts` ve `src/content/i18n/en.ts` → `home.gallery`.
- **Uygulama ekran görüntüleri metinleri (korunan):** `src/content/i18n/tr.ts` ve `en.ts` → `home.appScreenshots`.
- **Video bölüm metinleri:** `src/content/i18n/tr.ts` ve `en.ts` → `home.video`.

## 6. Önerilen görsel boyutları ve formatları

| Medya | Önerilen oran | Önerilen çözünürlük | Format | Kullanım |
|---|---|---|---|---|
| Hero desktop | 4:5 veya 5:4 (responsive crop) | 1600×2000 veya 2000×1600 px (@2x) | WebP (tercih), PNG/JPG | `siteMedia.hero.desktop` |
| Hero mobile | 4:5 | 1080×1350 px (@2x) | WebP (tercih), PNG/JPG | `siteMedia.hero.mobile` |
| 3D Experience vitrin | 16:10 veya 3:2 | 1920×1200 veya 1800×1200 px | WebP (tercih), PNG/JPG | `siteMedia.experience.showcase` |
| Motosiklet genel görünüm | 16:10 veya 3:2 | 1920×1200 veya 1800×1200 px | WebP (tercih), JPG | `motorcycleDetailGallery[motorcycle-overview]` |
| Motor detayı | 4:5 veya 1:1 | 1600×2000 veya 1600×1600 px | WebP (tercih), JPG | `motorcycleDetailGallery[engine-detail]` |
| Kişiselleştirme vitrini | 4:5 veya 3:4 | 1600×2000 veya 1500×2000 px | WebP (tercih), JPG | `motorcycleDetailGallery[customization-showcase]` |
| Mekanik detaylar | 3:2 veya 4:3 | 1800×1200 veya 1600×1200 px | WebP (tercih), JPG | `motorcycleDetailGallery[mechanical-details]` |
| App screenshot (Garaj) | 9:16 | 1080×1920 px | WebP (tercih), PNG | `appScreenshots[digital-garage]` |
| App screenshot (Özelleştirme) | 9:16 | 1080×1920 px | WebP (tercih), PNG | `appScreenshots[customization-3d]` |
| App screenshot (Bakım) | 9:16 | 1080×1920 px | WebP (tercih), PNG | `appScreenshots[maintenance-tracking]` |
| App screenshot (Motosiklet detayları) | 9:16 | 1080×1920 px | WebP (tercih), PNG | `appScreenshots[motorcycle-details]` |
| App screenshot (Topluluk) | 9:16 | 1080×1920 px | WebP (tercih), PNG | `appScreenshots[community-shared-builds]` |
| Promo video | 16:9 | 1920×1080 (Full HD) / 3840×2160 (4K, dikkat) | MP4 (H.264/AAC) | `siteMedia.promoVideo.src` |
| Promo video poster | 16:9 | 1920×1080 px | WebP veya JPG | `siteMedia.promoVideo.poster` |

> Aynı bilgiler `src/content/media.ts` içinde her öğenin `recommendedRatio/Resolution/Format/usedIn` alanlarında da bulunur.

## 7. Placeholder davranışı (özet)
- **Hero:** `src` yoksa mevcut HUD/placeholder sahne gösterilir.
- **3D Experience:** `showcase.src` yoksa mevcut placeholder ve not korunur.
- **Motosiklet detay galerisi (`#gallery`):** `src` yoksa kırık görsel oluşmadan premium placeholder kartı gösterilir; sahte fotoğraf eklenmez.
- **Uygulama ekran görüntüleri (`#app-screenshots`):** `src` yoksa gerçek ekran görüntüsü henüz eklenmediğini belirten placeholder kartı gösterilir; sahte uygulama arayüzü, mockup veya temsili ekran üretilmez.
- **Video:** `src` yoksa `<video>` render edilmez; placeholder, devre dışı oynatma butonu ve durum metinleri gösterilir.

## 8. Hızlı referans

- **Tek merkez:** `src/content/media.ts`
- **Statik dosyalar:** `public/images/hero`, `public/images/experience`, `public/images/gallery`, `public/images/app`, `public/videos/promo`
- **Bölüm metinleri (UI):** `src/content/i18n/tr.ts`, `src/content/i18n/en.ts`
- **İlgili bileşenler:** `HeroVisual.tsx`, `HeroSection.tsx`, `Experience3DSection.tsx`, `ScreenshotsGallery.tsx` (`#gallery`, motosiklet detay), `PromoVideoSection.tsx`, `AppScreenshotsGallery.tsx` (`#app-screenshots`, gerçek app screenshot vitrini)
- **Geriye dönük uyumluluk:** `promoVideoMedia`, `galleryMediaByLocale` export’ları korunmuştur.

## 9. Gerçek uygulama ekran görüntülerini ekleme (FAZ 8.5)
1. Gerçek ekran görüntülerini (mümkünse 9:16, örn. 1080×1920, WebP/PNG) `public/images/app/` altına önerilen sabit adlarla koyun: `screenshot-garage.webp`, `screenshot-customization.webp`, `screenshot-maintenance.webp`, `screenshot-motorcycle-details.webp`, `screenshot-community.webp`.
2. `src/content/media.ts` → `siteMedia.appScreenshots` içinde ilgili öğelerin `src` alanını `mediaPaths...` değerleriyle (veya aynı string yollarla) doldurun. Dosya adını sabit tutarsanız sonraki değişikliklerde yalnızca dosyayı güncellemek yeterli olabilir.
3. Gerekirse aynı öğelerde TR/EN `label`/`caption` ve `src/content/i18n/*` → `home.appScreenshots.categories` metinlerini, mevcut ürün kapsamına uygun biçimde güncelleyin (doğrulanmamış özellikleri “hazır” gibi göstermeyin).
4. Bileşen yerleşimi/düzeni için ekstra kod değişikliği gerekmez; sahte UI/mockup eklenmez, görseller doğrudan 9:16 alan içinde sunulur. Değişiklik sonrası `npm run build` ile doğrulayın.
