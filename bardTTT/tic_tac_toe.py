board = [" " for i in range(9)]
player = "X"

def print_board():
    print(board[0] + " | " + board[1] + " | " + board[2])
    print("---------")
    print(board[3] + " | " + board[4] + " | " + board[5])
    print("---------")
    print(board[6] + " | " + board[7] + " | " + board[8])

def check_winner():
    global winner
    row_winner = check_rows()
    col_winner = check_cols()
    diag_winner = check_diags()
    
    if row_winner:
        winner = row_winner
    elif col_winner:
        winner = col_winner
    elif diag_winner:
        winner = diag_winner
    else:
        winner = None

def check_rows():
    global game_still_going
    row1 = board[0] == board[1] == board[2] != " "
    row2 = board[3] == board[4] == board[5] != " "
    row3 = board[6] == board[7] == board[8] != " "
    if row1 or row2 or row3:
        game_still_going = False
    if row1:
        return board[0]
    elif row2:
        return board[3]
    elif row3:
        return board[6]
    else:
        return None

def check_cols():
    global game_still_going
    col1 = board[0] == board[3] == board[6] != " "
    col2 = board[1] == board[4] == board[7] != " "
    col3 = board[2] == board[5] == board[8] != " "
    if col1 or col2 or col3:
        game_still_going = False
    if col1:
        return board[0]
    elif col2:
        return board[1]
    elif col3:
        return board[2]
    else:
        return None

def check_diags():
    global game_still_going
    diag1 = board[0] == board[4] == board[8] != " "
    diag2 = board[2] == board[4] == board[6] != " "
    if diag1 or diag2:
        game_still_going = False
    if diag1:
        return board[0]
    elif diag2:
        return board[2]
    else:
        return None

def handle_turn():
    global player
    print(player + "'s turn.")
    position = input("Choose a position (1-9): ")

    valid = False
    while not valid:
        try:
            position = int(position)
            if position in range(1, 10):
                if board[position - 1] == " ":
                    valid = True
                else:
                    print("That position is already taken.")
            else:
                print("Invalid input. Please enter a number between 1 and 9.")
        except ValueError:
            print("Invalid input. Please enter a number.")

    board[position - 1] = player
    print_board()

def play_game():
    global winner
    global game_still_going

    game_still_going = True
    while game_still_going:
        handle_turn()
        check_winner()
        if winner:
            print(winner + " wins!")
        else:
            player = "O" if player == "X" else "X"

    if not winner:
        print("The game is a tie!")

print_board()
play_game()
