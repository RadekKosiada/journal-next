import { testDatabaseConnection } from "@/actions";

export default async function ShowIfConnected() {
    const isConnected = await testDatabaseConnection();

    return (
        <>
            {isConnected ? (
                <h2>
                    You are connected to MongoDB!
                </h2>
            ) : (
                <h2>
                    You are NOT connected to MongoDB.
                </h2>
            )}
        </>
    );
}
