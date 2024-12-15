signals = flip(char(readlines('input.txt')), 2);

frequencies = unique(signals(signals ~= '.'));

figure(1)
clf
colors = jet(numel(frequencies));
set(gca,'xtick', 1:1:width(signals))
set(gca,'ytick', 1:1:height(signals))
grid on
axis equal
hold on

% fence
x1=0.5;
x2=width(signals) + 0.5;
y1=0.5;
y2=height(signals) + 0.5;
x = [x1, x2, x2, x1, x1];
y = [y1, y1, y2, y2, y1];
plot(x, y, 'black--', 'LineWidth', 3);

solutions_p1 = zeros(size(signals));
solutions_p2 = zeros(size(signals));

diagonal = ceil(sqrt(height(signals).^2 + width(signals)^2));
for freq_idx = 1:numel(frequencies)
    frequency = frequencies(freq_idx);
    mask = signals== frequency;
    [x, y] = find(mask);
    coords = [x,y];

    text(x, y, frequency, 'Color', colors(freq_idx,:), 'FontSize', 12, ...
        'HorizontalAlignment', 'center', ...
        'VerticalAlignment', 'baseline')

    for antenna_index = 1:numel(x)
        for other_antenna = (antenna_index+1):numel(x)
            diffs = coords(other_antenna, :) - coords(antenna_index, :);
            %% part 1 - two antinodes with distance D and 2D from nodes
            new_points = [coords(other_antenna, :) + diffs; coords(antenna_index, :) - diffs];
            points_in_bounds_mask = new_points(:,1) >= 1 & new_points(:,1) <= width(signals) ...
                & new_points(:,2) >= 1 & new_points(:,2) <= height(signals);

            points_in_bounds = new_points(points_in_bounds_mask,:);
            for point = 1:height(points_in_bounds)
                solutions_p1(points_in_bounds(point, 1), points_in_bounds(point, 2)) = 1;
            end
            plot(points_in_bounds(:,1), points_in_bounds(:,2), 'o', 'Color', colors(freq_idx,:), ...
                'MarkerSize', 11)

            %% part 2 - antinodes are all points on line from nodes
            diffs_normed = diffs ./ gcd(diffs(1), diffs(2));

            max_multiple = ceil(diagonal ./ max(abs(diffs_normed)));
            diffs_combinations = diffs_normed ...
                .* [(-max_multiple:1:max_multiple)', (-max_multiple:1:max_multiple)'];
            new_points = coords(antenna_index, :) + diffs_combinations;
            points_in_bounds_mask = new_points(:,1) >= 1 & new_points(:,1) <= width(signals) ...
                & new_points(:,2) >= 1 & new_points(:,2) <= height(signals);

            points_in_bounds = new_points(points_in_bounds_mask,:);
            for point = 1:height(points_in_bounds)
                solutions_p2(points_in_bounds(point, 1), points_in_bounds(point, 2)) = 1;
            end

            plot(points_in_bounds(:,1), points_in_bounds(:,2), 'x', 'Color', colors(freq_idx,:),...
                'MarkerSize', 11)

        end
    end
end

sum(solutions_p1, 'all')
sum(solutions_p2, 'all')
