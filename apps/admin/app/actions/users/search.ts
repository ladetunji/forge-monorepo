'use server';

import { database } from '@repo/database/db';
import Fuse from 'fuse.js';

export const searchUsers = async (
  query: string
): Promise<
  | {
    data: string[];
  }
  | {
    error: unknown;
  }
> => {
  try {
    const users = await database.user.findMany();
    const fuse = new Fuse(users, {
      keys: ['name', 'email'],
      minMatchCharLength: 1,
      threshold: 0.3,
    });
    const results = fuse.search(query);
    const data = results.map((result) => result.item.id);
    return { data };
  } catch (error) {
    return { error };
  }
};
