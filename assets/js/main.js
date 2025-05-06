document.addEventListener('DOMContentLoaded', function () {
    console.log('Inicio');
    let menuListQuiz= "";
    let dataJson = {};
    let quizzes = {};
    let iq = 0;
    let im = 0;
    let qnc = 0;
    const menuList = document.querySelectorAll('.menu__list')[0];
    const themeOption = document.querySelector('.theme__option'); 
    const themesOptions = document.querySelector('.themes__options');
    const accessIcon = document.querySelector('.access__icon');    
    const completedIcon = document.querySelector('.access__icon');    
    const wrappersStart = document.querySelector('.wrappers__start');    
    const wrappersQuestions = document.querySelector('.wrappers__questions');    
    const wrappersCompleted = document.querySelector('.wrappers__completed');    

/* ###### ANSWERS ITEM LABEL ########### */
    const questionsAnswers = document.querySelectorAll('.questions__answers')[0];
    const answerItem = questionsAnswers.querySelectorAll('.answers__item');
    const answersRadioTab = document.querySelector('.answers__radio'); 

    themeOption.click();//tema oscuro

    themesOptions.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            themesOptions.click();
            console.log('themesOptions:', themesOptions.value)
        }
    });
        
    loadDatos();

     async function loadDatos() {
        try {
        const response = await fetch('data.json');
        dataJson = await response.json();
        console.log('await data: ', dataJson)       
        return dataJson;

        } catch (error) {
        console.error("Error cargando data.json:", error);
        }
    }

/* ########### MENU LIST NAME #################### */

    menuList.addEventListener('click', (e) => {
        console.log('Menu  reinicio: ', iq, im, qnc);
        e.preventDefault();
        menuListQuiz = e.target.dataset.name;
        im = Array.from(menuList.children).indexOf(e.target.closest('li'));
        console.log('li: ', im);
        quizQuestion();
    });

/* ########## INPUT RADIO CHECKED ########## */
    const radioChecked = document.querySelectorAll('.answers__radio');

    radioChecked.forEach(radio => {
      radio.addEventListener('change', () => {
        document.querySelectorAll('.answers__item').forEach(label => {
          label.classList.remove('answers__item--checked');
        });

        const selectedLabel = radio.closest('.answers__item');
        selectedLabel.classList.add('answers__item--checked');
      });
    });

/* ######## FORM SUBMIT QUESTIONS ############### */
    
     questionsAnswers.addEventListener('submit', (e) => { 
        e.preventDefault();
        const answerError = document.querySelector('.answer__error');
        const answerSelect = questionsAnswers.querySelector('.answers__radio:checked');

        if (!answerSelect) {
            answerError.classList.remove('display__none');
            setTimeout(() => {
               answerError.classList.add('display__none');
            }, 3000);
            return;
        }

        const answerLabel = answerSelect.closest("label");
        const answerIcon = answerLabel.querySelector(".item__icon");
        console.log('questionsAnswersiSelect', answerSelect.value);

        const  quizAnswer = dataJson.quizzes[im].questions[iq].answer;
        console.log('dataJson.answer: ', dataJson.quizzes[im].questions[iq].answer);
        if (answerSelect.value === quizAnswer) {
            answerLabel.classList.add('answers__item--good');
            answerIcon.classList.add('item__icon--good');
            qnc++; //suma a quiz Cempleted
            console.log('respuesta correcta:', answerSelect.closest("label"));
        } else {
            answerLabel.classList.add('answers__item--error');
            answerIcon.classList.add('item__icon--error');
            console.log('La respuesta es incorrecta');
        }
        const questionsLength = dataJson.quizzes[im].questions.length;
        console.log('questionsLength: ', questionsLength);
        setTimeout(() => {
            iq++;
            if (iq < questionsLength) {
                quizAccess(quizzes, iq);              
                cleanItem();
                cleanChecked();
            } else {
              quizCompleted(qnc);  
            }
        }, 1500);

    });

