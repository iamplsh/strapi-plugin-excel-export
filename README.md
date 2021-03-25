# Strapi plugin excel export



## First Setup
```bash
cd /<path-to-your-strapi-project

# create plugins folder if not exists
# mkdir plugins

# go to plugins folder
cd plugins

# clone the plugin code into a folder and skip the prefix
git clone https://github.com/iamplsh/strapi-plugin-excel-export.git excel-export
# install dependencies
cd excel-export && yarn install
# build the plugin
cd ../..
yarn build

# start
yarn develop
```

Note:
> it's important to clone the repo into a target folder named `excel-export`, the prefix has to be omitted.

## Plugin development
```bash
yarn develop --watch-admin
```
Running at http://localhost:8000/

## Features

- Support Excel export

**Not supported**

- Media fields, e.g. image, video, etc.

## References

- [Component List - Strapi Helper Plugin](https://github.com/strapi/strapi/tree/master/packages/strapi-helper-plugin/lib/src/components)
- [Strapi Content Import Plugin](https://github.com/strapi/community-content/tree/master/tutorials/code/import-content-plugin-tutorial/plugins/import-content)
- [Guide to Strapi Content Import Plugin](https://strapi.io/blog/how-to-create-an-import-content-plugin-part-1-4?redirectPage=3)
- [Strapi Styled Component](https://buffetjs.io/storybook/?path=/story/components--button)
# strapi-plugin-excel-export
