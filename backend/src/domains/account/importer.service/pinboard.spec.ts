import { Test } from '@nestjs/testing';
import { BookmarksService } from '../../bookmarks/service';
import { UsersService } from '../../users/service';
import { PinboardImporter } from './pinboard';

// const data = `[
//   {
//     "href": "https:example.com/1",
//     "description": "Descript 1",
//     "extended": "",
//     "meta": "1",
//     "hash": "1",
//     "time": "2020-11-15T17:38:52Z",
//     "shared": "no",
//     "toread": "no",
//     "tags": "first"
//   },
//   {
//     "href": "https:example.com/2",
//     "description": "Descript 1",
//     "extended": "",
//     "meta": "2",
//     "hash": "2",
//     "time": "2020-11-14T01:29:08Z",
//     "shared": "no",
//     "toread": "no",
//     "tags": "second"
//   },
//   {
//     "href": "https:example.com/3",
//     "description": "Descript 1",
//     "extended": "",
//     "meta": "3",
//     "hash": "3",
//     "time": "2020-11-12T23:30:14Z",
//     "shared": "no",
//     "toread": "no",
//     "tags": "first second"
//   }
// ]`;

describe('PinboardImporter', () => {
  let importer: PinboardImporter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PinboardImporter,
        { provide: BookmarksService, useValue: { create: () => {} } },
        { provide: UsersService, useValue: { findById: () => {} } },
      ],
    }).compile();

    importer = await moduleRef.resolve(PinboardImporter);
  });

  it('should handle bad format', async () => {
    await expect(() => importer.transform({ userId: 'test', data: 'a', pages: [] })).rejects.toThrow();
  });

  it('should handle missing fields in the data', async () => {
    await expect(() => importer.transform({ userId: 'test', data: "{ test: 'test'}", pages: [] })).rejects.toThrow();
  });
});
