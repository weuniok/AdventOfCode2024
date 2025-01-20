# Maps each button to its (r,c) coordinate on the keypad
numpad = {'7': (0, 0), '8': (0, 1), '9': (0, 2),  # First row
          '4': (1, 0), '5': (1, 1), '6': (1, 2),  # Second row
          '1': (2, 0), '2': (2, 1), '3': (2, 2),  # Third row
          '0': (3, 1), 'A': (3, 2)}               # Bottom row

# Maps directional pad buttons to coordinates
dirpad = {'^': (0, 1), 'A': (0, 2),    # Top row
          '<': (1, 0), 'v': (1, 1), '>': (1, 2)}  # Bottom row
keypad_dirs = {}

# For each pair of buttons on the numeric keypad
for origin_number, origin_position in numpad.items():
    for target_number, target_location in numpad.items():
        num_pair = (origin_number, target_number)
        origin_row = origin_position[0]
        target_row = target_location[0]
        origin_col = origin_position[1]
        target_col = target_location[1]
        row_diff = abs(origin_row - target_row)
        col_diff = abs(origin_col - target_col)
        # If buttons are in same column, just move up/down
        if origin_col == target_col:
            keypad_dirs[num_pair] = ('v' if origin_row < target_row else '^') * row_diff 
        # If buttons are in same row, just move left/right
        elif origin_row == target_row:
            keypad_dirs[num_pair] = ('>' if origin_col < target_col else '<') * col_diff
        # If buttons are diagonal from each other
        else:
            # On diagonals it can go vertical first or horizontal
            # The array is used to go check both cases
            # Except when moving from column 0 to row 3 or vice versa
            if origin_col == 0 and target_row == 3:
                keypad_dirs[num_pair] = '>' * col_diff + 'v' * row_diff
            elif origin_row == 3 and target_col == 0:
                keypad_dirs[num_pair] = '^' * row_diff + '<' * col_diff
            else:
                keypad_dirs[num_pair] = [
                    ('v' if origin_row < target_row else '^') * row_diff,
                    ('>' if origin_col < target_col else '<') * col_diff
                ]
for origin_arrow, origin_position in dirpad.items():
    for target_arrow, target_location in dirpad.items():
        dir_pair = (origin_arrow, target_arrow)
        origin_row = origin_position[0]
        target_row = target_location[0]
        origin_col = origin_position[1]
        target_col = target_location[1]
        row_diff = abs(origin_row - target_row)
        col_diff = abs(origin_col - target_col)
        if origin_col == target_col: 
          keypad_dirs[dir_pair] = ('v' if origin_row < target_row else '^') * row_diff
        elif origin_row == target_row: 
          keypad_dirs[dir_pair] = ('>' if origin_col < target_col else '<') * col_diff
        else:
            if origin_row == 0 and target_col == 0: 
              keypad_dirs[dir_pair] = 'v' * row_diff + '<' * col_diff
            elif origin_col == 0 and target_row == 0: 
              keypad_dirs[dir_pair] = '>' * col_diff +  '^' * row_diff
            else: 
              keypad_dirs[dir_pair] = [
                ('v' if origin_row < target_row else '^') * row_diff, 
                ('>' if origin_col < target_col else '<') * col_diff
                ]

def keypress(press, new_sequence):
    if press == len(sequence):
        sequences.append(new_sequence)
    else:
        presses = keypad_dirs[
          ('A' if press == 0 else sequence[press - 1], 
           sequence[press])
          ]
        if isinstance(presses, list):
            keypress(press + 1, new_sequence + presses[0] + presses[1] + 'A')
            keypress(press + 1, new_sequence + presses[1] + presses[0] + 'A')
        else:
            keypress(press + 1, new_sequence + presses + 'A')



with open('src/2024/day21/input.txt', 'r') as file:
    codes = file.read().split('\n')
      
total = 0
for door_code in codes:
    sequences = []
    sequence = door_code
    keypress(0, '')
    
    # robot 2
    possible_variants = sequences
    sequences = []  
    for variant in possible_variants:
        sequence = variant
        keypress(0, '')
        
    # robot 3    
    possible_variants = sequences
    sequences = []  
    for robot_3_code in possible_variants:
        sequence = robot_3_code
        keypress(0, '')
        
    total += min([len(sequence) for sequence in sequences]) * int(door_code[:-1])
print(total)