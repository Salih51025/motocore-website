# Launch Readiness (FAZ 8.9 güncel durum)

- **Tarih:** 2026-11-17 (FAZ 8.9 audit + dokümantasyon güncellemesi)
- **Branch:** `feat/website-foundation` (doğrulandı)
- **Kapsam:** SEO/metadata/erişilebilirlik/yasal-dokümantasyon denetimi, güvenli minimal düzeltmeler, teknik doğrulama ve yayın hazırlık takibi.
- **Not:** Gerçek domain, medya, mağaza/şirket/iletişim bilgileri ve hukuki nihai onay uydurulmadı. Tamamlanmamış maddeler tamamlanmış gibi işaretlenmedi. Commit/push/deploy yapılmadı. Mobil uygulama reposuna dokunulmadı.

## 1. Genel durum özeti

| Alan | Durum | Not |
|---|---|---|
| TR/EN route ve içerik yapısı | **PASS** | `/tr`, `/en`, her dil için `permissions`, `privacy-policy`, `terms-of-use` sayfaları ve TR/EN i18n akışı mevcut. |
| Navigasyon ve bölüm mimarisi (güncel) | **PASS** | Ana sayfa sırası: Hero → Intro → Features → Experience → Motorcycle Gallery (`#gallery`) → Promo Video (`#video`) → App Screenshots (`#app-screenshots`) → Permissions Preview → Final CTA. Navbar/Footer iki galeri ayrımını yansıtıyor. |
| Metadata (TR/EN) | **PASS** | Sayfa bazlı `title/description`, canonical + hreflang + `x-default`, Open Graph ve Twitter (`summary`) mevcut. `SITE_URL` boşken mutlak domain uydurulmadı. |
| Robots / Sitemap (SITE_URL’siz) | **PASS (koşullu)** | `/robots.txt` ve `/sitemap.xml` metadata route’ları mevcut; `SITE_URL` boşken robots sitemap satırı eklenmez, sitemap boş döner (beklenen güvenli davranış). Gerçek domain sonrası mutlak URL doğrulaması gerekli. |
| Erişilebilirlik (kod incelemesi) | **NEEDS REVIEW** | H1/başlık yapısı, focus-visible, reduced-motion ve temel ARIA etiketleri iyi; kontrast ve tam ekran okuyucu/klavye turu gerçek doğrulama gerektirir. |
| Gizlilik/yasal içerik | **NEEDS REVIEW** | `docs/privacy-audit.md` ile uyumlu taslak yaklaşım korunuyor; doğrulanmamış alanlar belirsiz bırakılıyor. Nihai hukuki belge/onay değildir. |
| Responsive/görsel kalite (gerçek tarayıcı) | **NOT TESTED** | Hedef viewport ve etkileşimler için gerçek tarayıcı QA yapılmadı. |
| Yayına hazır olma | **KOŞULLU / HAZIR DEĞİL** | Teknik temel iyi; gerçek medya, domain, mağaza/iletişim/hukuki doğrulama ve gerçek QA bekliyor. |

## 2. FAZ 8.9 bulguları ve uygulanan güvenli düzeltmeler

| Bulgu | Durum | Uygulanan düzeltme |
|---|---|---|
| Sayfa metadata’sında Twitter kartı tanımı eksikti | **PASS** | `src/lib/seo.ts` içine `twitter: { card: "summary", title, description }` eklendi (mevcut sayfa başlık/açıklaması kullanıldı; domain/görsel uydurulmadı). |
| Launch readiness dokümanı güncel faz durumunu ve checklist’i tam yansıtmıyordu | **PASS** | `docs/launch-readiness.md` güncellendi; güncel mimari, belirsizlikler ve yayın öncesi zorunlu maddeler netleştirildi. |
| `SITE_URL` boşken mutlak canonical/OG/sitemap üretimi | **NEEDS REVIEW (beklenen)** | Güvenli fallback korundu: domain uydurulmadı, `metadataBase` eklenmedi, sitemap boş/robots sitemap’siz davranış korundu. Gerçek domain ile doğrulanmalı. |
| Çoklu root layout yapısı (`(root)/(tr)/(en)` + `RootShell`) bakım riski taşıyor | **NEEDS REVIEW** | Bu fazda refactor yapılmadı. Somut runtime hatası doğrulanmadı; mimari sadeleştirme ayrı, kontrollü fazda değerlendirilmeli. |

