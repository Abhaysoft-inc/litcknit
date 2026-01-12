import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/config/cloudinary';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const fileType = formData.get('fileType') as string; // 'image' or 'pdf'

        if (!file) {
            return NextResponse.json(
                { success: false, message: 'No file provided' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadOptions: any = {
                folder: fileType === 'pdf' ? 'litcknit/rulebooks' : 'litcknit/posters',
                resource_type: fileType === 'pdf' ? 'raw' : 'image',
            };

            // For images, add transformation options
            if (fileType === 'image') {
                uploadOptions.transformation = [
                    { width: 1920, height: 1080, crop: 'limit' },
                    { quality: 'auto' },
                    { fetch_format: 'auto' }
                ];
            }

            cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        return NextResponse.json({
            success: true,
            data: {
                url: (result as any).secure_url,
                publicId: (result as any).public_id,
            },
        });
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Upload failed' },
            { status: 500 }
        );
    }
}

// DELETE - Remove file from Cloudinary
export async function DELETE(req: NextRequest) {
    try {
        const { publicId, resourceType } = await req.json();

        if (!publicId) {
            return NextResponse.json(
                { success: false, message: 'No public ID provided' },
                { status: 400 }
            );
        }

        await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType || 'image'
        });

        return NextResponse.json({
            success: true,
            message: 'File deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Delete failed' },
            { status: 500 }
        );
    }
}
