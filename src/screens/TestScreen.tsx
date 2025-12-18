import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { predictMorchella } from '../services/PredictionService';

export default function TestScreen() {
  const [imageUri, setImageUri] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ source: string; probability: number } | null>(null);

  async function onPredict() {
    setLoading(true);
    try {
      const res = await predictMorchella(imageUri);
      setResult(res as any);
    } catch (e) {
      setResult({ source: 'error', probability: 0 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Morchella Classifier — Test</Text>

      <Text style={styles.label}>Image URI (file:// or content://)</Text>
      <TextInput
        style={styles.input}
        placeholder="file:///sdcard/DCIM/Camera/photo.jpg"
        value={imageUri}
        onChangeText={setImageUri}
        autoCapitalize="none"
      />

      <Button title="Predict" onPress={onPredict} disabled={loading || !imageUri} />

      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}

      {result && (
        <View style={styles.result}>
          <Text>Source: {result.source}</Text>
          <Text>Probability: {result.probability.toFixed(3)}</Text>
        </View>
      )}

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  label: { marginTop: 8, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginBottom: 8 },
  result: { marginTop: 12 },
  image: { width: '100%', height: 300, marginTop: 12, backgroundColor: '#f2f2f2' },
});
