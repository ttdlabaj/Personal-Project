import React from 'react'
import QuotesAPI from '../api/QuotesAPI'
import { useEffect, useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import axios from 'axios'

function HomePage() {
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')

    const [videoId, setVideoId] = useState('')
    const [providerURL, setProviderURL] = useState('')

    const getVideo = async () => {
        try {
            const response = await axios.get('https://vimeo.com/api/oembed.json?url=https://vimeo.com/95380310')
            const { data } = response

            setVideoId(data.video_id)
            setProviderURL(data.provider_url)
            console.log('providerurl', data.provider_url)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getVideo()
    }, [])

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
        <Row>
            <Col sm={7}>
                <div className='quote-block'>
                    <p className='quote'>"{text}"</p>
                    <p className='author'>{author}</p>
                    <Link to='/dashboard'><Button variant="primary">View Dashboard</Button></Link>
                </div>
            </Col>
            <Col sm={5}>
                <iframe src={`//player.vimeo.com/video/` + `${videoId}`} width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Crossfit motivation"></iframe>
            </Col>
        </Row>
    )
}

export default HomePage
