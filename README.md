# honstore-et

[日本語](README.JA.md)

> [!Note]
> *This is an AI-translated version of the original Japanese documentation.*

[![License: AGPL-3.0](https://img.shields.io/github/license/Hyz-sui/honstore-et?style=for-the-badge&labelColor=222222&color=afbdff)](https://github.com/Hyz-sui/honstore-et/blob/main/LICENSE)
[![Bluesky: @hyzsui.com](https://img.shields.io/badge/Bluesky-%40hyzsui.com-afbdff?style=for-the-badge&logo=bluesky&labelColor=222222)](https://bsky.app/profile/hyzsui.com)

<https://honst.hyzsui.com/>

A cross-search web application that allows you to search for books at once across various places, from online bookstores and e-book stores to physical store inventories, used bookstores, and libraries.

![Screenshot of an actual usage example. A query is entered in a text box, and multiple search links for various stores are listed below it.](./doc-resources/sample.png)

## Features

With a single search query, it generates a comprehensive collection of cross-search links spanning many online bookstores, e-book stores, physical bookstore inventories, used bookstores, libraries, and bibliographic information.

You can also share the generated collection of links directly from the search results page.

## Usage

Access the top page and enter the title or keyword of the book you are looking for in the search box; a list of links to the search results for each bookstore or library will be displayed. You can directly jump to the search result page of your desired store by clicking its link.

If you add specific stores to your favorites, they will be grouped and displayed at the top.

Furthermore, by sharing the URL of your search state with others, it serves as a collection of links for them to buy from their preferred stores.

## Development

This project uses [React](https://react.dev/) for the frontend, [Hono](https://hono.dev/) for the backend, and runs on [Cloudflare Workers](https://developers.cloudflare.com/workers/).

### Prerequisites

- Node.js
- pnpm

### Local Development

Install dependencies and start the local development server.

1. Install dependencies

    ```bash
    pnpm install
    ```

2. Start local development server

    ```bash
    pnpm run dev
    ```

## Credits & Thanks

- [encoding.js](https://github.com/polygonplanet/encoding.js): [MIT License](https://github.com/polygonplanet/encoding.js/blob/master/LICENSE)
- [Nano ID](https://github.com/ai/nanoid): [MIT License](https://github.com/ai/nanoid/blob/main/LICENSE)
- [Material Symbols](https://fonts.google.com/icons): [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
- [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa): [MIT License](https://github.com/vite-pwa/vite-plugin-pwa/blob/main/LICENSE)
- [React](https://react.dev/): [MIT License](https://github.com/facebook/react/blob/main/LICENSE)
- [Vite](https://vite.dev/): [MIT License](https://github.com/vitejs/vite/blob/main/LICENSE)
- [Hono](https://hono.dev/): [MIT License](https://github.com/honojs/hono/blob/main/LICENSE)

## License

[AGPL-3.0](LICENSE)
