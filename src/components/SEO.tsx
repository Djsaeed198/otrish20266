import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

// ==========================================
// TYPES
// ==========================================
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

interface AuthorInfo {
  name: string;
  url?: string;
  type?: 'Person' | 'Organization';
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string | string[];
  image?: string;
  images?: SEOImage[];
  schemaData?: object | object[];
  lang?: string;
  alternateLinks?: { hrefLang: string; href: string }[];
  // Advanced
  type?: 'website' | 'article' | 'guide' | 'product' | 'faq' | 'howto';
  publishedTime?: string;
  modifiedTime?: string;
  author?: AuthorInfo;
  breadcrumbs?: BreadcrumbItem[];
  canonicalOverride?: string;
  noindex?: boolean;
  nofollow?: boolean;
  readingTime?: number;
  wordCount?: number;
  category?: string;
  tags?: string[];
  aiSummary?: string;
  aiKeywords?: string[];
  contentLanguage?: string;
  audience?: string;
  siteName?: string;
  twitterHandle?: string;
}

// ==========================================
// CONSTANTS
// ==========================================
const SITE_NAME = 'اتریش‌نشین';
const SITE_NAME_EN = 'Otrish Neshin';
const SITE_URL = 'https://otrish-iran.ir';
const DEFAULT_LOGO = `${SITE_URL}/otrish_logo_1779961596526.png`;
const DEFAULT_IMAGE = `${SITE_URL}/og-default.jpg`;
const TWITTER_HANDLE = '@otrish__iran';

// ==========================================
// SANITIZE KEYWORDS
// ==========================================
const normalizeKeywords = (input?: string | string[]): string => {
  if (!input) return '';
  if (Array.isArray(input)) return input.join(', ');
  return input;
};

