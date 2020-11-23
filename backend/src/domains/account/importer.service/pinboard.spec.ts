import { Test } from '@nestjs/testing';
import { PinboardImporter } from './pinboard';

const data = `[
  {
    "href": "https:example.com/1",
    "description": "Descript 1",
    "extended": "",
    "meta": "1",
    "hash": "1",
    "time": "2020-11-15T17:38:52Z",
    "shared": "no",
    "toread": "no",
    "tags": "first"
  },
  {
    "href": "https:example.com/2",
    "description": "Descript 1",
    "extended": "",
    "meta": "2",
    "hash": "2",
    "time": "2020-11-14T01:29:08Z",
    "shared": "no",
    "toread": "no",
    "tags": "second"
  },
  {
    "href": "https:example.com/3",
    "description": "Descript 1",
    "extended": "",
    "meta": "3",
    "hash": "3",
    "time": "2020-11-12T23:30:14Z",
    "shared": "no",
    "toread": "no",
    "tags": "first second"
  }
]`;

describe('PinboardImporter', () => {
  let importer: PinboardImporter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PinboardImporter],
    }).compile();

    importer = await moduleRef.resolve(PinboardImporter);
  });

  it('should handle bad format', async () => {
    expect(() => importer.transform({ userId: 'test', data: 'a' })).toThrow();
  });

  it('should handle missing fields in the data', async () => {
    expect(() => importer.transform({ userId: 'test', data: "{ test: 'test'}" })).toThrow();
  });
});
