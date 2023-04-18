//Helper function for changing the color of an element

const changeBackgroundColor = (value1, value2) => {
    if (value1.innerHTML != "") {
        value2.style.backgroundColor = 'goldenrod';
    } else {
        value2.style.backgroundColor = '#efefef';
    }
};

const revealContactBlock = (value1, value2) => {
    if (value1.innerHTML != "") {
        value2.style.display = 'none';
    } else {
        value2.style.display = 'block';
    }
};

//Helper functions for export
export { changeBackgroundColor, revealContactBlock };