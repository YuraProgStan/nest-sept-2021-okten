import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import path from "path";
import {S3} from "aws-sdk";

@Injectable()
export class FileUploadAwsService {
    async upload(file, itemType, itemId) {
        console.log(file)
        const { originalname } = file;
        const bucketS3 = process.env.S3_NAME;
        await this.uploadS3(file.buffer, bucketS3, itemType, itemId, originalname);
    }

 private   async uploadS3(file, bucket, itemType, itemId, originalname) {

        const uploadFilePath = this.fileNameBuilder(originalname, itemType, itemId);
        console.log(uploadFilePath)
        const s3 = this.getS3();
        const params = {
            Bucket: bucket as string,
            Key: uploadFilePath,
            Body: file,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };

        try{
            const uploadResult = await s3.upload(params).promise();
            const  url = uploadResult.Location;
            console.log(url);
            return  url
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

        return `${itemType}/${itemId}/${randomName}${fileName}`
    }

  getS3() {
        return new S3({
            region: process.env.S3_REGION,
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY,
        });
    }
}
