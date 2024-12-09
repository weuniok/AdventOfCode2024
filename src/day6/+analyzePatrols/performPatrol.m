function [visited_places, guard_on_site] = performPatrol(data_mat)
  %PERFORMPATROL simulates guard patrol based on the data. Returns visited
  %places and whether guard was still on site at the end (loop) 
  
  [guard_row, guard_col] = find(data_mat == double('^'));
  
  visited_places = false(size(data_mat));
  visited_places(guard_row, guard_col) = true;
  
  starting_positions.up = false(size(data_mat));
  starting_positions.left = false(size(data_mat));
  starting_positions.down = false(size(data_mat));
  starting_positions.right = false(size(data_mat));
  
  guard_direction = 'up';
  guard_on_site = ~isempty(guard_row);
  
  while(guard_on_site)
  
      if starting_positions.(guard_direction)(guard_row, guard_col)
          % guard already started here once == loop detected
          break
      end
      starting_positions.(guard_direction)(guard_row, guard_col) = true;
  
      switch(guard_direction)
          case 'up'
              obstacle_row = ...
                  find(data_mat(1:guard_row, guard_col) == double('#'), 1, 'last');
              if isempty(obstacle_row)
                  guard_on_site = false;
                  visited_places(1:guard_row, guard_col) = true;
                  break;
              end
              new_guard_row = obstacle_row+1;
  
              visited_places(new_guard_row:guard_row, guard_col) = true;
              guard_direction = 'right';
              guard_row = new_guard_row;
  
          case 'down'
              obstacle_index = ...
                  find(data_mat(guard_row:end, guard_col) == double('#'), 1, 'first');
              if isempty(obstacle_index)
                  guard_on_site = false;
                  visited_places(guard_row:end, guard_col) = true;
                  break;
              end
              obstacle_row = guard_row + obstacle_index - 1;
              new_guard_row = obstacle_row-1;
              % '-1' because find includes guard position in the searched
              % vector, which is done so the index won't exceed number of
              % array elements
  
              visited_places(guard_row:(new_guard_row), guard_col) = true;
              guard_direction = 'left';
              guard_row = new_guard_row;
  
          case 'left'
              obstacle_col = ...
                  find(data_mat(guard_row, 1:guard_col) == double('#'), 1, 'last');
              if isempty(obstacle_col)
                  guard_on_site = false;
                  visited_places(guard_row, 1:guard_col) = true;
                  break;
              end
              new_guard_col = obstacle_col+1;
  
              visited_places(guard_row, new_guard_col:guard_col) = true;
              guard_direction = 'up';
              guard_col = new_guard_col;
  
          case 'right'
              obstacle_index = ...
                  find(data_mat(guard_row, guard_col:end) == double('#'), 1, 'first');
              if isempty(obstacle_index)
                  guard_on_site = false;
                  visited_places(guard_row, guard_col:end) = true;
                  break;
              end
              obstacle_col = guard_col + obstacle_index - 1;
              new_guard_col = obstacle_col-1;
              % '-1' because find includes guard position in the searched
              % vector, which is done so the index won't exceed number of
              % array elements
  
              visited_places(guard_row, guard_col:new_guard_col) = true;
              guard_direction = 'down';
              guard_col = new_guard_col;
      end
  end
  
  
  end