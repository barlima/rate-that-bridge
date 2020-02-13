export const filterByName = (bridges, name) => {
  if (!name) {
    return bridges;
  }
  
  return bridges.filter(bridge => bridge.name.includes(name));
}

export const filterBridges = (bridges, phrase) => {
  if (!phrase) {
    return bridges;
  }
  
  return bridges.filter(bridge => {
    return bridge.name.toLowerCase().includes(phrase.toLowerCase()) || 
      bridge.city.toLowerCase().includes(phrase.toLowerCase()) || 
      bridge.country.toLowerCase().includes(phrase.toLowerCase());
  });
}