<div align="center">

# 🔍 NMS Community Search

This project aims to be the "Yellow pages" of the NMS community. Our goal is to document the different Communities, tools, resources, builders and creators.

  [![Supported by the No Man's Sky Community Developers & Designers](https://raw.githubusercontent.com/NMSCD/About/master/badge/purple-ftb.svg)][nmscd] <br />
  ![madeWithLove](./.github/badges/built-with-love.svg)

  <br /> 
</div>


## Submitting a Community Link

There are currently two methods of submitting Community Links:
- **Easy method**: Complete this form [airtable.com/shrhZOQrrp9a9zoJk](https://airtable.com/shrhZOQrrp9a9zoJk?ref=nmscdCommunitySearchReadMe)
  - We will look at your application and move it to the public data if it meets our requirements.
- **Developer method**: You can add your community link to the [manualCommunityList.json](/seo/data/manualCommunityList.json) and then create a pull request.
  - Please be sure to use urls to images that are publicly available (test your images in incognito mode)

If your Community Link does not show up on the site after a day or two, feel free to contact the [AssistantNMS support email](mailto:support@nmsassistant.com). Multiple members have access to the support system that monitors that email address. OR you can open an issue in this repository.

<br />

## Building the project locally

The main logic of this solution uses SolidJS and SCSS for styling. To get the solution running, use the following commands:

- `npm i`
- `npm run dev`

For SEO we use HandlebarJS to template out the documents and generate as many files as possible. Part of this process fetches data from our central store of data which is in AirTable. In order to generate these files follow these steps:

- `cd ./seo`
- `npm i`
- `npm run seo`

<br />

## Deployment

This site makes use of Github Actions to build the project and Github Pages to host it 💪


<!-- Links used in the page -->

[nmscd]: https://github.com/NMSCD?ref=nmscdCommunitySearch
