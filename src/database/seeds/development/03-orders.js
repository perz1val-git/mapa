
exports.seed = function (knex) {
    return knex('orders').insert([
        { id: '1', town: 'Legionowo', street: 'Kolejowa', number: '86', postal_code: '05-120', fk_transports: 1, transports_position: 1 },
        { id: '2', town: 'Wyszków', street: 'Pułtuska', number: '96', postal_code: '07-200 ', fk_transports: 1, transports_position: 2 },
        { id: '3', town: 'Ostrołęka', street: 'Wspólna', number: '23', postal_code: '07-410', fk_transports: 1, transports_position: 3 },
        { id: '4', town: 'Bartąg', street: 'Nad Łyną', number: '15', postal_code: '10-687', fk_transports: 1, transports_position: 4 },
        { id: '5', town: 'Łódź', street: 'Pomorska', number: '75', postal_code: '90-224', fk_transports: 2, transports_position: 1 },
        { id: '6', town: 'Piotrków Trybunalski', street: 'Jerozolimska', number: '70', postal_code: '97-320', fk_transports: 2, transports_position: 2 },
        { id: '7', town: 'Końskie', street: 'Piłsudskiego', number: '82', postal_code: '26-200', fk_transports: 2, transports_position: 3 },
        { id: '8', town: 'Tłuchowo', street: 'Sierpecka', number: '7', postal_code: '87-605', fk_transports: 3, transports_position: 1 },
        { id: '9', town: 'Włocławek', street: 'Kaletnicza', number: '1', postal_code: '87-800', fk_transports: 3, transports_position: 2 },
        { id: '10', town: 'Radziejów', street: 'Wyzwolenia', number: '85', postal_code: '88-200', fk_transports: 3, transports_position: 3 },
        { id: '11', town: 'Puławy', street: 'Wojska Polskiego', number: '7', postal_code: '24-100' },
        { id: '12', town: 'Międzybłocie', number: '23', postal_code: '77-400' },
    ]);
};
