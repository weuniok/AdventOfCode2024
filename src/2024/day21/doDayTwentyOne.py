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

# Cache for memoization
known_sequences = {}
def get_min_sequence_length(sequence: str, robot_level: int, max_level: int) -> int:
    # Check cache
    cache_key = (sequence, robot_level)
    if cache_key in known_sequences:
        return known_sequences[cache_key]
    
    # Base case: if we've reached the final robot level
    if robot_level == max_level:
        result = len(sequence)
    else:
        total_length = 0
        # Process each character in the sequence
        for i in range(len(sequence)):
            # Get moves needed from previous position to current
            current_position = 'A' if i == 0 else sequence[i - 1]
            next_position = sequence[i]
            moves = keypad_dirs[(current_position, next_position)]
            
            if isinstance(moves, list):
                # Try both path options and take the minimum
                path1 = moves[0] + moves[1] + 'A'
                path2 = moves[1] + moves[0] + 'A'
                total_length += min(
                    get_min_sequence_length(path1, robot_level + 1, max_level),
                    get_min_sequence_length(path2, robot_level + 1, max_level)
                )
            else:
                # Single path case
                total_length += get_min_sequence_length(moves + 'A', robot_level + 1, max_level)
        
        result = total_length
    
    # Cache and return result
    known_sequences[cache_key] = result
    return result

with open('src/2024/day21/input.txt', 'r') as file:
    codes = file.read().split('\n')

total = 0
for door_code in codes:
    min_length = get_min_sequence_length(door_code, level=0, max_level=26)
    total += min_length * int(door_code[:-1])

print(total)