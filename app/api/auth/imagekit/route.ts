import config from '@/lib/config';
import ImageKit from 'imagekit';
import { NextResponse } from 'next/server';

const { env: {
    imagekit: { publickey, privatekey, urlEndpoint },
} } = config;

const imagekit = new ImageKit({
    publicKey: publickey,
    privateKey: privatekey,
    urlEndpoint: urlEndpoint,
});

export async function GET() {
    return NextResponse.json(imagekit.getAuthenticationParameters());
}