/* ######## MOSTRAR MENU DE PREGUNTOS ELEGIDAS ######### */

    function quizQuestion() {
        const accessTitle = document.querySelector('.access__title');
        const accessImage = document.querySelector('.access__image');
        const accessImg = document.querySelector('.access__img');
        const completedTitle = document.querySelector('.completed__title');
        const completedImage = document.querySelector('.completed__image');
        const completedImg = document.querySelector('.completed__img');
        switch (menuListQuiz) {
            case "html":
                accessImage.classList.add('item__images--html');
                completedImage.classList.add('item__images--html');
                accessImg.src = `${dataJson.quizzes[im].icon}`;
                completedImg.src = `${dataJson.quizzes[im].icon}`;
                break;
            case "css":
                accessImage.classList.add('item__images--css');
                accessImg.src = `${dataJson.quizzes[im].icon}`;
                completedImage.classList.add('item__images--css');
                completedImg.src = `${dataJson.quizzes[im].icon}`;
                break;
            case "javascript":
                accessImage.classList.add('item__images--javascript');
                accessImg.src = `${dataJson.quizzes[im].icon}`;
                completedImage.classList.add('item__images--javascript');
                completedImg.src = `${dataJson.quizzes[im].icon}`;
                break;
            case "accessibility":
                accessImage.classList.add('item__images--access');
                accessImg.src = `${dataJson.quizzes[im].icon}`;
                completedImage.classList.add('item__images--access');
                completedImg.src = `${dataJson.quizzes[im].icon}`;
                break;
            default:
                break;
        }
        wrappersStart.classList.add('display__none'); 
        wrappersQuestions.classList.remove('display__none'); 
        accessIcon.classList.add('access__icon--vissible');
        accessTitle.textContent = `${dataJson.quizzes[im].title}`;
        completedTitle.textContent = `${dataJson.quizzes[im].title}`;
        console.log('quiz data.json: ', dataJson.quizzes,' ', dataJson.quizzes[im].title);
        answerQuestion(dataJson, menuListQuiz);
    }

    function answerQuestion(dataJson, listQuiz) {
        quizzes = dataJson.quizzes.find(quiz => quiz.title.toLowerCase() === listQuiz); 
        console.log('Las preguntas son: ',listQuiz,' ', quizzes);
        quizAccess(quizzes, iq);
    }
    
    function quizAccess(quizzes, iq) {
            const questionsAnswers = document.querySelector('.questions__answers'); 
            const answerItem = questionsAnswers.querySelectorAll('.answers__item');
            const subtituloNumber = document.querySelector('.subtitulo__number'); 
            const questionTitle = document.querySelector('.question__title'); 
            const barsProgress = document.querySelector('.bars__progress');    

            console.log('quizzes',quizzes.questions[iq].question); 
            questionTitle.textContent = `${quizzes.questions[iq].question}`;
            subtituloNumber.textContent = `${iq+1}`;
            barsProgress.style.width = `${(iq+1)*10}%`;
            answerItem.forEach((option, index) => {
                const itemText = option.querySelector('.item__text');    
                const answersRadio = option.querySelector('.answers__radio');    
                const textOption = quizzes.questions[iq].options[index]; 
                itemText.textContent = `${textOption}`;
                answersRadio.value = `${textOption}`;
            });
    }

/* ##########  CLEAN INPUTS ############## */

    function cleanItem() {
        const answerIcon = document.querySelectorAll('.item__icon');
        answerIcon.forEach(item => {
            item.classList.remove('item__icon--good' , 'item__icon--error');
        }) 
        answerItem.forEach(element => {
            element.classList.remove('answers__item--good', 'answers__item--error', 'answers__item--checked'); 
        }); 
    }

/* ########## CLEAN CHECKED ############### */    

    function cleanChecked() {
        const cleanInput = document.querySelectorAll('.answers__radio');
        cleanInput.forEach(item => {
        item.checked = false;
        });

    }

/* ############   QUIZ QUESTIONS COMPLETED ################## */

    function quizCompleted(number) {
        const resultNumber = document.querySelector('.result__number') 
        wrappersQuestions.classList.add('display__none');
        wrappersCompleted.classList.remove('display__none');
        resultNumber.textContent = `${number}`; 
        console.log('Completed: ', number); 
    }
    
    const completedButton = document.querySelector('.completed__button');
    completedButton.addEventListener('click', () => {
        iq = 0;
        im = 0;
        qnc = 0;
        wrappersCompleted.classList.add('display__none');
        wrappersStart.classList.remove('display__none');
        accessIcon.classList.remove('access__icon--vissible');
        cleanItem();
        console.log('completed reinicio: ', iq, im, qnc);
    });

/* ######### TECLADO CHECKED ############## */

    answerItem.forEach( item => {
        item.setAttribute('tabindex', '0');

        item.addEventListener('keydown', (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const ansRadio = item.querySelector('.answers__radio');
                   ansRadio.checked = true; 
                cleanItem();
                item.classList.add('answers__item--checked');
            }
        })
    });    


});

