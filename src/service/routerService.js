

const moveToMainPage = () => {
    window.location.href = '/main';
}

const moveToLogin = () => {
    window.location.href = '/';
}

const moveToForm = () => {
    window.location.href = '/form';
}

const moveToInfoEvento = (idEvento) => {
    window.location.href = window.location.origin+'/evento/' + idEvento;
}

const moveToUpdateEvento = (idEvento) => {
    window.location.href = window.location.origin+'/updateEvento/' + idEvento;
}

const moveToUserInfo = () => {
    window.location.href = '/infoUser';
}


const routerService = {
    moveToLogin, moveToMainPage, moveToForm, moveToInfoEvento,moveToUpdateEvento, moveToUserInfo};

export default routerService;