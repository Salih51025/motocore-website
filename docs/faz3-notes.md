# FAZ 3, FAZ 4 & FAZ 5 Notları

## Eksik medya varlıkları
- **Hero motosiklet görseli:** `public/images/hero/` altında henüz gerçek bir motosiklet görseli bulunmuyor. Hero şu anda sinematik vitrin/placeholder (`HeroVisual`) ile render ediliyor.
- **3D Garage Experience vitrin medyası:** `Experience3DSection` içinde gerçek motosiklet görseli veya 3D model yok. Bölüm, medya geldiğinde kolayca güncellenebilecek performans odaklı sinematik placeholder/vitrin yapısıyla hazırlandı.
- **Promo video:** `public/videos/promo/` altında tanıtım videosu ve poster dosyası bulunmuyor. `PromoVideoSection` gerçek medya olmadan sahte oynatma yapmaz; devre dışı (placeholder) durumda kalır.
  - Beklenen entegrasyon: video dosyası eklendikten sonra `src/content/media.ts` içindeki `promoVideoMedia.src` (ve isteğe bağlı `poster`, `captionsSrc`, `captionsLang`) alanları güncellenir; bileşen HTML `<video controls preload="metadata">` ile render edilir (autoplay yok).
- **App showcase ekran görüntüleri:** `public/images/gallery/` altında gerçek uygulama ekran görüntüsü bulunmuyor. `ScreenshotsGallery` sahte arayüz üretmez; 5 kategori için medya-hazır placeholder kartları gösterir.
  - Beklenen entegrasyon: görseller eklendikten sonra `src/content/media.ts` içindeki `galleryMediaByLocale` (TR/EN) kayıtlarına ilgili `src` yolları girilir; bileşen `next/image` ile ve i18n tabanlı alt metinlerle render eder.
- **Beklenen kullanım:** Hero görseli eklendiğinde `HeroVisual` `imageSrc` prop’u ile güncellenebilir. Diğer medya alanları merkezi konfigürasyon üzerinden yönetilir.
- **Kısıtlar:** Sahte MotoCore uygulama ekranı/ekran görüntüsü, sahte 3D model iddiası, sahte video oynatımı veya izinsiz harici görsel eklenmedi. Gerçek 3D etkileşim için ağır bağımlılıklar (Three.js/R3F vb.) bu fazlarda eklenmedi.

## Medya klasörleri (FAZ 5)
- `public/videos/promo/` (`.gitkeep` mevcut)
- `public/images/gallery/` (`.gitkeep` mevcut)

## Sitemap ve domain durumu
- `SITE_URL` merkezi yapılandırması `src/lib/constants.ts` içinde tutuluyor.
- Gerçek domain henüz tanımlı olmadığı için sahte domain üretilmiyor; bu nedenle `src/app/(root)/sitemap.ts` boş sitemap (`[]`) döndürüyor ve `src/app/(root)/robots.ts` sitemap referansı eklemiyor.
- `SITE_URL` tanımlandığında sitemap, `src/content/site.ts` içindeki `localizedRoutes` ve desteklenen diller (`tr`, `en`) üzerinden tüm sayfaları ve `alternates.languages` (hreflang) bilgilerini otomatik üretir.
- Kök yönlendirme `/ -> /tr` rota olarak korunur; sitemap lokalize sayfa URL’lerini listeler.