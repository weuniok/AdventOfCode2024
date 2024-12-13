inputPath = fullfile('src', 'day12', 'input.txt');
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
        crop_plot_polyshape = logicalArrayToPolyshape(label_map == crop_plot);
        edge_count = numsides(crop_plot_polyshape);

        total_price = total_price + area * edge_count;
    end

end

total_price

function combinedPolyshape = logicalArrayToPolyshape(logicalMap)
%LOGICALARRAYTOPOLYSHAPE Plots each logical cell as 1x1 squares and combines them into polyshape

[rows, cols] = size(logicalMap);

% TODO: this could be vectorised
polyArray = [];
for row = 1:rows
    for col = 1:cols
        if logicalMap(row, col)
            % These are corners of the 1x1 square
            x = [col-1, col, col, col-1];
            y = [rows-row, rows-row, rows-row+1, rows-row+1];
            square = polyshape(x, y);

            polyArray = [polyArray; square]; 
        end
    end
end

combinedPolyshape = union(polyArray);
end

