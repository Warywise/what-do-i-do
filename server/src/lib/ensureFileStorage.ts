import * as Storage from '../lib/handleFile';

const ensureFileStorage = () => {
  if (Storage.EXISTS_FILE()) {
    console.log('~> File storage is ready!');
  } else {
    console.log('~> File storage does not exist...');
    const defaultFile = {};
    Storage.WRITE_FILE(defaultFile);
    console.log('~> A new one was created!');
  }
};

export default ensureFileStorage;
