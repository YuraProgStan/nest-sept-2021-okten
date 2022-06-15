import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import path from "path";
import {S3} from "aws-sdk";

@Injectable()
export class FileUploadAwsService {
    async upload(file, itemType, itemId) {
        const { originalname } = file;
        const bucketS3 = process.env.AWS_NAME;
        await this.uploadS3(file.buffer, bucketS3, itemType, itemId);
    }

 private   async uploadS3(file, bucket, itemType, itemId) {
        const uploadFilePath = this.fileNameBuilder(file.originalname, itemType, itemId);
        const s3 = this.getS3();
        const params = {
            Bucket: bucket as string,
            Key: String(name),
            Body: file,
        };

        try{
            return   await s3.upload(params).promise();
        }catch (e) {
            throw  new HttpException('problem with uploading file on aws', HttpStatus.BAD_REQUEST)
        }
        // return new Promise((resolve, reject) => {
        //   s3.upload(params, (err, data) => {
        //     if (err) {
        //       Logger.error(err);
        //       reject(err.message);
        //     }
        //     resolve(data);
        //   });
        // });
    }
    private fileNameBuilder(fileName: string, itemType: string, itemId: number): string{
        const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        const fileExtension = path.extname(fileName); //.png
        return `${itemType}/${itemId}/${randomName}${fileName}`
    }

  getS3() {
        return new S3({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }
}
