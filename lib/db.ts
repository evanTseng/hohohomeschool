/**
 * Hou Hou Si Shu - Database Engine (IndexedDB)
 * This file simulates a real database connection.
 */

const DB_NAME = 'HouHouDB';
const DB_VERSION = 1;

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains('services')) {
        db.createObjectStore('services', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('resources')) {
        db.createObjectStore('resources', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('auth')) {
        db.createObjectStore('auth', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const dbQuery = async <T>(storeName: string, mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> => {
  const db = await initDB();
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
};

export const getAll = async <T>(storeName: string): Promise<T[]> => {
  const store = await dbQuery(storeName);
  return new Promise((resolve) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
};

export const putItem = async <T>(storeName: string, item: T): Promise<void> => {
  const store = await dbQuery(storeName, 'readwrite');
  return new Promise((resolve) => {
    const request = store.put(item);
    request.onsuccess = () => resolve();
  });
};