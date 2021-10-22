const days = {
    1:'понедельник',
    2:'вторник',
    3:'среда',
    4:'четверг',
    5:'пятница',
    6:'суббота',
    7:'воскресенье'
};

const fs_monday_lessons = [
    '08:00:00-08:35:00',
    '08:40:00-09:15:00',
    '09:25:00-10:00:00',
    '10:05:00-10:40:00',
    '11:00:00-11:35:00',
    '11:40:00-12:15:00',
    '12:25:00-13:00:00',
    '13:05:00-13:40:00',
    '13:50:00-14:25:00',
    '14:30:00-15:05:00',
];
const fs_everyday_lessons = [
    '08:00:00-08:45:00',
    '08:55:00-09:40:00',
    '09:50:00-10:35:00',
    '10:45:00-10:30:00',
    '11:50:00-12:35:00',
    '12:45:00-13:30:00',
    '13:50:00-14:35:00',
    '14:45:00-15:30:00',
    '15:40:00-16:25:00',
    '16:35:00-17:20:00',
    '17:30:00-18:15:00',
    '18:25:00-19:10:00',
];
const fs_saturday_lessons = [
    '08:00:00-09:20:00',
    '09:30:00-10:50:00',
    '11:00:00-12:20:00',
    '12:30:00-13:50:00',
    '14:00:00-15:20:00',
    '15:30:00-16:50:00'
];

const monday_lessons = [
    '08:20:00-08:55:00',
    '09:00:00-09:35:00',
    '09:45:00-10:20:00',
    '10:25:00-11:00:00',
    '11:20:00-11:55:00',
    '12:00:00-12:35:00',
    '12:45:00-13:20:00',
    '13:25:00-14:00:00',
    '14:10:00-14:45:00',
    '14:50:00-15:25:00',
];
const everyday_lessons = [
    '08:20:00-09:05:00',
    '09:15:00-10:00:00',
    '10:10:00-10:55:00',
    '11:05:00-10:50:00',
    '12:10:00-12:55:00',
    '13:05:00-13:50:00',
    '14:10:00-14:55:00',
    '15:05:00-15:50:00',
    '16:00:00-16:45:00',
    '16:55:00-17:40:00',
    '17:50:00-18:35:00',
    '18:45:00-19:30:00',
];
const saturday_lessons = [
    '08:20:00-09:40:00',
    '09:50:00-11:10:00',
    '11:20:00-12:40:00',
    '12:50:00-14:10:00',
    '14:20:00-15:40:00',
    '15:50:00-17:10:00'
];

const test_lessons = [
    '23:39:00-23:40:00',
    '23:41:00-23:42:00',
];

function check_day(days) {
    let today = new Date().getDay();
    switch (today) {
        case 1:
            return days['1'];
        case 2:
            return days['2'];
        case 3:
            return days['3'];
        case 4:
            return days['4'];
        case 5:
            return days['5'];
        case 6:
            return days['6'];
        case 7:
            return days['7'];
    }
}
function check_timetable(stream) {

    let today = new Date().getDay();
    if(stream === 1) {
        switch (today) {
            case 1:
                return fs_monday_lessons;
            case 6:
                return fs_saturday_lessons;
            default:
                return fs_everyday_lessons;
        }
    } else {
        switch (today) {
            case 1:
                return monday_lessons;
            case 6:
                return saturday_lessons;
            default:
                return everyday_lessons;
        }
    }

}

