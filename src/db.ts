import Dexie, { type EntityTable } from 'dexie';
import data from '@/data.json';

type Extension = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  logo: string;
}

const db = new Dexie('ExtensionsDatabase') as Dexie & {
  extensions: EntityTable<Extension, 'id'>
}

db.version(1).stores({
  extensions: '++id, name'
});

export const loadJsonToDexie = async () => {
  try {
    const count = await db.extensions?.count(); // Check if the table already has data

    if (count === 0) {
      await db.extensions.bulkAdd(data); // Load data only if the table is empty
    } else {
      console.log('Database already contains data. Skipping JSON load.');
    }
  } catch (error) {
    console.error('Error loading JSON into Dexie:', error);
  }
}

export type { Extension }
export { db };