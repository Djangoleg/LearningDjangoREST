import app_path from "./AppPath";

const header = document.getElementsByClassName('switchButtoms');

const hasHeaderChildren = () => {
    if (header) {
        if (header.length > 0) {
            if (header[0].children) {
                if (header[0].children.length > 0) {
                    return true;
                }
            }
        }
    }
    return false;
}

export const inactiveLinkClass = () => {

    if (hasHeaderChildren()) {

        for (let i = 0; i < header[0].children.length; i++) {
            header[0].children[i].className = 'inactive';
        }
    }
}

export const setActiveLink = () => {

    if (hasHeaderChildren()) {
        if (document.location.hash === '#' + app_path.users) {
            header[0].children[0].className = 'active';
        } else if (document.location.hash === '#' + app_path.projects) {
            header[0].children[1].className = 'active';
        } else if (document.location.hash === '#' + app_path.todo) {
            header[0].children[2].className = 'active';
        }
    }
}
