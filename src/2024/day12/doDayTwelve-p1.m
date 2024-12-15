inputPath = fullfile('src', '2024', 'day12', 'input.txt');
raw_farm = importdata(inputPath)

farm = cell2mat(cellfun(@(row) double(row), raw_farm, 'UniformOutput', false));
padded_farm = padarray(farm, [1,1], 0, 'both');

unique_crops = unique(farm);

total_price = 0;
for crop = unique_crops'
    label_map = bwlabel(padded_farm == crop, 4);

    unique_labels = unique(label_map);
    plots = unique_labels(unique_labels ~= 0);

    for crop_plot = plots'
        area = sum(label_map == crop_plot, 'all');

        plot_map = label_map == crop_plot;
        kernel = [0 1 0; 1 0 1; 0 1 0];
        convolution = conv2(plot_map, kernel, 'same');

        neighbours_map = convolution .* (label_map == crop_plot);
        perimeter_edges_count = (4 - neighbours_map) .* (label_map == crop_plot);

        perimeter = sum(perimeter_edges_count, 'all');
        total_price = total_price + area * perimeter;
    end

end
total_price
