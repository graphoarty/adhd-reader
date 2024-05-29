import { NextRequest, NextResponse } from "next/server";

type Voice = {
    name: string,
    identifer: string
}

export async function GET(req: NextRequest, res: NextResponse) {

    const { searchParams } = new URL(req.url);
    const licenseKey = searchParams.get('licenseKey');

    let voices: Voice[] = [];

    if (licenseKey == process.env.MASTER_LICENSE_KEY) {

        // Return ElevenLab voices
        voices = [
            { name: 'Rachel', identifer: '21m00Tcm4TlvDq8ikWAM' },
            { name: 'Drew', identifer: '29vD33N1CtxCmqQRPOHJ' },
            { name: 'Clyde', identifer: '2EiwWnXFnvU5JabPnv8n' },
            { name: 'Paul', identifer: '5Q0t7uMcjvnagumLfvZi' },
            { name: 'Domi', identifer: 'AZnzlk1XvdvUeBnXmlld' },
            { name: 'Dave', identifer: 'CYw3kZ02Hs0563khs1Fj' },
            { name: 'Fin', identifer: 'D38z5RcWu1voky8WS1ja' },
            { name: 'Sarah', identifer: 'EXAVITQu4vr4xnSDxMaL' },
            { name: 'Antoni', identifer: 'ErXwobaYiN019PkySvjV' },
            { name: 'Thomas', identifer: 'GBv7mTt0atIp3Br8iCZE' },
            { name: 'Charlie', identifer: 'IKne3meq5aSn9XLyUdCD' },
            { name: 'George', identifer: 'JBFqnCBsd6RMkjVDRZzb' },
            { name: 'Emily', identifer: 'LcfcDJNUP1GQjkzn1xUU' },
            { name: 'Elli', identifer: 'MF3mGyEYCl7XYWbV9V6O' },
            { name: 'Callum', identifer: 'N2lVS1w4EtoT3dr4eOWO' },
            { name: 'Patrick', identifer: 'ODq5zmih8GrVes37Dizd' },
            { name: 'Harry', identifer: 'SOYHLrjzK2X1ezoPC6cr' },
            { name: 'Liam', identifer: 'TX3LPaxmHKxFdv7VOQHJ' },
            { name: 'Dorothy', identifer: 'ThT5KcBeYPX3keUQqHPh' },
            { name: 'Josh', identifer: 'TxGEqnHWrfWFTfGW9XjX' },
            { name: 'Arnold', identifer: 'VR6AewLTigWG4xSOukaG' },
            { name: 'Charlotte', identifer: 'XB0fDUnXU5powFXDhCwa' },
            { name: 'Alice', identifer: 'Xb7hH8MSUJpSbSDYk0k2' },
            { name: 'Matilda', identifer: 'XrExE9yKIg1WjnnlVkGX' },
            { name: 'James', identifer: 'ZQe5CZNOzWyzPSCn5a3c' },
            { name: 'Joseph', identifer: 'Zlb1dXrM653N07WRdFW3' },
            { name: 'Jeremy', identifer: 'bVMeCyTHy58xNoL34h3p' },
            { name: 'Michael', identifer: 'flq6f7yk4E4fJM5XTYuZ' },
            { name: 'Ethan', identifer: 'g5CIjZEefAph4nQFvHAz' },
            { name: 'Chris', identifer: 'iP95p4xoKVk53GoZ742B' },
            { name: 'Gigi', identifer: 'jBpfuIE2acCO8z3wKNLl' },
            { name: 'Freya', identifer: 'jsCqWAovK2LkecY7zXl4' },
            { name: 'Brian', identifer: 'nPczCjzI2devNBz1zQrb' },
            { name: 'Grace', identifer: 'oWAxZDx7w5VEj9dCyTzz' },
            { name: 'Daniel', identifer: 'onwK4e9ZLuTAKqWW03F9' },
            { name: 'Lily', identifer: 'pFZP5JQG7iQjIQuC4Bku' },
            { name: 'Serena', identifer: 'pMsXgVXv3BLzUgSXRplE' },
            { name: 'Adam', identifer: 'pNInz6obpgDQGcFmaJgB' },
            { name: 'Nicole', identifer: 'piTKgcLEGmPE4e6mEKli' },
            { name: 'Bill', identifer: 'pqHfZKP75CvOlQylNhV4' },
            { name: 'Jessie', identifer: 't0jbNlBVZ17f02VDIeMI' },
            { name: 'Sam', identifer: 'yoZ06aMxZJJ28mfd3POQ' },
            { name: 'Glinda', identifer: 'z9fAnlkpzviPz146aGWa' },
            { name: 'Giovanni', identifer: 'zcAOhNBS3c14rBihAFp1' },
            { name: 'Mimi', identifer: 'zrHiDhphv9ZnVXBqCLjz' },
        ];

    } else {

        // Return Polly voices
        voices = [
            { name: 'Nicole', identifer: 'Nicole' },
            { name: 'Russell', identifer: 'Russell' },
            { name: 'Amy', identifer: 'Amy' },
            { name: 'Emma', identifer: 'Emma' },
            { name: 'Brian', identifer: 'Brian' },
            { name: 'Aditi', identifer: 'Aditi' },
            { name: 'Raveena', identifer: 'Raveena' },
            { name: 'Ivy', identifer: 'Ivy' },
            { name: 'Joanna', identifer: 'Joanna' },
            { name: 'Kendra', identifer: 'Kendra' },
            { name: 'Kimberly', identifer: 'Kimberly' },
            { name: 'Salli', identifer: 'Salli' },
            { name: 'Joey', identifer: 'Joey' },
            { name: 'Justin', identifer: 'Justin' },
            { name: 'Matthew', identifer: 'Matthew' },
            { name: 'Geraint', identifer: 'Geraint' },
        ]

    }

    return NextResponse.json({ voices }, {
        status: 200
    });

}
