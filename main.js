/**
 * Created by Zenin Kirill 17.11.16.
 */

// Автомат Мили
var automaton = {};
automaton.q = [];
automaton.x = [];
automaton.y = [];
automaton.b = [];
automaton.l = [];

// Сеть Петри
var net = {};
net.p = [];
net.t = [];
net.i = [];
net.o = [];


/**
 * Функция преобразования автомата Мили в сеть Петри.
 * Ввод и вывод данных производится при помощи форм на странице.
 */
function calculate() {

    clearOutput();
    readInputStrings();

    for (var i = 0; i < automaton.x.length; i++)
        net.p.push(automaton.x[i]);
    for (i = 0; i < automaton.q.length; i++)
        net.p.push(automaton.q[i]);
    for (i = 0; i < automaton.y.length; i++)
        net.p.push(automaton.y[i]);

    for (i = 0; i < automaton.q.length; i++) {
        for (j = 0; j < automaton.x.length; j++) {
            var temp = 't' + (i * automaton.x.length + j).toString();
            net.t.push(temp);
            net.i.push([temp, automaton.q[i], automaton.x[j]]);
            net.o.push([temp, findBeta(automaton.q[i], automaton.x[j]), findLambda(automaton.q[i], automaton.x[j])])
        }
    }

    writeOutputStrings();
}

/**
 * Функция производящая чтение и парсинг входных данных с формы
 */
function readInputStrings() {

    var inputQ = $('#input-q').val();
    var inputX = $('#input-x').val();
    var inputY = $('#input-y').val();
    var inputB = $('#input-b').val();
    var inputL = $('#input-l').val();

    automaton.q = inputQ.split(/[ ,.;]{2,}/);
    automaton.x = inputX.split(/[ ,.;]{2,}/);
    automaton.y = inputY.split(/[ ,.;]{2,}/);

    var arrayOfB = inputB.split(/[ ,.;]{2,}/);
    for (var i = 0; i < arrayOfB.length; i++)
        automaton.b[i] = arrayOfB[i].split(/[f(),.=]+/);

    var arrayOfL = inputL.split(/[ ,.;]{2,}/);
    for (i = 0; i < arrayOfL.length; i++)
        automaton.l[i] = arrayOfL[i].split(/[f(),.=]+/);
}

/**
 * Функция производящая линейный поиск значения функции преобразования
 * @param q состояние из которого совершается переход
 * @param x прочтенный символ, инициировавший переход
 * @returns {*} состояние в которое совершается переход
 */
function findBeta(q, x) {
    for (var i = 0; i < automaton.b.length; i++)
        if ((automaton.b[i][1] == q) && (automaton.b[i][2] == x))
            return automaton.b[i][3];
}

/**
 * Функция производящая линейный поиск значения функции вывода
 * @param q состояние из которого совершается переход
 * @param x прочтенный символ, инициировавший переход
 * @returns {*} символ, который будет выведен при переходе
 */
function findLambda(q, x) {
    for (var i = 0; i < automaton.l.length; i++)
        if ((automaton.l[i][1] == q) && (automaton.l[i][2] == x))
            return automaton.l[i][3];
}

/**
 * Функция производящая вывод результирующих строк в выходную форму
 */
function writeOutputStrings() {
    var outputP = '';
    for (var i = 0; i < net.p.length; i++) {
        outputP = outputP.concat(net.p[i]);
        if (i != (net.p.length - 1))
            outputP = outputP.concat(', ');
    }
    $('#output-p').text(outputP);

    var outputT = '';
    for (i = 0; i < net.t.length; i++) {
        outputT = outputT.concat(net.t[i]);
        if (i != (net.t.length - 1))
            outputT = outputT.concat(', ');
    }
    $('#output-t').text(outputT);

    var outputI = '';
    var outputO = '';
    for (i = 0; i < net.i.length; i++) {
        outputI = outputI.concat('i(' + net.i[i][0] + ')={' + net.i[i][1] + ', ' + net.i[i][2] + '}');
        outputO = outputO.concat('0(' + net.o[i][0] + ')={' + net.o[i][1] + ', ' + net.o[i][2] + '}');
        if (i != (net.i.length - 1)) {
            outputI = outputI.concat(', ');
            outputO = outputO.concat(', ');
        }
    }

    $('#output-i').text(outputI);
    $('#output-o').text(outputO);
}

/**
 * Функция очистки форм ввода и вывода
 */
function clearForms() {
    $('#input-b').val('');
    $('#input-l').val('');
    $('#input-q').val('');
    $('#input-x').val('');
    $('#input-y').val('');
    clearOutput();
}

function clearOutput() {
    $('#output-p').text('');
    $('#output-t').text('');
    $('#output-i').text('');
    $('#output-o').text('');

    automaton = {};
    automaton.q = [];
    automaton.x = [];
    automaton.y = [];
    automaton.b = [];
    automaton.l = [];

    net = {};
    net.p = [];
    net.t = [];
    net.i = [];
    net.o = [];
}

