const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [{
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
                lessOptions: {
                    modifyVars: {
                        '@primary-color': '#52c41a', // Örneğin yeşil renk
                        '@link-color': '#52c41a', // Link rengi
                        '@success-color': '#52c41a', // Başarı rengi
                        '@warning-color': '#faad14', // Uyarı rengi
                        '@error-color': '#f5222d', // Hata rengi
                        '@font-size-base': '14px', // Temel font boyutu
                        '@heading-color': '#333333', // Başlık rengi
                        '@text-color': '#595959', // Metin rengi
                        '@text-color-secondary': '#8c8c8c', // İkincil metin rengi
                        '@disabled-color': '#d9d9d9', // Devre dışı bırakılmış renk
                        '@border-radius-base': '4px', // Border radius
                        '@border-color-base': '#d9d9d9', // Border rengi
                        '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // Kutu gölgesi
                    },
                    javascriptEnabled: true,
                },
            },
        },
    }, ],
};