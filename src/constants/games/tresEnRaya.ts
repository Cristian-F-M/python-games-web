const original_code = String.raw`
# Turn.py

class Turn:
    def __init__(self, players):
        self.players = list(players.values())
        self.current_turn_index = 0

    def get_current_player(self):
        return self.players[self.current_turn_index]

    def next_turn(self):
        self.current_turn_index = (self.current_turn_index + 1) % len(self.players)
        return self.get_current_player()

    def previous_turn(self):
        self.current_turn_index = (self.current_turn_index - 1) % len(self.players)
        return self.get_current_player()



# main.py


from Turn import Turn
import os

PIECES = {
  "X": "X",
  "O": "O",
  "": "•"
}


PLAYERS = {
  'PLAYER_1': {
    'id': 'PLAYER_1',
    'name': 'Player 1'
  },
  'PLAYER_2': {
    'id': 'PLAYER_2', 
    'name': 'Player 2'
  }
}

GAME_POSITIONS =  {
  1: (0, 0),
  2: (0, 1), 
  3: (0, 2),
  4: (1, 0), 
  5: (1, 1), 
  6: (1, 2),
  7: (2, 0),
  8: (2, 1), 
  9: (2, 2)
}

GAME_POSSIBILITIES = {
  "1_3": [GAME_POSITIONS[1], GAME_POSITIONS[2], GAME_POSITIONS[2]],
  "4_6": [GAME_POSITIONS[4], GAME_POSITIONS[5], GAME_POSITIONS[6]],
  "7_9": [GAME_POSITIONS[7], GAME_POSITIONS[8],GAME_POSITIONS[9]],
  "1_9": [GAME_POSITIONS[1], GAME_POSITIONS[5], GAME_POSITIONS[9]],
  "3_7": [GAME_POSITIONS[3], GAME_POSITIONS[5], GAME_POSITIONS[7]],
  "1_7": [GAME_POSITIONS[1], GAME_POSITIONS[4], GAME_POSITIONS[7]],
  "2_8": [GAME_POSITIONS[2], GAME_POSITIONS[5], GAME_POSITIONS[8]],
  "3_9": [GAME_POSITIONS[3], GAME_POSITIONS[6], GAME_POSITIONS[9]]
}


GAME_BOARD: list[list[PIECES]] =  [[PIECES[''], PIECES[''], PIECES['']],
    [PIECES[''], PIECES[''], PIECES['']],
    [PIECES[''], PIECES[''], PIECES['']]]

def verify_possibilities(possibility, cell):
  rs = True
  for position in possibility:
    if GAME_BOARD[position[0]][position[1]] != cell:
      return False
  return rs

def verify_winner(turn):
  for i, key in enumerate(GAME_POSSIBILITIES):
      possibility = GAME_POSSIBILITIES[key]
      rs = verify_possibilities(possibility, PIECES['X' if turn.current_turn_index  == 0 else 'O'])
      if rs:
        return rs
      
  return False


def SHOW_BOARD(board):
  os.system("cls")
  os.system("clear")
  print('')
  for i, row in enumerate(board):
    for j, cell in enumerate(row):
      is_last_cell = j < len(row) - 1
      printRow = f"   {cell}"
      printRow += "     |   " if is_last_cell else ""
      print(printRow, end='')
      printDiv = "\n---------|------------|------------"
      printDiv += "|" if is_last_cell else ""
      
    print(printDiv) if i < len(board) - 1 else None
  print("\n")

def is_a_valid_option(option):
  try: 
    option = int(option)
    return ((option >= 1 and option <= 9), option)
  except:
    return (False, -1)
    
def GAME():
  PLAYING = True
  turn = Turn(PLAYERS)
  already_full = False

  SHOW_BOARD(GAME_BOARD)


  while PLAYING:
    current_piece = PIECES['X' if turn.current_turn_index == 0 else 'O']
    current_player = turn.get_current_player()
  
    print(f"Turno de {current_player['name']}  ({current_piece})")
    while True: 
      option = input(f"Ingrese la opción {'nuevamente' if already_full else ''}:  ")
      is_valid_option, option = is_a_valid_option(option)
      if(not is_valid_option):
        print('Opción no Valida \n')
        continue
      break 
    
    position = GAME_POSITIONS[option]
    location = GAME_BOARD[position[0]][position[1]]
    if location == PIECES[""]:
      GAME_BOARD[position[0]][position[1]] = current_piece
      already_full = False
      there_is_winner = verify_winner(turn)
      if (there_is_winner):
        print(f"{turn.get_current_player()['name']} es el ganador.")
        PLAYING = False
        SHOW_BOARD(GAME_BOARD)
        break
      
      turn.next_turn()
      
    else: 
      HIDE_BOARD(GAME_BOARD)
      print('Ubicación ya utilizada.')
      already_full = True


if __name__ == "__main__":
  GAME()
`;

