import fetch from 'node-fetch'

const url = "https://random-word-api.herokuapp.com/word?number=8000"

export async function fetchWords() {
    // const res = await fetch("https://random-word-api.herokuapp.com/all")
    const res = await fetch(url)
    const payload = await res.json()
    return payload
}

export default fetchWords