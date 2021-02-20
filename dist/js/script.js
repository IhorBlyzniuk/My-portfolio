const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close'),
      menuLink = document.querySelectorAll('.menu__link');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

menuLink.forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

const counters = document.querySelectorAll('.use__rating-counter'),
      lines = document.querySelectorAll('.use__rating-line span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});


const forms = document.querySelectorAll('form'),
      message = {
          loading: 'Загрузка...',
          success: 'Спасибо! Скоро я с вами свяжусь',
          failure: 'Что-то пошло не так...'
      };

forms.forEach(item => {
    postData(item);
});

function postData(form){
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.textContent = message.loading;
        form.appendChild(statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        const formData = new FormData(form);
        
        const object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        const json = JSON.stringify(object);

        request.send(json);
        console.log(json);

        request.addEventListener('load', () => {
            if(request.status === 200){
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
            } else{
                statusMessage.textContent = message.failure;
            }
        });
    });
}

new WOW().init();
