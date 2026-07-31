import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { prisma } from './config/database.js';
import { app } from './app.js';

const server = app.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, 'Portfolio backend listening');
});

async function shutdown(signal: string) {
  logger.info({ signal }, 'Shutting down');
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));