const modified_code = String.raw`
# Turn.py

class Turn:
    def __init__(self, players):
        self.players = list(players.values())
        self.current_turn_index = 0

    def get_current_player(self):
        return self.players[self.current_turn_index]

    def next_turn(self):
        self.current_turn_index = (self.current_turn_index + 1) % len(self.players)
        return self.get_current_player()

    def previous_turn(self):
        self.current_turn_index = (self.current_turn_index - 1) % len(self.players)
        return self.get_current_player()


# main.py


import os
import asyncio

PIECES = {"X": "X", "O": "O", "": "•"}


PLAYERS = {
    "PLAYER_1": {"id": "PLAYER_1", "name": "Player 1"},
    "PLAYER_2": {"id": "PLAYER_2", "name": "Player 2"},
}

GAME_POSITIONS = {
    1: (0, 0),
    2: (0, 1),
    3: (0, 2),
    4: (1, 0),
    5: (1, 1),
    6: (1, 2),
    7: (2, 0),
    8: (2, 1),
    9: (2, 2),
}

GAME_POSSIBILITIES = {
    "1_3": [GAME_POSITIONS[1], GAME_POSITIONS[2], GAME_POSITIONS[2]],
    "4_6": [GAME_POSITIONS[4], GAME_POSITIONS[5], GAME_POSITIONS[6]],
    "7_9": [GAME_POSITIONS[7], GAME_POSITIONS[8], GAME_POSITIONS[9]],
    "1_9": [GAME_POSITIONS[1], GAME_POSITIONS[5], GAME_POSITIONS[9]],
    "3_7": [GAME_POSITIONS[3], GAME_POSITIONS[5], GAME_POSITIONS[7]],
    "1_7": [GAME_POSITIONS[1], GAME_POSITIONS[4], GAME_POSITIONS[7]],
    "2_8": [GAME_POSITIONS[2], GAME_POSITIONS[5], GAME_POSITIONS[8]],
    "3_9": [GAME_POSITIONS[3], GAME_POSITIONS[6], GAME_POSITIONS[9]],
}


GAME_BOARD = [
    [PIECES[""], PIECES[""], PIECES[""]],
    [PIECES[""], PIECES[""], PIECES[""]],
    [PIECES[""], PIECES[""], PIECES[""]],
]


def verify_possibilities(possibility, cell):
    rs = True
    for position in possibility:
        if GAME_BOARD[position[0]][position[1]] != cell:
            return False
    return rs


def verify_winner(turn):
    for i, key in enumerate(GAME_POSSIBILITIES):
        possibility = GAME_POSSIBILITIES[key]
        rs = verify_possibilities(
            possibility, PIECES["X" if turn.current_turn_index == 0 else "O"]
        )
        if rs:
            return rs

    return False


def SHOW_BOARD(board):
    clear_terminal()

    print("")
    for i, row in enumerate(board):
        for j, cell in enumerate(row):
            is_last_cell = j < len(row) - 1
            printRow = f"   {cell}"
            printRow += "     |   " if is_last_cell else ""
            print(printRow, end="")
            printDiv = "---------|------------|------------"
            printDiv += "|" if is_last_cell else ""

        print(printDiv) if i < len(board) - 1 else None
    print("\n")


def is_a_valid_option(option):
    try:
        option = int(option)
        return ((option >= 1 and option <= 9), option)
    except:
        return (False, -1)


async def GAME():
    PLAYING = True
    turn = Turn(PLAYERS)
    already_full = False

  
    while PLAYING:
        SHOW_BOARD(GAME_BOARD)
        current_piece = PIECES["X" if turn.current_turn_index == 0 else "O"]
        current_player = turn.get_current_player()

        print(f"Turno de {current_player['name']}  ({current_piece})")
        while True:
            option = await input(
                f"Ingrese la opción {'nuevamente' if already_full else ''}:  "
            )
            is_valid_option, option = is_a_valid_option(option)
            if not is_valid_option:
                print("Opción no Valida \n")
                continue
            break

        position = GAME_POSITIONS[option]
        location = GAME_BOARD[position[0]][position[1]]
        if location == PIECES[""]:
            GAME_BOARD[position[0]][position[1]] = current_piece
            already_full = False
            there_is_winner = verify_winner(turn)
            if there_is_winner:
                SHOW_BOARD(GAME_BOARD)
                print(f"{turn.get_current_player()['name']} es el ganador.")
                PLAYING = False
                break

            turn.next_turn()

        else:
            # HIDE_BOARD(GAME_BOARD)
            print("Ubicación ya utilizada.")
            already_full = True


GAME()
`;

export { modified_code as modified_triqui, original_code as original_triqui };
