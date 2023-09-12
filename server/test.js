const bcrypt = require('bcryptjs');
bcrypt.compare("$2a$10$pKsFfRGDk7AUOEWp8h4Q9.rLjG/FT9c1AKZ1jEeaFNlNRUoGyhjtS", "12345678 ",
    async function (err, isMatch) {

        // Comparing the original password to
        // encrypted password
        if (isMatch) {
            console.log('Decrypted password is: ', "12345678");
            console.log('Encrypted password is: ', "$2a$10$pKsFfRGDk7AUOEWp8h4Q9.rLjG/FT9c1AKZ1jEeaFNlNRUoGyhjtS");
        }

        if (!isMatch) {

            // If password doesn't match the following
            // message will be sent
            console.log("$2a$10$pKsFfRGDk7AUOEWp8h4Q9.rLjG/FT9c1AKZ1jEeaFNlNRUoGyhjtS" + ' is not encryption of '
                + "12345678");
        }
  })