## 3. SEO ve metadata davranışı

| Madde | Durum | Not |
|---|---|---|
| TR/EN `title` ve `description` | **PASS** | `createPageMetadata` + i18n `meta` üzerinden sayfa bazlı üretiliyor. |
| Canonical + hreflang + `x-default` | **PASS** | `src/lib/seo.ts` içinde TR/EN ve `x-default` (varsayılan TR) eşlemesi mevcut. |
| Open Graph | **PASS** | `title/description/siteName/locale/alternateLocale/type/url` ayarlanıyor. |
| Twitter metadata | **PASS** | `summary` kartı eklendi (görsel/handle uydurulmadı). |
| Robots meta | **PASS** | Layout seviyesinde index/follow açık. |
| `/robots.txt` | **PASS (SITE_URL’siz)** | `src/app/robots.ts`: `User-agent: *`, `Allow: /`; `SITE_URL` yoksa sitemap satırı eklenmez. |
| `/sitemap.xml` | **NEEDS REVIEW** | `src/app/(root)/sitemap.ts`: `SITE_URL` boşken boş dizi döner. Gerçek domain verildiğinde mutlak URL ve dil alternates üretimi doğrulanmalı. |

### Gerçek domain geldiğinde uygulanacaklar (uydurma yapılmadan)
1. `src/lib/constants.ts` içinde `SITE_URL` değerini gerçek domain ile ayarla.
2. Mutlak canonical/OG/Twitter/sitemap URL stratejisini (gerekirse `metadataBase`) gerçek domain üzerinden doğrula.
3. `/robots.txt` içinde sitemap referansının ve `/sitemap.xml` içeriğinin (TR/EN tüm sayfalar, alternates) production çıktısını kontrol et.
4. Sosyal paylaşım önizlemeleri ve arama motoru sinyallerini gerçek domain ile doğrula.

## 4. Root layout değerlendirmesi

| Konu | Değerlendirme | Durum |
|---|---|---|
| `src/app/(tr)/layout.tsx`, `src/app/(en)/layout.tsx`, `src/app/(root)/layout.tsx`, `RootShell` | Her route grubu `RootShell` ile `<html lang>` veriyor; TR/EN layout’larında temel metadata var. `(root)` layout `lang="tr"` ve sade metadata içeriyor. | **NEEDS REVIEW** |
| Global CSS yüklenmesi | Her layout `../globals.css` import ediyor (çoklu import paterni). | **NEEDS REVIEW** |
| Metadata inheritance | Locale sayfaları `createPageMetadata` ile sayfa bazlı metadata üretiyor; layout metadata’ları ile çakışma potansiyeli teorik bakım riski. | **NEEDS REVIEW** |
| Somut hata/refactor kararı | Bu fazda doğrulanmış kırıcı hata bulunmadı; büyük layout refactor kapsam dışı bırakıldı. | **PASS (değişiklik yok)** |

## 5. Accessibility bulguları (kod düzeyi)

