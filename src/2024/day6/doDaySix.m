inputPath = fullfile('src', '2024', 'day6', 'input.txt');
data_mat = analyzePatrols.readData(inputPath);

visited_places = analyzePatrols.performPatrol(data_mat);
fprintf('Number of visited places: %d\n', sum(visited_places(:)));

loop_counter = analyzePatrols.findAllLoops(data_mat);
fprintf('Number of possible loops: %d\n', loop_counter);