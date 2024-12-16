data = readlines('input.txt');

positions = double(split(data.extractBetween('p=', ' '), ','));
velocities = double(split(data.extractAfter('v='), ','));

sim_time = 100;
new_positions = positions + velocities * 100;

dimensions = [101, 103];
% dimensions = [11,7];
warped_positions = mod(new_positions, dimensions) + [1,1]; % + 1/1 to get out of 0 values

hit_matrix = accumarray(warped_positions, 1, dimensions);

half_width = (dimensions(1)-1)/2;
half_height = (dimensions(2)-1)/2;
safety_factor = ...
    sum(hit_matrix(1:(half_width), 1:(half_height)), 'all') ... % 1st quadrant
    .* sum(hit_matrix(1:(half_width), (half_height+2):end), 'all') ... % 2nd quadrant
    .* sum(hit_matrix((half_width+2):end, 1:(half_height)), 'all') ... % 3rd quadrant
    .* sum(hit_matrix((half_width+2):end, (half_height+2):end), 'all'); % 4th quadrant
safety_factor

%% Part 2
max_sim_time = dimensions(1) * dimensions(2);
images = false(dimensions(1), dimensions(2), max_sim_time);
entropies = zeros(max_sim_time, 1);
sums = zeros(max_sim_time, 1);
for step = 1:max_sim_time
    new_positions = positions + velocities * step;
    warped_positions = mod(new_positions, dimensions) + [1,1]; % + 1/1 to get out of 0 values
    hit_matrix = accumarray(warped_positions, 1, dimensions);


    images(:, :, step) = logical(hit_matrix);
    entropies(step) = entropy(logical(hit_matrix));
    edges = edge(logical(hit_matrix));
    entropies(step) = entropy(edges);
    sums(step) = sum(logical(hit_matrix), 'all');
end

% [sorted, indices] = sort(entropies, 'descend');
% 
% for index = indices'
%     imshow(images(:,:,index));
% end

[sorted, indices] = sort(sums, 'descend');

for index = indices'
    imshow(images(:,:,index));
end
