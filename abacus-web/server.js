import express from 'express';
import cors from 'cors';
import { readFile } from 'fs/promises';
import admin from 'firebase-admin';

// 1. Setup Firebase Admin (Make sure serviceAccountKey.json is in this folder!)
const serviceAccount = JSON.parse(
  await readFile(new URL('./serviceAccountKey.json', import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(express.json());
app.use(cors());

// 2. ADMIN RESET ENDPOINT
app.post('/admin-reset-password', async (req, res) => {
  const { uid, new_password } = req.body;

  try {
    // Force update the user's password in Firebase Auth
    await admin.auth().updateUser(uid, {
      password: new_password
    });

    console.log(`Password updated for User ID: ${uid}`);
    res.status(200).json({ success: true });

  } catch (error) {
    console.error("Reset Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});