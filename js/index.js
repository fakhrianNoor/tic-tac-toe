// JavaScript Document
$(document).ready(function () {
  var x = "x"
  var o = "o"
  var count = 0;
  var o_win = 0;
  var x_win = 0;
  var board_size = 3; //the size of the board in n x n 
  var winning_condition = 3; //the amount of concurrent marks that need to filled to determined the winner

  var board = $('.btn.span1');
  var t = 'x';

  $('#game li').click(function () {
    if (is_winner('o')) {
      alert('O has won the game. Start a new game')
      $("#game li").text("+");
      $("#game li").removeClass('disable')
      $("#game li").removeClass('o')
      $("#game li").removeClass('x')
      $("#game li").removeClass('btn-primary')
      $("#game li").removeClass('btn-info')
    }
    else if (is_winner('x')) {
      alert('X wins has won the game. Start a new game')
      $("#game li").text("+");
      $("#game li").removeClass('disable')
      $("#game li").removeClass('o')
      $("#game li").removeClass('x')
      $("#game li").removeClass('btn-primary')
      $("#game li").removeClass('btn-info')
    }
    else if (count == 9) {
      alert('Its a tie. It will restart.')
      $("#game li").text("+");
      $("#game li").removeClass('disable')
      $("#game li").removeClass('o')
      $("#game li").removeClass('x')
      $("#game li").removeClass('btn-primary')
      $("#game li").removeClass('btn-info')
      count = 0
    }
    else if ($(this).hasClass('disable')) {
      alert('Already selected')
    }
    else if (count % 2 == 0) {
      count++
      $(this).text(o)
      $(this).addClass('disable o btn-primary')
      if (is_winner('o')) {
        alert('O wins')
        count = 0
        o_win++
        $('#o_win').text(o_win)
      }
    }
    else {
      count++
      $(this).text(x)
      $(this).addClass('disable x btn-info')
      if (is_winner('x')) {
        alert('X wins')
        count = 0
        x_win++
        $('#x_win').text(x_win)
      }
    }

  });
  
  $("#reset").click(function () {
    $("#game li").text("+");
    $("#game li").removeClass('disable')
    $("#game li").removeClass('o')
    $("#game li").removeClass('x')
    $("#game li").removeClass('btn-primary')
    $("#game li").removeClass('btn-info')
    count = 0

  });


  function is_winner(player) {
    var is_win = false;

    //row checking
    for (var i = 0; i < board_size; i++) {
      for (var j = i*board_size; j < (i*board_size)+board_size; j++) {
          if (board[j].classList.contains(player) && j + winning_condition <= (i*board_size)+board_size) {
          is_win = true;
          for (var w = j+1; w < j+winning_condition; w++) {
            if (!board[w].classList.contains(player)) {
              is_win = false;
              break;
            }
          }
          if(is_win)
            return true;
        }
      }
    }

    //collumn checking
    is_win = false;
    for (var i = 0; i < board_size; i++) {
      for (var j = i; j < ((board_size-1)*board_size)+i; j+=board_size) {
        if (board[j].classList.contains(player) && j+((winning_condition-1)*board_size) <=  ((board_size-1)*board_size)+i) {
          is_win = true;
          for (var w = j+board_size; w <= j+((winning_condition-1)*board_size); w+=board_size) {
            if (!board[w].classList.contains(player)) {
              is_win = false;
              break;
            }
          }
          if(is_win)
            return true;
        }
      }
    }


    //right diagonal checking
    is_win = false;
    for (var i = 0; i <= board_size - winning_condition; i++) {
      for (var j = i; j <= board_size - winning_condition + (i*board_size); j+=board_size){

        if (board[j].classList.contains(player)){
          is_win = true;
          for (var w = j+board_size+1; w <= j+((winning_condition-1) * (board_size+1)); w+=(board_size+1)) {
            console.log(board[w]);
            if (!board[w].classList.contains(player)) {
              is_win = false;
              break;
            }
          }
          if(is_win)
            return true;
        }
      }
    }

    //left diagonal checking
    is_win = false;
    for (var i = winning_condition-1; i < board_size; i++) {
      for (var j = i; j <= board_size - winning_condition + (i*board_size); j+=board_size){

        if (board[j].classList.contains(player)){
          is_win = true;
          console.log(j+((winning_condition-1) * (board_size-1)));
          for (var w = j+board_size-1; w <= j+((winning_condition-1) * (board_size-1)); w+=(board_size-1)) {
            if (!board[w].classList.contains(player)) {
              is_win = false;
              break;
            }
          }
          if(is_win)
            return true;
        }
      }
    }

    //if all the loop finished and not returning then return false
    return false;
  }
});


