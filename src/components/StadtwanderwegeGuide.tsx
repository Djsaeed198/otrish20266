import React from 'react';
import SEO from './SEO';

const StadtwanderwegeGuide: React.FC = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <SEO
                title="راهنمای کامل ۱۴ مسیر پیاده‌روی شهری وین (Stadtwanderwege)"
                description="کشف ۱۴ مسیر رسمی پیاده‌روی در وین از میان جنگل‌های وین‌وود، تاکستان‌ها و چشم‌اندازهای پانوراما. از کالنبرگ تا هرمانسکوگل، همه چیز درباره‌ی پیاده‌روی شهری در وین."
            />

            {/* HOOK */}
            <h1 className="text-3xl font-black text-stone-900 mb-4">
                وین را با پای خودتان کشف کنید: ۱۴ مسیر پیاده‌روی شهری که شما را شگفت‌زده می‌کند
            </h1>
            <p className="text-lg text-stone-700 mb-6 leading-relaxed">
                آیا می‌دانستید وین بیش از <strong>۲۴۰ کیلومتر</strong> مسیر پیاده‌روی شهری دارد؟[reference:0] این شهر نه فقط برای کاخ‌ها و موسیقی کلاسیک، بلکه برای <strong>طبیعت‌گردی درون‌شهری</strong> هم یکی از بهترین مقاصد اروپا است. از تاکستان‌های شیب‌دار کالنبرگ تا جنگل‌های انبوه هرمانسکوگل، مسیرهای Stadtwanderwege شما را از قلب شهر به دل طبیعت می‌برند — بدون نیاز به ماشین.
            </p>

            {/* IMAGE 1: Kahlenberg */}
            <figure className="mb-8">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Panorama-vom-Kahlenberg.jpg/1280px-Panorama-vom-Kahlenberg.jpg"
                    alt="چشم‌انداز پانوراما از شهر وین از فراز تپه کالنبرگ در مسیر پیاده‌روی Stadtwanderweg 1"
                    className="w-full rounded-xl shadow-lg"
                    loading="lazy"
                />
                <figcaption className="text-sm text-stone-500 mt-2 text-center">
                    چشم‌انداز وین از فراز کالنبرگ — مسیر شماره ۱ Stadtwanderwege
                </figcaption>
            </figure>

            {/* TRAIL HIGHLIGHTS */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-stone-900 mb-4">مسیرهای برتر برای شروع</h2>
                <div className="space-y-4">
                    <div className="bg-stone-50 p-5 rounded-xl border-r-4 border-amber-500">
                        <h3 className="text-xl font-bold text-stone-900 mb-1">۱. کالنبرگ (Kahlenberg) — مسیر شماره ۱</h3>
                        <p className="text-stone-600">
                            محبوب‌ترین مسیر وین با <strong>۱۱ کیلومتر</strong> طول و حدود <strong>۳.۵ تا ۴ ساعت</strong> زمان پیاده‌روی[reference:1]. از ایستگاه تراموا D در نوسدورف شروع می‌شود، از میان تاکستان‌ها و تپه‌های جنگلی می‌گذرد و در نهایت با چشم‌اندازی بی‌نظیر از وین و دانوب پاداش می‌گیرید.
                        </p>
                    </div>
                    <div className="bg-stone-50 p-5 rounded-xl border-r-4 border-emerald-500">
                        <h3 className="text-xl font-bold text-stone-900 mb-1">۲. هرمانسکوگل (Hermannskogel) — مسیر شماره ۲</h3>
                        <p className="text-stone-600">
                            این مسیر شما را به <strong>بلندترین نقطه وین (۵۴۲ متر)</strong> می‌برد[reference:2]. در قله، برج دیدبانی <strong>هابسبورگ‌وارته</strong> قرار دارد که منظره‌ای ۳۶۰ درجه از وین و دانوب ارائه می‌دهد. مسیری آرام و مناسب برای علاقه‌مندان به تاریخ طبیعی.
                        </p>
                    </div>
                    <div className="bg-stone-50 p-5 rounded-xl border-r-4 border-blue-500">
                        <h3 className="text-xl font-bold text-stone-900 mb-1">۳. پارتر (Prater) — مسیر شماره ۹</h3>
                        <p className="text-stone-600">
                            اگر به دنبال مسیری <strong>مسطح و خانوادگی</strong> هستید، مسیر ۱۳ کیلومتری پارتر از ایستگاه Praterstern شروع می‌شود و از میان بلوار اصلی، چمنزارها و دریاچه کنستانتین می‌گذرد[reference:3]. گزینه‌ای عالی برای دوچرخه‌سواری و پیک‌نیک.
                        </p>
                    </div>
                </div>
            </section>

            {/* IMAGE 2: Hermannskogel / Habsburgwarte */}
            <figure className="mb-8">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Wien-Hermannskogel_Habsburgwarte_160405.JPG/1024px-Wien-Hermannskogel_Habsburgwarte_160405.JPG"
                    alt="برج دیدبانی هابسبورگ‌وارته در قله هرمانسکوگل، بلندترین نقطه وین در مسیر Stadtwanderweg 2"
                    className="w-full rounded-xl shadow-lg"
                    loading="lazy"
                />
                <figcaption className="text-sm text-stone-500 mt-2 text-center">
                    برج هابسبورگ‌وارته در قله هرمانسکوگل — بلندترین نقطه وین (۵۴۲ متر)
                </figcaption>
            </figure>

            {/* PRACTICAL INFO */}
            <section className="mb-8 bg-amber-50 p-6 rounded-xl">
                <h2 className="text-xl font-bold text-stone-900 mb-3">راهنمای کاربردی</h2>
                <ul className="list-disc list-inside text-stone-700 space-y-2">
                    <li><strong>طول مسیرها:</strong> از ۴ تا ۲۲.۹ کیلومتر — برای همه سطوح تناسب اندام[reference:4]</li>
                    <li><strong>دسترسی:</strong> همه مسیرها با حمل‌ونقل عمومی قابل دسترسی هستند</li>
                    <li><strong>علامت‌گذاری:</strong> تمام مسیرها با فلش‌های جهت‌نما به خوبی علامت‌گذاری شده‌اند</li>
                    <li><strong>پاس پیاده‌روی:</strong> با جمع‌آوری ۳ مهر مدال نقره، ۷ مهر طلا و با تمام مهرها مدال پلاتینیوم دریافت کنید[reference:5]</li>
                    <li><strong>نقشه:</strong> نقشه رایگان پیاده‌روی وین (Fußwegekarte) را از ۴۰۰ نقطه در شهر دریافت کنید[reference:6]</li>
                </ul>
            </section>

            {/* IMAGE 3: Prater */}
            <figure className="mb-8">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Wien_Prater_Hauptallee_2013.jpg/1280px-Wien_Prater_Hauptallee_2013.jpg"
                    alt="بلوار اصلی پارتر وین در مسیر پیاده‌روی Stadtwanderweg 9 با درختان سرسبز و مسیر مسطح"
                    className="w-full rounded-xl shadow-lg"
                    loading="lazy"
                />
                <figcaption className="text-sm text-stone-500 mt-2 text-center">
                    بلوار Hauptallee در پارتر — مسیر شماره ۹ Stadtwanderwege
                </figcaption>
            </figure>

            {/* STRUCTURED DATA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TouristAttraction",
                        "name": "Stadtwanderwege Wien",
                        "alternateName": "مسیرهای پیاده‌روی شهری وین",
                        "description": "۱۴ مسیر رسمی پیاده‌روی شهری در وین با طول‌های ۴ تا ۲۲.۹ کیلومتر، از میان جنگل‌های وین‌وود، تاکستان‌ها و چشم‌اندازهای پانوراما",
                        "url": "https://www.wien.gv.at/freizeit/stadtwanderwege",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Wien",
                            "addressCountry": "AT"
                        },
                        "touristType": ["Nature Lovers", "Hikers", "Families", "Solo Travelers"],
                        "isAccessibleForFree": true,
                        "publicAccess": true,
                        "numberOfRooms": 14,
                        "image": [
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Panorama-vom-Kahlenberg.jpg/1280px-Panorama-vom-Kahlenberg.jpg",
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Wien-Hermannskogel_Habsburgwarte_160405.JPG/1024px-Wien-Hermannskogel_Habsburgwarte_160405.JPG"
                        ]
                    })
                }}
            />
        </div>
    );
};

export default StadtwanderwegeGuide;