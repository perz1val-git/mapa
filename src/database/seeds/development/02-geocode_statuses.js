
exports.seed = function (knex) {
    return knex('geocode_statuses').insert([
        { id: 10, name: 'Nie geokodowane', color: '#6d6d6d' },
        { id: 11, name: 'Geokodowanie...', color: '#02a7d9' },
        { id: 20, name: 'Sukces', color: '#1b9625' },
        { id: 21, name: 'Wymaga uwagi', color: '#bf0eda' },
        { id: 30, name: 'Błąd', color: '#d91212' },
    ]);
};
