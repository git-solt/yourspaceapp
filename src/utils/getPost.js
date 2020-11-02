const getPost = async (id) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/posts/post/${id}`)
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}

export default getPost