import fs from 'fs';
import path from 'path';
import { TaskFile } from './taskTypes';

const filePath = path.join(__dirname, '..', 'tasks_storage.json');

export const READ_FILE = (customPath ?: string): TaskFile => {
  const data = fs.readFileSync(customPath || filePath);
  const file = JSON.parse(data.toString());

  return file;
};

export const WRITE_FILE = (data: TaskFile, customPath ?: string) => {
  const file = JSON.stringify(data, null, 2);

  fs.writeFileSync(customPath || filePath, file);
}
