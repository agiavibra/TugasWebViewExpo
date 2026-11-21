export const INTERACTIVE_HTML = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Web Interaktif</title>
  <style>
    * { box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; }
    body {
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
      color: #1e293b;
    }
    .card {
      background: #ffffff;
      border-radius: 14px;
      padding: 18px;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
      margin-bottom: 16px;
    }
    h2 { margin: 0 0 8px; font-size: 18px; color: #1d4ed8; }
    p { margin: 0 0 12px; font-size: 14px; color: #475569; line-height: 1.5; }
    .counter-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8fafc;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
      margin-bottom: 12px;
    }
    .count-value { font-size: 28px; font-weight: 700; color: #0f172a; }
    button {
      background: #2563eb;
      color: #fff;
      border: none;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    button:active { opacity: 0.85; }
    button.secondary {
      width: 100%;
      background: #0f766e;
      padding: 12px;
    }
    .badge {
      display: inline-block;
      background: #dbeafe;
      color: #1e40af;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
    }
    #rnMessageBox {
      margin-top: 12px;
      padding: 12px;
      background: #fef9c3;
      border-left: 4px solid #eab308;
      border-radius: 6px;
      font-size: 13px;
      color: #713f12;
    }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">React Native WebView • Fabric</span>
    <h2 style="margin-top: 10px;">Konten Web Interaktif</h2>
    <p>Ubah nilai counter di dalam web lalu kirimkan statusnya langsung ke aplikasi React Native.</p>

    <div class="counter-box">
      <span class="count-value" id="count">0</span>
      <div>
        <button onclick="updateCount(-1)">-1</button>
        <button onclick="updateCount(1)">+1</button>
      </div>
    </div>

    <button class="secondary" onclick="sendToNative()">Kirim Data ke React Native</button>
    <div id="rnMessageBox">Menunggu pesan dari React Native...</div>
  </div>

  <script>
    let count = 0;

    function updateCount(delta) {
      count += delta;
      document.getElementById('count').textContent = count;
    }

    function sendToNative() {
      const payload = {
        type: 'COUNTER_UPDATE',
        count: count,
        timestamp: new Date().toLocaleTimeString('id-ID')
      };
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify(payload));
      }
    }

    function receiveFromNative(text) {
      document.getElementById('rnMessageBox').textContent = 'Dari RN: ' + text;
    }
  </script>
</body>
</html>
`;
