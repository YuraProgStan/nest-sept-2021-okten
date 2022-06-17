import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from "path";
import {S3} from "aws-sdk";

@Injectable()
export class FileUploadAwsService {
    async upload(file, itemType, itemId) {
        const { originalname } = file;
        const bucketS3 = process.env.S3_NAME;
       return  await this.uploadS3(file.buffer, bucketS3, itemType, itemId, originalname);
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
            const sendData =  await s3.upload(params).promise();
            return  sendData.Location;

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
        const name = fileName.split('.')[0];
        const fileExtName = path.extname(fileName);
        const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

        return `${itemType}/${itemId}/${name}-${randomName}${fileExtName}`
    }

  getS3() {
        return new S3({
            region: process.env.S3_REGION,
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY,
        });
    }
}
