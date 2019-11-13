
let GeneralUtils = (function () {

    let isUserLoggedIn = function (currentUser) {
        return (currentUser && currentUser.id);
    };

    return {
        isUserLoggedIn
    }

}());

export default GeneralUtils;
