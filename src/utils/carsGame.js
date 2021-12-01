// src/utils/carsGame.js
// This class contains all of the game logic for the cars game.
import {WID, HGT} from './constants.js'

// The board has a list of cars, which have the form:
//  car = {
//          next: -- pointer to next car in the list
//          id:   -- unique ID number for car.  Goal car has id 1
//          x, y: -- coordinates in board
//          ncols, nrows: -- size of the car
//          color: -- color to draw the car
//        }

// This array gives the list of puzzles for the game.  See the documentation
// for the 'loadPuzzle' function below to see a description of the syntax
// for each puzzle.
//
// Note that these puzzles were generated by program and picked at random,
// so they may not all be great puzzles.  We have a list of hundreds of
// puzzles, feel free to edit or add to this list.
//
// Also, below each puzzle is a comment that gives the solution to the
// puzzle.  Here is the syntax for each solution:
//    The solution is a sequence of moves, each move being two characters.
//    The first character of a move is a capital letter indicating which
//    car is moving (A = first car (the goal car), B = second car, and so on).
//    The second character is the direction of movement.  This is a lowercase
//    letter, u for up, d for down, l for left and r for right.
// You can uncomment this string, add the solutions to the game.  You could then
// add a button to show the solution (the game would animate through all the
// steps), or you could provide hints, where each time they hit the hint button
// it shows the next step of the solution.
const puzzleArr =
[
  "20|1 2 2 2 1 1|2 5 0 1 3 2|3 5 4 2 1 3|4 3 4 1 3 4|5 5 3 2 1 5",
  // "AlClDuDuDuClClClDdDdArArDdElElBdBdBdAr"
  "20|1 0 2 2 1 1|2 0 5 3 1 2|3 4 5 1 2 3|4 3 4 3 1 4|5 2 2 1 3 5",
  // "BrEuDlDlCuCuBrBrCuCuCuDrDrEdEdArArArAr"
  "22|1 1 2 2 1 1|2 4 0 1 3 2|3 6 0 1 3 3|4 2 4 1 3 4|5 5 4 2 1 5",
  // "AlBdCdDuDuDuElCdCdElElBdBdElElDdDdArArArAr"
  "22|1 1 2 2 1 1|2 4 0 1 3 2|3 5 0 1 3 3|4 2 4 1 3 4|5 5 4 2 1 5",
  // "AlBdCdDuDuDuElElCdCdElBdBdElElDdDdArArArAr"
  "24|1 3 2 2 1 1|2 5 0 1 3 2|3 3 3 1 3 3|4 4 4 2 1 4|5 2 4 1 3 5",
  // "AlAlAlBdCuCuDlBdBdEuEuEuDlDlCdCdDlEdEdArArArAr"
  "24|1 2 2 2 1 1|2 3 4 1 3 2|3 5 0 1 3 3|4 5 4 2 1 4|5 2 3 1 3 5",
  // "AlAlBuBuBuCdDlDlCdCdEuEuDlDlBdBdDlEdEdArArArAr"
  "30|1 1 2 2 1 1|2 5 0 1 3 2|3 5 5 2 1 3|4 4 4 1 3 4|5 2 4 1 3 5|6 0 3 3 1 6",
  // "AlDuDuClClDuDuFrFrFrEuEuClClClEdArArEdFlBdBdBdFlDdDdDdArAr"
  "30|1 1 2 2 1 1|2 5 0 1 3 2|3 4 5 2 1 3|4 3 1 1 3 4|5 1 5 1 2 5|6 0 4 2 1 6",
  // "BdClClFrFrEuEuClFrFrDdDdArEuEuEuAlDuDuFlBdBdFlFlDdDdArArAr"
  "32|1 0 2 2 1 1|2 5 1 1 3 2|3 5 5 2 1 3|4 3 2 1 3 4|5 1 5 1 2 5|6 0 4 2 1 6",
  // "ArClClClDuFrFrEuEuClFrFrDdDdArEuEuEuAlDuDuFlBdBdFlFlDdDdArArAr"
  "32|1 1 2 2 1 1|2 5 5 2 1 2|3 1 5 1 2 3|4 0 4 2 1 4|5 3 2 1 3 5|6 5 0 1 3 6",
  // "BlBlBlDrEuDrCuCuBlDrDrEdEdArCuCuCuAlEuEuDlDlDlEdEdArArFdFdFdAr"
  "34|1 1 2 2 1 1|2 1 5 1 2 2|3 0 4 2 1 3|4 4 5 3 1 4|5 5 0 1 3 5|6 3 4 1 3 6",
  // "CrEdFuFuDlDlFuCrBuBuCrCrDlDlFdFdArBuBuBuAlFuFuClClClEdEdFdFdArArAr"
  "30|1 0 2 2 1 1|2 4 1 1 3 2|3 4 4 2 1 3|4 5 0 1 3 4|5 4 5 2 1 5|6 2 3 1 3 6|7 1 4 1 2 7",
  // "ArArClDdDdElDdGuGuGuGuAlAlFuElElElFuClBdBdClClFdFdArArArAr"
  "34|1 1 2 2 1 1|2 4 0 1 3 2|3 5 4 2 1 3|4 6 0 1 3 4|5 2 4 1 3 5|6 5 5 2 1 6|7 1 5 1 2 7",
  // "ArBdClClDdDdEuFlDdFlGuGuGuGuGuAlAlEuEuClBdClClEdFlBdFlFlEdArArArAr"
  "36|1 0 2 2 1 1|2 5 0 1 3 2|3 5 4 2 1 3|4 5 5 2 1 4|5 4 3 1 3 5|6 2 4 1 3 6|7 1 5 1 2 7",
  // "ArArBdEuDlDlEuClClBdBdFuGuGuGuGuGuAlAlFuDlDlDlFuClClClEdEdFdFdArArArAr"
  "39|1 0 2 2 1 1|2 3 1 1 3 2|3 5 2 1 3 3|4 3 5 2 1 4|5 0 4 3 1 5|6 1 5 1 2 6|7 0 3 3 1 7",
  // "ArCuDrErErErErBdBdArBdFuGrGrFuFuFuFuAlGlGlBuBuBuDlDlDlElElCdCdElElBdBdArArAr"
  "43|1 2 2 2 1 1|2 4 2 1 3 2|3 0 3 3 1 3|4 4 5 3 1 4|5 3 3 1 3 5|6 1 5 1 2 6|7 0 4 3 1 7",
  // "AlBuBuEuEuGrGrFuGrGrEdEdArEdCrCrFuFuFuClBdClEuFuAlEuDlDlDlDlEuGlGlGlBdBdGlEdEdArArAr"
  "43|1 0 2 2 1 1|2 3 3 2 1 2|3 5 0 1 3 3|4 5 5 2 1 4|5 3 0 1 3 5|6 4 4 1 3 6|7 1 5 1 2 7|8 1 4 2 1 8",
  // "ArBrBrEdFuFuDlDlDlFuHrGuGuDlHrHrEdEdArGuGuGuAlEuEuHlHlFdFdFdBlHlEdEdArArEdBlCdCdCdAr"
  "46|1 0 2 2 1 1|2 5 5 2 1 2|3 6 0 1 3 3|4 3 0 1 3 4|5 4 0 1 3 5|6 1 5 1 2 6|7 0 4 2 1 7|8 2 1 1 3 8",
  // "BlBlBlCdCdCdDdEdGrGrFuFuBlBlGrGrDdDdHdHdArArFuFuFuAlAlDuDuGlHuHuGlEdEdGlDdDdGlHdHdArArArAr"
  "48|1 1 2 2 1 1|2 1 5 3 1 2|3 4 1 1 3 3|4 3 2 1 3 4|5 4 4 3 1 5|6 6 1 1 2 6|7 1 3 1 2 7|8 0 1 2 1 8",
  // "BrDuElElFdGdGdElCdElDdHrHrHrHrDuErHrCuErErErDdGuGuBlBlDdArGuGuGuAlDuDuElElElCdCdElDdDdArArArFd"
  "54|1 2 2 2 1 1|2 4 0 1 3 2|3 4 5 3 1 3|4 3 3 1 3 4|5 4 4 3 1 5|6 1 4 1 2 6|7 2 4 1 2 7|8 1 1 2 1 8",
  // "AlAlBdDuClDuElFdGuClGuElElBdElDdHrHrGuGuArHrDuErHrBuErErErDdFuFuClClDdArFuFuFuAlDuDuElElElBdBdElDdDdArArAr"
  "60|1 3 2 2 1 1|2 5 1 1 3 2|3 3 3 1 3 3|4 4 4 2 1 4|5 3 1 2 1 5|6 0 0 1 2 6|7 2 1 1 3 7|8 1 5 2 1 8",
  // "FdFdFdGdElElElHlGdAlAlAlCuCuDlBdBdGuGuDlDlCdHrFdFdDlGdErErErErCuGuDrDrDrFuFuGdHlGdArFuFuFuAlGuGuDlDlCdCdDlGdGdArArArAr"
  "66|1 0 2 2 1 1|2 4 0 1 3 2|3 0 3 3 1 3|4 1 4 1 3 4|5 4 5 3 1 5|6 0 1 2 1 6|7 4 4 3 1 7|8 3 3 1 2 8|9 2 0 1 2 9",
  // "HdCrCrCrDuHdGlIdIdFrFrIdArArDuDuDuIdClClBdIdGlGlBdFrFrFrBuBuCrCrDdGrDdDdAlAlGrIuIuIuGlIuClIuArArDuDuDuClBdClGlBdGlHuHuElElElBdArAr"
  "68|1 2 2 2 1 1|2 2 3 3 1 2|3 4 0 1 3 3|4 2 4 1 3 4|5 5 1 1 3 5|6 4 5 2 1 6|7 0 5 1 2 7|8 1 1 2 1 8|9 5 4 2 1 9",
  // "AlAlFlHlIlIlEdEdEdBrDuDuDuIlIlIlDdDdDdBlBlCdCdHrHrHrHrHrCuCuBrBrDuDuDuFlFlIrGuGuFlIrIrDdDdArGuGuGuAlDuDuIlIlIlDdDdArArDdBlBlCdCdCdArAr"
  "70|1 0 2 2 1 1|2 5 0 1 3 2|3 5 4 2 1 3|4 4 4 1 3 4|5 5 5 2 1 5|6 2 1 1 3 6|7 1 4 1 2 7|8 3 3 3 1 8|9 0 1 2 1 9",
  // "FuGdHlHlDuDuDuClClClClClDdDdDdHrHrFdFdFdArArArFuFuCrCrGuGuGuClClFdFdAlIrIrGuGuAlAlFuIrFuFuHlBdBdHlDuDuElElBdBdElDdDdElElHrHrFdFdFdArArArAr"
  "74|1 2 2 2 1 1|2 4 4 1 3 2|3 5 4 2 1 3|4 2 3 1 3 4|5 3 3 3 1 5|6 0 2 1 2 6|7 0 1 2 1 7|8 5 0 1 3 8|9 5 5 2 1 9",
  // "AlFdAlDuDuDuElElBuBuBuClClClBdBdBdClErErDdFdFdClDdDdArArArDuDuCrFuFuFuClDdDdAlAlGrFuFuAlDuGrGrDuDuElElBuBuHdHdIlIlHdHdIlBdBdErErDdDdIlIlDdArArArAr"
  "87|1 0 2 2 1 1|2 2 0 1 3 2|3 0 3 3 1 3|4 6 1 1 3 4|5 4 3 1 3 5|6 5 4 2 1 6|7 3 1 2 1 7|8 0 0 1 2 8|9 0 5 2 1 9",
  // "CrEdCrCrBdBdBdArGlGlHdHdGlHdAlBuBuBuClClEuEuEuFlDdDdFlFlEdEdEdCrCrBdFlIrHdHdFlBdGrGrGrBuBuClClEuEuFrFrGrGrEuEuCrCrBdFrBdHuHuIlBdArHuHuHuAlBuBuFlFlFlBdBdArArBdClClEdEdEdArAr"
  "53|1 0 2 2 1 1|2 1 0 3 1 2|3 2 1 1 2 3|4 5 0 1 3 4|5 4 4 2 1 5|6 3 4 1 2 6|7 2 4 1 3 7|8 5 5 2 1 8|9 4 3 3 1 9|10 4 5 1 2 10",
  // "BrErFuFuFuIlIlDdBrBrCuFuIlJuJuHlHlJuElElDdDdDdJuIrIrGuGuHlHlHlGdArArGdIlDuDuDuErErIlJdJdArJdJdElElDdDdAr"
  "56|1 1 2 2 1 1|2 4 0 1 3 2|3 3 0 1 3 3|4 4 5 3 1 4|5 2 5 1 2 5|6 1 3 3 1 6|7 6 1 1 2 7|8 1 5 1 2 8|9 0 4 2 1 9|10 0 1 2 1 10",
  // "AlBdBdDlEuFlCdCdGdGdGdGdJrJrJrJrCuCuFrJrBuBuFrFrEuDlEuEuEuArFrCdIrIrHuHuDlDlIrIrCdCdArCdFlFlHuHuFlBdIrBdBdArAr"
  "58|1 0 2 2 1 1|2 4 4 2 1 2|3 2 2 1 3 3|4 4 1 1 3 4|5 3 5 2 1 5|6 6 0 1 3 6|7 1 4 1 2 7|8 2 1 2 1 8|9 0 5 1 2 9|10 0 0 2 1 10",
  // "BlElFdFdFdGdHlHlCuBlBlBlCdDdHrHrHrCuBrBrGuGuElHrHrDuBrCdIuIuElCdArArGuGuIuIuJrIuJrGuAlAlCuCuBlBlBlCdCdArArDdDdArAr"
  "65|1 1 2 2 1 1|2 4 0 1 3 2|3 5 5 2 1 3|4 5 1 1 3 4|5 2 4 1 3 5|6 1 4 1 2 6|7 0 1 2 1 7|8 5 4 2 1 8|9 0 4 1 2 9|10 0 3 2 1 10",
  // "AlBdEuEuEuFdHlHlDdHlBdBdHlIdHlEdEdArArArEuGrGrGrEuEuHrHrFuIuJrIuIuIuIuJrFuFuFuFuHlHlJlJlEdEdEdAlAlAlBuClClDdEuClBdClClEdArArArAr"
  "68|1 0 2 2 1 1|2 3 0 1 3 2|3 1 4 3 1 3|4 2 1 1 3 4|5 1 5 3 1 5|6 5 4 1 2 6|7 5 0 2 1 7|8 5 1 2 1 8|9 4 0 1 2 9|10 4 3 3 1 10",
  // "DuFdIdGlJlJlJlIdHlIdIdIdCrCrCrJrJrDdDdJrBdBdHlHlHlBuBuClHlDuClClDuFuIuJlJlFuFuFuJlIuErErErIuCrCrCrIuJrJrDdDdDdArJrBdBdBdArGlFuGlIuArAr"
];

