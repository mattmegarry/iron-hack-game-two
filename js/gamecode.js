
function makeHamCheese (hamType, cheeseType) {

    var sandwich = hamType + ' ham and ' + cheeseType + ' cheese'; 

    return 'Your ' + sandwich + ' sandwich is ready!';

}

var myLunch = makeHamCheese('Serano', 'Edam');

function sloppyAdd (stringNum, num) {

    var result = num + stringNum; 

    return 'The answer is: ' + result;

}

var dontTellTheCGuy = sloppyAdd('2', 2);

