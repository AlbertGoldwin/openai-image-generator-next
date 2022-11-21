import { openai } from '../../lib/openai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const result = await openai.createImage({
        prompt: req.body.prompt,
        n: 1,
        size: '512x512',
      });

      console.log(result);

      res.status(200).json(result.data.data[0].url);
    } catch (err) {
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
      res.status(err.response.status || 500).json(err.message);
    }
  }
}
