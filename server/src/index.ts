import server from './server';
import { v4 } from 'uuid';
import 'reflect-metadata';

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`🚀 Running at Port:${PORT}.`));
