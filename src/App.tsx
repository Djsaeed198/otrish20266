import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import {
  Compass, Coins, Map, BookOpen, Users, MessageSquare, Sparkles, CloudSun,
  ShieldCheck, AlertOctagon, ChevronLeft, Calendar, Home, Clock, MapPin,
  Send, Instagram, Facebook, Phone, ExternalLink, Award, Calculator,
  Newspaper, RefreshCw, Share2, BarChart3, FileText, GraduationCap, Globe,
  UserCheck, CheckCircle, ShoppingBag, Heart, Building, Car, ShoppingCart,
  Train, Smile, Stethoscope, Ticket, Search, IdCard, KeyRound, BadgeCheck
} from "lucide-react";
import {
  getActiveSession,
  touchSessionActivity,
  terminateSession,
  UserSession,
} from "./utils/cryptoAuth";
import {
  logUnauthorizedAccess,
  logSessionExpired,
  logSecurityEvent,
} from "./utils/securityLogger";
import SecureAuthModal from "./components/SecureAuthModal";
import SecurityAuditModal from "./components/SecurityAuditModal";

// ---------- STATIC IMPORTS (Home Segment - Zero CLS) ----------
import ExperienceGallery from "./components/ExperienceGallery";
import ComparisonWizard from "./components/ComparisonWizard";
import AdministrativeGlossary from "./components/AdministrativeGlossary";
import VisaSuitabilityWizard from "./components/VisaSuitabilityWizard";
import CostOfLivingComparison from "./components/CostOfLivingComparison";
import FormDownloadLibrary from "./components/FormDownloadLibrary";
import SchoolDirectory from "./components/SchoolDirectory";
import VisaCalculator from "./components/VisaCalculator";
import ExchangeRateWidget from "./components/ExchangeRateWidget";
import InsuranceFilterDirectory from "./components/InsuranceFilterDirectory";
import DistrictGuide from "./components/DistrictGuide";
import ExpertProfile from "./components/ExpertProfile";
import TranslatorDirectory from "./components/TranslatorDirectory";
import FactCheckArticles from "./components/FactCheckArticles";
import NoVACalculator from "./components/NoVACalculator";
import OfferDirectory from "./components/OfferDirectory";
import StudentFinanceCalculator from "./components/StudentFinanceCalculator";
import WillhabenGuide from "./components/WillhabenGuide";
import NeighborhoodComparison from "./components/NeighborhoodComparison";
import VolunteerDirectory from "./components/VolunteerDirectory";
import PublicHolidayCalendar from "./components/PublicHolidayCalendar";
import DrivingLicenseGuide from "./components/DrivingLicenseGuide";
import RealEstateTaxCalculator from "./components/RealEstateTaxCalculator";
import InsuranceSupplementalGuide from "./components/InsuranceSupplementalGuide";
import IdAustriaGuide from "./components/IdAustriaGuide";
import TaxRegistrationGuide from "./components/TaxRegistrationGuide";
import CriminalRecordGuide from "./components/CriminalRecordGuide";
import NostrificationGuide from "./components/NostrificationGuide";
import BankExchangeDirectory from "./components/BankExchangeDirectory";
import MoneyLaunderingInfo from "./components/MoneyLaunderingInfo";
import PublicTransportGuide from "./components/PublicTransportGuide";
import VehicleInspectionGuide from "./components/VehicleInspectionGuide";
import ParkingGuide from "./components/ParkingGuide";
import GroceryDirectory from "./components/GroceryDirectory";
import ShoppingGuide from "./components/ShoppingGuide";
import ChristmasMarketGuide from "./components/ChristmasMarketGuide";
import DanubeFestivalGuide from "./components/DanubeFestivalGuide";
import SkiResortGuide from "./components/SkiResortGuide";
import PoolTicketGuide from "./components/PoolTicketGuide";
import TheoryExamTest from "./components/TheoryExamTest";
import MA35AppointmentGuide from "./components/MA35AppointmentGuide";
import CitizenshipGuide from "./components/CitizenshipGuide";
import BankComparisonGuide from "./components/BankComparisonGuide";
import KindergartenGuide from "./components/KindergartenGuide";
import SupplementalInsuranceGuide from "./components/SupplementalInsuranceGuide";
import PensionGuide from "./components/PensionGuide";
import LiabilityInsuranceGuide from "./components/LiabilityInsuranceGuide";
import WillhabenSecurityGuide from "./components/WillhabenSecurityGuide";
import OrganicMarketsGuide from "./components/OrganicMarketsGuide";
import HalalDirectory from "./components/HalalDirectory";
import MarriageDivorceGuide from "./components/MarriageDivorceGuide";
import TaxReturnGuide from "./components/TaxReturnGuide";
import FreelanceTaxHub from "./components/FreelanceTaxHub";
import FamilienbonusGuide from "./components/FamilienbonusGuide";
import WifiBfiGuide from "./components/WifiBfiGuide";
import AccountingCareerGuide from "./components/AccountingCareerGuide";
import KlimaTicketGuide from "./components/KlimaTicketGuide";
import TrafficFineAppealGuide from "./components/TrafficFineAppealGuide";
import RWRPunterRechner from "./components/RWRPunterRechner";
import ResidencyConditionGuide from "./components/ResidencyConditionGuide";
import StudentGradRelocationGuide from "./components/StudentGradRelocationGuide";
import WillhabenFurnitureGuide from "./components/WillhabenFurnitureGuide";
import DiscounterGuide from "./components/DiscounterGuide";
import ObbVorteilscardGuide from "./components/ObbVorteilscardGuide";
import ContractCancellationGuide from "./components/ContractCancellationGuide";
import BetriebskostenGuide from "./components/BetriebskostenGuide";
import MutterKindPassGuide from "./components/MutterKindPassGuide";
import KassenarztDirectory from "./components/KassenarztDirectory";
import EmergencyDentistryGuide from "./components/EmergencyDentistryGuide";
import OperaStandingTicketGuide from "./components/OperaStandingTicketGuide";
import StadtwanderwegeGuide from "./components/StadtwanderwegeGuide";
import IdAustriaActivationGuide from "./components/IdAustriaActivationGuide";
import PhishingSecurityGuide from "./components/PhishingSecurityGuide";
import IranianEventsCalendar from "./components/IranianEventsCalendar";
import AustriaMainDashboard from "./components/AustriaMainDashboard";
import EcosystemPortal from "./components/EcosystemPortal";
import WelcomeNotification from "./components/WelcomeNotification";
import { trackEvent } from "./utils/tracker";
import BruttoNettoCalculator from "./components/BruttoNettoCalculator";
import InterpreterAcademy from "./components/InterpreterAcademy";
import WohnbeihilfeBlock from "./components/WohnbeihilfeBlock";
import AustriaClassifiedsBlock from "./components/AustriaClassifiedsBlock";
import AustriaIranNewsBanner from "./components/AustriaIranNewsBanner";
import NewsModal, { COMPREHENSIVE_NEWS_ARCHIVE } from "./components/NewsModal";
import NewsArchiveHub from "./components/NewsArchiveHub";
import SEO from "./components/SEO";
import ImmigrationAssessment from "./components/ImmigrationAssessment";
import ToastNotification from "./components/ToastNotification";
import { toast } from "./utils/toast";
import { motion, AnimatePresence } from "motion/react";
import WhatsAppConsultButton from "./components/WhatsAppConsultButton";
import SuperAppHeader from "./components/SuperAppHeader";
import SuperAppNavigationBar from "./components/SuperAppNavigationBar";
import SuperAppLauncher from "./components/SuperAppLauncher";
import SuperAppPageLayout from "./components/SuperAppPageLayout";
import SuperAppSearchModal from "./components/SuperAppSearchModal";
import SuperAppMobileBottomNav from "./components/SuperAppMobileBottomNav";
import ContentClustersSection from "./components/ContentClustersSection";
import InternationalSeoSection from "./components/InternationalSeoSection";
import AustrianGermanPage from "./components/AustrianGermanPage";
import AiGeoOptimizationHub from "./components/AiGeoOptimizationHub";
import { getLocalBusinessSchema } from "./data/internationalSeoData";
import { getGeoFaqPageSchema, getGeoHowToSchema } from "./data/geoOptimizationData";
import { getSeoForSegment } from "./data/seoCatalog";
import MobileNavigationDrawer from "./components/MobileNavigationDrawer";
import LiveNewsTicker from "./components/LiveNewsTicker";
import { AustriaResidentLogo } from "./components/AustriaSmartSuite";

/* ============================================================================
   🎯 CONSTANTS: Site Identity & Canonical Domain (Diako Immigration Holding)
   ============================================================================ */
export const SITE_DOMAIN = "https://www.dia-co.ir";
export const SITE_NAME_FA = "اتریش‌نشین";
export const SITE_NAME_EN = "Otrish Neshin";
export const SITE_BRAND_SHORT = "اتریش‌نشین";
export const SITE_LOCALE_FA = "fa-IR";
export const SITE_LOCALE_DE = "de-AT";

