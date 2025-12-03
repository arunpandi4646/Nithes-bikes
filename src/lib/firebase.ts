'use client';
// This file is deprecated and will be removed.
// Please use the exports from '@/firebase' instead.
import { initializeFirebase as initialize } from '@/firebase';

const { app, auth, db, storage } = initialize();

export { app, auth, db, storage };
