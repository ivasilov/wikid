import { Args, Field, InputType, Mutation, ObjectType } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql.guard';
import { UseGuards } from '@nestjs/common';
// use the exports from graphql-upload, the type FileUpload is missing from apollo-server-express
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { ImporterService } from './importer.service';
import { CurrentUser } from '../auth/currentUser';
import { BookmarkNullablePageInput } from '../bookmarks/resolver';

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
  upload: Promise<FileUpload>;

  @Field(type => [BookmarkNullablePageInput], { nullable: true })
  pages: { id: string; name: string }[];
}

@UseGuards(GqlAuthGuard)
export class AccountResolver {
  constructor(private importer: ImporterService) {}

  @Mutation(returns => UploadedFileResponse)
  async import(
    @CurrentUser() user: { id: string },
    @Args('params') params: ImportInput,
  ): Promise<UploadedFileResponse> {
    const data = await params.upload;
    return new Promise<Buffer>((resolve, reject) => {
      let bufs: Uint8Array[] = [];
      const stream = data.createReadStream();
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
    }).then(async buff => {
      await this.importer.import(params.type, buff.toString(), params.pages, user.id);

      return {
        filename: '',
        mimetype: '',
        encoding: '',
        url: '',
      };
    });
  }
}
