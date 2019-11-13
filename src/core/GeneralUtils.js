
let GeneralUtils = (function () {

    let isUserLoggedIn = function (currentUser) {
        return (currentUser && currentUser.id);
    };

    return {
        isUserLoggedIn
    }

}());

export default GeneralUtils;

// funcion para saber si un usuario esta autenticado o no
