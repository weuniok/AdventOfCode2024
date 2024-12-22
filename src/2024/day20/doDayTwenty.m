topography = char(readlines('input.txt'));

[rows, cols] = size(topography);

graph2mat = @(x) ind2sub([rows, cols], x);
mat2graph = @(row, col) sub2ind([rows, cols], row, col);
%%  Graph preparation
adjacency = sparse(rows*cols, rows*cols); 
not_blocked_map = topography ~= '#';
% Prepare graph
for r = 1:rows
    for c = 1:cols
        if not_blocked_map(r, c)
            current_node = mat2graph(r, c);
            neighbors = [
                r-1, c;
                r+1, c;
                r, c-1;
                r, c+1
            ];
            
            for neigh_index = 1:4
                neigh_row = neighbors(neigh_index, 1);
                neigh_col = neighbors(neigh_index, 2);
                
                if neigh_row >= 1 && neigh_row <= rows ...
                        && neigh_col >= 1 && neigh_col <= cols ...
                        && not_blocked_map(neigh_row, neigh_col)
                    neighbor_node = mat2graph(neigh_row, neigh_col);
                    
                    adjacency(current_node, neighbor_node) = 1;
                end
            end
        end
    end
end

topography_graph = graph(adjacency);
start_node = find(topography == 'S');
end_node = find(topography =='E'); 
dist_to_finish = distances(topography_graph, end_node);

%% Shortcuts finding
shortcuts_min_dist = 100;
max_jump = 20;
shortcuts = dictionary(double([]), double([]));

for r = 1:rows
    for c = 1:cols
        if not_blocked_map(r, c)
            current_node = mat2graph(r, c);
            curr_dist = dist_to_finish(mat2graph(r, c));
           
            for dr = -max_jump:max_jump
                for dc = -max_jump:max_jump
                    jump_distance = abs(dr) + abs(dc);
                    if jump_distance <= max_jump
                        neigh_row = r + dr;
                        neigh_col = c + dc;
                        
                        if neigh_row >= 1 && neigh_row <= rows ...
                                && neigh_col >= 1 && neigh_col <= cols ...
                                && not_blocked_map(neigh_row, neigh_col)
                            
                            this_dist = dist_to_finish(mat2graph(neigh_row, neigh_col));
                            saved_dist = curr_dist - this_dist - jump_distance;
                            if saved_dist > 0
                                if ~isKey(shortcuts, saved_dist)
                                    shortcuts(saved_dist) = 1;
                                else 
                                    shortcuts(saved_dist) = shortcuts(saved_dist) + 1;
                                end
                            end
                        end
                    end
                end
            end
        end
    end
end

summary = [keys(shortcuts)'; values(shortcuts)'];
[~, sorting] = sort(keys(shortcuts));
summary(:, sorting)
score = sum(summary(2, summary(1, :) >= shortcuts_min_dist), 'all')
