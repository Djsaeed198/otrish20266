export const PATHWAY_DATA = {
  rwr: {
    name: 'مهاجرت کاری (RWR Card) — نیروهای متخصص و مشاغل کمبود',
    questions: [
      { id: 'job_title', label: 'عنوان شغلی مورد نظر در اتریش', type: 'text' },
      { id: 'work_experience', label: 'میزان سابقه کار مرتبط (سال)', type: 'number' },
      { id: 'has_job_offer', label: 'آیا پیشنهاد شغلی (Job Offer) دارید؟', type: 'select', options: ['بله', 'خیر'] },
      { id: 'education', label: 'میزان تحصیلات', type: 'select', options: ['دیپلم فنی کمبود نیرو', 'لیسانس', 'فوق لیسانس', 'دکتری'] },
      { id: 'language_level', label: 'سطح زبان آلمانی/انگلیسی', type: 'select', options: ['مبتدی (A1)', 'متوسط (A2/B1)', 'پیشرفته (B2/C1)', 'عالی'] }
    ]
  },
  rwr_graduates: {
    name: 'فارغ‌التحصیلان دانشگاه‌های اتریش (RWR Studienabsolventen) — بدون امتیاز',
    questions: [
      { id: 'austria_university', label: 'دانشگاه یا FH محل تحصیل در اتریش', type: 'text' },
      { id: 'grad_degree_level', label: 'مقطع تحصیلی اتمام یافته در اتریش', type: 'select', options: ['کارشناسی (Bachelor)', 'کارشناسی ارشد (Master)', 'دکتری (PhD)', 'دیپلم سنتی اتریش'] },
      { id: 'has_matching_job', label: 'آیا پیشنهاد کاری متناسب با رشته تحصیلی دریافت کرده‌اید؟', type: 'select', options: ['بله، قرارداد آماده است', 'در مهلت ۱۲ ماهه جستجوی کار هستم', 'در حال مصاحبه'] },
      { id: 'offered_gross_salary', label: 'حقوق ناخالص ماهانه پیشنهادی (یورو)', type: 'number' }
    ]
  },
  rwr_plus: {
    name: 'کارت سرخ-سفید-سرخ پلاس (RWR Card Plus) — کار ۱۰۰٪ آزاد',
    questions: [
      { id: 'current_rwr_months', label: 'مدت زمان اشتغال با کارت RWR اولیه (ماه)', type: 'select', options: ['۲۱ ماه یا بیشتر', 'بین ۱۲ تا ۲۰ ماه', 'کمتر از ۱۲ ماه', 'متقاضی الحاق به عنوان عضو خانواده'] },
      { id: 'integration_a2', label: 'مدرک زبان آلمانی A2 (ماژول ۱ ادغام)', type: 'select', options: ['دارم', 'در حال آماده‌سازی برای آزمون', 'ندارم'] },
      { id: 'uninterrupted_insurance', label: 'استمرار بیمه و فیش‌های حقوقی بدون استفاده از سوسیال', type: 'select', options: ['بله، بدون وقفه', 'دارای وقفه کوتاه', 'نیاز به بررسی'] }
    ]
  },
  company_self: {
    name: 'ثبت شرکت و خوداشتغالی (Key Worker)',
    questions: [
      { id: 'business_type', label: 'نوع کسب‌وکار', type: 'text' },
      { id: 'investment_amount', label: 'میزان سرمایه در دسترس (یورو)', type: 'number' },
      { id: 'has_business_plan', label: 'آیا بیزینس‌پلن آماده دارید؟', type: 'select', options: ['بله', 'خیر'] },
      { id: 'business_value', label: 'آیا کسب‌وکار شما برای اقتصاد اتریش آورده‌ای دارد؟', type: 'text' }
    ]
  },
  ict: {
    name: 'انتقال درون‌شرکتی (ICT)',
    questions: [
      { id: 'current_company', label: 'نام شرکت فعلی شما', type: 'text' },
      { id: 'has_branch_austria', label: 'آیا شرکت شما در اتریش شعبه دارد؟', type: 'select', options: ['بله', 'خیر'] },
      { id: 'position', label: 'سمت فعلی شما در شرکت', type: 'text' },
      { id: 'duration', label: 'مدت زمان حضور در شرکت فعلی', type: 'text' }
    ]
  },
  jobseeker: {
    name: 'مسیر جستجوی کار (Jobseeker Visa) — Visum D',
    questions: [
      { id: 'degree_major', label: 'رشته تحصیلی و مدرک دانشگاهی (حداقل لیسانس)', type: 'text' },
      { id: 'nostrification', label: 'آیا مدرک تحصیلی شما در اتریش معتبر است؟', type: 'select', options: ['بله، معادل‌سازی شده', 'خیر، نیازمند نوستریفیکاسیون', 'اطلاعی ندارم'] },
      { id: 'years_experience', label: 'تعداد سال‌های سابقه کار تخصصی مستند', type: 'number' },
      { id: 'german_level', label: 'سطح زبان آلمانی یا انگلیسی', type: 'select', options: ['انگلیسی عالی (B2/C1)', 'آلمانی A1/A2', 'آلمانی B1+', 'هر دو مسلط'] },
      { id: 'points_estimate', label: 'تخمین امتیاز از جدول نخبگان (حداقل ۷۰ امتیاز لازم است)', type: 'select', options: ['بالای ۷۰ امتیاز', 'بین ۶۰ تا ۶۹ امتیاز', 'زیر ۶۰ امتیاز'] }
    ]
  },
  blue_card: {
    name: 'کارت آبی اتریش (Blaue Karte EU)',
    questions: [
      { id: 'university_degree', label: 'مدرک دانشگاهی مرتبط (حداقل دوره ۳ ساله کارشناسی)', type: 'select', options: ['کارشناسی', 'کارشناسی ارشد', 'دکتری', 'سابقه ۳ ساله IT بدون مدرک'] },
      { id: 'job_offer_salary', label: 'حقوق ناخالص سالانه پیشنهادی در اتریش (یورو)', type: 'number' },
      { id: 'contract_duration', label: 'مدت قرارداد کاری پیشنهادی', type: 'select', options: ['حداقل ۶ ماهه', 'یک ساله', 'نامحدود (دائمی)'] },
      { id: 'field_of_work', label: 'حوزه تخصصی شغل (IT، مهندسی، مدیریت، پزشکی و...) ', type: 'text' }
    ]
  },
  artist: {
    name: 'اقامت هنرمندی اتریش (Niederlassungsbewilligung – Künstler)',
    questions: [
      { id: 'artistic_field', label: 'شاخه و رشته هنری (موسیقی، هنرهای تجسمی، سینما، ادبیات، تئاتر و...)', type: 'text' },
      { id: 'activity_type', label: 'نوع فعالیت هنری در اتریش', type: 'select', options: ['مستقل (Selbständig)', 'استخدامی / وابسته (Unselbständig)', 'ترکیبی از هر دو'] },
      { id: 'artistic_portfolio', label: 'آیا سابقه هنری مستند، نمایشگاه‌ها، جوایز یا آثار رسمی منتشرشده دارید؟', type: 'select', options: ['بله، رزومه و کاتالوگ بین‌المللی آماده است', 'سابقه کشوری دارم', 'در حال جمع‌آوری مدارک'] },
      { id: 'austria_contracts', label: 'آیا قرارداد یا پیش‌قرارداد همکاری با گالری، فستیوال، ناشر یا ارکستر در اتریش دارید؟', type: 'select', options: ['بله، قرارداد قطعی دارم', 'دعوتنامه یا تفاهمنامه اولیه دارم', 'خیر، نیازمند راهنمایی'] },
      { id: 'art_income_proof', label: 'تامین درآمد سالانه از محل فعالیت هنری (حداقل نرخ رفاه اجتماعی)', type: 'select', options: ['تضمین درآمد بالای €۱,۵۰۰ ماهانه از هنر', 'درآمد متناوب هنری + پس‌انداز', 'درآمد زیر سقف قانونی'] }
    ]
  },
  startup: {
    name: 'ویزای استارتاپ',
    questions: [
      { id: 'startup_description', label: 'نام و شرح کوتاه استارتاپ', type: 'textarea' },
      { id: 'is_accelerated', label: 'آیا توسط انکوباتورهای اتریشی پذیرش شده؟', type: 'select', options: ['بله', 'خیر'] },
      { id: 'seed_money', label: 'میزان سرمایه اولیه اختصاص یافته (یورو)', type: 'number' },
      { id: 'team_size', label: 'آیا تیم همراه دارید؟ (تعداد نفرات)', type: 'number' }
    ]
  },
  student: {
    name: 'اقامت دانشجویی اتریش (Aufenthaltsbewilligung – Student)',
    questions: [
      { id: 'degree_level', label: 'مقطع تحصیلی مورد نظر در اتریش', type: 'select', options: ['کارشناسی (Bachelor)', 'کارشناسی ارشد (Master)', 'دکتری (PhD)', 'کالج پیش‌نیاز زبان (VWU)'] },
      { id: 'major', label: 'رشته تحصیلی مورد نظر در اتریش', type: 'text' },
      { id: 'has_admission', label: 'وضعیت پذیرش دانشگاهی', type: 'select', options: ['پذیرش قطعی دارم (Zulassung)', 'در حال اقدام و ارسال مدارک', 'هنوز اقدام نکرده‌ام'] },
      { id: 'language_level', label: 'سطح زبان آلمانی یا انگلیسی', type: 'select', options: ['آلمانی A2 (متقاضی دوره زبان)', 'آلمانی B2/C1 (آماده ورود مستقیم)', 'انگلیسی IELTS/TOEFL معتبر'] },
      { id: 'student_funds', label: 'اثبات تمکن مالی یکساله در حساب بانکی (حدود ۱۲ تا ۱۵ هزار یورو)', type: 'select', options: ['تمکن مالی کامل موجود است', 'بخشی از تمکن آماده است', 'نیازمند اسپانسر یا راهنمایی'] }
    ]
  },
  privatier: {
    name: 'اقامت تمکن مالی (خود حمایتی) اتریش (Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit)',
    questions: [
      { id: 'monthly_income', label: 'میزان درآمد ماهانه غیرفعال مستمر خارج از اتریش (یورو)', type: 'select', options: ['بیش از ۴,۰۰۰ یورو (ایده‌آل متأهل)', '۲,۵۰۰ تا ۴,۰۰۰ یورو (مناسب مجرد)', 'کمتر از ۲,۵۰۰ یورو'] },
      { id: 'income_source', label: 'منبع اصلی درآمد غیرفعال', type: 'select', options: ['اجاره املاک و مستغلات', 'سود سهام و سرمایه‌گذاری شرکتی', 'حقوق بازنشستگی و سود بانکی', 'ترکیبی از موارد فوق'] },
      { id: 'bank_balance', label: 'میزان موجودی نقد حساب بانکی (حداقل ۳۰ تا ۵۰ هزار یورو)', type: 'number' },
      { id: 'german_a1', label: 'مدرک زبان آلمانی A1 یا مدرک دانشگاهی معاف‌کننده', type: 'select', options: ['مدرک A1 آلمانی دارم', 'مدرک دانشگاهی دارم', 'در حال یادگیری هستم'] }
    ]
  },
  permanent_eu: {
    name: 'اقامت دائم اتریش – (Austria Daueraufenthalt – EU)',
    questions: [
      { id: 'years_in_austria', label: 'مدت اقامت قانونی متوالی در اتریش (سال)', type: 'select', options: ['۵ سال یا بیشتر', 'بین ۳ تا ۵ سال', 'کمتر از ۳ سال'] },
      { id: 'current_card_type', label: 'نوع کارت اقامت فعلی شما در اتریش', type: 'select', options: ['کارت قرمز-سفید-قرمز پلاس (RWR Plus)', 'کارت آبی اتریش (Blaue Karte EU)', 'اقامت هنرمندی / پژوهشگری', 'اقامت تمکن مالی (بدون کار)', 'اقامت دانشجویی (محاسبه نیمی از مدت)'] },
      { id: 'german_b1_integrationsvereinbarung', label: 'وضعیت مدرک زبان آلمانی B1 و ماژول ۲ قرارداد ادغام (Integrationsvereinbarung)', type: 'select', options: ['مدرک B1 ÖIF دارم', 'در حال آمادگی برای آزمون B1', 'مدرک B1 ندارم'] },
      { id: 'sustainable_income', label: 'اثبات درآمد پایدار و مستقل در ۱۲ ماه گذشته بدون اتکا به کمک‌های دولتی', type: 'select', options: ['درآمد کافی و پایدار دارم', 'درآمد متغیر با حداقل سقف قانونی', 'نیازمند محاسبه دقیق'] }
    ]
  },
  family: {
    name: 'پیوست خانواده',
    questions: [
      { id: 'relative_status', label: 'وضعیت اقامت فرد اصلی در اتریش', type: 'text' },
      { id: 'relationship', label: 'نسبت با فرد مقیم', type: 'select', options: ['همسر', 'فرزند'] },
      { id: 'arrival_date', label: 'تاریخ دقیق ورود فرد اصلی به اتریش', type: 'date' }
    ]
  },
  gmbh: {
    name: 'ثبت شرکت در اتریش (عمومی)',
    questions: [
      { id: 'company_type', label: 'نوع شرکت', type: 'select', options: ['GmbH', 'سایر'] },
      { id: 'field', label: 'زمینه فعالیت', type: 'text' },
      { id: 'is_buying', label: 'آیا خواهان خرید شرکت آماده هستید؟', type: 'select', options: ['بله', 'ثبت شرکت جدید'] }
    ]
  },
  general: {
    name: 'مشاوره عمومی',
    questions: [
      { id: 'challenges', label: 'سوالات یا چالش‌های اصلی شما در مسیر مهاجرت', type: 'textarea' },
      { id: 'contact_pref', label: 'ترجیح می‌دهید از چه طریقی با شما تماس گرفته شود؟', type: 'select', options: ['واتساپ', 'ایمیل', 'تلفن'] }
    ]
  }
};
