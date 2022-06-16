import {Injectable} from '@nestjs/common';
import {v2} from 'cloudinary';
import * as path from "path";
import * as streamifier from 'streamifier';

@Injectable()
export class FileUploadCloudinaryService {
    configCloudinary() {
        v2.config({
            cloud_name: process.env.CL_NAME,
            api_key: process.env.CL_API_KEY,
            api_secret: process.env.CL_API_SECRET,
        })
    }

    async upload(file, itemType, itemId) {
        console.log('now here');
        const folder = `${itemType}/${itemId}`;
        file.filename = this.fileNameBuilder(file.originalname);
        await this.configCloudinary();
        return new Promise((resolve, reject) => {
                const cld_upload_stream = v2.uploader.upload_stream({
                    folder: folder,
                    public_id: file.filename
                }, (error, result) => {
                    if (error) {
                        console.log(error)
                        return reject(error);
                    }
                    resolve(result.url);
                });

                streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
            }
        )
    }

    private fileNameBuilder(fileName: string): string {
        const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        const parseName = path.parse(fileName).name;
        return `${randomName}${parseName}`
    }
}
