const original_code = String.raw`
import os
import requests
import random

def get_word():
  words = ['mediaban', 'ahínco', 'hirviente', 'íbamos', 'trescientos', 'agenciarse', 'evidentemente', 'canto', 'concluya', 'padecerá', 'gastronómica', 'facultades', 'atrevan', 'quitándole', 'desconceptuadas', 'avergüence', 'glacial', 'hendía', 'reconozco', 'atrajera', 'gran', 'teresuplicó', 'gabineteme', 'repita', 'asombraría', 'lagarto', 'lucecilla', 'llegó', 'encontrele', 'desconfianza']
  try:
    res = requests.get('https://clientes.api.greenborn.com.ar/public-random-word?c=1', {
      "headers": {
        "Content-Type": "application/json"
      }
    })
    data = res.json()
    return data[0]
  except Exception as e:
    randomIndex = random.randint(0, len(words) - 1)
    return words[randomIndex]

def get_hide_word(word):
  hide_word = []
  for l in word:
    hide_word.append("_")
  return hide_word
  
def clear_terminal():
  os.system('clear')

def validate_letter():
  error = False
  while True:
    if error:
      show_interface()
      print("Caracter no valido:")
      
    letter = input(f"Ingrese una letra {'nuevamente' if error else ''}: ")
    try:
      int(letter)
      error = True 
      continue
    except:
      pass
    
    if (isinstance(letter, str) and len(letter) == 1):
      return (True, letter)
    error = True
    continue

def show_interface():
  clear_terminal()
  print()
  print(f"💚 x{VIDAS}")
  print("\n")
  print("  ", end='')
  for i, letter in enumerate(HIDE_WORD):
    print(letter, end="")
  print("\n")
 
def get_cant_hide_letters():
  count = 0
  for letter in HIDE_WORD:
    if letter == '_':
      count += 1
  return count

WORD = get_word()
HIDE_WORD = get_hide_word(WORD)


PLAYING = True
VIDAS = 7
error = False
textError = None


while PLAYING:
  show_interface()
  if error and textError is not None:
    print(textError)
  (_, letter) = validate_letter()
  
  is_found = False
  for i, l in enumerate(WORD):
    if letter.lower() == l.lower():
      error = False
      textError = None
      
      if HIDE_WORD[i] != '_':
        error = True
        textError = "Esta letra ya está."
      
      is_found = True
      HIDE_WORD[i] = l

  if not is_found:
    VIDAS -= 1

  if VIDAS <= 0:
    show_interface()
    print(f"Fin del juego, la palabra es: {''.join(WORD)}")
    PLAYING = False
    break

  if get_cant_hide_letters() <= 0:
    show_interface()
    print("FELICIDADES, haz ganado...")
    PLAYING = False
    break



print("\n")
`;

const modified_code = String.raw`
import os
import requests
import random
from pyodide.http import pyfetch


async def get_word():
    print('Cargando palabra...')
    words = [
        "mediaban",
        "ahínco",
        "hirviente",
        "íbamos",
        "trescientos",
        "agenciarse",
        "evidentemente",
        "canto",
        "concluya",
        "padecerá",
        "gastronómica",
        "facultades",
        "atrevan",
        "quitándole",
        "desconceptuadas",
        "avergüence",
        "glacial",
        "hendía",
        "reconozco",
        "atrajera",
        "gran",
        "teresuplicó",
        "gabineteme",
        "repita",
        "asombraría",
        "lagarto",
        "lucecilla",
        "llegó",
        "encontrele",
        "desconfianza",
    ]
    try:
        res = await pyfetch(
            "https://random-word-api.herokuapp.com/word", headers={"Content-Type": "application/json"},
        )
        data = res.json()
        return data[0]
    except Exception as e:
        randomIndex = random.randint(0, len(words) - 1)
        return words[randomIndex]


def get_hide_word(word):
    hide_word = []
    for l in word:
        hide_word.append("_")
    return hide_word

async def validate_letter():
    error = False
    while True:
        if error:
            show_interface()
            print("Caracter no valido:")

        letter = await input(f"Ingrese una letra {'nuevamente' if error else ''}: ")
        try:
            int(letter)
            error = True
            continue
        except:
            pass

        if isinstance(letter, str) and len(letter) == 1:
            return (True, letter)
        error = True
        continue


def show_interface():
    clear_terminal()
    print()
    print(f"💚 x{STATE['LIVES']}")
    print("\n")
    print("  ", end="")
    for i, letter in enumerate(STATE["HIDDEN_WORD"]):
        print(letter, end="")
    print("\n")


def get_cant_hide_letters():
    count = 0
    for letter in STATE["HIDDEN_WORD"]:
        if letter == "_":
            count += 1
    return count


STATE = {
    "WORD": None,
    "HIDDEN_WORD": None,
    "LIVES": 7,
}


async def main():
    STATE["WORD"] = await get_word()
    STATE["HIDDEN_WORD"] = get_hide_word(STATE["WORD"])

    PLAYING = True
    error = False
    textError = None

    while PLAYING:
        show_interface()
        if error and textError is not None:
            print(textError)
        (_, letter) = await validate_letter()

        is_found = False
        for i, l in enumerate(STATE["WORD"]):
            if letter.lower() == l.lower():
                error = False
                textError = None

                if STATE["HIDDEN_WORD"][i] != "_":
                    error = True
                    textError = "Esta letra ya está."

                is_found = True
                STATE["HIDDEN_WORD"][i] = l

        if not is_found:
            STATE["LIVES"] -= 1

            
        if STATE["LIVES"] <= 0:
            show_interface()
            print(f"Fin del juego, la palabra es: {''.join(STATE['WORD'])}")
            PLAYING = False
            break

        if get_cant_hide_letters() <= 0:
            show_interface()
            print("FELICIDADES, haz ganado...")
            PLAYING = False
            break

    print("\n")



main()
`;

export {
	modified_code as modified_ahorcado,
	original_code as original_ahorcado,
};
