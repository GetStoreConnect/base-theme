# Base Theme

The StoreConnect Base theme is a clean and simple boilerplate ready for use. This starter theme is the default theme used in every StoreConnect installation.

![base_theme_banner](https://github.com/GetStoreConnect/base-theme/assets/77841884/8ae12805-438b-4d72-b224-f8496448b5d4)


## General Description

The Base Theme can help you with any of the following customizations:

- Overriding or customizing any page, template, or snippet
- Enhancing or creating complex functionalities to improve user experience, such as dynamic data displayed to customers only
- Creating and inserting new and reusable templates
- Finding specific templates, snippets, variables, or translation keys that you need to override in your StoreConnect app

We currently provide liquid templates to generate front-end components such as pages, content block templates, snippets, and components. Most pages are liquidify, meaning that you can access their page templates.

However, there are some exceptions such as product and category pages. On such cases, you can still access product cards, notices bars, and various sections that can be modified. You can even insert custom content blocks using the StoreConnect interface. You can learn more about how to customize your store in this [article](https://help.getstoreconnect.com/documentation/how-to-customise-the-design-of-your-store.html).

One important point to note is that you don't need to upload the entire base theme if you have modified or added any of the pages, templates, or snippets. You can simply override them directly into a new theme in your StoreConnect app.

### Pages

Page-level templates are templates that are output as the content of the entire page between the header and footer. They correspond to the page that the user is visiting. Some examples are the home page, the product page, the search page, and the cart page.

### Templates

Templates control the content you see on your Store. They define the HTML layout as well as the data content you want to show. There are several kinds of templates, with each serving a different purpose. You should customize them based on what you want to achieve.

![base_theme_preview](https://github.com/GetStoreConnect/base-theme/assets/77841884/76c06cba-c554-4857-a9cf-366dc06cde30)
                                                                                                                                                                
### Snippets

Snippets are reusable templates that you can load from any other template. For example, you may have a header that you want to use on each page.

### Locales

A Locale defines a set of translations for a given language. You can create a Locale for each language your theme needs to support.

### Variables

Variables are key-value pairs that you can use to provide configuration options for your theme.

### Assets

Stores your CSS and JS assets.

## Getting Started

There are two ways to develop a theme:

1. Create a new theme in your StoreConnect app. We recommend this approach if you are working on a single store.
2. Create a new theme using this base theme, customize it within your own dev environment, and then install it via the theme installer (provided by StoreConnect). We recommend this approach for devs creating new themes for multiple stores. Also you can take a look to our [Clean Theme](https://github.com/GetStoreConnect/clean-theme) for further reference.

If you have chosen the first option, you can follow the theme reference instructions which gives you a quick start. You can also find a complete guide on how to create a new theme within your store in the [Theme Builder Reference](https://help.getstoreconnect.com/documentation/themes/theme-reference.html) article.

Following the point #2 you will need to upload your theme using theme installer.

- Ensure that your root directory does not contain any .git hidden folders or files
- Compress it to a zip file
- Upload it via the theme importer
- Now, go to the theme template list and remove the .liquid on each template
- Preview your theme

The theme installer is located in your Salesforce org, where you need to upload this theme as a zip file. Before uploading, remove the .git directory and README.md file from this repo. The theme installer displays errors if it does not find the standard directory structure.

** Compatible with StoreConnect Liquid 0.11.3 and up **