// 🖼️ Canonical SEO Image Assets (Hosted on same HTTPS domain for fast CDN caching)
export const SEO_IMAGES = {
  logo: `${SITE_DOMAIN}/assets/images/diako-logo-512.png`,
  logoSmall: `${SITE_DOMAIN}/assets/images/diako-logo-192.png`,
  logoIco: `${SITE_DOMAIN}/assets/favicon.ico`,
  ogDefault: `${SITE_DOMAIN}/assets/images/og/diako-immigration-og-1200x630.jpg`,
  ogHome: `${SITE_DOMAIN}/assets/images/og/diako-home-vienna-1200x630.jpg`,
  ogVisa: `${SITE_DOMAIN}/assets/images/og/diako-visa-rwr-card-1200x630.jpg`,
  ogMa35: `${SITE_DOMAIN}/assets/images/og/diako-ma35-appointment-1200x630.jpg`,
  ogFinance: `${SITE_DOMAIN}/assets/images/og/diako-brutto-netto-1200x630.jpg`,
  ogTax: `${SITE_DOMAIN}/assets/images/og/diako-finanzonline-tax-1200x630.jpg`,
  ogHousing: `${SITE_DOMAIN}/assets/images/og/diako-housing-vienna-1200x630.jpg`,
  ogCitizenship: `${SITE_DOMAIN}/assets/images/og/diako-citizenship-1200x630.jpg`,
  ogGerman: `${SITE_DOMAIN}/assets/images/og/diako-german-academy-1200x630.jpg`,
  ogHealth: `${SITE_DOMAIN}/assets/images/og/diako-health-insurance-1200x630.jpg`,
  ogTransport: `${SITE_DOMAIN}/assets/images/og/diako-transport-vienna-1200x630.jpg`,
  ogSchool: `${SITE_DOMAIN}/assets/images/og/diako-schools-1200x630.jpg`,
  ogGeneric: `${SITE_DOMAIN}/assets/images/og/diako-generic-tool-1200x630.jpg`,
  twitterCard: `${SITE_DOMAIN}/assets/images/og/diako-twitter-card-1200x600.jpg`,
  appleTouch: `${SITE_DOMAIN}/assets/images/diako-apple-touch-180.png`,
} as const;

// 🎯 Map: segment → hero image key for contextual OG image per page
const SEGMENT_TO_IMAGE: Record<string, keyof typeof SEO_IMAGES> = {
  home: "ogHome",
  "rwr-calculator": "ogVisa",
  visa: "ogVisa",
  ma35: "ogMa35",
  appointment: "ogMa35",
  finance: "ogFinance",
  "tax-return": "ogTax",
  "tax-reg": "ogTax",
  housesearch: "ogHousing",
  citizenship: "ogCitizenship",
  german: "ogGerman",
  insurance: "ogHealth",
  transport: "ogTransport",
  schools: "ogSchool",
};

/* ============================================================================
   🧭 NAV PAGES
   ============================================================================ */
const NAV_PAGES = [
  { id: "home", label: "صفحه اصلی", icon: Home },
  { id: "stories", label: "تجربه‌سرا", icon: BookOpen },
  { id: "compare", label: "مقایسه اقامت", icon: ShieldCheck },
  { id: "glossary", label: "واژه‌نامه", icon: BookOpen },
  { id: "compare-living", label: "مقایسه هزینه", icon: BarChart3 },
  { id: "forms", label: "فرم‌های اداری", icon: FileText },
  { id: "schools", label: "مدارس", icon: GraduationCap },
  { id: "calculator", label: "امتیاز ویزا", icon: Sparkles },
  { id: "exchange", label: "نرخ ارز", icon: Coins },
  { id: "insurance", label: "بیمه پزشکان", icon: ShieldCheck },
  { id: "district", label: "راهنمای محلات", icon: Map },
  { id: "nova", label: "مالیات خودرو", icon: Car },
  { id: "offers", label: "تخفیف‌ها", icon: Coins },
  { id: "student-finance", label: "وام دانشجویی", icon: GraduationCap },
  { id: "willhaben", label: "خرید دست‌دوم", icon: ShoppingBag },
  { id: "neighborhood", label: "مقایسه محلات", icon: Map },
  { id: "volunteer", label: "کارهای خیر", icon: Heart },
  { id: "holidays", label: "تعطیلات رسمی", icon: Calendar },
  { id: "license", label: "گواهینامه", icon: Car },
  { id: "real-estate", label: "مالیات ملک", icon: Building },
  { id: "supplemental-insurance", label: "بیمه تکمیلی", icon: ShieldCheck },
  { id: "pension-guide", label: "بیمه بازنشستگی", icon: FileText },
  { id: "liability-insurance", label: "بیمه مسئولیت", icon: ShieldCheck },
  { id: "willhaben-security", label: "امنیت ویلهابن", icon: ShoppingBag },
  { id: "organic-markets", label: "بازارهای ارگانیک", icon: ShoppingBag },
  { id: "halal-directory", label: "مراکز حلال", icon: ShoppingBag },
  { id: "marriage-divorce", label: "ازدواج و طلاق", icon: FileText },
  { id: "tax-return", label: "اظهارنامه مالیاتی", icon: FileText },
  { id: "freelance-tax", label: "مالیات فریلنسرها", icon: FileText },
  { id: "familienbonus", label: "تخفیف مالیاتی فرزندان", icon: FileText },
  { id: "education-wifi-bfi", label: "دوره‌های WIFI و bfi", icon: GraduationCap },
  { id: "accounting-career", label: "حسابداری", icon: GraduationCap },
  { id: "klimaticket", label: "کلیما تیکت", icon: Car },
  { id: "traffic-fine-appeal", label: "اعتراض به جریمه", icon: AlertOctagon },
  { id: "rwr-calculator", label: "محاسبه امتیاز RWR", icon: Calculator },
  { id: "residency-conditions", label: "شرایط تمدید اقامت", icon: FileText },
  { id: "student-grad-guide", label: "اقامت فارغ‌التحصیلان", icon: GraduationCap },
  { id: "willhaben-furniture", label: "تجهیز خانه با Willhaben", icon: ShoppingCart },
  { id: "discounter-guide", label: "راهنمای سوپرمارکت‌ها", icon: ShoppingCart },
  { id: "obb-vorteilscard", label: "کارت تخفیف قطار", icon: Train },
  { id: "contract-cancellation", label: "فسخ قرارداد", icon: FileText },
  { id: "betriebskosten", label: "هزینه شارژ", icon: Building },
  { id: "mutter-kind-pass", label: "دفترچه مادر و کودک", icon: Smile },
  { id: "kassenarzt-directory", label: "دایرکتوری پزشکان بیمه", icon: Stethoscope },
  { id: "opera-standing-tickets", label: "بلیت‌های ایستاده اپرا", icon: Ticket },
  { id: "stadtwanderwege", label: "پیاده‌روی وین", icon: Map },
  { id: "id-austria-guide", label: "راهنمای ID Austria", icon: ShieldCheck },
  { id: "phishing-security", label: "امنیت سایبری", icon: AlertOctagon },
  { id: "tax-reg", label: "ثبت مالیاتی", icon: FileText },
  { id: "criminal-record", label: "عدم سوءپیشینه", icon: FileText },
  { id: "nostrification", label: "نوستریفیکاسیون", icon: GraduationCap },
  { id: "banks", label: "بانک و صرافی", icon: Coins },
  { id: "aml", label: "قوانین ضدپولشویی", icon: AlertOctagon },
  { id: "transport", label: "حمل‌ونقل", icon: Map },
  { id: "inspection", label: "معاینه فنی", icon: Car },
  { id: "parking", label: "پارک خودرو", icon: MapPin },
  { id: "grocery", label: "فروشگاه ایرانی", icon: ShoppingBag },
  { id: "shopping", label: "خرید و سیم‌کارت", icon: ShoppingBag },
  { id: "christmas", label: "بازارچه کریسمس", icon: Calendar },
  { id: "danube", label: "فستیوال دانوب", icon: Building },
  { id: "ski", label: "اسکی", icon: Car },
  { id: "pool", label: "استخر", icon: Building },
  { id: "theory-test", label: "آزمون رانندگی", icon: Car },
  { id: "ma35", label: "اداره MA35", icon: FileText },
  { id: "citizenship", label: "تابعیت اتریش", icon: Award },
  { id: "bank-compare", label: "مقایسه بانک‌ها", icon: Coins },
  { id: "kindergarten", label: "مهدکودک‌ها", icon: GraduationCap },
  { id: "experts", label: "کارشناسان", icon: UserCheck },
  { id: "translators", label: "مترجمان", icon: Globe },
  { id: "factcheck", label: "حقیقت‌سنجی", icon: CheckCircle },
  { id: "tracker", label: "۱. اقامت و چک‌لیست", icon: Compass },
  { id: "finance", label: "۲. امور مالی و بودجه", icon: Coins },
  { id: "mapper", label: "۳. مشاغل ونیازمندیها", icon: Map },
  { id: "german", label: "۴. زبان و آکادمی", icon: BookOpen },
  { id: "carpool", label: "۵. همسفریاب و گفتگو", icon: Users },
  { id: "visa-samples", label: "نمونه ویزاها", icon: IdCard },
  { id: "trust-examples", label: "۶. نمونه ویزاها و اقامت", icon: Sparkles },
  { id: "smart", label: "۷. سامانه‌های هوشمند", icon: Calculator },
  { id: "about", label: "درباره ما", icon: MessageSquare },
] as const;

// Lazy-load heavy tabs
const TaxCalculator = lazy(() => import("./components/TaxCalculator"));
const ResidenceTracker = lazy(() => import("./components/ResidenceTracker"));
const ServiceFinder = lazy(() => import("./components/ServiceFinder"));
const ForumDiscussion = lazy(() => import("./components/ForumDiscussion"));
const CostOfLiving = lazy(() => import("./components/CostOfLiving"));
const CommunityGallery = lazy(() => import("./components/CommunityGallery"));
const TrustExamples = lazy(() => import("./components/TrustExamples"));
const DocumentSamples = lazy(() => import("./components/DocumentSamples"));
const SurvivalGerman = lazy(() => import("./components/SurvivalGerman"));
const CarpoolNetworking = lazy(() => import("./components/CarpoolNetworking"));
const GoldenRules = lazy(() => import("./components/GoldenRules"));
const LocalExperienceMapper = lazy(() => import("./components/LocalExperienceMapper"));
const FinancialSmartManager = lazy(() => import("./components/FinancialSmartManager"));
const DigitalPaperworkWizard = lazy(() => import("./components/DigitalPaperworkWizard"));
const IntegrationAcademy = lazy(() => import("./components/IntegrationAcademy"));
const AustriaComprehensiveGuide = lazy(() => import("./components/AustriaComprehensiveGuide"));
const TrolutCrowdshipping = lazy(() => import("./components/TrolutCrowdshipping"));
const HealthGuide = lazy(() => import("./components/HealthGuide"));
const ImmigrationDirectory = lazy(() => import("./components/ImmigrationDirectory"));
const VafWorkAssistant = lazy(() => import("./components/VafWorkAssistant"));
const Divar = lazy(() => import("./components/Divar"));
const AboutContactNew = lazy(() => import("./components/AboutContactNew"));
const SmartSystems = lazy(() => import("./components/SmartSystems"));
const AppointmentsManager = lazy(() => import("./components/AppointmentsManager"));
const SmartHouseSearch = lazy(() => import("./components/SmartHouseSearch"));
const InitialDocumentCheck = lazy(() => import("./components/InitialDocumentCheck"));
const ServiceRatingsPortal = lazy(() => import("./components/ServiceRatingsPortal"));

