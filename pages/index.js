import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  // const [imageUrl, setImageUrl] = useState('');
  // const [error, setError] = useState('');

  const { data, isLoading, error, refetch, fetchStatus } = useQuery(
    ['generateImage'],
    async () => {
      const res = await axios.post(
        'api/openAi',
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_OPEN_AI_KEY}`,
          },
        }
      );

      return res.data;
    },
    {
      enabled: false,
    }
  );

  console.log(isLoading, fetchStatus);

  // const generateImage = async () => {
  //   setImageUrl('');
  //   setError('');
  //   try {
  //     const res = await axios.post(
  //       '/api/openAi',
  //       { prompt },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env.NEXT_OPEN_AI_KEY}`,
  //         },
  //       }
  //     );

  //     setImageUrl(res.data);
  //   } catch (err) {
  //     console.log(err.response.data);
  //     setError(err.message);
  //   }
  // };

  return (
    <div className="app-main">
      <div className="app-container">
        <h2>Generate image using Open AI API</h2>
        <textarea
          className="app-input"
          cols="40"
          rows="10"
          placeholder="Search Bears with Paint Brushes the Starry Night, painted by Michaelangelo..."
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={() => refetch({ cancelRefetch: true })}>
          Generate an Image
        </button>
        {fetchStatus === 'fetching' && <img src={'/loader.svg'} alt="loader" />}
        {!!data && fetchStatus === 'idle' && (
          <img
            className="app-image"
            src={isLoading ? '/loader.svg' : data}
            alt="result"
          />
        )}
        {error && <p className="error-msg">{error.message}</p>}
      </div>
    </div>
  );
}
