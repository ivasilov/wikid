import { Args, Field, InputType, Mutation, ObjectType } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql.guard';
import { UseGuards } from '@nestjs/common';
// use the exports from graphql-upload, the type FileUpload is missing from apollo-server-express
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { ImporterService } from './importer.service';

@ObjectType()
class UploadedFileResponse {
  @Field({ nullable: false })
  filename: string;

  @Field({ nullable: false })
  mimetype: string;

  @Field({ nullable: false })
  encoding: string;

  @Field({ nullable: false })
  url: string;
}

@InputType()
class ImportInput {
  @Field()
  type: string;

  @Field(type => GraphQLUpload)
  upload: FileUpload;
}

@UseGuards(GqlAuthGuard)
export class AccountResolver {
  constructor(private importer: ImporterService) {}

  @Mutation(returns => UploadedFileResponse)
  import(@Args('params') params: ImportInput): Promise<UploadedFileResponse> {
    return new Promise<Buffer>((resolve, reject) => {
      let bufs: Uint8Array[] = [];
      const stream = params.upload.createReadStream();
      stream.on('data', d => {
        bufs.push(d);
      });
      stream.on('error', (e: any) => {
        reject(e);
      });
      stream.on('end', () => {
        const buffer = Buffer.concat(bufs);
        resolve(buffer);
      });
    }).then(buff => {
      this.importer.import(params.type, buff.toString());

      return {
        filename: '',
        mimetype: '',
        encoding: '',
        url: '',
      };
    });
  }
}
