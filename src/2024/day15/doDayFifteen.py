class WarehouseSimulator:    
    def __init__(self, map_input, move_input):
        self.map = [list(row) for row in map_input]
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

    def find_robot_position(self):
        for row in range(self.rows):
            for col in range(self.cols):
                if self.map[row][col] == '@':
                    return row, col
        raise ValueError("No robot found on the map.")

    def is_within_bounds(self, row, col):
        return 0 <= row < self.rows and 0 <= col < self.cols

    def calculate_gps_sum(self):
        return sum(100 * r + c for r in range(self.rows) for c in range(self.cols) if self.map[r][c] == 'O')

    def simulate(self):
        for move in self.moves:
            direction = self.directions[move]
            new_row, new_col = self.robot_pos[0] + direction[0], self.robot_pos[1] + direction[1]

            if not self.is_within_bounds(new_row, new_col) or self.map[new_row][new_col] == '#':
                continue

            if self.map[new_row][new_col] == '.':
                self.map[self.robot_pos[0]][self.robot_pos[1]] = '.'
                self.map[new_row][new_col] = '@'
                self.robot_pos = (new_row, new_col)
            elif self.map[new_row][new_col] == 'O':
                if self.push_boxes(new_row, new_col, direction):
                    self.map[self.robot_pos[0]][self.robot_pos[1]] = '.'
                    self.map[new_row][new_col] = '@'
                    self.robot_pos = (new_row, new_col)

        return self.calculate_gps_sum()

    def push_boxes(self, row, col, direction):
        path = [(row, col)]
        while True:
            next_row, next_col = path[-1][0] + direction[0], path[-1][1] + direction[1]
            if not self.is_within_bounds(next_row, next_col) or self.map[next_row][next_col] == '#':
                return False
            if self.map[next_row][next_col] == '.':
                break
            if self.map[next_row][next_col] == 'O':
                path.append((next_row, next_col))
            else:
                return False
        # Update boxes along the path
        for r, c in reversed(path):
            next_r, next_c = r + direction[0], c + direction[1]
            self.map[next_r][next_c] = 'O'
            self.map[r][c] = '.'
        return True


if __name__ == "__main__":
    with open('src/2024/day15/input.txt', 'r') as file:
      content = file.read().split('\n\n')
      map_input = content[0].splitlines()
      move_input = content[1].strip()

    simulator = WarehouseSimulator(map_input, move_input)
    gps_sum = simulator.simulate()
    print("GPS Sum:", gps_sum)
