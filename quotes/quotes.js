var quotes = [
    {
        quote: 'Більшість людей ніколи не чують один одного.',
        author: 'Ернест Хемінгуей',
        img: './img/ernest.jpg'
    },
    {
        quote: 'Чим нижче чоловік дешею, тим вище задирає ніс. Він носом тягнеться туди, куди душею не доріс.',
        author: 'Омар Хайям',
        img: './img/omar.jpg'
    },
    {
        quote: 'Про щастя можна говорити хвилин п\'ять, не більше. Тут нічого не скажеш, крім того, що ти щасливий. А про нещастя люди розповідають безперервно.',
        author: 'Еріх Марія Ремарк',
        img: './img/remark.jpg'
    },
    {
        quote: 'Коли Добро безсиле, воно — Зло.',
        author: 'Оскара Уайльда',
        img: './img/oskar.jpg'
    },
    {
        quote: 'Щастя полягає не у володінні бажаним, а в бажанні того, що маєш. ',
        author: 'Джеймс Стюарт',
        img: './img/stuaart.jpg'
    },

];

var paragraph = document.getElementById('quote');
var button = document.getElementById('button');
var author = document.getElementById('author');
var image = document.getElementById('image');
var quite, randomItem;
function setRandomeQuote() {

    randomItem = Math.round(Math.random() * (quotes.length - 1));
    paragraph.innerText = quotes[randomItem].quote;
    author.innerText = quotes[randomItem].author;
    image.src = quotes[randomItem].img;
}

setRandomeQuote();
button.addEventListener('click', setRandomeQuote, false);
