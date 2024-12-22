function price = findPrice(prices, sequence)
  diffs = diff(prices);
  start = strfind(diffs, sequence);
  if isempty(start)
      price = 0;
      return
  end
  price = prices(start(1)+numel(sequence));
end
