import NetInfo from '@react-native-community/netinfo';
import { NativeModules } from 'react-native';

const { MorchellaClassifier } = NativeModules;

function createFormData(uri: string) {
  const data = new FormData();
  // The RN ImagePicker or camera should provide a file:// uri
  data.append('file', {
    uri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  } as any);
  return data;
}

export async function predictMorchella(imageUri: string) {
  const state = await NetInfo.fetch();

  if (state.isConnected) {
    try {
      const res = await fetch('https://your-api.example.com/predict', {
        method: 'POST',
        body: createFormData(imageUri),
        headers: {
          'Accept': 'application/json',
        }
      });

      if (res.ok) {
        const json = await res.json();
        return { source: 'api', probability: json.probability };
      }
    } catch (e) {
      // fall through to local
    }
  }

  // Fallback to local on-device inference
  const result = await MorchellaClassifier.predict(imageUri);
  // result is a map { probability }
  return { source: 'local', probability: result.probability };
}
