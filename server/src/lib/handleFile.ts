import fs from 'fs';
import path from 'path';
import { TaskFile } from './taskTypes';

const filePath = path.join(__dirname, '..', 'tasks_storage.json');

export const EXISTS_FILE = (customPath?: string): boolean => {
  try {
    return fs.existsSync(customPath || filePath);
  } catch (error) {
    if (error instanceof Error) console.log('File Error: ', error?.message);
    return false;
  }
};

export const READ_FILE = (customPath?: string): TaskFile => {
  const data = fs.readFileSync(customPath || filePath);
  const file = JSON.parse(data.toString());

  return file;
};

export const WRITE_FILE = (data: TaskFile, customPath ?: string) => {
  const file = JSON.stringify(data, null, 2);

  fs.writeFileSync(customPath || filePath, file);
}
