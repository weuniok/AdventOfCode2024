class WarehouseSimulator:
    def __init__(self, map_input, move_input):
        self.original_map = [list(row) for row in map_input]
        self.map = self.resize_map(self.original_map)
        self.moves = move_input.replace('\n', '')
        self.rows = len(self.map)
        self.cols = len(self.map[0])
        self.robot_pos = self.find_robot_position()
        self.directions = {
            '>': (0, 1), 
            '<': (0, -1),
            '^': (-1, 0),
            'v': (1, 0),
        }

    def resize_map(self, original_map):
        resized_map = []
        for row in original_map:
            resized_row = []
            for char in row:
                if char == '#':
                    resized_row.append('##')
                elif char == 'O':
                    resized_row.append('[]')
                elif char == '.':
                    resized_row.append('..')
                elif char == '@':
                    resized_row.append('@.')
            resized_map.append("".join(resized_row))

        for row in resized_map:
            print("".join(row))
        return [list(row) for row in resized_map]

    def find_robot_position(self):
        for row in range(self.rows):
            for col in range(self.cols):
                if self.map[row][col] == '@':
                    return row, col
        raise ValueError("No robot found on the map.")

    def is_within_bounds(self, row, col):
        return 0 <= row < self.rows and 0 <= col + 1 < self.cols

    def calculate_gps_sum(self):
        
        return sum(100 * r + c for r in range(self.rows) for c in range(self.cols) if self.map[r][c] == '[')
    
    def simulate(self, print_map=False):
        for move in self.moves:
            
            direction = self.directions[move]
            new_row, new_col = self.robot_pos[0] + direction[0], self.robot_pos[1] + direction[1]
            
            can_half_box_be_pushed, push_callback = self.can_half_box_be_pushed(self.robot_pos[0], self.robot_pos[1], direction)    
            if can_half_box_be_pushed:
                push_callback()
                self.robot_pos = (new_row, new_col)
                self.map[self.robot_pos[0]][self.robot_pos[1]] = '@'
                
            if print_map:
                print("Move:", move)
                self.print_map()

        return self.calculate_gps_sum()
    
    def print_map(self):
        for row in self.map:
            print("".join(row))
        print("")    

    def can_half_box_be_pushed(self, row, col, direction):
        """
        Check if a half of a box can be pushed and return a callback to do the push.
        Returns (bool, callback_function or None)
        """
        next_row, next_col = row + direction[0], col + direction[1]
        self.map[next_row][next_col] = self.map[next_row][next_col]
        # Check bounds and walls
        if not self.is_within_bounds(next_row, next_col) or self.map[next_row][next_col] == '#':
            return False, None
            
        # If next space is empty, we can push
        if self.map[next_row][next_col] == '.':
            def push_callback():
                self.map[next_row][next_col] = self.map[row][col]
                self.map[row][col] = '.'
                print()
            return True, push_callback
            
        # If next space is a box part, verify it's a complete box and try to push it
        if self.map[next_row][next_col] in ['[', ']']:
            if direction[1] == 0:  # Vertical movement - check both parts of the box
                # Find the other half of the next box
                other_pushed_half = ']' if self.map[next_row][next_col] == '[' else '['
                other_col = next_col + (1 if self.map[next_row][next_col] == '[' else -1)
                
                if not self.is_within_bounds(next_row, other_col) or self.map[next_row][other_col] != other_pushed_half:
                    return False, None  # Not a complete box
                    
                # Try to push the complete box from its left bracket
                box_start_col = next_col if self.map[next_row][next_col] == '[' else next_col - 1
                can_push_left, left_callback = self.can_half_box_be_pushed(next_row, box_start_col, direction) # Left bracket
                can_push_right, right_callback = self.can_half_box_be_pushed(next_row, box_start_col + 1, direction) # Right bracket
                
                if not (can_push_left and can_push_right):
                    return False, None
                    
                # Create callback that first pushes the next box, then this one
                def combined_callback():
                    if self.map[next_row][next_col] == self.map[row][col]:
                        if self.map[next_row][next_col] == '[':
                            left_callback()
                        else:
                            right_callback()
                    else:           
                        left_callback()
                        right_callback()
                    self.map[next_row][next_col] = self.map[row][col]  # Then push current box
                    self.map[row][col] = '.'
                return True, combined_callback
            else:  # Horizontal movement - just push
                can_push, push_callback = self.can_half_box_be_pushed(next_row, next_col, direction) 
                if not can_push:
                    return False, None
                
                def combined_callback():
                    push_callback()
                    self.map[next_row][next_col] = self.map[row][col]  # Then push current box
                    self.map[row][col] = '.'
                return True, combined_callback
            
        return False, None

if __name__ == "__main__":
    with open('src/2024/day15/input.txt', 'r') as file:
        content = file.read().split('\n\n')
        map_input = content[0].splitlines()
        move_input = content[1].strip()

    simulator = WarehouseSimulator(map_input, move_input)
    gps_sum = simulator.simulate(True)
    print("GPS Sum:", gps_sum)
