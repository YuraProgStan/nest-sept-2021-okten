import { Module } from '@nestjs/common';
import { FileUploadCloudinaryService } from './fileupload-cloudinary.service';

@Module({
  providers: [FileUploadCloudinaryService],
  exports: [FileUploadCloudinaryService]
})
export class FileUploadCloudinaryModule {}
