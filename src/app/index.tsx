import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import InteractiveWebView from '../components/InteractiveWebView';
import { INTERACTIVE_HTML } from '../components/interactiveHtml';

export default function App() {
  /**
   * 1. STATE MANAGEMENT & REF
   * - webViewRef: Referensi ke komponen WebView untuk menjalankan JavaScript dari React Native.
   * - inputText: Menyimpan teks pesan yang diketik pengguna.
   * - statusLog: Menampilkan log status komunikasi dua arah secara dinamis.
   */
  const webViewRef = useRef<WebView>(null);
  const [inputText, setInputText] = useState<string>('Halo dari React Native!');
  const [statusLog, setStatusLog] = useState<string>('Siap berinteraksi dengan WebView');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * 2. KOMUNIKASI NATIVE -> WEB (injectJavaScript)
   * Mengirim pesan dari input React Native ke fungsi JavaScript di dalam halaman WebView.
   */
  const handleSendToWeb = () => {
    const cleanText = inputText.trim() || 'Pesan kosong';
    const escapedText = JSON.stringify(cleanText);
    webViewRef.current?.injectJavaScript(`
      if (typeof receiveFromNative === 'function') {
        receiveFromNative(${escapedText});
      }
      true;
    `);
    setStatusLog(`Mengirim ke Web: "${cleanText}"`);
  };

  /**
   * 3. KOMUNIKASI WEB -> NATIVE (onMessage)
   * Menerima data JSON yang dikirim dari halaman web via window.ReactNativeWebView.postMessage.
   */
  const handleMessageFromWeb = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'COUNTER_UPDATE') {
        setStatusLog(`Counter dari Web: ${data.count} (pukul ${data.timestamp})`);
      }
    } catch {
      setStatusLog(`Pesan Web: ${event.nativeEvent.data}`);
    }
  };

  /**
   * 4. TAMPILAN UI (Declarative UI & Flexbox)
   */
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header & Status Komunikasi */}
      <View style={styles.header}>
        <Text style={styles.title}>WebView Interaktif (Fabric)</Text>
        <Text style={styles.status}>{statusLog}</Text>
      </View>

      {/* Bar Kontrol Input Native */}
      <View style={styles.controlBar}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ketik pesan untuk halaman web..."
          placeholderTextColor="#94a3b8"
        />
        <TouchableOpacity style={styles.button} onPress={handleSendToWeb} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Kirim</Text>
        </TouchableOpacity>
      </View>

      {/* Area Komponen WebView */}
      <InteractiveWebView
        ref={webViewRef}
        htmlContent={INTERACTIVE_HTML}
        onMessageFromWeb={handleMessageFromWeb}
        isLoading={isLoading}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </SafeAreaView>
  );
}

/**
 * 5. STYLING (Flexbox Layout)
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  status: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
    color: '#2563eb',
  },
  controlBar: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#0f172a',
  },
  button: {
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
