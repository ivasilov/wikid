# Wikid

Wikid is an app for keeping your personal information organized. It organizes your bookmarks in a wiki format.

> **Warning** This project is not production ready. Please read this README before deploying and using it.

## About The Project

This project is imagined to be a bookmark manager with a twist. The twist comes in the ability to organize bookmarks
around user-created pages which will give additional context about the bookmarks and the reason for their save :).

### Built With

- React
- TypeORM
- NestJS
- TailwindCSS
- Apollo

## Getting Started

This is an example of how you may give instructions on setting up your project locally. To get a local copy up and
running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- Nodejs 14
- yarn

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ivasilov/wikid.git
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```
3. Configure your database credentials in `backend/ormconfig.yml`
4. Run the command for starting both frontend and backend:
   ```sh
   yarn develop
   ```

### Usage

You can easily build a docker image by running:

```sh
docker build .
```

## Things to implement before MVP

- Refactor the user password. IMPORTANT: The passwords are not hashed!
- Signing up with an email
- Add account management screens
- Deleting a bookmark does nothing on the backend
- Web extension

## Roadmap

- Migrate to Nextjs for frontend
- Replace TypeORM with Prisma
- Remove Blueprintjs and replace it with headless.dev
- Remove all scss, remove node-sass package and use tailwind everywhere instead

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

## License

Distributed under the MIT License.
