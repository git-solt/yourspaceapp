const removeDescription = async (post, image, description, token) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/${post}/${image}/${description}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return await response.json()
    } catch (e) {
        console.log(e)
    }

}

export default removeDescription