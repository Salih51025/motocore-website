# Privacy / Permissions Audit (FAZ 6)

- **Tarih:** 2026-11-17
- **Kapsam:** MotoCore mobil uygulaması (`C:\Users\Healer\Documents\workspace\motogaraj`) salt-okunur inceleme; website yasal sayfaları bu bulgulara göre hazırlanacaktır.
- **Yöntem:** Manifest/config/kaynak/README incelemesi ve `apps/mobile/` içinde izin, ağ, depolama, kimlik doğrulama, kamera/galeri/konum/bildirim ve servis anahtar kelimeleri araması. **Mobil uygulamada hiçbir dosya değiştirilmedi.**
- **Not:** Bu rapor kod/manifest kanıtına dayanır. Yalnızca bir paketin veya modülün varlığı, verinin aktif toplandığı anlamına gelmez. Kanıtlanamayan noktalar “Belirsiz / Doğrulanamadı” olarak işaretlenmiştir; tahmin yapılmamıştır.

## Özet (kanıtlanan)

- Ana Android manifestinde kamera, galeri/medya, konum, bildirim, mikrofon, kişiler, Bluetooth veya depolama izni için açık `<uses-permission>` kaydı **bulunmadı**; uygulama Dart kaynaklarında runtime izin isteği kodu **bulunmadı**.
- `INTERNET` izni ana (release) manifestte yok; **debug/profile** manifestlerinde ve gömülü **Unity library** manifestinde mevcut. Unity çalışma zamanının ağ davranışı bu incelemeden kesinleştirilemedi.
- `apps/mobile/pubspec.yaml` bağımlılıkları minimal (`flutter`, `flutter_embed_unity`, `cupertino_icons`; dev: test/lint). Kamera/galeri/dosya, konum, bildirim, yerel/secure depolama, HTTP/ağ istemcisi, Supabase, Firebase veya auth SDK paketleri **bulunmadı**.
- Uygulama davranışı kaynakta yerel 3D garaj UI’sı, demo/placeholder veriler ve Flutter↔Unity JSON köprü mesajlaşması ile sınırlı görünüyor. Kullanıcı verisi toplama formu, kalıcı depolama, API çağrısı, analitik veya üçüncü taraf veri aktarımı için Dart kodunda kanıt **bulunmadı**.
- Kimlik doğrulama/hesap akışı ve hesap/veri silme akışı **uygulanmamış** görünüyor.
- iOS `Info.plist` içinde kamera/fotoğraf/konum/mikrofon vb. kullanım açıklama anahtarları **bulunmadı**.

## A. Android izinleri

| İzin | Kaynak | Kullanım amacı | Doğrulama durumu |
|---|---|---|---|
| (Açık uygulama izni yok) | `apps/mobile/android/app/src/main/AndroidManifest.xml` | Kamera/galeri/konum/bildirim/mikrofon/kişiler/Bluetooth/depolama için manifestte `<uses-permission>` yok. `PROCESS_TEXT` için yalnızca `<queries>` var. | **Doğrulandı (kanıt yok / bildirilmemiş)** |
| `android.permission.INTERNET` | `apps/mobile/android/app/src/debug/AndroidManifest.xml` | Flutter tooling / hot reload / debug bağlantısı (manifest yorumuna göre). | **Doğrulandı (debug-only)** |
| `android.permission.INTERNET` | `apps/mobile/android/app/src/profile/AndroidManifest.xml` | Flutter tooling / geliştirme profili (manifest yorumuna göre). | **Doğrulandı (profile-only)** |
| `android.permission.INTERNET` | `apps/mobile/android/unityLibrary/src/main/AndroidManifest.xml` | Gömülü Unity modülünde bildirilmiş; Unity runtime ağ kullanımı uygulama Dart kodundan doğrulanamadı. | **Doğrulandı (bildirim var), kullanım amacı belirsiz** |
| OpenGL ES / Vulkan / touchscreen `<uses-feature>` | `apps/mobile/android/unityLibrary/src/main/AndroidManifest.xml` | 3D/rendering ve dokunmatik özellik bildirimleri; kişisel veri izni değildir. | **Doğrulandı** |
| Runtime izin isteği (kamera/galeri/konum/bildirim vb.) | `apps/mobile/lib/**` (arama/inceleme) | Uygulama kodunda runtime permission request/handling bulunmadı. | **Doğrulandı (uygulama kodunda kanıt yok)** |
| iOS gizlilik kullanım açıklamaları (kamera/foto/konum/mikrofon vb.) | `apps/mobile/ios/Runner/Info.plist` | İlgili `NS*UsageDescription` anahtarları bulunamadı. | **Doğrulandı (kanıt yok)** |

## B. Veri kategorileri