class carsGame
{
  constructor()
  {
    this.cars = null;     // Linked list of the cars for this puzzle
    this.numCars = 0;     // How many cars in the current puzzle.
    this.numMoves = 0;    // How many moves taken so far
    this.counter = 0;     // Counter to force redraw
    this.redrawCallback = null; // Call this to redraw app
    this.solved = false;  // Have we solved the puzzle?
    this.puzzleNumber = 1;  // Which puzzle are we playing?
    this.bestNumMoves = 0;  // The minimum number of moves for this puzzle.

    // Automatically load the first puzzle.
    this.loadPuzzle(1);
  }

  //////////////////////////////////////////////////////////////////////
  // The app calls this during start-up, passing a callback function to the
  // carsGame.  When this callback is called, the App will update its state
  // to be the counter value we pass to the function, and this will cause
  // the App to re-render.
  setRedrawCallback(func)
  {
    this.redrawCallback = func;
  }

  //////////////////////////////////////////////////////////////////////
  // Check to see if we have won the game
  hasWon()
  {
    return this.solved;
  }

  //////////////////////////////////////////////////////////////////////
  // Return the puzzle number
  getPuzzleNumber()
  {
    return this.puzzleNumber;
  }

  //////////////////////////////////////////////////////////////////////
  // Return the number of cars in the puzzle
  getNumCars()
  {
    return this.numCars;
  }

