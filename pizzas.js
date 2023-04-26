function setup() {
    createCanvas(windowWidth, windowHeight)

    //boton para agregar las partes
    input = createInput();
    input.position(100, 80);
    button = createButton('Agregar');
    button.position(240, 80);
    button.mousePressed(add);

    //tamaño y posicion de los circulos
    circle(140, 300, 200)
    circle(410, 300, 200)
    circle(680, 300, 200)
}

function add() {
    const divs = input.value()
    if (divs > 1) {
        circle(140, 300, 200)
        circle(410, 300, 200)
        circle(680, 300, 200)
        divide(140, 300, 100, divs, 'puntop')
        divide(410, 300, 100, divs, 'dda')
        divide(680, 300, 100, divs, 'Bresenham')
    } else {
        circle(140, 300, 200)
        circle(410, 300, 200)
        circle(680, 300, 200)
    }
}

// Algoritmo de la ecuación punto pendiente para la primer pizza
function puntop(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const m = (dy !== 0) ? dy / dx : 0;
    const b = y1 - m * x1;

    const xMin = min(x1, x2);
    const xMax = max(x1, x2);
    if (abs(m) == Infinity) {
        if (y2 > y1) {
            for (let y = y1; y <= y2; y++) {
                point(x1, y)
            }
        } else if (y1 > y2) {
            for (let y = y2; y <= y1; y++) {
                point(x1, y)
            }
        }
    } else {
        for (let x = xMin; x <= xMax; x++) {
            const y = m * x + b;
            point(x, y);
        }
    }
}

// Algoritmo DDA para la segunda pizza
function dda(x1, y1, x2, y2) {
    const dx = x2 - x1
    const dy = y2 - y1

    let steps = Math.max(Math.abs(dx), Math.abs(dy))

    const xInc = dx / steps
    const yInc = dy / steps

    for (let i = 0; i <= steps; i++) {
        point(x1, y1)
        x1 += xInc
        y1 += yInc
    }
}

// Algoritmo Bresenham para la tercer pizza
function Bresenham(x1, y1, x2, y2) {
    const dx = abs(x2 - x1);
    const dy = abs(y2 - y1);

    let p = (dx - dy);
    while (x1 !== x2 || y1 !== y2) {
        point(x1, y1);
        const p2 = 2 * p;
        if (p2 > -dy) {
            p -= dy;
            if (x2 > x1) {
                x1 += 1
            } else {
                x1 -= 1;
            }
        }
        if (p2 < dx) {
            p += dx;
            if (y2 > y1) {
                y1 += 1
            } else {
                y1 -= 1;
            }
        }
    }
}

function divide(x, y, r, d, type) {
    for (let i = 0; i < d; i++) {
        const angulo = TWO_PI * i / d;
        const x2 = x + r * cos(angulo);
        const y2 = y + r * sin(angulo);
        print("x1: " + x)
        print("y1: " + x)
        print("x2: " + x2)
        print("y2: " + x2)
        if (type == 'puntop')
            puntop(x, y, x2, y2);
        if (type == 'dda')
            dda(x, y, x2, y2);
        if (type == 'Bresenham')
            Bresenham(x, y, round(x2), round(y2));
    }
}