let breakTimer = new Vue({
    el: '#break_timer',
    data: {
        hour: "",
        minute: "",
        second: "",
        today: check_day(days),
        lNumber: "",
        nextBreak: "",
        coupleNumber: "",
        timetable: {},
        endCouple: "",
        stream: 2

    },
    watch: {
        stream: {
            handler(val, oldVal) {
                let modal = document.querySelector('.modal-window');
                modal.style.opacity = 1;
                setTimeout(function (ev) {
                    modal.style.opacity = 0;
                }, 1000);
                this.check_lesson();
            },
            deep: true
        }
    },
    created() {
        setInterval(this.getNow, 1000);
        setInterval(this.check_lesson, 1000);
    },
    methods: {
        getNow: function()
        {
            const today = new Date();
            let time = [today.getHours(), today.getMinutes(), today.getSeconds()].map(function (x) {
                return x < 10 ? "0" + x : x
            });
            this.hour = time[0];
            this.minute = time[1];
            this.second = time[2];
        },
        check_timetable: function ()
        {
            let today = new Date().getDay();
            switch (today) {
                case 1:
                    return monday_lessons;
                case 6:
                    return saturday_lessons;
                default:
                    return everyday_lessons;
            }
        },
        check_lesson: function()
        {
            let lesson_list = check_timetable(this.stream);
            let lesson_number = 0;
            let lastLesson = null;
            let nextLesson = null;
            for (let val of lesson_list ) {
                if (typeof lesson_list[lesson_number-1] !== 'undefined') {
                    lastLesson = lesson_list[lesson_number-1].split('-') || null;
                } else {
                    lastLesson = null;
                }
                if (typeof lesson_list[lesson_number+1] !== 'undefined') {
                    nextLesson = lesson_list[lesson_number+1].split('-') || null;
                } else {
                    nextLesson = null;
                }

                lesson_number++;

                let lesson = val.split('-');
                var s = 60,
                    d = ':',
                    b = lesson[0].split (d),
                    b = b [0]* s * s + b [1] * s + +b [2];
                let e = lesson[1].split (d);
                e = e [0]* s * s + e [1] * s + +e [2];
                let t = new Date;
                let time = [t.getHours(), t.getMinutes()].map(function (x) {
                    return x < 10 ? "0" + x : x
                });
                t = time[0] * s * s + time[1] * s + t.getSeconds();

                if (t === b) {
                    this.ring();
                }
                if (t === e) {
                    this.ring();
                }
                if (t >= b && t <= e) {
                    // попал в промежуток урока
                    if (lesson_number % 2 === 0) {
                        this.endCouple = "конец пары - <b>" + lesson[1] + "</b>";
                        this.coupleNumber = '<b>' + lesson_number/2 + '</b> пара';
                    } else  {
                        if (nextLesson === null) {
                            // последняя пара
                            this.endCouple = "конец пары - <b>" + lesson[1] + "</b>";
                        } else {
                            let coupleEnd = lesson_list[lesson_number+1] || lesson_list[lesson_number];
                            this.endCouple = "конец пары - <b>" + coupleEnd.split('-')[1] + "</b>";
                        }
                        this.coupleNumber = '<b>' + (lesson_number+1) /2  + '</b> пара';
                    }
                    this.nextBreak = 'перемена - <b>'+lesson[1]+'</b>';
                    return this.lNumber = '<b>' + lesson_number + '</b> урок';
                } else {
                    if (lesson_number % 2 === 0) {
                        this.coupleNumber = '<b>Перемена между парами</b>';
                    }else  {
                        this.coupleNumber = '<b>Перемена между уроками</b>';
                    }
                    this.nextBreak = '<b>Перемена</b>';
                    this.lNumber = '<b>Урок закончен</b>';
                    if (lastLesson === null) {
                        //Если  вдруг это  первая лекция
                        let bNext = nextLesson[0].split (d);
                        bNext = bNext [0]* s * s + bNext [1] * s + +bNext [2];
                        if (bNext > t && t > e) {
                            return this.endCouple = "<b>Конец перемены - " + lesson[1] + "</b>";
                        } else if (t < bNext){
                            // Если пары не начались
                            this.lNumber = '<b>Урок не начался</b>';
                            this.nextBreak = 'Начало пары - <b>'+ lesson[0] + '</b>';
                            this.coupleNumber = '<b>Пара не началась</b>';
                            return this.endCouple = "<b>Ждите начала</b>";
                        }
                    } else if (nextLesson === null){
                        //Если  вдруг это  последняя лекция
                        let eLast = lastLesson[1].split (d);
                        eLast = eLast [0]* s * s + eLast [1] * s + +eLast [2];
                        if (eLast < t && t < b) {
                            return this.endCouple = "<b>Конец перемены - " + lesson[1] + "</b>";
                        } else if (t > e){
                            // Если все пары закончились
                            this.nextBreak = '<b>Пары закончились</b>';
                            this.coupleNumber = '<b>Пора домой</b>';
                            return this.endCouple = "<b>Пары закончились</b>";
                        }
                    } else {
                        // Если это лекция хоть где в середине
                        let eLast = lastLesson[1].split (d) || null;
                        eLast = eLast [0]* s * s + eLast [1] * s + +eLast [2];
                        let bNext = nextLesson[0].split (d) || null;
                        bNext = bNext [0]* s * s + bNext [1] * s + +bNext [2];
                        if (bNext > t && t > e) {
                            return this.endCouple = "<b>Конец перемены - " + nextLesson[0] + "</b>";
                        } else if (eLast < t && t < b) {
                            return this.endCouple = "<b>Конец перемены - " + lastLesson[1] + "</b>";
                        }
                    }

                }
            }
        },
        ring: function(){
            var audio = new Audio();
            audio.src = 'sound/bell.mp3';
            audio.autoplay = true;
            return true;
        }
    }
});


let stream_blocks = document.querySelectorAll('.stream');
stream_blocks.forEach(function (el) {
    el.addEventListener('click', function (ev) {
        stream_blocks.forEach(function (el) {
            el.classList.remove('active');
        });
        el.classList.add('active');
        if (el.id === 'first_stream') {
            breakTimer.stream = 1;
            let message = 'Вы выбрали 1 поток';

            let forModal = document.querySelector('.for-modal');
            forModal.innerHTML =
                '    <div class="modal-window">\n' +
                '        <div class="modal-box">\n' +
                '            <div class="modal-title">\n' +
                '                Сообщение\n' +
                '            </div>\n' +
                '            <hr>\n' +
                '            <div class="modal-text"> '+message +'</div>\n' +
                '        </div>\n' +
                '    </div>';
            setTimeout(function (ev) {
                forModal.innerHTML='';
            }, 1500)
        } else if (el.id === 'second_stream'){
            breakTimer.stream = 2;
            let message = 'Вы выбрали 2 поток';
            let forModal = document.querySelector('.for-modal');
            forModal.innerHTML =
                '    <div class="modal-window">\n' +
                '        <div class="modal-box">\n' +
                '            <div class="modal-title">\n' +
                '                Сообщение\n' +
                '            </div>\n' +
                '            <hr>\n' +
                '            <div class="modal-text"> ' + message + ' </div>\n' +
                '        </div>\n' +
                '    </div>';
            setTimeout(function (ev) {
                forModal.innerHTML='';
            }, 1500)
        }
    });
});
