function all_paths = allShortestPaths(graph, start_node, end_node, max_distance, n_locations)
  %ALLSHORTESTPATHS - returns all shortest paths between to nodes. 
  % uses precalculated max_distance and has graph weights hardcoded to puzzle 16 values
  % because finding the edge weight using graph.Edges.Weight(findedges(this, next)) was much slower
  
  all_paths = {};
  
  queue = {struct('path', [start_node], 'distance', 0)};
  visited = containers.Map(start_node, 0);
  
  while ~isempty(queue)
      current_path = queue{1}.path;
      current_distance = queue{1}.distance;
      queue(1) = [];
      current_node = current_path(end);
      
      if current_distance > max_distance % cuts bad paths
          continue;
      end
      
      if current_node == end_node % on finish
          all_paths{end+1} = current_path;
          continue;
      end
      
      neighbors = successors(graph, current_node);
      for i = 1:numel(neighbors)
          next_node = neighbors(i);
          
          edge_weight = (ceil(current_node/n_locations) ~= ceil(next_node/n_locations)) * 999 + 1;
          % edge_weight = graph.Edges.Weight(findedges(current_node, next_node));
          % ^^ this is non-hardcoded way, but it's much slower
          new_distance = current_distance + edge_weight;
          
          % Disregard if the new distance to that node is worse than already logged
          % (turns don't have to be included, because each node is a coupled position with direction)
          if ~isKey(visited, next_node) || new_distance <= visited(next_node)
              new_path = [current_path, next_node];
              
              queue{end+1} = struct('path', new_path, 'distance', new_distance);
              visited(next_node) = new_distance;
          end
      end
  end
  end