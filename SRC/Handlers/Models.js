import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async () => {
    // connect to MongoDB
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        console.error('[ SYSTEM ] MONGO_URI not found in environment variables.');
        return;
    }

    try {
        await mongoose.connect(mongoURI);
        console.log('[ SYSTEM ] MongoDB Connected!');
    } catch (err) {
        console.error('[ SYSTEM ] MongoDB Connection Error:', err);
        return;
    }

    // Load models
    const modelsPath = path.join(__dirname, '../', 'Models');
    const files = fs.readdirSync(modelsPath).filter(file => file.endsWith('.js'));

    const collectionNames = [];

    for (const file of files) {
        // import dynamic model as ES module
        const filePath = path.join(modelsPath, file);
        const fileUrl = new URL(`file://${filePath}`);
        const { default: model } = await import(fileUrl.href);
        if (!model || !model.modelName) {
            console.warn(`[ WARNING ] Skipped ${file} (missing model or modelName)`);
            continue;
        }
        mongoose.model(model.modelName); // force register model
        collectionNames.push(model.collection.collectionName); // get collection name
    }

    // Ensure collections exist
    for (const name of collectionNames) {
        try {
            await mongoose.connection.createCollection(name);
        } catch (err) {
            if (err.codeName === 'NamespaceExists') {
                console.log(`[ Mongo ] Collection already exists: ${name}`);
            } else {
                console.warn(`[ Mongo ] Collection check failed: ${name}`, err.message);
            }
        }
    }

    console.log('[ SYSTEM ] All models were successfully loaded and collections ensured.');
};