| Veri kategorisi | Toplanma durumu | Kullanım amacı | Saklama yeri |
|---|---|---|---|
| Kişisel/hesap verileri (ad, e-posta, telefon, kimlik bilgileri, tanımlayıcılar) | Kanıt yok | Uygulama içinde toplanmıyor görünüyor (auth/profil veri girişi akışı bulunamadı). | Kanıt yok (toplanmıyor) |
| Kullanıcı tarafından üretilen içerik (fotoğraf, dosya, mesaj, bakım kaydı vb.) | Kanıt yok | Uygulama içinde oluşturma/yükleme akışı bulunamadı. | Kanıt yok (toplanmıyor) |
| Demo/statik garaj bilgileri (model adı/yıl, placeholder metrikler) | Uygulama kodunda sabit demo veri | Yerel UI gösterimi | Çalışma zamanında bellek (in-memory) / kod içi sabitler; kalıcı depolama kanıtı yok |
| Unity sahne/parça durumu (model/parça kimlikleri, seçim/kaldırma durumu, Unity’den gelen mesajlar/hatalar) | Gömülü Unity köprüsünden çalışma zamanında alınır | 3D garaj etkileşimi ve UI durum yönetimi | Flutter tarafında bellek (in-memory) state; kalıcı depolama kanıtı yok |
| Kalıcı yerel depolama (prefs, cache, secure storage, DB) | Uygulanmamış görünüyor | — | Kanıt yok (`core/storage` placeholder; depolama paketi yok) |
| Sunucuya gönderilen uygulama verisi / API yükleri | Kanıt yok | — | Kanıt yok (HTTP/ağ istemcisi veya backend SDK entegrasyonu bulunamadı) |

## C. Üçüncü taraf servisler

| Servis | Projede kullanım kanıtı | Veri aktarımı | Durum |
|---|---|---|---|
| Supabase | `pubspec.yaml` ve uygulama kodunda `supabase*` bağımlılığı/kullanımı bulunamadı. | Kanıt yok | **Kullanım kanıtı yok** |
| Firebase (Auth, Firestore, Messaging, Analytics, Crashlytics vb.) | `pubspec.yaml`, Gradle/app yapılandırması ve uygulama kodunda Firebase bağımlılığı/başlatma kanıtı bulunamadı. | Kanıt yok | **Kullanım kanıtı yok** |
| Diğer analitik/reklam/telemetri SDK’ları (uygulama bağımlılıkları) | Denetlenen mobil bağımlılıklarda bulunamadı. | Kanıt yok | **Kullanım kanıtı yok (uygulama katmanı)** |
| `flutter_embed_unity` (gömülü Unity entegrasyonu) | Bağımlılık ve Flutter↔Unity köprü kodu mevcut (`pubspec.yaml`, `lib/integrations/unity/*`, Android `:unityLibrary` bağımlılığı). | Bulut servisi değil; yerel gömülü 3D entegrasyonu. Unity runtime’ın ağ davranışı/olası aktarımı doğrulanamadı. | **Kullanım kanıtı var (yerel entegrasyon), veri aktarımı belirsiz** |
| Gömülü Unity runtime/export (`unityLibrary`) | `unityLibrary` manifestinde `INTERNET` izni ve grafik özellikleri mevcut. | İncelenen Flutter kaynaklarından dış ağ iletişimi kanıtlanamadı; binary/runtime davranışı belirsiz. | **Belirsiz / ek doğrulama gerekli** |

## D. Belirsiz kalan bilgiler

| Konu | Neden belirsiz | Etki / not |
|---|---|---|
| Şirketin yasal unvanı | Kod/manifestte yer almıyor; ürün sahibi bilgisi sağlanmadı. | Privacy/Terms’te uydurulamaz; iletişim/veri sorumlusu alanları doğrulama bekler. |
| Veri sorumlusu iletişim bilgileri (adres, e-posta, telefon) | Kaynaklarda bulunamadı. | Yasal sayfalarda “doğrulanacak” olarak işaretlenmeli. |
| Sunucu lokasyonu | Uygulama tarafında sunucu/API entegrasyonu kanıtı yok; backend altyapısı bu denetimin dışında. | Veri aktarımı/lokasyon iddiası yapılamaz. |
| Veri saklama süreleri | Kalıcı veri toplama/saklama mekanizması kanıtlanmadı; resmi saklama politikası yok. | Süre belirtilmemeli. |
| Üçüncü tarafların güncel veri işleme koşulları | Uygulama katmanında üçüncü taraf veri işleyen servis kanıtı yok; Unity runtime davranışı belirsiz. | Unity/export sağlayıcıları ve nihai build için ayrıca doğrulanmalı. |
| Hesap ve veri silme süreci | Auth/hesap ve silme akışı uygulanmamış. | Mevcut özellikmiş gibi sunulamaz. |
| Gerçek uygulama izinlerinin son mağaza sürümüyle eşleşmesi | Bu denetim repo kaynak/manifest durumunu yansıtır; Play Store/App Store’daki nihai paket/manifest farklı olabilir. | Yayın öncesi mağaza sürümü ve merged manifest doğrulanmalı. |
| Birleştirilmiş (merged) nihai manifest | Sadece kaynak manifestler incelendi; build sırasında kütüphane birleşimi sonucu değişebilir. | Release build çıktısı ayrıca kontrol edilmeli. |

## İnceleme kapsamı notları

- **İncelenen ana dosyalar:** `apps/mobile/android/app/src/main/AndroidManifest.xml`, `debug/AndroidManifest.xml`, `profile/AndroidManifest.xml`, `apps/mobile/android/unityLibrary/src/main/AndroidManifest.xml`, `apps/mobile/pubspec.yaml`, `apps/mobile/lib/**` (özellikle `main.dart`, `app/*`, `features/garage/*`, `integrations/unity/*`, feature/core README’leri), `apps/mobile/ios/Runner/Info.plist`.
- **Kapsam dışı / sınırlı:** `apps/mobile/build`, `unityLibrary` içi üretilmiş (generated) çıktılar ve ikili/binary Unity davranışının çalışma zamanı analizi; repo kökündeki `backend/` servisinin mobil uygulama dışı davranışı.
