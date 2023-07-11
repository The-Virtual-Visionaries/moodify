import flask
from flask_cors import CORS
from transformers import pipeline
import json

app = flask.Flask(__name__)
CORS(app)

@app.route('/')
def intro():
    return """
    <h1> Welcome to the backend of moodify. </h1>
    To get the sentiment of a sentence, go to /sentiment and provide the 
    sentence as a query parameter.
    """

@app.route('/sentiment', methods=['GET'])
def sentiment():
    sentence = flask.request.args.get('sentence')
    if sentence is None:
        return "Please provide a sentence to get the sentiment"
    else:
        classifier = pipeline('sentiment-analysis', model="michellejieli/emotion_text_classifier")
        result = classifier(sentence)
        return json.dumps(result)

if __name__ == '__main__':
    app.run(debug=True)