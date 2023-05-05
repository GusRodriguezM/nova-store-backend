import jwt from "jsonwebtoken";

export const generateJWT = ( uid: string = '' ): Promise<string | undefined> => {

    return new Promise( ( resolve, reject ) => {

        //Setting the user id as the payload
        const payload = { uid };

        //Adding the payload and the private key to generate the token
        jwt.sign( payload, process.env.SECRET_OR_PRIVATE_KEY as string, { expiresIn: '8h' }, (err, token) => {
            if( err ){
                console.log(err);
                reject('The token could not be generated');
            }else{
                resolve( token );
            }
        });

    });

}