| Madde | Durum | Not |
|---|---|---|
| H1 hiyerarşisi | **PASS** | Ana sayfalarda Hero `h1`; yasal sayfalarda içerik bileşenleri `h1`; 404 sayfası `h1` içeriyor. Bölüm başlıkları ağırlıklı `h2`. |
| Görsel alt metinleri / placeholder | **PASS/NEEDS REVIEW** | Merkezi medya config TR/EN `alt` desteği sunuyor; `src` yokken placeholder render ediliyor (bozuk img yok). Gerçek medya eklendiğinde alt metinlerin nihai doğrulaması gerekli. |
| Dekoratif öğeler | **PASS** | Birçok dekoratif katmanda `aria-hidden` / `pointer-events-none` kullanımı mevcut. |
| Link/buton isimleri ve menü | **PASS/NEEDS REVIEW** | Navbar mobil menü butonu `aria-label`, `aria-expanded`, `aria-controls` içeriyor; dil/link metinleri anlamlı. Gelişmiş odak yönetimi (ESC/odak tuzağı) kapsam dışı. |
| Focus-visible / klavye | **PASS/NEEDS REVIEW** | Global `:focus-visible` mevcut; tam klavye turu ve ekran okuyucu testi yapılmadı. |
| Reduced motion | **PASS** | `globals.css` içinde `prefers-reduced-motion` desteği mevcut. |
| Kontrast | **NOT TESTED** | Otomatik/manuel kontrast ölçümü yapılmadı. |
| Video altyazısı | **NEEDS REVIEW** | Video oynatıcı altyapısı `track` destekli; gerçek medya/altyazı dosyaları henüz eklenmedi. |
| Dil değiştirme | **PASS** | Navbar/Footer locale bağlantıları karşı sayfa `path` eşlemesiyle sunuluyor. |

## 6. Legal ve privacy belirsizlikleri (korunan)

Aşağıdakiler **doğrulanmamış/belirsiz** kabul edilir ve kesin iddia üretilmez:
- Unity runtime ağ/veri davranışı doğrulanmadı.
- Birleştirilmiş release manifest henüz doğrulanmadı.
- Backend ve veri işleme altyapısı kesinleşmedi.
- Veri saklama/silme süresi doğrulanmadı.
- Şirketin yasal bilgileri ve iletişim bilgileri verilmedi.
- KVKK/GDPR hukuki incelemesi yapılmadı.

**Durum:** `docs/privacy-audit.md` ile yasal sayfa yaklaşımı uyumlu, taslak ve “doğrulama bekliyor” çerçevesi korunuyor. Yasal sayfalar nihai hukuki belge olarak sunulmuyor.

## 7. Güncellenen dokümanlar
- `docs/launch-readiness.md` — güncel proje durumu, FAZ 8.9 bulguları, SEO/layout/a11y değerlendirmesi ve yayın checklist’i ile güncellendi.
- `docs/privacy-audit.md` — içerik korunmuştur (kaynak denetim bulguları); bu fazda yeniden yazılmadı.
- `docs/media-management.md` — mevcut FAZ 8.5 medya yönetimi dokümanı korunmuştur.

## 8. Yayın öncesi checklist (takip)

| Madde | Durum |
|---|---|
| Gerçek domain (`SITE_URL`) ve domain sonrası SEO doğrulaması | **BLOCKED** |
| Gerçek hero ve experience görselleri | **BLOCKED** |
| Gerçek motosiklet galerisi görselleri (`#gallery`) | **BLOCKED** |
| Gerçek uygulama ekran görüntüleri (`#app-screenshots`) | **BLOCKED** |
| Tanıtım videosu, poster ve altyazı dosyaları | **BLOCKED** |
| App Store / Google Play bağlantıları | **BLOCKED** |
| Şirket/yasal ve iletişim bilgileri (veri sorumlusu dahil) | **BLOCKED** |
| Privacy/Terms/Permissions nihai hukuki inceleme ve onay | **BLOCKED** |
| Birleştirilmiş Android release manifest doğrulaması | **BLOCKED** |
| Unity runtime veri/ağ davranışı doğrulaması | **BLOCKED** |
| Gerçek tarayıcı responsive QA (1440×900, 1024×768, 390×844, 360×800) | **NOT TESTED / BLOCKED** |
| Lighthouse/performance ölçümü | **NOT TESTED** |
| Favicon ve sosyal paylaşım görsellerinin gerçek varlıklarla doğrulanması | **NEEDS REVIEW** |
| Kontrast ve ekran okuyucu/klavye erişilebilirlik turu | **NOT TESTED** |

## 9. Teknik doğrulama
- `npx tsc --noEmit`, `npm run lint`, `npm run build` ve (mümkünse) HTTP kontrolleri bu fazın nihai raporunda gerçek sonuçlarıyla belirtilir.
- **Browser QA:** **NOT TESTED**.