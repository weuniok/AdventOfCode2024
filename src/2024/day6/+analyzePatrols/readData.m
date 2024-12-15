function readData(inputPath)

data = importdata(inputPath);
data_numeric = cellfun(@(row) double(row), data, 'UniformOutput', false);
data_mat = cell2mat(data_numeric);

end