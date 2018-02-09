//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import animal from "./animals.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    animal,
    clickedanimal: [],
    score: 0
  };

//when you click on a card ... the animal is taken out of the array
  imageClick = event => {
    const currentanimal = event.target.alt;
    const animalAlreadyClicked =
      this.state.clickedanimal.indexOf(currentanimal) > -1;

//if you click on an animal that has already been selected, the game is reset and cards reordered
    if (animalAlreadyClicked) {
      this.setState({
        animal: this.state.animal.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedanimal: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available animal, your score is increased and cards reordered
    } else {
      this.setState(
        {
          animal: this.state.animal.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedanimal: this.state.clickedanimal.concat(
            currentanimal
          ),
          score: this.state.score + 1
        },
//if you get all 12 animals corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              animal: this.state.animal.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedanimal: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.animal.map(animal => (
            <FriendCard
              imageClick={this.imageClick}
              id={animal.id}
              key={animal.id}
              image={animal.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;