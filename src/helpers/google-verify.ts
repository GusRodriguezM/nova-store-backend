import { OAuth2Client, TokenPayload } from 'google-auth-library';

const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

export async function googleVerify( token: string = '' ) {
    
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    
    const payload: ( TokenPayload | undefined ) = ticket.getPayload();
    
    const res = {
        name: payload?.name,
        email: payload?.email,
        image: payload?.picture,
    }

    return res;

}