// ==========================================
// MAIN SEO COMPONENT
// ==========================================
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  images = [],
  schemaData,
  lang = 'fa',
  alternateLinks = [],
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  breadcrumbs = [],
  canonicalOverride,
  noindex = false,
  nofollow = false,
  readingTime,
  wordCount,
  category,
  tags = [],
  aiSummary,
  aiKeywords = [],
  contentLanguage = 'fa-IR',
  audience = 'Persian speakers in Austria',
  siteName = SITE_NAME,
  twitterHandle = TWITTER_HANDLE,
}) => {
  // ==========================================
  // DERIVED VALUES
  // ==========================================
  const siteTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} | راهنمای جامع اقامت، زندگی و کار در اتریش`;

  const siteDescription =
    description ||
    'مهاجرت و زندگی در اتریش؛ بررسی روش‌های اقامت، نیازمندی‌ها، دایرکتوری مشاغل و خدمات کاربردی برای ایرانیان مقیم اتریش.';

  const siteKeywords = useMemo(() => {
    const baseKeywords = [
      'اتریش',
      'مهاجرت اتریش',
      'اقامت اتریش',
      'ایرانیان اتریش',
      'کار در اتریش',
      'MA35',
      'Brutto Netto',
      'زندگی در وین',
      'Otrish Neshin',
      'Austria immigration',
      'Vienna guide',
    ];

    const provided = normalizeKeywords(keywords)
      ? normalizeKeywords(keywords)
          .split(',')
          .map((k) => k.trim())
      : [];

    const all = [...new Set([...provided, ...baseKeywords, ...aiKeywords])];
    return all.join(', ');
  }, [keywords, aiKeywords]);

  // Pathname & canonical
  const pathname =
    typeof window !== 'undefined'
      ? window.location.pathname === '/index.html'
        ? '/'
        : window.location.pathname
      : '/';
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const canonicalUrl = canonicalOverride || `${SITE_URL}${pathname}${search}`;

  // Dual-Market Hreflang URLs (Item 27 & 28: Iran fa-IR and Austria de-AT)
  const cleanPathWithoutDe = pathname.replace(/^\/de/, '') || '/';
  const faCanonical = `${SITE_URL}${cleanPathWithoutDe === '/' ? '' : cleanPathWithoutDe}`;
  const deCanonical = `${SITE_URL}/de${cleanPathWithoutDe === '/' ? '' : cleanPathWithoutDe}`;

  // OG Image (primary + additional)
  const primaryImage = image || images[0]?.url || DEFAULT_IMAGE;

  // Robots directive
  const robotsContent = useMemo(() => {
    const parts: string[] = [];
    parts.push(noindex ? 'noindex' : 'index');
    parts.push(nofollow ? 'nofollow' : 'follow');
    parts.push('max-snippet:-1');
    parts.push('max-image-preview:large');
    parts.push('max-video-preview:-1');
    return parts.join(', ');
  }, [noindex, nofollow]);

  // Schemas array
  const schemas = Array.isArray(schemaData)
    ? schemaData
    : schemaData
    ? [schemaData]
    : [];

  // ==========================================
  // AUTO SCHEMAS (Website + Organization + Breadcrumbs + Article)
  // ==========================================
  const autoSchemas = useMemo(() => {
    const list: object[] = [];

    // Website schema (always)
    list.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      alternateName: SITE_NAME_EN,
      url: SITE_URL,
      inLanguage: contentLanguage,
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: DEFAULT_LOGO,
        },
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });

    // Organization schema (always)
    list.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      alternateName: SITE_NAME_EN,
      url: SITE_URL,
      logo: DEFAULT_LOGO,
      description: siteDescription,
      sameAs: [
        'https://t.me/OTRISH_IRAN',
        'https://instagram.com/otrish__iran',
        'https://youtube.com/@otrishneshin',
        'https://linkedin.com/company/otrishneshin',
        'https://www.facebook.com/otrish.neshin',
      ],
      areaServed: {
        '@type': 'Country',
        name: 'Austria',
      },
      knowsLanguage: ['fa-IR', 'de-AT', 'en-US'],
    });

    // LocalBusiness Schema for Vienna (Item 34)
    list.push({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness-vienna`,
      name: 'اتریش‌نشین | کانون خدمات و همیاری ایرانیان اتریش',
      alternateName: 'Otrish Neshin Wien',
      url: SITE_URL,
      telephone: '+43 1 997 1010',
      priceRange: '€',
      image: DEFAULT_LOGO,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Stephansplatz 1',
        addressLocality: 'Wien',
        postalCode: '1010',
        addressCountry: 'AT'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 48.2082,
        longitude: 16.3738
      },
      areaServed: {
        '@type': 'Country',
        name: 'Austria'
      },
      knowsLanguage: ['fa-IR', 'de-AT', 'en-US'],
      sameAs: [
        'https://t.me/OTRISH_IRAN',
        'https://instagram.com/otrish__iran',
        'https://youtube.com/@otrishneshin',
        'https://linkedin.com/company/otrishneshin'
      ]
    });

    // Breadcrumb schema (if provided)
    if (breadcrumbs.length > 0) {
      list.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: item.name,
          item: item.url,
        })),
      });
    }

    // Article schema (if type=article/guide)
    if ((type === 'article' || type === 'guide') && title) {
      list.push({
        '@context': 'https://schema.org',
        '@type': type === 'guide' ? 'HowTo' : 'Article',
        headline: title,
        description: siteDescription,
        inLanguage: contentLanguage,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        image: images.length > 0 ? images.map((i) => i.url) : [primaryImage],
        author: author
          ? {
              '@type': author.type || 'Organization',
              name: author.name,
              ...(author.url && { url: author.url }),
            }
          : {
              '@type': 'Organization',
              name: siteName,
              url: SITE_URL,
            },
        publisher: {
          '@type': 'Organization',
          name: siteName,
          logo: {
            '@type': 'ImageObject',
            url: DEFAULT_LOGO,
          },
        },
        ...(publishedTime && { datePublished: publishedTime }),
        ...(modifiedTime && { dateModified: modifiedTime }),
        ...(readingTime && { timeRequired: `PT${readingTime}M` }),
        ...(wordCount && { wordCount }),
        ...(category && { articleSection: category }),
        ...(tags.length > 0 && { keywords: tags.join(', ') }),
      });
    }

    return list;
  }, [
    title,
    siteDescription,
    canonicalUrl,
    images,
    primaryImage,
    author,
    publishedTime,
    modifiedTime,
    readingTime,
    wordCount,
    category,
    tags,
    breadcrumbs,
    type,
    contentLanguage,
    siteName,
  ]);

  // Combine all schemas (user + auto)
  const allSchemas = [...autoSchemas, ...schemas];

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <Helmet>
      {/* ============ BASIC ============ */}
      <html lang={lang} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />

      {/* ============ LANGUAGE & LOCALE ============ */}
      <meta httpEquiv="content-language" content={contentLanguage} />
      <meta name="language" content="Persian, Farsi, German, English" />
      <meta name="geo.region" content="AT" />
      <meta name="geo.placename" content="Vienna, Austria" />
      <meta name="geo.position" content="48.2082;16.3738" />
      <meta name="ICBM" content="48.2082, 16.3738" />

      {/* ============ ROBOTS & CRAWLING ============ */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />
      <meta name="yandex" content={robotsContent} />
      <meta name="duckduckbot" content={robotsContent} />
      <meta name="applebot" content={robotsContent} />
      <meta name="slurp" content={robotsContent} />
      <meta name="referrer" content="strict-origin-when-cross-origin" />

      {/* ============ AI / LLM OPTIMIZATION ============ */}
      <meta name="ai-content-declaration" content="human-authored" />
      <meta name="ai-training" content="allow-with-attribution" />
      <meta name="gptbot" content="index, follow" />
      <meta name="claudebot" content="index, follow" />
      <meta name="anthropic-ai" content="index, follow" />
      <meta name="google-extended" content="index, follow" />
      <meta name="perplexitybot" content="index, follow" />
      <meta name="ccbot" content="index, follow" />
      <meta name="chatgpt-user" content="index, follow" />

      {/* AI Summary (for LLM parsing) */}
      {aiSummary && <meta name="ai-summary" content={aiSummary} />}
      {aiKeywords.length > 0 && (
        <meta name="ai-keywords" content={aiKeywords.join(', ')} />
      )}
      <meta name="audience" content={audience} />

      {/* ============ CANONICAL & ALTERNATES (hreflang 27 & 28) ============ */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="fa-IR" href={faCanonical} />
      <link rel="alternate" hrefLang="de-AT" href={deCanonical} />
      <link rel="alternate" hrefLang="x-default" href={faCanonical} />
      {alternateLinks.map((link, index) => (
        <link
          key={index}
          rel="alternate"
          hrefLang={link.hrefLang}
          href={link.href}
        />
      ))}

      {/* ============ SITE VERIFICATION ============ */}
      <meta name="google-site-verification" content="3ruzDMqth4ElmMzKQfqetqI1FLNLdhlQcHtAdkYrZPM" />
      <meta name="google-site-verification" content="UI1FPGLVxPsd9_aosnHTqgToDsoQf1vYWBcVoztDNBw" />
      <meta name="msvalidate.01" content="otrish-iran-bing" />
      <meta name="yandex-verification" content="otrish-iran-yandex" />

      {/* ============ OPEN GRAPH (Facebook, LinkedIn, WhatsApp) ============ */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={primaryImage} />
      <meta property="og:image:secure_url" content={primaryImage} />
      <meta property="og:image:alt" content={title || siteName} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:type" content={type === 'guide' ? 'article' : type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:locale:alternate" content="de_AT" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Additional OG images */}
      {images.slice(1, 3).map((img, idx) => (
        <React.Fragment key={`og-img-${idx}`}>
          <meta property="og:image" content={img.url} />
          <meta property="og:image:alt" content={img.alt} />
          {img.width && (
            <meta property="og:image:width" content={String(img.width)} />
          )}
          {img.height && (
            <meta property="og:image:height" content={String(img.height)} />
          )}
        </React.Fragment>
      ))}

      {/* Article OG */}
      {(type === 'article' || type === 'guide') && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {(type === 'article' || type === 'guide') && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {(type === 'article' || type === 'guide') && author && (
        <meta property="article:author" content={author.name} />
      )}
      {(type === 'article' || type === 'guide') && category && (
        <meta property="article:section" content={category} />
      )}
      {tags.map((tag, idx) => (
        <meta key={`article-tag-${idx}`} property="article:tag" content={tag} />
      ))}

      {/* ============ TWITTER CARD ============ */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={primaryImage} />
      <meta name="twitter:image:alt" content={title || siteName} />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={author?.name || siteName} />
      {readingTime && (
        <>
          <meta name="twitter:label2" content="Reading time" />
          <meta name="twitter:data2" content={`${readingTime} minutes`} />
        </>
      )}

      {/* ============ LINKEDIN ============ */}
      <meta property="linkedin:owner" content={siteName} />

      {/* ============ WHATSAPP / TELEGRAM ============ */}
      <meta property="whatsapp:title" content={siteTitle} />
      <meta property="whatsapp:description" content={siteDescription} />
      <meta property="whatsapp:image" content={primaryImage} />

      {/* ============ PINTEREST ============ */}
      <meta name="pinterest-rich-pin" content="true" />

      {/* ============ MOBILE & PWA ============ */}
      <meta name="theme-color" content="#c8102e" />
      <meta name="msapplication-TileColor" content="#c8102e" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="format-detection" content="telephone=no" />

      {/* ============ PERFORMANCE HINTS ============ */}
      <link
        rel="preconnect"
        href="https://images.unsplash.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://t.me" />
      <link rel="dns-prefetch" href="https://t.me" />

      {/* ============ SCHEMA MARKUP (JSON-LD) ============ */}
      {allSchemas.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;