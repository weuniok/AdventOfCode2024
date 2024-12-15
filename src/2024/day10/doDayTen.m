topography = double(char(readlines('input.txt')))-48;

[rows, cols] = size(topography);
source_nodes = [];
target_nodes = [];
for row = 1:rows
    for col = 1:cols
        currentIndex = sub2ind([rows, cols], row, col);
        neighbors = [row, col] + [
            -1, 0; % Up
            1, 0; % Down
            0, -1; % Left
            0, 1; % Right
        ];
        for n = 1:size(neighbors, 1)
            neigh_row = neighbors(n, 1);
            neigh_col = neighbors(n, 2);
            if neigh_row > 0 && neigh_row <= rows && neigh_col > 0 && neigh_col <= cols
                neighborIndex = sub2ind([rows, cols], neigh_row, neigh_col);
                % Valid move: target height is exactly 1 greater
                if topography(neigh_row, neigh_col) == topography(row, col) + 1
                    source_nodes(end+1) = currentIndex;
                    target_nodes(end+1) = neighborIndex;
                end
            end
        end
    end
end
topography_graph = digraph(source_nodes, target_nodes, []);

trailhead_nodes = find(topography == 0);
total_score = 0; % score - number of pairs of trailheads and peaks accesible from that trailhead
total_trails = 0; % trails - number of unique trails between trailheads and peaks

for trailhead = trailhead_nodes'
    % Perform a BFS starting from trailhead
    reachable_nodes = bfsearch(topography_graph, trailhead);
    reachable_peaks = topography(reachable_nodes) == 9;

    for peak = reachable_nodes(reachable_peaks)'
        trails = allpaths(topography_graph, trailhead, peak);
        total_trails = total_trails + numel(trails);
    end

    score = sum(reachable_peaks);
    total_score = total_score + score;
end

total_score
total_trails