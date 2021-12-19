import React from 'react'
import QuotesAPI from '../api/QuotesAPI'
import { useEffect, useState } from 'react'

function HomePage() {
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')

    useEffect(() => {
        async function getData() {
            try {
                const jsonResponse = await QuotesAPI.fetchQuote()
                let randomNum = Math.floor(Math.random() * jsonResponse.length)
                let randomQuote = jsonResponse[randomNum]
                setText(randomQuote.text)
                setAuthor(randomQuote.author)
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, [])

    return (
        <div>
            <p className='quote'>{text}</p>
            <p className='author'>{author}</p>
        </div>
    )
}

export default HomePage