// @ts-ignore
const otrishLogo = "/otrish_logo_1779961596526.png";
const diakoLogo = "/otrish_logo_1779961596526.png";

/* ============================================================================
   🗺️ PATH ↔ SEGMENT MAPS
   ============================================================================ */
export const PATH_TO_SEGMENT_MAP: Record<string, string> = {
  "/rwr-card": "rwr-calculator",
  "/rwr-calculator": "rwr-calculator",
  "/rwr": "rwr-calculator",
  "/brutto-netto-rechner": "finance",
  "/brutto-netto": "finance",
  "/bruttonetto": "finance",
  "/gehalt": "finance",
  "/ma35": "ma35",
  "/appointment": "ma35",
  "/appointments": "ma35",
  "/finanzonline": "tax-return",
  "/arbeitnehmerveranlagung": "tax-return",
  "/steuernummer": "tax-reg",
  "/tax-reg": "tax-reg",
  "/tax-return": "tax-return",
  "/id-austria": "id-austria-guide",
  "/id-austria-guide": "id-austria-guide",
  "/wohnen": "housesearch",
  "/housesearch": "housesearch",
  "/citizenship": "citizenship",
  "/staatsbuergerschaft": "citizenship",
  "/tracker": "tracker",
  "/mapper": "mapper",
  "/doctors": "mapper",
  "/german": "german",
  "/carpool": "carpool",
  "/smart": "smart",
  "/exchange": "exchange",
  "/forms": "forms",
  "/schools": "schools",
  "/insurance": "insurance",
  "/district": "district",
  "/experts": "experts",
  "/translators": "translators",
  "/factcheck": "factcheck",
  "/nova": "nova",
  "/offers": "offers",
  "/student-finance": "student-finance",
  "/willhaben": "willhaben",
  "/neighborhood": "neighborhood",
  "/volunteer": "volunteer",
  "/holidays": "holidays",
  "/license": "license",
  "/real-estate": "real-estate",
  "/supplemental": "supplemental",
  "/criminal-record": "criminal-record",
  "/nostrification": "nostrification",
  "/banks": "banks",
  "/aml": "aml",
  "/transport": "transport",
  "/inspection": "inspection",
  "/parking": "parking",
  "/grocery": "grocery",
  "/shopping": "shopping",
  "/christmas": "christmas",
  "/danube": "danube",
  "/ski": "ski",
  "/pool": "pool",
  "/theory-test": "theory-test",
  "/bank-compare": "bank-compare",
  "/kindergarten": "kindergarten",
  "/supplemental-insurance": "supplemental-insurance",
  "/pension-guide": "pension-guide",
  "/liability-insurance": "liability-insurance",
  "/willhaben-security": "willhaben-security",
  "/organic-markets": "organic-markets",
  "/halal-directory": "halal-directory",
  "/marriage-divorce": "marriage-divorce",
  "/freelance-tax": "freelance-tax",
  "/familienbonus": "familienbonus",
  "/education-wifi-bfi": "education-wifi-bfi",
  "/accounting-career": "accounting-career",
  "/klimaticket": "klimaticket",
  "/traffic-fine-appeal": "traffic-fine-appeal",
  "/residency-conditions": "residency-conditions",
  "/student-grad-guide": "student-grad-guide",
  "/willhaben-furniture": "willhaben-furniture",
  "/discounter-guide": "discounter-guide",
  "/obb-vorteilscard": "obb-vorteilscard",
  "/contract-cancellation": "contract-cancellation",
  "/betriebskosten": "betriebskosten",
  "/mutter-kind-pass": "mutter-kind-pass",
  "/kassenarzt-directory": "kassenarzt-directory",
  "/emergency-dentistry": "emergency-dentistry",
  "/opera-standing-tickets": "opera-standing-tickets",
  "/stadtwanderwege": "stadtwanderwege",
  "/phishing-security": "phishing-security",
  "/about": "about",
  "/immigration-assessment": "immigration-assessment",
  "/doccheck": "doccheck",
  "/ratings": "ratings",
  "/visa-samples": "visa-samples",
  "/clusters": "clusters",
  "/content-clusters": "clusters",
  "/international-seo": "international-seo",
  "/seo": "international-seo",
  "/geo-optimization": "geo-optimization",
  "/geo": "geo-optimization",
  "/events": "events",
  "/ecosystem": "ecosystem",
  "/links": "ecosystem"
};

export const SEGMENT_TO_PATH_MAP: Record<string, string> = {
  home: "/",
  events: "/events",
  ecosystem: "/ecosystem",
  clusters: "/clusters",
  "international-seo": "/international-seo",
  seo: "/international-seo",
  "geo-optimization": "/geo-optimization",
  geo: "/geo-optimization",
  "rwr-calculator": "/rwr-card",
  finance: "/brutto-netto-rechner",
  ma35: "/ma35",
  appointment: "/ma35",
  appointments: "/ma35",
  "tax-return": "/finanzonline",
  "tax-reg": "/steuernummer",
  housesearch: "/wohnen",
  citizenship: "/citizenship",
  "id-austria": "/id-austria",
  "id-austria-guide": "/id-austria",
  mapper: "/mapper",
  german: "/german",
  carpool: "/carpool",
  klimaticket: "/klimaticket",
  betriebskosten: "/betriebskosten",
  familienbonus: "/familienbonus",
  "freelance-tax": "/freelance-tax",
  "traffic-fine-appeal": "/traffic-fine-appeal",
  "residency-conditions": "/residency-conditions",
  nostrification: "/nostrification",
  "kassenarzt-directory": "/kassenarzt-directory",
  "emergency-dentistry": "/emergency-dentistry",
  "student-grad-guide": "/student-grad-guide",
  "mutter-kind-pass": "/mutter-kind-pass",
  "willhaben-security": "/willhaben-security",
  forms: "/forms",
  about: "/about",
  "visa-samples": "/visa-samples",
  exchange: "/exchange",
  smart: "/smart",
  tracker: "/tracker",
  stories: "/stories",
  compare: "/compare",
  glossary: "/glossary",
  "compare-living": "/compare-living",
  schools: "/schools",
  insurance: "/insurance",
  district: "/district",
  experts: "/experts",
  translators: "/translators",
  factcheck: "/factcheck",
  nova: "/nova",
  offers: "/offers",
  "student-finance": "/student-finance",
  willhaben: "/willhaben",
  neighborhood: "/neighborhood",
  volunteer: "/volunteer",
  holidays: "/holidays",
  license: "/license",
  "real-estate": "/real-estate",
  supplemental: "/supplemental",
  "criminal-record": "/criminal-record",
  banks: "/banks",
  aml: "/aml",
  transport: "/transport",
  inspection: "/inspection",
  parking: "/parking",
  grocery: "/grocery",
  shopping: "/shopping",
  christmas: "/christmas",
  danube: "/danube",
  ski: "/ski",
  pool: "/pool",
  "theory-test": "/theory-test",
  "bank-compare": "/bank-compare",
  kindergarten: "/kindergarten",
  "supplemental-insurance": "/supplemental-insurance",
  "pension-guide": "/pension-guide",
  "liability-insurance": "/liability-insurance",
  "organic-markets": "/organic-markets",
  "halal-directory": "/halal-directory",
  "marriage-divorce": "/marriage-divorce",
  "education-wifi-bfi": "/education-wifi-bfi",
  "accounting-career": "/accounting-career",
  "willhaben-furniture": "/willhaben-furniture",
  "discounter-guide": "/discounter-guide",
  "obb-vorteilscard": "/obb-vorteilscard",
  "contract-cancellation": "/contract-cancellation",
  "opera-standing-tickets": "/opera-standing-tickets",
  stadtwanderwege: "/stadtwanderwege",
  "phishing-security": "/phishing-security",
  "immigration-assessment": "/immigration-assessment",
  doccheck: "/doccheck",
  ratings: "/ratings"
};

