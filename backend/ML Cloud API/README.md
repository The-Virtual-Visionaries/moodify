# Backend of Moodify

## API Specifications
> The API makes use of the model trained by [michellejieli](https://github.com/michellejieli) which classifies the emotion of a given text into one of the seven categories:
> - anger
> - fear
> - joy
> - disgust
> - sadness
> - surprise
> - neutral

## How to use the API
Make use of a GET request to the "/sentiment" endpoint with the "sentence" query parameter. The value of the "sentence" query parameter should be the text that you want to classify.
<br>

Sample request:
```
http://127.0.0.1:5000/sentiment?sentence="Today is a fantastic day. The weather was nice and I had a great time with my friends."
```

After the request is made, the API will return a JSON response with the following format:
```json
[
    {
        "label": "joy",
        "score": 0.999
    }
]
```

## Credits
The ML model used for this project is by [michellejieli](https://github.com/michellejieli) and can be found [here](https://huggingface.co/michellejieli/emotion_text_classifier).

## Authors
[Merrickneo](https://github.com/Merrickneo)
[Dilys Pang](https://github.com/Dilysss)
[Kevin Eyo](https://github.com/KevinEyo1)
[Kavan Tan](https://github.com/kavantan)