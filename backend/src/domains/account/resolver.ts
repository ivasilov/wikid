import { UseGuards } from '@nestjs/common';
import { Args, Field, InputType, Mutation, ObjectType } from '@nestjs/graphql';
// use the exports from graphql-upload, the type FileUpload is missing from apollo-server-express
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Ctx, RequestContext } from '../../app';
import { CurrentUser } from '../auth/currentUser';
import { GqlAuthGuard } from '../auth/gql.guard';
import { BookmarkNullablePageInput } from '../bookmarks/resolver';
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
  upload: Promise<FileUpload>;

  @Field(type => [BookmarkNullablePageInput], { nullable: true })
  pages: { id: string; name: string }[];
}

@UseGuards(GqlAuthGuard)
export class AccountResolver {
  constructor(private importer: ImporterService) {}

  @Mutation(returns => UploadedFileResponse)
  async import(
    @Ctx() ctx: RequestContext,
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
      await this.importer.import(ctx, params.type, buff.toString(), params.pages, user.id);

      return {
        filename: '',
        mimetype: '',
        encoding: '',
        url: '',
      };
    });
  }
}
