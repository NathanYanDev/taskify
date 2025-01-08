import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
	throw new Error("MONGODB Connection string not defined");
}

const URI = process.env.MONGODB_URI as string;

const options = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
	// biome-ignore lint/style/useConst: <explanation>
	let globalWithMongo = global as typeof globalThis & {
		_mongoClient?: MongoClient;
	};

	if (!globalWithMongo._mongoClient) {
		globalWithMongo._mongoClient = new MongoClient(URI, options);
	}

	client = globalWithMongo._mongoClient;
} else {
	client = new MongoClient(URI, options);
}

await client.connect();

const db = client.db(process.env.MONGODB_NAME);

export { db };
