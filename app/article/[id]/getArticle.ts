import pb from "@/pocketbase"
export default async function getArticle(id: string) {
    let article
    try {
        article = await pb
            .collection('articles')
            .getOne(id, { expand: 'author' })
    } catch (error) {
        console.log('EEEEEEEEEEEEEEEEEROOOOOOOOOOOOOOOOOOOOR')
        //console.log("error", error)
        return { error: true }
    }
    return article
}