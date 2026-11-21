import React, { forwardRef } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

interface InteractiveWebViewProps {
  htmlContent: string;
  onMessageFromWeb: (event: WebViewMessageEvent) => void;
  isLoading: boolean;
  onLoadStart: () => void;
  onLoadEnd: () => void;
}

const InteractiveWebView = forwardRef<WebView, InteractiveWebViewProps>(
  ({ htmlContent, onMessageFromWeb, isLoading, onLoadStart, onLoadEnd }, ref) => {
    return (
      <View style={styles.webviewWrapper}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#2563eb" />
          </View>
        )}
        <WebView
          ref={ref}
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          onMessage={onMessageFromWeb}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  webviewWrapper: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 250, 252, 0.7)',
    zIndex: 1,
  },
});

export default InteractiveWebView;