  //////////////////////////////////////////////////////////////////////
  // Return now many steps the player has taken so far
  getNumMoves()
  {
    return this.numMoves;
  }

  //////////////////////////////////////////////////////////////////////
  // Return the solution's number of moves
  getBestNumMoves()
  {
    return this.bestNumMoves;
  }

  //////////////////////////////////////////////////////////////////////
  // Return the car with the given index
  getCar(idx)
  {
    let c = this.cars;
    for (let i = 0; i < idx; i++)
    {
      c = c.next;
    }
    return c;
  }

  //////////////////////////////////////////////////////////////////////
  // Load the given puzzle into the board
  // Each puzzle is given by a string, with the following format:
  //  -- The string starts with the best number of moves followed by
  //    a list of cars.  Each of these elements is separated by a vertical bar.
  //  -- Each car has the following values, each separated by a space:
  //    -- car ID, an integer
  //    -- car X coordinate, an integer
  //    -- car Y coordinate, an integer
  //    -- car ncols, the width of the car, an integer
  //    -- car nrows, the height of the car, an integer
  //    -- car color, an integer
  loadPuzzle(number)
  {
    // Clear old data
    this.cars = null;
    this.numCars = 0;
    this.numMoves = 0;
    this.solved = false;
    this.puzzleNumber = number;

    // Get the puzzle's string
    let str = puzzleArr[number - 1];

    // Split the string into elements
    let arr = str.split("|");

    // The first element is the minimum number of moves to solve the puzzle.
    this.bestNumMoves = parseInt(arr[0], 10);

    // The remaining elements are each one car:
    for (let i = arr.length - 1; i >= 1; i--)
    {
      // Split the element into values, dividing at space characters.
      let vec = arr[i].split(" ");

      // Here is the default car color, the color for car 1 (the goal)
      let color = "#FF0000";

      // Set the car color based on the 6th value for the car.
      switch (parseInt(vec[5]))
      {
        default:
        case 1: break;
        case 2: color = "#00DD00";  break;
        case 3: color = "#0000FF";  break;
        case 4: color = "#FFFF00";  break;
        case 5: color = "#FF00FF";  break;
        case 6: color = "#00FFFF";  break;
        case 7: color = "#FFFFFF";  break;
        case 8: color = "#000000";  break;
        case 9: color = "#FF8800";  break;
        case 10: color = "#FF8888"; break;
      }

      // Construct the car object:
      let c = {
                next: this.cars,
                id: parseInt(vec[0]),
                x: parseInt(vec[1]),
                y: parseInt(vec[2]),
                ncols: parseInt(vec[3]),
                nrows: parseInt(vec[4]),
                color: color
              };

      // Add this car to the start of the linked list, and increment the
      // number of cars.
      this.cars = c;
      this.numCars++;
    }

    // Change the counter because we have changed the internals of the game,
    // then call the callback to rerender the App.
    this.counter++;
    if (this.redrawCallback !== null)
    {
      this.redrawCallback(this.counter);
    }
  }

