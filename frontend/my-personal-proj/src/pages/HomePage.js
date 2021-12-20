import React from 'react'
import QuotesAPI from '../api/QuotesAPI'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
        <div className='quote-block'>
            <p className='quote'>"{text}"</p>
            <p className='author'>{author}</p>
            <Link to='/'><Button variant="primary">View Daily Tasks</Button></Link>
        </div>
    )
}

export default HomePage
