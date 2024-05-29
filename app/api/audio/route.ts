import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { Engine, PollyClient, SynthesizeSpeechCommand, SynthesizeSpeechCommandInput, VoiceId } from "@aws-sdk/client-polly";

const pollyClient = new PollyClient({
    region: process.env.AWS_REGION || '',
    credentials: {
        accessKeyId: process.env.CUSTOM_AWS_ACCESS_KEY || '',
        secretAccessKey: process.env.CUSTOM_AWS_SECRET_ACCESS_KEY || ''
    }
});

export async function POST(req: NextRequest, res: NextResponse) {

    if (req.method === 'POST') {

        const { text, licenseKey, voiceId } = (await req.json()) as { text: string; licenseKey: string, voiceId: VoiceId };      
        
        // ElevenLabs

        if (licenseKey == process.env.MASTER_LICENSE_KEY) {

            const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
            const data = {
                text,
                model_id: "eleven_turbo_v2"
            };
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': process.env.ELEVENLABS_API_KEY || '',
                },
                body: JSON.stringify(data)
            });
    
            try {
    
                const audioBlob = await response.blob();        
                const audioStream = await audioBlob.stream();

                return new NextResponse(audioStream as any, {
                    headers: {
                        'Content-Type': 'audio/mpeg',
                        'Cache-Control': 'no-cache',
                    },
                });
    
            } catch(e) {
    
                return NextResponse.json({ success: false, error: 'Failed to synthesize speech' }, { status: 500 });
    
            }

        }

        // Polly

        let engine: Engine = 'standard';
        if (licenseKey == process.env.MASTER_LICENSE_KEY) {
            engine = 'neural';
        }

        let LMResponse = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                license_key: licenseKey,
            }),
        });

        let LMData = await LMResponse.json();

        if (LMData.valid) {

            try {

                const params: SynthesizeSpeechCommandInput = {
                    Engine: engine,
                    OutputFormat: "mp3",
                    Text: text,
                    VoiceId: voiceId,
                };

                const command = new SynthesizeSpeechCommand(params);
                const response = await pollyClient.send(command);

                return new NextResponse(response.AudioStream as any, {
                    headers: {
                        'Content-Type': 'audio/mpeg',
                        'Cache-Control': 'no-cache',
                    },
                });

            } catch (error) {

                return NextResponse.json({ success: false, error: 'Failed to synthesize speech' }, { status: 500 });

            }

        } else {

            return NextResponse.json({ success: false, error: 'License invalid' }, { status: 400 });

        }

    } else {

        return NextResponse.json({ message: 'Method not allowed' }, {
            status: 405
        });

    }

}
