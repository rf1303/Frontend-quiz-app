document.addEventListener('DOMContentLoaded', function () {
    console.log('Inicio');
    let menuListQuiz= "";
    let dataJson = {};
    let iq = 0;
    const questionsAnswers = document.querySelectorAll('.questions__answers')[0];
    const answerItem = questionsAnswers.querySelectorAll('.answers__item')[0];
    const menuList = document.querySelectorAll('.menu__list')[0];
    const themeOption = document.querySelector('.theme__option'); 
    const themesOptions = document.querySelector('.themes__options');
    const accessIcon = document.querySelector('.access__icon');    
    const wrappersStart = document.querySelector('.wrappers__start');    
    const wrappersQuestions = document.querySelector('.wrappers__questions');    
    const wrappersCompleted = document.querySelector('.wrappers__completed');    
    const buttonSubmit = document.querySelector('.button__submit');

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
     //        // if(!response.ok) {
     //        //     throw new Error('No se pudo cargar el archivo');
     //        // }
        dataJson = await response.json();
        console.log('await data: ', dataJson)       


        } catch (error) {
        console.error("Error cargando data.json:", error);
        }
    }
    menuList.addEventListener('click', (e) => {
        e.preventDefault();
        menuListQuiz = e.target.dataset.name;
        const indexAnswer = Array.from(menuList.children).indexOf(e.target.closest('li'));
        console.log('li: ', indexAnswer);
        quizQuestion();
    })
    
     questionsAnswers.addEventListener('click', (e) => { 
        e.preventDefault();
        console.log('questionsAnswersClick', e.target.tagName);
        console.log('questionsAnswersClick', e.target);
    });

    function quizQuestion() {
        wrappersStart.classList.add('display__none'); 
        wrappersQuestions.classList.remove('display__none'); 
        accessIcon.classList.add('access__icon--vissible');
        console.log('quiz data.json: ', dataJson.quizzes,' ', menuListQuiz);
        answerQuestion(dataJson, menuListQuiz);
    }
    function answerQuestion(dataJson, listQuiz) {
        const quizzes = dataJson.quizzes.find(quiz => quiz.title.toLowerCase() === listQuiz); 
        console.log('Las preguntas son: ',listQuiz,' ', quizzes);
        quizAccess(quizzes, iq);
    }

});
    
    function quizAccess(quizzes, iq) {
        /* while ( iq < 10) { */
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
            // buttonSubmit.addEventListener('click',() => {
            //     answerResult()  
            // });          
        /* } */
    }
// Encotrar eh indice de una lista <ul> li 
//const indexAnswer = Array.from(menuList.children).indexOf(e.target.closest('li'));

  // const button = e.target.closest('button.quiz__item');
  // if (!button) return;
  // Encuentra el <li> que contiene el botón
  // const li = button.closest('li');
  //
  // // Convierte la lista de hijos de <ul> a array para obtener el índice
  // const index = Array.from(menuList.children).indexOf(li);
  //
  // console.log('Índice del <li> clickeado:', index);

/* GUARDAR TEMA */
    // const themeOptionStorage = function (theme) { //guardar tema
    //     localStorage.setItem("optionTheme", theme)
    // }
    //
    // themeOption.addEventListener('click', (e) => {
    //     console.log("tema: ", e.target.value);
    //     themeOptionStorage(e.target.value);
    // });

