const createDescription = async (description, post, image, token) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/${post}/${image}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(description)
        })
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}

export default createDescription