import React from 'react';
import SEO from './SEO';

const TranslatorDirectory: React.FC = () => {
    return (
        <div className="p-6">
            <SEO title="مترجمان رسمی مورد تایید دادگاه اتریش" description="لیست مترجمان رسمی ایرانی در اتریش (ÖVD) برای ترجمه مدارک" />
            <h2 className="text-2xl font-black text-stone-900 mb-6">دایرکتوری مترجمان رسمی</h2>
            <div className="bg-stone-100 p-4 rounded-xl text-stone-600 text-sm">
                لیست مترجمان به همراه لینک تاییدیه دادگاه در اینجا قرار می‌گیرد.
            </div>
        </div>
    );
};
export default TranslatorDirectory;
