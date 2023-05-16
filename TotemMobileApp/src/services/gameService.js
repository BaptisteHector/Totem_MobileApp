const getGamesByUser = (userId) => {
    fetch('http://localhost:10000/api/game/getByUser/' + userId, {
        method: 'GET',
      });
}

export default { getGamesByUser }

