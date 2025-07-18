"use server";

export type State = {
    errors?: {
        eventName?: string[];
        // eventLocation?: string[];
        // eventType?: string[];
        // eventStartDate?: string[];
        // eventEndDate?: string[];
        // eventHouses?: string[];
        // eventVictors?: string[];
        // eventLosers?: string[];
        // eventExtraNotes?: string[];
    };
    message?: string | null;
};


export async function register(state: State, formData: FormData ) {
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    console.log(email, password, confirmPassword);
}