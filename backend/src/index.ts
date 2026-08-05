import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { prisma } from './config/database.js';
import { app } from './app.js';

const server = app.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, 'Portfolio backend listening');
});

// Keep-alive DB heartbeat every 3 minutes so Render PostgreSQL connection stays active
const DB_HEARTBEAT_INTERVAL = 3 * 60 * 1000;
const dbHeartbeat = setInterval(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (err) {
    logger.warn({ err }, 'Database keep-alive ping failed');
  }
}, DB_HEARTBEAT_INTERVAL);

async function shutdown(signal: string) {
  logger.info({ signal }, 'Shutting down');
  clearInterval(dbHeartbeat);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));

