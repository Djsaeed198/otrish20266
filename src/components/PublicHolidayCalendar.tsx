import React from 'react';
import SEO from './SEO';

const PublicHolidayCalendar: React.FC = () => {
    return (
        <div className="p-6">
            <SEO title="تقویم تعطیلات رسمی اتریش" description="نمایش تعطیلات رسمی اتریش به همراه تقویم کاری و وضعیت باز بودن ادارات" />
            <h2 className="text-2xl font-black text-stone-900 mb-6">تقویم تعطیلات رسمی</h2>
            <div className="bg-stone-100 p-4 rounded-xl text-stone-600 text-sm">
                تقویم تعطیلات و وضعیت باز بودن ادارات در اینجا قرار می‌گیرد.
            </div>
        </div>
    );
};
export default PublicHolidayCalendar;
