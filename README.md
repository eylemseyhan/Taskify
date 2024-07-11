# Taskify

_Taskify, kullanıcıların görevleri yönetmesine ve takip etmesine yardımcı olan bir görev yönetim uygulamasıdır. Bu uygulama, kullanıcıların görev eklemelerini, düzenlemelerini, silmelerini ve görevleri listelemelerini sağlar. Ayrıca, her görev için atanmış kullanıcıları, tarih aralığını ve alt görevleri yönetmek mümkündür._

## Ekran Görüntüleri

![Ekran görüntüsü 2024-06-27 121329](https://github.com/eylemseyhan/Taskify/assets/99998017/a05a55a5-110f-4e5c-955c-46679e760997)
![Ekran görüntüsü 2024-06-27 121336](https://github.com/eylemseyhan/Taskify/assets/99998017/81bc251e-74c8-4213-9b20-b5c06b13d02d)
![Ekran görüntüsü 2024-06-27 121342](https://github.com/eylemseyhan/Taskify/assets/99998017/0493e139-3acd-45c1-836b-ae277154cd6f)
![Ekran görüntüsü 2024-06-27 121405](https://github.com/eylemseyhan/Taskify/assets/99998017/04fdda8c-f25c-4066-ae50-fe29c259a2a5)
![Ekran görüntüsü 2024-06-27 121412](https://github.com/eylemseyhan/Taskify/assets/99998017/e9ef95a4-f13a-4787-806a-a2a6094fa15c)
![Ekran görüntüsü 2024-06-27 121416](https://github.com/eylemseyhan/Taskify/assets/99998017/b99b511e-56ab-4d22-99a5-4121eceb766e)
![Ekran görüntüsü 2024-06-27 121436](https://github.com/eylemseyhan/Taskify/assets/99998017/efbf7d5d-f58d-4ed3-916c-1dc8b2e4d3db)


## Taskify için hazırlanmış sunum


[TASKIFY SUNUM.pdf](https://github.com/user-attachments/files/16181705/TASKIFY.SUNUM.pdf)

## Özellikler

- Görev ekleme, düzenleme ve silme
- Kullanıcıları görevlere atama
- Görevler için tarih aralığı belirleme
- Alt görevler ekleme ve yönetme
- Görev durumu yönetimi (Beklemede, Tamamlandı, Devam Ediyor)
- Kullanıcı bildirimleri

## Kullanılan Teknolojiler

- React
- Firebase (Firestore ve Authentication)
- Ant Design (UI bileşenleri için)

## Kurulum ve Kullanım

1. Bu projeyi klonlayın veya indirin:
    ```sh
    git clone https://github.com/YOUR_GITHUB_USERNAME/Taskify.git
    cd Taskify
    ```

2. Gerekli bağımlılıkları yükleyin:
    ```sh
    npm install
    ```

3. Firebase projesi oluşturun ve konfigürasyon dosyasını ayarlayın:
    - [Firebase Console](https://console.firebase.google.com/) üzerinden yeni bir proje oluşturun.
    - Firestore ve Authentication özelliklerini etkinleştirin.
    - Firebase projenizin yapılandırma bilgilerini alın ve `src/firebaseConfig.js` dosyasına ekleyin:

    ```javascript
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    export default firebaseConfig;
    ```

4. Uygulamayı yerel sunucunuzda çalıştırın:
    ```sh
    npm start
    ```

5. Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı görüntüleyin.



## Katkıda Bulunma

Katkıda bulunmak isterseniz, lütfen bir pull request gönderin veya bir issue açın.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.
