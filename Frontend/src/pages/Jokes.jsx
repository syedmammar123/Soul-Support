import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Jokes = () => {
    const [jokes,setJokes] = useState([])

    useEffect(()=>{
        axios.get('/api/jokes')
        .then((response)=>{
            setJokes(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },
    [])

  return (
    <div>
        <h1>Jokes={jokes.length}</h1>
        {jokes.map((joke,index)=>(
            <div key={joke.id}>
             <p>{joke.id}</p>
             <p>{joke.joke}</p>
            </div>
        ))}
    </div>
  )
}

export default Jokes