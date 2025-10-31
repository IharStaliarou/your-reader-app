import * as path from 'path';
import { Request } from 'express';

type FilenameCallback = (error: Error | null, filename: string) => void;
interface AuthenticatedRequest extends Request {
  user: { id: string };
}

export const getFileNameGenerator = (
  req: AuthenticatedRequest,
  file: Express.Multer.File,
  callback: FilenameCallback,
) => {
  const userId = req.user?.id || 'unknown';
  const ext = path.extname(file.originalname);
  const name = path.basename(file.originalname, ext);

  const newFileName = `${name}_${userId}_${Date.now()}${ext}`;

  callback(null, newFileName);
};
