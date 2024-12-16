topography = char(readlines('input.txt'));

[rows, cols] = size(topography);
source_nodes = [];
target_nodes = [];
weights = [];
directions = {'E', 'S', 'W', 'N'};
moves = [0, 1;
    1, 0;
    0, -1;
    -1, 0;
    ];

for dir_index = 1:numel(directions)
    index_modifier = rows * cols * (dir_index-1);
    
    for row = 1:rows
        for col = 1:cols
            if topography(row, col) == '#'
                continue
            end
            
            current_index = sub2ind([rows, cols], row, col) + index_modifier;
            next_col = col + moves(dir_index, 2);
            next_row = row + moves(dir_index, 1);
            
            if next_row >= 1 && next_row <= rows && next_col >= 1 && next_col <= cols && topography(next_row, next_col) ~= '#'
                next_index = sub2ind([rows, cols], next_row, next_col) + index_modifier;
                source_nodes(end+1) = current_index;
                target_nodes(end+1) = next_index;
                weights(end+1) = 1;
            end
            
            turn_dir_indices = [mod(dir_index, 4) + 1, mod(dir_index + 2, 4) + 1];
            for turn_dir_index = turn_dir_indices
                turn_index = sub2ind([rows, cols], row, col) + rows * cols * (turn_dir_index-1);
                source_nodes(end+1) = current_index;
                target_nodes(end+1) = turn_index;
                weights(end+1) = 1000;
            end
        end
        
    end
end
topography_graph = digraph(source_nodes, target_nodes, weights);

start_node = find(topography == 'S');
end_node = find(topography == 'E');

scores = Inf(numel(directions), 1);
for dir_index = 1:numel(directions)
    index_modifier = rows * cols * (dir_index-1);
    [~, points] = shortestpath(topography_graph, start_node, end_node + index_modifier);
    scores(dir_index) = points;
end
best_points = min(scores)

%% Part 2
used_nodes = [];
for dir_index = 1:numel(directions)
    if scores(dir_index) ~= best_points
        continue
    end
    
    index_modifier = rows * cols * (dir_index-1);
    paths = allShortestPaths(topography_graph, start_node, end_node + index_modifier, best_points, rows*cols);
    real_nodes = mod([paths{:}] - 1, rows * cols) + 1;
    used_nodes = [used_nodes;  unique(real_nodes)];
end
numel(unique(used_nodes))

[y,x] = ind2sub([rows, cols], used_nodes);
figure(1)
clf
plot(x, -y, 'o');
hold on
plot([1, cols, cols, 1, 1], -[1, 1, rows, rows, 1], 'k-');
axis equal
grid on
xTicks = 1:cols;
yTicks = (-rows):(-1);
set(gca, 'XTick', xTicks, 'YTick', yTicks);
