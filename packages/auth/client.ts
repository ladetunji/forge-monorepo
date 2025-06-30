import { createAuthClient } from 'better-auth/react';
import { emailOTPClient, phoneNumberClient, adminClient } from "better-auth/client/plugins";

export const { signIn, signOut, signUp, useSession } = createAuthClient({
    plugins: [
        emailOTPClient(),
        phoneNumberClient(),
        adminClient(),
        // organization()
    ],
});