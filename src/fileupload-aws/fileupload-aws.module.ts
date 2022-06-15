import {Module} from '@nestjs/common';
import { FileUploadAwsService } from './fileupload-aws.service';


@Module({
  providers: [FileUploadAwsService],
  exports: [FileUploadAwsService]
})
export class FileUploadAwsModule {

}
