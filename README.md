# Tugas Praktikum 2
## Implementasi Tampilan Web Interaktif Menggunakan Komponen WebView pada Arsitektur Baru (Fabric) React Native

### 1. Persiapan Kerja di VSCodium
1. Pastikan **Node.js** dan **VSCodium** sudah terpasang (`node -v` dan `npm -v`).
2. Ekstrak folder proyek ini atau jalankan `npm install` di dalam folder proyek:
   ```bash
   npm install
   ```
3. Buka folder proyek di VSCodium:
   ```bash
   codium .
   ```
4. Pastikan `"newArchEnabled": true` aktif pada `app.json` untuk menjalankan arsitektur baru **Fabric**.

### 2. Menjalankan Aplikasi (Expo Go)
Jalankan development server Expo melalui terminal VSCodium:
```bash
npx expo start
```
Scan QR Code yang muncul di terminal menggunakan aplikasi **Expo Go** di perangkat Android/iOS Anda.

### 3. Menghasilkan APK Otomatis di GitHub
Push proyek ini ke branch `main` pada repositori GitHub Anda. Workflow `.github/workflows/build-expo-apk.yml` akan otomatis menjalankan `expo prebuild` dan mengompilasi file `app-debug.apk` yang dapat diunduh pada tab **Actions > Artifacts**.
