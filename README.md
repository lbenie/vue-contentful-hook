# Vue Contentful

A hook to call the contentful API

## Usage

Ideally you should pass env variables as token and spaceId

```ts
export interface Dummy {
  items: {
    readonly name: string;
  };
}

const query = `
  {
    dummyCollection {
      items {
        name
      }
    }
  }
`;
const { data } = useContentful<Dummy>(query, {
  token: "myToken",
  spaceId: "mySpaceId",
});

console.log("data", data.value?.items);
```

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://lbenie.xyz/"><img src="https://avatars.githubusercontent.com/u/7316046?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lucien Bénié</b></sub></a><br /><a href="https://github.com/lbenie/ts-vite/commits?author=lbenie" title="Code">💻</a> <a href="https://github.com/lbenie/ts-vite/commits?author=lbenie" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
