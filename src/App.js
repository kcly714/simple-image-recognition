import React, { Component } from 'react';
import './App.css';
import * as ml5 from "ml5";
import snowleopard from "./snowleopard.jpg";

class App extends Component {
    state = {
      //Empty array for predictions state
      predictions: []
    }
    classifyImage = () => {
      //start Image Classifying with MobileNet
      const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
      //when the  model is loaded
      function modelLoaded() {
        console.log('Model has been loaded')
      }
      const image = document.getElementById('image');
      classifier.predict(image, 5, function(error, results) {
        // Return the results from predictions
          return results;
        })
          .then((results) => {
            // Set the predictions into the state
            this.setPredictions(results)
    })
    }
  componentDidMount(){
      this.classifyImage();
    }
  setPredictions = (predictions) => {
    // Set the prediction state with the results from the model prediction
    this.setState({
        predictions
      });
  }
  render() {
  // First set the predictions to a default value while it is loading
   let predictions = (<div className="loader"></div>);
  // Mapping over the predictions and return the probability for each prediction
  if (this.state.predictions.length > 0) {
    predictions = this.state.predictions.map((pred, i) => {
     let { className, probability } = pred;
      // round the probability to 2 decimal places
      probability = Math.floor(probability * 10000) / 100 + "%";
      return (
        <div key={ i + "" }>{ i+1 }. Prediction: { className } at { probability } </div>
            )
          })
    }
    return (
      <div className="App">
        <h1>Classifying a image using ML5.JS</h1>
        <h3>Incase you were wondering, the animal below is a snow leopard</h3>
        <img src={snowleopard} width="400" alt="" id="image" /> 
        {predictions}
      </div>
    );
  }
}
export default App;
