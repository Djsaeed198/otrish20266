import React from 'react';
import SEO from './SEO';

const PoolTicketGuide: React.FC = () => {
    return (
        <div className="p-6">
            <SEO title="راهنمای استخرهای تابستانی وین" description="قیمت‌، بلیت‌ها و قوانین استخرهای روباز وین" />
            <h2 className="text-2xl font-black text-stone-900 mb-6">استخرهای تابستانی</h2>
            <div className="bg-stone-100 p-4 rounded-xl text-stone-600 text-sm">
                راهنمای استفاده از استخرهای شهرداری.
            </div>
        </div>
    );
};
export default PoolTicketGuide;
