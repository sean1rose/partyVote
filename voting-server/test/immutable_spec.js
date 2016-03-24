import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
  
  describe('a number', () => {
    function increment(currentState){
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);
      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('A List', () =>{
    function addMovie(currentState, movie){
      return currentState.push(movie);
    }

    it ('is immutable', () => {
      let state = List.of('Trainspotting', '28 Days Later');
      let nextState = addMovie(state, 'Sunshine');
    });

    expect(nextState).to.equal(List.of('Trainspotting', '28 Days Later', 'Sunshine'));
    // the old state would NOT have remained unchanged had we'd pushed into a regular array!
    expect(state).to.equal(List.of('Trainspotting', '28 Days Later'));
  });

  describe('a tree', () => {

    function addMovie(currentState, movie){
      /*
      return currentState.set(
        'movies',
        currentState.get('movies').push(movie)
      );
      */
      // look what's happening here ^^^ setting the 'movies' key of currentState tree map...
      // the new key === current 'movies' key (which is an array/list) + new movie pushed to the end of the array
      // push is a method on list
      // ^^^ translated, can use 'update' method, so code now is...
      return currentState.update('movies', movies => movies.push(movie));
    }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Trainspotting', '28 Days Later')
      });
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(Map({
        movies: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      }));
      expect(state).to.equal(Map({
        movies: List.of('Trainspotting', '28 Days Later')
      }));
    });
  });
});