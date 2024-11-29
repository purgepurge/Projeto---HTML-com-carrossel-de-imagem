// Seletores principais
const slideContainer = document.querySelector('.slide3d');
const slideControlsContainer = document.querySelector('.slide-controls');
const slideControls = ['previous', 'next'];
const slideItems = document.querySelectorAll('.slide-item');

class Slide3d {
    constructor(container, items, controls) {
        this.slide3dContainer = container;
        this.slide3dControls = controls;
        this.slide3dArray = [...items];
        this.updateSlide(); // Inicializa os slides na posição correta
    }

    updateSlide() {
        this.slide3dArray.forEach(el => {
            el.className = el.className.replace(/slide-item-\d+/g, ''); // Remove classes existentes
        });

        this.slide3dArray.slice(0, 10).forEach((el, i) => {
            el.classList.add(`slide-item-${i + 1}`); // Adiciona as classes dinâmicas
        });
    }

    setCurrentState(direction) {
        if (direction.className.includes('slide-controls-previous')) {
            // Move o último item para o início
            this.slide3dArray.unshift(this.slide3dArray.pop());
        } else {
            // Move o primeiro item para o final
            this.slide3dArray.push(this.slide3dArray.shift());
        }
        this.updateSlide(); // Atualiza a exibição do carrossel
    }

    setControls() {
        // Gera os botões dinâmicos de controle
        this.slide3dControls.forEach(control => {
            const button = document.createElement('button');
            button.className = `slide-controls-${control}`;
            button.innerText = control === 'previous' ? '◀' : '▶'; // Define os símbolos
            slideControlsContainer.appendChild(button);
        });
    }

    useControls() {
        // Conecta os eventos de clique aos botões
        const triggers = slideControlsContainer.querySelectorAll('button');
        triggers.forEach(control => {
            control.addEventListener('click', (e) => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}

// Inicializa o carrossel após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    const exampleSlide3d = new Slide3d(slideContainer, slideItems, slideControls);
    exampleSlide3d.setControls(); // Cria os botões
    exampleSlide3d.useControls(); // Adiciona os eventos de clique
});
