
document.addEventListener('DOMContentLoaded', function () {
    // Hint: create or set your svg element inside this function
    wordToguess = "hello" // this shall be replaced from a random word in the api dictionary
    arr = wordToguess.split("");
    getword();
    createBoard();
    guessedWords = [[]]; // 2d array to hold the words
    index = 0;



    async function getword()
    {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'YOUR API KEY HERE',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };

        fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=5&lettersMax=5', options)
            .then(response => response.json())
            .then(response => wordToguess= response.word)
            .catch(err => console.error(err));
        await new Promise(r => setTimeout(r, 1000));
        console.log(wordToguess);
        arr = wordToguess.split("");
        console.log(arr);
    }










    async function handleSumbit()
    {
        wordArray = getCurrentWord();
        word = wordArray.join(""); // transform array into string
        console.log(word);
        if (word === wordToguess) {
            tempIndex = index - 5;
            for (i = tempIndex; i < tempIndex + 5; i++) // we will fo from 0 to 4
            {
                spaceAvailableElement = document.getElementById(String(i));
                spaceAvailableElement.setAttribute("style", "background-color: green;");
            }
            await new Promise(r => setTimeout(r, 100));
            window.alert("Congratulations, you guessed the correct word!");
        } else if (word.length < 5) {
            window.alert("the word needs to be of 5 letters");
            return;
        } else {
            // we will go here if the word is of 5 chars, and the word is not correct
            // in which case let's paint the correct chars in the squares
            // spaceAvailableElement.setAttribute("style", "background-color: green;");
            console.log("this is word array ", wordArray);
            console.log("this is arr ", arr);
            console.log("this is index ", index);
            tempIndex = index - 5;
            for (i = 0; i < 5; i++) // we will go from 0 to 4
            {
                if (wordArray[i] === arr[i]) {
                    //if the char matches
                    console.log("this is tempIndex", tempIndex);
                    spaceAvailableElement = document.getElementById(String(tempIndex));

                    spaceAvailableElement.setAttribute("style", "background-color: green;");
                }
                tempIndex++;
            }
        }
        if (guessedWords.length === 6) {
            window.alert("you don't have any more guesses");
        }
        guessedWords.push([]) // push an array so that we can writge letters in the next squares.
        console.log(guessedWords);

    }

    function getCurrentWord()
    {
        guessedWordsNumber = guessedWords.length;
        return guessedWords[guessedWordsNumber-1]; // this would be the array that we are updating
    }
    function updateguesses(letter)
    {
        currentWord = getCurrentWord(); // current word will be an array with the current word
        if(currentWord && currentWord.length < 5) // only let array have 5 chars
        {
            currentWord.push(letter) // this will push letters into the array as we click on the keyboard
            spaceAvailableElement = document.getElementById(String(index));
            index++;
            spaceAvailableElement.textContent = letter;
        }

    }
 function createBoard()
    {
        gameBoard = document.getElementById("board")
        for(i = 0 ; i < 30; i++)
        {
            square = document.createElement("div");
            square.classList.add("square")
            square.setAttribute("id", i);
            gameBoard.appendChild(square);
        }
    }


    keys = document.querySelectorAll(".keyboard-row button");
    for (i=0 ; i < keys.length;i++)
    {
        keys[i].onclick = ({target}) =>
        {
            key= target.getAttribute("data-key")
            console.log(key);
            if(key === "enter"){ handleSumbit(); return;} // when enter is pressed, call the function
            updateguesses(key);
        }
    }
});