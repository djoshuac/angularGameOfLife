const app = angular.module("angularLifeApp", []);

app.controller("lifeController", ($scope) => {
  let rows = 20;
  let cols = 20;
  let pastGenerations = [];

  $scope.board = clearBoard();
  $scope.board[0][1] = 1;
  $scope.board[1][2] = 1;
  $scope.board[2][0] = 1;
  $scope.board[2][1] = 1;
  $scope.board[2][2] = 1;

  $scope.nextGeneration = nextGeneration;
  $scope.setLife = setLife;
  $scope.isFocused = isFocused;

  $scope.focused = {
    i: 10,
    j: 10
  };

  function clearBoard() {
    board = [];
    for (let i = 0; i < rows; i++) {
      board.push([]);
      for (let j = 0; j < cols; j++) {
        board[i].push(0);
      }
    }
    return board;
  }

  function isAlive(i, j) {
    return 0 <= i && i < $scope.board.length &&
      0 <= j && j < $scope.board[i].length && $scope.board[i][j];
  }
  function isFocused(i, j) {
    return $scope.focused.i == i && $scope.focused.j == j;
  }

  function nextGeneration() {
    let next = clearBoard();

    for (let i = 0; i < next.length; i++) {
      for (let j = 0; j < next[i].length; j++) {
        let count = 0;

        for (let h = -1; h <= 1; h++) {
          for (let v = -1; v <= 1; v++) {
            if ((v !== 0 || h !== 0) && isAlive(i + h, j + v))
              count++;
          }
        }

        if (count == 3)
          next[i][j] = 1;
        else if(count == 2 && isAlive(i, j))
          next[i][j] = 1;
      }
    }

    pastGenerations.push($scope.board);
    $scope.board = next;
  }

  function setLife(i, j, life) {
    $scope.board[i][j] = life;
    console.log(i, j, life)
  }
});
