exports.JWT_SECRET = "MY_JWT_SECRET"

module.exports.validateJwt = async (decoded) => {
    console.log("AHHHHHHHHHHH " + decoded.userId)
    if (!decoded) {
        return { isValid: false };
    } else {
        return { 
            isValid: true,
            credentials: {
                userId: decoded.userId,
                email: decoded.email
            }
        }
    }


    return { isValid: true };
};