export const validateForm = (fields) => {
    const errors = {};

    // Validate email
    if (!fields.email) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
        errors.email = "Invalid email format.";
    }

    // Validate password
    if (!fields.password) {
        errors.password = "Password is required.";
    } else if (fields.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    // Validate 2FA Code (if applicable)
    if (fields.code !== undefined && (!fields.code || fields.code.length !== 6 || isNaN(fields.code))) {
        errors.code = "Invalid 2FA code. It should be a 6-digit number.";
    }

    return errors;
};