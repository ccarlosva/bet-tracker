const validator = require("password-validator")

const schema = new validator();

schema
.is().min(8,'The password must be at least 8 characters')                     // Minimum length 8
.has().uppercase(1, 'Password must have at least one upper case character')   // Must have uppercase letters
.has().lowercase(1, 'Password must have at least one upper case character')   // Must have lowercase letters
.has().digits(1, 'Password must have at least one digit')                     // Must have at least a digits
.has().not().spaces()                                                         // Should not have spaces
.has().symbols(1, 'Password must have at least one special character')        // Must have a special character
.is().not().oneOf(['Passw0rd', 'Password123'], "Unsecure Password");          // Blacklist these values

module.exports = schema;