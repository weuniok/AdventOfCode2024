function sum = getAllPrices(prices, sequence)
  sum = 0;
  for price_seq = prices
      price = findPrice(price_seq', sequence);
      sum = sum + price;
  end
  
  end