export function getSegmentFromBrowserLocation(): string {
  if (typeof window === "undefined") return "home";
  let rawPath = window.location.pathname.toLowerCase().replace(/\/$/, "");
  if (rawPath === "/de") return "home";
  if (rawPath.startsWith("/de/")) rawPath = rawPath.replace(/^\/de/, "");
  if (rawPath && PATH_TO_SEGMENT_MAP[rawPath]) return PATH_TO_SEGMENT_MAP[rawPath];
  const cleanSub = rawPath.replace(/^\//, "");
  if (cleanSub && (cleanSub in SEGMENT_TO_PATH_MAP || PATH_TO_SEGMENT_MAP["/" + cleanSub])) {
    return PATH_TO_SEGMENT_MAP["/" + cleanSub] || cleanSub;
  }
  const params = new URLSearchParams(window.location.search);
  const seg = params.get("segment");
  if (seg) return PATH_TO_SEGMENT_MAP["/" + seg] || seg;
  return "home";
}

/* ============================================================================
   🚀 APP ROOT
   ============================================================================ */
export default function App() {
  const [activeSegment, setActiveSegment] = useState<string>(() => getSegmentFromBrowserLocation());

  const [isDeLocale, setIsDeLocale] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.location.pathname.toLowerCase().startsWith("/de");
  });

  const toggleDeLocale = (enableDe: boolean) => {
    setIsDeLocale(enableDe);
    const baseTarget = SEGMENT_TO_PATH_MAP[activeSegment] || (activeSegment === "home" ? "/" : `/${activeSegment}`);
    const newPath = enableDe ? `/de${baseTarget === "/" ? "" : baseTarget}` : baseTarget;
    window.history.pushState({ segment: activeSegment, isDe: enableDe }, "", newPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [viennaTime, setViennaTime] = useState<string>("");
  const [viennaGreeting, setViennaGreeting] = useState<string>("خوش آمدید 🇦🇹");
  const [sparkleActive, setSparkleActive] = useState<boolean>(false);
  const [sparkleCount, setSparkleCount] = useState<number>(0);

  const [isFooterOptimized, setIsFooterOptimized] = useState<boolean>(true);
  const [showIntroBanner, setShowIntroBanner] = useState<boolean>(true);
  const [isHeaderFooterUpdated, setIsHeaderFooterUpdated] = useState<boolean>(true);
  const [optimizationToast, setOptimizationToast] = useState<string | null>(null);

  const [austriaNews, setAustriaNews] = useState<any[]>(COMPREHENSIVE_NEWS_ARCHIVE);
  const [newsLastUpdated, setNewsLastUpdated] = useState<string>("امروز - زنده");
  const [newsSourceText, setNewsSourceText] = useState<string>("۱۰ رسانه رسمی فدرال و شهری اتریش");
  const [isNewsLoading, setIsNewsLoading] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState<boolean>(false);
  const [isForcingNewsRefresh, setIsForcingNewsRefresh] = useState<boolean>(false);

  const newsTickerRef = useRef<HTMLDivElement>(null);
  const [tickerHeight, setTickerHeight] = useState<number>(44);
  const [isNavDocked, setIsNavDocked] = useState<boolean>(false);

  const [seoState, setSeoState] = useState<{
    title: string;
    description: string;
    keywords: string;
    schema: any[];
    image: string;
  }>({
    title: `${SITE_NAME_FA} | همیار همه‌جانبه مهاجران و فارسی‌زبانان مقیم اتریش 🇦🇹`,
    description: `${SITE_NAME_FA}؛ پورتال تخصصی مهاجرت، اقامت، محاسبه حقوق، پایش MA35، نرخ زنده ارز و راهنمای جامع زندگی در اتریش برای فارسی‌زبانان.`,
    keywords: "اتریش‌نشین, مهاجرت به اتریش, فارسی زبانان اتریش, قیمت ارز زنده, محاسبه حقوق اتریش, MA35, RWR کارت, ویزا اتریش",
    schema: [],
    image: SEO_IMAGES.ogDefault,
  });

  const fetchAustriaNewsList = async (force: boolean = false) => {
    if (force) setIsForcingNewsRefresh(true);
    else setIsNewsLoading(true);

    // Simulate real-time sync with Austrian official news feeds
    setTimeout(() => {
      setAustriaNews(COMPREHENSIVE_NEWS_ARCHIVE);
      setNewsLastUpdated("امروز ساعت " + new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }));
      setIsNewsLoading(false);
      setIsForcingNewsRefresh(false);
    }, 400);
  };

  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  // 🔐 Security & Session Management (auth.md & security.md compliant)
  const [activeSession, setActiveSession] = useState<UserSession | null>(() => getActiveSession());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [authModalTargetAction, setAuthModalTargetAction] = useState<string | undefined>(undefined);

  // Inactivity tracking (30 minutes timeout per auth.md Section 4)
  useEffect(() => {
    let throttleTimer: any = null;
    const handleUserActivity = () => {
      if (throttleTimer) return;
      throttleTimer = setTimeout(() => {
        throttleTimer = null;
        if (activeSession) {
          touchSessionActivity();
        }
      }, 5000);
    };

    window.addEventListener("mousemove", handleUserActivity, { passive: true });
    window.addEventListener("keydown", handleUserActivity, { passive: true });
    window.addEventListener("touchstart", handleUserActivity, { passive: true });
    window.addEventListener("scroll", handleUserActivity, { passive: true });

    // Periodic check for 30m inactivity expiration
    const sessionCheckInterval = setInterval(() => {
      if (activeSession) {
        const current = getActiveSession();
        if (!current) {
          setActiveSession(null);
          toast.warning("نشست امنیتی به دلیل ۳۰ دقیقه عدم فعالیت منقضی شد 🔒");
        }
      }
    }, 15000);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      clearInterval(sessionCheckInterval);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [activeSession]);

  // Protected Action Guard
  const requireAdminAuth = (actionName: string, onSuccess: () => void) => {
    const session = getActiveSession();
    if (session && session.role === "admin") {
      onSuccess();
    } else {
      logUnauthorizedAccess(actionName, session ? session.role : "guest");
      toast.error(`دسترسی به «${actionName}» نیازمند ورود به عنوان مدیر است.`);
      setAuthModalTargetAction(actionName);
      setIsAuthModalOpen(true);
    }
  };

  // Detect URL admin bypass attempts on mount and log them
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "true") {
        const session = getActiveSession();
        if (!session || session.role !== "admin") {
          logUnauthorizedAccess("admin_portal_url_query", "guest");
          setAuthModalTargetAction("ورود به پنل مدیریت");
          setIsAuthModalOpen(true);
        }
      }
    }
  }, []);

  // ⌨️ Ctrl+K / Cmd+K → SuperApp Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 🔄 Sync URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const baseTarget = SEGMENT_TO_PATH_MAP[activeSegment] || (activeSegment === "home" ? "/" : `/${activeSegment}`);
      const targetPath = isDeLocale ? `/de${baseTarget === "/" ? "" : baseTarget}` : baseTarget;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ segment: activeSegment, isDe: isDeLocale }, "", targetPath);
      }
    }
  }, [activeSegment, isDeLocale]);

  // ⬅️➡️ popstate
  useEffect(() => {
    const handlePopState = () => {
      const seg = getSegmentFromBrowserLocation();
      const isDe = typeof window !== "undefined" && window.location.pathname.toLowerCase().startsWith("/de");
      setIsDeLocale(isDe);
      if (seg) setActiveSegment(seg);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  /* ==========================================================================
     🌟 DYNAMIC SEO ENGINE — Multi-language, Rich Schema, Images, Core Web Vitals
     ========================================================================== */
  useEffect(() => {
    const seo = getSeoForSegment(activeSegment);
    const canonicalPath = SEGMENT_TO_PATH_MAP[activeSegment] || (activeSegment === "home" ? "/" : `/${activeSegment}`);
    const currentCleanPath = isDeLocale
      ? `/de${canonicalPath === "/" ? "" : canonicalPath}`
      : canonicalPath;
    const canonicalUrl = `${SITE_DOMAIN}${currentCleanPath === "/" ? "" : currentCleanPath}`;
    const faFullUrl = `${SITE_DOMAIN}${canonicalPath === "/" ? "" : canonicalPath}`;
    const deFullUrl = `${SITE_DOMAIN}/de${canonicalPath === "/" ? "" : canonicalPath}`;

    // 🖼️ Pick best contextual image for this segment
    const imageKey = SEGMENT_TO_IMAGE[activeSegment] || "ogGeneric";
    const heroImage = SEO_IMAGES[imageKey] || SEO_IMAGES.ogDefault;

    // 🌐 HTML lang & dir
    document.documentElement.lang = isDeLocale ? "de" : "fa";
    document.documentElement.dir = isDeLocale ? "ltr" : "rtl";

    // 🏷️ Title
    const finalTitle = isDeLocale
      ? `${seo.title.replace(/\|.*/, "")} | ${SITE_NAME_EN} (de-AT)`
      : `${seo.title} | ${SITE_NAME_FA}`;
    document.title = finalTitle;

    // ---------- meta helper ----------
    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // ---------- link helper ----------
    const setLink = (rel: string, href: string, extra?: Record<string, string>) => {
      let selector = `link[rel="${rel}"]`;
      if (extra) {
        Object.entries(extra).forEach(([k, v]) => (selector += `[${k}="${v}"]`));
      }
      let el = document.querySelector(selector) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        if (extra) Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // 🔐 Core Web Vitals: preconnect & dns-prefetch to critical third parties
    setLink("preconnect", "https://fonts.googleapis.com");
    setLink("preconnect", "https://fonts.gstatic.com", { crossorigin: "anonymous" });
    setLink("dns-prefetch", "https://www.google-analytics.com");
    setLink("dns-prefetch", "https://www.googletagmanager.com");

    // 🖼️ Favicon & Apple Touch Icon (HTTPS on www.dia-co.ir)
    setLink("icon", SEO_IMAGES.logoIco);
    setLink("apple-touch-icon", SEO_IMAGES.appleTouch);
    setLink("mask-icon", SEO_IMAGES.logoSmall);

    // 🎨 Theme Color for mobile browsers (nice Core Web Vitals UX signal)
    setMeta("name", "theme-color", "#0a1128");
    setMeta("name", "msapplication-TileColor", "#0a1128");
    setMeta("name", "apple-mobile-web-app-capable", "yes");
    setMeta("name", "apple-mobile-web-app-status-bar-style", "black-translucent");
    setMeta("name", "format-detection", "telephone=no");

    // 📝 Standard SEO meta
    setMeta("name", "description", seo.description);
    setMeta("name", "keywords", seo.keywords);
    setMeta("name", "author", SITE_NAME_FA);
    setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta("name", "googlebot", "index, follow, max-image-preview:large");
    setMeta("name", "google-site-verification", "YOUR_DIAKO_GSC_TOKEN_HERE");

    // 🌍 OpenGraph (Facebook / LinkedIn / WhatsApp preview)
    setMeta("property", "og:type", seo.schemaType === "Article" ? "article" : "website");
    setMeta("property", "og:site_name", SITE_NAME_FA);
    setMeta("property", "og:title", finalTitle);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", heroImage);
    setMeta("property", "og:image:secure_url", heroImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:type", "image/jpeg");
    setMeta("property", "og:image:alt", `${SITE_NAME_FA} — ${seo.h1}`);
    setMeta("property", "og:locale", isDeLocale ? "de_AT" : "fa_IR");
    setMeta("property", "og:locale:alternate", isDeLocale ? "fa_IR" : "de_AT");

    // 🐦 Twitter / X Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", "@diako_immigration");
    setMeta("name", "twitter:creator", "@diako_immigration");
    setMeta("name", "twitter:title", finalTitle);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:image", heroImage);
    setMeta("name", "twitter:image:alt", `${SITE_NAME_FA} — ${seo.h1}`);

    // 🔗 Canonical & Hreflang
    setLink("canonical", canonicalUrl);
    setLink("alternate", faFullUrl, { hreflang: "fa-IR" });
    setLink("alternate", deFullUrl, { hreflang: "de-AT" });
    setLink("alternate", faFullUrl, { hreflang: "x-default" });

    // ========== 🧬 JSON-LD Structured Data (Rich Results & AI Overviews) ==========
    const schemaId = "diako-seo-jsonld";
    let scriptEl = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = schemaId;
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }

    // 1) ImageObject — critical for Google Images & rich previews
    const imageObject = {
      "@type": "ImageObject",
      "@id": `${canonicalUrl}#primaryimage`,
      url: heroImage,
      contentUrl: heroImage,
      width: { "@type": "QuantitativeValue", value: 1200 },
      height: { "@type": "QuantitativeValue", value: 630 },
      caption: `${SITE_NAME_FA} — ${seo.h1}`,
      name: `${seo.h1} | ${SITE_NAME_FA}`,
      representativeOfPage: true,
      inLanguage: isDeLocale ? "de-AT" : "fa-IR"
    };

    // 2) Logo ImageObject
    const logoImage = {
      "@type": "ImageObject",
      "@id": `${SITE_DOMAIN}/#logo`,
      url: SEO_IMAGES.logo,
      contentUrl: SEO_IMAGES.logo,
      width: { "@type": "QuantitativeValue", value: 512 },
      height: { "@type": "QuantitativeValue", value: 512 },
      caption: `${SITE_NAME_FA} - لوگو رسمی`
    };

    // 3) Organization with Logo + contactPoint
    const organizationJson = {
      "@type": "Organization",
      "@id": `${SITE_DOMAIN}/#organization`,
      name: SITE_NAME_FA,
      alternateName: SITE_NAME_EN,
      url: `${SITE_DOMAIN}/`,
      logo: logoImage,
      image: logoImage,
      description: `${SITE_NAME_FA}؛ هلدینگ تخصصی مهاجرت، اقامت و راهنمای زندگی در اتریش برای فارسی‌زبانان.`,
      email: "info@dia-co.ir",
      telephone: "+43-688-9763256",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Wien",
        addressCountry: "AT"
      },
      areaServed: [
        { "@type": "Country", name: "Austria" },
        { "@type": "Country", name: "Iran" }
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+43-688-9763256",
          contactType: "customer service",
          areaServed: "AT",
          availableLanguage: ["Persian", "German", "English"]
        },
        {
          "@type": "ContactPoint",
          telephone: "+98-930-622-9790",
          contactType: "customer service",
          areaServed: "IR",
          availableLanguage: ["Persian", "English"]
        }
      ],
      sameAs: [
        "https://t.me/OTRISH_IRAN",
        "https://instagram.com/otrish__iran",
        "https://t.me/Otrish_neshin",
        "https://www.facebook.com/otrish.neshin"
      ]
    };

    // 4) WebSite with SearchAction
    const websiteJson = {
      "@type": "WebSite",
      "@id": `${SITE_DOMAIN}/#website`,
      url: `${SITE_DOMAIN}/`,
      name: SITE_NAME_FA,
      alternateName: SITE_NAME_EN,
      description: seo.description,
      publisher: { "@id": `${SITE_DOMAIN}/#organization` },
      inLanguage: isDeLocale ? "de-AT" : "fa-IR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_DOMAIN}/?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };

    // 5) BreadcrumbList
    const breadcrumbsJson = {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: SITE_NAME_FA,
          item: `${SITE_DOMAIN}/`
        },
        ...(canonicalPath !== "/"
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: seo.categoryName,
                item: `${SITE_DOMAIN}${canonicalPath}`
              },
              {
                "@type": "ListItem",
                position: 3,
                name: seo.breadcrumbName,
                item: canonicalUrl
              }
            ]
          : [])
      ]
    };

    // 6) Page-specific (WebPage / Article)
    const pageSpecificJson: any = {
      "@type": seo.schemaType === "Article" ? "Article" : "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: finalTitle,
      headline: seo.h1,
      description: seo.description,
      inLanguage: isDeLocale ? "de-AT" : "fa-IR",
      primaryImageOfPage: { "@id": `${canonicalUrl}#primaryimage` },
      isPartOf: { "@id": `${SITE_DOMAIN}/#website` },
      about: { "@id": `${SITE_DOMAIN}/#organization` },
      breadcrumb: { "@id": `${canonicalUrl}#breadcrumbs` },
      ...(seo.schemaType === "Article"
        ? {
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
            author: { "@id": `${SITE_DOMAIN}/#organization` },
            publisher: { "@id": `${SITE_DOMAIN}/#organization` },
            image: [heroImage]
          }
        : {})
    };

    // 7) LocalBusiness (Vienna)
    const localBusinessJson = {
      ...getLocalBusinessSchema(),
      "@id": `${SITE_DOMAIN}/#localbusiness`,
      name: SITE_NAME_FA,
      image: SEO_IMAGES.ogHome,
      logo: SEO_IMAGES.logo,
      url: `${SITE_DOMAIN}/`,
      telephone: "+43-688-9763256",
      email: "info@dia-co.ir"
    };

    // 8) FAQ / HowTo schemas
    const geoFaqJson = getGeoFaqPageSchema();
    const geoHowToJson = getGeoHowToSchema();

    const graphElements: any[] = [
      organizationJson,
      websiteJson,
      breadcrumbsJson,
      pageSpecificJson,
      imageObject,
      localBusinessJson,
      geoFaqJson,
      geoHowToJson
    ];

    // 9) Per-segment FAQ
    if (seo.faqs && seo.faqs.length > 0) {
      graphElements.push({
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: seo.faqs.map((f: any) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a }
        }))
      });
    }

    const multiSchema = {
      "@context": "https://schema.org",
      "@graph": graphElements
    };

    scriptEl.textContent = JSON.stringify(multiSchema);

    setSeoState({
      title: finalTitle,
      description: seo.description,
      keywords: seo.keywords,
      schema: [multiSchema],
      image: heroImage,
    });
  }, [activeSegment, isDeLocale]);

  const showOptimizationToast = (message: string) => toast.success(message);

  // ⏰ Vienna Clock & Greeting
  useEffect(() => {
    const updateTimeAndGreeting = () => {
      try {
        const d = new Date();
        const formatter = new Intl.DateTimeFormat("fa-IR", {
          timeZone: "Europe/Vienna",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setViennaTime(formatter.format(d));

        const viennaHourStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Europe/Vienna",
          hour: "numeric",
          hour12: false,
        }).format(d);
        const viennaHour = parseInt(viennaHourStr, 10);

        if (viennaHour >= 5 && viennaHour < 12) setViennaGreeting("صبح آلپی شما بخیر 🌄");
        else if (viennaHour >= 12 && viennaHour < 17) setViennaGreeting("روز زیبای اتریشی شما بخیر ☀️");
        else if (viennaHour >= 17 && viennaHour < 21) setViennaGreeting("عصر آرام اتریشی بخیر 🍷");
        else setViennaGreeting("شب رویایی دنج در دل آلپ بخیر 🌌");
      } catch (e) {
        setViennaTime(new Date().toLocaleTimeString("fa-IR"));
        setViennaGreeting("خوش آمدید 🇦🇹");
      }
    };
    updateTimeAndGreeting();
    const interval = setInterval(updateTimeAndGreeting, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTickerHeight = () => {
      if (newsTickerRef.current) setTickerHeight(newsTickerRef.current.offsetHeight);
    };
    updateTickerHeight();
    window.addEventListener("resize", updateTickerHeight);
    return () => window.removeEventListener("resize", updateTickerHeight);
  }, [austriaNews, isNewsLoading]);

  useEffect(() => {
    const handleScroll = () => setIsNavDocked(window.scrollY > 90);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerSparkleFest = () => {
    setSparkleActive(true);
    setSparkleCount((prev) => prev + 1);
    setTimeout(() => setSparkleActive(false), 800);
  };

  return (
    <>
      {/* 🎯 Dynamic SEO Head (React Helmet replacement) */}
      <SEO
        title={seoState.title}
        description={seoState.description}
        keywords={seoState.keywords}
        schemaData={seoState.schema}
        image={seoState.image}
        canonicalUrl={`${SITE_DOMAIN}${SEGMENT_TO_PATH_MAP[activeSegment] || "/"}`}
        siteName={SITE_NAME_FA}
      />

      <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col justify-between font-sans selection:bg-red-200" dir="rtl">
        {/* 🇦🇹 Austrian flag bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-white to-red-600 block" aria-hidden="true" />

        {/* 📰 Live News Ticker */}
        <div ref={newsTickerRef} className="sticky top-0 z-50 w-full bg-stone-950/95 backdrop-blur-md shadow-md border-b border-stone-800">
          <div className="max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 py-1.5 sm:py-2">
            <LiveNewsTicker
              austriaNews={austriaNews}
              isNewsLoading={isNewsLoading}
              onOpenNews={() => {
                setIsNewsModalOpen(true);
                trackEvent("open_news_hub_modal", "interaction", { count: austriaNews.length });
              }}
              onOpenMobileMenu={() => setIsMobileNavOpen(true)}
            />
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 flex-1">
          <SuperAppHeader
            activeSegment={activeSegment}
            onSelectSegment={(segment) => {
              setActiveSegment(segment);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onOpenSearch={() => setIsSearchModalOpen(true)}
            onOpenNews={() => {
              setIsNewsModalOpen(true);
              trackEvent("open_news_hub_modal", "interaction", { count: austriaNews.length });
            }}
            onOpenMobileMenu={() => setIsMobileNavOpen(true)}
            viennaTime={viennaTime}
            viennaGreeting={viennaGreeting}
            sparkleActive={sparkleActive}
            triggerSparkleFest={triggerSparkleFest}
            austriaNews={austriaNews}
            isNewsLoading={isNewsLoading}
            showNavigation={false}
            showHeroStrip={false}
            isDeLocale={isDeLocale}
            onToggleDeLocale={toggleDeLocale}
          />

          <div
            style={{ top: `${tickerHeight}px` }}
            className="sticky top-0 desktop:sticky z-40 w-full transition-all duration-200"
          >
            <SuperAppNavigationBar
              activeSegment={activeSegment}
              onSelectSegment={(segment) => {
                setActiveSegment(segment);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              isDocked={isNavDocked}
              onOpenMobileMenu={() => setIsMobileNavOpen(true)}
              onOpenSearch={() => setIsSearchModalOpen(true)}
              onOpenNews={() => {
                setIsNewsModalOpen(true);
                trackEvent("open_news_hub_modal", "interaction", { count: austriaNews.length });
              }}
            />
          </div>

          <main className="space-y-8 min-h-[400px]">
            <Suspense
              fallback={
                <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-stone-200 shadow-sm min-h-[350px] text-center font-sans space-y-4 animate-pulse">
                  <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                  <div className="space-y-1">
                    <p className="text-stone-800 font-black text-[13px]">در حال آماده‌سازی و بارگذاری بخش مربوطه...</p>
                    <p className="text-stone-400 font-medium text-[11px] font-mono">Loading module... Please wait 🇦🇹</p>
                  </div>
                </div>
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSegment}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="space-y-8"
                >
                  {isDeLocale ? (
                    <AustrianGermanPage
                      segment={activeSegment}
                      onNavigateFa={(seg) => {
                        setIsDeLocale(false);
                        setActiveSegment(seg);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      onSwitchToFarsi={() => toggleDeLocale(false)}
                      onOpenTool={(toolId) => {
                        setIsDeLocale(false);
                        setActiveSegment(toolId);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  ) : activeSegment === "home" ? (
                    <div className="space-y-10 text-right">
                      <SuperAppLauncher
                        onSelectPage={(seg) => {
                          setActiveSegment(seg);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        onOpenSearch={() => setIsSearchModalOpen(true)}
                      />
                      <NewsArchiveHub
                        news={austriaNews}
                        newsLastUpdated={newsLastUpdated}
                        onRefresh={() => fetchAustriaNewsList(true)}
                        isNewsLoading={isNewsLoading}
                        onOpenModal={() => {
                          setIsNewsModalOpen(true);
                          trackEvent("open_news_hub_modal", "interaction", { source: "home_archive_hub" });
                        }}
                      />
                      <AustriaMainDashboard
                        onNavigate={(seg) => setActiveSegment(seg)}
                        setSelectedCity={setSelectedCity}
                        onOpenNews={() => {
                          setIsNewsModalOpen(true);
                          trackEvent("open_news_hub_modal", "interaction", { source: "dashboard_newsalerts" });
                        }}
                      />
                    </div>
                  ) : (
                    <SuperAppPageLayout
                      pageId={activeSegment}
                      onNavigate={(seg) => {
                        setActiveSegment(seg);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      {activeSegment === "clusters" && (
                        <div className="space-y-8 text-right">
                          <ContentClustersSection
                            onNavigate={(seg) => {
                              setActiveSegment(seg);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          />
                        </div>
                      )}
                      {(activeSegment === "international-seo" || activeSegment === "seo") && (
                        <div className="space-y-8 text-right">
                          <InternationalSeoSection
                            onNavigate={(seg) => {
                              setActiveSegment(seg);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            currentSegment={activeSegment}
                            isDeLocale={isDeLocale}
                            onToggleDeLocale={toggleDeLocale}
                          />
                        </div>
                      )}
                      {(activeSegment === "geo-optimization" || activeSegment === "geo") && (
                        <div className="space-y-8 text-right">
                          <AiGeoOptimizationHub
                            onNavigate={(seg) => {
                              setActiveSegment(seg);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          />
                        </div>
                      )}

                      {/* ============ SEGMENTS ============ */}
                      {activeSegment === "tracker" && (
                        <div className="space-y-8 text-right">
                          <ResidenceTracker />
                          <ImmigrationDirectory onNavigate={(seg) => setActiveSegment(seg)} />
                          <VafWorkAssistant />
                          <LocalExperienceMapper />
                        </div>
                      )}
                      {activeSegment === "finance" && (
                        <div className="space-y-8 text-right">
                          <CostOfLiving />
                          <BruttoNettoCalculator />
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans">
                            <TaxCalculator />
                          </div>
                          <FinancialSmartManager />
                        </div>
                      )}
                      {activeSegment === "mapper" && (
                        <div className="space-y-8 text-right">
                          <ServiceFinder selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
                          <LocalExperienceMapper />
                        </div>
                      )}
                      {activeSegment === "german" && (
                        <div className="space-y-8 text-right">
                          <SurvivalGerman />
                          <InterpreterAcademy />
                          <IntegrationAcademy />
                          <GoldenRules />
                          <DigitalPaperworkWizard />
                        </div>
                      )}
                      {activeSegment === "carpool" && (
                        <div className="space-y-8 text-right">
                          <CarpoolNetworking />
                          <TrolutCrowdshipping />
                          <ForumDiscussion />
                          <AustriaClassifiedsBlock />
                          <Divar />
                        </div>
                      )}
                      {(activeSegment === "visa-samples" || activeSegment === "trust-examples") && (
                        <div className="space-y-8 text-right">
                          <DocumentSamples onNavigate={(segment) => setActiveSegment(segment as any)} />
                        </div>
                      )}
                      {activeSegment === "smart" && (
                        <div className="space-y-8 text-right">
                          <SmartSystems />
                          <WohnbeihilfeBlock />
                        </div>
                      )}
                      {activeSegment === "about" && (
                        <div className="space-y-8 text-right">
                          <AboutContactNew />
                        </div>
                      )}
                      {activeSegment === "immigration-assessment" && (
                        <div className="space-y-8 text-right">
                          <ImmigrationAssessment />
                        </div>
                      )}
                      {activeSegment === "stories" && (
                        <div className="space-y-8 text-right">
                          <ExperienceGallery />
                        </div>
                      )}
                      {activeSegment === "compare" && (
                        <div className="space-y-8 text-right">
                          <ComparisonWizard onSelectSegment={setActiveSegment} />
                        </div>
                      )}
                      {activeSegment === "glossary" && (
                        <div className="space-y-8 text-right">
                          <AdministrativeGlossary />
                        </div>
                      )}
                      {activeSegment === "wizard" && (
                        <div className="space-y-8 text-right">
                          <VisaSuitabilityWizard />
                        </div>
                      )}
                      {activeSegment === "compare-living" && (
                        <div className="space-y-8 text-right">
                          <CostOfLivingComparison />
                        </div>
                      )}
                      {activeSegment === "forms" && (
                        <div className="space-y-8 text-right">
                          <FormDownloadLibrary />
                        </div>
                      )}
                      {activeSegment === "schools" && (
                        <div className="space-y-8 text-right">
                          <SchoolDirectory />
                        </div>
                      )}
                      {activeSegment === "calculator" && (
                        <div className="space-y-8 text-right">
                          <VisaCalculator />
                        </div>
                      )}
                      {activeSegment === "exchange" && (
                        <div className="space-y-8 text-right">
                          <ExchangeRateWidget />
                        </div>
                      )}
                      {activeSegment === "insurance" && (
                        <div className="space-y-8 text-right">
                          <InsuranceFilterDirectory />
                        </div>
                      )}
                      {activeSegment === "district" && (
                        <div className="space-y-8 text-right">
                          <DistrictGuide />
                        </div>
                      )}
                      {activeSegment === "experts" && (
                        <div className="space-y-8 text-right">
                          <ExpertProfile />
                        </div>
                      )}
                      {activeSegment === "translators" && (
                        <div className="space-y-8 text-right">
                          <TranslatorDirectory />
                        </div>
                      )}
                      {activeSegment === "factcheck" && (
                        <div className="space-y-8 text-right">
                          <FactCheckArticles />
                        </div>
                      )}
                      {activeSegment === "nova" && (
                        <div className="space-y-8 text-right">
                          <NoVACalculator />
                        </div>
                      )}
                      {activeSegment === "offers" && (
                        <div className="space-y-8 text-right">
                          <OfferDirectory />
                        </div>
                      )}
                      {activeSegment === "student-finance" && (
                        <div className="space-y-8 text-right">
                          <StudentFinanceCalculator />
                        </div>
                      )}
                      {activeSegment === "willhaben" && (
                        <div className="space-y-8 text-right">
                          <WillhabenGuide />
                        </div>
                      )}
                      {activeSegment === "neighborhood" && (
                        <div className="space-y-8 text-right">
                          <NeighborhoodComparison />
                        </div>
                      )}
                      {activeSegment === "volunteer" && (
                        <div className="space-y-8 text-right">
                          <VolunteerDirectory />
                        </div>
                      )}
                      {activeSegment === "holidays" && (
                        <div className="space-y-8 text-right">
                          <PublicHolidayCalendar />
                        </div>
                      )}
                      {activeSegment === "license" && (
                        <div className="space-y-8 text-right">
                          <DrivingLicenseGuide />
                        </div>
                      )}
                      {activeSegment === "real-estate" && (
                        <div className="space-y-8 text-right">
                          <RealEstateTaxCalculator />
                        </div>
                      )}
                      {activeSegment === "supplemental" && (
                        <div className="space-y-8 text-right">
                          <InsuranceSupplementalGuide />
                        </div>
                      )}
                      {activeSegment === "id-austria" && (
                        <div className="space-y-8 text-right">
                          <IdAustriaGuide />
                        </div>
                      )}
                      {activeSegment === "tax-reg" && (
                        <div className="space-y-8 text-right">
                          <TaxRegistrationGuide />
                        </div>
                      )}
                      {activeSegment === "criminal-record" && (
                        <div className="space-y-8 text-right">
                          <CriminalRecordGuide />
                        </div>
                      )}
                      {activeSegment === "nostrification" && (
                        <div className="space-y-8 text-right">
                          <NostrificationGuide />
                        </div>
                      )}
                      {activeSegment === "banks" && (
                        <div className="space-y-8 text-right">
                          <BankExchangeDirectory />
                        </div>
                      )}
                      {activeSegment === "aml" && (
                        <div className="space-y-8 text-right">
                          <MoneyLaunderingInfo />
                        </div>
                      )}
                      {activeSegment === "transport" && (
                        <div className="space-y-8 text-right">
                          <PublicTransportGuide />
                        </div>
                      )}
                      {activeSegment === "inspection" && (
                        <div className="space-y-8 text-right">
                          <VehicleInspectionGuide />
                        </div>
                      )}
                      {activeSegment === "parking" && (
                        <div className="space-y-8 text-right">
                          <ParkingGuide />
                        </div>
                      )}
                      {activeSegment === "grocery" && (
                        <div className="space-y-8 text-right">
                          <GroceryDirectory />
                        </div>
                      )}
                      {activeSegment === "shopping" && (
                        <div className="space-y-8 text-right">
                          <ShoppingGuide />
                        </div>
                      )}
                      {activeSegment === "christmas" && (
                        <div className="space-y-8 text-right">
                          <ChristmasMarketGuide />
                        </div>
                      )}
                      {activeSegment === "danube" && (
                        <div className="space-y-8 text-right">
                          <DanubeFestivalGuide />
                        </div>
                      )}
                      {activeSegment === "ski" && (
                        <div className="space-y-8 text-right">
                          <SkiResortGuide />
                        </div>
                      )}
                      {activeSegment === "pool" && (
                        <div className="space-y-8 text-right">
                          <PoolTicketGuide />
                        </div>
                      )}
                      {activeSegment === "theory-test" && (
                        <div className="space-y-8 text-right">
                          <TheoryExamTest />
                        </div>
                      )}
                      {(activeSegment === "ma35" || activeSegment === "appointment") && (
                        <div className="space-y-8 text-right">
                          <AppointmentsManager />
                        </div>
                      )}
                      {activeSegment === "citizenship" && (
                        <div className="space-y-8 text-right">
                          <CitizenshipGuide />
                        </div>
                      )}
                      {activeSegment === "bank-compare" && (
                        <div className="space-y-8 text-right">
                          <BankComparisonGuide />
                        </div>
                      )}
                      {activeSegment === "kindergarten" && (
                        <div className="space-y-8 text-right">
                          <KindergartenGuide />
                        </div>
                      )}
                      {activeSegment === "supplemental-insurance" && (
                        <div className="space-y-8 text-right">
                          <SupplementalInsuranceGuide />
                        </div>
                      )}
                      {activeSegment === "pension-guide" && (
                        <div className="space-y-8 text-right">
                          <PensionGuide />
                        </div>
                      )}
                      {activeSegment === "liability-insurance" && (
                        <div className="space-y-8 text-right">
                          <LiabilityInsuranceGuide />
                        </div>
                      )}
                      {activeSegment === "willhaben-security" && (
                        <div className="space-y-8 text-right">
                          <WillhabenSecurityGuide />
                        </div>
                      )}
                      {activeSegment === "organic-markets" && (
                        <div className="space-y-8 text-right">
                          <OrganicMarketsGuide />
                        </div>
                      )}
                      {activeSegment === "halal-directory" && (
                        <div className="space-y-8 text-right">
                          <HalalDirectory />
                        </div>
                      )}
                      {activeSegment === "marriage-divorce" && (
                        <div className="space-y-8 text-right">
                          <MarriageDivorceGuide />
                        </div>
                      )}
                      {activeSegment === "tax-return" && (
                        <div className="space-y-8 text-right">
                          <TaxReturnGuide />
                        </div>
                      )}
                      {activeSegment === "freelance-tax" && (
                        <div className="space-y-8 text-right">
                          <FreelanceTaxHub />
                        </div>
                      )}
                      {activeSegment === "familienbonus" && (
                        <div className="space-y-8 text-right">
                          <FamilienbonusGuide />
                        </div>
                      )}
                      {activeSegment === "education-wifi-bfi" && (
                        <div className="space-y-8 text-right">
                          <WifiBfiGuide />
                        </div>
                      )}
                      {activeSegment === "accounting-career" && (
                        <div className="space-y-8 text-right">
                          <AccountingCareerGuide />
                        </div>
                      )}
                      {activeSegment === "klimaticket" && (
                        <div className="space-y-8 text-right">
                          <KlimaTicketGuide />
                        </div>
                      )}
                      {activeSegment === "traffic-fine-appeal" && (
                        <div className="space-y-8 text-right">
                          <TrafficFineAppealGuide />
                        </div>
                      )}
                      {activeSegment === "rwr-calculator" && (
                        <div className="space-y-8 text-right">
                          <RWRPunterRechner />
                        </div>
                      )}
                      {activeSegment === "residency-conditions" && (
                        <div className="space-y-8 text-right">
                          <ResidencyConditionGuide />
                        </div>
                      )}
                      {activeSegment === "student-grad-guide" && (
                        <div className="space-y-8 text-right">
                          <StudentGradRelocationGuide />
                        </div>
                      )}
                      {activeSegment === "willhaben-furniture" && (
                        <div className="space-y-8 text-right">
                          <WillhabenFurnitureGuide />
                        </div>
                      )}
                      {activeSegment === "discounter-guide" && (
                        <div className="space-y-8 text-right">
                          <DiscounterGuide />
                        </div>
                      )}
                      {activeSegment === "obb-vorteilscard" && (
                        <div className="space-y-8 text-right">
                          <ObbVorteilscardGuide />
                        </div>
                      )}
                      {activeSegment === "contract-cancellation" && (
                        <div className="space-y-8 text-right">
                          <ContractCancellationGuide />
                        </div>
                      )}
                      {activeSegment === "housesearch" && (
                        <div className="space-y-8 text-right">
                          <SmartHouseSearch />
                        </div>
                      )}
                      {activeSegment === "doccheck" && (
                        <div className="space-y-8 text-right">
                          <InitialDocumentCheck />
                        </div>
                      )}
                      {activeSegment === "ratings" && (
                        <div className="space-y-8 text-right">
                          <ServiceRatingsPortal />
                        </div>
                      )}
                      {activeSegment === "betriebskosten" && (
                        <div className="space-y-8 text-right">
                          <BetriebskostenGuide />
                        </div>
                      )}
                      {activeSegment === "mutter-kind-pass" && (
                        <div className="space-y-8 text-right">
                          <MutterKindPassGuide />
                        </div>
                      )}
                      {activeSegment === "kassenarzt-directory" && (
                        <div className="space-y-8 text-right">
                          <KassenarztDirectory />
                        </div>
                      )}
                      {activeSegment === "opera-standing-tickets" && (
                        <div className="space-y-8 text-right">
                          <OperaStandingTicketGuide />
                        </div>
                      )}
                      {activeSegment === "stadtwanderwege" && (
                        <div className="space-y-8 text-right">
                          <StadtwanderwegeGuide />
                        </div>
                      )}
                      {activeSegment === "id-austria-guide" && (
                        <div className="space-y-8 text-right">
                          <IdAustriaActivationGuide />
                        </div>
                      )}
                      {activeSegment === "phishing-security" && (
                        <div className="space-y-8 text-right">
                          <PhishingSecurityGuide />
                        </div>
                      )}
                      {activeSegment === "events" && (
                        <div className="space-y-8 text-right">
                          <IranianEventsCalendar />
                        </div>
                      )}
                      {activeSegment === "ecosystem" && (
                        <div className="space-y-8 text-right">
                          <EcosystemPortal />
                        </div>
                      )}
                    </SuperAppPageLayout>
                  )}
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </main>

          {/* ⚠️ Disclaimer */}
          <section className="bg-rose-50 border border-stone-200 rounded-2xl p-5 flex items-start gap-4 text-right">
            <AlertOctagon className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-extrabold text-stone-900 text-xs sm:text-sm">سلب مسئولیت رسمی و حقوقی همراهان:</h5>
              <p className="text-[11px] text-stone-500 font-bold leading-relaxed">
                تمامی ابزارها و خدمات ارائه شده در این پورتال — اعم از شبیه‌سازهای مالیاتی، سامانه‌های پایش وقت‌های اداری شهرداری‌ها و راهنماهای معادل‌سازی مدارک — صرفاً با هدف اطلاع‌رسانی، راهنمایی اولیه و همیاری داوطلبانه با هموطنان عزیز طراحی شده است. این اطلاعات به هیچ‌عنوان جایگزین قوانین رسمی، کارشناسی حقوقی یا مشاوره اداری تخصصی نمی‌باشد. متقاضیان موظفند جهت اقدام نهایی و قطعی، مدارک و شرایط خود را مستقیماً از طریق مراجع ذی‌صلاح قانونی استعلام و تصدیق دهند. این پورتال هیچ‌گونه مسئولیت حقوقی در قبال تصمیمات اتخاذ شده بر اساس این داده‌ها بر عهده نمی‌گیرد.
              </p>
            </div>
          </section>
        </div>

        {/* 🏢 MINIMALIST MODERN FOOTER */}
        <footer
          className="bg-[#0c0d10] border-t border-stone-800/80 text-stone-400 text-right mt-16 w-full text-xs font-sans selection:bg-red-900/50"
          dir="rtl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Top Row: Brand & Socials */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-800/60">
              {/* Brand info */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-700/60 p-1 flex items-center justify-center shrink-0 shadow-sm">
                  <img
                    src={otrishLogo}
                    alt={`لوگوی رسمی ${SITE_NAME_FA}`}
                    width="28"
                    height="28"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/otrish_logo.png";
                    }}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-stone-100 tracking-tight">{SITE_NAME_FA}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/50 font-black">
                      اتریش 🇦🇹
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400 font-bold mt-0.5">
                    سامانه مستقل همیاری ایرانیان و فارسی‌زبانان مقیم اتریش — ۶۰+ ابزار و سرویس تخصصی رایگان
                  </p>
                </div>
              </div>

              {/* Minimal Social & Contact Links */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <a
                  href="https://t.me/OTRISH_IRAN"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-sky-400 transition-colors text-[10px] font-bold"
                  aria-label="کانال تلگرام اتریش‌نشین"
                >
                  <Send className="w-3 h-3 text-sky-400 shrink-0" />
                  <span className="font-mono text-[9px] dir-ltr">OTRISH_IRAN@</span>
                </a>

                <a
                  href="https://instagram.com/otrish__iran"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-pink-400 transition-colors text-[10px] font-bold"
                  aria-label="اینستاگرام اتریش‌نشین"
                >
                  <Instagram className="w-3 h-3 text-pink-400 shrink-0" />
                  <span className="font-mono text-[9px] dir-ltr">otrish__iran@</span>
                </a>

                <a
                  href="https://wa.me/436889763256"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-emerald-400 transition-colors text-[10px] font-bold"
                  aria-label="واتس‌اپ اتریش‌نشین"
                >
                  <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="font-mono text-[9px] dir-ltr">+43 688 9763256</span>
                </a>

                <a
                  href="https://www.facebook.com/otrish.neshin"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 h-8 px-2 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-blue-400 transition-colors text-[10px] font-bold"
                  aria-label="فیسبوک اتریش‌نشین"
                >
                  <Facebook className="w-3 h-3 text-blue-400 shrink-0" />
                </a>
              </div>
            </div>

            {/* Middle Row: Minimal Quick Navigation Links */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-[11px] font-bold text-stone-400">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <button
                  onClick={() => {
                    setActiveSegment("rwr-calculator");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  کارت سرخ-سفید-سرخ
                </button>
                <span className="text-stone-700">•</span>
                <button
                  onClick={() => {
                    setActiveSegment("finance");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  محاسبه حقوق Brutto-Netto
                </button>
                <span className="text-stone-700">•</span>
                <button
                  onClick={() => {
                    setActiveSegment("ma35");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  پایش نوبت MA35
                </button>
                <span className="text-stone-700">•</span>
                <button
                  onClick={() => {
                    setActiveSegment("kassenarzt-directory");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  پزشکان بیمه ÖGK
                </button>
                <span className="text-stone-700">•</span>
                <button
                  onClick={() => {
                    setActiveSegment("housesearch");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  راهنمای مسکن وین
                </button>
                <span className="text-stone-700">•</span>
                <button
                  onClick={() => {
                    setActiveSegment("german");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  آموزش زبان آلمانی
                </button>
                <span className="text-stone-700">•</span>
                <button
                  onClick={() => {
                    setIsNewsModalOpen(true);
                  }}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  اخبار و قوانین اتریش
                </button>
              </div>

              <div className="font-mono text-[10px] text-stone-400 dir-ltr">
                https://otrish-iran.ir
              </div>
            </div>

            {/* Bottom Row: Minimal Copyright & Utilities */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-stone-800/60 text-[10.5px] text-stone-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span>
                  © ۲۰۲۶ {SITE_NAME_FA} — تمام حقوق محفوظ است. خدمات و ابزارها رایگان می‌باشند.
                </span>
              </div>

              {/* Utility buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: SITE_NAME_FA,
                          url: window.location.href,
                          text: `${SITE_NAME_FA} — پورتال خدمات فارسی‌زبانان مقیم اتریش`
                        })
                        .catch(console.error);
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("لینک سایت کپی شد!");
                    }
                  }}
                  className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-200 transition-colors text-[9.5px] font-bold cursor-pointer"
                >
                  <Share2 className="w-3 h-3" />
                  <span>اشتراک‌گذاری</span>
                </button>

                <button
                  onClick={() => setIsAuditModalOpen(true)}
                  className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-emerald-400 transition-colors text-[9.5px] font-bold cursor-pointer"
                  title="مشاهده لاگ‌های امنیتی سامانه"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>امنیت</span>
                </button>

                <button
                  onClick={() => {
                    setAuthModalTargetAction("ورود به پنل مدیریت و نظارت");
                    setIsAuthModalOpen(true);
                  }}
                  className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-md transition-colors text-[9.5px] font-bold cursor-pointer border ${
                    activeSession
                      ? "bg-amber-950/40 text-amber-300 border-amber-800/60 hover:bg-amber-900/40"
                      : "bg-stone-900 hover:bg-stone-800 border-stone-800 text-stone-400 hover:text-blue-400"
                  }`}
                  title="ورود مدیریت"
                >
                  <KeyRound className="w-3 h-3 text-blue-400" />
                  <span>{activeSession ? `مدیر (${activeSession.username})` : "ورود مدیریت"}</span>
                </button>
              </div>
            </div>
          </div>
        </footer>

        {/* 🇦🇹 TRANSFERRED AUSTRIA RESIDENT BRAND & COMMUNITY STRIP (زیر فوتر اصلی) */}
        <div className="bg-[#0f1015] border-t border-stone-800/90 py-5 px-4 sm:px-6 lg:px-8 text-right font-sans" dir="rtl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 order-2 md:order-1">
              <AustriaResidentLogo size={32} variant="light" />
            </div>
            <div className="text-center md:text-right text-[11px] text-stone-400 font-bold order-1 md:order-2 leading-relaxed">
              <p className="text-stone-300">© ۲۰۲۶ اتریش‌نشین | Austria Resident — تمام حقوق محفوظ است.</p>
              <p className="font-mono text-stone-500 text-[10px] mt-0.5" dir="ltr">Made with ❤️ for Iranian expats in Austria</p>
            </div>
            <div className="flex items-center gap-2 order-3">
              <a
                href="https://t.me/OTRISH_IRAN"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-stone-700 bg-stone-900/80 flex items-center justify-center text-stone-400 hover:text-red-400 hover:border-red-500/50 transition-colors cursor-pointer"
                title="کانال تلگرام اتریش‌نشین"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-stone-700 bg-stone-900/80 flex items-center justify-center text-stone-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors cursor-pointer"
                title="پشتیبانی واتس‌اپ"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.dia-co.ir"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-stone-700 bg-stone-900/80 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors cursor-pointer"
                title="وبسایت هولدینگ مهاجرتی دیاکو"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ============================================================
            14) SEO-RICH FOOTER CONTENT (زیر بخش فوتر اصلی)
           ============================================================ */}
        <div className="bg-[#08090b] border-t border-stone-850 py-8 px-4 sm:px-6 lg:px-8 text-right text-xs font-sans selection:bg-red-900/50" dir="rtl" itemScope itemType="https://schema.org/WPFooter">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-400">
              <div className="space-y-2">
                <h4 className="text-xs font-black text-stone-200 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#C8102E]" />
                  درباره اتریش‌نشین
                </h4>
                <p className="text-[11px] text-stone-400 font-medium leading-relaxed">
                  اتریش‌نشین یک پلتفرم مستقل و غیرانتفاعی است که به منظور تسهیل مسیر ادغام، اقامت و زندگی فارسی‌زبانان در اتریش طراحی شده است.
                  تمام اطلاعات بر اساس منابع رسمی اتریش (migration.gv.at, ÖGK, AMS, MA35, Wien.gv.at) به‌روزرسانی می‌شود.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-black text-stone-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  شهرهای تحت پوشش
                </h4>
                <ul className="text-[11px] text-stone-400 font-medium leading-relaxed space-y-1">
                  <li>• وین (Wien) — پایتخت و بزرگترین شهر اتریش</li>
                  <li>• گراتس (Graz) — پایتخت ایالت اشتایرمارک</li>
                  <li>• لینتس (Linz) — اتریش علیا</li>
                  <li>• سالزبورگ (Salzburg) — شهر موتزارت</li>
                  <li>• اینسبروک (Innsbruck) — قلب آلپ</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-black text-stone-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  خدمات کلیدی
                </h4>
                <ul className="text-[11px] text-stone-400 font-medium leading-relaxed space-y-1">
                  <li>• مشاوره اقامت و ویزا</li>
                  <li>• محاسبه‌گر Brutto-Netto و مالیات</li>
                  <li>• دایرکتوری پزشکان فارسی‌زبان ÖGK</li>
                  <li>• مسکن و Gemeindewohnung</li>
                  <li>• آموزش آلمانی اتریشی</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-850/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-stone-450 font-bold">
              <div className="flex items-center gap-2">
                <span>© ۲۰۲۶ اتریش‌نشین · OTRISH-IRAN.IR</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-stone-400"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> اطلاعات مستقل و بدون وابستگی</span>
                <span className="flex items-center gap-1 text-stone-400"><BadgeCheck className="w-3.5 h-3.5 text-blue-400" /> به‌روز ۲۰۲۶</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modals & Overlays */}
        <SuperAppSearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          onSelectPage={(segment) => {
            setActiveSegment(segment);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        <SuperAppMobileBottomNav
          activeSegment={activeSegment}
          onSelectSegment={(segment) => {
            setActiveSegment(segment);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenSearch={() => setIsSearchModalOpen(true)}
          onOpenNews={() => setIsNewsModalOpen(true)}
          onOpenCategories={() => setIsMobileNavOpen(true)}
        />

        <MobileNavigationDrawer
          activeSegment={activeSegment}
          setActiveSegment={(segment) => {
            setActiveSegment(segment);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          onOpenNews={() => setIsNewsModalOpen(true)}
        />

        <NewsModal
          isOpen={isNewsModalOpen}
          onClose={() => setIsNewsModalOpen(false)}
          news={austriaNews}
          newsSourceText={newsSourceText}
          newsLastUpdated={newsLastUpdated}
          isNewsLoading={isNewsLoading}
          isForcingNewsRefresh={isForcingNewsRefresh}
          onRefresh={() => fetchAustriaNewsList(true)}
        />

        <WhatsAppConsultButton />
        <ToastNotification />

        {/* 🔐 Secure Authentication & Session Management Modal (auth.md & security.md) */}
        <SecureAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          activeSession={activeSession}
          onSessionChange={setActiveSession}
          targetProtectedAction={authModalTargetAction}
        />

        {/* 🔐 Security Audit Logs Viewer Modal (security.md) */}
        <SecurityAuditModal
          isOpen={isAuditModalOpen}
          onClose={() => setIsAuditModalOpen(false)}
        />
      </div>
    </>
  );
}