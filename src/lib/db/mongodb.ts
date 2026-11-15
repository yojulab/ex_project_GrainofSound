import mongoose from "mongoose";
import { getServerEnv } from "@/lib/config/env";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const { mongodbUri } = getServerEnv();
    cached.promise = mongoose
      .connect(mongodbUri, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        const dbName = mongooseInstance.connection.name;
        if (dbName !== "grain_of_sound") {
          throw new Error(
            `[CRITICAL DB ERROR] 연결된 데이터베이스가 'grain_of_sound'가 아닙니다: ${dbName}`
          );
        }
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
