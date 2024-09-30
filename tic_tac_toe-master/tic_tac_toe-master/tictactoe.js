/**
 * Board instance variable
 */
var board;

/**
 * Players instance variable
 */
var players;

/**
 * Game instance variable
 */
var game;


/**
 * Tic-Tac-Toe Board 
 *
 */
function Board() {
	// Get board cells

	var cells = Array();


	$(document).ready(function () {
		$('.cell').each(function (idx, value) {
			cells.push($(this));

		});
	});
	
	this.cells = cells;
	this.turns = 0;
}

Board.prototype.reset = function () {
	$.each(this.cells, function (idx, value) {
		this.set_cell(this.cells[idx], '-');
	});
};


Board.prototype.set_cell_value = function (cellObj, value) {
	cellObj.text(value);
	//cellObj.prop('disabled', true);
};

Board.prototype.get_cell_value = function (cellObj) {
	return cellObj.text();
};

Board.prototype.is_cell_empty = function (cellObj) {
	
	if (cellObj.text().match(/-/)) return true;
};

Board.prototype.cell_click_handler = function () {
	var cellObj = $(this);

	game.user_play(cellObj);
};


/**
 * Game class. Initalizes board and players.
 * Implements game rules 
 */
function Game() {
	this.new_game = function() {
		board = new Board();
		board.reset();
	},

	this.rules = {
		check_row: function(playerSymbol) {
			if (board.cells[0].text() == playerSymbol && board.cells[1].text() == playerSymbol && board.cells[2].text() == playerSymbol) return true; 
			if (board.cells[3].text() == playerSymbol && board.cells[4].text() == playerSymbol && board.cells[5].text() == playerSymbol) return true;
			if (board.cells[6].text() == playerSymbol && board.cells[7].text() == playerSymbol && board.cells[8].text() == playerSymbol) return true;
				

			return false;
		},

		check_column: function(playerSymbol) {
			if (board.cells[0].text() == playerSymbol && board.cells[3].text() == playerSymbol && board.cells[6].text() == playerSymbol) return true; 
			if (board.cells[1].text() == playerSymbol && board.cells[4].text() == playerSymbol && board.cells[7].text() == playerSymbol) return true;
			if (board.cells[2].text() == playerSymbol && board.cells[5].text() == playerSymbol && board.cells[8].text() == playerSymbol) return true;

			return false;
		},

		check_diagonal: function(playerSymbol) {
			if (board.cells[0].text() == playerSymbol && board.cells[4].text() == playerSymbol && board.cells[8].text() == playerSymbol) return true ;
			if (board.cells[2].text() == playerSymbol && board.cells[4].text() == playerSymbol && board.cells[6].text() == playerSymbol) return true;

			return false;
		},
	};

	this.get_winning_column_cell = function () {
		if (board.cells[0].text() == players.computer.symbol && board.cells[3].text() == players.computer.symbol) return board.cells[6]; 
		if (board.cells[3].text() == players.computer.symbol && board.cells[6].text() == players.computer.symbol) return board.cells[0]; 
		if (board.cells[0].text() == players.computer.symbol && board.cells[6].text() == players.computer.symbol) return board.cells[3];
		
		if (board.cells[1].text() == players.computer.symbol && board.cells[4].text() == players.computer.symbol) return board.cells[7]; 
		if (board.cells[4].text() == players.computer.symbol && board.cells[7].text() == players.computer.symbol) return board.cells[1]; 
		if (board.cells[1].text() == players.computer.symbol && board.cells[7].text() == players.computer.symbol) return board.cells[4];
		
		if (board.cells[2].text() == players.computer.symbol && board.cells[5].text() == players.computer.symbol) return board.cells[8]; 
		if (board.cells[5].text() == players.computer.symbol && board.cells[8].text() == players.computer.symbol) return board.cells[2]; 
		if (board.cells[2].text() == players.computer.symbol && board.cells[8].text() == players.computer.symbol) return board.cells[5];
		
		return false;
	};
	
	this.get_winning_row_cell = function () {
		if (board.cells[0].text() == players.computer.symbol && board.cells[1].text() == players.computer.symbol) return board.cells[2]; 
		if (board.cells[1].text() == players.computer.symbol && board.cells[2].text() == players.computer.symbol) return board.cells[0]; 
		if (board.cells[0].text() == players.computer.symbol && board.cells[2].text() == players.computer.symbol) return board.cells[1];
		
		if (board.cells[3].text() == players.computer.symbol && board.cells[4].text() == players.computer.symbol) return board.cells[5]; 
		if (board.cells[4].text() == players.computer.symbol && board.cells[5].text() == players.computer.symbol) return board.cells[3]; 
		if (board.cells[3].text() == players.computer.symbol && board.cells[5].text() == players.computer.symbol) return board.cells[4];
		
		if (board.cells[6].text() == players.computer.symbol && board.cells[7].text() == players.computer.symbol) return board.cells[8]; 
		if (board.cells[7].text() == players.computer.symbol && board.cells[8].text() == players.computer.symbol) return board.cells[6]; 
		if (board.cells[6].text() == players.computer.symbol && board.cells[8].text() == players.computer.symbol) return board.cells[7];
		
		return false;
	};
	
	this.get_winning_diagonal_cell = function () {
		if (board.cells[0].text() == players.computer.symbol && board.cells[4].text() == players.computer.symbol) return board.cells[8]; 
		if (board.cells[4].text() == players.computer.symbol && board.cells[8].text() == players.computer.symbol) return board.cells[0]; 
		if (board.cells[0].text() == players.computer.symbol && board.cells[8].text() == players.computer.symbol) return board.cells[4];
		
		if (board.cells[2].text() == players.computer.symbol && board.cells[4].text() == players.computer.symbol) return board.cells[6]; 
		if (board.cells[4].text() == players.computer.symbol && board.cells[6].text() == players.computer.symbol) return board.cells[2]; 
		if (board.cells[2].text() == players.computer.symbol && board.cells[6].text() == players.computer.symbol) return board.cells[4];
		
		return false;
	};

	this.get_user_winning_column_cell = function () {
		if (board.cells[0].text() == players.user.symbol && board.cells[3].text() == players.user.symbol) return board.cells[6]; 
		if (board.cells[3].text() == players.user.symbol && board.cells[6].text() == players.user.symbol) return board.cells[0]; 
		if (board.cells[0].text() == players.user.symbol && board.cells[6].text() == players.user.symbol) return board.cells[3];
		
		if (board.cells[1].text() == players.user.symbol && board.cells[4].text() == players.user.symbol) return board.cells[7]; 
		if (board.cells[4].text() == players.user.symbol && board.cells[7].text() == players.user.symbol) return board.cells[1]; 
		if (board.cells[1].text() == players.user.symbol && board.cells[7].text() == players.user.symbol) return board.cells[4];
		
		if (board.cells[2].text() == players.user.symbol && board.cells[5].text() == players.user.symbol) return board.cells[8]; 
		if (board.cells[5].text() == players.user.symbol && board.cells[8].text() == players.user.symbol) return board.cells[2]; 
		if (board.cells[2].text() == players.user.symbol && board.cells[8].text() == players.user.symbol) return board.cells[5];
		
		return false;
	};

	this.get_user_winning_row_cell = function () {

		if (board.cells[0].text() == players.user.symbol && board.cells[1].text() == players.user.symbol) return board.cells[2]; 
		if (board.cells[1].text() == players.user.symbol && board.cells[2].text() == players.user.symbol) return board.cells[0]; 
		if (board.cells[0].text() == players.user.symbol && board.cells[2].text() == players.user.symbol) return board.cells[1];
		
		if (board.cells[3].text() == players.user.symbol && board.cells[4].text() == players.user.symbol) return board.cells[5]; 
		if (board.cells[4].text() == players.user.symbol && board.cells[5].text() == players.user.symbol) return board.cells[3]; 
		if (board.cells[3].text() == players.user.symbol && board.cells[5].text() == players.user.symbol) return board.cells[4];
		
		if (board.cells[6].text() == players.user.symbol && board.cells[7].text() == players.user.symbol) return board.cells[8]; 
		if (board.cells[7].text() == players.user.symbol && board.cells[8].text() == players.user.symbol) return board.cells[6]; 
		if (board.cells[6].text() == players.user.symbol && board.cells[8].text() == players.user.symbol) return board.cells[7];
		
		return false;
	};
	
	this.get_user_winning_diagonal_cell = function () {
		if (board.cells[0].text() == players.user.symbol && board.cells[4].text() == players.user.symbol) return board.cells[8]; 
		if (board.cells[4].text() == players.user.symbol && board.cells[8].text() == players.user.symbol) return board.cells[0]; 
		if (board.cells[0].text() == players.user.symbol && board.cells[8].text() == players.user.symbol) return board.cells[4];
		
		if (board.cells[2].text() == players.user.symbol && board.cells[4].text() == players.user.symbol) return board.cells[6]; 
		if (board.cells[4].text() == players.user.symbol && board.cells[6].text() == players.user.symbol) return board.cells[2]; 
		if (board.cells[2].text() == players.user.symbol && board.cells[6].text() == players.user.symbol) return board.cells[4];

		return false;
	};

	this.check_winner = function () {
		if (this.rules.check_row(players.user.symbol)) return true;
		if (this.rules.check_column(players.user.symbol)) return true;
		if (this.rules.check_diagonal(players.user.symbol)) return true;

		return false;
	};

	this.computer_play = function () {
		if (board.turns === 1) {
			var cellNum;

			do {
				cellNum = Math.floor(Math.random() * (8 - 0 + 1) + 0);
			} while (!board.is_cell_empty(board.cells[cellNum]));

			board.cells[cellNum].text("0");
		} else {
			var cellObj;
			var write = false;
			
			if (!write) {
				cellObj = game.get_winning_column_cell();
				
				if (cellObj && board.is_cell_empty(cellObj)) {
					cellObj.text(players.computer.symbol);
					write = true;
					alert("Computer Wins");
				}
			} 
			
			if (!write) {
				cellObj = game.get_winning_row_cell();

				if (cellObj && board.is_cell_empty(cellObj)) {
					cellObj.text(players.computer.symbol);
					write = true;
					alert("Computer Wins");
				}
			} 
			
			if(!write) {
				cellObj = game.get_winning_diagonal_cell();
				if (cellObj && board.is_cell_empty(cellObj)) {
					cellObj.text(players.computer.symbol);
					write = true;
					alert("Computer Wins");
				}
			} 
			if (!write) {
				cellObj = game.get_user_winning_column_cell();
				if (cellObj && board.is_cell_empty(cellObj)) {
					cellObj.text(players.computer.symbol);
					write = true;
				}
				
			} 
			
			if (!write) {
				cellObj = game.get_user_winning_row_cell();
				if (cellObj && board.is_cell_empty(cellObj)) {
					cellObj.text(players.computer.symbol);
					write = true;
				}
			}

			if (!write) {
				cellObj = game.get_user_winning_diagonal_cell();
				if (cellObj && board.is_cell_empty(cellObj)) {
					cellObj.text(players.computer.symbol);
					write = true;
				}

			} 
			
			if (!write) {
				do {
					cellNum = Math.floor(Math.random() * (8 - 0 + 1) + 0);
				} while (!board.is_cell_empty(board.cells[cellNum]));
				//console.log(board.cells[cellNum].text());
				console.log("Hello J");
				board.cells[cellNum].text("0");
			}
		}
		players.user.turn = true;
		board.turns++;
	};

	this.user_play = function (cellObj) {
		if (players.check_user_turn()) {
			if (board.is_cell_empty(cellObj)) {
				board.set_cell_value(cellObj, players.user.symbol);
				players.user.turn  = false;
				board.turns++;

				if (game.check_winner()) {
					alert("Yay!! You Win!");
					Board.reset();

				} else if (board.turns === 9){
					alert("Its a tie!");

				} else {
					game.computer_play();
				}
			} else {
				alert('Not EMpty');
			}
		} else {
			alert("Not your turn. Wait for the computer to finish");
		}
	};
}

/**
 * Players class
 */
function Players() {

	this.computer = {
		name: 'Robot',
		//turn: false,
		won: 0,
		lost: 0,
		symbol: '0',
	};

	this.user = {
		name: '',
		turn: true,
		won: 0,
		lost: 0,
		symbol: 'X',
	};

	this.check_user_turn = function () {
		return this.user.turn;
	};
}


var game = new Game();
game.new_game();

players = new Players();

$('.cell').on('click', board.cell_click_handler);