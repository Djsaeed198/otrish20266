import React from 'react';
import SEO from './SEO';

const PublicTransportGuide: React.FC = () => {
    return (
        <div className="p-6">
            <SEO title="راهنمای کارت سالانه حمل‌ونقل" description="راهنمای خرید کارت سالانه Wiener Linien و قوانین استفاده از حمل‌ونقل عمومی" />
            <h2 className="text-2xl font-black text-stone-900 mb-6">حمل‌ونقل عمومی</h2>
            <div className="bg-stone-100 p-4 rounded-xl text-stone-600 text-sm">
                نحوه خرید و قوانین کارت‌های حمل‌ونقل سالانه.
            </div>
        </div>
    );
};
export default PublicTransportGuide;
