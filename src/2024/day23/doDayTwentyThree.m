network = readlines('input.txt');
%% 
computers = network.split('-');
network_map = graph(computers(:, 1), computers(:, 2));

%% part 1
score = 0;
networks = dictionary(string([]), logical([]));
for node = 1:numnodes(network_map)
    if network_map.Nodes.Name{node}(1) == 't'
        adjacents = neighbors(network_map, node);

        for i = 1:length(adjacents)
            for j = i+1:length(adjacents)
                if findedge(network_map, adjacents(i), adjacents(j))
                    names = sort([node, adjacents(i), adjacents(j)]);
                    encoded = sprintf('%d-%d-%d', names(1), names(2), names(3));
                    if ~isKey(networks, encoded)
                        score = score + 1;
                        networks(encoded) = true;
                    end
                end
            end
        end
    end
end
display(score)
%% part 2
potential_nodes = [];

min_degree = 10;
for node = 1:numnodes(network_map)
    if network_map.Nodes.Name{node}(1) == 't'
        adjacents = neighbors(network_map, node);

        if numel(adjacents) < min_degree
            continue
        end
        sub_nodes = [node; adjacents];
        sub_map = subgraph(network_map, sub_nodes);
        degrees = degree(sub_map);

        keep_nodes = degrees >= min_degree;

        if sum(keep_nodes) > numel(potential_nodes)
            pruned_map = subgraph(network_map, sub_nodes(keep_nodes));
            needs_pruning = true;
            while needs_pruning
                degrees = degree(pruned_map);
                max_degree = max(degrees);
                [min_degree, min_node] = min(degrees);

                needs_pruning = min_degree ~= max_degree;
                pruned_map = subgraph(pruned_map, [min_node; neighbors(pruned_map, min_node)]);
            end

            if numel(pruned_map.Nodes.Name) > numel(potential_nodes)
                potential_nodes = pruned_map.Nodes.Name;
            end
        end

    end
end

final_map = subgraph(network_map, potential_nodes);

password = strjoin(sort(final_map.Nodes.Name), ',');
disp(password)
