export const filterByName = (bridges, name) => {
  if (!name) {
    return bridges;
  }
  
  return bridges.filter(bridge => bridge.name.includes(name));
}