//

document.querySelector('.controls-buttons span').onclick = _ => {

    let yourName = prompt('Whats Your Name?');

    if (yourName == null || yourName == "") {

        document.querySelector('.name span').innerHTML = 'Unknown';

    } else {

        document.querySelector('.name span').innerHTML = yourName;

    }

    document.querySelector('.controls-buttons').remove();

}

let duration = 1000; // the time

let blocksContainer = document.querySelector('.container'); // the container

let blocks = Array.from(blocksContainer.children); // container children

let orderRange = Array.from(Array(blocks.length).keys());

let counter = 0;

shuffle(orderRange);

blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click', () => {

        flipCard(block);

        countFlippedBlocks(block);

    });

});

function countFlippedBlocks(el) {

    if (el.classList.contains('has-match')) {

        counter++;

        console.log(counter)

        if (counter === 10) {

            playVictoryMode();

        }

    }

}

function playVictoryMode() {

    document.querySelector('[data-victory]').play();

    document.getElementById('canvas').style.display = 'block';

    setTimeout(() => {

        setTimeout(() => {

            document.getElementById('canvas').style.display = 'none';

        }, duration * 10)

    }, duration * 2)

}

function flipCard(selectedCard) {

    selectedCard.classList.add('is-flipped');

    // collect all flipped cards
    let flippedBlocks = blocks.filter(el => el.classList.contains('is-flipped'));

    // if there is two selected blocks
    if (flippedBlocks.length === 2) {

        stopClicking();

        checkMatchedBlocks(flippedBlocks[0], flippedBlocks[1]);

    }

}

function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.techno === secondBlock.dataset.techno) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        setTimeout(() => {

            document.querySelector('[data-success]').play();

        }, 100)


    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration)

        setTimeout(() => {

            document.querySelector('[data-fail]').play();

        }, 500)
    }

}

function stopClicking() {

    // add class no clicking on main container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {

        // remove class 'no-clicking' after the duration
        blocksContainer.classList.remove('no-clicking');

    }, duration);

}

function shuffle(array) {
    // the current is the length of the array
    let current = array.length,
        temp,
        random;

    while (current > 0) {

        // get random number
        random = Math.floor(Math.random() * current);

        // decrease length by one
        current--;

        // save current element in stash or anything hold it
        temp = array[current];

        // current element = random element
        array[current] = array[random];

        // random el = get element from stash
        array[random] = temp

    }

    return array;

}