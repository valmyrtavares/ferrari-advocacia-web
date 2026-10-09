import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Identifier for this client site within the multi-tenant Firebase database
export const CURRENT_SITE_ID = import.meta.env.VITE_SITE_ID || 'eduardo-ferrari';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

const app = isFirebaseConfigured
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig))
  : null;

export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;

/**
 * Fetch all CMS sections for the given site from Firestore
 */
export async function fetchSiteContentFromFirebase(siteId = CURRENT_SITE_ID) {
  if (!db) return null;
  try {
    const sections = ['lawyers', 'areas', 'articles', 'contact'];
    const contentMap = {};

    for (const section of sections) {
      const docRef = doc(db, 'site_contents', `${siteId}_${section}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        contentMap[section] = docSnap.data().data;
      }
    }

    return Object.keys(contentMap).length > 0 ? contentMap : null;
  } catch (err) {
    console.warn('[Firebase] Erro ao buscar dados remotos:', err);
    return null;
  }
}

/**
 * Save a specific section for the site in Firestore
 */
export async function saveSiteContentToFirebase(section, data, siteId = CURRENT_SITE_ID) {
  if (!db) return false;
  try {
    const docRef = doc(db, 'site_contents', `${siteId}_${section}`);
    await setDoc(
      docRef,
      {
        site_id: siteId,
        section,
        data,
        updated_at: new Date().toISOString()
      },
      { merge: true }
    );
    return true;
  } catch (err) {
    console.error(`[Firebase] Erro ao salvar secao ${section}:`, err);
    return false;
  }
}

/**
 * Upload an image file to Firebase Storage (sites/<site_id>/<filename>)
 */
export async function uploadSiteMediaFirebase(file, customName = null, siteId = CURRENT_SITE_ID) {
  if (!storage) throw new Error('Firebase Storage não configurado');

  const fileExt = file.name ? file.name.split('.').pop() : 'png';
  const cleanBaseName = customName
    ? customName.toLowerCase().replace(/[^a-z0-9]/g, '-')
    : `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

  const filePath = `sites/${siteId}/${cleanBaseName}.${fileExt}`;
  const storageRef = ref(storage, filePath);

  const snapshot = await uploadBytes(storageRef, file, {
    contentType: file.type || 'image/png'
  });

  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
}
