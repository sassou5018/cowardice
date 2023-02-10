
export default async function Head({params}: any) {
    const { username } = params;
    //const article = await getArticle(id);
    return (
      <>
        <title>{`${username} - Cowardice`}</title>
      </>
    )
  }
  