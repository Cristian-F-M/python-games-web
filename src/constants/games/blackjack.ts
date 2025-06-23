const original_code = String.raw`
# Meny.py 

class Menu:
  def __init__(self, menu: dict):
    self.__dict__.update(menu)
    
  def get_length(self):
    return len(self.__dict__.values())
  
    
class Menu_option:
  def __init__(self, option: dict):
    self.__dict__.update(option)


class Menus:
  def __init__(self, menus: dict):
    self.__dict__.update(menus)




# main.py

import os
import time
from simple_colors import yellow, red, green
from Menu import Menu, Menu_option, Menus
import random 
# from tabulate import tabulate


CARD_ROWS = 10
CARD_COLS = 15
CANT_DOTS = 3
TIME_WAIT_FIST_CARDS = 150
MAX_SCORE = 21

POKER_CARDS = {
    1: "ACE",
    2: "TWO",
    3: "THREE",
    4: "FOUR",
    5: "FIVE",
    6: "SIX",
    7: "SEVEN",
    8: "EIGHT",
    9: "NINE",
    10: "TEN",
    11: "JACK",
    12: "QUEEN",
    13: "KING"
}

MENUS = Menus({
    "MAIN": Menu({
        "PLAY": Menu_option({"index": 1, "title": "Play"}),
        "HOW_PLAY": Menu_option({"index": 2, "title": "How play"}),
        "EXIT": Menu_option({"index": 3, "title": "Exit"})
    }),
    "IMPROVE_HAND": Menu({
        "HIT": Menu_option({"index": 1, "title": "Hit"}),
        "STAND": Menu_option({"index": 2, "title": "Stand"})
    })
})


def clear_terminal():
    os.system("clear")


def validate_option(option, menu_list):
    option_values = menu_list
    if not isinstance(menu_list, list):
        option_values = [option.index for option in menu_list.__dict__.values()]
    try:
        option = int(option)
        if option not in option_values:
            return False, None
        return True, option
    except ValueError:
        return False, None


def create_card(text: str = None, number: int = None):
    card = ""
    length_number = len(str(number))
    cols_end_index = CARD_COLS - 1
    rows_end_index = CARD_ROWS - 1
    length_text = len(text)
    spaces_before_after = (CARD_COLS - 2 - length_text) // 2
    col_end_text = spaces_before_after + 1 + length_text
    text_done = False
    row_text_target = CARD_ROWS // 2
    number_padding = {"col": 2, "row": 1}

    for row in range(CARD_ROWS):
        for col in range(CARD_COLS):
            if row == 0 and col == 0:
                card += "┌"
                continue
            if row == 0 and col == cols_end_index:
                card += "┐"
                continue
            if row == rows_end_index and col == 0:
                card += "└"
                continue
            if row == rows_end_index and col == cols_end_index:
                card += "┘"
                continue
            if col == 0 or col == cols_end_index:
                card += "|"
                continue
            if row == 0 or row == rows_end_index:
                card += "─"
                continue
            if number is not None:
                if col == number_padding["col"] and row == number_padding["row"]:
                    card += str(number)
                    continue
            if col == cols_end_index - number_padding["col"] and row == rows_end_index - number_padding["row"]:
                card += str(number)
                continue
            if col > number_padding["col"] and col < number_padding["col"] + length_number and (row == number_padding["row"] or row == rows_end_index - number_padding["row"]):
                continue

            if text is not None:
                if col >= 1 and col <= spaces_before_after:
                    card += " "
                    continue
                if col > spaces_before_after + length_text:
                    card += " "
                    continue
                if col > spaces_before_after and not text_done and row == row_text_target:
                    card += text
                    text_done = True
                    continue
                if col > spaces_before_after and text_done and col < col_end_text and row == row_text_target:
                    continue
                card += " "
        card += "\n"
    return card


def get_text_better(text, index):
  max_length_text = CARD_COLS - 2 - 6
  length_text = len(text)
  new_text = ""

  if length_text > max_length_text:
    for i, l in enumerate(text):
      if i < max_length_text:
        new_text += l
        continue
    
      if i < max_length_text + CANT_DOTS:
        new_text += "."
        continue
    
  length_text = len(new_text)
    
  text = text if new_text == "" else new_text
  new_text = ""
  for i, l in enumerate(text):
    if i == -1:
      continue
    l = "_" if i > index else l
    new_text += l
  return new_text.upper()

def animate_card(text_number: tuple):
  text, number = text_number
  text = f"{text}"
  for i in range(-1, len(text), 1):
    clear_terminal()
    better_text = get_text_better(text, i)
    card = create_card(better_text, number)
    print(f"\r{card}")
    time.sleep(0.1)

def show_score_board(player = None, player_2 = None):
  players = tuple([player, player_2])

  space_between_player_score = 2
  space_between_players = 14
  lines = [None for _ in range(4)]
  
  for i, player in enumerate(players):
    if player is None:
      continue
    there_is_next_player = False
    try:
      there_is_next_player = players[i+1] is not None
    except:
      there_is_next_player = False
      
    ace_1 = player["ace_1"]
    ace_11 = player["ace_11"]
    
    is_same_value = ace_1 == ace_11
    
    text_1 = "ACE_1" if not is_same_value else "score"
    text_2 = "ACE_11" if not is_same_value else ""
    length_text_1 = len(text_1)
    length_text_2 = len(text_2)
    length_id = len(player["id"])
    
    
    space_between_texts = length_text_1 + length_text_2 + space_between_players
    
    
    if lines[0] is None:
      lines[0] = " "*(space_between_texts//2//2) + player["id"] + " "*(space_between_texts//2//2) + ("|" if there_is_next_player else "")
    else :
      lines[0] += " "*(space_between_texts//2//2) + player["id"]
    
    if lines[1] is None:
      lines[1] = "-"*(space_between_texts//2//2 + length_id + space_between_texts//2//2) + ("|" if there_is_next_player else "")
    else :
      lines[1] += "-"*(space_between_texts//2) + "-"*(length_id-1)
    
    a = space_between_texts//2//2 + length_id + space_between_texts//2//2 - length_text_1 - length_text_2
    b = a // (2 if is_same_value else 4)
    c = a % (2 if is_same_value else 4)
    
    text_line_2 = " "*b + text_1 + ((" "*b + "|" + " "*b) if not is_same_value else (" "*c)) + text_2 + " "*(b)
    
    if lines[2] is None:
      lines[2] = text_line_2 + ("|" if there_is_next_player else "")
    else :
      lines[2] += text_line_2
    
    
    w_t_1 = b*2 + length_text_1 - len(str(ace_1))
    w_t_2 = b*2 + length_text_2 - len(str(ace_11))
    x_t_1 = w_t_1 // 2
    x_t_2 = w_t_2 // 2
    y_t_1 = w_t_1 % 2
    y_t_2 = w_t_2 % 2
    
    if lines[3] is None:
      lines[3] = " "*(x_t_1) + (" " if is_same_value else "") + str(ace_1) + " "*(x_t_1+y_t_1) + ("|" if not is_same_value else "") + ((" "*x_t_2 + str(ace_11) + " "*(x_t_2+y_t_2)) if not is_same_value else "") + ("|" if there_is_next_player else "")
    else :
      lines[3] += " "*(x_t_1) + str(ace_1) + " "*(x_t_1+y_t_1) + (("|" + " "*x_t_2 + str(ace_11) + " "*(x_t_2+y_t_2)) if not is_same_value else "")
    
  clear_terminal()
  
  for line in lines:
    print(line)
  print("\n")


def show_time_wait(card_index, cant_cards):
  for i in range(TIME_WAIT_FIST_CARDS):
    print(f"\r {i/100}", end = "")
    time.sleep(1/100)

def show_menu(menu, clear = False):
  if clear:
    clear_terminal()
  for option in list(menu.__dict__.values()):
    print(f"{option.index}.{option.title}")

def show_instructions():
  clear_terminal()
  instructions_lines = [
    "Al inciar el juego se te mostraran dos cartas cada una con un valor, dicho valor se irá sumando, a su vez se le daran la misma cantidad de cartas a la maquina (contra quien compites)",
    "seguido de esto se te mostrara tu puntaje, luego podras elegir entre dos opciones:",
    "1. HIT -> Se te dara otra carta que se sumara al puntaje anterior.",
    "2. STAND -> No recibiras más cartas y se finalizara el juego con los puntajes obtenidos.",
    "Cada carta tendra un valor indicado por el número de la misma, las cartas a las cuales se les modifica el valor son las siguientes:",
    "Las cartas 11 (JACK), 12 (QUEEN), 13 (KING) tienen un valor de 10 puntos.",
    "La carta 1 (ACE) cuenta con dos posibles valores: 1 - 11, al obtener esta carta se te mostraran 2 puntajes: ACE_1 (Sumatoria del ACE contando con valor 1) y ACE_11 (Sumatoria del ACE contando con valor 11",
    "Si tú o la maquina completan 21 ya sea en ACE_1 O ACE_11 se dará el respectivo ganador, si los comoletam 21 habra un empate y no se habrá ganador.",
    "Una vez seleciones la opción STAND: Si los puntajes del usurio y la maquina superan 21, el ganador será el que tiene el puntaje menor más cercano a 21."
    "De lo contrario si ninguno de los 2 puntajes superan 21, el ganador será el puntaje mayor más cercano a 21",
  ]
  for line in instructions_lines:
    print(f"* {line}")
    time.sleep(2)

def play():
  PLAYING = True
  CARDS_SUM = {
    "user": {
      "id": "USER",
      "ace_1": 0,
      "ace_11": 0
    },
    "machine": {
      "id": "MACHINE",
      "ace_1": 0,
      "ace_11": 0
    }
  }
  machine_sum = [0, 0]
  fist_play = True
  
  
  while PLAYING:
    cant_cards = 2 if fist_play else 1
    for i in range(cant_cards):
      user_number = random.randint(1, 13)
      machine_number = random.randint(1, 13)
  
      is_ten_points_user = user_number in (11, 12, 13)
      is_ten_points_machine = machine_number in (11, 12, 13)
    
      points_user = 10 if is_ten_points_user else user_number
      points_machine = 10 if is_ten_points_machine else machine_number
    
      CARDS_SUM["user"]["ace_11"] += 11 if user_number == 1 else points_user
      CARDS_SUM["machine"]["ace_11"] += 11 if machine_number == 1 else points_machine
      CARDS_SUM["user"]["ace_1"] += points_user
      CARDS_SUM["machine"]["ace_1"] += points_machine
    
    
      card = POKER_CARDS[user_number]
      number = points_user
      animate_card((card, number))
      show_time_wait(i, cant_cards)
  
    show_score_board(CARDS_SUM["user"])
    user = CARDS_SUM["user"]
    machine = CARDS_SUM["machine"]
  
    if (user["ace_1"] == MAX_SCORE or user["ace_11"] == MAX_SCORE):
      show_score_board(user, machine)
      if (machine["ace_1"] == MAX_SCORE or machine["ace_11"] == MAX_SCORE):
        print(yellow("Empate, ninguno gana..."))
        break
      print(green("Eres el ganador, Felicidades..."))
      break
    
    if machine["ace_1"] == MAX_SCORE or machine["ace_11"] == MAX_SCORE:
      show_score_board(user, machine)
      print(red("La maquina es la ganadora..."))
      break
    
      PLAYING = False
      break
    
    show_menu(MENUS.IMPROVE_HAND)
    
    fist_play = False
    while True:
      option = input("->")
      (rs, option) = validate_option(option, MENUS.IMPROVE_HAND)
    
      if not rs:
        show_menu(MENUS.IMPROVE_HAND)
        print(red("Opción no valida"))
        continue
      break
    
    
    if option == MENUS.IMPROVE_HAND.HIT.index:
      pass
    if option == MENUS.IMPROVE_HAND.STAND.index:
      
      user_value = None
      is_same_value = user["ace_1"] == user["ace_11"]
      
      if not is_same_value:
        while True:
          show_score_board(user)
          print("Cuál resultado eliges?")
          option = input("1/2 -> ")
          (rs, option) = validate_option(option, [1, 2])
          
          if not rs:
            print(red("Opción no valida."))
            continue
          break
      
      if option == 1:
        user_value = user["ace_1"]
      elif (option == 2):
        user_value = user["ace_11"]
      
      if user_value is None:
        user_value = user["ace_1"]
      
      machine_value = min(machine["ace_1"], machine["ace_11"]) if (machine["ace_1"] > MAX_SCORE) else max(machine["ace_1"], machine["ace_11"])
      is_machine_value_over_max = machine_value > MAX_SCORE
      is_user_value_over_max = user_value > MAX_SCORE
      
      show_score_board(user, machine)
      
      if (user_value == MAX_SCORE):
        if (machine_value == MAX_SCORE):
          print(yellow("Empate, Ninguno es el ganador..."))
          break
        print(green("Eres el ganador..."))
        break
      
      if machine_value == MAX_SCORE:
        print(red("La maquina es la ganadora..."))
        break
      
      if (is_user_value_over_max and is_machine_value_over_max):
        if user_value < machine_value:
          print(green("Eres el ganador..."))
          break
        if user_value > machine_value:
          print(red("La maquina es la ganadora..."))
          break
      
      if (not is_machine_value_over_max and not is_user_value_over_max):
        if user_value < machine_value:
          print(red("La maquina es la ganadora..."))
          break
        if user_value > machine_value:
          print(green("Eres el ganador..."))
          break
      if (is_machine_value_over_max and not is_user_value_over_max):
        print(green("Eres el ganador..."))
        break
      if (is_user_value_over_max and not is_machine_value_over_max):
        print(red("La maquina es la ganadora..."))
        break
      
      if (user_value == machine_value):
        print(yellow("Empate, No hay ganador..."))
        break
      
      PLAYING = False
      break


clear_terminal()
print(yellow("Bienvenido al Juego de Blackjack"))
show_menu(MENUS.MAIN)

while True:
  option = input("Ingrese una opción: ")
  (rs, option) = validate_option(option, MENUS.MAIN)
  if not rs:
    show_menu(MENUS.MAIN)
    print(red("Opción no valida"))
    continue
  break

if option == MENUS.MAIN.PLAY.index:
  play()
if option == MENUS.MAIN.HOW_PLAY.index:
  show_instructions()
if option == MENUS.MAIN.EXIT.index:
  clear_terminal()
  print(yellow("Gracias por jugar..."))
  print(yellow("Vuelve pronto..."))
  print("\n\n")
`;

