import getArticle from "./getArticle";
export default async function Head({params}: any) {
    const { id } = params;
    //const article = await getArticle(id);
    return (
      <>
        <title>Article - Cowardice</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Open Source, Anonymized Blog" />
        <link rel="icon" href="/favicon.ico" />
      </>
    )
  }
  