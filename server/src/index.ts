import server from './server';
import 'reflect-metadata';

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`🚀 Running at Port:${PORT}.`));