const modified_code = String.raw`
# Meny.py 

class Menu:
  def __init__(self, menu: dict):
    self.__dict__.update(menu)
    
  def get_length(self):
    return len(self.__dict__.values())
  
    
class Menu_option:
  def __init__(self, option: dict):
    self.__dict__.update(option)


class Menus:
  def __init__(self, menus: dict):
    self.__dict__.update(menus)




# main.py

import os
import time
from simple_colors import yellow, red, green
import random, asyncio
# from tabulate import tabulate


CARD_ROWS = 10
CARD_COLS = 15
CANT_DOTS = 3
TIME_WAIT_FIST_CARDS = 150
MAX_SCORE = 21

POKER_CARDS = {
    1: "ACE",
    2: "TWO",
    3: "THREE",
    4: "FOUR",
    5: "FIVE",
    6: "SIX",
    7: "SEVEN",
    8: "EIGHT",
    9: "NINE",
    10: "TEN",
    11: "JACK",
    12: "QUEEN",
    13: "KING"
}

MENUS = Menus({
    "MAIN": Menu({
        "PLAY": Menu_option({"index": 1, "title": "Play"}),
        "HOW_PLAY": Menu_option({"index": 2, "title": "How play"}),
        "EXIT": Menu_option({"index": 3, "title": "Exit"})
    }),
    "IMPROVE_HAND": Menu({
        "HIT": Menu_option({"index": 1, "title": "Hit"}),
        "STAND": Menu_option({"index": 2, "title": "Stand"})
    })
})

def validate_option(option, menu_list):
    option_values = menu_list
    if not isinstance(menu_list, list):
        option_values = [option.index for option in menu_list.__dict__.values()]
    try:
        option = int(option)
        if option not in option_values:
            return False, None
        return True, option
    except ValueError:
        return False, None


def create_card(text: str = None, number: int = None):
    card = ""
    length_number = len(str(number))
    cols_end_index = CARD_COLS - 1
    rows_end_index = CARD_ROWS - 1
    length_text = len(text)
    spaces_before_after = (CARD_COLS - 2 - length_text) // 2
    col_end_text = spaces_before_after + 1 + length_text
    text_done = False
    row_text_target = CARD_ROWS // 2
    number_padding = {"col": 2, "row": 1}

    for row in range(CARD_ROWS):
        for col in range(CARD_COLS):
            if row == 0 and col == 0:
                card += "┌"
                continue
            if row == 0 and col == cols_end_index:
                card += "┐"
                continue
            if row == rows_end_index and col == 0:
                card += "└"
                continue
            if row == rows_end_index and col == cols_end_index:
                card += "┘"
                continue
            if col == 0 or col == cols_end_index:
                card += "|"
                continue
            if row == 0 or row == rows_end_index:
                card += "─"
                continue
            if number is not None:
                if col == number_padding["col"] and row == number_padding["row"]:
                    card += str(number)
                    continue
            if col == cols_end_index - number_padding["col"] and row == rows_end_index - number_padding["row"]:
                card += str(number)
                continue
            if col > number_padding["col"] and col < number_padding["col"] + length_number and (row == number_padding["row"] or row == rows_end_index - number_padding["row"]):
                continue

            if text is not None:
                if col >= 1 and col <= spaces_before_after:
                    card += " "
                    continue
                if col > spaces_before_after + length_text:
                    card += " "
                    continue
                if col > spaces_before_after and not text_done and row == row_text_target:
                    card += text
                    text_done = True
                    continue
                if col > spaces_before_after and text_done and col < col_end_text and row == row_text_target:
                    continue
                card += " "
        card += "\n"
    return card


def get_text_better(text, index):
  max_length_text = CARD_COLS - 2 - 6
  length_text = len(text)
  new_text = ""

  if length_text > max_length_text:
    for i, l in enumerate(text):
      if i < max_length_text:
        new_text += l
        continue
    
      if i < max_length_text + CANT_DOTS:
        new_text += "."
        continue
    
  length_text = len(new_text)
    
  text = text if new_text == "" else new_text
  new_text = ""
  for i, l in enumerate(text):
    if i == -1:
      continue
    l = "_" if i > index else l
    new_text += l
  return new_text.upper()

async def animate_card(text_number: tuple):
  text, number = text_number
  text = f"{text}"
  for i in range(-1, len(text), 1):
    clear_terminal()
    better_text = get_text_better(text, i)
    card = create_card(better_text, number)
    print(f"\r{card}")
    await asyncio.sleep(0.5)

def show_score_board(player = None, player_2 = None):
  players = tuple([player, player_2])

  space_between_player_score = 2
  space_between_players = 14
  lines = [None for _ in range(4)]
  
  for i, player in enumerate(players):
    if player is None:
      continue
    there_is_next_player = False
    try:
      there_is_next_player = players[i+1] is not None
    except:
      there_is_next_player = False
      
    ace_1 = player["ace_1"]
    ace_11 = player["ace_11"]
    
    is_same_value = ace_1 == ace_11
    
    text_1 = "ACE_1" if not is_same_value else "score"
    text_2 = "ACE_11" if not is_same_value else ""
    length_text_1 = len(text_1)
    length_text_2 = len(text_2)
    length_id = len(player["id"])
    
    
    space_between_texts = length_text_1 + length_text_2 + space_between_players
    
    
    if lines[0] is None:
      lines[0] = " "*(space_between_texts//2//2) + player["id"] + " "*(space_between_texts//2//2) + ("|" if there_is_next_player else "")
    else :
      lines[0] += " "*(space_between_texts//2//2) + player["id"]
    
    if lines[1] is None:
      lines[1] = "-"*(space_between_texts//2//2 + length_id + space_between_texts//2//2) + ("|" if there_is_next_player else "")
    else :
      lines[1] += "-"*(space_between_texts//2) + "-"*(length_id-1)
    
    a = space_between_texts//2//2 + length_id + space_between_texts//2//2 - length_text_1 - length_text_2
    b = a // (2 if is_same_value else 4)
    c = a % (2 if is_same_value else 4)
    
    text_line_2 = " "*b + text_1 + ((" "*b + "|" + " "*b) if not is_same_value else (" "*c)) + text_2 + " "*(b)
    
    if lines[2] is None:
      lines[2] = text_line_2 + ("|" if there_is_next_player else "")
    else :
      lines[2] += text_line_2
    
    
    w_t_1 = b*2 + length_text_1 - len(str(ace_1))
    w_t_2 = b*2 + length_text_2 - len(str(ace_11))
    x_t_1 = w_t_1 // 2
    x_t_2 = w_t_2 // 2
    y_t_1 = w_t_1 % 2
    y_t_2 = w_t_2 % 2
    
    if lines[3] is None:
      lines[3] = " "*(x_t_1) + (" " if is_same_value else "") + str(ace_1) + " "*(x_t_1+y_t_1) + ("|" if not is_same_value else "") + ((" "*x_t_2 + str(ace_11) + " "*(x_t_2+y_t_2)) if not is_same_value else "") + ("|" if there_is_next_player else "")
    else :
      lines[3] += " "*(x_t_1) + str(ace_1) + " "*(x_t_1+y_t_1) + (("|" + " "*x_t_2 + str(ace_11) + " "*(x_t_2+y_t_2)) if not is_same_value else "")
    
  clear_terminal()
  
  for line in lines:
    print(line)
  print("\n")


async def show_time_wait(card_index, cant_cards):
  for i in range(TIME_WAIT_FIST_CARDS):
    print(f"\r {i/100}", end = "")
    await asyncio.sleep(1/100)

def show_menu(menu, clear = False):
  if clear:
    clear_terminal()
  for option in list(menu.__dict__.values()):
    print(f"{option.index}.{option.title}")

async def show_instructions():
  clear_terminal()
  instructions_lines = [
    "Al inciar el juego se te mostraran dos cartas cada una con un valor, dicho valor se irá sumando, a su vez se le daran la misma cantidad de cartas a la maquina (contra quien compites)",
    "seguido de esto se te mostrara tu puntaje, luego podras elegir entre dos opciones:",
    "1. HIT -> Se te dara otra carta que se sumara al puntaje anterior.",
    "2. STAND -> No recibiras más cartas y se finalizara el juego con los puntajes obtenidos.",
    "Cada carta tendra un valor indicado por el número de la misma, las cartas a las cuales se les modifica el valor son las siguientes:",
    "Las cartas 11 (JACK), 12 (QUEEN), 13 (KING) tienen un valor de 10 puntos.",
    "La carta 1 (ACE) cuenta con dos posibles valores: 1 - 11, al obtener esta carta se te mostraran 2 puntajes: ACE_1 (Sumatoria del ACE contando con valor 1) y ACE_11 (Sumatoria del ACE contando con valor 11",
    "Si tú o la maquina completan 21 ya sea en ACE_1 O ACE_11 se dará el respectivo ganador, si los comoletam 21 habra un empate y no se habrá ganador.",
    "Una vez seleciones la opción STAND: Si los puntajes del usurio y la maquina superan 21, el ganador será el que tiene el puntaje menor más cercano a 21."
    "De lo contrario si ninguno de los 2 puntajes superan 21, el ganador será el puntaje mayor más cercano a 21",
  ]
  for line in instructions_lines:
    print(f"* {line}")
    await asyncio.sleep(2)

async def play():
  PLAYING = True
  CARDS_SUM = {
    "user": {
      "id": "USER",
      "ace_1": 0,
      "ace_11": 0
    },
    "machine": {
      "id": "MACHINE",
      "ace_1": 0,
      "ace_11": 0
    }
  }
  machine_sum = [0, 0]
  fist_play = True
  
  
  while PLAYING:
    cant_cards = 2 if fist_play else 1
    for i in range(cant_cards):
      print('algo')
      user_number = random.randint(1, 13)
      machine_number = random.randint(1, 13)
  
      is_ten_points_user = user_number in (11, 12, 13)
      is_ten_points_machine = machine_number in (11, 12, 13)
    
      points_user = 10 if is_ten_points_user else user_number
      points_machine = 10 if is_ten_points_machine else machine_number
    
      CARDS_SUM["user"]["ace_11"] += 11 if user_number == 1 else points_user
      CARDS_SUM["machine"]["ace_11"] += 11 if machine_number == 1 else points_machine
      CARDS_SUM["user"]["ace_1"] += points_user
      CARDS_SUM["machine"]["ace_1"] += points_machine
    
    
      card = POKER_CARDS[user_number]
      number = points_user
      await animate_card((card, number))
      # await show_time_wait(i, cant_cards)
      await asyncio.sleep(3)
  
    show_score_board(CARDS_SUM["user"])
    user = CARDS_SUM["user"]
    machine = CARDS_SUM["machine"]
  
    if (user["ace_1"] == MAX_SCORE or user["ace_11"] == MAX_SCORE):
      show_score_board(user, machine)
      if (machine["ace_1"] == MAX_SCORE or machine["ace_11"] == MAX_SCORE):
        print(yellow("Empate, ninguno gana..."))
        break
      print(green("Eres el ganador, Felicidades..."))
      break
    
    if machine["ace_1"] == MAX_SCORE or machine["ace_11"] == MAX_SCORE:
      show_score_board(user, machine)
      print(red("La maquina es la ganadora..."))
    
      PLAYING = False
      break
    
    show_menu(MENUS.IMPROVE_HAND)
    
    fist_play = False
    while True:
      option = await input("-> ")
      (rs, option) = validate_option(option, MENUS.IMPROVE_HAND)
    
      if not rs:
        show_menu(MENUS.IMPROVE_HAND)
        print(red("Opción no valida"))
        continue
      break
    
    
    if option == MENUS.IMPROVE_HAND.HIT.index:
      pass
    if option == MENUS.IMPROVE_HAND.STAND.index:
      
      user_value = None
      is_same_value = user["ace_1"] == user["ace_11"]
      
      if not is_same_value:
        while True:
          show_score_board(user)
          print("Cuál resultado eliges?")
          option = await input("1/2 -> ")
          (rs, option) = validate_option(option, [1, 2])
          
          if not rs:
            print(red("Opción no valida."))
            continue
          break
      
      if option == 1:
        user_value = user["ace_1"]
      elif (option == 2):
        user_value = user["ace_11"]
      
      if user_value is None:
        user_value = user["ace_1"]
      
      machine_value = min(machine["ace_1"], machine["ace_11"]) if (machine["ace_1"] > MAX_SCORE) else max(machine["ace_1"], machine["ace_11"])
      is_machine_value_over_max = machine_value > MAX_SCORE
      is_user_value_over_max = user_value > MAX_SCORE
      
      show_score_board(user, machine)
      
      if (user_value == MAX_SCORE):
        if (machine_value == MAX_SCORE):
          print(yellow("Empate, Ninguno es el ganador..."))
          break
        print(green("Eres el ganador..."))
        break
      
      if machine_value == MAX_SCORE:
        print(red("La maquina es la ganadora..."))
        break
      
      if (is_user_value_over_max and is_machine_value_over_max):
        if user_value < machine_value:
          print(green("Eres el ganador..."))
          break
        if user_value > machine_value:
          print(red("La maquina es la ganadora..."))
          break
      
      if (not is_machine_value_over_max and not is_user_value_over_max):
        if user_value < machine_value:
          print(red("La maquina es la ganadora..."))
          break
        if user_value > machine_value:
          print(green("Eres el ganador..."))
          break
      if (is_machine_value_over_max and not is_user_value_over_max):
        print(green("Eres el ganador..."))
        break
      if (is_user_value_over_max and not is_machine_value_over_max):
        print(red("La maquina es la ganadora..."))
        break
      
      if (user_value == machine_value):
        print(yellow("Empate, No hay ganador..."))
        break
      
      PLAYING = False
      break



async def main(): 

  clear_terminal()
  print(yellow("Bienvenido al Juego de Blackjack"))
  show_menu(MENUS.MAIN)

  while True:
    option = await input("Ingrese una opción: ")
    (rs, option) = validate_option(option, MENUS.MAIN)
    if not rs:
      show_menu(MENUS.MAIN)
      print(red("Opción no valida"))
      continue
    break

  if option == MENUS.MAIN.PLAY.index:
    await play()
  if option == MENUS.MAIN.HOW_PLAY.index:
    await show_instructions()
  if option == MENUS.MAIN.EXIT.index:
    clear_terminal()
    print(yellow("Gracias por jugar..."))
    print(yellow("Vuelve pronto..."))
    print("\n\n")


main()
`;

export {
	original_code as original_blackjack,
	modified_code as modified_blackjack,
};