  //////////////////////////////////////////////////////////////////////
  // Move the car with the given ID in the indicated direction (see moveThisCar)
  moveCar(id, dir)
  {
    // Find the car with this ID number:
    for (let car = this.cars; car != null; car = car.next)
    {
      if (car.id === id)
      {
        // We found the car, so move it.
        this.moveThisCar(car, dir);
        return;
      }
    }
  }

  //////////////////////////////////////////////////////////////////////
  // Internal routine: move the car in the indicated direction
  // Directions:  0=N, 1=S, 2=E, 3=W
  moveThisCar(car, dir)
  {
    // See if the car can move this direction
    if (car.ncols > 1)
    {
      // Horizontal car
      if (dir < 2)
      {
        // A horizontal car cannot move up or down
        return;
      }
    }
    else
    {
      // Vertical car
      if (dir > 1)
      {
        // A vertical car cannot move right or left
        return;
      }
    }

    // Get the current limits of the car.  What squares on the board
    // are covered by the car?  It will be all the squares from clx to chx
    // in X and from cly to chy in y.
    let clx = car.x;
    let chx = clx + car.ncols - 1;
    let cly = car.y;
    let chy = cly + car.nrows - 1;

    // Shift the limits by the move.  These limits will be where the car
    // would be after the move.
    switch (dir)
    {
      default:
      case 0: cly--;  chy--;  break;
      case 1: cly++;  chy++;  break;
      case 2: clx++;  chx++;  break;
      case 3: clx--;  chx--;  break;
    }

    // Is this car still on the board?
    if (clx < 0 || cly < 0 || chx >= WID || chy >= HGT)
    {
      return;
    }

    // Do we collide with another car?
    for (let c2 = this.cars; c2 !== null; c2 = c2.next)
    {
      if (c2.id === car.id)
      {
        // Skip this car!
        continue;
      }
      // Get the limits of this other car
      let tlx = c2.x;
      let thx = tlx + c2.ncols - 1;
      let tly = c2.y;
      let thy = tly + c2.nrows - 1;

      // Convert this to the union.  When we are done with this, the t..
      // values give the squares on the board that are in both the
      // moved version of this car and the other car.
      if (clx > tlx) { tlx = clx; }
      if (chx < thx) { thx = chx; }
      if (cly > tly) { tly = cly; }
      if (chy < thy) { thy = chy; }
      // If the union has a positive araa, the boxes overlap, so the car
      // cannot make the move.
      if (tlx <= thx && tly <= thy)
      {
        return;
      }
    }

    // If this is the goal car and it is at the exit, then the
    // puzzle is solved.
    if (car.id === 1 && chx === WID - 1)
    {
      this.solved = true;
    }

    // Now move the car
    car.x = clx;
    car.y = cly;
    this.numMoves++;

    // Redraw the board
    this.counter++;
    if (this.redrawCallback !== null)
    {
      this.redrawCallback(this.counter);
    }
  }

  //////////////////////////////////////////////////////////////////////
  // Switch to the next puzzle
  nextPuzzle()
  {
    this.puzzleNumber++;
    if (this.puzzleNumber > puzzleArr.length)
    {
      this.puzzleNumber = 1;
    }
    this.loadPuzzle(this.puzzleNumber);
  }

  //////////////////////////////////////////////////////////////////////
  // Start this puzzle over again
  resetPuzzle()
  {
    this.loadPuzzle(this.puzzleNumber);
  }
};

export default carsGame;
