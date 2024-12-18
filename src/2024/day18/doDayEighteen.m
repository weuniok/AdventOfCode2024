data = importdata('input.txt');

% example vars
% steps = 12;
% size = 7;

% input vars
steps = 1024;
size = 71;

map = zeros(size);
adjacency = zeros(size*size);
for node = 1:(size*size)
    if mod(node, size) ~= 0 % not last column
        adjacency(node, node+1) = 1;
    end
    if mod(node, size) ~= 1 % not first column
        adjacency(node, node-1) = 1;
    end
    if node > size % not first row
        adjacency(node, node - size) = 1;
    end
    if node <= size*(size-1) % not last row
        adjacency(node, node + size) = 1;
    end
end

data_index_adjusted = data + 1;
blocked_nodes = sub2ind([size, size], ...
    data_index_adjusted(:, 1), data_index_adjusted(:, 2));

goal = @(x) shortestPathAfterBits(...
    adjacency, x, blocked_nodes, 1, size*size);

part_1_score = goal(steps)

%% part 2

max_step = fminbnd(@(x) findMinimalArgument(x, goal),...
    2, numel(blocked_nodes));

last_block = data_index_adjusted(ceil(max_step + 1), :);
p2_answer = last_block - 1 % index adjustment

function score = shortestPathAfterBits(...
  adjacency, steps, blocked_nodes, start, goal)
  %SHORTESTPATHAFTERBITS Returns the shortest path after blocking nodes

  blocked_nodes = blocked_nodes(1:steps);
  adjacency(blocked_nodes, :) = 0;
  adjacency(:, blocked_nodes) = 0;
  map_graph = graph(adjacency);
  [~, score] = shortestpath(map_graph, start, goal);
end

function ret = findMinimalArgument(x, fun)
  %FINDMINIMALARGUMENT Returns -argument if value is not inf, else returns 0

  x = ceil(x);
  value = fun(x);
  ret = -x;
  if isinf(value)
      ret = 0;
  end
end
